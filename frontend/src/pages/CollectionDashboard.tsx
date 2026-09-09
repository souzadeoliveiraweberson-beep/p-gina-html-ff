import React from 'react';
import { BarChart3, Printer, CheckCircle2, Clock, AlertTriangle, Users } from 'lucide-react';

const interviewersBreakdown = [
  { name: 'João da Silva', received: 100, processed: 85, pending: 12, review: 3, status: 'EM ANDAMENTO' },
  { name: 'Maria de Oliveira', received: 100, processed: 100, pending: 0, review: 0, status: 'CONCLUÍDO' },
  { name: 'Carlos Eduardo', received: 100, processed: 72, pending: 25, review: 3, status: 'EM ANDAMENTO' },
  { name: 'Ana Paula Rocha', received: 100, processed: 90, pending: 8, review: 2, status: 'EM ANDAMENTO' },
];

const CollectionDashboard = () => {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      {/* Title */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
          Painel de Acompanhamento da Coleta Presencial
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Monitoramento em tempo real do recolhimento de formulários impressos e progresso de digitação.
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Formulários Impressos', value: '2.000', color: '#3b82f6' },
          { label: 'Formulários Distribuídos', value: '1.800', color: '#8b5cf6' },
          { label: 'Formulários Recolhidos', value: '1.600', color: '#f59e0b' },
          { label: 'Formulários Digitados', value: '1.450', color: '#10b981' },
          { label: 'Formulários Pendentes', value: '150', color: '#64748b' },
          { label: 'Formulários em Revisão', value: '8', color: '#ef4444' },
        ].map(card => (
          <div key={card.label} style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            borderLeft: `4px solid ${card.color}`
          }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{card.label}</div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', marginTop: 'var(--space-2)', fontFamily: 'var(--font-old-style)' }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Big Progress Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        marginBottom: 'var(--space-6)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Status Geral de Processamento do Lote</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#10b981', fontFamily: 'var(--font-old-style)' }}>
            72.5% Concluído
          </div>
        </div>
        <div style={{
          width: '100%',
          height: '24px',
          backgroundColor: 'var(--bg-base)',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: 'var(--space-3)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            width: '72.5%',
            height: '100%',
            backgroundColor: '#10b981',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            72,5%
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          ██████████████░░░░ (1.450 de 2.000 formulários em papel auditados e apurados)
        </div>
      </div>

      {/* Breakdown per Interviewer */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)'
      }}>
        <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-4) 0' }}>
          Acompanhamento por Entrevistador
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: 'var(--space-3)' }}>Entrevistador</th>
              <th style={{ padding: 'var(--space-3)' }}>Formulários Recebidos</th>
              <th style={{ padding: 'var(--space-3)' }}>Digitados</th>
              <th style={{ padding: 'var(--space-3)' }}>Pendentes</th>
              <th style={{ padding: 'var(--space-3)' }}>Em Revisão</th>
              <th style={{ padding: 'var(--space-3)' }}>Status Coleta</th>
            </tr>
          </thead>
          <tbody>
            {interviewersBreakdown.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 'var(--space-3)', fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: 'var(--space-3)' }}>{row.received}</td>
                <td style={{ padding: 'var(--space-3)', color: '#10b981', fontWeight: 'bold' }}>{row.processed}</td>
                <td style={{ padding: 'var(--space-3)' }}>{row.pending}</td>
                <td style={{ padding: 'var(--space-3)', color: row.review > 0 ? '#ef4444' : 'inherit' }}>{row.review}</td>
                <td style={{ padding: 'var(--space-3)' }}>
                  <span style={{
                    backgroundColor: row.status === 'CONCLUÍDO' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: row.status === 'CONCLUÍDO' ? '#10b981' : '#f59e0b',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {row.status}
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
export default CollectionDashboard;