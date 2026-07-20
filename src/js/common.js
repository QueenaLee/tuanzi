/* ═══ HTML ESCAPE (防 XSS) ═══ */
function esc(s) { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

function escAttr(s) { return s.replace(/&/g,'&amp;').replace(/'/g,'&#39;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* ═══ DATA COMPAT & DYNAMIC INIT ═══ */
// HANZI_LIST is defined in data.js (flattened, no categories)
// Category display names (Chinese labels for tabs)
const CAT_LABELS = {
  word: '📚 单词',
  sentence: '💬 短语',
};

// Initialize dynamic tabs on page load
/* ═══════════════════════════════════════════
   HOME SUBJECT TAB SWITCH
═══════════════════════════════════════════ */
function switchSubjectTab(tab) {
  document.querySelectorAll('.home-subject-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  document.querySelectorAll('.home-tab-panel').forEach(el => {
    el.classList.toggle('active', el.id === 'tab-' + tab);
  });
  window.scrollTo(0, 0);
}
/* ═══════════════════════════════════════════
   EMOJI IMAGE HELPER
═══════════════════════════════════════════ */
function emojiHtml(w, size) {
  if (w.img) return `<img src="${escAttr(w.img)}" alt="${escAttr(w.en)}" style="width:${size}px;height:${size}px;vertical-align:middle;object-fit:contain;" loading="lazy">`;
  return w.emoji;
}

/* ═══════════════════════════════════════════
   PAGE NAVIGATION
═══════════════════════════════════════════ */
function showPage(id) {
  // 离开任何页面时，停止所有语音和计时器
  speechSynthesis.cancel();
  _stopKeepalive();
  _resetAllPlayBtns();
  [songTimers, engRhymeTimers, rhymeTimers].forEach(arr => { arr.forEach(t => clearTimeout(t)); arr.length = 0; });
  // 停止乘法口诀整体朗读
  if (typeof timesReadTimers !== 'undefined') {
    timesReadTimers.forEach(t => clearTimeout(t));
    timesReadTimers = [];
    timesReadingAll = false;
    const btn = document.getElementById('times-read-all-btn');
    if (btn) btn.textContent = '▶ 读整体口诀';
    document.querySelectorAll('.times-cell.reading').forEach(el => el.classList.remove('reading'));
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  // 每次进入边学边记页面，重新随机排列所有单词
  if (id === 'word-flash') { wfInitWords(); wfSwitchTab('words'); }

  // 有子页面的模块，进入时硬重置所有子区，只显示 home
  const SUB_PAGES = {
    pinyin:  ['home','initials','tones','blend','songs'],
    phonics: ['home','letters','vowels','cvc','songs'],
    hanzi:   ['home','cards','stroke','quiz'],
  };
  if (id === 'math') {
    document.getElementById('math-level-screen').style.display = 'block';
    document.getElementById('math-game-screen').style.display  = 'none';
  } else if (SUB_PAGES[id]) {
    SUB_PAGES[id].forEach(sub => {
      const el = document.getElementById(`${id}-${sub}`);
      if (el) el.style.display = sub === 'home' ? 'block' : 'none';
    });
  }

  window.scrollTo(0, 0);
}
/* ═══════════════════════════════════════════
   QUIZ
═══════════════════════════════════════════ */
let quizQueue = [];
let quizIdx = 0;
let quizCorrect = 0;
let quizAnswered = false;
let quizAutoNextTimer = null;  // 答对后自动切换下一题的计时器
const AUTO_NEXT_DELAY = 3000;  // 答对后 3 秒自动进入下一题
let quizCurrentWord = null;
let lastGameMode = 'quiz';
function getImageWords() {
  return WORDS_LIST.filter(w => w.img);
}

function getAllWords() {
  return [...WORDS_LIST];
}

let _quizAllWords = [];  // 全部有图单词缓存
function startQuiz() {
  lastGameMode = 'quiz';
  _quizAllWords = shuffle(getImageWords());
  quizQueue = [..._quizAllWords];
  quizIdx = 0;
  quizCorrect = 0;
  showPage('quiz');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  // 做完一轮自动重新洗牌继续
  if (quizIdx >= quizQueue.length) {
    quizQueue = shuffle([..._quizAllWords]);
    quizIdx = 0;
  }

  quizAnswered = false;
  const word = quizQueue[quizIdx];
  quizCurrentWord = word;
  document.getElementById('quiz-word').textContent = word.en;
  document.getElementById('quiz-progress-label').textContent = `第 ${quizIdx + 1} 题`;
  document.getElementById('quiz-progress-fill').style.width = `${((quizIdx % 10 + 1) / 10) * 100}%`;
  document.getElementById('quiz-next').disabled = true;
  // Build 4 options: correct + 3 wrong from same or mixed pool
  const allWords = getImageWords();
  const others = shuffle(allWords.filter(w => w.en !== word.en)).slice(0, 3);
  const options = shuffle([word, ...others]);
  const optsEl = document.getElementById('quiz-opts');
  optsEl.innerHTML = options.map(o => `
    <div class="quiz-opt" onclick="quizSelect(this,'${escAttr(o.en)}','${escAttr(word.en)}')" aria-label="${escAttr(o.en)}">
      <span style="font-size:44px">${emojiHtml(o, 44)}</span>
    </div>
  `).join('');
  // Auto speak the word
  setTimeout(() => speakWordText(word.en), 400);
}

function quizSelect(el, chosen, correct) {
  if (quizAnswered) return;
  if (el.classList.contains('wrong')) return;  // 已选错的选项不再响应
  const isCorrect = chosen === correct;
  if (isCorrect) {
    quizAnswered = true;
    el.classList.add('correct');
    quizCorrect++;
    burst(el);
    document.getElementById('quiz-next').disabled = false;
    // 答对后 3 秒自动进入下一题
    if (quizAutoNextTimer) clearTimeout(quizAutoNextTimer);
    quizAutoNextTimer = setTimeout(() => { quizAutoNextTimer = null; quizNext(); }, AUTO_NEXT_DELAY);
  } else {
    el.classList.add('wrong');
    // 选错不锁定，允许继续选其他选项
  }
}

function quizNext() {
  if (quizAutoNextTimer) { clearTimeout(quizAutoNextTimer); quizAutoNextTimer = null; }
  quizIdx++;
  renderQuizQuestion();
}

function showQuizResult() {
  const score = quizCorrect;
  const total = quizQueue.length;
  document.getElementById('result-trophy').textContent = score >= 8 ? '🏆' : score >= 5 ? '🥈' : '🌟';
  document.getElementById('result-title').textContent = score >= 8 ? '超级棒！' : score >= 5 ? '不错哦！' : '继续加油！';
  document.getElementById('result-sub').textContent = '你答对了';
  document.getElementById('result-score').textContent = `${score} / ${total}`;
  document.getElementById('result-stars').textContent = score >= 8 ? '⭐⭐⭐' : score >= 5 ? '⭐⭐' : '⭐';
  document.getElementById('result-replay-btn').onclick = startQuiz;
  showPage('result');
  if (score >= 8) setTimeout(bigBurst, 300);
}

/* ═══════════════════════════════════════════
   MATCH
═══════════════════════════════════════════ */
let matchWords = [];
let matchPics  = [];
let matchSelectedWord = null;
let matchSelectedPic  = null;
let matchMatched = 0;
let matchTotal = 5;
function startMatch() {
  lastGameMode = 'match';
  const all = getImageWords();
  const picked = shuffle(all).slice(0, matchTotal);
  matchWords = shuffle([...picked]);
  matchPics  = shuffle([...picked]);
  matchSelectedWord = null;
  matchSelectedPic  = null;
  matchMatched = 0;
  showPage('match');
  renderMatch();
}

function renderMatch() {
  document.getElementById('match-score').textContent = `已消除：${matchMatched} / ${matchTotal} 对`;
  const board = document.querySelector('.match-board');
  board.innerHTML = matchWords.map((w, i) => `
    <div class="match-row">
      <div class="match-card" id="mw-${i}" onclick="matchSelectWord(${i})" aria-label="${escAttr(w.en)}">
        <div class="m-word">${esc(w.en)}</div>
      </div>
      <div class="match-card" id="mp-${i}" onclick="matchSelectPic(${i})" aria-label="${escAttr(matchPics[i].zh)}">
        <div class="m-emoji">${emojiHtml(matchPics[i], 42)}</div>
      </div>
    </div>
  `).join('');
}

function matchSelectWord(i) {
  const el = document.getElementById(`mw-${i}`);
  if (!el || el.classList.contains('matched')) return;
  if (matchSelectedWord !== null) {
    const prev = document.getElementById(`mw-${matchSelectedWord}`);
    if (prev) prev.classList.remove('selected');
  }

  matchSelectedWord = i;
  el.classList.add('selected');
  speakWordText(matchWords[i].en);
  checkMatchPair();
}

function matchSelectPic(i) {
  const el = document.getElementById(`mp-${i}`);
  if (!el || el.classList.contains('matched')) return;
  if (matchSelectedPic !== null) {
    const prev = document.getElementById(`mp-${matchSelectedPic}`);
    if (prev) prev.classList.remove('selected');
  }

  matchSelectedPic = i;
  el.classList.add('selected');
  checkMatchPair();
}

function checkMatchPair() {
  if (matchSelectedWord === null || matchSelectedPic === null) return;
  const wWord = matchWords[matchSelectedWord];
  const pWord = matchPics[matchSelectedPic];
  const wEl = document.getElementById(`mw-${matchSelectedWord}`);
  const pEl = document.getElementById(`mp-${matchSelectedPic}`);
  if (wWord.en === pWord.en) {
    // Correct match
    matchMatched++;
    burst(wEl);
    setTimeout(() => {
      wEl.classList.add('matched');
      pEl.classList.add('matched');
    }, 200);
    matchSelectedWord = null;
    matchSelectedPic  = null;
    document.getElementById('match-score').textContent = `已消除：${matchMatched} / ${matchTotal} 对`;
    if (matchMatched >= matchTotal) {
      setTimeout(() => { showMatchResult(); }, 700);
    }

  } else {
    // Wrong
    wEl.classList.add('wrong-flash');
    pEl.classList.add('wrong-flash');
    setTimeout(() => {
      wEl.classList.remove('wrong-flash', 'selected');
      pEl.classList.remove('wrong-flash', 'selected');
    }, 500);
    matchSelectedWord = null;
    matchSelectedPic  = null;
  }

}

function showMatchResult() {
  document.getElementById('result-trophy').textContent = '🏆';
  document.getElementById('result-title').textContent = '全部消除！太厉害啦！';
  document.getElementById('result-sub').textContent = '配对全部正确';
  document.getElementById('result-score').textContent = `${matchTotal} / ${matchTotal}`;
  document.getElementById('result-stars').textContent = '⭐⭐⭐';
  document.getElementById('result-replay-btn').onclick = startMatch;
  showPage('result');
  setTimeout(bigBurst, 300);
}

function replayGame() {
  if (lastGameMode === 'match') startMatch();
  else startQuiz();
}
/* ═══════════════════════════════════════════
   EFFECTS
═══════════════════════════════════════════ */
function burst(el) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const stars = ['⭐','✨','🌟','💫'];
  const container = document.getElementById('confetti');
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('div');
    s.className = 'star-particle';
    s.textContent = stars[i % stars.length];
    s.style.left = (cx + (Math.random() - 0.5) * 80) + 'px';
    s.style.top  = (cy + (Math.random() - 0.5) * 80) + 'px';
    s.style.animationDelay = (i * 60) + 'ms';
    container.appendChild(s);
    setTimeout(() => s.remove(), 900);
  }

}

function bigBurst() {
  const container = document.getElementById('confetti');
  const stars = ['⭐','✨','🌟','💫','🎉','🎊','🥳'];
  for (let i = 0; i < 20; i++) {
    const s = document.createElement('div');
    s.className = 'star-particle';
    s.textContent = stars[Math.floor(Math.random() * stars.length)];
    s.style.left  = (Math.random() * window.innerWidth) + 'px';
    s.style.top   = (Math.random() * window.innerHeight * 0.6) + 'px';
    s.style.fontSize = (18 + Math.random() * 20) + 'px';
    s.style.animationDelay = (i * 60) + 'ms';
    s.style.animationDuration = (0.6 + Math.random() * 0.6) + 's';
    container.appendChild(s);
    setTimeout(() => s.remove(), 1500);
  }

}

/* ═══════════════════════════════════════════
   SPEECH
═══════════════════════════════════════════ */
// 语音引擎初始化：自动挑选最像人声的 voice（Google/Microsoft > 系统语音 > 默认）
let _voiceEN = null;
let _voiceZH = null;

function _initVoices() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return;
  const enPriority = [
    v => /google/i.test(v.name) && /en[-_]US/i.test(v.lang),
    v => /microsoft.*aria/i.test(v.name),
    v => /microsoft.*jenny/i.test(v.name),
    v => /microsoft.*guy/i.test(v.name),
    v => /microsoft/i.test(v.name) && /en[-_]US/i.test(v.lang),
    v => /samantha/i.test(v.name),
    v => /karen/i.test(v.name),
    v => /en[-_]US/i.test(v.lang),
    v => /^en/i.test(v.lang),
  ];
  const zhPriority = [
    v => /google/i.test(v.name) && /zh[-_]CN/i.test(v.lang),
    v => /microsoft.*xiaoxiao/i.test(v.name),
    v => /microsoft.*yunxi/i.test(v.name),
    v => /microsoft.*xiaoyi/i.test(v.name),
    v => /microsoft.*huihui/i.test(v.name),
    v => /microsoft.*kangkang/i.test(v.name),
    v => /microsoft.*yaoyao/i.test(v.name),
    v => /microsoft/i.test(v.name) && /zh[-_]CN/i.test(v.lang),
    v => /zh[-_]CN/i.test(v.lang),
    v => /^zh/i.test(v.lang),
  ];
  for (const pred of enPriority) { const v = voices.find(pred); if (v) { _voiceEN = v; break; } }
  for (const pred of zhPriority) { const v = voices.find(pred); if (v) { _voiceZH = v; break; } }
}
if (window.speechSynthesis) {
  _initVoices();
  speechSynthesis.addEventListener('voiceschanged', _initVoices);
  // 触发在线 voice 异步加载（部分系统需要此调用才会拉取在线 voices）
  setTimeout(_initVoices, 1000);
  setTimeout(_initVoices, 3000);
}
function _makeUtterance(text, lang) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  const isZh = lang.startsWith('zh');
  const preferred = isZh ? _voiceZH : _voiceEN;
  if (preferred) {
    u.voice = preferred;
  } else if (!isZh && _voiceZH) {
    // 系统无英文 voice 时，不指定 voice，仅靠 lang 让引擎路由
    // 如果引擎无法处理 en-US，则不设置（浏览器会用默认）
    u.voice = null;
  }
  return u;
}
// Chrome bug workaround: speechSynthesis auto-pauses after ~15s of inactivity.
// Always resume before speak, otherwise speak() silently does nothing.
// Also run a keepalive timer during long sequences to prevent Chrome's ~15s auto-pause.
let _keepaliveTimer = null;
function _startKeepalive() {
  _stopKeepalive();
  _keepaliveTimer = setInterval(() => {
    if (speechSynthesis.speaking && speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }, 5000);
}
function _stopKeepalive() {
  if (_keepaliveTimer) { clearInterval(_keepaliveTimer); _keepaliveTimer = null; }
}
function _safeSpeak(u) {
  if (speechSynthesis.paused) speechSynthesis.resume();
  speechSynthesis.speak(u);
}

function speakWordText(text) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = _makeUtterance(text, 'en-US');
  u.rate = 0.82; u.pitch = 1.0;
  _safeSpeak(u);
}

