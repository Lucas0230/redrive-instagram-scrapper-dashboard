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

import { BatchesFilter } from "../../../_components/batches-filter"
import { RedriveInstagramQueueTask } from "@/types/redrive-instagram-queue"
import { ScrollArea } from "@/components/ui/scroll-area"

const ACTIONS_TRANSLATION = {
    'LIKES': 'Likes'
}

interface Props {
    tasks: RedriveInstagramQueueTask[]
    batches: string[]
}

export function TasksDataTable({ tasks, batches }: Props) {

    return (
        <>
            <BatchesFilter batches={batches} />
            <ScrollArea className="h-[50vh] w-full">
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
                                <TableCell>{
                                    //@ts-ignore
                                    ACTIONS_TRANSLATION[task.type as keyof typeof ACTIONS_TRANSLATION]
                                }</TableCell>
                                <TableCell className="text-right">{
                                    //@ts-ignore
                                    task.leads || 0
                                }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right">{
                                //@ts-ignore
                                tasks.reduce((acc, task) => acc + (task.leads || 0), 0)
                            }</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </ScrollArea>
        </>
    )
}
