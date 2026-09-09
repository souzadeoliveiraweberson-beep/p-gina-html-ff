import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Sparkles, 
  Vote, 
  Users, 
  UserPlus, 
  Printer, 
  Keyboard, 
  Zap, 
  UserCheck, 
  QrCode, 
  PieChart, 
  FileCheck, 
  Download, 
  UserCog, 
  ShieldCheck, 
  Settings 
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
    { name: 'Acompanhamento Coleta', path: '/dashboard/collection', icon: <BarChart3 size={18} /> },
    { name: 'Pesquisas', path: '/researches', icon: <FileText size={18} /> },
    { name: 'Criar Pesquisa (IA)', path: '/researches/create-ai', icon: <Sparkles size={18} /> },
    { name: 'Eleições', path: '/elections', icon: <Vote size={18} /> },
    { name: 'Candidatos', path: '/candidates', icon: <Users size={18} /> },
    { name: 'Importar Candidatos', path: '/candidates/import', icon: <UserPlus size={18} /> },
    { name: 'Formulários Impressos', path: '/forms', icon: <Printer size={18} /> },
    { name: 'Digitação / Conferência', path: '/digitization', icon: <Keyboard size={18} /> },
    { name: 'Digitação Rápida', path: '/digitization/rapid', icon: <Zap size={18} /> },
    { name: 'Entrevistadores', path: '/interviewers', icon: <UserCheck size={18} /> },
    { name: 'QR Codes', path: '/qr-codes', icon: <QrCode size={18} /> },
    { name: 'Resultados / Apuração', path: '/results', icon: <PieChart size={18} /> },
    { name: 'Relatórios', path: '/reports', icon: <FileCheck size={18} /> },
    { name: 'Exportações', path: '/exports', icon: <Download size={18} /> },
    { name: 'Usuários (RBAC)', path: '/users', icon: <UserCog size={18} /> },
    { name: 'Auditoria', path: '/audit', icon: <ShieldCheck size={18} /> },
    { name: 'Configurações', path: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-surface)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto'
    }}>
      {/* Brand Header */}
      <div style={{
        padding: 'var(--space-4)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--accent-primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontFamily: 'var(--font-old-style)'
        }}>
          AP
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-old-style)',
            fontSize: 'var(--text-lg)',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            lineHeight: 1.1
          }}>
            Agepe Pesquisa
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Plataforma Eleitoral
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: 'var(--space-3)' }}>
        {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-2) var(--space-3)',
                margin: '2px 0',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-surface-hover)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Legal Banner */}
      <div style={{
        padding: 'var(--space-3)',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: '#090d16',
        fontSize: '0.68rem',
        color: 'var(--text-muted)',
        lineHeight: 1.35
      }}>
        <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '2px' }}>AVISO LEGAL</strong>
        Ferramenta de pesquisa eleitoral privada. NÃO é votação oficial do TSE.
      </div>
    </aside>
  );
};
export default Sidebar;