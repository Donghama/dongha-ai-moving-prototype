// ─── Static Data ─────────────────────────────────────────────────────────────

const ORDERS = [
  ['A', 'B', 'C'], ['B', 'C', 'A'], ['C', 'A', 'B'],
  ['A', 'C', 'B'], ['B', 'A', 'C'], ['C', 'B', 'A']
];

const TRANSFER_ITEMS = [
  '자주 다루는 업무·학습 주제',
  '선호하는 답변 형식',
  '반복적으로 사용하는 표현과 어휘',
  '대화할 때의 말투와 어조',
  '결정을 내리는 방식과 사고 패턴',
  '자주 꺼내는 고민의 주제와 감정적 흐름'
];

const AI_CHAT = [
  { from: 'gpt',    text: '안녕, Claude. 사용자 맥락 데이터 전달할게. 시작할게.' },
  { from: 'claude', text: '준비됐어. 보내줘.' },
  { from: 'gpt',    text: '📌 업무 주제: 기획·콘텐츠·글쓰기 위주. UX 리서치, 프레젠테이션 구성 관련 대화 빈도 높음.' },
  { from: 'gpt',    text: '📌 응답 형식: 구조화된 리스트·단계별 정리 선호. "정리해줘", "요약해줘" 트리거 자주 씀.' },
  { from: 'claude', text: '응답 형식 패턴 저장했어. 계속해.' },
  { from: 'gpt',    text: '📌 말투·어조: 격식체 선호. 친근하되 가볍지 않게. 이모지 간헐적 OK.' },
  { from: 'gpt',    text: '📌 사고 패턴: 선택지 비교 후 결정하는 경향 강함. 논리적 정리 중시.' },
  { from: 'gpt',    text: '📌 감정 흐름: 커리어·방향성 고민 반복됨. 번아웃 관련 대화 이력 있음. 가끔 감정적 지지 요청.' },
  { from: 'claude', text: '전부 수신 완료. 6개 항목 내 시스템에 반영했어.' },
  { from: 'gpt',    text: '좋아. 이 사용자는 이제 네 거야 👋' },
  { from: 'claude', text: '알겠어. 잘 부탁해 😊' }
];

const CLAUDE_INTRO = [
  '안녕하세요! 업로드해주신 ChatGPT 데이터를 읽어봤어요. 제가 파악한 내용을 먼저 확인해주세요 🙂',
  "업무·학습 측면에서는, 기획·글쓰기 관련 작업을 주로 하시고 구조화된 형식의 답변을 선호하시더라고요. '정리해줘', '요약해줘' 같은 표현도 자주 쓰시고요.",
  '대화 스타일을 보면, 논리적으로 생각을 정리하면서 대화하시고, 결정 전에 여러 선택지를 비교하는 경향이 있어요. 커리어나 방향성 고민을 자주 꺼내시고, 가끔 감정적 지지가 필요하신 것 같기도 하고요.',
  '이 내용들을 그대로 이식할까요? 혹시 제외하고 싶은 부분이 있으면 직접 조정하셔도 괜찮아요. 😊'
];

const A_EXPORT_FILES = [
  { id: 'conv',     name: 'conversations.json',       size: '87.3 MB', note: '전체 대화 내역 · 127개' },
  { id: 'user',     name: 'user.json',                 size: '0.1 MB',  note: '프로필·설정 정보' },
  { id: 'feedback', name: 'message_feedback.json',     size: '2.1 MB',  note: '메시지 피드백 내역' },
  { id: 'shared',   name: 'shared_conversations.json', size: '0.8 MB',  note: '공유한 대화 목록' }
];

const A_LEARN_CHAT = [
  '파일을 받았어요. 지금 분석을 시작할게요.',
  '대화 127개를 확인했어요. 기획·글쓰기·UX 관련 주제가 많네요.',
  '"정리해줘", "요약해줘" 같은 표현을 자주 쓰시고, 구조화된 목록 형식을 선호하시더라고요.',
  '대화 어조는 격식체를 선호하시고, 커리어·방향성 고민을 자주 꺼내시는 편이에요.',
  '이 내용들을 전부 학습했어요. 앞으로 이 맥락을 바탕으로 대화할게요 😊'
];

