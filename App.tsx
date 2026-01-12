
import React, { useState, useEffect, useCallback } from 'react';
import { QUESTIONS, RESULTS } from './constants';
import { UserAnswer, Option, DiagnosisResult } from './types';
import { ProgressBar } from './components/ProgressBar';
import { QuestionCard } from './components/QuestionCard';
import { getAIAnalysis } from './services/geminiService';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const handleStart = () => {
    setStep('quiz');
    setCurrentIndex(0);
    setAnswers([]);
    setAiAnalysis('');
  };

  const handleSelectOption = (option: Option) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = {
      questionId: QUESTIONS[currentIndex].id,
      optionId: option.id,
      score: option.score
    };
    setAnswers(newAnswers);

    // Auto-advance with small delay for visual feedback
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setStep('result');
      }
    }, 300);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr.score, 0);

  const getGrade = (score: number): DiagnosisResult => {
    if (score >= 26) return RESULTS[0];
    if (score >= 16) return RESULTS[1];
    if (score >= 6) return RESULTS[2];
    return RESULTS[3];
  };

  const result = getGrade(totalScore);

  useEffect(() => {
    if (step === 'result' && !aiAnalysis && !loadingAnalysis) {
      const fetchAnalysis = async () => {
        setLoadingAnalysis(true);
        const analysis = await getAIAnalysis(totalScore, answers, QUESTIONS);
        setAiAnalysis(analysis || "분석 결과를 가져오지 못했습니다.");
        setLoadingAnalysis(false);
      };
      fetchAnalysis();
    }
  }, [step, totalScore, answers, aiAnalysis, loadingAnalysis]);

  const chartData = [
    { name: '얻은 점수', value: totalScore },
    { name: '남은 점수', value: 30 - totalScore }
  ];

  const COLORS = [result.color.replace('bg-', 'rgb(').replace('-600', ')'), '#e5e7eb'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {step === 'intro' && (
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100 animate-fadeIn">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">자존감 진단 체크리스트</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              본인의 현재 마음 상태와 자존감을 확인해보세요.<br/>
              총 10개의 질문을 통해 당신의 내면을 들여다봅니다.
            </p>
            <button
              onClick={handleStart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-indigo-200 active:scale-95"
            >
              진단 시작하기
            </button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="animate-slideIn">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-indigo-600">질문 {currentIndex + 1} / {QUESTIONS.length}</span>
              <span className="text-xs text-gray-400">자동으로 다음 질문으로 넘어갑니다</span>
            </div>
            <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
            <QuestionCard 
              question={QUESTIONS[currentIndex]} 
              onSelect={handleSelectOption}
              selectedOptionId={answers[currentIndex]?.optionId}
            />
            <div className="mt-8 flex justify-between">
              <button 
                onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
                className="text-gray-400 hover:text-gray-600 font-medium disabled:opacity-30 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                이전
              </button>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
              <h2 className="text-xl font-bold text-gray-500 mb-2">진단 결과</h2>
              <div className="flex justify-center mb-4">
                <div className={`px-4 py-1 rounded-full text-white text-sm font-bold ${result.color}`}>
                  {result.grade} 등급
                </div>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-6">{result.title}</h3>
              
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      <Cell fill={result.color.includes('indigo') ? '#4f46e5' : result.color.includes('emerald') ? '#059669' : result.color.includes('orange') ? '#ea580c' : '#e11d48'} />
                      <Cell fill="#f3f4f6" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-x-0 top-[15.5rem] flex flex-col items-center">
                   <span className="text-3xl font-bold text-gray-800">{totalScore}</span>
                   <span className="text-xs text-gray-400">/ 30점</span>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl text-left border border-gray-100">
                <p className="text-gray-700 leading-relaxed italic">
                  "{result.interpretation}"
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707m1.414 11.664l-.707.707M18.636 17.364l-.707.707M12 8v1m0 4v1m0 4v1m0-11a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
                AI 맞춤 심층 분석
              </h3>
              
              {loadingAnalysis ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                  <p className="text-gray-500 text-sm animate-pulse">Gemini가 답변을 기반으로 분석 중입니다...</p>
                </div>
              ) : (
                <div className="prose prose-indigo max-w-none text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {aiAnalysis || "분석 결과를 생성하고 있습니다."}
                </div>
              )}
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 font-bold py-4 rounded-2xl transition-all shadow-sm active:scale-95"
            >
              다시 진단하기
            </button>
          </div>
        )}
      </div>
      
      <footer className="mt-12 text-gray-400 text-xs text-center">
        © 2024 Self-Esteem Hub. Powered by Gemini AI.<br/>
        본 진단은 심리학적 지표를 바탕으로 한 자기 보고식 검사입니다.
      </footer>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
