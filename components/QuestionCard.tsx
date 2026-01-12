
import React from 'react';
import { Question, Option } from '../types';

interface QuestionCardProps {
  question: Question;
  onSelect: (option: Option) => void;
  selectedOptionId?: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSelect, selectedOptionId }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-tight">
        {question.id}. {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center group
              ${selectedOptionId === option.id 
                ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' 
                : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
          >
            <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 text-sm font-bold transition-colors
              ${selectedOptionId === option.id 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
              {option.id}
            </span>
            <span className={`flex-1 ${selectedOptionId === option.id ? 'text-indigo-900 font-medium' : 'text-gray-700'}`}>
              {option.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
