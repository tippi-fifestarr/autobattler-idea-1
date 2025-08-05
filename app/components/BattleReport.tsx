'use client';

import { BattleResult } from '../types';

interface BattleReportProps {
  battleResult: BattleResult;
  onClose?: () => void;
}

export default function BattleReport({ battleResult, onClose }: BattleReportProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Battle Report</h2>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-8 mb-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">{battleResult.winner.name}</div>
              <div className="text-sm text-gray-600">{battleResult.winner.role}</div>
              <div className="text-2xl font-bold text-green-600 mt-2">WINNER</div>
            </div>
            <div className="text-4xl text-gray-400">VS</div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">{battleResult.loser.name}</div>
              <div className="text-sm text-gray-600">{battleResult.loser.role}</div>
              <div className="text-2xl font-bold text-red-600 mt-2">DEFEATED</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Battle Narrative</h3>
          <p className="text-gray-700 leading-relaxed">{battleResult.report}</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience Gained</h3>
          <p className="text-gray-700">
            {battleResult.winner.name} gained <span className="font-bold text-green-600">{battleResult.experienceGained}</span> experience points!
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            onClick={onClose}
            className="bg-dev-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
} 