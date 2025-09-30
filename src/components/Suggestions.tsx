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
import Badge from './Badge';

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
    <section className='max-w-[75ch] grid grid-cols-3 grid-flow-row gap-2 mx-auto mt-8'>
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
  const handleClickSuggestion = (id: string) =>
    selectedSuggestion !== id
      ? onChangeSuggestion(id)
      : onChangeSuggestion(null);

  return (
    <div
      id={id}
      className={`flex flex-col cursor-pointer rounded-md border p-3 gap-1.5 items-baseline transition duration-300 ${
        selectedSuggestion === id
          ? 'border-indigo-500 bg-white shadow-lg shadow-indigo-500/50'
          : 'border-[#e8e8e8] bg-gray-50'
      }`}
      onClick={() => handleClickSuggestion(id)}
    >
      <Badge difficulty_level={difficulty_level} />
      {/* <span className='font-mono text-xs rounded-md bg-gray-200 py-0.5 px-2'>
        {difficulty_level}
      </span> */}
      <h3 className='text-sm font-semibold'>{prompt_title}</h3>
      <p className='max-w-[65ch] text-sm line-clamp-3' title={description}>
        {description}
      </p>
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
