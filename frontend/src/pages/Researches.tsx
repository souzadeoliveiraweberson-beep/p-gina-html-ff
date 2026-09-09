import React, { useState } from 'react';
import { FileText, Plus, Eye, Send, Pause, CheckCircle2, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockResearches = [
  { id: 'res-1', title: 'Pesquisa Eleitoral Rondônia 2026 — Deputados Estaduais e Federais', electionYear: 2026, state: 'RO', collectionMode: 'PRINTED (Presencial)', status: 'ATIVA', totalForms: 2000, processedForms: 1450, createdAt: '2026-09-01' },
  { id: 'res-2', title: 'Intenção de Voto Porto Velho 2026 — Prefeto e Vereadores', electionYear: 2026, state: 'RO', collectionMode: 'PRINTED (Presencial)', status: 'RASCUNHO', totalForms: 500, processedForms: 0, createdAt: '2026-09-05' },
  { id: 'res-3', title: 'Avaliação de Governo e Eleição Geral 2026', electionYear: 2026, state: 'RO', collectionMode: 'HYBRID', status: 'ENCERRADA', totalForms: 1000, processedForms: 1000, createdAt: '2026-08-15' },
];

const Researches = () => {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = mockResearches.filter(r => filterStatus === 'ALL' || r.status === filterStatus);

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
            Gerenciamento de Pesquisas Eleitorais
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Gerencie o ciclo de vida das pesquisas (RASCUNHO, ATIVA, PAUSADA, ENCERRADA, ARQUIVADA).
          </p>
        </div>
        <Link to="/researches/create-ai" style={{
          backgroundColor: 'var(--accent-primary)',
          color: '#fff',
          padding: 'var(--space-2) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)'
        }}>
          <Plus size={18} /> + Criar com IA
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-3)' }}>
        {['ALL', 'RASCUNHO', 'ATIVA', 'PAUSADA', 'ENCERRADA'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            style={{
              backgroundColor: filterStatus === st ? 'var(--accent-primary)' : 'transparent',
              color: filterStatus === st ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: filterStatus === st ? 'bold' : 'normal'
            }}
          >
            {st === 'ALL' ? 'Todas' : st}
          </button>
        ))}
      </div>

      {/* Table */}
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
              <th style={{ padding: 'var(--space-3)' }}>Título da Pesquisa</th>
              <th style={{ padding: 'var(--space-3)' }}>Eleição</th>
              <th style={{ padding: 'var(--space-3)' }}>UF</th>
              <th style={{ padding: 'var(--space-3)' }}>Modo Coleta</th>
              <th style={{ padding: 'var(--space-3)' }}>Status</th>
              <th style={{ padding: 'var(--space-3)' }}>Formulários</th>
              <th style={{ padding: 'var(--space-3)' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 'var(--space-3)', fontWeight: 600 }}>{r.title}</td>
                <td style={{ padding: 'var(--space-3)' }}>{r.electionYear}</td>
                <td style={{ padding: 'var(--space-3)' }}>{r.state}</td>
                <td style={{ padding: 'var(--space-3)', fontSize: '0.85rem' }}>{r.collectionMode}</td>
                <td style={{ padding: 'var(--space-3)' }}>
                  <span style={{
                    backgroundColor: r.status === 'ATIVA' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100, 116, 139, 0.15)',
                    color: r.status === 'ATIVA' ? '#10b981' : '#64748b',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ padding: 'var(--space-3)' }}>
                  {r.processedForms} / {r.totalForms}
                </td>
                <td style={{ padding: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <Link to="/forms" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.85rem' }}>
                      [Formulários]
                    </Link>
                    <Link to="/results" style={{ color: '#10b981', textDecoration: 'none', fontSize: '0.85rem' }}>
                      [Resultados]
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Researches;