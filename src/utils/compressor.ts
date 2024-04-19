import sharp from 'sharp';

export const MAX_IMAGE_WIDTH_PROFILE = 400
export const MAX_IMAGE_WIDTH = 1000
export const QUALITY_IMAGE = 85

export async function compressAndRoundImage(inputBuffer: Buffer): Promise<Buffer> {
    const roundedBuffer = await sharp(inputBuffer)
        // Redimensionner et centrer l'image
        .resize(MAX_IMAGE_WIDTH_PROFILE, MAX_IMAGE_WIDTH_PROFILE, {fit: 'cover', position: 'center'})
        // Créer un cercle SVG avec un rayon égal à la moitié de la largeur de l'image
        .composite([{
            input: Buffer.from(`<svg><circle cx="${MAX_IMAGE_WIDTH_PROFILE / 2}" cy="${MAX_IMAGE_WIDTH_PROFILE / 2}" r="${MAX_IMAGE_WIDTH_PROFILE / 2}" /></svg>`),
            blend: 'dest-in'
        }])
        .png({quality: QUALITY_IMAGE})
        .toBuffer();

    return roundedBuffer;
}

export async function compressImage(inputBuffer: Buffer): Promise<Buffer> {
    const {width} = await sharp(inputBuffer).metadata();
    let roundedBuffer: Buffer;

    if (width && width > MAX_IMAGE_WIDTH) {
        roundedBuffer = await sharp(inputBuffer)
            .resize(MAX_IMAGE_WIDTH, null, {fit: 'inside'}) 
            .jpeg({quality: QUALITY_IMAGE})
            .toBuffer();
    } else {
        roundedBuffer = await sharp(inputBuffer)
            .resize(300, null, {fit: 'inside'})// 300 is less than 600
            .jpeg({quality: QUALITY_IMAGE})
            .toBuffer();
    }

    return roundedBuffer;
}