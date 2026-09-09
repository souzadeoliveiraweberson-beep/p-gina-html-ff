import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = {
  'src/pages/Register.tsx': `
import React from 'react';

const Register = () => {
  return <div>Registro (DEMONSTRATIVO)</div>;
};
export default Register;
  `,
  'src/pages/CollectionDashboard.tsx': `
import React from 'react';

const CollectionDashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Coleta (DEMONSTRATIVO)</h1>
      <div style={{ backgroundColor: 'var(--bg-surface)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
        <h3>Progresso da Coleta</h3>
        <div style={{ width: '100%', backgroundColor: 'var(--bg-base)', height: '24px', borderRadius: '12px', marginTop: 'var(--space-2)', overflow: 'hidden' }}>
          <div style={{ width: '72%', backgroundColor: 'var(--success)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
            72%
          </div>
        </div>
      </div>
    </div>
  );
};
export default CollectionDashboard;
  `,
  'src/pages/CreateAI.tsx': `
import React from 'react';

const CreateAI = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Criar Pesquisa com IA (DEMONSTRATIVO)</h1>
      <textarea placeholder="Ex: Crie uma pesquisa para prefeito de São Paulo com 5 candidatos principais..." style={{ width: '100%', height: '150px', padding: 'var(--space-4)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'white' }} />
      <button style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3) var(--space-6)', backgroundColor: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Gerar com IA</button>
    </div>
  );
};
export default CreateAI;
  `,
  'src/pages/Researches.tsx': `
import React from 'react';

const Researches = () => {
  return <div>Lista de Pesquisas (DEMONSTRATIVO)</div>;
};
export default Researches;
  `,
  'src/pages/Candidates.tsx': `
import React from 'react';

const Candidates = () => {
  return <div>Gestão de Candidatos (DEMONSTRATIVO)</div>;
};
export default Candidates;
  `,
  'src/pages/Elections.tsx': `
import React from 'react';

const Elections = () => {
  return <div>Eleições (DEMONSTRATIVO)</div>;
};
export default Elections;
  `,
  'src/pages/Interviewers.tsx': `
import React from 'react';

const Interviewers = () => {
  return <div>Entrevistadores (DEMONSTRATIVO)</div>;
};
export default Interviewers;
  `,
  'src/pages/QRCodes.tsx': `
import React from 'react';

const QRCodes = () => {
  return <div>Gerador de QR Codes (DEMONSTRATIVO)</div>;
};
export default QRCodes;
  `,
  'src/pages/Results.tsx': `
import React from 'react';

const Results = () => {
  return <div>Resultados e Apuração (DEMONSTRATIVO)</div>;
};
export default Results;
  `,
  'src/pages/Reports.tsx': `
import React from 'react';

const Reports = () => {
  return <div>Relatórios e Exportações (DEMONSTRATIVO)</div>;
};
export default Reports;
  `,
  'src/pages/Users.tsx': `
import React from 'react';

const Users = () => {
  return <div>Usuários (DEMONSTRATIVO)</div>;
};
export default Users;
  `,
  'src/pages/Audit.tsx': `
import React from 'react';

const Audit = () => {
  return <div>Logs de Auditoria (DEMONSTRATIVO)</div>;
};
export default Audit;
  `,
  'src/pages/Settings.tsx': `
import React from 'react';

const Settings = () => {
  return <div>Configurações (DEMONSTRATIVO)</div>;
};
export default Settings;
  `,
  'src/pages/PublicSurvey.tsx': `
import React from 'react';

const PublicSurvey = () => {
  return <div>Pesquisa Pública (DEMONSTRATIVO)</div>;
};
export default PublicSurvey;
  `,
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
});

console.log('Extra pages generated successfully!');
