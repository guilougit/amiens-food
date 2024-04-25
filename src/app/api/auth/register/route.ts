import prisma from "@/src/lib/prisma";
import {hash} from "bcryptjs";
import {$Enums} from "@prisma/client";
import Roles = $Enums.Roles;
import {NextResponse} from "next/server";

import {ObjectCannedACL, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

import {compressAndRoundImage} from "@/src/utils/compressor";


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export async function POST(request: Request) {
    const data = await request.formData()
    
    const user = JSON.parse(data.get("user") as string)
    const file = data.get('file') as any
    
    // Check if user already exist.
    const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {StripeAccount: true}
    });
    
    let newUser = null;
    let filename = null;
    const hashedPassword = await hash(user.password, 10);


    // Upload the image to S3
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // If account exists but no suscription -> override account data
    if(existingUser) {
        filename = `${existingUser.id}/picture/${Date.now()}`
        if(existingUser.StripeAccount && !!existingUser.StripeAccount.start) {
            console.log('file was not uploaded to s3')
            return Response.json({ success: false, code: 'EMAIL_ALREADY_TAKEN', error: "L'adresse email est déjà utilisée" })
        }

        await uploadFileToS3(buffer, filename ?? '')
        
        newUser = await prisma.user.update({
            where: {id: existingUser.id},
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                surname: user.surname,
                email: user.email,
                image: filename,
                password: hashedPassword,
            }
        })
    }
    else { // Create new account
        try {
            newUser = await prisma.user.create({
                data: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    surname: user.surname,
                    email: user.email,
                    image: filename,
                    password: hashedPassword,
                    role: Roles.CUSTOMER
                },
            });
            filename = `${newUser.id}/picture/${Date.now()}`
            
            await uploadFileToS3(buffer, filename ?? '')
            await prisma.user.update({where: {id: newUser.id}, data: {image: filename}})
        }
        catch (e) {
            return NextResponse.json({success: false, code: 'ERROR_CREATING_ACCOUNT'})
        }

    }

    return NextResponse.json({success: true, user: newUser})

}

/**
 * Upload identity picture to S3
 * @param buffer
 * @param filename
 */
const uploadFileToS3 = async (buffer: Buffer, filename: string) => {
    if(filename === "") return

    console.log('start uploading to S3...')
    const compressedBuffer = await compressAndRoundImage(buffer)
    
    const s3Params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filename,
        Body: compressedBuffer,
        ContentType: 'image/png',
        ACL: ObjectCannedACL.public_read
    };
    const command = new PutObjectCommand(s3Params)
    await s3.send(command)
    console.log('the file was uploaded to s3')

}