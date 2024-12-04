
import { TasksDataTable } from "./_components/tasks-data-table"
import { RunTasksButton } from "./_components/run-tasks-button"
import { getRedriveQueueTasks, getRedriveScrapperBatches } from "./actions"
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    searchParams: { [key: string]: string }
}

export default async function Page({ searchParams }: Props) {

    const batches = await getRedriveScrapperBatches();
    const tasks = await getRedriveQueueTasks({ batch: searchParams.batch })

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">

            <div className="w-full max-w-5xl p-4 md:p-6 lg:p-8 bg-white shadow-sm rounded-md">

                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Tasks</h1>
                    <div className="flex flex-row gap-2">
                        <a href="/app/leads" className={buttonVariants({ variant: "outline" })}>Go to Leads</a>
                        <RunTasksButton>Refresh</RunTasksButton>
                    </div>
                </div>

                <TasksDataTable
                    tasks={tasks}
                    batches={batches}
                />

            </div>

        </div >
    )
}