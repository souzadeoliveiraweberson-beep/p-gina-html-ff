import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, CheckCircle2, AlertTriangle, Users, Printer, Keyboard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const candidateData = [
  { name: 'CARLOS SILVA (REP)', votes: 342, percentage: 28.98 },
  { name: 'MARIA DA SAÚDE (REP)', votes: 298, percentage: 25.25 },
  { name: 'JOÃO SANTOS (MDB)', votes: 245, percentage: 20.76 },
  { name: 'ANA ROCHA (MDB)', votes: 185, percentage: 15.67 },
  { name: 'Ainda não decidiu', votes: 70, percentage: 5.93 },
  { name: 'Nenhum / Branco / Nulo', votes: 40, percentage: 3.38 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#64748b', '#ef4444'];

const Dashboard = () => {
  return (
    <div style={{ padding: 'var(--space-6)' }}>
      {/* Page Title & Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-old-style)', fontSize: 'var(--text-2xl)', color: 'var(--text-primary)', margin: 0 }}>
            Painel Geral de Pesquisas
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-1)', fontSize: '0.9rem' }}>
            Visão consolidada de formulários impressos, digitação presencial e apuração (DADOS DEMONSTRATIVOS)
          </p>
        </div>
        <Link to="/researches/create-ai" style={{
          backgroundColor: 'var(--accent-primary)',
          color: '#fff',
          padding: 'var(--space-2) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)'
        }}>
          + Criar Pesquisa com IA
        </Link>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        {[
          { label: 'Formulários Impressos', value: '2.000', icon: <Printer color="#3b82f6" size={24} />, sub: '10 Lotes gerados' },
          { label: 'Formulários Digitados', value: '1.450', icon: <Keyboard color="#10b981" size={24} />, sub: '72,5% do total recolhido' },
          { label: 'Respostas Válidas', value: '1.380', icon: <CheckCircle2 color="#3b82f6" size={24} />, sub: '95,1% de validade' },
          { label: 'Em Revisão / Ilegível', value: '70', icon: <AlertTriangle color="#f59e0b" size={24} />, sub: 'Revisão necessária' },
          { label: 'Entrevistadores Ativos', value: '14', icon: <Users color="#8b5cf6" size={24} />, sub: 'Coleta em Porto Velho' },
        ].map(kpi => (
          <div key={kpi.label} style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            boxShadow: 'var(--shadow-4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{kpi.label}</span>
              {kpi.icon}
            </div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', margin: 'var(--space-2) 0 0 0', fontFamily: 'var(--font-old-style)' }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Coleta Progress Banner */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <div style={{ fontWeight: 600 }}>Progresso da Coleta Presencial — Pesquisa RO 2026</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>72.5% Digitado</div>
        </div>
        <div style={{
          width: '100%',
          height: '14px',
          backgroundColor: 'var(--bg-base)',
          borderRadius: '7px',
          overflow: 'hidden',
          marginBottom: 'var(--space-3)'
        }}>
          <div style={{
            width: '72.5%',
            height: '100%',
            backgroundColor: 'var(--accent-primary)',
            borderRadius: '7px',
            transition: 'width 0.5s ease'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <span>1.450 de 2.000 formulários em papel processados</span>
          <Link to="/digitization/rapid" style={{ color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Ir para Digitação Rápida <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* Bar Chart */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-4) 0', fontSize: 'var(--text-lg)' }}>
            Ranking Intenção de Voto — Deputado Estadual (RO)
          </h3>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={candidateData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <XAxis type="number" unit="%" />
                <YAxis dataKey="name" type="category" width={140} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <Tooltip formatter={(value: any) => [`${value}%`, 'Percentual']} />
                <Bar dataKey="percentage" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-old-style)', margin: '0 0 var(--space-4) 0', fontSize: 'var(--text-lg)' }}>
            Distribuição de Votos
          </h3>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={candidateData} dataKey="votes" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {candidateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;