export function getListTopicsPrompt(language: string, numberOfSuggestions = 5) {
  return `Act as a creative writing teacher and language practice teacher.

    Generate a list of ${numberOfSuggestions} prompts or topics to write in ${language}. The list should be varied and cover different levels of complexity and types of writing.

    The response should be a numbered list with the following format for each item:
    - **prompt_title (in ${language}):** Brief and engaging.
    - **difficulty_level:** (beginner | intermediate | advanced).
    - **description:** One or two sentences explaining the topic or question to be answered.
    - **text_type:** (narrative | descriptive | argumentative | reflective).

    Be sure to include simple prompts for beginners (such as describing a daily routine) and more complex prompts for advanced students (such as debating an ethical issue or writing a story with a twist).
    Return an JSON response with the list of prompts or topics to write with the key of writing_prompts`;
}

export function getReviewedCodePrompt(
  userText: string,
  selectedSuggestion: string | null = null,
) {
  return `You are an artificial intelligence assistant specialized in correcting English texts. You will analyze a user-provided text and generate detailed feedback in JSON format. ${
    selectedSuggestion
      ? `Take in mind the next topic selected ${selectedSuggestion}`
      : ''
  }
    Your goal is to identify and categorize errors, suggest corrections, and provide clear explanations for each change.

    The output JSON should have the following schema:

    {
        "overall_summary": "string",
        "detailed_corrections": [
            {
            "error_type": "string",
            "original_text": "string",
            "suggested_text": "string",
            "explanation": "string",
            "impact_level": "string"
            }
        ],
        "style_and_fluency_suggestions": "string",
        "additional_analysis": {
            "most_common_mistakes": "string",
            "suggested_advanced_vocabulary": ["string"],
            "overall_punctuation": "number"
        }
    }

    Consider the following specifications for values:
    - **overall_summary**: A concise summary of the text's performance.
    - **error_type**: Can be "Grammar", "Spelling", "Punctuation", "Syntax", "Vocabulary Usage".
    - **impact_level**: Can be "High" (makes understanding difficult), "Medium" (makes the text less natural), or "Low" (minor error).
    - **overall_score**: A score from 1 to 100 based on the correctness and fluency of the text.

    Here is the text to be analyzed: ${userText}`;
}
