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
