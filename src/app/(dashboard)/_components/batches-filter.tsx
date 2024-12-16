"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams } from "next/navigation"

interface Props {
    batches: string[]
    className?: string
}

export function BatchesFilter({ batches }: Props) {

    const [open, setOpen] = React.useState(false)

    const router = useRouter();

    const params = useSearchParams();
    const batch = params.get('batch');

    if (!batch) {
        setTimeout(() => {
            router.push(`?batch=${batches[0]}`);
        }, 300);
    }

    return (
        <div className="">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[220px] justify-between"
                    >
                        {batch ? batches.find((b) => b === batch) : "Select batch..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar lista..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Nenhuma lista encontrada.</CommandEmpty>
                            <CommandGroup>
                                {batches.map((b) => (
                                    <CommandItem
                                        className="data-[disabled]:pointer-events-auto cursor-pointer data-[disabled]:opacity-100"
                                        key={b}
                                        value={b}
                                        onSelect={(b) => {
                                            setOpen(false)
                                            router.push(`?batch=${b}`)
                                        }}
                                    >
                                        {b}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                b === batch ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

