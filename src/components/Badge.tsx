import type { DifficultyLevel } from '@/types';
import { capitalize } from '@/utils/string';
import React from 'react';

const DIFFICULTY_LEVEL_MAP = {
  beginner: 'bg-green-200/50 text-green-500',
  intermediate: 'bg-orange-200/50 text-orange-500',
  advanced: 'bg-red-200/50 text-red-500',
} as const;

const Badge: React.FC<{ difficulty_level: DifficultyLevel }> = ({
  difficulty_level,
}) => {
  return (
    <span
      className={`font-mono text-xs rounded-md bg-gray-200 py-0.5 px-2 ${DIFFICULTY_LEVEL_MAP[difficulty_level]}`}
    >
      {capitalize(difficulty_level)}
    </span>
  );
};

export default Badge;
