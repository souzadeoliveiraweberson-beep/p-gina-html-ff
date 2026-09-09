import React from 'react';
import { Bell, User, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const { user } = useAuth();

  return (
    <header style={{
      height: '60px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--space-6)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* Disclaimer Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        color: '#f59e0b',
        padding: 'var(--space-1) var(--space-3)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.75rem'
      }}>
        <AlertTriangle size={14} />
        <span>Pesquisa Eleitoral Privada — Coleta Presencial & Apuração Interna</span>
      </div>

      {/* Right User Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '50%'
          }} />
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          borderLeft: '1px solid var(--border-color)',
          paddingLeft: 'var(--space-4)'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-surface-hover)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)'
          }}>
            <User size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {user?.name || 'Administrador'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {user?.role || 'ADMIN'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;