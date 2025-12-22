import { useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

type Launch = {
    id: string;
    mission_name?: string;
    launch_year?: string;
    details?: string | null;
};

export default function LaunchDetailPage() {
    const { id } = useParams<{ id?: string }>();
    const launch = useAppSelector((s) => (s.launches.list as Launch[]).find((l) => l.id === id));

    if (!launch) return <p className="p-4">Misión no encontrada</p>;

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{launch.mission_name}</h2>
            <p className="text-sm text-gray-600">Year: {launch.launch_year}</p>
            <p className="mt-2">{launch.details}</p>
        </div>
    );
}
