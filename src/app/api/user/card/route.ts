import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import fs from 'fs/promises';
import Jimp from 'jimp';

import {GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Resend} from "resend";
import {DateTime} from "luxon";
import {deleteFileOnAws} from "@/src/utils/aws";
import path from "node:path";
import sharp from "sharp";
import TextToSVG from 'text-to-svg';

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },

});
export async function POST(request : Request) {
    const params = await request.json()

    const session = await auth()

    if(!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    
    let user = await prisma.user.findUnique({
        where: {email: session.user.email},
        include: {StripeAccount: true}
    })
    
    if(!user?.StripeAccount || (user.StripeAccount.expireAt && (user.StripeAccount.expireAt <= new Date()))) {
        return NextResponse.json({success: false, error: 'Subscription invalid'})
    }


    if(user) {
        // Generate new image
        if(!params.afterPayment || (params.afterPayment && !user.card)) {
            // Create the picture
            /*
            const baseImageBuffer = await fs.readFile(path.join(process.cwd(), 'public', 'front.png'));
            const baseImage = await Jimp.read(baseImageBuffer);

            const path2 = path.join(process.cwd(), 'public/', 'open-sans-32-black.fnt')
            console.log(path2)
            const font = await Jimp.loadFont(path.join(process.cwd(), 'public/', 'open-sans-32-black.fnt'));
            
            const expiredDate = user.StripeAccount?.expireAt ? DateTime.fromISO(user.StripeAccount?.expireAt.toISOString()).toFormat('dd/MM/yyyy') : ''
            
            // Add text on card
            baseImage.print(font, 330, 315, user.firstname ?? '');
            baseImage.print(font, 285, 401, user.lastname ?? '');
            baseImage.print(font, 315, 493, user.surname ?? '')
            
            // Card number
            const nb = user.card_number ?? 0
            baseImage.print(font, getCardNumberPosition(nb), 60, nb)
            
            // Expiration date
            baseImage.print(font, 420, 585, expiredDate ? expiredDate : '')    
            
            // Add profile picture on card
            if(user.image) {                 
                const profileImage = await Jimp.read( `${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${user.image}`);
                profileImage.resize(228, Jimp.AUTO);
                baseImage.composite(profileImage, 17, 19);
            }
            baseImage.resize(800, Jimp.AUTO);

            const compositedImageBuffer = await baseImage.quality(80).getBufferAsync(Jimp.MIME_PNG);
            
             */
            const baseImageBuffer = await fs.readFile(path.join(process.cwd(), 'public', 'front.png'));

            // Créer une instance sharp avec l'image de base
            let baseImage = sharp(baseImageBuffer);

            // Récupérer les données utilisateur de la requête

            // Formater la date d'expiration si elle existe
            const expiredDate = user.StripeAccount?.expireAt ? DateTime.fromISO(user.StripeAccount?.expireAt.toISOString()).toFormat('dd/MM/yyyy') : '';

            const createTextSvg = (text: string) => {
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
                            <text x="5" y="25" font-size="28" fill="black" font-family="Open sans">${text}</text>
                        </svg>`;
                return Buffer.from(svg);

            }
            
            // Ajouter du texte sur l'image
            const overlays = [];

            overlays.push({ input: createTextSvg(user.firstname ?? ''), top: 248, left: 255 });
            overlays.push({ input: createTextSvg(user.lastname ?? ''), top: 315, left: 220 });
            overlays.push({ input: createTextSvg(user.surname ?? ''), top: 385, left: 245 });
            const nb = user.card_number ?? 0;
            overlays.push({ input: createTextSvg(nb.toString()), top: 45, left: getCardNumberPosition(nb) });
            overlays.push({ input: createTextSvg(expiredDate ? expiredDate : ''), top: 450, left: 330 });

            // Ajouter une image de profil sur l'image si elle existe
            if (user.card) {
                try {
                    // Définition des paramètres de la commande pour obtenir l'objet depuis S3
                    const params = {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: user.image as string,
                    }
                    const command = new GetObjectCommand(params);
                    const response = await s3.send(command);

                    if(response.Body) {
                        const profileImageBuffer = await response.Body.transformToByteArray()

                        // Ajout de l'image récupérée dans le tableau overlays
                        const resizedImage = await sharp(profileImageBuffer)
                            .resize({ width: 180, height: 180, fit: 'cover' })
                            .toBuffer()
                        
                        overlays.push({ input: resizedImage, top: 14, left: 13 });
                    }

                } catch (error) {
                    console.error("Error retrieving object from S3:", error);
                    // Gestion de l'erreur
                }
            }
            baseImage = baseImage.composite(overlays);

            // Redimensionner l'image
            baseImage = baseImage.resize(800);

            // Convertir l'image en buffer
            const compositedImageBuffer = await baseImage.png().toBuffer();
            
            // delete old card
            if(user.card) {
                try {
                    console.log('START remove user card on aws')
                    if (user.card) {
                        await deleteFileOnAws(user.card)
                    }
                    console.log('END remove user card on aws')
                } catch (e) {
                    console.log('UPDATE USER: user card was not deleted')
                }
            }

            console.log('start upload to s3')
            const filename = `${user.id}/card/${Date.now()}.png`
            const s3Params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: filename,
                Body: compositedImageBuffer,
                ContentType: 'image/png',
                ACL: ObjectCannedACL.public_read
            };
            const command = new PutObjectCommand(s3Params)
            await s3.send(command)
            console.log('end upload to s3')
            

            // Add image to user
            const userUpdated = await prisma.user.update({
                where: {id: user.id},
                data: {
                    card: filename
                }
            })
            user.card = userUpdated.card

            // Send it to email with resend
            await sendCardByEmail(`${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${user.card}`)
        }
        
        return NextResponse.json({success: true, card: `${process.env.NEXT_PUBLIC_AWS_S3_URL_FILE}/${user.card}`})

    }
    
    return NextResponse.json({success: true, message: 'No generation'})
}

const sendCardByEmail = async (path: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
        from: 'Test Amiens food <noreply@resend.dev>',
        //to: userDB.email,
        to: 'remycastro27@icloud.com',
        subject: 'Voici ta carte Amiens food',
        html: "<h1>Voici votre carte Amiens Food</h1>",
        text: "Voici votre carte amiens Food",
        attachments: [{filename: 'amiens_food.png', path}]
    })
}

/**
 * Returns the X position of the card number : depends on the size of the number
 * @param card_number
 */
const getCardNumberPosition = (card_number: number) => {
    switch (card_number.toString().length) {
        case 1:
            return 745  ;
        case 2:
            return 735;
        case 3:
            return 725;
        case 4:
            return 715;
        case 5:
            return 705;
        case 6:
            return 700;
        default:
            return 700;
    }
}