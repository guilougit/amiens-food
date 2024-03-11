import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.personnalize.upsert({
        where: {libelle: "Description bannière page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_HERO_SUBTITLE',
            libelle: "Description bannière page d'accueil",
            text: ""
        }
    })

    await prisma.personnalize.upsert({
        where: {libelle: "Titre bloc 1 page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_BLOC_1_TITLE',
            libelle: "Titre bloc 1 page d'accueil",
            text: "Achète ta carte"
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Contenu bloc 1 page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_BLOC_1_CONTENT',
            libelle: "Contenu bloc 1 page d'accueil",
            text: "Créer ton compte et achète la carte sur une plateforme fiable et sécurisée pour la recevoir directement par mail."
        }
    })

    await prisma.personnalize.upsert({
        where: {libelle: "Titre bloc 2 page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_BLOC_2_TITLE',
            libelle: "Titre bloc 2 page d'accueil",
            text: "Enregistre ta carte"
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Contenu bloc 2 page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_BLOC_2_CONTENT',
            libelle: "Contenu bloc 2 page d'accueil",
            text: "Ajoute ta carte sur le wallet de ton téléphone, ou connecte toi pour la récupérer."
        }
    })

    await prisma.personnalize.upsert({
        where: {libelle: "Titre bloc 3 page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_BLOC_3_TITLE',
            libelle: "Titre bloc 3 page d'accueil",
            text: "Utilise ta carte"
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Contenu bloc 3 page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_BLOC_3_CONTENT',
            libelle: "Contenu bloc 3 page d'accueil",
            text: "Présente-la chez nos restaurants partenaires pour profiter des réductions instantanées."
        }
    })
    
    
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })