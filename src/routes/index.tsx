import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../ui/layout/MainLayout';
import LaunchesPage from '../pages/LaunchesPage';
import LaunchDetailPage from '../pages/LaunchDetailPage';
import RocketsPage from '../pages/RocketsPage';
import ShipsPage from '../pages/ShipsPage';
import StatisticsPage from '../pages/StatisticsPage';
import HistoryPage from '../pages/HistoryPage';
import AboutPage from '../pages/AboutPage';
import UsersPage from '../pages/UsersPage';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/launches" replace />} />
                    <Route path="/launches" element={<LaunchesPage />} />
                    <Route path="/launch/:id" element={<LaunchDetailPage />} />
                    <Route path="/rockets" element={<RocketsPage />} />
                    <Route path="/ships" element={<ShipsPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}
