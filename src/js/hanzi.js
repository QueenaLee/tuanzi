// 汉字 - 从首页直接跳入子模块
function goHanzi(sub) {
  showPage('hanzi');
  showSub('hanzi', sub);
}

// 看图猜字（hanzi quiz 需要特殊初始化）
function goHanziQuiz() {
  showPage('hanzi');
  startHanziQuiz();
}
/* ═══════════════════════════════════════════
   HANZI 认识汉字
═══════════════════════════════════════════ */
// HANZI_LIST is in data.js
let hzPage = 0;
const HZ_PAGE_SIZE = 4;
let _hzAllWords = null;

function _hzGetAll() {
  return _hzAllWords;
}
function _hzShuffle() {
  const all = [...HANZI_LIST];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  _hzAllWords = all;
  hzPage = 0;
}

function hzChangePage(delta) {
  const words = _hzGetAll();
  const total = Math.ceil(words.length / HZ_PAGE_SIZE);
  hzPage = Math.max(0, Math.min(total - 1, hzPage + delta));
  hzRenderCards();
}

function hzRenderCards() {
  const words = _hzGetAll();
  const total = Math.ceil(words.length / HZ_PAGE_SIZE);
  const slice = words.slice(hzPage * HZ_PAGE_SIZE, hzPage * HZ_PAGE_SIZE + HZ_PAGE_SIZE);
  document.getElementById('hz-grid').innerHTML = slice.map(w => `
    <div class="hz-card" onclick="hzSpeak('${escAttr(w.py)}','${escAttr(w.c)}','${escAttr(w.words.join(','))}')">
      <div style="font-size:36px">${w.e}</div>
      <div class="hz-char">${w.c}</div>
      <div class="hz-pinyin">${w.py}</div>
      <div style="margin-top:4px">${w.words.map(wd => `<span class="hz-word-tag">${wd}</span>`).join('')}</div>
    </div>
  `).join('');
  document.getElementById('hz-page-info').textContent = `${hzPage + 1} / ${total}`;
  document.getElementById('hz-prev').disabled = hzPage === 0;
  document.getElementById('hz-next').disabled = hzPage >= total - 1;
}

function hzSpeak(py, char, words) {
  speechSynthesis.cancel();
  // 读汉字(慢) → 组词1 → 组词2，不读拼音字母（TTS无法正确发音带声调拼音）
  const u1 = _makeUtterance(char, 'zh-CN');
  u1.rate=0.7; u1.pitch=1.0;
  _safeSpeak(u1);
  const wordList = words.split(',').filter(w => w && w !== char);
  if (wordList[0]) {
    const u2 = _makeUtterance(wordList[0], 'zh-CN');
    u2.rate=0.82; u2.pitch=1.0;
    u1.onend = () => { setTimeout(() => _safeSpeak(u2), 350); };
    if (wordList[1]) {
      const u3 = _makeUtterance(wordList[1], 'zh-CN');
      u3.rate=0.82; u3.pitch=1.0;
      u2.onend = () => { setTimeout(() => _safeSpeak(u3), 350); };
    }
  }
}

// ── 笔画动画（hanzi-writer） ──
let currentStrokeChar = '';
let _strokeWords = [];
let _strokeIdx = 0;
let _hzWriter = null;
let _strokeCharData = null;
let _strokeAnimTimers = [];


function hzRenderStrokeSelector() {
  const all = _hzGetAll() || [...HANZI_LIST];
  const src = all.length ? all : [...HANZI_LIST];
  _strokeWords = shuffle(src);
  _strokeIdx = 0;
  _hzShowStroke(_strokeIdx);
}

