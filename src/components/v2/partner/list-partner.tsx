"use client"

import {useEffect, useState} from "react";
import {PartnerCard} from "@/src/components/v2/partner/partner-card";
import { Input } from "@/src/components/ui/input";

export const ListPartner = () => {
    const [partners, setPartners] = useState([])
    const [partnersFiltered, setPartnersFiltered] = useState([])
    const [searchText, setSearchText] = useState("")
    
    useEffect(() => {
        fetch("/api/partners")
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    setPartners(res.partners)
                }
            })
    }, []);

    useEffect(() => {
        setPartnersFiltered(partners)
    }, [partners]);
    
    const handleSearchPartner = (text: string) => {
        setSearchText(text)
        
        if(text.trim() === "") {
            setPartnersFiltered(partners)
            return
        } 
        
        const filteredPartners = partners.filter(partner =>
            //@ts-ignore
            partner.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setPartnersFiltered(filteredPartners);
    }
    
    return (
        <div className={"mt-0 md:mt-8 max-w-[1800px] mx-auto px-2 xs:px-12 pb-12"} data-aos={"fade-up"}>
            <Input
                type="text"
                placeholder="Rechercher un restaurant..."
                value={searchText}
                onChange={(event) => handleSearchPartner(event.currentTarget.value)}
                className={"w-[300px] mb-8 mx-auto md:mx-0"}
            />
            {partners.length > 0 ? (
                <>
                    {partnersFiltered.length > 0 ? (
                        <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 xs:gap-6"}>
                            {partnersFiltered.map((partner, index) => (
                                <PartnerCard key={index} props={partner}/>
                            ))}
                        </div>
                    ) : (
                        <div className={"block flex justify-center items-center mt-12 "}>
                            Aucun restaurant trouvé
                        </div>
                    )}
                </>

            ) : (
                <></>
            )}
        </div>
    )
}