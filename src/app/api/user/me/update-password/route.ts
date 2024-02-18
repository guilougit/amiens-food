import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {compare, hash} from "bcryptjs";

export async function POST(request: Request) {
    const session = await auth()

    // check if user is connected
    if (!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    
    const {oldPassword, newPassword} = await request.json()
    
    // Check if old password is correct
    const userInDb = await prisma.user.findUnique({
        where: {id: session.user.id}
    })

    if(!(await compare(oldPassword, userInDb?.password ?? ''))) {
        return NextResponse.json({success: false, code: 'BAD_PASSWORD'})
    }
    
    // Update the password
    try {
        const newPwdHashed = await hash(newPassword, 10)
        await prisma.user.update({
            where: {id: session.user.id},
            data: {
                password: newPwdHashed
            }
        })
        return NextResponse.json({success: true})
    }
    catch(error) {
        return NextResponse.json({success: false, error: 'Error updating password'})
    }
    
}