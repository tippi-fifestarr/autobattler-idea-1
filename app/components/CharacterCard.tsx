'use client';

import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function CharacterCard({ character, onClick, isSelected }: CharacterCardProps) {
  const roleColors = {
    Writer: 'bg-blue-500',
    Editor: 'bg-green-500',
    Developer: 'bg-purple-500',
    Architect: 'bg-orange-500'
  };

  return (
    <div 
      className={`character-card bg-white rounded-lg p-6 shadow-md cursor-pointer ${
        isSelected ? 'ring-2 ring-dev-blue' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{character.name}</h3>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${roleColors[character.role]}`}>
          {character.role}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Level {character.level}</span>
          <span>XP: {character.experience}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Wins: {character.wins}</span>
          <span>Losses: {character.losses}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span>Knowledge:</span>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${character.stats.knowledge * 10}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Clarity:</span>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${character.stats.clarity * 10}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Technical:</span>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full" 
              style={{ width: `${character.stats.technicalDepth * 10}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Speed:</span>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full" 
              style={{ width: `${character.stats.speed * 10}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-gray-700">Abilities:</h4>
        {character.abilities.map((ability, index) => (
          <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {ability}
          </div>
        ))}
      </div>
    </div>
  );
} 