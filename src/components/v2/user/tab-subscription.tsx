import {Card, CardContent, CardHeader} from "@/src/components/ui/card";
import {prices} from "@/src/config/prices";
import {Button} from "@/src/components/ui/button";
import {Badge} from "@/src/components/ui/badge";
import {DateTime} from "luxon";
import {useState} from "react";

export const TabSubscription = ({user}: { user: any }) => {
    const [isRedirecting, setIsRedirecting] = useState(false)
    
    const redirectToCustomerPortal = () => {
        setIsRedirecting(true)
        fetch("/api/payment/portal")
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    window.location.assign(res.url)
                }
                                
                setTimeout(() => {
                    setIsRedirecting(false)
                }, 1000)
            })
    }
    
    return (
        <div className={"space-y-4 pb-12"}>
            <h1 className={"text-xl font-semibold"}>Mon abonnement</h1>
            <Card>
                <CardHeader className={"flex flex-row justify-between"}>
                    <div>
                        <h3 className={"text-lg md:text-xl text-sm"}>Abonnement annuel</h3>
                        {user?.StripeAccount?.sub_valid ? (
                            <Badge variant={"success"}
                                   className={"mt-2"}>Actif</Badge>

                        ) : (
                            <Badge variant={"destructive"} className={"mt-2"}>Abonnement inactif</Badge>
                        )}
                    </div>

                    <div>
                        <p className={"text-sm"}>
                            <strong>${prices.annually.amount} €</strong>par an
                        </p>
                    </div>

                </CardHeader>
                <CardContent>
                    {user?.StripeAccount?.sub_valid && (
                        <>
                            <div className={"flex items-center gap-1.5"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="lucide lucide-receipt-euro">
                                    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
                                    <path d="M8 12h5"/>
                                    <path d="M16 9.5a4 4 0 1 0 0 5.2"/>
                                </svg>
                                <p className={"text-gray-500"}>Renouvellement</p>
                                <p>{DateTime.fromISO(user.StripeAccount.expireAt).toFormat('dd/MM/yyyy')}</p>
                            </div>
                            <div className={"flex items-center gap-1.5"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                     stroke-linejoin="round" className="lucide lucide-user-check">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <polyline points="16 11 18 13 22 9"/>
                                </svg>
                                <p className={"text-gray-500"}>Abonné depuis</p>
                                <p>{DateTime.fromISO(user.StripeAccount.start).toFormat('dd/MM/yyyy')}</p>
                            </div>
                        </>
                    )}

                    <Button variant={"outline"} className={"mt-6"} onClick={redirectToCustomerPortal} isLoading={isRedirecting}>Gérer mon abonnement</Button>
                </CardContent>
            </Card>
        </div>

    )
}