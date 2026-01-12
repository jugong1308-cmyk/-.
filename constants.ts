
import { Question, DiagnosisResult } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "당신의 아이(현재 있거나 없거나)는 행복하다고 생각합니까?",
    options: [
      { id: 'A', text: "꽤 행복하다", score: 3 },
      { id: 'B', text: "그럭저럭 행복하다", score: 2 },
      { id: 'C', text: "어느 쪽인가 하면 행복하지 않다", score: 1 },
      { id: 'D', text: "불행하다", score: 0 }
    ]
  },
  {
    id: 2,
    text: "불로소득으로 일하지 않고 부자인 사람을 보면 어떻게 생각하십니까?",
    options: [
      { id: 'A', text: "특별히 아무것도 생각하지 않는다", score: 3 },
      { id: 'B', text: "훌륭하다고 생각한다", score: 2 },
      { id: 'C', text: "좀 미묘하다", score: 1 },
      { id: 'D', text: "매우 불쾌하다", score: 0 }
    ]
  },
  {
    id: 3,
    text: "당신은 지금 미워하는 사람이 있습니까?",
    options: [
      { id: 'A', text: "별로 생각해 본 적이 없다", score: 3 },
      { id: 'B', text: "과거에는 있었지만 지금은 없다", score: 2 },
      { id: 'C', text: "절대로 없다", score: 1 },
      { id: 'D', text: "항상 미워하는 사람이 있다", score: 0 }
    ]
  },
  {
    id: 4,
    text: "당신은 부모님을 떠올렸을 때 어떤 느낌이 드십니까?",
    options: [
      { id: 'A', text: "특별히 아무것도 느끼지 않다", score: 3 },
      { id: 'B', text: "매우 마음이 편안해진다", score: 2 },
      { id: 'C', text: "좀 짜증이 난다", score: 1 },
      { id: 'D', text: "떠올리고 싶지도 않다", score: 0 }
    ]
  },
  {
    id: 5,
    text: "유명인의 부도덕(불륜, 위법행위, 실언 등)을 알았을 때 어떻게 느끼십니까?",
    options: [
      { id: 'A', text: "아무것도 느끼지 않는다", score: 3 },
      { id: 'B', text: "흥미가 없지는 않다", score: 2 },
      { id: 'C', text: "신경 쓰며 지켜본다", score: 1 },
      { id: 'D', text: "인터넷, SNS 등에서 비판한다", score: 0 }
    ]
  },
  {
    id: 6,
    text: "당신은 연봉을 어느 정도로 늘릴 수 있다고 생각합니까?",
    options: [
      { id: 'A', text: "연수입 5억원 이상으로는 늘릴 수 있다고 생각한다", score: 3 },
      { id: 'B', text: "연수입 1억원 이상으로는 늘릴 수 있다고 생각한다", score: 2 },
      { id: 'C', text: "생활에 어려움이 없을 정도로 늘릴 수 있다고 생각한다", score: 1 },
      { id: 'D', text: "앞으로는 줄어들거나 좋으면 현상유지라고 생각한다", score: 0 }
    ]
  },
  {
    id: 7,
    text: "앞선 질문(연봉)에서 왜 그렇게 생각하시나요?",
    options: [
      { id: 'A', text: "현재 실제로 그렇거나 거기에 가깝기 때문에", score: 3 },
      { id: 'B', text: "지금은 그렇지 않지만 그럴 능력이 있으니까", score: 2 },
      { id: 'C', text: "이유는 없지만 믿고 있으니까", score: 1 },
      { id: 'D', text: "나는 특별하니까", score: 0 }
    ]
  },
  {
    id: 8,
    text: "가장 친한 친구가 무대 위에서 칭찬받고 있는 것을 보면 어떤 기분이 드나요?",
    options: [
      { id: 'A', text: "자기 일처럼 기쁘다", score: 3 },
      { id: 'B', text: "특별히 아무렇지도 않게 생각한다", score: 2 },
      { id: 'C', text: "조금 복잡한 기분이 든다", score: 1 },
      { id: 'D', text: "인정할 수 없다. 공격하고 싶어진다", score: 0 }
    ]
  },
  {
    id: 9,
    text: "가까운 지인이 '자신이 하고 싶다고 생각하는 것'을 실제 하고 있는 것을 보면 어떤 느낌이 드나요?",
    options: [
      { id: 'A', text: "아무것도 느끼지 않는다", score: 3 },
      { id: 'B', text: "나도 계속 하고 싶다고 생각한다", score: 2 },
      { id: 'C', text: "조금 초조해진다", score: 1 },
      { id: 'D', text: "방해하고 싶어진다", score: 0 }
    ]
  },
  {
    id: 10,
    text: "과거의 일을 떠올려 패닉이 되는 경우가 있습니까?",
    options: [
      { id: 'A', text: "거의 없다", score: 3 },
      { id: 'B', text: "전혀 없다고는 할 수 없다", score: 2 },
      { id: 'C', text: "가끔 있다", score: 1 },
      { id: 'D', text: "거의 매일, 항상 그렇다", score: 0 }
    ]
  }
];

export const RESULTS: DiagnosisResult[] = [
  {
    grade: 'A',
    title: 'A등급: 최상의 자존감',
    scoreRange: '26~30점',
    interpretation: '매우 높은 자존감을 가지고 있으며, 인생에서 생각한 것들이 대부분 실현되고 있는 수준입니다. 말로 표현하거나 글로 적은 것들이 어느새 현실이 되어 있는 경우가 많습니다.',
    color: 'bg-indigo-600'
  },
  {
    grade: 'B',
    title: 'B등급: 건강한 자존감',
    scoreRange: '16~25점',
    interpretation: '전반적으로 높은 자존감을 지니고 있으며, 생각한 것의 절반 이상이 실현되고 있습니다. 의식적으로 자존감을 더욱 높이면 소망이 더 많이 실현될 것입니다.',
    color: 'bg-emerald-600'
  },
  {
    grade: 'C',
    title: 'C등급: 주의 필요한 자존감',
    scoreRange: '6~15점',
    interpretation: '전반적으로 자존감이 낮고 소망의 실현이 잘 이루어지지 않고 있습니다. 하지만 지금이 시작입니다. 훈련을 실천하면서 우선 생각한 것의 절반까지는 실현할 수 있는 수준으로 높여봅시다.',
    color: 'bg-orange-600'
  },
  {
    grade: 'D',
    title: 'D등급: 낮은 자존감 상태',
    scoreRange: '0~5점',
    interpretation: '현재는 생각한 것을 실현하기 어려운 단계에 있습니다. 하지만 지금부터가 시작입니다. 작은 성공과 기쁨부터 하나씩 쌓아가 보세요.',
    color: 'bg-rose-600'
  }
];
