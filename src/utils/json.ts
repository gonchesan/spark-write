/**
 *  Extracts a JSON string from a markdown code block and parses it.
 *  This function specifically looks for content enclosed in ```json ... ```.
 *
 * @param {string} text
 * @returns {T | null} The parsed JSON object, or null if no valid JSON is found.
 */
export function extractJsonFromString<T>(text: string): T | null {
  // Regex to find content inside a ```json ... ``` block.
  const jsonRegex = /```json\n([\s\S]*?)\n```/;
  const match = text.match(jsonRegex);

  if (match && match[1]) {
    // The first capture group contains the pure JSON string.
    const jsonString = match[1];

    try {
      // Attempt to parse the extracted string.
      const parsed = JSON.parse(jsonString);
      return parsed as T;
    } catch (error) {
      // If parsing fails, the content was not valid JSON.
      console.error('Error parsing JSON from markdown:', error);
      return null;
    }
  }

  // No JSON block was found.
  return null;
}
