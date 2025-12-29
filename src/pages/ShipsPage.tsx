import { useEffect } from 'react';
import ShipCard from '../ui/components/ShipCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchShips } from '../features/ships/ships.thunks';

export default function ShipsPage() {
    const dispatch = useAppDispatch();
    const ships = useAppSelector((s) => s.ships.list);
    const loading = useAppSelector((s) => s.ships.loading);
    const error = useAppSelector((s) => s.ships.error);

    useEffect(() => {
        dispatch(fetchShips());
    }, [dispatch]);

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">SpaceX Ships</h1>
            {loading && <p className="mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-600">Error: {error}</p>}
            <section className="grid gap-4 mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {ships.map((ship) => (
                    <ShipCard key={ship.id} ship={ship} />
                ))}
            </section>
        </main>
    );
}