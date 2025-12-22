import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../ui/layout/MainLayout';
import LaunchesPage from '../pages/LaunchesPage';
import LaunchDetailPage from '../pages/LaunchDetailPage';
import RocketsPage from '../pages/RocketsPage';
import MissionsPage from '../pages/MissionsPage';
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
                    <Route path="/missions" element={<MissionsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/users" element={<UsersPage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}
