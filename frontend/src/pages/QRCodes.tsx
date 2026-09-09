import React, { useState } from 'react';
import { QrCode, Download, Printer, Copy, Camera, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodes = () => {
  const [copied, setCopied] = useState(false);
  const [publicUrl] = useState('https://pesquisa.agepe.com.br/p/RO-2026-8F29X');
  const [formQr] = useState('FORM-RO26-PV-000127');

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', margin: 0 }}>
          Central de QR Codes
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          Gerenciamento e geração de QR Codes para formulários impressos e links de coleta digital.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
        {/* Paper Form QR Code */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-4)'
        }}>
          <span style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            PESQUISA PRESENCIAL (PAPEL)
          </span>
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: 'var(--space-3) 0' }}>
            QR Code do Formulário Físico
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            Identificador exclusivo do formulário para auditoria e digitação presencial.
          </p>

          <div style={{ backgroundColor: '#fff', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: 'var(--space-4)' }}>
            <QRCodeSVG value={formQr} size={160} />
          </div>

          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 'var(--space-4)' }}>
            FORM_ID: RO26-PV-000127
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
            <button style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Download size={14} /> PNG
            </button>
            <button style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Download size={14} /> SVG
            </button>
            <button style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Printer size={14} /> Imprimir
            </button>
          </div>
        </div>

        {/* Digital Survey QR Code */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-6)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-4)'
        }}>
          <span style={{ backgroundColor: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
            PESQUISA DIGITAL (OPCIONAL)
          </span>
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: 'var(--space-3) 0' }}>
            QR Code do Link Público
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
            Permite aos participantes responderem via dispositivo móvel quando habilitado.
          </p>

          <div style={{ backgroundColor: '#fff', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: 'var(--space-4)' }}>
            <QRCodeSVG value={publicUrl} size={160} />
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', wordBreak: 'break-all', marginBottom: 'var(--space-4)' }}>
            {publicUrl}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
            <button onClick={handleCopy} style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />} {copied ? 'Copiado!' : 'Copiar Link'}
            </button>
            <button style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Download size={14} /> PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QRCodes;