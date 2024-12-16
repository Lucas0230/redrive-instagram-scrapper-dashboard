import { Metadata } from "next"

import { DataTable } from "./_components/data-table"

export const metadata: Metadata = {
    title: "Tasks",
    description: "A task and issue tracker build using Tanstack Table.",
}

import { getSalesTeamLeadsBatches, getSalesTeamLeadsByBatch } from "./actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User2Icon } from "lucide-react"
import { BatchesFilter } from "../../_components/batches-filter"
import { columns } from "./_components/columns"
import { useMemo, useState } from "react"
import { LeadsTableAnalyticsContext, LeadsTableAnalyticsProvider } from "@/contexts/leads-table-analytics"
import { TableCards } from "./_components/table-cards"


type Props = {
    searchParams: { batch: string }
}

export default async function Page({ searchParams }: Props) {

    const batches = await getSalesTeamLeadsBatches();
    const leads = await getSalesTeamLeadsByBatch({ batch: searchParams.batch || batches[0] });

    //@ts-ignore
    const rows = leads.map((lead, i) => ({
        ...lead,
        _id: lead.id,
        id: i,
        status: lead.isLeadQualified,
        name: lead.firstname + lead.lastname
    }))


    return (
        <>
            <div className="hidden h-fit flex-1 flex-col p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Comercial / Telemarketing</h2>
                        <p className="text-muted-foreground">
                            Aqui estão as listas de prospecção ativa.
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <BatchesFilter batches={batches} />
                </div>

                <div className="mt-6">
                    <LeadsTableAnalyticsProvider>
                        {/* <TableCards /> */}
                        <DataTable
                            batches={batches}
                            data={rows}
                            columns={columns}
                        />
                    </LeadsTableAnalyticsProvider>
                </div>
            </div>
        </>
    )
}