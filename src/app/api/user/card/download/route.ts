import {auth} from "@/src/app/api/auth/[...nextauth]/route";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
    const session = await auth()

    if(!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }

    // Get user
    const user = await prisma.user.findUnique({
        where: {email: session.user.email},
        include: {StripeAccount: true}
    })

    if(user && user.card /*&& user.StripeAccount && user.StripeAccount.sub_valid*/) {
        // Set headers or the response
        const headers = {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename="amiensfood_${user.lastname?.toLowerCase()}.png"`,
        };

        const response = await fetch(`${process.env.AWS_S3_URL_FILE}/${user.card}`);

        return new Response(response.body, {headers});

    }
    return NextResponse.json({success: false, error: "User not found or don t have card"})

}