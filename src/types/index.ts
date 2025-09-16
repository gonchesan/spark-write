export interface SuggestionProps {
  prompt_title: string;
  description: string;
  difficulty_level: string; // Beginner | Beginner/Intermediate | Intermediate | Advanced |
  text_type: string;
  id?: string;
}

export interface SuggestionCardProps {
  data: SuggestionProps;
  onChangeSuggestion: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface WritingPrompts {
  writing_prompts: SuggestionProps[];
}
export interface RevisionResponse {
  overall_summary: string;
  detailed_corrections: DetailedCorrection[];
  style_and_fluency_suggestions: string;
  additional_analysis: AdditionalAnalysis;
  overall_score: number;
}

export interface DetailedCorrection {
  error_type: string;
  original_text: string;
  suggested_text: string;
  explanation: string;
  impact_level: string;
}

export interface AdditionalAnalysis {
  most_common_mistakes: string;
  suggested_advanced_vocabulary: string[];
  overall_punctuation: number;
}
