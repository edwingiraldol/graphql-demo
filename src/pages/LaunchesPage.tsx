import  { useEffect } from 'react';
import Filters from '../ui/components/Filters';
import LaunchCard from '../ui/components/LaunchCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchLaunches } from '../features/launches/launches.thunks';

export default function LaunchesPage() {
    const dispatch = useAppDispatch();
    const launches = useAppSelector((s) => s.launches.list);
    const loading = useAppSelector((s) => s.launches.loading);
    const error = useAppSelector((s) => s.launches.error);
    const filters = useAppSelector((s) => s.launches.filters);

    useEffect(() => {
        dispatch(fetchLaunches());
    }, [dispatch, filters.year, filters.success]);

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">SpaceX Missions</h1>
            <Filters />
            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-600">Error: {error}</p>}
            <section className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {launches.map((l: any) => (
                    <LaunchCard key={l.id} launch={l} />
                ))}
            </section>
        </main>
    );
}