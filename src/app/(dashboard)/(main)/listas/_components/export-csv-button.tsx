'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { generateLeadsCSVByBatch } from "../actions";
import { DownloadIcon } from "@radix-ui/react-icons";
import { RedriveLead } from "@/types/redrive-lead";

interface Props {
    leads: RedriveLead[]
}

export function ExportCSVButton() {

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
        <Button disabled={isLoading} variant="outline" onClick={() => handleClick()}>
            {isLoading ? 'Exportando...' : (
                <>
                    <DownloadIcon className="w-3 h-3 mr-2" />
                    <p>Exportar</p>
                </>
            )}
        </Button>
    )

}