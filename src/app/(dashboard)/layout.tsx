import { PropsWithChildren } from "react";
import { MainSidebar } from "./_components/main-sidebar";
import { getServerSession } from "next-auth";
import { MainHeader } from "./_components/main-header";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function Layout({ children }: PropsWithChildren) {

    const session = await getServerSession();

    return (
        <TooltipProvider>
            <div className="grid grid-cols-[17.5rem_1fr] overflow-hidden h-screen w-screen">
                <MainSidebar user={session?.user} />
                <div className="w-full h-full">
                    <MainHeader user={session?.user} />
                    <main className="w-full overflow-auto" style={{ height: 'calc(100vh - 60px)' }}>
                        {children}
                    </main>
                </div>
            </div>
        </TooltipProvider>
    )

}