import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = {
  'src/styles/tokens.css': `
:root {
  --font-old-style: 'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif;
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  
  /* Color Palette - Dark Institutional */
  --bg-base: #0f172a;
  --bg-surface: #1e293b;
  --bg-surface-hover: #334155;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent-primary: #3b82f6;
  --accent-hover: #2563eb;
  --border-color: #334155;
  --success: #10b981;
  --danger: #ef4444;
  --warning: #f59e0b;

  /* Spacing Tokens */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-8: 3rem;
  
  /* Typography */
  --text-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
  --text-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
  --text-lg: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
  --text-xl: clamp(1.56rem, 1vw + 1.31rem, 2.11rem);
  --text-2xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);

  /* Radius & Borders & Shadows */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --border-width: 3px;
  --shadow-1: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-4: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-glow: 0 0 10px rgba(59, 130, 246, 0.5);

  /* Animations */
  --ease-1: cubic-bezier(0.25, 0, 0.3, 1);
  --transition-fast: 150ms var(--ease-1);
  --transition-normal: 300ms var(--ease-1);
}
  `,
  'src/styles/globals.css': `
@import './tokens.css';
@import './print.css';

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-sans);
  background-color: var(--bg-base);
  color: var(--text-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-old-style);
  font-weight: 700;
  line-height: 1.2;
}

a { color: var(--accent-primary); text-decoration: none; transition: color var(--transition-fast); }
a:hover { color: var(--accent-hover); }

button, input, select, textarea {
  font-family: inherit;
  font-size: 100%;
}

.disclaimer {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-align: center;
  margin-top: var(--space-4);
  font-style: italic;
}
  `,
  'src/styles/print.css': `
@media print {
  @page {
    size: A4;
    margin: 1cm;
  }

  body {
    background-color: white !important;
    color: black !important;
    font-family: var(--font-old-style) !important;
  }

  .no-print { display: none !important; }

  .print-only { display: block !important; }

  .print-form {
    width: 100%;
    page-break-after: always;
  }

  .print-form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--border-width) solid black;
    padding-bottom: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .print-checkbox {
    width: 24px !important;
    height: 24px !important;
    border: var(--border-width) solid black !important;
    display: inline-block;
    vertical-align: middle;
    margin-right: var(--space-2);
  }

  .print-candidate-row {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-2);
    font-size: var(--text-lg);
  }
}
  `,
  'src/main.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  `,
  'src/App.tsx': `
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrintedForms from './pages/PrintedForms';
import Digitization from './pages/Digitization';
import RapidEntry from './pages/RapidEntry';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="forms" element={<PrintedForms />} />
            <Route path="digitization" element={<Digitization />} />
            <Route path="digitization/rapid" element={<RapidEntry />} />
            {/* Outras rotas ... */}
          </Route>

          {/* Public Routes */}
          <Route path="/p" element={<PublicLayout />}>
            {/* <Route path=":publicId" element={<PublicSurvey />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
  `,
  'src/contexts/AuthContext.tsx': `
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'ANALYST' | 'INTERVIEWER' | 'OPERATOR';
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Demo user
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Admin Agepe (DEMONSTRATIVO)',
    role: 'ADMIN'
  });

  const login = () => setUser({ id: '1', name: 'Admin Agepe (DEMONSTRATIVO)', role: 'ADMIN' });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
  `,
  'src/services/api.ts': `
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Interceptors (mocked for demo)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});
  `,
  'src/components/layout/MainLayout.tsx': `
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: 'var(--space-6)', flex: 1, overflowY: 'auto' }}>
          <Outlet />
          <div className="disclaimer">
            Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.
          </div>
        </main>
      </div>
    </div>
  );
};
  `,
  'src/components/layout/PublicLayout.tsx': `
import React from 'react';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div style={{ padding: 'var(--space-4)', maxWidth: '800px', margin: '0 auto' }}>
      <Outlet />
      <div className="disclaimer">
        Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.
      </div>
    </div>
  );
};
  `,
  'src/components/layout/Sidebar.tsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, QrCode, Keyboard, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  const menu = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Formulários Impressos', path: '/forms', icon: <FileText size={20} /> },
    { name: 'Digitação', path: '/digitization', icon: <Keyboard size={20} /> },
    { name: 'Digitação Rápida', path: '/digitization/rapid', icon: <Keyboard size={20} /> },
    { name: 'QR Codes', path: '/qr-codes', icon: <QrCode size={20} /> },
    { name: 'Usuários', path: '/users', icon: <Users size={20} /> },
    { name: 'Configurações', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div style={{ width: '250px', backgroundColor: 'var(--bg-surface)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 'var(--space-4)', fontSize: 'var(--text-xl)', fontFamily: 'var(--font-old-style)', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)' }}>
        Agepe Pesquisa
      </div>
      <nav style={{ flex: 1, padding: 'var(--space-4)' }}>
        {menu.map(item => (
          <Link key={item.path} to={item.path} style={{ display: 'flex', alignItems: 'center', padding: 'var(--space-3) 0', color: 'var(--text-secondary)', gap: 'var(--space-3)' }}>
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};
export default Sidebar;
  `,
  'src/components/layout/Header.tsx': `
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header style={{ height: '60px', backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{user?.name} ({user?.role})</span>
        <button onClick={logout} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Sair</button>
      </div>
    </header>
  );
};
export default Header;
  `,
  'src/pages/Login.tsx': `
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-base)' }}>
      <div style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', width: '400px', border: '1px solid var(--border-color)' }}>
        <h1 style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>Agepe Pesquisa</h1>
        <button onClick={handleLogin} style={{ width: '100%', padding: 'var(--space-3)', backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 'var(--text-base)' }}>
          Entrar (Demo)
        </button>
        <div className="disclaimer">Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.</div>
      </div>
    </div>
  );
};
export default Login;
  `,
  'src/pages/Dashboard.tsx': `
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Dashboard (DEMONSTRATIVO)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Total de Entrevistas', value: '1.245' },
          { label: 'Respostas Válidas', value: '1.180' },
          { label: 'Respostas Inválidas', value: '65' },
          { label: 'Entrevistadores Ativos', value: '12' },
        ].map(kpi => (
          <div key={kpi.label} style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{kpi.label}</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', marginTop: 'var(--space-2)' }}>{kpi.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
  `,
  'src/pages/PrintedForms.tsx': `
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const PrintedForms = () => {
  return (
    <div>
      <h1 className="no-print" style={{ marginBottom: 'var(--space-6)' }}>Formulários Impressos (DEMONSTRATIVO)</h1>
      <button className="no-print" onClick={() => window.print()} style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', marginBottom: 'var(--space-6)' }}>
        Imprimir Lote (Demo)
      </button>

      <div className="print-form">
        <div className="print-form-header">
          <div>
            <h2 style={{ fontSize: '24px', margin: 0 }}>Pesquisa de Intenção de Voto - DEMONSTRATIVO</h2>
            <div style={{ fontSize: '14px' }}>Município: _______________ Bairro: _______________ Data: ___/___/___</div>
          </div>
          <div>
            <QRCodeSVG value="FORM_ID_0001" size={80} />
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '4px' }}>FORM_ID_0001</div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-6)' }}>
          <h3>1. Se a eleição para Prefeito fosse hoje, em quem você votaria?</h3>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <div className="print-candidate-row"><div className="print-checkbox"></div> Candidato A</div>
            <div className="print-candidate-row"><div className="print-checkbox"></div> Candidato B</div>
            <div className="print-candidate-row"><div className="print-checkbox"></div> Candidato C</div>
            <div className="print-candidate-row"><div className="print-checkbox"></div> Branco / Nulo</div>
            <div className="print-candidate-row"><div className="print-checkbox"></div> Não sabe / Não respondeu</div>
          </div>
        </div>

        <div className="disclaimer" style={{ marginTop: '100px', borderTop: '1px solid black', paddingTop: '10px' }}>
          Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.
        </div>
      </div>
    </div>
  );
};
export default PrintedForms;
  `,
  'src/pages/Digitization.tsx': `
