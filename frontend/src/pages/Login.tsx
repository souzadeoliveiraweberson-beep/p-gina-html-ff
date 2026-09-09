import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Shield, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@agepe.com.br');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-base)',
      padding: 'var(--space-4)'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        width: '100%',
        maxWidth: '420px',
        boxShadow: 'var(--shadow-4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--accent-primary)',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            fontFamily: 'var(--font-old-style)',
            marginBottom: 'var(--space-3)'
          }}>
            AP
          </div>
          <h2 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-xl)', margin: 0 }}>
            Agepe Pesquisa
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
            Acesso Restrito ao Painel Administrativo
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          color: '#f59e0b',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.75rem',
          marginBottom: 'var(--space-6)',
          lineHeight: 1.35
        }}>
          <strong>AVISO LEGAL:</strong> Esta plataforma é uma ferramenta de pesquisa eleitoral privada e NÃO constitui votação oficial da Justiça Eleitoral.
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              E-mail corporativo:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                backgroundColor: 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Senha de acesso:
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                backgroundColor: 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            ENTRAR NA PLATAFORMA
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;