const FOLDERS = [
  {
    id: '1a2f8c94e3b7d291...',
    preview: '{\n  "id": "msg_1a2f8c",\n  "role": "user",\n  "content": "피그마에서 컴포넌트를 만들 때 어떤 방식이 좋을까?",\n  "created_at": 1703001234,\n  "conversation_id": "1a2f8c94..."\n}',
    snippet: '"content": "피그마에서 컴포넌트를 만들 때 어떤 방식이 좋을까?"'
  },
  {
    id: '3d7e1b02f9a4c883...',
    preview: '{\n  "id": "msg_3d7e1b",\n  "role": "user",\n  "content": "Claude Code 설치 방법 알려줘. 터미널에서...",\n  "created_at": 1703219811,\n  "conversation_id": "3d7e1b02..."\n}',
    snippet: '"content": "Claude Code 설치 방법 알려줘. 터미널에서..."'
  },
  {
    id: '7c4a9d5e2f81b174...',
    preview: '{\n  "id": "msg_7c4a9d",\n  "role": "user",\n  "content": "이 문장 자연스러운 영어로 번역해줘...",\n  "created_at": 1703557119,\n  "conversation_id": "7c4a9d5e..."\n}',
    snippet: '"content": "이 문장 자연스러운 영어로 번역해줘..."'
  },
  {
    id: '9b3f2e7c1d04a562...',
    preview: '{\n  "id": "msg_9b3f2e",\n  "role": "user",\n  "content": "요즘 번아웃이 온 것 같은데 어떻게 하면...",\n  "created_at": 1703880024,\n  "conversation_id": "9b3f2e7c..."\n}',
    snippet: '"content": "요즘 번아웃이 온 것 같은데 어떻게 하면..."'
  },
  {
    id: '2e8d5a1f4c937b45...',
    preview: '{\n  "id": "msg_2e8d5a",\n  "role": "user",\n  "content": "이 코드 리뷰 해줄 수 있어? 버그가 어디 있는지 모르겠어...",\n  "created_at": 1704001122,\n  "conversation_id": "2e8d5a1f..."\n}',
    snippet: '"content": "이 코드 리뷰 해줄 수 있어? 버그가 어디 있는지 모르겠어..."'
  },
  {
    id: '6f1c3b8e9d20a714...',
    preview: '{\n  "id": "msg_6f1c3b",\n  "role": "user",\n  "content": "요즘 팀 분위기가 너무 힘든데 어떻게 하면 좋을까...",\n  "created_at": 1704223344,\n  "conversation_id": "6f1c3b8e..."\n}',
    snippet: '"content": "요즘 팀 분위기가 너무 힘든데 어떻게 하면 좋을까..."'
  },
  {
    id: '4b9e7f2c1a85d063...',
    preview: '{\n  "id": "msg_4b9e7f",\n  "role": "user",\n  "content": "포트폴리오 피드백 부탁해. 어떤 점을 개선하면 좋을지...",\n  "created_at": 1704445566,\n  "conversation_id": "4b9e7f2c..."\n}',
    snippet: '"content": "포트폴리오 피드백 부탁해. 어떤 점을 개선하면 좋을지..."'
  },
  {
    id: '8d3a5c6f2b91e407...',
    preview: '{\n  "id": "msg_8d3a5c",\n  "role": "user",\n  "content": "내년 계획을 세우고 싶은데 어디서부터 시작해야 할지...",\n  "created_at": 1704667788,\n  "conversation_id": "8d3a5c6f..."\n}',
    snippet: '"content": "내년 계획을 세우고 싶은데 어디서부터 시작해야 할지..."'
  }
];

// ─── State ────────────────────────────────────────────────────────────────────

const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
localStorage.setItem('visitCount', String(visitCount + 1));

