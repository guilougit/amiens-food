import {headers} from "next/headers";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {auth} from "@/src/app/api/auth/[...nextauth]/route";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export async function POST(request : Request) {
    const {priceId} = await request.json()
    
    const session = await auth()
    
    if(!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }

    const headersList = headers()

    try {
        const user = await prisma.user.findUnique({
            where: {email: session.user.email},
            include: {StripeAccount: true}
        })

        const baseUrl = headersList.get('host')
        let customerId;

        if(user && !!priceId && !!baseUrl) {
            // Check if account has customer
            if (!user.StripeAccount) {
                // If not: create it
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: user.firstname + ' ' + user.lastname,
                    metadata: {
                        user_id: session.user.id
                    }
                })

                await prisma.stripeAccount.create({
                    data: {
                        customer_id: customer.id,
                        userId: user.id,
                        subscription: '',
                    }
                })

                customerId = customer.id
            }
            else {
                customerId = user.StripeAccount.customer_id
            }

            // Create the stripe checkout session
            const checkout_session = await stripe.checkout.sessions.create({
                customer: customerId,
                currency: 'eur',
                mode: 'subscription',
                locale: 'fr',
                line_items: [{price: priceId, quantity: 1}],
                success_url: `http://${baseUrl}/payment/success`,
                cancel_url: `http://${baseUrl}/`
            })

            // Return the link
            return NextResponse.json({success: true, url: checkout_session.url})
        }

        return NextResponse.json({success: false, error: 'Missing data'})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({success: false, error: e})
    }
}
    
