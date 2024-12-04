'use server'

import { api } from "@/lib/api";
import { CreateRedriveScrapperBatchProps } from "./types";

interface GetRedriveQueueTasksProps {
    batch?: string
}

export async function getRedriveQueueTasks({ batch }: { batch?: string } = {}) {

    const where: GetRedriveQueueTasksProps = {};

    if (batch) where.batch = batch;

    const { data: { data: tasks } } = await api.get(`/scraping-tasks`, { params: where });

    return tasks;
}


export async function getRedriveScrapperBatches() {

    const { data } = await api.get(`/scraping-tasks-batches`);
    return data
}


export async function runRedriveScrapperQueue() {
    await api.post(`/run-instagram-scraping-tasks`);
}

export async function generateLeadsCSVByBatch(batch: string) {

    const response = await api.get(`/leads/csv?batch=${batch}`, { responseType: 'blob' })
    return {
        data: response.data
    };
}




export async function createRedriveScrapperBatch(params: CreateRedriveScrapperBatchProps) {
    await api.post(`/scraping-tasks`, params);
}