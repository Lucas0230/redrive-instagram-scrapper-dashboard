
import { Button } from "@/components/ui/button"
import { LeadsDataTable } from "./_components/leads-data-table"

interface Props {
    searchParams: { [key: string]: string }
}

export default async function Page({ searchParams }: Props) {


    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">

            <div className="w-full max-w-5xl p-4 md:p-6 lg:p-8 bg-white shadow-sm rounded-md">

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Leads</h1>
                    <Button>
                        Tasks
                    </Button>
                </div>

                <LeadsDataTable
                    tasks={[]}
                    batches={[]}
                />

            </div>


        </div >
    )
}