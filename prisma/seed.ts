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
    await prisma.personnalize.upsert({
        where: {libelle: "Titre présentation des offres d'un partenaire"},
        update: {},
        create: {
            code: 'PARTNER_OFFERS_DETAIL_TITLE',
            libelle: "Titre présentation des offres d'un partenaire",
            text: "Profitez des offres de ce restaurant"
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
    
    //region PAIEMENT
    await prisma.personnalize.upsert({
        where: {libelle: "Titre page paiement"},
        update: {},
        create: {
            code: 'PAYMENT_TITLE',
            libelle: "Titre page paiement",
            text: "Génère ta carte en <br> 60 secondes chrono"
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Sous-titre page paiement"},
        update: {},
        create: {
            code: 'PAYMENT_SUBTITLE',
            libelle: "Sous-titre page paiement",
            text: "Une fois l'achat effectué, tu recevras ta carte sur ton adresse mail."
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Sous-titre étape 2 page paiement"},
        update: {},
        create: {
            code: 'PAYMENT_SUBTITLE_2',
            libelle: "Sous-titre étape 2 page paiement",
            text: "On a besoin de quelques informations pour générer ta carte."
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Sous-titre prix page paiement"},
        update: {},
        create: {
            code: 'PAYMENT_PRICE_SUBTITLE',
            libelle: "Sous-titre prix page paiement",
            text: "Profite de réductions instantanées sur l'ensemble de nos commerces partenaires."
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Page paiement : titre saisie des informations"},
        update: {},
        create: {
            code: 'PAYMENT_FORM_INF',
            libelle: "Page paiement : titre saisie des informations",
            text: "1. Remplis tes informations"
        }
    })
    await prisma.personnalize.upsert({
        where: {libelle: "Page paiement : titre aperçu de la carte"},
        update: {},
        create: {
            code: 'PAYMENT_FORM_PREVIEW',
            libelle: "Page paiement : titre aperçu de la carte",
            text: "2. Un aperçu de ta carte"
        }
    })
    
    //endregion

    //region QUI SUIS-JE
    await prisma.personnalize.upsert({
        where: {libelle: "Page qui suis-je"},
        update: {},
        create: {
            code: 'ABOUT_PAGE',
            libelle: "Page qui suis-je",
            text: ""
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