function _hzPlayStrokeVoice(char, wordList, onDone) {
  speechSynthesis.cancel();
  const validWords = (wordList || []).filter(w => w && w !== char);
  // 1. 读字
  const u1 = _makeUtterance(char, 'zh-CN'); u1.rate = 0.7; u1.pitch = 1.0;
  _safeSpeak(u1);

  if (!validWords.length) {
    // 没有组词，读字结束后启动动画
    u1.onend = () => { setTimeout(() => onDone && onDone(), 400); };
    return;
  }
  // 2. 读组词1
  const u2 = _makeUtterance(validWords[0], 'zh-CN'); u2.rate = 0.8; u2.pitch = 1.0;
  u1.onend = () => { setTimeout(() => _safeSpeak(u2), 350); };

  if (!validWords[1]) {
    u2.onend = () => { setTimeout(() => onDone && onDone(), 400); };
    return;
  }
  // 3. 读组词2
  const u3 = _makeUtterance(validWords[1], 'zh-CN'); u3.rate = 0.8; u3.pitch = 1.0;
  u2.onend = () => { setTimeout(() => _safeSpeak(u3), 350); };
  u3.onend = () => { setTimeout(() => onDone && onDone(), 400); };
}

function _hzStartStrokeAnim() {
  if (!_hzWriter || !_strokeCharData) return;
  _strokeAnimTimers.forEach(t => clearTimeout(t)); _strokeAnimTimers = [];
  const d = _strokeCharData;
  const total = d.strokes.length;
  let step = 0;

  // 先隐藏已完成笔画，只显示灰色轮廓，实现"全灰 → 写一笔填一笔"效果
  _hzWriter.hideCharacter();
  _hzWriter.showOutline();

  function nextStroke() {
    if (step >= total) {
      document.getElementById('hz-stroke-info').textContent = `「${currentStrokeChar}」共 ${total} 笔，写完啦！`;
      return;
    }
    const i = step;
    document.getElementById('hz-stroke-info').textContent = `第 ${i + 1} 笔 / 共 ${total} 笔`;
    _hzWriter.animateStroke(i, {
      onComplete: function() {
        step++;
        const t = setTimeout(nextStroke, 200);
        _strokeAnimTimers.push(t);
      }
    });
  }
  nextStroke();

}

function _hzShowStroke(idx) {
  const w = _strokeWords[idx];
  if (!w) return;
  currentStrokeChar = w.c;
  _strokeAnimTimers.forEach(t => clearTimeout(t)); _strokeAnimTimers = [];
  document.getElementById('hz-stroke-char').textContent = w.c;
  document.getElementById('hz-stroke-page').textContent = `${idx + 1} / ${_strokeWords.length}`;
  document.getElementById('hz-stroke-prev').disabled = idx === 0;
  document.getElementById('hz-stroke-next').disabled = idx >= _strokeWords.length - 1;
  document.getElementById('hz-stroke-info').textContent = '';

  const target = document.getElementById('hz-stroke-target');
  target.innerHTML = '';
  _hzWriter = HanziWriter.create(target, w.c, {
    width: 180,
    height: 180,
    padding: 5,
    showOutline: true,
    showCharacter: false,
    strokeAnimationSpeed: 1,
    delayBetweenStrokes: 300,
    strokeColor: '#FF6B6B',
    outlineColor: '#CCC',
    radicalColor: '#FF9A3C',
  });

  // 加载字符数据，然后：先读字+组词，全部读完后再启动笔画动画+逐笔朗读
  HanziWriter.loadCharacterData(w.c).then(function(d) {
    if (!d || !d.strokes) return;
    _strokeCharData = d;
    _hzPlayStrokeVoice(w.c, w.words, function() {
      _hzStartStrokeAnim();
    });
  });
}

function hzStrokeNav(delta) {
  _strokeIdx = Math.max(0, Math.min(_strokeWords.length - 1, _strokeIdx + delta));
  _hzShowStroke(_strokeIdx);
}

function hzReplayStroke() {
  if (_hzWriter) {
    _strokeAnimTimers.forEach(t => clearTimeout(t)); _strokeAnimTimers = [];
    speechSynthesis.cancel();
    _hzWriter.hideCharacter();
    _hzWriter.showOutline();
    setTimeout(() => {
      _hzPlayStrokeVoice(currentStrokeChar, _strokeWords[_strokeIdx] ? _strokeWords[_strokeIdx].words : [], function() {
        _hzStartStrokeAnim();
      });
    }, 200);
  }
}

