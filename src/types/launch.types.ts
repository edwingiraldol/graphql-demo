export interface Launch {
    id: string;
    mission_name: string;
    launch_year: string;
    launch_success: boolean | null;
    details?: string | null;
    links?: { image?: string | null; } | null;
}