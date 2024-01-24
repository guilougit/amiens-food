import sharp from 'sharp';

export const MAX_IMAGE_WIDTH = 400
export const QUALITY_IMAGE = 80

export async function compressImage(inputBuffer: Buffer): Promise<Buffer> {
    return await sharp(inputBuffer)
        .resize(MAX_IMAGE_WIDTH, null, { fit: 'inside' })
        .withMetadata()
        .jpeg({quality: QUALITY_IMAGE})
        .toBuffer();
}