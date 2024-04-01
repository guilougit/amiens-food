import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() { 
    //region PAGE D'ACCUEIL
    await prisma.personnalize.upsert({
        where: {libelle: "Titre page d'accueil"},
        update: {},
        create: {
            code: 'LANDING_HERO_TITLE',
            libelle: "Titre page d'accueil",
            text: "Ta carte <br> amiénoise pour tes sorties <br>"
        }
    })

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
    //endregion

    //region PAGE PARTENAIRE
    await prisma.personnalize.upsert({
        where: {libelle: "Titre liste des partenaires"},
        update: {},
        create: {
            code: 'PARTNER_LIST_TITLE',
            libelle: "Titre liste des partenaires",
            text: "Plus de X restaurants partenaires"
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Sous-titre liste des partenaires"},
        update: {},
        create: {
            code: 'PARTNER_LIST_SUBTITLE',
            libelle: "Sous-titre liste des partenaires",
            text: "[Ajouter une petite phrase d'accroche]"
        }
    })
    //endregion
    
    //region PAGE CONTACT
    await prisma.personnalize.upsert({
        where: {libelle: "Titre page contact"},
        update: {},
        create: {
            code: 'CONTACT_TITLE',
            libelle: "Titre page contact",
            text: "Contactez-nous"
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Titre formulaire page contact"},
        update: {},
        create: {
            code: 'CONTACT_FORM_TITLE',
            libelle: "Titre formulaire page contact",
            text: "Envoyez-nous un message"
        }
    })
    //endregion
    
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