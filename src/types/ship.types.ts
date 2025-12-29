export interface Ship {
    id: string;
    name: string;
    type: string | null;
    home_port: string | null;
    status: string | null;
    speed_kn: number | null;
    course_deg: number | null;
    position: {
        latitude: number | null;
        longitude: number | null;
    } | null;
    successful_landings: number | null;
    attempted_landings: number | null;
    missions: Array<{
        name: string;
        flight: number;
    }>;
    url: string | null;
    image: string | null;
}

export type ShipsState = {
    list: Ship[];
    loading: boolean;
    error: string | null;
};