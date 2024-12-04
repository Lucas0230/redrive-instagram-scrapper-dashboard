'use server'

import { api } from "@/lib/api";

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