// 朗读中文
function speakZh(text) {
  if (!window.speechSynthesis) return;
  const u = _makeUtterance(text, 'zh-CN');
  u.rate = 0.9; u.pitch = 1.0;
  _safeSpeak(u);
}

// 英文读完接中文（用于点单词卡：先读英文再读中文释义）
// 用 onend 回调链式触发，兼容 iOS Safari（队列不可靠）
// 可选 cb 在全部读完（中文也读完，或无中文时英文读完）后触发
function speakEnThenZh(en, zh, cb) {
  if (!window.speechSynthesis) { if (cb) cb(); return; }
  speechSynthesis.cancel();
  const uEn = _makeUtterance(en, 'en-US');
  uEn.rate = 0.82; uEn.pitch = 1.0;
  if (zh) {
    const speakZhAndCb = () => {
      const uZh = _makeUtterance(zh, 'zh-CN');
      uZh.rate = 0.9; uZh.pitch = 1.0;
      uZh.onend = () => { if (cb) cb(); };
      uZh.onerror = () => { if (cb) cb(); };
      _safeSpeak(uZh);
    };
    uEn.onend = speakZhAndCb;
    uEn.onerror = speakZhAndCb;
  } else {
    uEn.onend = () => { if (cb) cb(); };
    uEn.onerror = () => { if (cb) cb(); };
  }
  _safeSpeak(uEn);
}

