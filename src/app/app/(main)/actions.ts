'use server'

import { RedriveProvider } from "@/providers/redrive-provider";
import { PrismaInstagramQueueTasksRepository } from "@/repository/prisma/prisma-instagram-queue-tasks-repository";
import { prisma } from "@/services/database";
import { HandleInstagramQueueUseCase } from "@/use-cases/handle-instagram-queue";

interface GetRedriveQueueTasksProps {
    batch?: string
}

export async function getRedriveQueueTasks({ batch }: { batch?: string } = {}) {

    const where: GetRedriveQueueTasksProps = {};

    if (batch) where.batch = batch;

    const todos = await prisma.instagramQueueTask.findMany({
        where: where,
        orderBy: {
            createdAt: 'desc'
        }
    })

    return todos;
}


export async function getRedriveScrapperBatches() {

    const batches = await prisma.instagramQueueTask.findMany({
        distinct: ['batch'],
        select: {
            batch: true,
        },
    })

    return batches.map(b => b.batch);
}


export async function runRedriveScrapperQueue() {
    console.log('Received a request to run queue ------');

    const data = await new HandleInstagramQueueUseCase(
        new RedriveProvider(),
        new PrismaInstagramQueueTasksRepository(),
    ).execute()

    console.log(data);

}
