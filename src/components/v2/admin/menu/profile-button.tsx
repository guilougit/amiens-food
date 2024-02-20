"use client"

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {Button} from "@/src/components/ui/button";
import {signOut, useSession} from "next-auth/react";
import {ChevronDown, LogOut} from "lucide-react";
import React from "react";

const ProfileButton = () => {
    const {data: session, status} = useSession()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {session?.user.email}
                        <ChevronDown className="ml-2 h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={async () => {
                        await signOut({callbackUrl: '/'})
                    }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Se déconnecter</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default ProfileButton