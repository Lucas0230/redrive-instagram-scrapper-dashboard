'use client';

import { Button } from "@/components/ui/button";
import { runRedriveScrapperQueue } from "../actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode
}

export function RunTasksButton({ children }: Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {

            setIsLoading(true);
            await runRedriveScrapperQueue()
            router.refresh();

        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button disabled={isLoading} onClick={() => handleClick()}>
            {isLoading ? 'Loading...' : children}
        </Button>
    )

}