"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TaskStatus } from "./task-status"

import { InstagramQueueTask } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

const ACTIONS_TRANSLATION = {
    'LIKES': 'Likes'
}

interface Props {
    tasks: InstagramQueueTask[]
    batches: string[]
}

export function TasksDataTable({ tasks, batches }: Props) {

    const router = useRouter();

    const params = useSearchParams();
    const batch = params.get('batch');

    if (!batch) router.push(`?batch=${batches[0]}`);

    return (
        <>
            <div className="mb-4">
                <p className="text-sm text-zinc-600">Batches</p>
                <div className="flex flex-row gap-2 mt-1.5">
                    {batches.map((b) => (
                        <Badge
                            key={b}
                            className="py-1.5"
                            variant={b == batch ? "default" : "outline"}
                            onClick={() => router.push(`?batch=${b}`)}
                        >
                            {b}
                        </Badge>
                    ))}
                </div>
            </div>

            <Table>
                <TableCaption>A list of your posts provided to scrapper.</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead>Arg.</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead className="text-right">Leads</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length > 0 && tasks.map((task, i) => (
                        <TableRow key={task.arg}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>
                                <TaskStatus status={task.status} />
                            </TableCell>
                            <TableCell>{task.arg}</TableCell>
                            <TableCell>{ACTIONS_TRANSLATION[task.type as keyof typeof ACTIONS_TRANSLATION]}</TableCell>
                            <TableCell className="text-right">{task.leads || 0}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">{tasks.reduce((acc, task) => acc + (task.leads || 0), 0)}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}
