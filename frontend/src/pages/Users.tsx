import React from 'react';
import { UserCog, Plus, Shield, CheckCircle2 } from 'lucide-react';

const usersList = [
  { id: 'usr-1', name: 'Administrador Geral', email: 'admin@agepe.com.br', role: 'ADMIN', status: 'ATIVO', permissions: 'Acesso Total' },
  { id: 'usr-2', name: 'Analista de Estatística', email: 'analista@agepe.com.br', role: 'ANALYST', status: 'ATIVO', permissions: 'Visualizar / Exportar' },
  { id: 'usr-3', name: 'João Entrevistador', email: 'joao@agepe.com.br', role: 'INTERVIEWER', status: 'ATIVO', permissions: 'Coletar / Lotes' },
  { id: 'usr-4', name: 'Maria Operadora Digitação', email: 'maria@agepe.com.br', role: 'OPERATOR', status: 'ATIVO', permissions: 'Digitalizar / Conferir' },
];

const Users = () => {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
            Gerenciamento de Usuários e Permissões (RBAC)
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Controle de acesso por função: ADMIN, ANALYST, INTERVIEWER e OPERATOR.
          </p>
        </div>
        <button style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Plus size={18} /> + Novo Usuário
        </button>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: 'var(--space-3)' }}>Nome</th>
              <th style={{ padding: 'var(--space-3)' }}>E-mail</th>
              <th style={{ padding: 'var(--space-3)' }}>Perfil (RBAC)</th>
              <th style={{ padding: 'var(--space-3)' }}>Permissões</th>
              <th style={{ padding: 'var(--space-3)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 'var(--space-3)', fontWeight: 600 }}>{u.name}</td>
                <td style={{ padding: 'var(--space-3)', color: 'var(--text-secondary)' }}>{u.email}</td>
                <td style={{ padding: 'var(--space-3)' }}>
                  <span style={{ backgroundColor: 'var(--bg-surface-hover)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: 'var(--space-3)', fontSize: '0.85rem' }}>{u.permissions}</td>
                <td style={{ padding: 'var(--space-3)' }}>
                  <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;