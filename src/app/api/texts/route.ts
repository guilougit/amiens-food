import prisma from "@/src/lib/prisma";
import {NextResponse} from "next/server";

export const revalidate = 0;

export async function GET() {
    const texts = await prisma.personnalize.findMany()
    
    console.log('ok')
    
    return NextResponse.json(texts)
}
