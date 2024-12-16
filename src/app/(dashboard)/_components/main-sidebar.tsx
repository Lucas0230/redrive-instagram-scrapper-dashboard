'use client'

import Link from "next/link"
import {
    DoorOpen,
    PhoneCall,
} from "lucide-react"

import Image from "next/image"
import { ReaderIcon, TableIcon } from "@radix-ui/react-icons"
import { usePathname } from "next/navigation"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"


type MainSidebarProps = {
    user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {

    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname.includes(path);
    }

    if (!user) return

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={20}
                                height={20}
                            />
                            <span className="">V4 Ames & Co.</span>
                        </Link>

                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

                            {/* <SidebarItem
                                href="#"
                                isActive={false}
                            >
                                <Home className="h-4 w-4" />
                                Visão Geral
                            </SidebarItem> */}

                            <SidebarItem
                                href="/listas"
                                isActive={isActive('listas')}
                            >
                                <ReaderIcon className="h-4 w-4" />
                                Listas
                            </SidebarItem>

                            <SidebarItem
                                href="/comercial"
                                isActive={isActive('comercial')}
                            >
                                <PhoneCall className="h-4 w-4" />
                                Comercial
                            </SidebarItem>

                        </nav>
                    </div>
                    <div className="mt-auto p-2 px-4 border-t">
                        <button
                            onClick={() => signOut()}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <DoorOpen className="h-4 w-4" />
                            Sair
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}



type SidebarItemProps = {
    children: React.ReactNode
    isActive: boolean
    href: string
}

function SidebarItem({ children, href, isActive }: SidebarItemProps) {

    if (isActive) return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
        >
            {children}
        </Link>
    )

    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
            {children}
        </Link >
    )


}