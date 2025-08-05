'use client';

import { useState, useEffect } from 'react';
import { Character, BattleResult } from './types';
import { generateCharacter, simulateBattle, calculateLevel } from './utils/gameLogic';
import CharacterCard from './components/CharacterCard';
import BattleReport from './components/BattleReport';

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showBattleReport, setShowBattleReport] = useState(false);
  const [currentBattleResult, setCurrentBattleResult] = useState<BattleResult | null>(null);
  const [isBattling, setIsBattling] = useState(false);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterRole, setNewCharacterRole] = useState<Character['role']>('Writer');

  // Load characters from localStorage on mount
  useEffect(() => {
    const savedCharacters = localStorage.getItem('autobattler-characters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
  }, []);

  // Save characters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('autobattler-characters', JSON.stringify(characters));
  }, [characters]);

  const createCharacter = () => {
    if (!newCharacterName.trim()) return;
    
    const newCharacter = generateCharacter(newCharacterName, newCharacterRole);
    setCharacters(prev => [...prev, newCharacter]);
    setNewCharacterName('');
    setNewCharacterRole('Writer');
  };

  const startBattle = async () => {
    if (!selectedCharacter || characters.length < 2) return;
    
    setIsBattling(true);
    
    // Find an opponent (different character)
    const opponents = characters.filter(char => char.id !== selectedCharacter.id);
    const opponent = opponents[Math.floor(Math.random() * opponents.length)];
    
    // Simulate battle
    const battleResult = simulateBattle(selectedCharacter, opponent);
    
    // Update character stats
    setCharacters(prev => prev.map(char => {
      if (char.id === battleResult.winner.id) {
        const newExperience = char.experience + battleResult.experienceGained;
        return {
          ...char,
          experience: newExperience,
          level: calculateLevel(newExperience),
          wins: char.wins + 1
        };
      } else if (char.id === battleResult.loser.id) {
        return {
          ...char,
          losses: char.losses + 1
        };
      }
      return char;
    }));

    // Show battle report after a short delay
    setTimeout(() => {
      setCurrentBattleResult(battleResult);
      setShowBattleReport(true);
      setIsBattling(false);
    }, 2000);
  };

  const deleteCharacter = (characterId: string) => {
    setCharacters(prev => prev.filter(char => char.id !== characterId));
    if (selectedCharacter?.id === characterId) {
      setSelectedCharacter(null);
    }
  };

  return (
    <div className="min-h-screen bg-dev-gray">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dev-dark mb-2">DevDocs Autobattler</h1>
          <p className="text-gray-600">Create documentation champions and watch them battle automatically!</p>
        </div>

        {/* Character Creation */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Champion</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={newCharacterName}
                onChange={(e) => setNewCharacterName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-dev-blue focus:border-transparent"
                placeholder="Enter character name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={newCharacterRole}
                onChange={(e) => setNewCharacterRole(e.target.value as Character['role'])}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-dev-blue focus:border-transparent"
              >
                <option value="Writer">Writer</option>
                <option value="Editor">Editor</option>
                <option value="Developer">Developer</option>
                <option value="Architect">Architect</option>
              </select>
            </div>
            <button
              onClick={createCharacter}
              disabled={!newCharacterName.trim()}
              className="bg-dev-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Create Champion
            </button>
          </div>
        </div>

        {/* Characters Grid */}
        {characters.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Champions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map(character => (
                <div key={character.id} className="relative">
                  <CharacterCard
                    character={character}
                    onClick={() => setSelectedCharacter(character)}
                    isSelected={selectedCharacter?.id === character.id}
                  />
                  <button
                    onClick={() => deleteCharacter(character.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Battle Controls */}
        {characters.length >= 2 && selectedCharacter && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Battle Arena</h2>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Selected: <span className="font-semibold">{selectedCharacter.name}</span> the {selectedCharacter.role}
              </p>
              <button
                onClick={startBattle}
                disabled={isBattling}
                className={`px-8 py-3 rounded-lg text-white font-semibold transition-all ${
                  isBattling 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 battle-animation'
                }`}
              >
                {isBattling ? 'Battling...' : 'Start Battle!'}
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {characters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Champions Yet</h3>
            <p className="text-gray-600">Create your first documentation champion to start battling!</p>
          </div>
        )}

        {/* Battle Report Modal */}
        {showBattleReport && currentBattleResult && (
          <BattleReport
            battleResult={currentBattleResult}
            onClose={() => setShowBattleReport(false)}
          />
        )}
      </div>
    </div>
  );
} 