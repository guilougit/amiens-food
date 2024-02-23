import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import fs from 'fs/promises';
import Jimp from 'jimp';

import {GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Resend} from "resend";
import {DateTime} from "luxon";
import {deleteFileOnAws} from "@/src/utils/aws";

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
            const baseImageBuffer = await fs.readFile('/img/card/front.png');
            const baseImage = await Jimp.read(baseImageBuffer);

            const font = await Jimp.loadFont('/fonts/fnt/open-sans-32-black.fnt');
            
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
            return 950;
        case 2:
            return 940;
        case 3:
            return 930;
        case 4:
            return 920;
        case 5:
            return 910;
        case 6:
            return 902;
        default:
            return 902;
    }
}