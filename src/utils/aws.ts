import {DeleteObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {compressAndRoundImage} from "@/src/utils/compressor";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export const deleteFileOnAws = (path: string): Promise<boolean> => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: path,
    };
    const command = new DeleteObjectCommand(params);    
    
    return new Promise((resolve, reject) => {
        s3.send(command)
            .then(() => {
                resolve(true);
            })
            .catch((error) => {
                console.error("Error while deleting file on aws :", error);
                reject(false);
            });
        
    })
}

export const uploadFileOnAws = async (buffer: Buffer, filename: string) => {
    if(filename === "") return

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
}