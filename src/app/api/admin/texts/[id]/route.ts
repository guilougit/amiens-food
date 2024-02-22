import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {$Enums} from "@prisma/client";
import Roles = $Enums.Roles;

export async function PATCH(request: Request, params: {params: {id: string}}) {
    const session = await auth()
    
    const {text} = await request.json()

    // Check if user is admin
    if(!session?.user) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    const user = await prisma.user.findUnique({
        where: {id: session.user.id},
    })

    if(!user) { return NextResponse.json({success: false, error: 'User not found'}) }
    if(user.role !== Roles.ADMIN) { return NextResponse.json({success: false, error: 'Not authorized'}) }
     try {
        const updatedText = await prisma.personnalize.update({
            where: {id: params.params.id},
            data: {text: text}
        })
         
         return NextResponse.json({success: true, text: updatedText})
     }
    catch (error) {
        console.log(error)
        return NextResponse.json({success: false})
    }
    
}