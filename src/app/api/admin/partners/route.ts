import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {$Enums} from "@prisma/client";
import Roles = $Enums.Roles;
import {uploadFileOnAws} from "@/src/utils/aws";

export async function POST(request: Request) {
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
    
    // Upload files
    const logoPath = await uploadLogo(logo)
    const mediasPath = await uploadMedias(medias as File[])
    
    // Create new model with data
    const newPartner = await prisma.partner.create({
        data: {
            name: partner.name,
            slug: partner.slug,
            description: partner.description,
            iframe: partner.iframe,
            offers: {
                createMany: {
                    data: partner.offers.map((text: string) => ({ text }))
                }
            },
            logo: logoPath,
            medias: {
                createMany: {
                    data: mediasPath
                }
            }
        }
    }) 
    
    // Return response -> in client,redirect to the list of partners
    return NextResponse.json({success: true, partner: newPartner})
}

export async function GET(){
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

    const partners = await prisma.partner.findMany({
        include: {
            offers: true,
            medias: true
        }
    })
    
    return NextResponse.json({success: true, partners})
}

const uploadLogo = async (file: any) => {
    console.log('start uploading logo')
    const filename = `partners/${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const buffer= Buffer.from(await file.arrayBuffer())
    await uploadFileOnAws(buffer, filename)
    console.log('end uploading logo')


    return filename
}

const uploadMedias = async (files: File[]) => {
    console.log('start uploading medias')

    let listPath = []
    for (const file of files) {
        const filename = `partners/${Date.now()}-${Math.floor(Math.random() * 1000)}`
        const buffer= Buffer.from(await file.arrayBuffer())

        await uploadFileOnAws(buffer, filename)
        
        listPath.push({path: filename})
    }
    
    console.log('end uploading medias')
    
    return listPath
}