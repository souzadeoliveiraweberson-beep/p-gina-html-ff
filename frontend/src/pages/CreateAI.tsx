import React, { useState } from 'react';
import { Sparkles, Check, RefreshCw, Send, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateAI = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('Crie uma pesquisa eleitoral para Rondônia com deputados estaduais e deputados federais para a eleição de 2026.');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);

  const handleInterpret = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setPreview({
        title: 'Pesquisa Eleitoral Rondônia 2026 — Deputado Estadual e Federal',
        electionYear: 2026,
        state: 'RO',
        positions: ['Deputado Estadual', 'Deputado Federal'],
        surveyType: 'intencao_de_voto',
        answerType: 'single_choice',
        collectionMode: 'PRINTED',
        generateQrCode: true,
        automaticCounting: true,
        questions: [
          {
            title: 'Deputado Estadual',
            text: 'Se a eleição fosse hoje, em qual candidato a Deputado Estadual você votaria?',
            options: [
              '☐ 10123 — CARLOS SILVA (REP)',
              '☐ 10456 — MARIA DA SAÚDE (REP)',
              '☐ 22123 — PEDRO OLIVEIRA (PL)',
              '☐ 13123 — MARCOS FERREIRA (PT)',
              '☐ Ainda não decidiu',
              '☐ Nenhum / Branco / Nulo',
              '☐ Prefiro não responder'
            ]
          },
          {
            title: 'Deputado Federal',
            text: 'Se a eleição fosse hoje, em qual candidato a Deputado Federal você votaria?',
            options: [
              '☐ 15123 — JOÃO SANTOS (MDB)',
              '☐ 15456 — ANA ROCHA (MDB)',
              '☐ 22456 — LUCAS ALVES (PL)',
              '☐ Ainda não decidiu',
              '☐ Nenhum / Branco / Nulo',
              '☐ Prefiro não responder'
            ]
          }
        ],
        disclaimer: 'Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.'
      });
      setLoading(false);
    }, 600);
  };

  const handlePublish = () => {
    alert('Pesquisa publicada com sucesso! Lotes de formulários impressos com FORM_IDs e QR Codes já podem ser gerados.');
    navigate('/forms');
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
        <Sparkles color="var(--accent-primary)" size={28} />
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
            Criar Pesquisa Eleitoral com IA
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Escreva em linguagem natural o comando da pesquisa desejada. A IA interpretará os cargos, eleição e dados oficiais.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
        boxShadow: 'var(--shadow-4)'
      }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
          Descreva a pesquisa que você deseja criar:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            backgroundColor: 'var(--bg-base)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            padding: 'var(--space-3)',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            resize: 'vertical',
            marginBottom: 'var(--space-4)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Exemplo: “Crie uma pesquisa presencial para Rondônia com deputados estaduais e federais para 2026.”
          </div>
          <button
            onClick={handleInterpret}
            disabled={loading}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2) var(--space-5)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            {loading ? <RefreshCw className="spin" size={18} /> : <Sparkles size={18} />}
            Interpretador IA
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {preview && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '2px solid var(--accent-primary)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
            <div>
              <span style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                PRÉ-VISUALIZAÇÃO
              </span>
              <h2 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-xl)', marginTop: 'var(--space-2)' }}>
                {preview.title}
              </h2>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div>Eleição: <strong>{preview.electionYear}</strong></div>
              <div>Estado: <strong>{preview.state}</strong></div>
              <div>Modo: <strong>{preview.collectionMode} (Presencial/Impresso)</strong></div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: 'var(--space-4) 0', marginBottom: 'var(--space-4)' }}>
            <h4 style={{ margin: '0 0 var(--space-3) 0', color: 'var(--text-secondary)' }}>Perguntas e Checklist dos Candidatos:</h4>
            {preview.questions.map((q: any, idx: number) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-base)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)' }}>
                <div style={{ fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>{q.title}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>{q.text}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
                  {q.options.map((opt: string, oIdx: number) => (
                    <div key={oIdx} style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{opt}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              [EDITAR CONFIGURAÇÃO]
            </button>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button onClick={handleInterpret} style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                [GERAR NOVAMENTE]
              </button>

              <button onClick={handlePublish} style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: 'var(--space-2) var(--space-5)', borderRadius: 'var(--radius-md)', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Send size={18} />
                [PUBLICAR E GERAR FORMULÁRIOS]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateAI;