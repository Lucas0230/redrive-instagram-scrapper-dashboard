import { ReturnTypeWithoutPromise } from "@/types/return-type-without-promise";
import { getRedriveQueueTasks } from "./actions";

export type RedriveQueueTask = ReturnTypeWithoutPromise<typeof getRedriveQueueTasks>[0]


export type CreateRedriveScrapperBatchProps = {
    batch: string
    posts?: string[]
    profile?: string
}