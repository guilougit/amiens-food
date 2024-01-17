import MenuBar from "@/src/components/MenuBar";

export default function MenuBarLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <MenuBar />
            {children}
        </>
    )
}