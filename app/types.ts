export interface Character {
  id: string;
  name: string;
  role: 'Writer' | 'Editor' | 'Developer' | 'Architect';
  stats: {
    knowledge: number;
    clarity: number;
    technicalDepth: number;
    speed: number;
  };
  abilities: string[];
  level: number;
  experience: number;
  wins: number;
  losses: number;
}

export interface Battle {
  id: string;
  player1: Character;
  player2: Character;
  winner: Character | null;
  battleReport: string;
  timestamp: Date;
  status: 'pending' | 'completed';
}

export interface BattleResult {
  winner: Character;
  loser: Character;
  report: string;
  experienceGained: number;
} 