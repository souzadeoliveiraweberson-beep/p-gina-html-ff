import React, { useState } from 'react';
import { Camera, Search, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Digitization = () => {
  const navigate = useNavigate();
  const [formIdInput, setFormIdInput] = useState('RO26-PV-000127');
  const [scanning, setScanning] = useState(false);
  const [activeForm, setActiveForm] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      loadForm(formIdInput);
    }, 500);
  };

  const loadForm = (id: string) => {
    setActiveForm({
      formId: id || 'RO26-PV-000127',
      batchNumber: '001',
      municipality: 'Porto Velho',
      interviewer: 'João da Silva',
      status: 'PENDING',
      questions: [
        {
          id: 'q1',
          position: 'Deputado Estadual',
          text: 'Deputado Estadual — Escolha do Eleitor',
          options: [
            { id: 'opt1', text: '10123 — CARLOS SILVA (REP)' },
            { id: 'opt2', text: '10456 — MARIA DA SAÚDE (REP)' },
            { id: 'opt3', text: '22123 — PEDRO OLIVEIRA (PL)' },
            { id: 'opt4', text: '13123 — MARCOS FERREIRA (PT)' },
            { id: 'opt5', text: 'Ainda não decidiu' },
            { id: 'opt6', text: 'Nenhum / Branco / Nulo' },
            { id: 'opt7', text: 'Prefiro não responder' },
          ]
        },
        {
          id: 'q2',
          position: 'Deputado Federal',
          text: 'Deputado Federal — Escolha do Eleitor',
          options: [
            { id: 'opt8', text: '15123 — JOÃO SANTOS (MDB)' },
            { id: 'opt9', text: '15456 — ANA ROCHA (MDB)' },
            { id: 'opt10', text: '22456 — LUCAS ALVES (PL)' },
            { id: 'opt11', text: 'Ainda não decidiu' },
            { id: 'opt12', text: 'Nenhum / Branco / Nulo' },
            { id: 'opt13', text: 'Prefiro não responder' },
          ]
        }
      ]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Formulário ${activeForm.formId} digitado e registrado com sucesso!`);
    setTimeout(() => {
      setMessage('');
      setActiveForm(null);
    }, 1500);
  };

  const handleReviewFlag = () => {
    alert(`Formulário ${activeForm.formId} marcado como REVISÃO NECESSÁRIA / ILEGÍVEL.`);
    setActiveForm(null);
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
            Digitação / Conferência de Formulários Físicos
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Escaneie o QR Code ou insira o FORM_ID para digitar as respostas marcadas no papel.
          </p>
        </div>
        <button
          onClick={() => navigate('/digitization/rapid')}
          style={{
            backgroundColor: 'var(--bg-surface-hover)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)'
          }}
        >
          Modo Digitação Rápida <ArrowRight size={16} />
        </button>
      </div>

      {/* Scanner & Search Header */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)'
      }}>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <button
            onClick={handleScan}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-3) var(--space-5)',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            <Camera size={20} />
            [ABRIR CÂMERA SCANNER QR]
          </button>

          <div style={{ flex: 1, display: 'flex', gap: 'var(--space-2)' }}>
            <input
              type="text"
              placeholder="Digite o FORM_ID (ex: RO26-PV-000127)"
              value={formIdInput}
              onChange={(e) => setFormIdInput(e.target.value)}
              style={{
                flex: 1,
                padding: 'var(--space-3)',
                backgroundColor: 'var(--bg-base)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-md)'
              }}
            />
            <button
              onClick={() => loadForm(formIdInput)}
              style={{
                backgroundColor: 'var(--bg-surface-hover)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <CheckCircle2 size={20} />
          {message}
        </div>
      )}

      {/* Active Form Entry Panel */}
      {activeForm && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-4)'
        }}>
          {/* Metadata */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FORMULÁRIO LOCALIZADO</span>
              <h2 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-xl)', margin: '4px 0 0 0' }}>
                FORM_ID: {activeForm.formId}
              </h2>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div>Lote: <strong>{activeForm.batchNumber}</strong></div>
              <div>Município: <strong>{activeForm.municipality}</strong></div>
              <div>Entrevistador: <strong>{activeForm.interviewer}</strong></div>
            </div>
          </div>

          {/* Form Questions */}
          {activeForm.questions.map((q: any) => (
            <div key={q.id} style={{ marginBottom: 'var(--space-5)', backgroundColor: 'var(--bg-base)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: 'var(--space-3)', color: 'var(--accent-primary)' }}>
                {q.text}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                {q.options.map((opt: any) => (
                  <label key={opt.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    backgroundColor: answers[q.id] === opt.id ? 'var(--bg-surface-hover)' : 'transparent',
                    border: '1px solid var(--border-color)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt.id}
                      onChange={() => setAnswers({ ...answers, [q.id]: opt.id })}
                    />
                    <span style={{ fontSize: '0.9rem' }}>{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit & Flag Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-6)' }}>
            <button
              type="button"
              onClick={handleReviewFlag}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                color: '#ef4444',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}
            >
              <ShieldAlert size={18} />
              [MARCAR ILEGÍVEL / REVISÃO NECESSÁRIA]
            </button>

            <button
              type="submit"
              style={{
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                padding: 'var(--space-3) var(--space-6)',
                borderRadius: 'var(--radius-md)',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}
            >
              <CheckCircle2 size={20} />
              [REGISTRAR FORMULÁRIO]
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default Digitization;