import React from 'react';
import { ShieldCheck, Clock, User } from 'lucide-react';

const mockAuditLogs = [
  { id: 'log-1', action: 'DIGITIZED', entity: 'printed_forms', entityId: 'RO26-PV-000127', user: 'Maria Operadora', ip: '192.168.1.10', date: '2026-09-09 11:15:22' },
  { id: 'log-2', action: 'BATCH_GENERATED', entity: 'form_batches', entityId: 'LOTE-001', user: 'Admin Geral', ip: '192.168.1.1', date: '2026-09-09 10:30:00' },
  { id: 'log-3', action: 'CANDIDATES_SYNCED', entity: 'candidates', entityId: 'RO-2026', user: 'Admin Geral', ip: '192.168.1.1', date: '2026-09-08 16:45:10' },
  { id: 'log-4', action: 'RESEARCH_PUBLISHED', entity: 'researches', entityId: 'RO2026-001', user: 'Admin Geral', ip: '192.168.1.1', date: '2026-09-08 14:20:05' },
  { id: 'log-5', action: 'LOGIN_SUCCESS', entity: 'auth', entityId: 'usr-1', user: 'Admin Geral', ip: '192.168.1.1', date: '2026-09-08 14:00:00' },
];

const Audit = () => {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
          Trilha de Auditoria do Sistema (Audit Logs)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Registro imutável de todas as ações de criação, impressão, digitação, alteração e exportação.
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: 'var(--space-3)' }}>Data/Hora</th>
              <th style={{ padding: 'var(--space-3)' }}>Ação</th>
              <th style={{ padding: 'var(--space-3)' }}>Entidade</th>
              <th style={{ padding: 'var(--space-3)' }}>ID da Entidade</th>
              <th style={{ padding: 'var(--space-3)' }}>Usuário Responsável</th>
              <th style={{ padding: 'var(--space-3)' }}>IP Origem</th>
            </tr>
          </thead>
          <tbody>
            {mockAuditLogs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 'var(--space-3)', color: 'var(--text-muted)' }}>{log.date}</td>
                <td style={{ padding: 'var(--space-3)', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{log.action}</td>
                <td style={{ padding: 'var(--space-3)' }}>{log.entity}</td>
                <td style={{ padding: 'var(--space-3)', fontFamily: 'monospace' }}>{log.entityId}</td>
                <td style={{ padding: 'var(--space-3)', fontWeight: 600 }}>{log.user}</td>
                <td style={{ padding: 'var(--space-3)', color: 'var(--text-muted)' }}>{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Audit;