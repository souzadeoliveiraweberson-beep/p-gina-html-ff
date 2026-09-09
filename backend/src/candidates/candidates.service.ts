import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CandidateData, CandidateProvider, CandidateSyncResult } from './candidate-provider.interface';

@Injectable()
export class TSECandidateProvider implements CandidateProvider {
  async getCandidates(state: string, electionYear: number, position?: string): Promise<CandidateData[]> {
    // Adapter mock for TSE Official API
    return [
      { name: 'Carlos Eduardo Silva', ballotName: 'CARLOS SILVA', number: '10123', party: 'REP', position: position || 'Deputado Estadual', state, status: 'DEFERIDO', electionYear, source: 'TSE', sourceUrl: 'https://divulgacandcontas.tse.jus.br' },
      { name: 'Maria das Graças Oliveira', ballotName: 'MARIA DA SAÚDE', number: '10456', party: 'REP', position: position || 'Deputado Estadual', state, status: 'DEFERIDO', electionYear, source: 'TSE', sourceUrl: 'https://divulgacandcontas.tse.jus.br' },
      { name: 'João Roberto Santos', ballotName: 'JOÃO SANTOS', number: '15123', party: 'MDB', position: position || 'Deputado Federal', state, status: 'DEFERIDO', electionYear, source: 'TSE', sourceUrl: 'https://divulgacandcontas.tse.jus.br' },
      { name: 'Ana Paula Rocha', ballotName: 'ANA ROCHA', number: '15456', party: 'MDB', position: position || 'Deputado Federal', state, status: 'DEFERIDO', electionYear, source: 'TSE', sourceUrl: 'https://divulgacandcontas.tse.jus.br' }
    ];
  }

  async getCandidate(id: string): Promise<CandidateData | null> {
    const list = await this.getCandidates('RO', 2026);
    return list[0] || null;
  }

  async searchCandidates(query: string, state: string): Promise<CandidateData[]> {
    const list = await this.getCandidates(state, 2026);
    return list.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.number.includes(query));
  }

  async syncCandidates(state: string, electionYear: number, position: string): Promise<CandidateSyncResult> {
    const candidates = await this.getCandidates(state, electionYear, position);
    return {
      newCount: candidates.length,
      updatedCount: 0,
      removedCount: 0,
      unchangedCount: 0,
      candidates,
      version: `${electionYear}-${state}-${Date.now()}`
    };
  }

  validateCandidate(candidate: CandidateData): boolean {
    return !!(candidate.name && candidate.number && candidate.party && candidate.position && candidate.state);
  }
}

@Injectable()
export class CandidatesService {
  constructor(
    private prisma: PrismaService,
    private tseProvider: TSECandidateProvider
  ) {}

  async findAll(state?: string, position?: string) {
    return this.prisma.candidate.findMany({
      where: {
        ...(state && { state }),
        ...(position && { position })
      },
      include: {
        sources: true
      },
      orderBy: { number: 'asc' }
    });
  }

  async findOne(id: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: { sources: true }
    });
    if (!candidate) throw new NotFoundException('Candidato não encontrado');
    return candidate;
  }

  async syncFromProvider(state: string, electionYear: number, position: string) {
    const result = await this.tseProvider.syncCandidates(state, electionYear, position);
    
    for (const c of result.candidates) {
      await this.prisma.candidate.upsert({
        where: { id: `cand-${c.state}-${c.number}` },
        update: {
          ballotName: c.ballotName,
          party: c.party,
          status: c.status,
          updatedAt: new Date()
        },
        create: {
          id: `cand-${c.state}-${c.number}`,
          name: c.name,
          ballotName: c.ballotName,
          number: c.number,
          party: c.party,
          position: c.position,
          state: c.state,
          status: c.status,
          source: c.source,
          sourceVersion: result.version
        }
      });
    }

    return {
      success: true,
      message: `Sincronização concluída para ${position} - ${state}`,
      result
    };
  }

  async importFromXLSX(data: any[]) {
    // Process imported records
    let valid = 0;
    let errors = 0;
    const records = [];

    for (const row of data) {
      if (row.nome && row.numero && row.partido && row.cargo) {
        valid++;
        records.push({
          id: `imp-${Date.now()}-${valid}`,
          name: row.nome,
          ballotName: row.nomeUrna || row.nome,
          number: String(row.numero),
          party: row.partido,
          position: row.cargo,
          state: row.uf || 'RO',
          status: 'DEFERIDO',
          source: 'FILE',
          sourceVersion: `IMPORT-${new Date().toISOString().split('T')[0]}`
        });
      } else {
        errors++;
      }
    }

    return {
      totalFound: data.length,
      validRecords: valid,
      errorRecords: errors,
      imported: records
    };
  }
}
