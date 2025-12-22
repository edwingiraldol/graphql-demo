export interface Rocket {
    id: string;
    name: string;
    active: boolean | null;
    stages: number | null;
    boosters: number | null;
    cost_per_launch: number | null;
    success_rate_pct: number | null;
    first_flight: string | null;
    description: string | null;
}

export interface RocketsQueryResponse {
    rockets: Rocket[] | null;
}

export interface RocketsQueryVariables {
    limit?: number | null;
}