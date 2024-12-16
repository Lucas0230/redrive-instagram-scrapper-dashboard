"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseLeadsTableAnalytics } from "@/contexts/leads-table-analytics";
import { User2Icon } from "lucide-react";

type Props = {

}

export function TableCards({ }: Props) {

    const { analytics } = UseLeadsTableAnalytics()

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <Card className="!shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                    <CardTitle className="text-sm font-medium">
                        Total de Leads
                    </CardTitle>
                    <User2Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold mt-1">{analytics.leads}</div>
                </CardContent>
            </Card>
            <Card className="!shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                    <CardTitle className="text-sm font-medium">
                        Qualificados
                    </CardTitle>
                    <User2Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold mt-1">{analytics.qualified}</div>
                </CardContent>
            </Card>
            <Card className="!shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                    <CardTitle className="text-sm font-medium">
                        % de Qualificados
                    </CardTitle>
                    <User2Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold mt-1">
                        {(analytics.qualified / analytics.leads).toFixed(2)}
                    </div>
                </CardContent>
            </Card>
            <Card className="!shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5">
                    <CardTitle className="text-sm font-medium">
                        % de Progresso
                    </CardTitle>
                    <User2Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold mt-1">
                        {(analytics.verified / analytics.leads).toFixed(2)}
                    </div>
                </CardContent>
            </Card>
        </div>
    )

}