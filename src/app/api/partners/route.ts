import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET(){
    const partners = await prisma.partner.findMany({
        include: {
            offers: true,
        }
    })

    return NextResponse.json({success: true, partners})
}