import { useState } from 'react';
import { Printer, Download, Plus, FileText, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const PrintedForms = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [quantity, setQuantity] = useState(100);
  const [municipality, setMunicipality] = useState('Porto Velho');
  const [interviewer, setInterviewer] = useState('João da Silva');
  const [sampleFormId, setSampleFormId] = useState('RO26-PV-000127');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
            Gerador de Formulários Impressos
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Gere lotes de formulários físicos PDF com FORM_IDs e QR Codes únicos para entrevistas presenciais em papel.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button
            onClick={() => setShowGenerator(!showGenerator)}
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
            <Plus size={18} />
            [GERAR LOTE DE FORMULÁRIOS]
          </button>

          <button
            onClick={handlePrint}
            style={{
              backgroundColor: '#10b981',
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
            <Printer size={18} />
            [IMPRIMIR FORMULÁRIO]
          </button>
        </div>
      </div>

      {/* Generator Options Panel */}
      {showGenerator && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-6)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-4) 0' }}>Configurar Novo Lote</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Quantidade:</label>
              <select value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ width: '100%', padding: 'var(--space-2)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)' }}>
                <option value={10}>10 formulários</option>
                <option value={50}>50 formulários</option>
                <option value={100}>100 formulários</option>
                <option value={200}>200 formulários</option>
                <option value={500}>500 formulários</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Município:</label>
              <input value={municipality} onChange={e => setMunicipality(e.target.value)} style={{ width: '100%', padding: 'var(--space-2)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Entrevistador:</label>
              <input value={interviewer} onChange={e => setInterviewer(e.target.value)} style={{ width: '100%', padding: 'var(--space-2)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Tamanho:</label>
              <select style={{ width: '100%', padding: 'var(--space-2)', backgroundColor: 'var(--bg-base)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-md)' }}>
                <option>A4 (210 x 297 mm)</option>
                <option>Carta (216 x 279 mm)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE PAPER FORM TEMPLATE */}
      <div className="printable-paper-form" style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: '30px',
        borderRadius: '4px',
        boxShadow: 'var(--shadow-4)',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'serif',
        border: '2px solid #000000'
      }}>
        {/* Header & QR Code */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', textTransform: 'uppercase', fontFamily: 'serif' }}>
              PESQUISA ELEITORAL — RONDÔNIA
            </h2>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '4px' }}>
              ELEIÇÃO 2026 — FORMULÁRIO Nº 000127
            </div>
            <div style={{ fontSize: '0.9rem', marginTop: '4px' }}>
              FORM_ID: <strong>{sampleFormId}</strong>
            </div>
          </div>
          <div style={{ textAlign: 'center', border: '1px solid #000', padding: '6px', backgroundColor: '#fff' }}>
            <QRCodeSVG value={`FORM-RO26-PV-000127`} size={70} />
            <div style={{ fontSize: '0.65rem', fontWeight: 'bold', marginTop: '2px' }}>RO26-PV-000127</div>
          </div>
        </div>

        {/* Metadata Lines */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.9rem', borderBottom: '1px solid #000', paddingBottom: '10px' }}>
          <div>ENTREVISTADOR: ___________________________</div>
          <div>MUNICÍPIO: {municipality}</div>
          <div>DATA: ____/____/______</div>
        </div>

        {/* Position 1: Deputado Estadual */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.05rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>
            DEPUTADO ESTADUAL (Marque apenas UMA opção)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.95rem' }}>
            <div>☐ 10123 — CARLOS SILVA (REP)</div>
            <div>☐ 10456 — MARIA DA SAÚDE (REP)</div>
            <div>☐ 22123 — PEDRO OLIVEIRA (PL)</div>
            <div>☐ 13123 — MARCOS FERREIRA (PT)</div>
            <div>☐ Ainda não decidiu</div>
            <div>☐ Nenhum / Branco / Nulo</div>
            <div>☐ Não respondeu</div>
          </div>
        </div>

        {/* Position 2: Deputado Federal */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1.05rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '4px', marginBottom: '8px' }}>
            DEPUTADO FEDERAL (Marque apenas UMA opção)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.95rem' }}>
            <div>☐ 15123 — JOÃO SANTOS (MDB)</div>
            <div>☐ 15456 — ANA ROCHA (MDB)</div>
            <div>☐ 22456 — LUCAS ALVES (PL)</div>
            <div>☐ Ainda não decidiu</div>
            <div>☐ Nenhum / Branco / Nulo</div>
            <div>☐ Não respondeu</div>
          </div>
        </div>

        {/* Demographics */}
        <div style={{ borderTop: '1px solid #000', paddingTop: '10px', marginTop: '12px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '6px' }}>PERFIL DO ENTREVISTADO:</div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
            <div><strong>Sexo:</strong> ☐ Masc  ☐ Fem  ☐ Outro  ☐ Não inf.</div>
            <div><strong>Faixa Etária:</strong> ☐ 16-24  ☐ 25-34  ☐ 35-44  ☐ 45-59  ☐ 60+</div>
          </div>
        </div>

        {/* Printed Form Disclaimer */}
        <div style={{ borderTop: '1px solid #000', marginTop: '16px', paddingTop: '6px', fontSize: '0.7rem', textAlign: 'center' }}>
          Esta plataforma é uma ferramenta de pesquisa eleitoral privada e NÃO constitui votação oficial da Justiça Eleitoral. FORM_ID: {sampleFormId}
        </div>
      </div>
    </div>
  );
};
export default PrintedForms;