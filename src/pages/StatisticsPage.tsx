import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';

interface Stats {
    totalLaunches: number;
    successfulLaunches: number;
    failedLaunches: number;
    successRate: number;
    totalRockets: number;
    activeRockets: number;
    totalMissions: number;
    launchesByYear: Record<string, number>;
}

export default function StatisticsPage() {
    const launches = useAppSelector((s) => s.launches.list);
    const rockets = useAppSelector((s) => s.rockets.list);
    const ships = useAppSelector((s) => s.ships.list);
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        if (launches.length > 0) {
            const successful = launches.filter(l => l.launch_success === true).length;
            const failed = launches.filter(l => l.launch_success === false).length;
            const total = launches.length;
            
            const launchesByYear = launches.reduce((acc, launch) => {
                const year = launch.launch_year;
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            setStats({
                totalLaunches: total,
                successfulLaunches: successful,
                failedLaunches: failed,
                successRate: total > 0 ? Math.round((successful / total) * 100) : 0,
                totalRockets: rockets.length,
                activeRockets: rockets.filter(r => r.active === true).length,
                totalMissions: ships.length,
                launchesByYear,
            });
        }
    }, [launches, rockets, ships]);

    if (!stats) {
        return (
            <main>
                <h1 className="text-2xl font-bold mb-4">SpaceX Statistics</h1>
                <p>Loading statistics...</p>
            </main>
        );
    }

    const topYears = Object.entries(stats.launchesByYear)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

    return (
        <main>
            <h1 className="text-2xl font-bold mb-6">SpaceX Statistics</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Total Launches</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalLaunches}</p>
                </div>
                
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Success Rate</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.successRate}%</p>
                </div>
                
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Active Rockets</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats.activeRockets}</p>
                </div>
                
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800">Total Ships</h3>
                    <p className="text-3xl font-bold text-orange-600">{stats.totalMissions}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Launch Success Breakdown</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Successful</span>
                            <span className="font-semibold text-green-600">{stats.successfulLaunches}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Failed</span>
                            <span className="font-semibold text-red-600">{stats.failedLaunches}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Unknown</span>
                            <span className="font-semibold text-gray-500">
                                {stats.totalLaunches - stats.successfulLaunches - stats.failedLaunches}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Top Launch Years</h2>
                    <div className="space-y-3">
                        {topYears.map(([year, count]) => (
                            <div key={year} className="flex justify-between items-center">
                                <span className="text-gray-600">{year}</span>
                                <span className="font-semibold">{count} launches</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Rocket Fleet Status</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stats.totalRockets}</p>
                        <p className="text-sm text-gray-600">Total Rockets</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{stats.activeRockets}</p>
                        <p className="text-sm text-gray-600">Active Rockets</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-600">{stats.totalRockets - stats.activeRockets}</p>
                        <p className="text-sm text-gray-600">Retired Rockets</p>
                    </div>
                </div>
            </div>
        </main>
    );
}