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
    }));


    const qualified = leads.filter((lead: { isLeadQualified?: boolean }) => lead.isLeadQualified).length;
    const verified = leads.filter((lead: { isLeadQualified?: boolean }) => typeof lead.isLeadQualified == 'boolean').length;
    // console.log({ qualified, verified })

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

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                    <Card className="!shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                            <CardTitle className="text-sm font-medium">
                                Total de Leads
                            </CardTitle>
                            <User2Icon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mt-1">{leads.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="!shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                            <CardTitle className="text-sm font-medium">
                                Qualificados
                            </CardTitle>
                            <User2Icon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mt-1">{qualified}</div>
                        </CardContent>
                    </Card>
                    <Card className="!shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                            <CardTitle className="text-sm font-medium">
                                % de Qualificados
                            </CardTitle>
                            <User2Icon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mt-1">
                                {(isNaN(((qualified / leads.length) * 100)) ? 0 : ((qualified / leads.length) * 100)).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="!shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                            <CardTitle className="text-sm font-medium">
                                % de Progresso
                            </CardTitle>
                            <User2Icon className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mt-1">
                                {(isNaN(((verified / leads.length) * 100)) ? 0 : ((verified / leads.length) * 100)).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6 h-auto pb-10">
                    <DataTable
                        batches={batches}
                        data={rows}
                        columns={columns}
                    />
                </div>
            </div>
        </>
    )
}