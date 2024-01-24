import {auth} from "@/src/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import fs from 'fs/promises';
import Jimp from 'jimp';

import {GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Resend} from "resend";

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
    
    
    if(/*!user?.StripeAccount || !user.StripeAccount.sub_valid */ false) {
        return NextResponse.json({success: false, error: 'Subscription invalid'})
    }
    
    if(user) {
        // Generate new image
        if(!params.afterPayment || (params.afterPayment && !user.card)) {
            // Create the picture
            const baseImageBuffer = await fs.readFile('public/img/card_template.png');
            const baseImage = await Jimp.read(baseImageBuffer);

            const font = await Jimp.loadFont('public/fonts/fnt/open-sans-32-black.fnt');
            baseImage.print(font, 323, 332, user.firstname as string);
            baseImage.print(font, 280, 421, user.lastname as string);
            
            // Add profile picture on card
            if(user.image) {                 
                const profileImage = await Jimp.read( `${process.env.AWS_S3_URL_FILE}/${user.image}`);
                profileImage.resize(150, Jimp.AUTO);
                baseImage.composite(profileImage, 20, 20);
            }
            baseImage.resize(800, Jimp.AUTO);

            const compositedImageBuffer = await baseImage.quality(80).getBufferAsync(Jimp.MIME_PNG);

            // Upload it to S3
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
            await sendCardByEmail(`${process.env.AWS_S3_URL_FILE}/${user.card}`)
        }
        
        return NextResponse.json({success: true, card: `${process.env.AWS_S3_URL_FILE}/${user.card}`})

    }
    
    return NextResponse.json({success: true, message: 'No generation'})
}

export const sendCardByEmail = async (path: string) => {
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