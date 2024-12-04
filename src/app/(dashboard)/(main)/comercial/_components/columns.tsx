"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Task } from "../_data/types"
import Link from "next/link"
import { formatToPhone } from "@/lib/format-to-phone"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AngryIcon, SmileIcon } from "lucide-react"
import { updateLeadById } from "../actions"
import React from "react"


export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[10px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avaliação" />
    ),
    cell: ({ row, table }) => {

      const [status, setStatus] = React.useState(row.getValue("status") as boolean)

      const handleChangeStatus = async (v: string) => {
        setStatus(v == "true" ? true : false)
        await updateLeadById(row.getValue("_id"), { isLeadQualified: v == "true" ? true : false })
      }

      return (
        <div className="flex w-[140px] items-center pr-6">
          <Select value={`${status}`} onValueChange={handleChangeStatus}>
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="-------" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Avaliação</SelectLabel>
                <SelectItem value="true">
                  <div className="text-green-500 flex flex-row items-center gap-1">
                    <SmileIcon fill="rgb(34,197,94)" className="w-4 h-4 text-white" />
                    <p className="font-medium">Bom</p>
                  </div>
                </SelectItem>
                <SelectItem value="false">
                  <div className="text-red-500 flex flex-row items-center gap-1">
                    <AngryIcon fill="rgb(239,68,68)" className="w-4 h-4 text-white" />
                    <p className="font-medium">Ruim</p>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </span>
      )
    },
  },

  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefone" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("phone") ? formatToPhone(row.getValue("phone")) : row.getValue("phone")}
        </span>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("email")}
        </span>
      )
    },
  },
  {
    accessorKey: "instagram",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instagram" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          target="_blank"
          className="max-w-[500px] truncate font-medium hover:text-blue-700 transition-all duration-200"
          href={`https://instagram.com/${row.getValue("instagram")}`}
        >
          {row.getValue("instagram")}
        </Link>
      )
    },
  },
  {
    accessorKey: "arg",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          target="_blank"
          className="max-w-[500px] truncate font-medium hover:text-blue-700 transition-all duration-200"
          href={`https://instagram.com/p/${row.getValue("arg")}`}
        >
          {row.getValue("arg")}
        </Link>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[500px] truncate font-medium">
          {new Date(row.getValue("createdAt")).toLocaleDateString('pt-br')}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (<></>),
    cell: ({ row }) => (<></>),
    enableSorting: true,
    enableHiding: false,
  },
]