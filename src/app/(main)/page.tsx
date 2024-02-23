import Hero from "@/src/components/v2/hero";
import {ListSteps} from "@/src/components/v2/list-steps";
import {ListPartnersLandingPage} from "@/src/components/v2/list-partners";

export default async function LandingPage()  {
    
    // Get customizable text
    const texts = await fetch(`${process.env.APP_URL}/api/texts`).then(res => res.json())
    
    return (
        <>
            <Hero texts={texts} />
            <ListSteps texts={texts} />
            <p>;ENV : {process.env.APP_URL}</p>
            <ListPartnersLandingPage />
        </>
    )
}