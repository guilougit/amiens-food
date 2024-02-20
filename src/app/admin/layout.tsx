import {ReactNode} from "react";
import AdminProvider from "@/src/components/providers/admin-provider";
import AdminHeader from "@/src/components/v2/admin/menu/header";
import AdminSidebar from "@/src/components/v2/admin/menu/sidebar";

export default function AdminLayout ({children}:{children: ReactNode}) {
    return (
        <AdminProvider>
            <div className="flex h-[100dvh] overflow-hidden">

                {/* Sidebar */}
                <AdminSidebar/>

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                    {/*  Site header */}
                    <AdminHeader/>

                    <main className="grow [&>*:first-child]:scroll-mt-16">
                        {children}
                    </main>

                </div>

            </div>
        </AdminProvider>
    )
}