import { Injectable } from '@nestjs/common';

export interface AIInterpretationResult {
  title: string;
  electionYear: number;
  state: string;
  municipality?: string;
  positions: string[];
  surveyType: string;
  answerType: string;
  collectionMode: 'PRINTED' | 'DIGITAL' | 'HYBRID';
  generateQrCode: boolean;
  automaticCounting: boolean;
  questions: Array<{
    text: string;
    type: string;
    position: string;
    options: Array<{ text: string; candidateNumber?: string; party?: string }>;
  }>;
  methodology: {
    targetAudience: string;
    geographicScope: string;
    disclaimer: string;
  };
}

export interface AIProvider {
  interpretCommand(command: string): Promise<AIInterpretationResult>;
}

@Injectable()
export class LocalAIProvider implements AIProvider {
  async interpretCommand(command: string): Promise<AIInterpretationResult> {
    const text = command.toLowerCase();

    // 1. Extract Election Year
    const yearMatch = text.match(/20\d\d/);
    const electionYear = yearMatch ? parseInt(yearMatch[0], 10) : 2026;

    // 2. Extract State (UF)
    let state = 'RO';
    if (text.includes('rondonia') || text.includes('rondônia') || text.includes(' ro')) state = 'RO';
    if (text.includes('sao paulo') || text.includes('são paulo') || text.includes(' sp')) state = 'SP';

    // 3. Extract Positions
    const positions: string[] = [];
    if (text.includes('estadual') || text.includes('deputado estadual') || text.includes('deputados estaduais')) {
      positions.push('Deputado Estadual');
    }
    if (text.includes('federal') || text.includes('deputado federal') || text.includes('deputados federais')) {
      positions.push('Deputado Federal');
    }
    if (text.includes('governador')) positions.push('Governador');
    if (text.includes('senador')) positions.push('Senador');
    if (positions.length === 0) {
      positions.push('Deputado Estadual', 'Deputado Federal');
    }

    // 4. Extract Collection Mode
    let collectionMode: 'PRINTED' | 'DIGITAL' | 'HYBRID' = 'PRINTED';
    if (text.includes('impresso') || text.includes('impressa') || text.includes('papel') || text.includes('checklist')) {
      collectionMode = 'PRINTED';
    } else if (text.includes('online') || text.includes('web') || text.includes('digital')) {
      collectionMode = 'DIGITAL';
    } else if (text.includes('hibrid') || text.includes('híbrid')) {
      collectionMode = 'HYBRID';
    }

    // 5. Generate Preview Questions & Checklist Options
    const questions = positions.map(pos => ({
      text: `Se as eleições fossem hoje, em qual destes candidatos a ${pos} você votaria?`,
      type: 'single_choice',
      position: pos,
      options: [
        { text: 'Candidato A (DEMO)', candidateNumber: pos.includes('Estadual') ? '10123' : '15123', party: pos.includes('Estadual') ? 'REP' : 'MDB' },
        { text: 'Candidato B (DEMO)', candidateNumber: pos.includes('Estadual') ? '10456' : '15456', party: pos.includes('Estadual') ? 'REP' : 'MDB' },
        { text: 'Candidato C (DEMO)', candidateNumber: pos.includes('Estadual') ? '22123' : '22456', party: 'PL' },
        { text: 'Candidato D (DEMO)', candidateNumber: pos.includes('Estadual') ? '13123' : '13456', party: 'PT' },
        { text: 'Ainda não decidiu', candidateNumber: 'ND' },
        { text: 'Nenhum / Branco / Nulo', candidateNumber: 'NN' },
        { text: 'Prefiro não responder', candidateNumber: 'NR' },
      ]
    }));

    return {
      title: `Pesquisa Eleitoral ${state} ${electionYear} — ${positions.join(' e ')}`,
      electionYear,
      state,
      positions,
      surveyType: 'intencao_de_voto',
      answerType: 'single_choice',
      collectionMode,
      generateQrCode: true,
      automaticCounting: true,
      questions,
      methodology: {
        targetAudience: `Eleitores residentes e domiciliados no estado de ${state}`,
        geographicScope: `${state} — Abrangência Estadual`,
        disclaimer: 'Esta plataforma é uma ferramenta de pesquisa/opinião eleitoral privada e NÃO é um sistema oficial de votação da Justiça Eleitoral.'
      }
    };
  }
}

@Injectable()
export class AIService {
  constructor(private localAIProvider: LocalAIProvider) {}

  async interpret(prompt: string) {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('O comando em linguagem natural não pode estar vazio.');
    }
    return this.localAIProvider.interpretCommand(prompt);
  }
}
