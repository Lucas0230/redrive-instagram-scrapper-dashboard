
import { buttonVariants } from "@/components/ui/button"
import { LeadsDataTable } from "./_components/leads-data-table"
import { getLeadsByBatch } from "./actions";
import { getRedriveScrapperBatches } from "../tasks/actions";
import { ExportCSVButton } from "./_components/export-csv-button";

interface Props {
    searchParams: { [key: string]: string }
}

export default async function Page({ searchParams }: Props) {

    const batches = await getRedriveScrapperBatches();
    const { data: leads } = await getLeadsByBatch(searchParams.batch || batches[0]);

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">

            <div className="w-full max-w-5xl p-4 md:p-6 lg:p-8 bg-white shadow-sm rounded-md">

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Leads</h1>
                    <div className="flex flex-row gap-2">
                        <a href="/app/tasks" className={buttonVariants({ variant: "outline" })}>Go to Tasks</a>
                        <ExportCSVButton leads={leads} />
                    </div>
                </div>

                <LeadsDataTable
                    leads={leads}
                    batches={batches}
                />

            </div>

        </div >
    )
}