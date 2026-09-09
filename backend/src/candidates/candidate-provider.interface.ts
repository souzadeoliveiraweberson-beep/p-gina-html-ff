export interface CandidateData {
  name: string;
  ballotName: string;
  number: string;
  party: string;
  position: string;
  state: string;
  municipality?: string;
  status: string;
  electionYear: number;
  source: 'TSE' | 'FILE' | 'MANUAL';
  sourceUrl?: string;
  sourceVersion?: string;
}

export interface CandidateSyncResult {
  newCount: number;
  updatedCount: number;
  removedCount: number;
  unchangedCount: number;
  candidates: CandidateData[];
  version: string;
}

export interface CandidateProvider {
  getCandidates(state: string, electionYear: number, position?: string): Promise<CandidateData[]>;
  getCandidate(id: string): Promise<CandidateData | null>;
  searchCandidates(query: string, state: string): Promise<CandidateData[]>;
  syncCandidates(state: string, electionYear: number, position: string): Promise<CandidateSyncResult>;
  validateCandidate(candidate: CandidateData): boolean;
}
