import { Character, BattleResult } from '../types';

const roleAbilities = {
  Writer: [
    'Clear Communication',
    'Documentation Mastery',
    'User-Focused Writing',
    'Style Guide Expertise'
  ],
  Editor: [
    'Quality Assurance',
    'Consistency Checker',
    'Grammar Guardian',
    'Structure Optimizer'
  ],
  Developer: [
    'Technical Implementation',
    'Code Documentation',
    'API Reference Expert',
    'Debugging Guide'
  ],
  Architect: [
    'System Design',
    'Architecture Patterns',
    'Scalability Planning',
    'Technical Strategy'
  ]
};

const roleStats = {
  Writer: { knowledge: 8, clarity: 10, technicalDepth: 6, speed: 7 },
  Editor: { knowledge: 7, clarity: 9, technicalDepth: 7, speed: 8 },
  Developer: { knowledge: 9, clarity: 6, technicalDepth: 10, speed: 8 },
  Architect: { knowledge: 10, clarity: 8, technicalDepth: 9, speed: 6 }
};

export function generateCharacter(name: string, role: Character['role']): Character {
  const baseStats = roleStats[role];
  const abilities = roleAbilities[role];
  
  // Add some randomization to stats
  const randomizedStats = {
    knowledge: Math.max(1, Math.min(10, baseStats.knowledge + Math.floor(Math.random() * 3) - 1)),
    clarity: Math.max(1, Math.min(10, baseStats.clarity + Math.floor(Math.random() * 3) - 1)),
    technicalDepth: Math.max(1, Math.min(10, baseStats.technicalDepth + Math.floor(Math.random() * 3) - 1)),
    speed: Math.max(1, Math.min(10, baseStats.speed + Math.floor(Math.random() * 3) - 1))
  };

  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    role,
    stats: randomizedStats,
    abilities: abilities.slice(0, 3), // Take first 3 abilities
    level: 1,
    experience: 0,
    wins: 0,
    losses: 0
  };
}

export function simulateBattle(char1: Character, char2: Character): BattleResult {
  // Calculate battle score based on stats
  const score1 = char1.stats.knowledge * 0.3 + 
                 char1.stats.clarity * 0.25 + 
                 char1.stats.technicalDepth * 0.3 + 
                 char1.stats.speed * 0.15;
  
  const score2 = char2.stats.knowledge * 0.3 + 
                 char2.stats.clarity * 0.25 + 
                 char2.stats.technicalDepth * 0.3 + 
                 char2.stats.speed * 0.15;

  // Add some randomness
  const randomFactor1 = (Math.random() - 0.5) * 2;
  const randomFactor2 = (Math.random() - 0.5) * 2;
  
  const finalScore1 = score1 + randomFactor1;
  const finalScore2 = score2 + randomFactor2;

  const winner = finalScore1 > finalScore2 ? char1 : char2;
  const loser = finalScore1 > finalScore2 ? char2 : char1;

  // Generate battle report
  const report = generateBattleReport(char1, char2, winner, loser);

  return {
    winner,
    loser,
    report,
    experienceGained: Math.floor(Math.random() * 10) + 5
  };
}

function generateBattleReport(char1: Character, char2: Character, winner: Character, loser: Character): string {
  const scenarios = [
    `${winner.name} the ${winner.role} demonstrated superior ${winner.abilities[0]} against ${loser.name}'s ${loser.role} approach. The battle of documentation styles was fierce, but ${winner.name}'s expertise prevailed.`,
    `In an epic clash of documentation philosophies, ${winner.name} utilized their ${winner.abilities[1]} to overcome ${loser.name}'s ${loser.abilities[0]}. The technical depth was unmatched!`,
    `${winner.name} proved that ${winner.abilities[2]} is the key to documentation mastery, leaving ${loser.name} to reconsider their ${loser.role} strategy.`,
    `The battle raged on as ${winner.name} applied their ${winner.abilities[0]} while ${loser.name} countered with ${loser.abilities[1]}. In the end, ${winner.name}'s superior knowledge won the day.`
  ];

  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

export function calculateLevel(experience: number): number {
  return Math.floor(experience / 100) + 1;
} 