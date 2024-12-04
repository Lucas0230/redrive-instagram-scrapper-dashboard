'use server'

import { api } from "@/lib/api"

export async function getLeadsByBatch(batch: string) {

    const { data: { data: leads, count } } = await api.get(`/leads/csv?batch=${batch}`);

    return {
        data: leads,
        count: count
    }

}


export async function generateLeadsCSVByBatch(batch: string) {

    const response = await api.get(`/leads/csv?batch=${batch}`, { responseType: 'blob' })
    return {
        data: response.data
    };
}