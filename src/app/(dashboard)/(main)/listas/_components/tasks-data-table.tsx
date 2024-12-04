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
import { Button, buttonVariants } from "@/components/ui/button"
import { RunTasksButton } from "./run-tasks-button"
import { ChevronRightIcon, DownloadIcon, ReaderIcon, UpdateIcon } from "@radix-ui/react-icons"
import { generateLeadsCSVByBatch } from "../actions"
import { ExportCSVButton } from "./export-csv-button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormLabel } from "@/components/ui/form"
import { CreateTasksBatchDialog } from "./create-tasks-batch-dialog"

const ACTIONS_TRANSLATION = {
    'LIKES': 'Likes'
}

interface Props {
    tasks: RedriveInstagramQueueTask[]
    batches: string[]
}

export function TasksDataTable({ tasks, batches }: Props) {

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                <BatchesFilter batches={batches} />
                <div className="flex flex-row gap-2">
                    <ExportCSVButton />
                    <RunTasksButton>
                        Atualizar
                    </RunTasksButton>
                    <CreateTasksBatchDialog batches={batches} />
                </div>
            </div>

            <Table
                className="border mt-4"
            >

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[65px]">ID</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead>Arg.</TableHead>
                        <TableHead>Tipo</TableHead>
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
        </div>
    )
}
