import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Pages
import Dashboard from './pages/Dashboard';
import CollectionDashboard from './pages/CollectionDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Researches from './pages/Researches';
import CreateAI from './pages/CreateAI';
import Elections from './pages/Elections';
import Candidates from './pages/Candidates';
import PrintedForms from './pages/PrintedForms';
import Digitization from './pages/Digitization';
import RapidEntry from './pages/RapidEntry';
import Interviewers from './pages/Interviewers';
import QRCodes from './pages/QRCodes';
import Results from './pages/Results';
import Reports from './pages/Reports';
import Exports from './pages/Exports';
import Users from './pages/Users';
import Audit from './pages/Audit';
import Settings from './pages/Settings';
import PublicSurvey from './pages/PublicSurvey';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin / Operator Dashboard Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard/collection" element={<CollectionDashboard />} />
            <Route path="researches" element={<Researches />} />
            <Route path="researches/create-ai" element={<CreateAI />} />
            <Route path="elections" element={<Elections />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="candidates/import" element={<Candidates />} />
            <Route path="forms" element={<PrintedForms />} />
            <Route path="digitization" element={<Digitization />} />
            <Route path="digitization/rapid" element={<RapidEntry />} />
            <Route path="interviewers" element={<Interviewers />} />
            <Route path="qr-codes" element={<QRCodes />} />
            <Route path="results" element={<Results />} />
            <Route path="reports" element={<Reports />} />
            <Route path="exports" element={<Exports />} />
            <Route path="users" element={<Users />} />
            <Route path="audit" element={<Audit />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Public Survey Route */}
          <Route path="/p" element={<PublicLayout />}>
            <Route path=":publicId" element={<PublicSurvey />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;