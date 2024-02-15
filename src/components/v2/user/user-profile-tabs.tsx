"use client"

import {
    Tabs,
} from "@/src/components/ui/tabs"
import {useEffect, useState} from "react";
import {TabCard} from "@/src/components/v2/user/tab-card";
import {TabSubscription} from "@/src/components/v2/user/tab-subscription";
import {TabSettings} from "@/src/components/v2/user/tab-settings";
import {Coins, CreditCard, LogOut, Settings} from "lucide-react";
import {Button} from "@/src/components/ui/button";
import {signOut} from "next-auth/react";
import {LogoutButton} from "@/src/components/ui/logout-button";

type Tabs = "card" | "subscription" | "settings";

export const UserProfileTabs = () => {
    const [user, setUser] = useState<any>();
    const [tab, setTab] = useState<Tabs>("card")
    
    const handleChangeTab = (tab: Tabs) => {
        setTab(tab)
    }

    useEffect(() => {
        fetch("/api/user/me")
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    setUser(res.user)
                }
            })

    }, [])

    return (
       <div className={"grid grid-cols-1 lg:grid-cols-2 w-full gap-6 mx-6 mt-8 lg:gap-24 lg:w-5/6 lg:mx-auto "}>
           <div className={"min-w-[300px]"}>
               <h1 className={"h3"}>Mon compte</h1>

               {/* TABS */}
               <div className={"mt-6 space-y-0 flex gap-1 justify-center md:gap-8 lg:block lg:space-y-3"}>
                   <p onClick={() => handleChangeTab("card")} className={`tab_custom ${tab === "card"?'tab_active':''}`}>
                       <CreditCard size={16} />
                       Ma carte
                   </p>
                   <p onClick={() => handleChangeTab("subscription")} className={`tab_custom ${tab === "subscription"?'tab_active':''}`}>
                       <Coins size={16} />
                       Abonnement
                   </p>
                   <p onClick={() => handleChangeTab("settings")} className={`tab_custom ${tab === "settings"?'tab_active':''}`}>
                       <Settings size={16} />
                       Paramètres
                   </p>
               </div>

               <LogoutButton size={"desktop"} />
           </div>

           <>
               <div className={tab === "card" ? '' : 'hidden'}>
                   <TabCard user={user}/>
               </div>
               <div className={tab === "subscription" ? '' : 'hidden'}>
                   <TabSubscription user={user}/>
               </div>
               <div className={tab === "settings" ? '' : 'hidden'}>
                   <TabSettings user={user}/>
               </div>
           </>


       </div>
    )
}