import { useState } from 'react';
// import './App.css';
import { getReviewedCodePrompt } from './utils/prompts';
import Suggestion from './components/Suggestions';
import gemini from './gemini';
import { extractJsonFromString } from './utils/json';
import type { RevisionResponse, SuggestionProps } from './types';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [userText, setUserText] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null,
  );
  const [suggestions] = useLocalStorage<SuggestionProps[]>('suggestions', []);

  async function requestWritingReview(event: any) {
    event.preventDefault();
    if (!userText) return;
    const suggestionDescriptionSelected =
      suggestions.find((suggestion) => suggestion.id === selectedSuggestion)
        ?.description || '';
    console.log(
      '🚀 ~ requestWritingReview ~ suggestionDescriptionSelected:',
      suggestionDescriptionSelected,
    );

    const GET_REVIEW_PROMPT = getReviewedCodePrompt(
      userText,
      suggestionDescriptionSelected,
    );
    const result = await gemini.generateContent(GET_REVIEW_PROMPT);
    const response = await result.response;
    const text = response.text();

    const data = extractJsonFromString<RevisionResponse>(text);
    console.log('🚀 ~ requestWritingReview ~ data:', data);
  }

  return (
    <section className='bg-gray-100 text-gray-900 h-screen  flex flex-col'>
      <h2 className='text-3xl font-semibold mt-10 text-center'>
        Welcome to SparkWrite
      </h2>
      <p className='text-lg text-gray-600 text-center'>
        Start writing whatever you want or choose one of these topics as a
        reference.
      </p>

      <Suggestion
        onChangeSuggestion={setSelectedSuggestion}
        selectedSuggestion={selectedSuggestion}
      />
      <form className='flex items-center justify-center gap-2 my-10'>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          cols={50}
          rows={4}
          className='border-[1px] boder-slate-200 rounded-md bg-gray-100/80 outline-none p-2 focus:border-slate-500 focus:ring-2 focus:ring-indigo-500/50 transition duration-100'
        />
        <button
          onClick={requestWritingReview}
          type='submit'
          className='py-2 px-3 bg-slate-800 text-white rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={Boolean(!userText)}
        >
          Ask for revision
        </button>
      </form>
    </section>
  );
}

export default App;
