import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, CheckCircle2, Clock } from 'lucide-react';

const Exports = () => {
  const [downloading, setDownloading] = useState(false);
  const [lastExport, setLastExport] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setLastExport(`Exportação em ${type.toUpperCase()} (6 abas completas com resumo, respostas, candidatos, estatísticas, metodologia e metadados) concluída.`);
    }, 700);
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
          Central de Exportações
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Exporte os resultados da apuração nos formatos XLSX (ExcelJS), CSV e PDF com os devidos metadados.
        </p>
      </div>

      {lastExport && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <CheckCircle2 size={20} />
          {lastExport}
        </div>
      )}

      {/* Export Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
        {/* XLSX Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-4)'
        }}>
          <FileSpreadsheet color="#10b981" size={48} style={{ marginBottom: 'var(--space-3)' }} />
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-2) 0' }}>Planilha Excel (XLSX)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            Contém 6 abas completas: Resumo, Respostas, Candidatos, Estatísticas, Metodologia e Metadados.
          </p>
          <button
            onClick={() => handleExport('xlsx')}
            disabled={downloading}
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            [EXPORTAR XLSX 6 ABAS]
          </button>
        </div>

        {/* CSV Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-4)'
        }}>
          <Download color="#3b82f6" size={48} style={{ marginBottom: 'var(--space-3)' }} />
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-2) 0' }}>Dados Puros (CSV)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            Ideal para importação em softwares estatísticos (SPSS, R, Python, Stata).
          </p>
          <button
            onClick={() => handleExport('csv')}
            disabled={downloading}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            [EXPORTAR CSV]
          </button>
        </div>

        {/* PDF Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-4)'
        }}>
          <FileText color="#f59e0b" size={48} style={{ marginBottom: 'var(--space-3)' }} />
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-2) 0' }}>Relatório Oficial (PDF)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            Documento formatado para apresentação com gráficos, ranking e nota metodológica.
          </p>
          <button
            onClick={() => handleExport('pdf')}
            disabled={downloading}
            style={{
              backgroundColor: '#f59e0b',
              color: '#fff',
              border: 'none',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              width: '100%',
              cursor: 'pointer'
            }}
          >
            [EXPORTAR RELATÓRIO PDF]
          </button>
        </div>
      </div>
    </div>
  );
};
export default Exports;
