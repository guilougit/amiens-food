import sharp from 'sharp';

export const MAX_IMAGE_WIDTH = 400
export const QUALITY_IMAGE = 80

export async function compressAndRoundImage(inputBuffer: Buffer): Promise<Buffer> {
    const roundedBuffer = await sharp(inputBuffer)
        // Redimensionner et centrer l'image
        .resize(MAX_IMAGE_WIDTH, MAX_IMAGE_WIDTH, { fit: 'cover', position: 'center' })
        // Créer un cercle SVG avec un rayon égal à la moitié de la largeur de l'image
        .composite([{
            input: Buffer.from(`<svg><circle cx="${MAX_IMAGE_WIDTH / 2}" cy="${MAX_IMAGE_WIDTH / 2}" r="${MAX_IMAGE_WIDTH / 2}" /></svg>`),
            blend: 'dest-in'
        }])
        // Convertir en JPEG
        .png({ quality: QUALITY_IMAGE })
        .toBuffer();

    return roundedBuffer;
}