import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {headers} from "next/headers";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export async function GET(){
    const session = await auth()
    const headersList = headers()
    const baseUrl = headersList.get('host')

    
    if(!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }

    const user = await prisma.user.findUnique({
        where: {email: session.user.email},
        include: {StripeAccount: true}
    })
    if(!user || !user.StripeAccount) return NextResponse.json({error: true, message: 'User not found or not stripe account'})
    
    // Get customer portal for the client
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.StripeAccount.customer_id,
        return_url: `http://${baseUrl}/compte`
    })
    
    return NextResponse.json({success: true, url: portalSession.url})
}