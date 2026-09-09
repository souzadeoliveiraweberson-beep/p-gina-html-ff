import React from 'react';
import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div style={{ padding: 'var(--space-4)', maxWidth: '800px', margin: '0 auto' }}>
      <Outlet />
      <div className="disclaimer">
        Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.
      </div>
    </div>
  );
};\n