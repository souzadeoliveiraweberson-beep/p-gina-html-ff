import React, { useState } from 'react';
import { Zap, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

const RapidEntry = () => {
  const [currentSeq, setCurrentSeq] = useState(128);
  const [formId, setFormId] = useState('RO26-PV-000128');
  const [answers, setAnswers] = useState<Record<string, string>>({
    dep_est: 'opt1',
    dep_fed: 'opt8'
  });
  const [processedCount, setProcessedCount] = useState(145);
  const [message, setMessage] = useState('');

  const handleSaveAndNext = () => {
    setMessage(`Formulário ${formId} salvo! Carregando ${String(currentSeq + 1).padStart(6, '0')}...`);
    setProcessedCount(prev => prev + 1);

    setTimeout(() => {
      const nextSeq = currentSeq + 1;
      setCurrentSeq(nextSeq);
      setFormId(`RO26-PV-${String(nextSeq).padStart(6, '0')}`);
      setAnswers({});
      setMessage('');
    }, 400);
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '900px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Zap color="#f59e0b" size={24} />
            <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
              Modo Digitação Rápida Sequencial
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Após salvar cada formulário, o próximo formulário do lote é carregado automaticamente.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
            {processedCount} / 200
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Formulários Processados</div>
        </div>
      </div>

      {message && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', fontSize: '0.9rem' }}>
          {message}
        </div>
      )}

      {/* Form Card */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '2px solid var(--accent-primary)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FORMULÁRIO SEQUENCIAL</span>
            <h2 style={{ fontFamily: 'var(--font-old-style)', margin: 0, color: 'var(--text-primary)' }}>
              FORM_ID: {formId}
            </h2>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Lote: <strong>001</strong> | Município: <strong>Porto Velho</strong>
          </div>
        </div>

        {/* Deputado Estadual Choice */}
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 'var(--space-3)', color: '#3b82f6' }}>
            1. Deputado Estadual
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
            {[
              { id: 'opt1', text: '10123 — CARLOS SILVA (REP)' },
              { id: 'opt2', text: '10456 — MARIA DA SAÚDE (REP)' },
              { id: 'opt3', text: '22123 — PEDRO OLIVEIRA (PL)' },
              { id: 'opt4', text: '13123 — MARCOS FERREIRA (PT)' },
              { id: 'opt5', text: 'Ainda não decidiu' },
              { id: 'opt6', text: 'Nenhum / Branco / Nulo' },
            ].map(opt => (
              <label key={opt.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                backgroundColor: answers.dep_est === opt.id ? 'var(--bg-surface-hover)' : 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="dep_est"
                  checked={answers.dep_est === opt.id}
                  onChange={() => setAnswers({ ...answers, dep_est: opt.id })}
                />
                <span style={{ fontSize: '0.9rem' }}>{opt.text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Deputado Federal Choice */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 'var(--space-3)', color: '#3b82f6' }}>
            2. Deputado Federal
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
            {[
              { id: 'opt8', text: '15123 — JOÃO SANTOS (MDB)' },
              { id: 'opt9', text: '15456 — ANA ROCHA (MDB)' },
              { id: 'opt10', text: '22456 — LUCAS ALVES (PL)' },
              { id: 'opt11', text: 'Ainda não decidiu' },
              { id: 'opt12', text: 'Nenhum / Branco / Nulo' },
            ].map(opt => (
              <label key={opt.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                backgroundColor: answers.dep_fed === opt.id ? 'var(--bg-surface-hover)' : 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="dep_fed"
                  checked={answers.dep_fed === opt.id}
                  onChange={() => setAnswers({ ...answers, dep_fed: opt.id })}
                />
                <span style={{ fontSize: '0.9rem' }}>{opt.text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => handleSaveAndNext()}
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            [PULAR / ILEGÍVEL]
          </button>

          <button
            onClick={handleSaveAndNext}
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              padding: 'var(--space-3) var(--space-6)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            <CheckCircle2 size={20} />
            [SALVAR E ABBRIR PRÓXIMO] (Enter)
          </button>
        </div>
      </div>
    </div>
  );
};
export default RapidEntry;