import React from 'react';

const Digitization = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Digitação / Conferência (DEMONSTRATIVO)</h1>
      <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--bg-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Scanner de QR Code</h3>
          <div style={{ height: '300px', backgroundColor: 'var(--bg-base)', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Câmera Web (Placeholder)</span>
          </div>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <label>Ou digite o ID do formulário manualmente:</label>
            <input type="text" placeholder="Ex: FORM_ID_0001" style={{ width: '100%', padding: 'var(--space-2)', marginTop: 'var(--space-2)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'white' }} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', opacity: 0.5 }}>
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Formulário Digital</h3>
            <p style={{ color: 'var(--text-muted)' }}>Aguardando leitura do QR Code...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Digitization;
  `,
  'src/pages/RapidEntry.tsx': `
import React, { useState } from 'react';

const RapidEntry = () => {
  const [currentId, setCurrentId] = useState(1);

  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Digitação Rápida (DEMONSTRATIVO)</h1>
      <div style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)' }}>
          <h2>Formulário #{String(currentId).padStart(4, '0')}</h2>
          <span style={{ color: 'var(--text-muted)' }}>Atalho: Enter para salvar e avançar</span>
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>1. Intenção de Voto (Prefeito)</label>
          <select style={{ width: '100%', padding: 'var(--space-3)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'white', fontSize: 'var(--text-lg)' }}>
            <option value="">Selecione...</option>
            <option value="1">1 - Candidato A</option>
            <option value="2">2 - Candidato B</option>
            <option value="3">3 - Candidato C</option>
            <option value="98">98 - Branco/Nulo</option>
            <option value="99">99 - NS/NR</option>
          </select>
        </div>

        <button onClick={() => setCurrentId(c => c + 1)} style={{ width: '100%', padding: 'var(--space-4)', backgroundColor: 'var(--success)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>
          Salvar e Próximo (Enter)
        </button>
      </div>
    </div>
  );
};
export default RapidEntry;
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
});

console.log('Project generated successfully!');
