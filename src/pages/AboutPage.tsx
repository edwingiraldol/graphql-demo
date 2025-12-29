export default function AboutPage() {
    return (
        <main className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">About SpaceX Dashboard</h1>
            
            <div className="space-y-6">
                <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-3">Project Overview</h2>
                    <p className="text-gray-700 leading-relaxed">
                        This SpaceX Dashboard is a modern web application built with React, TypeScript, and Redux Toolkit. 
                        It demonstrates best practices in frontend architecture by consuming the public SpaceX GraphQL API 
                        to display launches, rockets, missions, and user management functionality.
                    </p>
                </section>

                <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-3">Technology Stack</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium mb-2">Frontend</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• React 19 with TypeScript</li>
                                <li>• Redux Toolkit for state management</li>
                                <li>• React Router for navigation</li>
                                <li>• Tailwind CSS for styling</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Development</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Vite for build tooling</li>
                                <li>• ESLint for code quality</li>
                                <li>• Playwright for E2E testing</li>
                                <li>• GraphQL for API consumption</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-3">Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium mb-2">Data Visualization</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Browse SpaceX launches with filtering</li>
                                <li>• Explore rocket specifications</li>
                                <li>• View mission details and links</li>
                                <li>• User management system</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Architecture</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Clean separation of concerns</li>
                                <li>• Type-safe GraphQL integration</li>
                                <li>• Responsive design patterns</li>
                                <li>• Comprehensive test coverage</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-3">Data Source</h2>
                    <p className="text-gray-700 leading-relaxed">
                        All SpaceX data is sourced from the official{' '}
                        <a 
                            href="https://studio.apollographql.com/public/SpaceX-pxxbxen/variant/current/explorer" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            SpaceX GraphQL API
                        </a>
                        . This provides real-time access to launch data, rocket specifications, 
                        mission information, and historical records.
                    </p>
                </section>
            </div>
        </main>
    );
}