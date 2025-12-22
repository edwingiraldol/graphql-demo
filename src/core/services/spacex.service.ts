import {GET_LAUNCHES} from '../queries/launches.query';
import {graphqlRequest} from '../graphql/client';
import {type Launch} from '../../types/launch.types';
import {GET_ROCKETS} from '../queries/rockets.query';
import type {Rocket} from '../../types/rocket.types';

type FetchLaunchesArgs = {
    year?: string | null;
    success?: boolean | string | null;
    limit?: number;
};


type FetchRocketsArgs = {
    limit?: number;
};

type RawLinks = { flickr_images?: Array<string | null> | null } | null | undefined;
type RawLaunch = { links?: RawLinks } & Record<string, unknown>;

export async function fetchLaunches({ year, success, limit = 100 }: FetchLaunchesArgs): Promise<Launch[] | undefined> {
    const variables: Record<string, unknown> = { limit };
    if (year != null && year !== '') variables.launch_year = year;
    if (typeof success === 'boolean') variables.launch_success = success ? 'true' : 'false';
    else if (typeof success === 'string') variables.launch_success = success;

    let data: { launchesPast: RawLaunch[] } | undefined;
    try {
        data = await graphqlRequest<{ launchesPast: RawLaunch[] }>(GET_LAUNCHES, variables);
    } catch (err) {

        throw err;
    }

    const launchesRaw = data?.launchesPast;
    if (!launchesRaw) return undefined;

    return launchesRaw
        .map((l) => {
            const links = (l.links ?? null) as RawLinks;
            const flickr = Array.isArray(links?.flickr_images) ? links!.flickr_images : null;
            const image = Array.isArray(flickr) && flickr.length && typeof flickr[0] === 'string' ? (flickr[0] as string) : null;
            return {raw: l, image};
        })
        .filter(({image}) => image !== null)
        .map(({raw, image}) => {
            const r = raw as Record<string, any>;

            const rawSuccess = r.launch_success;
            let launch_success: boolean | null = null;
            if (typeof rawSuccess === 'boolean') {
                launch_success = rawSuccess;
            } else if (typeof rawSuccess === 'string') {
                if (rawSuccess === 'true') launch_success = true;
                else if (rawSuccess === 'false') launch_success = false;
                else launch_success = null;
            } else {
                launch_success = null;
            }

            return {
                id: String(r.id ?? ''),
                mission_name: r.mission_name ?? '',
                launch_year: String(r.launch_year ?? ''),
                launch_success,
                details: r.details ?? null,
                links: {
                    ...(r.links ?? {}),
                    image: image ?? null,
                },
            } as Launch;
        });
}

export async function fetchRockets({ limit = 100 }: FetchRocketsArgs): Promise<Rocket[] | undefined> {
    try {
        const data = await graphqlRequest<{ rockets: Array<Record<string, unknown>> }>(GET_ROCKETS, { limit });
        const rocketsRaw = data?.rockets;
        if (!rocketsRaw) return undefined;

        return rocketsRaw.map((raw) => {
            const r = raw as Record<string, any>;
            return {
                id: String(r.id ?? ''),
                name: r.name ?? '',
                active: typeof r.active === 'boolean' ? r.active : null,
                stages: typeof r.stages === 'number' ? r.stages : null,
                boosters: typeof r.boosters === 'number' ? r.boosters : null,
                cost_per_launch: typeof r.cost_per_launch === 'number' ? r.cost_per_launch : null,
                success_rate_pct: typeof r.success_rate_pct === 'number' ? r.success_rate_pct : null,
                first_flight: r.first_flight ?? null,
                description: r.description ?? null,
            } as Rocket;
        });
    } catch (err) {
        throw err;
    }
}
