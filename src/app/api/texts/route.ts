import prisma from "@/src/lib/prisma";
import {NextResponse} from "next/server";

export async function GET() {
    const texts = await prisma.personnalize.findMany()
    
    return NextResponse.json(texts)
}