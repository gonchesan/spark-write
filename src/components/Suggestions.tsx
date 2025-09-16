import React, { useEffect } from 'react';
//SuggestionList
//SuggestionCard selectable
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { getListTopicsPrompt } from '@/utils/prompts';
import type {
  SuggestionCardProps,
  SuggestionProps,
  WritingPrompts,
} from '@/types';
import gemini from '@/gemini';
import { generateGuid } from '@/utils/guuid';
import { extractJsonFromString } from '@/utils/json';

const SuggestionList: React.FC<{
  onChangeSuggestion: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ onChangeSuggestion, selectedSuggestion }) => {
  const [suggestions, setSuggestions] = useLocalStorage<SuggestionProps[]>(
    'suggestions',
    [],
  );

  async function generateContent(prompt: string) {
    const result = await gemini.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const data = extractJsonFromString<WritingPrompts>(text);
    let suggestionFormatted = [];
    if (data?.writing_prompts && data.writing_prompts.length > 0) {
      suggestionFormatted = data?.writing_prompts.map(
        (suggestion: SuggestionProps) => ({
          ...suggestion,
          id: generateGuid(),
        }),
      );
      setSuggestions(suggestionFormatted);
    }
    return text;
  }

  useEffect(() => {
    const INITIAL_PROMPT = getListTopicsPrompt('English'); //TODO Change quantity of suggestion in the prompt

    if (!suggestions.length) generateContent(INITIAL_PROMPT);
  }, []);

  return (
    <section style={{ display: 'flex', gap: 8 }}>
      {suggestions.length
        ? suggestions.map((element, index) => (
            <SuggestionCard
              onChangeSuggestion={onChangeSuggestion}
              selectedSuggestion={selectedSuggestion}
              data={element}
              key={index}
            />
          ))
        : null}
    </section>
  );
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  data,
  selectedSuggestion,
  onChangeSuggestion,
}) => {
  const { prompt_title, description, difficulty_level, text_type, id } = data;
  return (
    <div
      id={id}
      style={{
        border: `1px solid ${
          selectedSuggestion === id ? '#7d45b4ff' : '#e8e8e8'
        }`,
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        padding: '16px',
        gap: '6 px',
      }}
      onClick={() => onChangeSuggestion(id)}
    >
      <span
        style={{
          fontSize: '0.8rem',
          backgroundColor: '#c9c9c9',
          borderRadius: '16px',
          padding: '2px 8px',
          color: '#1b1b1b',
          fontFamily: 'monospace',
        }}
      >
        {text_type}
      </span>
      <h3>{prompt_title}</h3>
      <span style={{ fontFamily: 'monospace' }}>{difficulty_level}</span>
      <p style={{ maxWidth: '65ch', textAlign: 'left' }}>{description}</p>
    </div>
  );
};

const Suggestion: React.FC<{
  onChangeSuggestion: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ onChangeSuggestion, selectedSuggestion }) => {
  return (
    <SuggestionList
      onChangeSuggestion={onChangeSuggestion}
      selectedSuggestion={selectedSuggestion}
    />
  );
};

export default Suggestion;
