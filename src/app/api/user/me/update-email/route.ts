import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {compare} from "bcryptjs";

export async function POST(request: Request) {
    const session = await auth()

    // check if user is connected
    if (!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }

    // check if request is valid
    const {email, password} = await request.json()
    
    if(!email || !password) return NextResponse.json({success: false, code: 'MISSING_FIELDS'})

    // check if password is correct
    const userInDb = await prisma.user.findUnique({
        where: {id: session.user.id}
    })

    if(!(await compare(password, userInDb?.password ?? ''))) {
        return NextResponse.json({success: false, code: 'BAD_PASSWORD'})
    }
    
    // check if email has changed
    if(email === session.user.email) {
        return NextResponse.json({success: false, code: 'SAME_EMAIL'})
    }
    
    try {
        const updatedUser = await prisma.user.update({
            where: {id: session.user.id},
            data: {email: email}
        })
        
        return NextResponse.json({success: true, user: updatedUser})
    }
    catch (error) {
        return NextResponse.json({success: false, error: 'Error updating email'}) 
    }
}