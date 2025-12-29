import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import type { Launch } from '../types/launch.types';

interface TimelineEvent {
    year: string;
    launches: Launch[];
    successCount: number;
    failureCount: number;
}

export default function HistoryPage() {
    const launches = useAppSelector((s) => s.launches.list);
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

    useEffect(() => {
        if (launches.length > 0) {
            const groupedByYear = launches.reduce((acc, launch) => {
                const year = launch.launch_year;
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(launch);
                return acc;
            }, {} as Record<string, Launch[]>);

            const timelineData = Object.entries(groupedByYear)
                .map(([year, yearLaunches]) => ({
                    year,
                    launches: yearLaunches.sort((a, b) => a.mission_name.localeCompare(b.mission_name)),
                    successCount: yearLaunches.filter(l => l.launch_success === true).length,
                    failureCount: yearLaunches.filter(l => l.launch_success === false).length,
                }))
                .sort((a, b) => parseInt(b.year) - parseInt(a.year));

            setTimeline(timelineData);
        }
    }, [launches]);

    if (timeline.length === 0) {
        return (
            <main>
                <h1 className="text-2xl font-bold mb-4">SpaceX Launch History</h1>
                <p>Loading launch history...</p>
            </main>
        );
    }

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6">SpaceX Launch History</h1>
            
            <div className="space-y-8">
                {timeline.map((yearData) => (
                    <div key={yearData.year} className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">{yearData.year}</h2>
                            <div className="flex gap-4 text-sm">
                                <span className="text-green-600">
                                    ✓ {yearData.successCount} successful
                                </span>
                                <span className="text-red-600">
                                    ✗ {yearData.failureCount} failed
                                </span>
                                <span className="text-gray-600">
                                    Total: {yearData.launches.length}
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {yearData.launches.map((launch) => (
                                <div 
                                    key={launch.id} 
                                    className="border rounded p-3 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-sm">{launch.mission_name}</h3>
                                            {launch.details && (
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                    {launch.details}
                                                </p>
                                            )}
                                        </div>
                                        <div className="ml-2 flex-shrink-0">
                                            {launch.launch_success === true && (
                                                <span className="text-green-600 text-xs">✓</span>
                                            )}
                                            {launch.launch_success === false && (
                                                <span className="text-red-600 text-xs">✗</span>
                                            )}
                                            {launch.launch_success === null && (
                                                <span className="text-gray-400 text-xs">?</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {launch.links?.image && (
                                        <img 
                                            src={launch.links.image} 
                                            alt={launch.mission_name}
                                            className="w-full h-20 object-cover rounded mt-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Historical Overview</h2>
                <p className="text-blue-700 text-sm">
                    SpaceX has conducted launches spanning {timeline.length} years, from {timeline[timeline.length - 1]?.year} to {timeline[0]?.year}. 
                    This timeline shows the evolution of SpaceX's launch capabilities and mission complexity over time.
                </p>
            </div>
        </main>
    );
}