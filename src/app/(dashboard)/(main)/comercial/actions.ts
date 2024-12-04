"use server"

import { api } from "@/lib/api";



export async function getSalesTeamLeadsBatches() {
    const { data } = await api.get(`/scraping-tasks-batches?isAssignedToSalesTeam=true`);
    return data
}

export async function getSalesTeamLeadsByBatch({ batch }: { batch?: string } = {}) {

    const where: { batch?: string } = {};

    if (batch) where.batch = batch;

    const { data: { data: tasks } } = await api.get(`/scraping-tasks-batches/${batch}/leads`, { params: where });

    return tasks;
}


export async function updateLeadById(id: string, data: object) {
    await api.put(`/leads/${id}`, data)
}