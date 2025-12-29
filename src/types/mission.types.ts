export interface Mission {
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    wikipedia: string | null;
    twitter: string | null;
    manufacturers: string[];
    payload_ids: string[];
}

export type MissionsState = {
    list: Mission[];
    loading: boolean;
    error: string | null;
};