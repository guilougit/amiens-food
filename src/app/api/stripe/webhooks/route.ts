import {Resend} from "resend";
import {NextResponse} from "next/server";
import {headers} from "next/headers";
import prisma from "@/src/lib/prisma";
import {DateTime} from "luxon";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const resend = new Resend(process.env.RESEND_API_KEY)

type EventName =
    | "invoice.payment_succeeded"
    | "customer.subscription.created"
    | "customer.subscription.updated"
    | "customer.subscription.deleted"
    | "customer.subscription.paused"
    | "customer.subscription.resumed";

async function handleStripeWebhook(body: any) {
    const customer = body.data?.object.customer
    const startAt = body.data?.object.period_start
    const expireAt = body.data?.object.period_end
    const subId = body.data?.object.sub_1OkxQgIATEq1uUKp0eLAbEH4
    
    // Switch on the event type.
    switch (body.type) {
        case "invoice.payment_succeeded":
            try {
                await prisma.stripeAccount.update({
                    where: {
                        customer_id: customer
                    },
                    data: {
                        expireAt: DateTime.now().plus({years: 1}).toISO(), // +1 year
                        sub_valid: true,
                        subscription: subId,
                    }
                })
            }
            catch (error) {
                console.log('error while updating user subscription')
            }

            return NextResponse.json({ success: true, message: "Customer payment succeeded!" })
        case "customer.subscription.created":
            try {
                await prisma.stripeAccount.update({
                    where: {
                        customer_id: customer
                    },
                    data: {
                        start: DateTime.now().toISO()
                    }
                })
            }
            catch (error) {
                console.log('error while updating user subscription')
            }
            return NextResponse.json({ success: true, message: "Customer subscription created!" })

        case "customer.subscription.updated":
            if(body.data?.object.cancel_at) { // cancel
                await prisma.stripeAccount.update({
                    where: {
                        customer_id: customer
                    },
                    data: {
                        sub_valid: false
                    }
                })
            }
            else { // active
                await prisma.stripeAccount.update({
                    where: {
                        customer_id: customer
                    },
                    data: {
                        sub_valid: true
                    }
                })
            }
            return NextResponse.json({ success: true, message: "Customer subscription updated!" })
        case "customer.subscription.deleted":
            try {
                await prisma.stripeAccount.update({
                    where: {
                        customer_id: customer
                    },
                    data: {
                        sub_valid: false,
                    }
                })
            }
            catch (error) {
                console.log('error while updating user subscription')
            }
            // Add logic for handling the deletion of a customer's subscription
            return NextResponse.json({ success: true, message: "Customer subscription deleted!" })
        case "customer.subscription.paused":
            console.log('sub paused')
            // Add logic for handling the pausing of a customer's subscription
            return NextResponse.json({ success: true, message: "Customer subscription paused!" })
        case "customer.subscription.resumed":
            console.log('sub resumed')
            // Add logic for handling the resumption of a customer's subscription
            return NextResponse.json({ success: true, message: "Customer subscription resumed!" })

        default:
            return NextResponse.json({success: false, message: "Invalid event type" })

    }
}

export async function POST(request: Request) {
    try {
        const headersList = headers()

        const body = await request.text();
        const sig = headersList.get('stripe-signature')

        const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

        const webhookResponse = await handleStripeWebhook(event);

        return NextResponse.json(webhookResponse?.body)
    }
    catch (error) {
        console.error("Error in Stripe webhook handler:", error);
        return NextResponse.json({success: false, message: 'Webhook handler failed.'})

    }


}