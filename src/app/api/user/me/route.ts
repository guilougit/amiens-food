import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
    const session = await auth()

    if(!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }

    const user = await prisma.user.findUnique({
        where: {email: session.user.email},
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            surname: true,
            image: true,
            card: true,
            role: true,
            StripeAccount: {
                select: {
                    customer_id: true,
                    sub_valid: true,
                    subscription: true,
                    start: true,
                    expireAt: true,
                }
            }
        }
    })
    
    if(user) return NextResponse.json({success: true, user})
    
    return NextResponse.json({success: false, message: 'User not found'})
}