function speakWord() {
  const word = document.getElementById('quiz-word').textContent;
  speakWordText(word);
}

/* ═══════════════════════════════════════════
   UTILS
═══════════════════════════════════════════ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}
/* ═══════════════════════════════════════════
   FLASH MEMO  十秒速记
   流程: 分类选择 → 逐词:
     ① 整体朗读: 整词朗读一遍 + 中文释义
     ② 复读阶段: 整词自动朗读10遍, 倒计时圆环
     → 下一词 / 全部完成后显示结果
═══════════════════════════════════════════ */
// SYLLABLES is loaded from data.js
const REPEAT_COUNT = 10; // 复读次数
const SYLLABLE_GAP = 600; // 音节间隔 ms
const REPEAT_GAP   = 900; // 复读间隔 ms
let flashQueue    = [];   // 本轮单词列表
let flashIdx      = 0;    // 当前第几词
let flashTimers      = [];   // 所有 setTimeout id，用于中断
let flashSpeaking    = false;
let flashNaturalDone = false; // 标记本次是自然完成（非跳过）
let flashIsSentence  = false; // 标记是否来自日常短句（短句不显示图片）
let flashAborted     = false; // 标记本次速记是否被中断（返回/跳过），中断后所有回调不再执行
function startFlashCat(cat) {
  let pool;
  if (cat === 'all') {
    pool = shuffle(WORDS_LIST.filter(w => w.type === 'word')).slice(0, 6);
  } else if (cat === 'sentences') {
    pool = shuffle(WORDS_LIST.filter(w => w.type === 'sentence')).slice(0, 6);
  } else {
    pool = shuffle(WORDS_LIST.filter(w => w.type === 'word')).slice(0, 6);
  }

  flashQueue = pool;
  flashIdx   = 0;
  flashIsSentence = false;  // 从分类进入，非短句模式
  flashAborted = false;  // 进入新速记，清除中断标志
  document.getElementById('flash-cat-screen').style.display = 'none';
  document.getElementById('flash-main').style.display = 'block';
  flashRunWord();
}

