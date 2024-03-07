import {auth} from "@/src/auth";
import {NextResponse} from "next/server";
import prisma from "@/src/lib/prisma";
import {$Enums} from "@prisma/client";
import Roles = $Enums.Roles;
import {uploadLogo, uploadMedias} from "@/src/utils/aws";
/*
export async function POST(request: Request) {
    const session = await auth()
    
    const data = await request.formData()

    const blog = JSON.parse(data.get("blog") as string)

    // Check if user is admin
    if(!session?.user) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    const user = await prisma.user.findUnique({
        where: {id: session.user.id},
    })
    
    if(!user) { return NextResponse.json({success: false, error: 'User not found'}) }
    if(user.role !== Roles.ADMIN) { return NextResponse.json({success: false, error: 'Not authorized'}) }
    
    
    // Create new model with data
    const newBlog = await prisma.blog.create({
        data: {
            title: blog.title,
            slug: blog.slug,
            description: blog.description,            
        }
    }) 
    
    // Return response -> in client,redirect to the list of blog
    return NextResponse.json({success: true, blog: newBlog})
}

export async function GET(){
    const session = await auth()
    
    // Check if user is admin
    if(!session?.user) {
        return NextResponse.json({success: false, error: 'User must be connected'})
    }
    const user = await prisma.user.findUnique({
        where: {id: session.user.id},
    })

    if(!user) { return NextResponse.json({success: false, error: 'User not found'}) }
    if(user.role !== Roles.ADMIN) { return NextResponse.json({success: false, error: 'Not authorized'}) }

    const blog = await prisma.blog.findMany({
        include: {
            offers: true,
            medias: true
        }
    })
    
    return NextResponse.json({success: true, blog})
}*/