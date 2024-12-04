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
import { BatchesFilter } from "../../../_components/batches-filter"
import Link from "next/link"
import { Lead } from "../types"
import { formatToPhone } from "@/lib/format-to-phone"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Props {
    leads: Lead[],
    batches: string[]
}

export function LeadsDataTable({ batches, leads }: Props) {

    return (
        <>
            <BatchesFilter batches={batches} />
            <ScrollArea className="h-[50vh] w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Instagram</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Mobile Phone</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead.id}>
                                <TableCell className="text-xs max-w-[150px] truncate">{`${lead.firstname} ${lead.lastname}`}</TableCell>
                                <TableCell>
                                    <Link href={`https://instagram.com/${lead.instagram}`} target="_blank" className="text-sky-700 text-xs">
                                        @{lead.instagram}
                                    </Link>
                                </TableCell>
                                <TableCell className="text-xs">{lead.email || '------'}</TableCell>
                                <TableCell className="text-xs">{lead.phone ? formatToPhone(lead.phone) : '------'}</TableCell>
                                <TableCell className="text-xs">{lead.mobilephone ? formatToPhone(lead.mobilephone) : '------'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">{leads.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </ScrollArea>
        </>
    )
}
