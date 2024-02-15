"use client"

import {useState} from "react";
import {Button} from "@/src/components/ui/button";
import {signOut} from "next-auth/react";
import {LogOut} from "lucide-react";
import * as React from "react";


type size = "desktop" | "mobile"

export const LogoutButton = ({size}:{size: size}) => {
    const [isClicked, setIsClicked] = useState(false)
    
    return (
        <Button className={`mt-6 flex lg:hidden ${!isClicked?'gap-2':''} ${size === 'desktop' ? 'hidden lg:flex': 'flex lg:hidden'}`} variant={"secondary"} onClick={async () => {
            setIsClicked(true)
            await signOut({callbackUrl: '/'})
        }} isLoading={isClicked}
        >
            {!isClicked && <LogOut />}
            
            {isClicked ? 'Déconnexion' : 'Se déconnecter'}
        </Button>
    )
}