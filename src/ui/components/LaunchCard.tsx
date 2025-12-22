import { Link } from 'react-router-dom';
import type { Launch } from '../../types/launch.types';

export default function LaunchCard({ launch }: { launch: Launch }) {
    return (
        <Link to={`/launch/${launch.id}`} data-testid="launch-card" className="block">
            <article className="bg-white shadow p-4 rounded flex gap-4">
                <img
                    src={launch.links?.image || ''}
                    alt={launch.mission_name || ''}
                    className="w-16 h-16 object-contain"
                />
                <div>
                    <h3 className="font-bold">{launch.mission_name}</h3>
                    <p className="text-sm text-gray-600">Year: {launch.launch_year}</p>
                    <p className="mt-1 text-sm">
                        Estado:{' '}
                        <span className={launch.launch_success ? 'text-green-600' : 'text-red-600'}>
                            {launch.launch_success === null ? 'Unknown' : launch.launch_success ? 'Success' : 'Failure'}
                        </span>
                    </p>
                </div>
            </article>
        </Link>
    );
}
