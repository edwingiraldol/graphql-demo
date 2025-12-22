import { Link } from 'react-router-dom';
import type { Rocket } from '../../types/rocket.types';

export default function LaunchCard({ rocket }: { rocket: Rocket }) {
    return (
        <Link to={`/rocket/${rocket.id}`} data-testid="launch-card" className="block">
            <article className="bg-white shadow p-4 rounded flex gap-4">
                <div>
                    <h3 className="font-bold">{rocket.name}</h3>
                    <p className="text-sm text-gray-600">First flight: {rocket.first_flight}</p>
                    <p className="text-sm text-gray-600">Cost per launch: {rocket.cost_per_launch}</p>
                    <p className="mt-1 text-sm">
                        Estado:{' '}
                        <span className={rocket.active ? 'text-green-600' : 'text-red-600'}>
                            {rocket.active ? 'Active' : 'Inactive'}
                        </span>
                    </p>
                </div>
            </article>
        </Link>
    );
}
