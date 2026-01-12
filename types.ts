
export interface Option {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface DiagnosisResult {
  grade: 'A' | 'B' | 'C' | 'D';
  title: string;
  scoreRange: string;
  interpretation: string;
  color: string;
}

export interface UserAnswer {
  questionId: number;
  optionId: 'A' | 'B' | 'C' | 'D';
  score: number;
}
