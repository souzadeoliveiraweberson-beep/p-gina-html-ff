import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const PublicSurvey = () => {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: 'var(--space-8)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <CheckCircle2 color="#10b981" size={64} style={{ marginBottom: 'var(--space-4)' }} />
        <h2 style={{ fontFamily: 'var(--font-old-style)' }}>Resposta Registrada com Sucesso!</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Agradecemos sua participação nesta pesquisa de opinião eleitoral privada.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '700px', margin: '0 auto' }}>
      {/* Legal Banner */}
      <div style={{
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        color: '#f59e0b',
        padding: 'var(--space-3)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.8rem',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }}>
        <AlertTriangle size={20} />
        <div>
          <strong>AVISO LEGAL:</strong> Esta plataforma é uma ferramenta de pesquisa eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
          Pesquisa Eleitoral Rondônia 2026
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
          Por favor, responda às perguntas abaixo. Suas respostas são anônimas.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-5)', backgroundColor: 'var(--bg-base)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 'bold', marginBottom: 'var(--space-3)' }}>
              1. Em qual candidato a Deputado Estadual você votaria?
            </div>
            {[
              { id: 'opt1', text: '10123 — CARLOS SILVA (REP)' },
              { id: 'opt2', text: '10456 — MARIA DA SAÚDE (REP)' },
              { id: 'opt3', text: '22123 — PEDRO OLIVEIRA (PL)' },
              { id: 'opt4', text: 'Ainda não decidiu' },
              { id: 'opt5', text: 'Nenhum / Branco / Nulo' },
            ].map(opt => (
              <label key={opt.id} style={{ display: 'block', padding: 'var(--space-2) 0', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="q1"
                  checked={answers.q1 === opt.id}
                  onChange={() => setAnswers({ ...answers, q1: opt.id })}
                />
                <span style={{ marginLeft: 'var(--space-2)', fontSize: '0.9rem' }}>{opt.text}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            ENVIAR RESPOSTA
          </button>
        </form>
      </div>
    </div>
  );
};
export default PublicSurvey;