function flashStop() {
  flashAborted = true;  // 标记中断，所有异步回调不再推进
  flashTimers.forEach(t => clearTimeout(t));
  flashTimers = [];
  speechSynthesis.cancel();
  // 回到分类选择
  document.getElementById('flash-cat-screen').style.display = 'block';
  document.getElementById('flash-main').style.display = 'none';
}

function flashRunWord() {
  if (flashIdx >= flashQueue.length) { flashShowDone(); return; }

  flashAborted = false;  // 开始新词，清除中断标志
  // 随机播放模式：换词时用强拍节拍提示节奏
  if (wfAutoFlashMode && flashIdx > 0) {
    playTick(1047, 0.08, 0.5);   // 高频强拍（C6），换词提示
    setTimeout(() => { if (!flashAborted) playTick(1047, 0.06, 0.35); }, 180);
  }
  const word = flashQueue[flashIdx];
  const total = flashQueue.length;
  // 更新进度
  document.getElementById('flash-prog-label').textContent = `第 ${flashIdx + 1} / ${total} 词`;
  document.getElementById('flash-prog-fill').style.width = `${((flashIdx) / total) * 100}%`;
  // 更新卡片基础内容
  const emojiEl = document.getElementById('flash-emoji');
  if (flashIsSentence) {
    // 日常短句不显示图片
    emojiEl.style.display = 'none';
  } else {
    emojiEl.style.display = '';
    emojiEl.innerHTML = emojiHtml(word, 100);
    emojiEl.style.animation = 'none';
    void emojiEl.offsetWidth;
    emojiEl.style.animation = '';
  }
  document.getElementById('flash-zh').textContent = word.zh;
  document.getElementById('flash-word-full').style.display = 'none';
  document.getElementById('flash-dots').style.display = 'none';
  document.getElementById('flash-timer-wrap').style.display = 'none';
  document.getElementById('flash-syllable-display').style.display = 'none';
  document.getElementById('flash-hint').textContent = '听一遍整体朗读 👂';
  // Phase badge
  setBadge('syllable');
  // 停止旧计时器
  flashTimers.forEach(t => clearTimeout(t)); flashTimers = [];
  speechSynthesis.cancel();
  // ── 阶段①: 整体朗读一遍（英文 + 中文释义）──
  const enMs = Math.max(700, word.en.length * 90);
  const zhMs = Math.max(700, (word.zh || '').length * 200);
  const totalMs = enMs + zhMs + 500;
  let cbFired = false;
  const startRepeat = () => {
    if (cbFired || flashAborted) return;
    cbFired = true;
    // 整体朗读结束后再停顿一下，进入十遍速记
    const t3 = setTimeout(() => {
      if (flashAborted) return;
      flashStartRepeat(word, (SYLLABLES[word.en] || [word.en]).length);
    }, 300);
    flashTimers.push(t3);
  };
  speakEnThenZh(word.en, word.zh, startRepeat);
  // 兜底：若 onend 都不触发，按预估时长强制进入
  const tFallback = setTimeout(startRepeat, totalMs + 1500);
  flashTimers.push(tFallback);
}

