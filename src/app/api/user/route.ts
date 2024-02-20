import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {deleteFileOnAws, uploadFileOnAws} from "@/src/utils/aws";
import {User} from ".prisma/client";

export async function PATCH(request: Request) {
    const session = await auth()
    const data = await request.formData()

    const user = JSON.parse(data.get("user") as string)
    const file = data.get('file') as any
    
    if(!session) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    
    const userDb = await prisma.user.findUnique({where: {id: session.user.id}})
    if(!userDb) { return NextResponse.json({success: false, error: 'User not found'}) }
    
    // Check if one field has changed
    if((!file || file === 'undefined') && !checkIfUserHasChanged(userDb, user)) {
        return NextResponse.json({success: false, code: 'NO_CHANGES'})
    }
    
    // Delete the picture on aws if change
    let filename = ""
    
    if(!!file && file !== 'undefined') {
        if(userDb.card) {
            try {
                console.log('START remove user picture on aws')
                if(userDb.image) {
                    await deleteFileOnAws(userDb.image)
                }
                console.log('END remove user picture on aws')
            }
            catch(e) { console.log('UPDATE USER: user picture was not deleted') }
        }

        // Upload new picture on aws
        const buffer = Buffer.from(await file.arrayBuffer())

        filename = `${userDb.id}/picture/${Date.now()}`
        console.log('START upload user picture on aws')
        await uploadFileOnAws(buffer, filename, true)
        console.log('END upload user picture on aws')
    }

    
    // Update the data on user
    try {
        await prisma.user.update({
            where: {id: userDb.id},
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                surname: user.surname,
                image: !!filename ? filename : userDb.image,
            },
        })

        return NextResponse.json({success: true, message: 'User modified'})
    }
    catch(error) {
        return NextResponse.json({success: false, message: 'Error while updating the user'})
    }

    
}

const checkIfUserHasChanged = (userInDatabase: User, userUpdated: User) => {
    return !(userInDatabase.lastname === userUpdated.lastname && userInDatabase.firstname === userUpdated.firstname && userInDatabase.surname === userUpdated.surname);
    
}