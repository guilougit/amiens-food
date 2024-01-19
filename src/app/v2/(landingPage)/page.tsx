import Hero from "@/src/components/v2/hero";
import {ListSteps} from "@/src/components/v2/list-steps";
import {ListPartnersLandingPage} from "@/src/components/v2/list-partners";

export default function LandingPage()  {
    return (
        <>
            <Hero />
            <ListSteps />
            <ListPartnersLandingPage />
        </>
    )
}