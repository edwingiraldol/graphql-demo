import  { useEffect } from 'react';
import RocketCard from '../ui/components/RocketCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchRockets } from '../features/rockets/rockets.thunks';

export default function LaunchesPage() {
    const dispatch = useAppDispatch();
    const rockets = useAppSelector((s) => s.rockets.list);
    const loading = useAppSelector((s) => s.rockets.loading);
    const error = useAppSelector((s) => s.rockets.error);
    const filters = useAppSelector((s) => s.launches.filters);

    console.log(rockets);
    useEffect(() => {
        dispatch(fetchRockets());
    }, [dispatch, filters.year, filters.success]);

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Rocket Missions</h1>
            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-600">Error: {error}</p>}
            <section className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {rockets.map((l: any) => (
                    <RocketCard key={l.id} rocket={l} />
                ))}
            </section>
        </main>
    );
}