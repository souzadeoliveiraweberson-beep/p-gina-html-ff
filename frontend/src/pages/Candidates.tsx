import React, { useState } from 'react';
import { Users, RefreshCw, Upload, FileSpreadsheet, CheckCircle2, ShieldCheck } from 'lucide-react';

const candidatesList = [
  { id: '1', name: 'CARLOS EDUARDO SILVA', ballotName: 'CARLOS SILVA', number: '10123', party: 'REP', position: 'Deputado Estadual', state: 'RO', status: 'DEFERIDO', source: 'TSE (OFICIAL)' },
  { id: '2', name: 'MARIA DAS GRAÇAS OLIVEIRA', ballotName: 'MARIA DA SAÚDE', number: '10456', party: 'REP', position: 'Deputado Estadual', state: 'RO', status: 'DEFERIDO', source: 'TSE (OFICIAL)' },
  { id: '3', name: 'JOÃO ROBERTO SANTOS', ballotName: 'JOÃO SANTOS', number: '15123', party: 'MDB', position: 'Deputado Federal', state: 'RO', status: 'DEFERIDO', source: 'TSE (OFICIAL)' },
  { id: '4', name: 'ANA PAULA ROCHA', ballotName: 'ANA ROCHA', number: '15456', party: 'MDB', position: 'Deputado Federal', state: 'RO', status: 'DEFERIDO', source: 'TSE (OFICIAL)' },
  { id: '5', name: 'PEDRO HENRIQUE OLIVEIRA', ballotName: 'PEDRO OLIVEIRA', number: '22123', party: 'PL', position: 'Deputado Estadual', state: 'RO', status: 'DEFERIDO', source: 'IMPORTADO (XLSX)' },
];

const Candidates = () => {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncResult({
        newCount: 4,
        updatedCount: 0,
        removedCount: 0,
        unchangedCount: 28,
        version: '2026-RO-SYNC-001',
        message: 'Sincronização concluída com a fonte configurada!'
      });
    }, 800);
  };

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
            Gerenciamento de Candidatos
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Fonte de dados adaptável via CandidateProvider (TSE Oficial, Importação XLSX/CSV ou Cadastro Manual).
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={handleSync}
            disabled={syncing}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            {syncing ? <RefreshCw className="spin" size={18} /> : <RefreshCw size={18} />}
            [SINCRONIZAR CANDIDATOS]
          </button>
        </div>
      </div>

      {/* Sync Result Banner */}
      {syncResult && (
        <div style={{
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid var(--accent-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: 'var(--space-2)' }}>
            Resultado da Sincronização (Versão: {syncResult.version})
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-6)', fontSize: '0.9rem' }}>
            <span>NOVOS: <strong>{syncResult.newCount}</strong></span>
            <span>ALTERADOS: <strong>{syncResult.updatedCount}</strong></span>
            <span>REMOVIDOS: <strong>{syncResult.removedCount}</strong></span>
            <span>INALTERADOS: <strong>{syncResult.unchangedCount}</strong></span>
          </div>
        </div>
      )}

      {/* Candidates List Table */}
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
              <th style={{ padding: 'var(--space-3)' }}>Nome Completo</th>
              <th style={{ padding: 'var(--space-3)' }}>Nome de Urna</th>
              <th style={{ padding: 'var(--space-3)' }}>Número</th>
              <th style={{ padding: 'var(--space-3)' }}>Partido</th>
              <th style={{ padding: 'var(--space-3)' }}>Cargo</th>
              <th style={{ padding: 'var(--space-3)' }}>Situação</th>
              <th style={{ padding: 'var(--space-3)' }}>Fonte de Dados</th>
            </tr>
          </thead>
          <tbody>
            {candidatesList.map(cand => (
              <tr key={cand.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 'var(--space-3)', fontWeight: 600 }}>{cand.name}</td>
                <td style={{ padding: 'var(--space-3)' }}>{cand.ballotName}</td>
                <td style={{ padding: 'var(--space-3)', color: 'var(--accent-primary)', fontWeight: 'bold' }}>{cand.number}</td>
                <td style={{ padding: 'var(--space-3)' }}>{cand.party}</td>
                <td style={{ padding: 'var(--space-3)' }}>{cand.position}</td>
                <td style={{ padding: 'var(--space-3)' }}>
                  <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    {cand.status}
                  </span>
                </td>
                <td style={{ padding: 'var(--space-3)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {cand.source}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Candidates;