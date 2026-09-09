import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-base)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: 'var(--space-6)', flex: 1, overflowY: 'auto' }}>
          <Outlet />
          <div className="disclaimer">
            Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.
          </div>
        </main>
      </div>
    </div>
  );
};\n