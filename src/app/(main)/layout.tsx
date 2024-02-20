import Header from "@/src/components/v2/ui/header";
import Footer from "@/src/components/v2/ui/footer";
import AnimationProvider from "@/src/components/providers/animation-provider";

export default function HomeLayout({children}:{children: React.ReactNode}) {
    return (
        <>
            <Header />
            <main className="grow">
                <AnimationProvider>
                    {children}
                </AnimationProvider>
            </main>
            <Footer />
        </>
    )
}