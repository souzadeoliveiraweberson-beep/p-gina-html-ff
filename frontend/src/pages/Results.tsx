import React, { useState } from 'react';
import { PieChart, Download, FileSpreadsheet, FileText, Filter, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const rankingData = [
  { rank: 1, name: 'CARLOS SILVA', ballotName: 'CARLOS SILVA', number: '10123', party: 'REP', votes: 342, percentage: 28.98 },
  { rank: 2, name: 'MARIA DAS GRAÇAS OLIVEIRA', ballotName: 'MARIA DA SAÚDE', number: '10456', party: 'REP', votes: 298, percentage: 25.25 },
  { rank: 3, name: 'JOÃO ROBERTO SANTOS', ballotName: 'JOÃO SANTOS', number: '15123', party: 'MDB', votes: 245, percentage: 20.76 },
  { rank: 4, name: 'ANA PAULA ROCHA', ballotName: 'ANA ROCHA', number: '15456', party: 'MDB', votes: 185, percentage: 15.67 },
  { rank: 5, name: 'Ainda não decidiu', ballotName: 'NÃO DECIDIDO', number: 'ND', party: '-', votes: 70, percentage: 5.93 },
  { rank: 6, name: 'Nenhum / Branco / Nulo', ballotName: 'BRANCO/NULO', number: 'NN', party: '-', votes: 40, percentage: 3.38 },
];

const Results = () => {
  const [municipalityFilter, setMunicipalityFilter] = useState('TODOS');
  const [positionFilter, setPositionFilter] = useState('Deputado Estadual');

  const totalValidVotes = rankingData.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
            Apuração Automática & Resultados
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Contagem calculada pelo backend baseada nos formulários impressos processados (DADOS DEMONSTRATIVOS).
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <FileSpreadsheet size={18} />
            [EXPORTAR XLSX 6 ABAS]
          </button>
          <button style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <FileText size={18} />
            [RELATÓRIO PDF]
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        gap: 'var(--space-4)',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <Filter size={18} />
          Filtros:
        </div>

        <select value={positionFilter} onChange={e => setPositionFilter(e.target.value)} style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)' }}>
          <option>Deputado Estadual</option>
          <option>Deputado Federal</option>
        </select>

        <select value={municipalityFilter} onChange={e => setMunicipalityFilter(e.target.value)} style={{ padding: 'var(--space-2)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)' }}>
          <option value="TODOS">Todos os Municípios (RO)</option>
          <option value="Porto Velho">Porto Velho</option>
          <option value="Ji-Paraná">Ji-Paraná</option>
          <option value="Ariquemes">Ariquemes</option>
        </select>
      </div>

      {/* Formula Summary Box */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <strong>Fórmula de Percentual:</strong> <code>percentual = (respostas_válidas_candidato / total_respostas_válidas) × 100</code> | Total de Respostas Válidas Analisadas: <strong>{totalValidVotes}</strong>
      </div>

      {/* Ranking Table */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-4) 0' }}>
          Ranking Oficial de Apuração — {positionFilter}
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: 'var(--space-3)' }}>Ranking</th>
              <th style={{ padding: 'var(--space-3)' }}>Nome de Urna</th>
              <th style={{ padding: 'var(--space-3)' }}>Número</th>
              <th style={{ padding: 'var(--space-3)' }}>Partido</th>
              <th style={{ padding: 'var(--space-3)' }}>Quantidade Votos</th>
              <th style={{ padding: 'var(--space-3)' }}>Percentual</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map(item => (
              <tr key={item.rank} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: 'var(--space-3)', fontWeight: 'bold' }}>
                  {item.rank === 1 ? <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={16} /> 1º</span> : `${item.rank}º`}
                </td>
                <td style={{ padding: 'var(--space-3)', fontWeight: 'bold' }}>{item.ballotName}</td>
                <td style={{ padding: 'var(--space-3)', color: 'var(--accent-primary)', fontWeight: 'bold' }}>{item.number}</td>
                <td style={{ padding: 'var(--space-3)' }}>{item.party}</td>
                <td style={{ padding: 'var(--space-3)' }}>{item.votes}</td>
                <td style={{ padding: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: '100px', height: '8px', backgroundColor: 'var(--bg-base)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.percentage}%`, height: '100%', backgroundColor: 'var(--accent-primary)' }} />
                    </div>
                    <strong>{item.percentage}%</strong>
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
export default Results;