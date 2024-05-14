import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {Prisma} from ".prisma/client";
import sql = Prisma.sql;

export async function GET() {
    const session = await auth()

    // Check if user is admin
    if (!session?.user) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    
    // Get a random user
    const users = await prisma.user.findMany({
        where: {
            card_number: {
                gt: 1 // exclude card 1 -> admin
            },
            StripeAccount: {
                sub_valid: true // take users with valid subscription
            }
        },
        select: {
            card: true,
            card_number: true,
            firstname: true,
            lastname: true,
            email: true
        }
    });
    
    const randomIndex = Math.floor(Math.random() * users.length)
    const randomUser = users[randomIndex]
    
    return NextResponse.json(randomUser)
}
