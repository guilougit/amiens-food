import Hero from "@/src/components/v2/hero";
import {ListSteps} from "@/src/components/v2/list-steps";
import {ListPartnersLandingPage} from "@/src/components/v2/list-partners";

export default async function LandingPage()  {
    
    // Get customizable text
    const texts = await fetch(`${process.env.APP_URL}/api/texts`, { cache: 'no-store' }).then(res => res.json())
    
    return (
        <>
            <Hero texts={texts} />


            <section className="relative">
                {/* Bg */}
                <div
                    aria-hidden="true"
                />
                <ListSteps texts={texts} />
                <ListPartnersLandingPage />
            </section>

        </>
    )
}