function flashStartRepeat(word, sylCount) {
  setBadge('repeat');
  document.getElementById('flash-hint').textContent = `跟我一起读，共 ${REPEAT_COUNT} 遍！`;
  // 切换显示：隐藏音节行，显示完整词
  document.getElementById('flash-syllable-display').style.display = 'none';
  const fullEl = document.getElementById('flash-word-full');
  fullEl.textContent = word.en;
  fullEl.style.display = 'block';
  // 圆点
  const dotsEl = document.getElementById('flash-dots');
  dotsEl.style.display = 'flex';
  dotsEl.innerHTML = Array.from({length: REPEAT_COUNT}, (_, i) =>
    `<div class="flash-dot" id="fd-${i}"></div>`
  ).join('');
  // 倒计时圆环：由朗读进度驱动，避免与实际播放时长脱节
  const timerWrap = document.getElementById('flash-timer-wrap');
  timerWrap.style.display = 'block';
  const _circumference = 263.9;
  const _arc = document.getElementById('flash-timer-arc');
  const _numEl = document.getElementById('flash-timer-num');
  _arc.style.strokeDashoffset = 0;
  _numEl.textContent = REPEAT_COUNT;

  // 链式复读：每遍读完(onend)再启动下一遍，长句不会被截断
  const REPEAT_TAIL = 300;  // 每遍读完后的停顿 ms
  let rep = 0;

  function runOne() {
    if (flashAborted) return;  // 已中断，不再推进
    if (rep >= REPEAT_COUNT) {
      // 复读完成，进入下一词
      const tNext = setTimeout(() => {
        if (flashAborted) return;  // 中断后不进入下一词
        flashIdx++;
        _arc.style.strokeDashoffset = _circumference;
        _numEl.textContent = 0;
        flashNaturalDone = true;
        flashRunWord();
        flashNaturalDone = false;
      }, 400);
      flashTimers.push(tNext);
      return;
    }
    const r = rep;
    playRepeatTick();
    document.getElementById(`fd-${r}`)?.classList.add('active');
    const u = _makeUtterance(word.en, 'en-US');
    u.rate = 0.82; u.pitch = 1.0;
    let finished = false;
    const finishOnce = () => {
      if (finished) return;
      finished = true;
      if (flashAborted) return;  // 中断后不推进
      document.getElementById(`fd-${r}`)?.classList.remove('active');
      document.getElementById(`fd-${r}`)?.classList.add('done');
      // 倒计时圆环按已读遍数同步推进
      _arc.style.strokeDashoffset = _circumference * ((r + 1) / REPEAT_COUNT);
      _numEl.textContent = REPEAT_COUNT - (r + 1);
      // 读完后停顿再启动下一遍
      const t = setTimeout(runOne, REPEAT_TAIL);
      flashTimers.push(t);
    };
    u.onend = finishOnce;
    u.onerror = finishOnce;
    // 兜底：若 onend/onerror 都不触发（某些 TTS bug），按预估时长强制推进
    const wordMs = Math.max(900, word.en.length * 110);
    const tFallback = setTimeout(() => {
      if (flashAborted) return;
      finishOnce();
    }, wordMs + 500);
    flashTimers.push(tFallback);
    _safeSpeak(u);
    rep++;
  }
  const tStart = setTimeout(() => {
    if (flashAborted) return;
    runOne();
  }, 100);
  flashTimers.push(tStart);
}

// 倒计时圆环
let timerRingInterval = null;
function startTimerRing(totalSec) {
  const arc = document.getElementById('flash-timer-arc');
  const numEl = document.getElementById('flash-timer-num');
  const circumference = 263.9;
  let elapsed = 0;
  const step = 200; // ms
  stopTimerRing();
  timerRingInterval = setInterval(() => {
    elapsed += step / 1000;
    const remain = Math.max(0, totalSec - elapsed);
    const offset = circumference * (elapsed / totalSec);
    arc.style.strokeDashoffset = Math.min(offset, circumference);
    numEl.textContent = Math.ceil(remain);
    if (remain <= 0) stopTimerRing();
  }, step);
}

function stopTimerRing() {
  if (timerRingInterval) { clearInterval(timerRingInterval); timerRingInterval = null; }

}

function setBadge(phase) {
  const el = document.getElementById('flash-phase-badge');
  el.className = 'flash-phase-badge';
  if (phase === 'syllable') { el.classList.add('phase-syllable'); el.textContent = '音节拆读'; }
  else if (phase === 'repeat') { el.classList.add('phase-repeat'); el.textContent = '跟读 ×10'; }
  else { el.classList.add('phase-done'); el.textContent = '完成！'; }

}

// 朗读单个音节片段（按音节发音，慢速）
function speakSyllableChunk(syl) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = _makeUtterance(syl, 'en-US');
  u.rate = 0.6; u.pitch = 1.0;
  _safeSpeak(u);
}

