import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {$Enums} from "@prisma/client";
import Roles = $Enums.Roles;
import {deleteFileOnAws, uploadLogo, uploadMedias} from "@/src/utils/aws";

export async function PATCH(request: Request, params: {params: {slug: string}}) {
    const session = await auth()

    const data = await request.formData()

    const logo = data.get('logo') as any
    const partner = JSON.parse(data.get("partner") as string)
    const medias = data.getAll('medias')

    // Check if user is admin
    if(!session?.user) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    const user = await prisma.user.findUnique({
        where: {id: session.user.id},
    })

    if(!user) { return NextResponse.json({success: false, error: 'User not found'}) }
    if(user.role !== Roles.ADMIN) { return NextResponse.json({success: false, error: 'Not authorized'}) }
    
    const partnerDb = await prisma.partner.findUnique({
        where: {id: partner.id},
        include: {medias: true}
    })
    
    if(!partnerDb) return NextResponse.json({success: false})
    
    try {
        // ******** FILES ********
        if(logo && logo !== 'undefined') {
            const logoPath = await uploadLogo(logo)

            // delete logo on aws
            if(partnerDb.logo) {
                await deleteFileOnAws(partnerDb.logo)
            }
            
            // replace logo on model
            await prisma.partner.update({
                where: {id: partnerDb.id},
                data: {
                    logo: logoPath
                }
            })

        }
        if(medias.length > 0) {
            const mediasPath = await uploadMedias(medias as File[])

            // remove older medias
            if(partnerDb.medias.length > 0) {
                for (const media of partnerDb.medias) {
                    if(media.path) await deleteFileOnAws(media.path)
                }
            }
            
            // Delete medias on model
            await prisma.media.deleteMany({
                where: {partnerId: partnerDb.id}
            })
            
            // Create new medias on model
            const mediasPathWithPartner = mediasPath.map(media => ({
                ...media,
                partnerId: partnerDb.id
            }));
            await prisma.media.createMany({
                data: mediasPathWithPartner,
            })
        }

        // ******** DATA ********
        
        // delete previous offers
        await prisma.offer.deleteMany({
            where: {partnerId: partner.id}
        })
        
        await prisma.partner.update({
            where: {id: partner.id},
            data: {
                name: partner.name,
                slug: partner.slug,
                description: partner.description,
                iframe: partner.iframe.replaceAll('&#39;', '%27'),
                offers: {
                    createMany: {
                        data: partner.offers.map((text: string) => ({ text }))
                    }
                }
            }
        })
        
        return NextResponse.json({success: true})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({success: false, message: 'server_error'})
    }
}


export async function DELETE(request: Request, {params}: { params: { slug: string } }) {
    const session = await auth()

    // Check if user is admin
    if(!session?.user) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    const user = await prisma.user.findUnique({
        where: {id: session.user.id},
    })

    if(!user) { return NextResponse.json({success: false, error: 'User not found'}) }
    if(user.role !== Roles.ADMIN) { return NextResponse.json({success: false, error: 'Not authorized'}) }
    
    const partner = await prisma.partner.findUnique({
        where: {slug: params.slug},
        include: {
            medias: true
        }
    })
    
    if(!partner) return NextResponse.json({success: 'false'})
    
    try {
        // Remove images on aws
        if(partner.logo) {
            await deleteFileOnAws(partner.logo)
        }

        if(partner.medias.length > 0) {
            for (const media of partner.medias) {
                if(media.path) await deleteFileOnAws(media.path)
            }
        }

        await prisma.partner.delete({
            where: {id: partner.id}
        })
        
        return NextResponse.json({success: true})
    }
    catch (e) { return NextResponse.json({success: false}) }
}