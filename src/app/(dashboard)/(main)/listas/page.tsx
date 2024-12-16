import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getRedriveQueueTasks, getRedriveScrapperBatches } from "./actions"
import { TasksDataTable } from "./_components/tasks-data-table"

type Props = {
    searchParams: { batch: string }
}

export default async function Page({ searchParams }: Props) {

    const batches = await getRedriveScrapperBatches();
    const tasks = await getRedriveQueueTasks({ batch: searchParams.batch || batches[0] })

    return (
        <div className="flex flex-col w-full h-auto px-8 py-8">

            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Lista de Leads</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid flex-1 items-start gap-4 mt-6 h-fit">

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Listas</h1>
                </div>

                <TasksDataTable
                    tasks={tasks}
                    batches={batches}
                />
            </div>
        </div>
    )
}
