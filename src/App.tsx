import { useState } from 'react';
import './App.css';
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
  const [suggestions, _] = useLocalStorage<SuggestionProps[]>(
    'suggestions',
    [],
  );

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
    <>
      <h2>Welcome to SparkWrite</h2>
      <p>
        Start writing whatever you want or choose one of these topics as a
        reference.
      </p>

      <Suggestion
        onChangeSuggestion={setSelectedSuggestion}
        selectedSuggestion={selectedSuggestion}
      />
      <form>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          cols={50}
          rows={4}
        />
        <button onClick={requestWritingReview} type='submit'>
          Ask for revision
        </button>
      </form>
    </>
  );
}

export default App;