// 看图猜字
let hzQuizQueue=[], hzQuizIdx=0, hzQuizAnswered=false;
// emoji 适合看图猜字的判断：具体事物类才出题，抽象符号类不出
const _QUIZ_EMOJI_BLACKLIST = new Set([
  '✅','❌','✔️','✖️','➕','➖','🟰','⚖️','📏','📐','🔄','🔁','⬆️','⬇️','➡️','⬅️',
  '◀️','▶️','↔️','↕️','〰️','❓','❗','📌','📍','🎯','💯','🔢','1️⃣','☝️','✌️',
  '👤','👥','👫','👯','🧍','🚶','🏃','💪','🤝','🙏','🤲','👋','👊','👏',
  '📝','📋','📄','📓','📚','📖','📜','📦','🗂️','💬','🗣️','🔤','🔊','📢','📣',
  '🔓','🔒','🔗','🔨','🔧','⏰','⏱️','🕐','📅','📆','🎊','🎉','⭐','✨','💫',
  '💡','🌟','🏆','🥇','🎯','💎','💰','💴','💾','🖥️','💻','📱','⚡','🌀','🌫️',
  '½','🕳️','🏛️','🏟️','🔮','📬','📤','📥','🛒','🏷️','🌅','🌇','🌌','🌉',
  '✍️','⭕','🔲','🔷','🟦','🟫','🩶','🥉',
]);
function _isGoodQuizEmoji(e) {
  if (!e || e === '📝') return false;
  for (const bad of _QUIZ_EMOJI_BLACKLIST) { if (e === bad) return false; }
  return true;
}

let _hzQuizable = [];  // 全部可出题字缓存
function _hzBuildQuizable() {
  const all = _hzGetAll() || [...HANZI_LIST];
  _hzQuizable = shuffle(all.filter(w => _isGoodQuizEmoji(w.e)));
}

function startHanziQuiz() {
  showSub('hanzi','quiz');
  _hzBuildQuizable();
  hzQuizQueue = [..._hzQuizable];
  hzQuizIdx = 0; hzQuizAnswered = false;
  hzRenderQuizQ();
}

function hzRenderQuizQ() {
  // 做完一轮自动重新洗牌继续
  if (hzQuizIdx >= hzQuizQueue.length) {
    hzQuizQueue = shuffle([..._hzQuizable]);
    hzQuizIdx = 0;
  }

  hzQuizAnswered = false;
  const q = hzQuizQueue[hzQuizIdx];
  document.getElementById('hz-quiz-label').textContent = `第 ${hzQuizIdx + 1} 题`;
  document.getElementById('hz-quiz-fill').style.width = `${((hzQuizIdx % 10 + 1) / 10) * 100}%`;
  document.getElementById('hz-quiz-emoji').textContent = q.e;
  document.getElementById('hz-quiz-next').disabled = true;
  const all = _hzGetAll() || [...HANZI_LIST];
  // 干扰项也从有具体图意的字里选，且 emoji 不能和正确答案相同
  const others = shuffle(all.filter(x => x.c !== q.c && _isGoodQuizEmoji(x.e) && x.e !== q.e)).slice(0, 3);
  const opts = shuffle([q,...others]);
  document.getElementById('hz-quiz-opts').innerHTML = opts.map(o=>`
    <div class="quiz-opt" style="font-size:44px;font-weight:900"
      onclick="hzQuizSelect(this,'${escAttr(o.c)}','${escAttr(q.c)}')">${esc(o.c)}</div>
  `).join('');
  setTimeout(()=>{ const u=_makeUtterance(q.c,'zh-CN'); u.pitch=1.0; _safeSpeak(u); },300);
}

function hzQuizSelect(el,chosen,correct){
  if(hzQuizAnswered)return;
  if(el.classList.contains('wrong'))return;  // 已选错的选项不再响应
  if(chosen===correct){
    hzQuizAnswered=true;
    el.classList.add('correct');
    burst(el);
    document.getElementById('hz-quiz-next').disabled=false;
  }else{
    el.classList.add('wrong');
    // 选错不锁定，允许继续选其他选项
  }
}

function hzQuizNext(){ hzQuizIdx++; hzRenderQuizQ(); }
