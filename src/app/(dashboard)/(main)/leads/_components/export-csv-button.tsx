'use client'

import { Button } from "@/components/ui/button";
import { Lead } from "../types";
import { useState } from "react";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { generateLeadsCSVByBatch } from "../actions";

interface Props {
    leads: Lead[]
}

export function ExportCSVButton({ leads }: Props) {


    const params = useSearchParams();
    const batch = params.get('batch');

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true)

            const { data } = await generateLeadsCSVByBatch(batch as string)

            const url = window.URL.createObjectURL(new Blob([data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${batch}.csv`;
            document.body.appendChild(a);
            a.click();
            console.log('CSV file downloaded successfully');

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button disabled={isLoading} variant="default" onClick={() => handleClick()}>
            {isLoading ? 'Loading...' : 'Export CSV'}
        </Button>
    )

}