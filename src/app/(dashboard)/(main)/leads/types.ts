

export interface Lead {
    id: string;
    batch: string;
    tags: string[];
    firstname: string;
    lastname: string | null;
    instagram: string;
    mobilephone: string | null;
    phone: string | null;
    email: string | null;
    createdAt: string;
    updatedAt: string;
}