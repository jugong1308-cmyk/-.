
import { GoogleGenAI } from "@google/genai";
import { UserAnswer, Question } from "../types";

export const getAIAnalysis = async (score: number, answers: UserAnswer[], questions: Question[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const answerDetails = answers.map(ans => {
    const q = questions.find(q => q.id === ans.questionId);
    const opt = q?.options.find(o => o.id === ans.optionId);
    return `질문: ${q?.text} -> 선택: ${opt?.text} (점수: ${ans.score})`;
  }).join('\n');

  const prompt = `
    당신은 전문 심리 상담가입니다. 
    사용자가 '자존감 진단 체크리스트'를 완료했습니다. 
    총점은 30점 만점에 ${score}점입니다.
    
    사용자의 구체적인 답변 내역:
    ${answerDetails}
    
    이 데이터를 바탕으로 다음 내용을 포함하여 따뜻하고 전문적인 분석 리포트를 작성해주세요:
    1. 사용자의 현재 심리적 상태 요약
    2. 답변 패턴에서 보이는 강점과 보완점
    3. 자존감을 높이기 위한 구체적인 맞춤형 행동 지침 3가지
    
    말투는 친절하고 격려하는 어조여야 합니다. 
    결과는 마크다운 형식을 사용해 가독성 있게 작성해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "AI 분석을 불러오는 중에 오류가 발생했습니다. 나중에 다시 시도해주세요.";
  }
};
