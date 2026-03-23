    const orders = [
      ['A', 'B', 'C'],
      ['B', 'C', 'A'],
      ['C', 'A', 'B'],
      ['A', 'C', 'B'],
      ['B', 'A', 'C'],
      ['C', 'B', 'A']
    ];

    const count = parseInt(localStorage.getItem('visitCount') || '0', 10);
    localStorage.setItem('visitCount', String(count + 1));

    const transferItems = [
      '자주 다루는 업무·학습 주제',
      '선호하는 답변 형식',
      '반복적으로 사용하는 표현과 어휘',
      '대화할 때의 말투와 어조',
      '결정을 내리는 방식과 사고 패턴',
      '자주 꺼내는 고민의 주제와 감정적 흐름'
    ];

    const terminalLines = [
      '[SYSTEM]    기존 AI 데이터 패키지 불러오는 중...',
      '[SYSTEM]    데이터 패키지 확인 완료 ✓',
      '[Claude]    새 사용자 프로필 슬롯 생성',
      '[ChatGPT → Claude]  기능 맥락 3개 전달 시작',
      '[ChatGPT → Claude]  관계 맥락 3개 전달 시작',
      '[Claude]    데이터 수신 중 ██████████ 100%',
      '[Claude]    전달 항목 구조 재정렬 중...',
      '[ChatGPT]   자주 다루는 업무·학습 주제는 상위 우선순위입니다.',
      '[Claude]    확인됨. 업무·학습 주제 맥락 저장.',
      '[ChatGPT]   구조화된 답변 선호와 반복 표현을 함께 전달합니다.',
      '[Claude]    확인됨. 응답 형식 및 어휘 패턴 저장.',
      '[ChatGPT]   말투, 사고 패턴, 고민 흐름도 포함합니다.',
      '[Claude]    확인됨. 관계 맥락 저장.',
      '[SYSTEM]    AI 간 정리 대화 종료. 요약본 생성 완료.'
    ];

    const claudeIntroBubbles = [
      '안녕하세요! ChatGPT에서 가져온 데이터를 분석해봤어요. 제가 파악한 내용을 확인해주시겠어요? 🙂',
      "먼저 업무·학습 관련해서는요, 주로 기획·글쓰기 관련 업무를 다루시고 구조화된 형식의 답변을 선호하시더라고요. '정리해줘', '요약해줘' 같은 표현도 자주 쓰시고요.",
      '그리고 대화 스타일을 보면, 논리적으로 생각을 정리하면서 대화하시고 결정 전에 여러 선택지를 비교하는 경향이 있으세요. 커리어나 방향성에 대한 고민도 자주 꺼내시더라고요.',
      '이 내용들을 그대로 이식해드릴까요? 혹시 틀리거나 빼고 싶은 부분이 있으면 직접 조정하셔도 괜찮아요. 😊'
    ];

    const folderData = [
      {
        id: '1a2f8c94e3b7d291...',
        preview: '{\n  "id": "msg_1a2f8c",\n  "role": "user",\n  "content": "피그마에서 컴포넌트를 \\n  만들 때 어떤 방식이 좋을까?",\n  "created_at": 1703001234,\n  "conversation_id": "1a2f8c94..."\n}',
        snippet: '"content": "피그마에서 컴포넌트를 \\n만들 때 어떤 방식이 좋을까?"'
      },
      {
        id: '3d7e1b02f9a4c883...',
        preview: '{\n  "id": "msg_3d7e1b",\n  "role": "user",\n  "content": "Claude Code 설치 방법 \\n  알려줘. 터미널에서...",\n  "created_at": 1703219811,\n  "conversation_id": "3d7e1b02..."\n}',
        snippet: '"content": "Claude Code 설치 방법 \\n알려줘. 터미널에서..."'
      },
      {
        id: '7c4a9d5e2f81b174...',
        preview: '{\n  "id": "msg_7c4a9d",\n  "role": "user",\n  "content": "이 문장 자연스러운 \\n  영어로 번역해줘...",\n  "created_at": 1703557119,\n  "conversation_id": "7c4a9d5e..."\n}',
        snippet: '"content": "이 문장 자연스러운 \\n영어로 번역해줘..."'
      },
      {
        id: '9b3f2e7c1d04a562...',
        preview: '{\n  "id": "msg_9b3f2e",\n  "role": "user",\n  "content": "요즘 번아웃이 온 것 \\n  같은데 어떻게 하면...",\n  "created_at": 1703880024,\n  "conversation_id": "9b3f2e7c..."\n}',
        snippet: '"content": "요즘 번아웃이 온 것 \\n같은데 어떻게 하면..."'
      },
      { id: '2e8d5a1f4c937b45...' },
      { id: '6f1c3b8e9d20a714...' },
      { id: '4b9e7f2c1a85d063...' },
      { id: '8d3a5c6f2b91e407...' }
    ];

    const state = {
      order: orders[count % 6],
      currentStep: 0,
      phase: 'start',
      conditionPhase: 1,
      lastScreenKey: '',
      timers: [],
      a: {
        visibleLines: 0,
        ready: false
      },
      b: {
        messages: [],
        typing: false,
        choiceVisible: false,
        mode: 'intro',
        selected: [...transferItems]
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

    const app = document.getElementById('app');

    function clearTimers() {
      state.timers.forEach(clearTimeout);
      state.timers = [];
    }

    function schedule(fn, delay) {
      const timer = setTimeout(fn, delay);
      state.timers.push(timer);
    }

    function escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function getCurrentCondition() {
      return state.order[state.currentStep];
    }

    function getConditionNumber() {
      return state.currentStep + 1;
    }

    function getConditionProgressWidth() {
      return ((state.currentStep + 1) / 3) * 100;
    }

    function resetConditionState(letter) {
      if (letter === 'A') {
        state.a.visibleLines = 0;
        state.a.ready = false;
      }
      if (letter === 'B') {
        state.b.messages = [];
        state.b.typing = false;
        state.b.choiceVisible = false;
        state.b.mode = 'intro';
        state.b.selected = [...transferItems];
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

    function goToNextPhase() {
      const finishedCondition = getCurrentCondition();
      clearTimers();
      resetConditionState(finishedCondition);

      if (state.currentStep < 2) {
        state.phase = 'interstitial';
        state.conditionPhase = 1;
      } else {
        state.phase = 'end';
        state.conditionPhase = 1;
      }
      render();
    }

    function startNextCondition() {
      state.currentStep += 1;
      state.phase = 'condition';
      state.conditionPhase = 1;
      render();
    }

    function runTerminalSequence() {
      state.a.visibleLines = 0;
      state.a.ready = false;
      render();

      terminalLines.forEach((_, index) => {
        schedule(() => {
          state.a.visibleLines = index + 1;
          render();
        }, index * 500);
      });

      schedule(() => {
        state.a.ready = true;
        render();
      }, terminalLines.length * 500 + 1000);
    }

    function queueClaudeMessages(messages, options = {}) {
      const { initialDelay = 0, done } = options;
      let offset = initialDelay;

      messages.forEach((message) => {
        schedule(() => {
          state.b.typing = true;
          render();
        }, offset);

        offset += 1000;

        schedule(() => {
          state.b.typing = false;
          state.b.messages.push(message);
          render();
        }, offset);

        offset += 800;
      });

      if (done) {
        schedule(done, offset);
      }
    }

    function initConditionIfNeeded(screenKey) {
      if (state.lastScreenKey === screenKey) return;
      state.lastScreenKey = screenKey;
      clearTimers();

      if (screenKey === 'condition-A-3') {
        runTerminalSequence();
        return;
      }

      if (screenKey === 'condition-B-3') {
        state.b.messages = [];
        state.b.typing = false;
        state.b.choiceVisible = false;
        state.b.mode = 'intro';
        queueClaudeMessages(claudeIntroBubbles, {
          done: () => {
            state.b.choiceVisible = true;
            render();
          }
        });
        return;
      }

      if (screenKey === 'condition-B-4') {
        state.b.messages = [];
        state.b.choiceVisible = false;
        state.b.typing = false;
        state.b.mode = 'done';
        queueClaudeMessages([
          '알겠어요! 바로 이식할게요 🙂',
          '완료됐어요! 앞으로도 잘 부탁드려요 😊'
        ], {
          done: () => render()
        });
        return;
      }

    }

    function renderStart() {
      return `
        <div class="screen centered">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>연구 프로토타입</span></div>
          <div class="logo">BAIGE</div>
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
        </div>
      `;
    }

    function renderScenario() {
      const scenarioText = `당신은 지난 6개월간 ChatGPT를 주 3회 이상 사용해왔습니다.
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

      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>시나리오</span></div>
          <div class="condition-header">
            <h1 class="title">먼저 아래 상황을 읽어주세요</h1>
            <p class="subtitle">당신이 새 AI로 옮겨갈 때, 무엇이 이어지고 무엇이 끊기는지를 상상하며 읽어주세요.</p>
          </div>
          <div class="card">
            <p class="scenario-body">${escapeHtml(scenarioText)}</p>
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
        </div>
      `;
    }

    function renderConditionIntro(letter) {
      const content = {
        A: {
          title: '방식 A. AI to AI',
          description: '기존 AI에서 내보낸 데이터를 새로운 AI로 옮긴 뒤, 두 AI가 백그라운드에서 알아서 정리하고 이식하는 방식입니다.',
          button: '이식 시작하기',
          mode: '자동 위임형 · 백그라운드 처리'
        },
        B: {
          title: '방식 B. AI to Human to AI',
          description: '기존 AI에서 가져온 데이터를 새로운 AI가 먼저 정리해 보여주고, 사용자가 확인한 뒤 이식하는 방식입니다.',
          button: '대화 시작하기',
          mode: '제안-확인형 · 사용자 승인'
        },
        C: {
          title: '방식 C. Human to AI',
          description: '기존 AI에서 데이터를 내보낸 뒤, 사용자가 직접 내용을 살펴보고 옮길 대화를 골라 새로운 AI에 업로드하는 방식입니다.',
          button: '데이터 내보내기 시작',
          mode: '직접 선별형 · 사용자 선택'
        }
      }[letter];

      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>조건 ${getConditionNumber()}</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          <div class="condition-mode">${content.mode}</div>
          <div>
            <h1 class="title">${content.title}</h1>
            <p class="subtitle">${content.description}</p>
          </div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="condition-intro-next">${content.button}</button>
          </div>
        </div>
      `;
    }

    function renderStepStrip(steps, activeIndex) {
      return `
        <div class="step-strip">
          ${steps.map((step, index) => `
            <div class="step-box ${index === activeIndex ? 'active' : ''}">${step}</div>
          `).join('')}
        </div>
      `;
    }

    function renderConditionA2() {
      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>자동 이식</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI끼리 자동 정리'], 1)}
          <div class="card">
            <h2 class="explorer-title">기존 AI 데이터 패키지</h2>
            <p class="subtitle">기존 AI에서 내보낸 사용자 맥락 데이터가 새로운 AI로 전달됩니다. 이 단계에서는 별도의 확인 없이 자동으로 다음 단계로 이어집니다.</p>
          </div>
          <div class="card">
            <div class="plain-list">
              <div class="plain-item">✓ 기능적 맥락 3개 포함</div>
              <div class="plain-item">✓ 관계적 맥락 3개 포함</div>
              <div class="plain-item">✓ 새 AI 작업 공간으로 자동 전송 준비 완료</div>
            </div>
          </div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="a-begin-auto">새로운 AI에 데이터 옮기기 →</button>
          </div>
        </div>
      `;
    }

    function renderConditionA3() {
      const visible = terminalLines.slice(0, state.a.visibleLines);
      const progressWidth = `${(state.a.visibleLines / terminalLines.length) * 100}%`;
      return `
        <div class="terminal-shell">
          <div class="terminal-screen">
            <div class="terminal-bar">● AI-to-AI 데이터 전송 프로토콜</div>
            <div class="terminal-content ${state.a.ready ? 'blurred' : ''}">
              ${visible.map((line) => `<div class="terminal-line">${escapeHtml(line)}</div>`).join('')}
              ${state.a.ready ? '<div class="terminal-overlay">AI 간 정리 대화는 자동 처리되었습니다.<br>세부 내용은 직접 확인할 수 없습니다.</div>' : ''}
            </div>
            <div class="terminal-bottom">
              <div class="terminal-progress-track">
                <div class="terminal-progress" style="width:${progressWidth}"></div>
              </div>
              ${state.a.ready ? '<button class="btn-primary" data-action="a-complete">옮겨진 내용 요약 보기 →</button>' : ''}
            </div>
          </div>
        </div>
      `;
    }

    function renderConditionA4() {
      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>이식 요약</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI끼리 자동 정리'], 2)}
          <div>
            <h1 class="title">자동 이식 요약</h1>
            <p class="system-note">AI 간 자동 정리를 거쳐 총 6개 항목이 새로운 AI에 반영되었습니다.</p>
          </div>
          <div class="card completion-list">
            <div class="plain-list">
              ${transferItems.map((item) => `<div class="plain-item">✓ ${item}</div>`).join('')}
            </div>
          </div>
          <div class="recall-note">이 방식에서는 무엇이 옮겨졌는지 결과 요약만 확인할 수 있었습니다. 설문에서는 이 점이 연속감과 신뢰에 어떤 영향을 주었는지 떠올려 주세요.</div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>
          </div>
        </div>
      `;
    }

    function renderChatMessages() {
      const messages = state.b.messages.map((message) => `
        <div class="chat-row">
          <div class="avatar">C</div>
          <div class="chat-bubble">${escapeHtml(message)}</div>
        </div>
      `).join('');

      const typing = state.b.typing ? `
        <div class="chat-row">
          <div class="avatar">C</div>
          <div class="chat-bubble typing-bubble">
            <div class="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      ` : '';

      return messages + typing;
    }

    function renderConditionB2() {
      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>이식 준비</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI가 제안 후 확인'], 1)}
          <div class="card">
            <h2 class="explorer-title">새로운 AI로 데이터 옮기기</h2>
            <p class="subtitle">기존 AI에서 내보낸 데이터가 새로운 AI에 전달되었습니다. 이제 새로운 AI가 어떤 맥락을 옮길지 먼저 정리해서 알려드립니다.</p>
          </div>
          <div class="card">
            <div class="plain-list">
              <div class="plain-item">✓ 기능적 맥락 3개 수신</div>
              <div class="plain-item">✓ 관계적 맥락 3개 수신</div>
              <div class="plain-item">→ 다음 단계에서 새 AI가 정리안을 먼저 제안합니다</div>
            </div>
          </div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="b-begin-review">새로운 AI의 정리안 보기 →</button>
          </div>
        </div>
      `;
    }

    function renderConditionB3Review() {
      return `
        <div class="screen chat-screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>정리안 제안</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI가 제안 후 확인'], 2)}
          <div class="chat-section-note">새로운 AI가 옮겨질 맥락을 먼저 정리해 설명합니다. 사용자는 이를 읽고 그대로 승인하거나 일부를 조정할 수 있습니다.</div>
          <div class="chat-list">${renderChatMessages()}</div>
          <div class="btn-stack">
            ${state.b.choiceVisible ? `
              <button class="btn-secondary" data-action="b-modify">수정하기</button>
              <button class="btn-primary" data-action="b-accept">이대로 이식하기</button>
            ` : ''}
          </div>
        </div>
      `;
    }

    function renderConditionB3Confirm() {
      return `
        <div class="screen chat-screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>이식 완료</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI가 제안 후 확인'], 2)}
          <div class="chat-list">${renderChatMessages()}</div>
          <div class="recall-note">이 방식에서는 새로운 AI가 먼저 정리안을 보여주고, 그 뒤에 사용자가 승인했습니다. 설문에서는 이 확인 과정이 얼마나 신뢰감을 주었는지 떠올려 주세요.</div>
          <div class="btn-stack">
            ${state.b.messages.length >= 2 && !state.b.typing ? '<button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>' : ''}
          </div>
        </div>
      `;
    }

    function renderConditionBModify() {
      return `
        <div class="screen chat-screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>수정 선택</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI가 제안 후 확인'], 2)}
          <div class="chat-list">
            ${renderChatMessages()}
            <div class="checkbox-list">
              ${transferItems.map((item) => `
                <label class="checkbox-item">
                  <input type="checkbox" data-item="${escapeHtml(item)}" ${state.b.selected.includes(item) ? 'checked' : ''} />
                  <span>${item}</span>
                </label>
              `).join('')}
            </div>
          </div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="b-complete-selection">선택 완료</button>
          </div>
        </div>
      `;
    }

    function renderConditionBDoneAfterModify() {
      return `
        <div class="screen chat-screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>이식 완료</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 새로운 AI로 옮기기', '3. AI가 제안 후 확인'], 2)}
          <div class="chat-list">${renderChatMessages()}</div>
          <div class="recall-note">이 방식에서는 어떤 맥락을 옮길지 직접 조정할 수 있었습니다. 설문에서는 이 통제감이 어떤 느낌을 만들었는지 떠올려 주세요.</div>
          <div class="btn-stack">
            ${state.b.messages.length >= 3 && !state.b.typing ? '<button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>' : ''}
          </div>
        </div>
      `;
    }

    function renderConditionC2() {
      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>내보내기</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 옮길 내용 직접 보기', '3. 새로운 AI로 옮기기'], 0)}
          <div class="card">
            <h2 class="explorer-title">기존 AI 설정</h2>
            <p class="explorer-subtitle">설정 &gt; 데이터 제어 &gt; 데이터 내보내기</p>
          </div>
          <div class="card">
            <p class="subtitle">기존 AI의 전체 대화 데이터를 내보냅니다. 이후 사용자가 직접 내용을 보며 무엇을 새로운 AI로 옮길지 선택하게 됩니다.</p>
          </div>
          ${state.c.toastVisible ? '<div class="toast">✓ 데이터 준비가 완료되었습니다. 이메일로 다운로드 링크가 발송되었습니다.</div>' : ''}
          <div class="btn-stack">
            ${!state.c.exportReady
              ? '<button class="btn-primary" data-action="c-export">내 데이터 내보내기</button>'
              : '<button class="btn-primary" data-action="c-download">ZIP 파일 다운로드</button>'}
          </div>
        </div>
      `;
    }

    function renderFolderRows() {
      return folderData.map((folder, index) => {
        const selected = state.c.selectedFolders.includes(folder.id);
        const badgeVisible = index >= 1 && index <= 3 && state.c.selectedFolders.length >= 1;
        return `
          <div class="file-row ${selected ? 'selected' : ''}" data-action="open-folder" data-folder="${folder.id}">
            <div class="file-name">
              <div>📁 ${folder.id}</div>
              ${badgeVisible && folder.snippet ? `<div class="file-preview">${escapeHtml(folder.snippet)}</div>` : ''}
            </div>
            <div class="file-meta">
              ${selected ? '<span>✓</span>' : ''}
              ${badgeVisible ? '<span class="badge">미리보기 가능</span>' : ''}
            </div>
          </div>
        `;
      }).join('') + `
        <div class="file-row">
          <div class="file-name">    ... (119개 더)</div>
          <div class="file-meta"></div>
        </div>
        <div class="file-row">
          <div class="file-name">📄 conversations.json    892KB</div>
          <div class="file-meta"></div>
        </div>
        <div class="file-row">
          <div class="file-name">📄 user.json               2KB</div>
          <div class="file-meta"></div>
        </div>
        <div class="file-row">
          <div class="file-name">📄 message_feedback.json  14KB</div>
          <div class="file-meta"></div>
        </div>
      `;
    }

    function renderConditionC3() {
      const selectedCount = state.c.selectedFolders.length;
      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>파일 탐색</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 옮길 내용 직접 보기', '3. 새로운 AI로 옮기기'], 1)}
          <div class="file-explorer">
            <div class="explorer-header">
              <h2 class="explorer-title">📁 chatgpt_export_2024.zip</h2>
              <p class="explorer-subtitle">파일 127개</p>
            </div>
            <div style="padding:16px;">
              <div class="warning">⚠ 폴더 이름은 대화 ID로만 표시됩니다. 내용을 확인하려면 직접 열어봐야 합니다.</div>
            </div>
            <div class="file-list">
              ${renderFolderRows()}
            </div>
          </div>
          <div class="toolbar">
            ${selectedCount > 0 ? `<div class="count">선택된 대화: ${selectedCount} / 127</div>` : ''}
          </div>
          <p class="system-note">폴더를 눌러 내용을 확인하세요. 이 단계에서는 사용자가 직접 내용을 살펴보며 어떤 맥락을 옮길지 판단합니다.</p>
          <div class="warning">선택하지 않은 대화는 새로운 AI가 참고할 수 없습니다. 필요한 맥락을 놓치지 않으려면 여러 폴더를 직접 확인해야 합니다.</div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="c-upload-screen" ${selectedCount === 0 ? 'disabled' : ''}>선택한 대화만 Claude에 업로드하기</button>
          </div>
        </div>
      `;
    }

    function renderConditionC4() {
      const folder = folderData.find((item) => item.id === state.c.activeFolder) || folderData[0];
      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>대화 확인</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 옮길 내용 직접 보기', '3. 새로운 AI로 옮기기'], 1)}
          <div class="card">
            <h2 class="explorer-title">📁 ${folder.id}</h2>
          </div>
          <div class="card">
            ${Array.from({ length: 6 }).map((_, index) => `
              <div class="folder-file">
                <span>📄 message_${String(index + 1).padStart(4, '0')}.json    ${index % 3 === 0 ? '3KB' : index % 3 === 1 ? '2KB' : '4KB'}</span>
                ${index === 0 ? '<button class="btn-inline" data-action="c-toggle-preview">미리보기</button>' : ''}
              </div>
            `).join('')}
            <div class="folder-file">
              <span>...</span>
              <span>📄 message_0047.json    1KB</span>
            </div>
          </div>
          ${state.c.previewOpen ? `
            <pre class="code-block">${escapeHtml(folder.preview || folderData[0].preview)}</pre>
            <p class="system-note">이것이 실제 대화 내용입니다.</p>
          ` : ''}
          <div class="btn-stack">
            <button class="btn-secondary" data-action="c-back-to-zip">← 뒤로</button>
            <button class="btn-primary" data-action="c-select-folder">이 대화 선택하기</button>
          </div>
        </div>
      `;
    }

    function renderConditionC5() {
      const selectedCount = state.c.selectedFolders.length;
      const unselectedCount = 127 - selectedCount;
      return `
        <div class="screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>업로드</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          ${renderStepStrip(['1. 기존 AI에서 내보내기', '2. 옮길 내용 직접 보기', '3. 새로운 AI로 옮기기'], 2)}
          <div>
            <h1 class="title">Claude에 업로드</h1>
            <p class="subtitle">직접 골라낸 대화만 업로드됩니다. 선택하지 않은 맥락은 새 AI가 알 수 없습니다.</p>
          </div>
          <div class="chip-wrap">
            ${state.c.selectedFolders.map((id) => `
              <div class="chip">
                <span>${id.replace('...', '....json')}</span>
                <button data-action="c-remove-chip" data-folder="${id}">×</button>
              </div>
            `).join('')}
          </div>
          <textarea data-role="c-note" placeholder="Claude에게 추가로 전달할 내용이 있으면 입력하세요.
(예: 이 대화들을 참고해서 나에 대해 파악해줘)">${escapeHtml(state.c.note)}</textarea>
          <div class="btn-stack">
            <button class="btn-primary" data-action="c-submit-upload" ${selectedCount === 0 ? 'disabled' : ''}>업로드하기</button>
          </div>
          <p class="system-note">현재 선택하지 않은 대화는 업로드 대상에서 제외됩니다. 남은 대화 수: ${unselectedCount}개</p>
        </div>
      `;
    }

    function renderConditionC6() {
      const omitted = 127 - state.c.selectedFolders.length;
      return `
        <div class="screen chat-screen">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>업로드 완료</span></div>
          <div class="condition-header">
            <div class="condition-label">방식 ${getConditionNumber()} / 3</div>
            <div class="progress-track"><div class="progress" style="width:${getConditionProgressWidth()}%"></div></div>
          </div>
          <div class="chat-list">
            <div class="chat-row">
              <div class="avatar">C</div>
              <div class="chat-bubble">네, 업로드해주신 대화들을 확인했어요. 파악한 내용을 바탕으로 도와드릴게요.</div>
            </div>
          </div>
          <p class="system-note">선택하지 않은 [${omitted}]개 대화는 이전되지 않았습니다.</p>
          <div class="recall-note">이 방식에서는 사용자가 직접 파일을 살펴보고 옮길 내용을 골라야 했습니다. 설문에서는 이 선택 과정이 얼마나 수고롭거나 통제감 있게 느껴졌는지 떠올려 주세요.</div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="finish-condition">설문으로 돌아가서 응답하기 →</button>
          </div>
        </div>
      `;
    }

    function renderInterstitial() {
      const currentDone = state.currentStep + 1;
      const marks = [1, 2, 3].map((n) => {
        if (n < currentDone + 1) return `✓ 방식 ${n}`;
        if (n === currentDone + 1) return `● 방식 ${n}`;
        return `○ 방식 ${n}`;
      }).join('&nbsp;&nbsp;');

      return `
        <div class="screen centered">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>다음 조건</span></div>
          <div>
            <h1 class="title">잘 하셨어요! 다음 방식을 체험할 차례예요.</h1>
            <p class="subtitle">${currentDone}번째 방식 체험이 완료되었습니다. 설문 응답을 마치셨으면 아래 버튼을 눌러 다음 방식을 체험해 주세요.</p>
          </div>
          <div class="research-note">각 이식 방식은 같은 기능적/관계적 데이터를 옮기더라도, 사용자가 느끼는 '관계적 연속성'과 '시스템 신뢰도'가 어떻게 달라지는지 검증하기 위해 의도적으로 다르게 설계되었습니다.</div>
          <div class="interstitial-progress">${marks}</div>
          <div class="btn-stack">
            <button class="btn-primary" data-action="start-next-condition">다음 방식 체험하기 →</button>
          </div>
        </div>
      `;
    }

    function renderEnd() {
      return `
        <div class="screen centered">
          <div class="app-topbar"><span class="app-brand">Claude</span><span>체험 종료</span></div>
          <div>
            <h1 class="title">모든 체험이 완료되었습니다 :)</h1>
            <div class="interstitial-progress">✓ 방식 1&nbsp;&nbsp;✓ 방식 2&nbsp;&nbsp;✓ 방식 3</div>
            <p class="subtitle">세 가지 방식을 모두 체험하셨습니다. 설문으로 돌아가서 마지막 질문들에 응답해 주세요.</p>
          </div>
          <div class="research-note">이제 방금 체험하신 세 가지 각 방식에 대해, 기존 맥락이 얼마나 이어졌다고 느꼈는지(관계적 연속성), 새 AI를 얼마나 믿을 수 있었는지(시스템 신뢰도), 그리고 다시 적응시키는 데 어떤 노력이 들었는지(재설정 노력)를 본 설문지에서 응답해 주세요.</div>
          <div class="btn-stack">
            <button class="btn-primary" type="button">설문 마무리하러 가기 →</button>
          </div>
        </div>
      `;
    }

    function getScreenMarkup() {
      if (state.phase === 'start') return renderStart();
      if (state.phase === 'scenario') return renderScenario();
      if (state.phase === 'interstitial') return renderInterstitial();
      if (state.phase === 'end') return renderEnd();

      const condition = getCurrentCondition();
      if (condition === 'A') {
        if (state.conditionPhase === 1) return renderConditionIntro('A');
        if (state.conditionPhase === 2) return renderConditionA2();
        if (state.conditionPhase === 3) return renderConditionA3();
        return renderConditionA4();
      }

      if (condition === 'B') {
        if (state.conditionPhase === 1) return renderConditionIntro('B');
        if (state.conditionPhase === 2) return renderConditionB2();
        if (state.conditionPhase === 3) return renderConditionB3Review();
        if (state.conditionPhase === 4) return renderConditionB3Confirm();
        if (state.conditionPhase === 5) return renderConditionBModify();
        return renderConditionBDoneAfterModify();
      }

      if (state.conditionPhase === 1) return renderConditionIntro('C');
      if (state.conditionPhase === 2) return renderConditionC2();
      if (state.conditionPhase === 3) return renderConditionC3();
      if (state.conditionPhase === 4) return renderConditionC4();
      if (state.conditionPhase === 5) return renderConditionC5();
      return renderConditionC6();
    }

    function render() {
      const screenKey = `${state.phase}-${getCurrentCondition() || 'none'}-${state.conditionPhase}`;
      const terminalMode = state.phase === 'condition' && getCurrentCondition() === 'A' && state.conditionPhase === 3;

      app.innerHTML = `
        <div class="screen-shell ${terminalMode ? 'terminal-shell' : ''}">
          ${getScreenMarkup()}
        </div>
      `;

      requestAnimationFrame(() => {
        const shell = app.querySelector('.screen-shell');
        if (shell) shell.classList.add('visible');
      });

      initConditionIfNeeded(screenKey);
    }

    app.addEventListener('click', (event) => {
      const target = event.target.closest('[data-action]');
      if (!target) return;

      const action = target.dataset.action;

      if (action === 'start') {
        state.phase = 'scenario';
        state.conditionPhase = 1;
        render();
        return;
      }

      if (action === 'begin-experience') {
        state.phase = 'condition';
        state.currentStep = 0;
        state.conditionPhase = 1;
        render();
        return;
      }

      if (action === 'condition-intro-next') {
        state.conditionPhase += 1;
        render();
        return;
      }

      if (action === 'a-begin-auto') {
        state.conditionPhase = 3;
        render();
        return;
      }

      if (action === 'a-complete') {
        state.conditionPhase = 4;
        render();
        return;
      }

      if (action === 'finish-condition') {
        goToNextPhase();
        return;
      }

      if (action === 'start-next-condition') {
        startNextCondition();
        return;
      }

      if (action === 'b-begin-review') {
        state.conditionPhase = 3;
        render();
        return;
      }

      if (action === 'b-accept') {
        state.conditionPhase = 4;
        render();
        return;
      }

      if (action === 'b-modify') {
        state.conditionPhase = 5;
        render();
        return;
      }

      if (action === 'b-complete-selection') {
        state.conditionPhase = 6;
        state.b.messages = ['어떤 내용을 빼드릴까요?'];
        state.b.typing = false;
        render();
        queueClaudeMessages([
          '확인했어요! 선택하신 내용으로 이식할게요.',
          '완료됐어요! 이제 선택하신 내용만 반영해서 도와드릴게요 😊'
        ], {
          initialDelay: 100,
          done: () => render()
        });
        return;
      }

      if (action === 'c-export') {
        state.c.toastVisible = true;
        state.c.exportReady = true;
        render();
        return;
      }

      if (action === 'c-download') {
        state.conditionPhase = 3;
        render();
        return;
      }

      if (action === 'open-folder') {
        state.c.activeFolder = target.dataset.folder;
        state.c.previewOpen = true;
        state.conditionPhase = 4;
        render();
        return;
      }

      if (action === 'c-back-to-zip') {
        state.conditionPhase = 3;
        render();
        return;
      }

      if (action === 'c-toggle-preview') {
        state.c.previewOpen = !state.c.previewOpen;
        render();
        return;
      }

      if (action === 'c-select-folder') {
        const folderId = state.c.activeFolder || folderData[0].id;
        if (!state.c.selectedFolders.includes(folderId)) {
          state.c.selectedFolders.push(folderId);
        }
        state.conditionPhase = 3;
        render();
        return;
      }

      if (action === 'c-upload-screen') {
        state.conditionPhase = 5;
        render();
        return;
      }

      if (action === 'c-remove-chip') {
        const folderId = target.dataset.folder;
        state.c.selectedFolders = state.c.selectedFolders.filter((id) => id !== folderId);
        render();
        return;
      }

      if (action === 'c-submit-upload') {
        state.conditionPhase = 6;
        render();
      }
    });

    app.addEventListener('change', (event) => {
      const checkbox = event.target.closest('input[type="checkbox"][data-item]');
      if (!checkbox) return;
      const item = checkbox.dataset.item;
      if (checkbox.checked) {
        if (!state.b.selected.includes(item)) state.b.selected.push(item);
      } else {
        state.b.selected = state.b.selected.filter((value) => value !== item);
      }
    });

    app.addEventListener('input', (event) => {
      const textarea = event.target.closest('[data-role="c-note"]');
      if (!textarea) return;
      state.c.note = textarea.value;
    });

    render();
