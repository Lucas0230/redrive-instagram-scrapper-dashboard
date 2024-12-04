

export type InstagramQueueTaskStatus = 'WAITING' | 'PENDING' | 'RUNNING' | 'FINISHED' | 'FAILED';

export type InstagramQueueTaskType = 'LIKES' | 'COMMENTS' | 'FOLLOWERS'

export interface InstagramQueueTask {
    id: string;
    arg: string;
    batch: string;
    tags: string[];
    status: InstagramQueueTaskStatus;
    type: InstagramQueueTaskType;
    leads: number | null;
    createdAt: Date;
    updatedAt: Date;
    finishedAt: Date | null;
}