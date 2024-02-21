import prisma from "@/src/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: { params: { slug: string } }) {
    const partner = await prisma.partner.findUnique({
        where: {slug: params.slug},
        include: {
            offers: true,
            medias: true
        }
    })
    
    if(partner) {
        return NextResponse.json({success: true, partner})
    }
    else {
        return NextResponse.json({success: false})
    }
    
}