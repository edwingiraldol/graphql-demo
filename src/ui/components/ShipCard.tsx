import type { Ship } from '../../types/ship.types';

export default function ShipCard({ ship }: { ship: Ship }) {
    return (
        <article className="bg-white shadow p-4 rounded" data-testid="ship-card">
            <div>
                <h3 className="font-bold text-lg mb-2">{ship.name}</h3>
                
                <div className="space-y-1 text-sm mb-3">
                    {ship.type && (
                        <p><span className="font-medium">Type:</span> {ship.type}</p>
                    )}
                    {ship.home_port && (
                        <p><span className="font-medium">Home Port:</span> {ship.home_port}</p>
                    )}
                    {ship.status && (
                        <p>
                            <span className="font-medium">Status:</span>{' '}
                            <span className={ship.status === 'active' ? 'text-green-600' : 'text-gray-600'}>
                                {ship.status}
                            </span>
                        </p>
                    )}
                </div>

                {(ship.successful_landings !== null || ship.attempted_landings !== null) && (
                    <div className="mb-3 text-sm">
                        <p className="font-medium">Landing Record:</p>
                        <p className="text-gray-600">
                            {ship.successful_landings ?? 0} successful / {ship.attempted_landings ?? 0} attempted
                        </p>
                    </div>
                )}

                {ship.missions.length > 0 && (
                    <div className="mb-3 text-sm">
                        <p className="font-medium">Missions: {ship.missions.length}</p>
                        <div className="text-gray-600 text-xs">
                            {ship.missions.slice(0, 3).map((mission, idx) => (
                                <span key={idx}>
                                    {mission.name}
                                    {idx < Math.min(2, ship.missions.length - 1) && ', '}
                                </span>
                            ))}
                            {ship.missions.length > 3 && '...'}
                        </div>
                    </div>
                )}

                {ship.position && (
                    <div className="mb-3 text-sm">
                        <p className="font-medium">Position:</p>
                        <p className="text-gray-600 text-xs">
                            {ship.position.latitude?.toFixed(4)}, {ship.position.longitude?.toFixed(4)}
                        </p>
                    </div>
                )}

                {ship.image && (
                    <img 
                        src={ship.image} 
                        alt={ship.name}
                        className="w-full h-32 object-cover rounded mt-3"
                    />
                )}

                {ship.url && (
                    <div className="mt-3">
                        <a 
                            href={ship.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            More Info
                        </a>
                    </div>
                )}
            </div>
        </article>
    );
}