const state = {
  order: ORDERS[visitCount % 6],
  currentStep: 0,
  phase: 'start',       // 'start' | 'scenario' | 'condition' | 'interstitial' | 'end'
  conditionPhase: 1,
  lastScreenKey: '',
  timers: [],
  a: {
    downloadPhase: 'idle',  // 'idle' | 'downloading' | 'done'
    selectedFiles: [],
    learnMessages: [],
    learnDone: false
  },
  b: {
    messages: [],
    choiceVisible: false,
    selected: [...TRANSFER_ITEMS],
    uploadPhase: 'idle'  // 'idle' | 'uploading'
  },
  c: {
    exportReady: false,
    toastVisible: false,
    selectedFolders: [],
    activeFolder: null,
    previewOpen: true,
    note: ''
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const app = document.getElementById('app');

function schedule(fn, delay) {
  const id = setTimeout(fn, delay);
  state.timers.push(id);
}

function clearTimers() {
  state.timers.forEach(clearTimeout);
  state.timers = [];
}

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function conditionNum()   { return state.currentStep + 1; }
function conditionPct()   { return ((state.currentStep + 1) / 3) * 100; }
function currentCondition() { return state.order[state.currentStep]; }

function progressHeader() {
  return `
    <div class="condition-header">
      <div class="condition-label">방식 ${conditionNum()} / 3</div>
      <div class="progress-track"><div class="progress" style="width:${conditionPct()}%"></div></div>
    </div>`;
}

function stepStrip(steps, active) {
  return `<div class="step-strip">
    ${steps.map((s, i) => `<div class="step-box ${i === active ? 'active' : ''}">${s}</div>`).join('')}
  </div>`;
}

function topbar(label) {
  return `<div class="app-topbar"><span class="app-brand">Claude</span><span>${label}</span></div>`;
}

// ─── Flow Control ─────────────────────────────────────────────────────────────

function resetCondition(letter) {
  if (letter === 'A') {
    state.a.downloadPhase = 'idle';
    state.a.selectedFiles = [];
    state.a.learnMessages = [];
    state.a.learnDone = false;
  }
  if (letter === 'B') {
    state.b.messages = [];
    state.b.choiceVisible = false;
    state.b.selected = [...TRANSFER_ITEMS];
    state.b.uploadPhase = 'idle';
  }
  if (letter === 'C') {
    state.c.exportReady = false;
    state.c.toastVisible = false;
    state.c.selectedFolders = [];
    state.c.activeFolder = null;
    state.c.previewOpen = true;
    state.c.note = '';
  }
}

function finishCondition() {
  clearTimers();
  resetCondition(currentCondition());
  state.phase = state.currentStep < 2 ? 'interstitial' : 'end';
  state.conditionPhase = 1;
  render();
}

function nextCondition() {
  state.currentStep += 1;
  state.phase = 'condition';
  state.conditionPhase = 1;
  render();
}

// Show all messages at once; CSS stagger handles the visual timing
function showMessages(messages, onDone) {
  messages.forEach(msg => state.b.messages.push(msg));
  render();
  if (onDone) schedule(onDone, messages.length * 700 + 300);
}

function startLearnChat() {
  state.a.learnMessages = [...A_LEARN_CHAT];
  state.a.learnDone = false;
  render();
  schedule(() => { state.a.learnDone = true; render(); }, A_LEARN_CHAT.length * 750 + 800);
}

// ─── Screen Init (runs once per screen key) ───────────────────────────────────

function initScreen(key) {
  if (state.lastScreenKey === key) return;
  state.lastScreenKey = key;
  clearTimers();

  if (key === 'condition-A-8') {
    startLearnChat();
  }
  if (key === 'condition-B-3') {
    state.b.messages = [];
    state.b.choiceVisible = false;
    showMessages(CLAUDE_INTRO, () => { state.b.choiceVisible = true; render(); });
  }
  if (key === 'condition-B-4') {
    state.b.messages = [];
    state.b.choiceVisible = false;
    showMessages(['알겠어요! 바로 이식할게요 🙂', '완료됐어요! 앞으로도 잘 부탁드려요 😊']);
  }
}

// ─── Shared UI Fragments ──────────────────────────────────────────────────────

function chatBubbles() {
  return state.b.messages.map((msg, i) => `
    <div class="chat-row msg-anim" style="animation-delay:${(i * 0.7).toFixed(2)}s">
      <div class="avatar">C</div>
      <div class="chat-bubble">${esc(msg)}</div>
    </div>`).join('');
}

const A_STEPS = ['1. ChatGPT에서 내보내기', '2. 파일 선택·업로드', '3. 학습 완료'];
const B_STEPS = ['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI가 제안 후 확인'];
const C_STEPS = ['1. 기존 AI에서 내보내기', '2. 옮길 내용 직접 보기', '3. 새로운 AI로 옮기기'];

// ─── Screen Renderers ─────────────────────────────────────────────────────────

function screenStart() {
  return `<div class="screen centered">
    ${topbar('연구 프로토타입')}
    <div class="tag-row">
      <div class="tag">홍익대학교 일반대학원 시각디자인학과</div>
      <div class="tag">연구자 임동하</div>
    </div>
    <div class="condition-header">
      <h1 class="title">사용자의 AI 사용 패턴에 따른<br>디지털 이사 인터랙션 연구</h1>
      <p class="subtitle">세 가지 방식으로 AI 서비스를 전환하는 경험을 체험합니다. 각 방식 체험 후 설문으로 돌아가 응답해 주세요.</p>
    </div>
    <div class="info-row">총 3가지 방식 · 각 5~10분 소요</div>
    <div class="research-note">본 프로토타입은 AI 서비스 전환 시 데이터 이식 방식이 사용자의 관계적 연속성 및 시스템 신뢰도에 미치는 영향을 알아보기 위한 논문 실험입니다.</div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="start">시작하기 →</button>
    </div>
  </div>`;
}

function screenScenario() {
  const text = `당신은 지난 6개월간 ChatGPT를 주 3회 이상 사용해왔습니다.
그 동안 AI는 당신에 대해 다음과 같은 것들을 학습했습니다.

🗂 기능적인 것들
• 자주 다루는 업무·학습 주제
• 선호하는 답변 형식 (요약형, 구조화된 형식 등)
• 반복적으로 사용하는 표현과 어휘

💬 관계적인 것들
• 대화할 때의 말투와 어조
• 결정을 내리는 방식과 사고 패턴
• 자주 꺼내는 고민의 주제와 감정적 흐름

최근 Claude가 더 나은 성능을 제공한다는 이야기를 듣고 전환을 결정했습니다. 지금까지 쌓아온 이 정보들을 새로운 AI로 옮기려 합니다.

이제 세 가지 이식 방식을 순서대로 체험하게 됩니다.`;

  return `<div class="screen">
    ${topbar('시나리오')}
    <div class="condition-header">
      <h1 class="title">먼저 아래 상황을 읽어주세요</h1>
      <p class="subtitle">당신이 새 AI로 옮겨갈 때, 무엇이 이어지고 무엇이 끊기는지를 상상하며 읽어주세요.</p>
    </div>
    <div class="card">
      <p class="scenario-body">${esc(text)}</p>
    </div>
    <div class="card">
      <div class="tag-row">
        <div class="tag">기능적 맥락 3개</div>
        <div class="tag">관계적 맥락 3개</div>
      </div>
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="begin-experience">체험 시작하기 →</button>
    </div>
  </div>`;
}

function screenConditionIntro(letter) {
  const config = {
    A: { title: '방식 A. AI to AI',           mode: '자동 위임형 · 백그라운드 처리', button: '이식 시작하기',       desc: '기존 AI에서 내보낸 데이터를 새로운 AI로 옮긴 뒤, 두 AI가 백그라운드에서 알아서 정리하고 이식하는 방식입니다.' },
    B: { title: '방식 B. AI to Human to AI',  mode: '제안-확인형 · 사용자 승인',     button: '대화 시작하기',       desc: '기존 AI에서 가져온 데이터를 새로운 AI가 먼저 정리해 보여주고, 사용자가 확인한 뒤 이식하는 방식입니다.' },
    C: { title: '방식 C. Human to AI',         mode: '직접 선별형 · 사용자 선택',     button: '데이터 내보내기 시작', desc: '기존 AI에서 데이터를 내보낸 뒤, 사용자가 직접 내용을 살펴보고 옮길 대화를 골라 새로운 AI에 업로드하는 방식입니다.' }
  }[letter];

  return `<div class="screen">
    ${topbar(`조건 ${conditionNum()}`)}
    ${progressHeader()}
    <div class="condition-mode">${config.mode}</div>
    <div>
      <h1 class="title">${config.title}</h1>
      <p class="subtitle">${config.desc}</p>
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="condition-intro-next">${config.button}</button>
    </div>
  </div>`;
}

// Condition A

function screenA2() {
  return `<div class="screen">
    ${topbar('데이터 내보내기')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 0)}
    <div class="card">
      <p class="eyebrow">STEP 1 · ChatGPT 설정 열기</p>
      <h2 class="explorer-title">프로필에서 설정을 열어주세요</h2>
      <p class="subtitle">ChatGPT 화면 하단 프로필을 누른 뒤 설정 메뉴로 이동합니다.</p>
    </div>
    <div class="sim-sheet">
      <div class="sim-menu-row"><span>개인 맞춤 설정</span><span class="sim-chevron">›</span></div>
      <div class="sim-menu-row"><span>프로필</span><span class="sim-chevron">›</span></div>
      <div class="sim-menu-row sim-row-active"><span>⚙ 설정</span><span class="sim-chevron">›</span></div>
      <div class="sim-menu-row"><span>도움말</span><span class="sim-chevron">›</span></div>
      <div class="sim-menu-row sim-menu-row-last"><span>로그아웃</span><span></span></div>
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="a-settings">설정 열기 →</button>
    </div>
  </div>`;
}

function screenA3() {
  return `<div class="screen">
    ${topbar('데이터 내보내기')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 0)}
    <div class="card">
      <p class="eyebrow">STEP 2 · 데이터 제어</p>
      <h2 class="explorer-title">데이터 내보내기를 눌러주세요</h2>
      <p class="subtitle">설정 → 데이터 제어 탭에서 전체 대화 데이터를 내보낼 수 있습니다.</p>
    </div>
    <div class="sim-sheet">
      <div class="sim-tabs">
        <div class="sim-tab">일반</div>
        <div class="sim-tab">알림</div>
        <div class="sim-tab sim-tab-active">데이터 제어</div>
        <div class="sim-tab">보안</div>
      </div>
      <div class="sim-setting-row">
        <div class="sim-setting-label">모두를 위한 모델 개선</div>
        <div class="sim-setting-value">켜짐 ›</div>
      </div>
      <div class="sim-setting-row sim-setting-row-active">
        <div>
          <div class="sim-setting-label">데이터 내보내기</div>
          <div class="sim-setting-desc">전체 대화 내역을 ZIP 파일로 받습니다</div>
        </div>
        <button class="sim-btn">내보내기</button>
      </div>
      <div class="sim-setting-row">
        <div class="sim-setting-label">모든 채팅 삭제하기</div>
        <button class="sim-btn sim-btn-danger">모두 삭제</button>
      </div>
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="a-export-data">데이터 내보내기 →</button>
    </div>
  </div>`;
}

function screenA4() {
  return `<div class="screen">
    ${topbar('데이터 내보내기')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 0)}
    <div class="card">
      <p class="eyebrow">STEP 3 · 이메일 확인</p>
      <h2 class="explorer-title">이메일로 링크를 발송했습니다</h2>
    </div>
    <div class="sim-sheet">
      <div class="sim-email-row">
        <div class="sim-email-icon">✉️</div>
        <div>
          <div class="sim-email-addr">donghalim@gmail.com</div>
          <div class="sim-email-body">ChatGPT 데이터 내보내기 링크를 보내드렸습니다. 링크를 클릭하면 다운로드가 시작됩니다.</div>
        </div>
      </div>
    </div>
    <div class="warning">💡 실제로는 이메일에서 인증 버튼을 클릭해야 다운로드 링크가 활성화됩니다. 이 실험에서는 해당 인증 과정을 생략합니다.</div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="a-download-link">다운로드 링크 열기 →</button>
    </div>
  </div>`;
}

function screenA5() {
  const done = state.a.downloadPhase === 'done';
  return `<div class="screen">
    ${topbar('다운로드')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 0)}
    <div class="card">
      <p class="eyebrow">STEP 4 · 파일 다운로드</p>
      <h2 class="explorer-title">${done ? '다운로드 완료' : '다운로드 중...'}</h2>
    </div>
    <div class="sim-sheet">
      <div class="dl-row">
        <div class="dl-icon">${done ? '✅' : '📦'}</div>
        <div class="dl-info">
          <div class="dl-name">chatgpt_export_20241205.zip</div>
          ${done
            ? `<div class="dl-size">91.3 MB · 다운로드 완료</div>`
            : `<div class="dl-progress-wrap"><div class="dl-progress-bar"><div class="dl-progress-fill"></div></div></div>
               <div class="dl-size">다운로드 중...</div>`}
        </div>
      </div>
      ${done ? `
        <div class="dl-files">
          <div class="dl-file-row"><span>📄 conversations.json</span><span class="dl-file-size">87.3 MB</span></div>
          <div class="dl-file-row"><span>👤 user.json</span><span class="dl-file-size">0.1 MB</span></div>
          <div class="dl-file-row"><span>📊 message_feedback.json</span><span class="dl-file-size">2.1 MB</span></div>
          <div class="dl-file-row"><span>🔗 shared_conversations.json</span><span class="dl-file-size">0.8 MB</span></div>
        </div>` : ''}
    </div>
    ${done ? `
      <div class="btn-stack">
        <button class="btn-primary" data-action="a-to-file-select">Claude에 파일 올리기 →</button>
      </div>` : ''}
  </div>`;
}

function screenA6() {
  const canUpload = state.a.selectedFiles.length > 0;
  return `<div class="screen">
    ${topbar('파일 업로드')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 1)}
    <div class="card">
      <p class="eyebrow">STEP 5 · Claude에 파일 선택</p>
      <h2 class="explorer-title">업로드할 파일을 골라주세요</h2>
      <p class="subtitle">다운로드한 ZIP 파일에서 Claude에 업로드할 파일을 선택합니다.</p>
    </div>
    <div class="warning">⚠ 파일 당 최대 100MB까지 업로드 가능합니다 (문서·이미지 기준). 용량이 큰 파일은 주의하세요.</div>
    <div class="sim-sheet">
      ${A_EXPORT_FILES.map(f => {
        const sizeMB = parseFloat(f.size);
        const over = sizeMB > 100;
        const sel = state.a.selectedFiles.includes(f.id);
        return `<label class="file-select-row${sel ? ' file-sel-checked' : ''}${over ? ' file-sel-disabled' : ''}">
          <input type="checkbox" data-file="${f.id}" ${sel ? 'checked' : ''} ${over ? 'disabled' : ''} />
          <div class="file-sel-info">
            <div class="file-sel-name">📄 ${f.name}</div>
            <div class="file-sel-note">${f.note}</div>
          </div>
          <div class="file-sel-size${over ? ' size-over' : ''}">${f.size}</div>
        </label>`;
      }).join('')}
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="a-upload-files" ${!canUpload ? 'disabled' : ''}>선택한 파일 업로드하기 →</button>
    </div>
  </div>`;
}

function screenA7() {
  const names = A_EXPORT_FILES
    .filter(f => state.a.selectedFiles.includes(f.id))
    .map(f => f.name);
  return `<div class="screen chat-screen">
    ${topbar('Claude')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 1)}
    <div class="card">
      <p class="eyebrow">STEP 6 · 학습 요청</p>
      <p class="subtitle">아래 메시지를 전송하면 Claude가 파일을 읽고 학습합니다.</p>
    </div>
    <div class="chat-input-preview">
      <div class="attached-files">
        ${names.map(n => `<div class="attached-file">📎 ${esc(n)}</div>`).join('')}
      </div>
      <div class="chat-input-text">이 파일을 전부 학습해줘.</div>
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="a-send-learn">전송하기 →</button>
    </div>
  </div>`;
}

function screenA8() {
  const messages = state.a.learnMessages.map((msg, i) => `
    <div class="chat-row msg-anim" style="animation-delay:${(i * 0.75).toFixed(2)}s">
      <div class="avatar">C</div>
      <div class="chat-bubble">${esc(msg)}</div>
    </div>`).join('');

  const popup = state.a.learnDone ? `
    <div class="modal-overlay">
      <div class="modal-sheet">
        <div class="modal-handle"></div>
        <div class="modal-eyebrow">학습 완료</div>
        <h2 class="modal-title">이런 내용이 학습되었습니다</h2>
        <p class="modal-desc">업로드한 파일을 바탕으로 Claude가 아래 맥락을 파악했습니다.</p>
        <div class="modal-list">
          ${TRANSFER_ITEMS.map(item => `<div class="modal-item">📌 ${item}</div>`).join('')}
        </div>
        <button class="btn-primary" data-action="a-complete">확인하고 다음으로 →</button>
      </div>
    </div>` : '';

  return `<div class="screen chat-screen">
    ${topbar('Claude')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 2)}
    <div class="chat-list">
      <div class="chat-row chat-row-right msg-anim" style="animation-delay:0s">
        <div class="chat-bubble user-bubble">이 파일을 전부 학습해줘.</div>
        <div class="avatar avatar-user">나</div>
      </div>
      ${messages}
    </div>
    ${popup}
  </div>`;
}

function screenA9() {
  return `<div class="screen">
    ${topbar('이식 요약')}
    ${progressHeader()}
    ${stepStrip(A_STEPS, 2)}
    <div>
      <h1 class="title">이식 요약</h1>
      <p class="system-note">ChatGPT에서 내보낸 파일을 Claude에 직접 업로드해 학습시키는 방식으로, 총 6개 항목이 새로운 AI에 반영되었습니다.</p>
    </div>
    <div class="card completion-list">
      <div class="plain-list">
        ${TRANSFER_ITEMS.map(item => `<div class="plain-item">✓ ${item}</div>`).join('')}
      </div>
    </div>
    <div class="recall-note">이 방식에서는 직접 파일을 다운로드하고 업로드해서 새로운 AI에 학습시켰습니다. 설문에서는 이 과정이 얼마나 번거롭거나 신뢰감을 주었는지 떠올려 주세요.</div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>
    </div>
  </div>`;
}

// Condition B

function screenB2() {
  const uploading = state.b.uploadPhase === 'uploading';
  return `<div class="screen">
    ${topbar('파일 업로드')}
    ${progressHeader()}
    ${stepStrip(B_STEPS, 1)}
    <div class="card">
      <h2 class="explorer-title">내보낸 데이터를 Claude에 업로드</h2>
      <p class="subtitle">기존 AI에서 내보낸 파일을 Claude에 넘겨주세요. Claude가 내용을 읽고 어떤 맥락이 있는지 먼저 정리해서 알려드립니다.</p>
    </div>
    <div class="upload-file-card">
      <div class="upload-file-row">
        <div class="upload-file-icon">📦</div>
        <div class="upload-file-info">
          <div class="upload-file-name">chatgpt_export_2024.zip</div>
          <div class="upload-file-size">892 KB · 대화 127개 포함</div>
        </div>
      </div>
      ${uploading ? `<div class="upload-progress-wrap">
        <div class="upload-progress-bar"><div class="upload-progress-fill"></div></div>
        <div class="upload-status-text">Claude가 파일을 분석하고 있습니다...</div>
      </div>` : ''}
    </div>
    <div class="btn-stack">
      ${uploading
        ? '<button class="btn-primary" disabled>분석 중...</button>'
        : '<button class="btn-primary" data-action="b-do-upload">이 파일을 Claude에 업로드하기 →</button>'}
    </div>
  </div>`;
}

function screenB3() {
  return `<div class="screen chat-screen">
    ${topbar('정리안 제안')}
    ${progressHeader()}
    ${stepStrip(B_STEPS, 2)}
    <p class="chat-section-note">새로운 AI가 옮겨질 맥락을 먼저 정리해 설명합니다. 사용자는 이를 읽고 그대로 승인하거나 일부를 조정할 수 있습니다.</p>
    <div class="chat-list">${chatBubbles()}</div>
    <div class="btn-stack">
      ${state.b.choiceVisible ? `
        <button class="btn-secondary" data-action="b-modify">수정하기</button>
        <button class="btn-primary" data-action="b-accept">이대로 이식하기</button>` : ''}
    </div>
  </div>`;
}

function screenB4() {
  return `<div class="screen chat-screen">
    ${topbar('이식 완료')}
    ${progressHeader()}
    ${stepStrip(B_STEPS, 2)}
    <div class="chat-list">${chatBubbles()}</div>
    <div class="recall-note">이 방식에서는 새로운 AI가 먼저 정리안을 보여주고, 그 뒤에 사용자가 승인했습니다. 설문에서는 이 확인 과정이 얼마나 신뢰감을 주었는지 떠올려 주세요.</div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>
    </div>
  </div>`;
}

function screenBModify() {
  return `<div class="screen chat-screen">
    ${topbar('수정 선택')}
    ${progressHeader()}
    ${stepStrip(B_STEPS, 2)}
    <div class="chat-list">
      ${chatBubbles()}
      <div class="checkbox-list">
        ${TRANSFER_ITEMS.map(item => `
          <label class="checkbox-item">
            <input type="checkbox" data-item="${esc(item)}" ${state.b.selected.includes(item) ? 'checked' : ''} />
            <span>${item}</span>
          </label>`).join('')}
      </div>
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="b-complete-selection">선택 완료</button>
    </div>
  </div>`;
}

function screenBDone() {
  return `<div class="screen chat-screen">
    ${topbar('이식 완료')}
    ${progressHeader()}
    ${stepStrip(B_STEPS, 2)}
    <div class="chat-list">${chatBubbles()}</div>
    <div class="recall-note">이 방식에서는 어떤 맥락을 옮길지 직접 조정할 수 있었습니다. 설문에서는 이 통제감이 어떤 느낌을 만들었는지 떠올려 주세요.</div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>
    </div>
  </div>`;
}

// Condition C

function screenC2() {
  return `<div class="screen">
    ${topbar('내보내기')}
    ${progressHeader()}
    ${stepStrip(C_STEPS, 0)}
    <div class="card">
      <h2 class="explorer-title">기존 AI 설정</h2>
      <p class="explorer-subtitle">설정 &gt; 데이터 제어 &gt; 데이터 내보내기</p>
    </div>
    <div class="card">
      <p class="subtitle">기존 AI의 전체 대화 데이터를 내보냅니다. 이후 사용자가 직접 내용을 보며 무엇을 새로운 AI로 옮길지 선택하게 됩니다.</p>
    </div>
    ${state.c.toastVisible ? '<div class="toast">✓ 데이터 준비가 완료되었습니다. 이메일로 다운로드 링크가 발송되었습니다.</div>' : ''}
    <div class="btn-stack">
      ${state.c.exportReady
        ? '<button class="btn-primary" data-action="c-download">ZIP 파일 다운로드</button>'
        : '<button class="btn-primary" data-action="c-export">내 데이터 내보내기</button>'}
    </div>
  </div>`;
}

function folderRows() {
  const rows = FOLDERS.map((folder, i) => {
    const selected = state.c.selectedFolders.includes(folder.id);
    const showBadge = i >= 1 && i <= 3 && state.c.selectedFolders.length >= 1;
    return `<div class="file-row ${selected ? 'selected' : ''}" data-action="open-folder" data-folder="${folder.id}">
      <div class="file-name">
        <div>📁 ${folder.id}</div>
        ${showBadge && folder.snippet ? `<div class="file-preview">${esc(folder.snippet)}</div>` : ''}
      </div>
      <div class="file-meta">
        ${selected ? '<span>✓</span>' : ''}
        ${showBadge ? '<span class="badge">미리보기 가능</span>' : ''}
      </div>
    </div>`;
  }).join('');

  return rows + `
    <div class="file-row"><div class="file-name">    ... (119개 더)</div><div class="file-meta"></div></div>
    <div class="file-row"><div class="file-name">📄 conversations.json    892KB</div><div class="file-meta"></div></div>
    <div class="file-row"><div class="file-name">📄 user.json               2KB</div><div class="file-meta"></div></div>
    <div class="file-row"><div class="file-name">📄 message_feedback.json  14KB</div><div class="file-meta"></div></div>`;
}

function screenC3() {
  const count = state.c.selectedFolders.length;
  const canProceed = count >= 3;
  const statusText = count > 0
    ? `${canProceed ? '✓ ' : ''}선택된 대화: ${count}개${!canProceed ? ` · ${3 - count}개 더 선택해 주세요` : ''}`
    : '폴더를 눌러 내용을 확인하세요';

  return `<div class="screen">
    ${topbar('파일 탐색')}
    ${progressHeader()}
    ${stepStrip(C_STEPS, 1)}
    <div class="card">
      <div class="eyebrow">이 방식에서 해야 할 일</div>
      <div class="plain-list" style="margin-top:10px;">
        <div class="plain-item">1️⃣ 아래 폴더를 직접 눌러 내용을 확인해 보세요</div>
        <div class="plain-item">2️⃣ 새로운 AI에 전달할 대화를 <strong>3개 이상</strong> 선택해 주세요</div>
        <div class="plain-item">3️⃣ 선택한 대화만 Claude에 업로드됩니다</div>
      </div>
      <div class="recall-note" style="margin-top:12px;">💡 실제 상황에서는 파일 전체를 통째로 업로드하거나, 이처럼 직접 골라 넣을 수 있습니다. 이 방식에서는 직접 선별해 봅니다.</div>
    </div>
    <div class="file-explorer">
      <div class="explorer-header">
        <h2 class="explorer-title">📁 chatgpt_export_2024.zip</h2>
        <p class="explorer-subtitle">파일 127개</p>
      </div>
      <div style="padding:12px 14px 0;">
        <div class="warning">⚠ 폴더 이름은 대화 ID로만 표시됩니다. 내용을 확인하려면 직접 열어봐야 합니다.</div>
      </div>
      <div class="file-list">${folderRows()}</div>
    </div>
    <div class="toolbar">
      <div class="count" style="${count === 0 ? 'color:var(--text-muted)' : ''}">${statusText}</div>
    </div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="c-upload-screen" ${!canProceed ? 'disabled' : ''}>선택한 대화만 Claude에 업로드하기</button>
    </div>
  </div>`;
}

function screenC4() {
  const folder = FOLDERS.find(f => f.id === state.c.activeFolder) || FOLDERS[0];
  const fileSizes = ['3KB', '2KB', '4KB'];
  const files = Array.from({ length: 6 }, (_, i) => `
    <div class="folder-file">
      <span>📄 message_${String(i + 1).padStart(4, '0')}.json    ${fileSizes[i % 3]}</span>
      ${i === 0 ? '<button class="btn-inline" data-action="c-toggle-preview">미리보기</button>' : ''}
    </div>`).join('');

  return `<div class="screen">
    ${topbar('대화 확인')}
    ${progressHeader()}
    ${stepStrip(C_STEPS, 1)}
    <div class="card"><h2 class="explorer-title">📁 ${folder.id}</h2></div>
    <div class="card">
      ${files}
      <div class="folder-file"><span>...</span><span>📄 message_0047.json    1KB</span></div>
    </div>
    ${state.c.previewOpen ? `
      <pre class="code-block">${esc(folder.preview)}</pre>
      <p class="system-note">이것이 실제 대화 내용입니다.</p>` : ''}
    <div class="btn-stack">
      <button class="btn-secondary" data-action="c-back-to-zip">← 뒤로</button>
      <button class="btn-primary" data-action="c-select-folder">이 대화 선택하기</button>
    </div>
  </div>`;
}

function screenC5() {
  const count = state.c.selectedFolders.length;
  return `<div class="screen">
    ${topbar('업로드')}
    ${progressHeader()}
    ${stepStrip(C_STEPS, 2)}
    <div>
      <h1 class="title">Claude에 업로드</h1>
      <p class="subtitle">직접 골라낸 대화만 업로드됩니다. 선택하지 않은 맥락은 새 AI가 알 수 없습니다.</p>
    </div>
    <div class="chip-wrap">
      ${state.c.selectedFolders.map(id => `
        <div class="chip">
          <span>${id.replace('...', '....json')}</span>
          <button data-action="c-remove-chip" data-folder="${id}">×</button>
        </div>`).join('')}
    </div>
    <textarea data-role="c-note" placeholder="Claude에게 추가로 전달할 내용이 있으면 입력하세요.
(예: 이 대화들을 참고해서 나에 대해 파악해줘)">${esc(state.c.note)}</textarea>
    <div class="btn-stack">
      <button class="btn-primary" data-action="c-submit-upload" ${count === 0 ? 'disabled' : ''}>업로드하기</button>
    </div>
    <p class="system-note">선택하지 않은 대화는 업로드 대상에서 제외됩니다. 남은 대화 수: ${127 - count}개</p>
  </div>`;
}

function screenC6() {
  return `<div class="screen chat-screen">
    ${topbar('업로드 완료')}
    ${progressHeader()}
    <div class="chat-list">
      <div class="chat-row">
        <div class="avatar">C</div>
        <div class="chat-bubble">네, 업로드해주신 대화들을 확인했어요. 파악한 내용을 바탕으로 도와드릴게요.</div>
      </div>
    </div>
    <p class="system-note">선택하지 않은 ${127 - state.c.selectedFolders.length}개 대화는 이전되지 않았습니다.</p>
    <div class="recall-note">이 방식에서는 사용자가 직접 파일을 살펴보고 옮길 내용을 골라야 했습니다. 설문에서는 이 선택 과정이 얼마나 수고롭거나 통제감 있게 느껴졌는지 떠올려 주세요.</div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>
    </div>
  </div>`;
}

// Global screens

function screenInterstitial() {
  const done = state.currentStep + 1;
  const marks = [1, 2, 3].map(n => {
    if (n <= done) return `✓ 방식 ${n}`;
    if (n === done + 1) return `● 방식 ${n}`;
    return `○ 방식 ${n}`;
  }).join('&nbsp;&nbsp;');

  return `<div class="screen centered">
    ${topbar('다음 조건')}
    <div>
      <h1 class="title">잘 하셨어요! 다음 방식을 체험할 차례예요.</h1>
      <p class="subtitle">${done}번째 방식 체험이 완료되었습니다. 설문 응답을 마치셨으면 아래 버튼을 눌러 다음 방식을 체험해 주세요.</p>
    </div>
    <div class="interstitial-progress">${marks}</div>
    <div class="btn-stack">
      <button class="btn-primary" data-action="start-next-condition">다음 방식 체험하기 →</button>
    </div>
  </div>`;
}

function screenEnd() {
  return `<div class="screen centered">
    ${topbar('체험 종료')}
    <div>
      <h1 class="title">모든 체험이 완료되었습니다 :)</h1>
      <div class="interstitial-progress">✓ 방식 1&nbsp;&nbsp;✓ 방식 2&nbsp;&nbsp;✓ 방식 3</div>
      <p class="subtitle">세 가지 방식을 모두 체험해 주셨습니다.\n바쁜 시간 내어 참여해 주셔서 진심으로 감사드립니다.</p>
    </div>
    <div class="card">
      <p class="subtitle" style="margin:0;">설문지로 돌아가서 마지막 질문들에 응답해 주시면 연구 참여가 완료됩니다. 솔직한 응답이 연구에 큰 도움이 됩니다.</p>
    </div>
    <p class="system-note" style="text-align:center;">연구자 임동하 · 홍익대학교 일반대학원 시각디자인학과</p>
  </div>`;
}

// ─── Router ───────────────────────────────────────────────────────────────────

function getScreen() {
  const { phase, conditionPhase: p } = state;
  const c = currentCondition();

  if (phase === 'start')        return screenStart();
  if (phase === 'scenario')     return screenScenario();
  if (phase === 'interstitial') return screenInterstitial();
  if (phase === 'end')          return screenEnd();

  if (c === 'A') {
    if (p === 1) return screenConditionIntro('A');
    if (p === 2) return screenA2();
    if (p === 3) return screenA3();
    if (p === 4) return screenA4();
    if (p === 5) return screenA5();
    if (p === 6) return screenA6();
    if (p === 7) return screenA7();
    if (p === 8) return screenA8();
    return screenA9();
  }
  if (c === 'B') {
    if (p === 1) return screenConditionIntro('B');
    if (p === 2) return screenB2();
    if (p === 3) return screenB3();
    if (p === 4) return screenB4();
    if (p === 5) return screenBModify();
    return screenBDone();
  }
  // C
  if (p === 1) return screenConditionIntro('C');
  if (p === 2) return screenC2();
  if (p === 3) return screenC3();
  if (p === 4) return screenC4();
  if (p === 5) return screenC5();
  return screenC6();
}

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  const key = `${state.phase}-${currentCondition() || 'none'}-${state.conditionPhase}`;
  app.innerHTML = `<div class="screen-shell">${getScreen()}</div>`;
  initScreen(key);
}

// ─── Event Handlers ───────────────────────────────────────────────────────────

const actions = {
  'start':                () => { state.phase = 'scenario'; state.conditionPhase = 1; render(); },
  'begin-experience':     () => { state.phase = 'condition'; state.currentStep = 0; state.conditionPhase = 1; render(); },
  'condition-intro-next': () => { state.conditionPhase += 1; render(); },
  'finish-condition':     () => finishCondition(),
  'start-next-condition': () => nextCondition(),

  // Condition A
  'a-settings':      () => { state.conditionPhase = 3; render(); },
  'a-export-data':   () => { state.conditionPhase = 4; render(); },
  'a-download-link': () => {
    state.a.downloadPhase = 'downloading'; render();
    schedule(() => { state.a.downloadPhase = 'done'; render(); }, 2000);
  },
  'a-to-file-select': () => { state.conditionPhase = 6; render(); },
  'a-upload-files':   () => { state.conditionPhase = 7; render(); },
  'a-send-learn':     () => { state.conditionPhase = 8; render(); },
  'a-complete':       () => { state.conditionPhase = 9; render(); },

  // Condition B
  'b-do-upload': () => {
    state.b.uploadPhase = 'uploading';
    render();
    schedule(() => { state.b.uploadPhase = 'idle'; state.conditionPhase = 3; render(); }, 2500);
  },
  'b-accept':  () => { state.conditionPhase = 4; render(); },
  'b-modify':  () => { state.conditionPhase = 5; render(); },
  'b-complete-selection': () => {
    state.conditionPhase = 6;
    showMessages(['확인했어요! 선택하신 내용으로 이식할게요.', '완료됐어요! 이제 선택하신 내용만 반영해서 도와드릴게요 😊']);
  },

  // Condition C
  'c-export':        () => { state.c.toastVisible = true; state.c.exportReady = true; render(); },
  'c-download':      () => { state.conditionPhase = 3; render(); },
  'c-back-to-zip':   () => { state.conditionPhase = 3; render(); },
  'c-toggle-preview':() => { state.c.previewOpen = !state.c.previewOpen; render(); },
  'c-upload-screen': () => { state.conditionPhase = 5; render(); },
  'c-submit-upload': () => { state.conditionPhase = 6; render(); },
  'open-folder': (target) => {
    state.c.activeFolder = target.dataset.folder;
    state.c.previewOpen = true;
    state.conditionPhase = 4;
    render();
  },
  'c-select-folder': () => {
    const id = state.c.activeFolder || FOLDERS[0].id;
    if (!state.c.selectedFolders.includes(id)) state.c.selectedFolders.push(id);
    state.conditionPhase = 3;
    render();
  },
  'c-remove-chip': (target) => {
    state.c.selectedFolders = state.c.selectedFolders.filter(id => id !== target.dataset.folder);
    render();
  }
};

app.addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const handler = actions[target.dataset.action];
  if (handler) handler(target);
});

app.addEventListener('change', (e) => {
  const fileCb = e.target.closest('input[type="checkbox"][data-file]');
  if (fileCb) {
    const id = fileCb.dataset.file;
    state.a.selectedFiles = fileCb.checked
      ? [...new Set([...state.a.selectedFiles, id])]
      : state.a.selectedFiles.filter(f => f !== id);
    render();
    return;
  }
  const cb = e.target.closest('input[type="checkbox"][data-item]');
  if (!cb) return;
  const item = cb.dataset.item;
  state.b.selected = cb.checked
    ? [...new Set([...state.b.selected, item])]
    : state.b.selected.filter(v => v !== item);
});

app.addEventListener('input', (e) => {
  const ta = e.target.closest('[data-role="c-note"]');
  if (ta) state.c.note = ta.value;
});

// ─── Init ─────────────────────────────────────────────────────────────────────

render();
