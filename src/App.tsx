import { useState } from 'react';
import './App.css';
// import { GoogleGenerativeAI } from '@google/generative-ai';
import { getListTopicsPrompt, getReviewedCodePrompt } from './utils/prompts';
import Suggestion from './components/Suggestions';
import gemini from './gemini';

function App() {
  const [userText, setUserText] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(
    null,
  );
  // const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  // async function generateContent(prompt: string) {
  //   const result = await model.generateContent(prompt);
  //   const response = await result.response;
  //   const text = response.text();
  //   //AUX methods
  //   const jsonRegex = /```json\n([\s\S]*?)\n```/;
  //   const match = text.match(jsonRegex);

  //   if (match && match[1]) {
  //     // The first capture group (`match[1]`) contains the pure JSON string.
  //     const jsonString = match[1];

  //     try {
  //       // 4. Parse the JSON string into a JavaScript object.
  //       const data = JSON.parse(jsonString);

  //       // Now 'data' is a JavaScript object you can work with.
  //       console.log('Successfully parsed the JSON object:', data);

  //       // You can access its properties, for example:
  //       console.log('\nPrompts available:', data.length);
  //       console.log(
  //         'The first prompt title is:',
  //         data.prompts[0]['prompt_title'],
  //       );
  //     } catch (error) {
  //       console.error('Failed to parse the JSON string:', error);
  //     }
  //   } else {
  //     console.error('Could not find the JSON content in the string.');
  //   }
  //   return text;
  // }

  // useEffect(() => {
  //   const INITIAL_PROMPT = getListTopicsPrompt('English');
  //   generateContent(INITIAL_PROMPT);
  // }, []);

  async function requestWritingReview(event: any) {
    event.preventDefault();
    const PROMPT = getReviewedCodePrompt(userText);
    const result = await gemini.generateContent(PROMPT);
    const response = await result.response;
    const text = response.text();
    console.log('🚀 ~ requestWritingReview ~ text:', text);
    //   //?AUX methods
    //   const jsonRegex = /```json\n([\s\S]*?)\n```/;
    //   const match = text.match(jsonRegex);
    //   if (match && match[1]) {
    //     // The first capture group (`match[1]`) contains the pure JSON string.
    //     const jsonString = match[1];
    //     try {
    //       // 4. Parse the JSON string into a JavaScript object.
    //       const data = JSON.parse(jsonString);
    //       // Now 'data' is a JavaScript object you can work with.
    //       console.log('Successfully parsed the JSON object:', data);
    //       // You can access its properties, for example:
    //       console.log('\nPrompts available:', data.length);
    //       console.log(
    //         'The first prompt title is:',
    //         data.prompts[0]['prompt_title'],
    //       );
    //     } catch (error) {
    //       console.error('Failed to parse the JSON string:', error);
    //     }
    //   } else {
    //     console.error('Could not find the JSON content in the string.');
    //   }
    // return text;
  }

  return (
    <>
      <h2>Welcome to SparkWrite</h2>
      <p>
        Start writing whatever you want or choose one of these topics as a
        reference.
      </p>
      {/* <div
        style={{
          border: '1px solid #e8e8e8',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
          padding: '16px',
          gap: '6 px',
        }}
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
          Descriptive, Narrative
        </span>
        <h3>My Daily Rhythms</h3>
        <span style={{ fontFamily: 'monospace' }}>Beginer</span>
        <p style={{ maxWidth: '65ch', textAlign: 'left' }}>
          Describe a typical weekday in your life, from waking up to going to
          bed. Focus on simple actions, routines, and the order of events.
        </p>
      </div> */}
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