// Web Audio API 卡点节拍声（短促 tick，像节拍器）
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

function playTick(freq = 880, duration = 0.06, vol = 0.35) {
  try {
    const ctx = getAudioCtx();
    // resume 解决浏览器自动播放策略
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch(e) { /* 浏览器不支持则静默 */ }

}

// 复读阶段用稍低频的 tick
function playRepeatTick() { playTick(660, 0.05, 0.25); }

function flashSkip() {
  flashAborted = true;  // 中断当前词的所有回调
  flashTimers.forEach(t => clearTimeout(t)); flashTimers = [];
  stopTimerRing();
  speechSynthesis.cancel();
  // 如果是单词速记模式（边学边记），跳过 = 未完成，直接返回
  if (wfReturnCtx) {
    wfReturnCtx = null;
    document.querySelector('#flash .back-btn').onclick = () => { flashStop(); showPage('home'); };
    flashStop();
    renderWfGrid();
    showPage('word-flash');
    return;
  }

  flashIdx++;
  flashRunWord();
}

function flashReplayCurrent() {
  if (flashIdx < flashQueue.length) {
    flashAborted = true;  // 中断当前词的所有回调
    flashTimers.forEach(t => clearTimeout(t)); flashTimers = [];
    stopTimerRing();
    speechSynthesis.cancel();
    flashRunWord();  // 内部会重置 flashAborted = false
  }
}

/* ═══════════════════════════════════════════
   WORD-FLASH 边学边记
═══════════════════════════════════════════ */
let wfAllWords = [];
let wfPage = 0;
const WF_PAGE_SIZE = 4;
let wfCurrentTab = 'words';
// 记录哪些单词已速记完成（key: en）
const wfDoneSet = new Set();
// 从 word-flash 跳入速记时的上下文，用于完成后返回
let wfReturnCtx = null;  // { wordEn }

// ── 日常短句面板 ──
let wfDsAllWords = [];
let wfDsPage = 0;
const WF_DS_PAGE_SIZE = 4;
const wfDsDoneSet = new Set();
function wfSwitchTab(tab) {
  wfCurrentTab = tab;
  document.getElementById('wf-tab-words').classList.toggle('active', tab === 'words');
  document.getElementById('wf-tab-sentences').classList.toggle('active', tab === 'sentences');
  document.getElementById('wf-words-panel').style.display = tab === 'words' ? 'block' : 'none';
  document.getElementById('wf-sentences-panel').style.display = tab === 'sentences' ? 'block' : 'none';
  if (tab === 'words') {
    renderWfGrid();
  } else {
    wfDsInitWords();
    renderWfDsGrid();
  }

}

function wfDsInitWords() {
  if (wfDsAllWords.length > 0) return; // 只在首次初始化时洗牌
  wfDsAllWords = shuffle(WORDS_LIST.filter(w => w.type === 'sentence'));
  wfDsPage = 0;
}

function wfDsChangePage(delta) {
  const totalPages = Math.ceil(wfDsAllWords.length / WF_DS_PAGE_SIZE);
  wfDsPage = Math.max(0, Math.min(totalPages - 1, wfDsPage + delta));
  renderWfDsGrid();
}

function renderWfDsGrid() {
  if (wfDsAllWords.length === 0) wfDsInitWords();
  const totalPages = Math.ceil(wfDsAllWords.length / WF_DS_PAGE_SIZE);
  const slice = wfDsAllWords.slice(wfDsPage * WF_DS_PAGE_SIZE, wfDsPage * WF_DS_PAGE_SIZE + WF_DS_PAGE_SIZE);
  document.getElementById('wf-ds-grid').innerHTML = slice.map(w => `
    <div class="wf-card" style="border-color:#E0E8FF;box-shadow:0 5px 0 #C0D0F0;">
      <div class="wf-en" onclick="speakEnThenZh('${escAttr(w.en)}','${escAttr(w.zh)}')">${esc(w.en)}</div>
      <div class="wf-zh">${esc(w.zh)}</div>
      <button class="wf-flash-btn ${wfDsDoneSet.has(w.en) ? 'done' : ''}"
        onclick="wfStartSingleFlash('${escAttr(w.en)}')">
        ${wfDsDoneSet.has(w.en) ? '✅ 已记' : '⚡ 速记'}
      </button>
    </div>
  `).join('');
  document.getElementById('wf-ds-page-info').textContent = `${wfDsPage + 1} / ${totalPages}`;
  document.getElementById('wf-ds-prev').disabled = wfDsPage === 0;
  document.getElementById('wf-ds-next').disabled = wfDsPage >= totalPages - 1;
}

function wfInitWords() {
  wfAllWords = shuffle(getImageWords());
  wfPage = 0;
}

function wfChangePage(delta) {
  const totalPages = Math.ceil(wfAllWords.length / WF_PAGE_SIZE);
  wfPage = Math.max(0, Math.min(totalPages - 1, wfPage + delta));
  renderWfGrid();
}

function renderWfGrid() {
  if (wfAllWords.length === 0) wfInitWords();
  const totalPages = Math.ceil(wfAllWords.length / WF_PAGE_SIZE);
  const slice = wfAllWords.slice(wfPage * WF_PAGE_SIZE, wfPage * WF_PAGE_SIZE + WF_PAGE_SIZE);
  document.getElementById('wf-grid').innerHTML = slice.map(w => `
    <div class="wf-card">
      <span class="wf-emoji">${emojiHtml(w, 52)}</span>
      <div class="wf-en" onclick="speakEnThenZh('${escAttr(w.en)}','${escAttr(w.zh)}')">${esc(w.en)}</div>
      <div class="wf-zh">${esc(w.zh)}</div>
      <button class="wf-flash-btn ${wfDoneSet.has(w.en) ? 'done' : ''}"
        onclick="wfStartSingleFlash('${escAttr(w.en)}')">
        ${wfDoneSet.has(w.en) ? '✅ 已记' : '⚡ 速记'}
      </button>
    </div>
  `).join('');
  document.getElementById('wf-page-info').textContent = `${wfPage + 1} / ${totalPages}`;
  document.getElementById('wf-prev').disabled = wfPage === 0;
  document.getElementById('wf-next').disabled = wfPage >= totalPages - 1;
}

// 点击单张卡片的速记按钮 → 进入只含该单词的速记流程
function wfStartSingleFlash(wordEn) {
  const word = WORDS_LIST.find(w => w.en === wordEn);
  if (!word) return;
  wfReturnCtx = { wordEn };   // 记住来源，完成后用
  // 标记是否来自日常短句（短句不显示图片）
  flashIsSentence = wfCurrentTab === 'sentences';
  // 配置 flash 为单词模式：只有1个词，完成后回调返回
  flashQueue = [word];
  flashIdx   = 0;
  flashAborted = false;  // 进入新速记，清除中断标志
  // 隐藏分类选择，直接进主区
  document.getElementById('flash-cat-screen').style.display = 'none';
  document.getElementById('flash-main').style.display = 'block';
  // 修改 topbar 返回按钮为返回 word-flash
  document.querySelector('#flash .back-btn').onclick = () => {
    flashStop();
    showPage('word-flash');
    wfReturnCtx = null;
  };
  showPage('flash');
  flashRunWord();
}

/* ═══════════════════════════════════════════
   WF AUTO FLASH  随机播放速记
   点「随机播放」→ 从当前 tab 随机抽取 6 词
   依次走完整速记流程（音节 + 10遍复读 + 节拍）
   完成后返回 word-flash 并标记已记
═══════════════════════════════════════════ */
let wfAutoFlashMode = false;

function wfStartAutoFlash() {
  const isSentences = wfCurrentTab === 'sentences';
  const pool = isSentences
    ? shuffle(WORDS_LIST.filter(w => w.type === 'sentence')).slice(0, 6)
    : shuffle(getImageWords()).slice(0, 6);
  if (!pool.length) return;

  wfAutoFlashMode = true;
  wfReturnCtx = null;
  flashIsSentence = isSentences;
  flashQueue = pool;
  flashIdx   = 0;
  flashAborted = false;

  document.getElementById('flash-cat-screen').style.display = 'none';
  document.getElementById('flash-main').style.display = 'block';
  document.querySelector('#flash .back-btn').onclick = () => {
    wfAutoFlashMode = false;
    flashStop();
    showPage('word-flash');
  };
  showPage('flash');
  flashRunWord();
}

function flashShowDone() {
  if (flashAborted) return;  // 中断后不弹结束页
  stopTimerRing();
  // 随机播放批量速记完成
  if (wfAutoFlashMode) {
    wfAutoFlashMode = false;
    flashQueue.forEach(w => { wfDoneSet.add(w.en); wfDsDoneSet.add(w.en); });
    document.querySelector('#flash .back-btn').onclick = () => { flashStop(); showPage('home'); };
    flashStop();
    if (wfCurrentTab === 'sentences') { renderWfDsGrid(); } else { renderWfGrid(); }
    showPage('word-flash');
    setTimeout(() => {
      const doneBtns = document.querySelectorAll('.wf-flash-btn.done');
      if (doneBtns.length) burst(doneBtns[doneBtns.length - 1]);
    }, 100);
    return;
  }
  // 如果是从 word-flash 跳进来的单词速记（自然完成才标记已记）
  if (wfReturnCtx) {
    const { wordEn } = wfReturnCtx;
    if (flashNaturalDone) {
      wfDoneSet.add(wordEn);
      wfDsDoneSet.add(wordEn);
    }

    wfReturnCtx = null;
    // 恢复 topbar 返回按钮
    document.querySelector('#flash .back-btn').onclick = () => {
      flashStop(); showPage('home');
    };
    // 返回 word-flash，根据当前 tab 刷新对应面板
    flashStop();
    if (wfCurrentTab === 'sentences') {
      renderWfDsGrid();
    } else {
      renderWfGrid();
    }

    showPage('word-flash');
    if (flashNaturalDone) {
      setTimeout(() => {
        const doneBtns = document.querySelectorAll('.wf-flash-btn.done');
        if (doneBtns.length) burst(doneBtns[doneBtns.length - 1]);
      }, 100);
    }

    flashNaturalDone = false;
    return;
  }

  // 普通速记结束 → 显示结果页
  document.getElementById('result-trophy').textContent = '🌟';
  document.getElementById('result-title').textContent = '速记完成！';
  document.getElementById('result-sub').textContent = `本轮共记了 ${flashQueue.length} 个单词`;
  document.getElementById('result-score').textContent = `${flashQueue.length} 词`;
  document.getElementById('result-stars').textContent = '⭐⭐⭐';
  document.getElementById('result-replay-btn').onclick = () => {
    flashStop();
    showPage('flash');
  };
  showPage('result');
  setTimeout(bigBurst, 300);
}
/* ═══════════════════════════════════════════
   SUB-PAGE HELPER  子页面导航
═══════════════════════════════════════════ */
function showSub(module, sub) {
  // 隐藏本模块所有直接子 div（含 home、各子页）
  const allSubs = document.querySelectorAll(`#${module} > div[id^="${module}-"]`);
  allSubs.forEach(d => { d.style.display = 'none'; });
  // 显示目标子区
  const target = document.getElementById(`${module}-${sub}`);
  if (target) { target.style.display = 'block'; }

  // 特殊初始化
  if (module === 'pinyin' && sub === 'initials')  { pyRenderChips('initials'); }

  if (module === 'pinyin' && sub === 'blend')     { pyRenderBlend(); }

  if (module === 'pinyin' && sub === 'songs')     { pyRenderSongs(); }

  if (module === 'pinyin' && sub === 'tones')     { pyStartTones(); }

  if (module === 'phonics' && sub === 'letters')  { phlInit(); }

  if (module === 'phonics' && sub === 'sounds')   { showSub('phonics','letters'); return; }

  if (module === 'phonics' && sub === 'blends')   { showSub('phonics','letters'); phlSelectTab('digraphs'); return; }

  if (module === 'phonics' && sub === 'vowels')   { phRenderVowels(); }

  if (module === 'phonics' && sub === 'cvc')      { cvcStart(); }

  if (module === 'phonics' && sub === 'songs')    { phRenderSongs(); }

  if (module === 'hanzi'   && sub === 'cards')    { _hzShuffle(); hzRenderCards(); }

  if (module === 'hanzi'   && sub === 'stroke')   { hzRenderStrokeSelector(); }

  window.scrollTo(0, 0);
}
/* ═══════════════════════════════════════════
   SONG PLAYER  儿歌朗读（逐行高亮）
═══════════════════════════════════════════ */
function _setSongBtn(prefix, idx, icon) {
  const btn = document.querySelector(`[onclick="playSong('${prefix}',${idx})"]`);
  if (btn) btn.textContent = icon === '||' ? '❚❚ 暂停' : '▶ 朗读全曲';
}
function _setErBtn(idx, icon) {
  const btn = document.querySelector(`[onclick="playEngRhyme(${idx})"]`);
  if (btn) btn.textContent = icon === '||' ? '❚❚ 暂停' : '▶ 朗读';
}
function _setRhymeBtn(idx, icon) {
  const btn = document.querySelector(`[onclick="playRhyme(${idx})"]`);
  if (btn) btn.textContent = icon === '||' ? '❚❚ 暂停' : '▶ 朗读';
}
function _resetAllPlayBtns() {
  _songPlaying = null;
  _engRhymePlaying = null;
  _rhymePlaying = null;
  document.querySelectorAll('.song-play-btn').forEach(b => {
    const t = b.textContent;
    if (t.includes('暂停') || t.includes('❚')) {
      if (b.getAttribute('onclick')?.includes('playSong')) b.textContent = '▶ 朗读全曲';
      else b.textContent = '▶ 朗读';
    }
  });
}
let songTimers = [];
let _songPlaying = null; // {prefix, idx}
function playSong(prefix, idx) {
  if (_songPlaying && _songPlaying.prefix===prefix && _songPlaying.idx===idx) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      _setSongBtn(prefix, idx, '||');
    } else {
      speechSynthesis.pause();
      _setSongBtn(prefix, idx, '▶');
    }
    return;
  }
  songTimers.forEach(t=>clearTimeout(t)); songTimers=[];
  _resetAllPlayBtns();
  speechSynthesis.cancel();
  _songPlaying = {prefix, idx};
  _setSongBtn(prefix, idx, '||');
  const songs = prefix==='py' ? PY_SONGS : PHONICS_SONGS;
  const song = songs[idx];
  const lang = prefix==='py' ? 'zh-CN' : 'en-US';
  const GAP = 600;
  function speakLine(li) {
    if (li >= song.lines.length) {
      document.querySelectorAll(`[id^="${prefix}song-${idx}-"]`).forEach(el=>el.classList.remove('hl'));
      _stopKeepalive();
      _songPlaying = null;
      _setSongBtn(prefix, idx, '▶');
      return;
    }
    const rawLine = song.lines[li];
    const _IPA = {'æ':'ah','ɑ':'ah','ə':'uh','ɪ':'ih','ʊ':'oo','ɔ':'aw','ɛ':'eh','ʌ':'uh','ʃ':'sh','ʒ':'zh','θ':'th','ð':'th','ŋ':'ng','ɒ':'oh'};
    const speakText = lang.startsWith('en') ? rawLine.replace(/\/([^/]+)\//g, (_,p)=>_IPA[p]||p).replace(/\s+/g,' ').trim() : rawLine;
    document.querySelectorAll(`[id^="${prefix}song-${idx}-"]`).forEach(el=>el.classList.remove('hl'));
    document.getElementById(`${prefix}song-${idx}-${li}`)?.classList.add('hl');
    const u = _makeUtterance(speakText, lang);
    u.rate = 0.35; u.pitch = 1.0;
    u.onend = () => { const t = setTimeout(()=>speakLine(li+1), GAP); songTimers.push(t); };
    u.onerror = (e) => { if (e.error !== 'interrupted') { const t = setTimeout(()=>speakLine(li+1), GAP); songTimers.push(t); } };
    _safeSpeak(u);
  }
  _startKeepalive();
  speakLine(0);
}
