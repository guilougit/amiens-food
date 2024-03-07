import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {deleteFileOnAws, uploadFileOnAws} from "@/src/utils/aws";
import {User} from "@prisma/client";

export async function PATCH(request: Request) {
    const session = await auth()
    const data = await request.formData()

    const user = JSON.parse(data.get("user") as string)
    
    if(!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    
    const userDb = await prisma.user.findUnique({where: {id: session.user.id}})
    if(!userDb) { return NextResponse.json({success: false, error: 'User not found'}) }
    
    // Check if one field has changed
    if(!checkIfUserHasChanged(userDb, user)) {
        return NextResponse.json({success: false, code: 'NO_CHANGES'})
    }
    
    // Update the data on user
    try {
        await prisma.user.update({
            where: {id: userDb.id},
            data: {
                surname: user.surname,
            },
        })

        return NextResponse.json({success: true, message: 'User modified'})
    }
    catch(error) {
        return NextResponse.json({success: false, message: 'Error while updating the user'})
    }

    
}

const checkIfUserHasChanged = (userInDatabase: User, userUpdated: User) => {
    return !(userInDatabase.surname === userUpdated.surname);
    
}