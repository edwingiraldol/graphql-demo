import type { Mission } from '../../types/mission.types';

export default function MissionCard({ mission }: { mission: Mission }) {
    return (
        <article className="bg-white shadow p-4 rounded" data-testid="mission-card">
            <div>
                <h3 className="font-bold text-lg mb-2">{mission.name}</h3>
                {mission.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{mission.description}</p>
                )}
                
                <div className="space-y-1 text-sm">
                    {mission.manufacturers.length > 0 && (
                        <p>
                            <span className="font-medium">Manufacturers:</span>{' '}
                            {mission.manufacturers.join(', ')}
                        </p>
                    )}
                    
                    {mission.payload_ids.length > 0 && (
                        <p>
                            <span className="font-medium">Payloads:</span>{' '}
                            {mission.payload_ids.length}
                        </p>
                    )}
                </div>
                
                <div className="flex gap-2 mt-3">
                    {mission.website && (
                        <a 
                            href={mission.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Website
                        </a>
                    )}
                    {mission.wikipedia && (
                        <a 
                            href={mission.wikipedia} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Wikipedia
                        </a>
                    )}
                    {mission.twitter && (
                        <a 
                            href={mission.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Twitter
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}