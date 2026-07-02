/* ═══════════════════════════════════════════
   MATH 加减法
═══════════════════════════════════════════ */
let mathMaxNum  = 10;
let mathQueue   = [];
let mathIdx     = 0;
let mathCorrect = 0;
let mathAnswered = false;
function startMathGame(max) {
  mathMaxNum = max;
  mathQueue  = Array.from({length:10}, () => genMathQ(max));
  mathIdx    = 0; mathCorrect = 0; mathAnswered = false;
  // 先跳转到数学页，再显示答题区
  showPage('math');
  document.getElementById('math-level-screen').style.display = 'none';
  document.getElementById('math-game-screen').style.display = 'block';
  renderMathQ();
}

function genMathQ(max) {
  const op = Math.random() > 0.5 ? '+' : '-';
  let a, b;
  if (op === '+') { a = randInt(1, max - 1); b = randInt(1, max - a); }
  else            { a = randInt(1, max);      b = randInt(0, a); }

  const ans = op === '+' ? a + b : a - b;
  // 3个干扰项
  const decoys = new Set([ans]);
  while (decoys.size < 4) {
    const d = ans + randInt(-5, 5);
    if (d >= 0 && d <= max + 5 && d !== ans) decoys.add(d);
  }

  return { expr: `${a} ${op === '+' ? '＋' : '－'} ${b} ＝ ？`, ans, opts: shuffle([...decoys]) };
}

function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

function renderMathQ() {
  if (mathIdx >= mathQueue.length) { showMathResult(); return; }

  mathAnswered = false;
  const q = mathQueue[mathIdx];
  document.getElementById('math-expr').textContent = q.expr;
  document.getElementById('math-prog-label').textContent = `第 ${mathIdx+1} 题 / 共 ${mathQueue.length} 题`;
  document.getElementById('math-prog-fill').style.width = `${(mathIdx/mathQueue.length)*100}%`;
  document.getElementById('math-next').disabled = true;
  const colors = ['#FFE4CC','#D0EEFF','#D8FFD8','#F0D8FF'];
  document.getElementById('math-opts').innerHTML = q.opts.map((o,i) => `
    <div class="math-opt" style="background:${colors[i]}"
      onclick="mathSelect(this,${o},${q.ans})">${o}</div>
  `).join('');
}

function mathSelect(el, chosen, ans) {
  if (mathAnswered) return;
  mathAnswered = true;
  const ok = chosen === ans;
  el.classList.add(ok ? 'correct' : 'wrong');
  if (ok) { mathCorrect++; burst(el); }

  document.getElementById('math-next').disabled = false;
}

function mathNext() { mathIdx++; renderMathQ(); }

function showMathResult() {
  document.getElementById('math-game-screen').style.display = 'none';
  document.getElementById('math-level-screen').style.display = 'block';
  document.getElementById('result-trophy').textContent = mathCorrect >= 8 ? '🏆' : mathCorrect >= 5 ? '🥈' : '🌟';
  document.getElementById('result-title').textContent = mathCorrect >= 8 ? '数学小达人！' : mathCorrect >= 5 ? '不错哦！' : '继续练习！';
  document.getElementById('result-sub').textContent = '你答对了';
  document.getElementById('result-score').textContent = `${mathCorrect} / ${mathQueue.length}`;
  document.getElementById('result-stars').textContent = mathCorrect >= 8 ? '⭐⭐⭐' : mathCorrect >= 5 ? '⭐⭐' : '⭐';
  document.getElementById('result-replay-btn').onclick = () => { showPage('home'); switchSubjectTab('math'); };
  showPage('result');
  if (mathCorrect >= 8) setTimeout(bigBurst, 300);
}
/* ═══════════════════════════════════════════
   MATH RHYME  10以内加减法顺口溜
═══════════════════════════════════════════ */
let rhymeTimers = [];
function renderMathRhyme() {
  document.getElementById('math-rhyme-list').innerHTML = MATH_RHYMES.map((s, si) => `
    <div class="rhyme-card">
      <div class="rhyme-title">${s.title}</div>
      ${s.lines.map((l, li) => `<div class="rhyme-line" id="rhyme-${si}-${li}">${l}</div>`).join('')}
      <button class="song-play-btn" style="margin-top:10px" onclick="playRhyme(${si})">▶ 朗读</button>
    </div>
  `).join('');
}

let _rhymePlaying = null;
function playRhyme(idx) {
  if (_rhymePlaying === idx) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      _setRhymeBtn(idx, '||');
    } else {
      speechSynthesis.pause();
      _setRhymeBtn(idx, '▶');
    }
    return;
  }
  rhymeTimers.forEach(t => clearTimeout(t)); rhymeTimers = [];
  _resetAllPlayBtns();
  speechSynthesis.cancel();
  _rhymePlaying = idx;
  _setRhymeBtn(idx, '||');
  const song = MATH_RHYMES[idx];
  const GAP = 500;
  function speakLine(li) {
    if (li >= song.lines.length) {
      document.querySelectorAll(`[id^="rhyme-${idx}-"]`).forEach(el => el.classList.remove('hl'));
      _stopKeepalive();
      _rhymePlaying = null;
      _setRhymeBtn(idx, '▶');
      return;
    }
    const line = song.lines[li];
    document.querySelectorAll(`[id^="rhyme-${idx}-"]`).forEach(el => el.classList.remove('hl'));
    document.getElementById(`rhyme-${idx}-${li}`)?.classList.add('hl');
    const u = _makeUtterance(line, 'zh-CN');
    u.rate = 0.4; u.pitch = 1.0;
    u.onend = () => { const t = setTimeout(()=>speakLine(li+1), GAP); rhymeTimers.push(t); };
    u.onerror = (e) => { if (e.error !== 'interrupted') { const t = setTimeout(()=>speakLine(li+1), GAP); rhymeTimers.push(t); } };
    _safeSpeak(u);
  }
  _startKeepalive();
  speakLine(0);
}
/* ═══════════════════════════════════════════
   MATH TIMES  99乘法口诀表
═══════════════════════════════════════════ */
// 每列一种颜色（1-9段）
function renderTimesTable() {
  const grid = document.getElementById('times-table');
  grid.innerHTML = '';
  // 从第1段到第9段，每段 i 从 1..i 放一列
  // 按"行优先"展示：行 = 被乘数(1-9)，列 = 乘数(1-9，只显示 ≤行号)
  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 9; col++) {
      const cell = document.createElement('div');
      if (col > row) {
        // 空白占位，保持网格对齐
        cell.style.cssText = 'visibility:hidden;';
        grid.appendChild(cell);
        continue;
      }
      const c = TIMES_COLORS[col - 1];
      const result = row * col;
      const rhyme = `${col}×${row}=${result}`;
      const spoken = `${col}乘${row}等于${result}`;
      cell.className = 'times-cell';
      cell.style.cssText = `background:${c.bg};border-color:${c.border};color:${c.text};`;
      cell.innerHTML = `<span class="tc-expr">${col}×${row}</span><span class="tc-result">${result}</span>`;
      cell.onclick = () => speakTimesCell(spoken);
      grid.appendChild(cell);
    }

  }

}

function speakTimesCell(text) {
  speechSynthesis.cancel();
  const u = _makeUtterance(text, 'zh-CN');
  u.rate = 0.9; u.pitch = 1.0;
  _safeSpeak(u);
}

// 数字 → 中文乘法口诀读法
// 1*1=1 → "一一得一"  3*7=21 → "三七二十一"  2*4=8 → "二四得八"
const ZH_NUMS = ['零','一','二','三','四','五','六','七','八','九'];
function numToZh(n) {
  if (n < 10) return ZH_NUMS[n];
  if (n < 100) return ZH_NUMS[Math.floor(n/10)] + (n%10===0 ? '十' : '十' + ZH_NUMS[n%10]);
  return String(n).split('').map(d => ZH_NUMS[+d]).join('');
}
function timesRhyme(a, b) {
  const r = a * b;
  const aa = ZH_NUMS[a], bb = ZH_NUMS[b];
  // 一位数结果读"得X"（如 一一得一），两位数直接读数字（如 三七二十一）
  if (r < 10) return `${aa}${bb}得${ZH_NUMS[r]}`;
  return `${aa}${bb}${numToZh(r)}`;
}

// 读整体口诀：按行依次朗读（一一得一、一二得二... 一九得九、二二得四...）
let timesReadingAll = false;
let timesReadTimers = [];
function speakTimesAll() {
  // 已在读则停止
  if (timesReadingAll) {
    timesReadTimers.forEach(t => clearTimeout(t));
    timesReadTimers = [];
    speechSynthesis.cancel();
    timesReadingAll = false;
    const btn = document.getElementById('times-read-all-btn');
    if (btn) btn.textContent = '▶ 读整体口诀';
    // 清除高亮
    document.querySelectorAll('.times-cell.reading').forEach(el => el.classList.remove('reading'));
    return;
  }

  timesReadingAll = true;
  const btn = document.getElementById('times-read-all-btn');
  if (btn) btn.textContent = '⏹ 停止';

  // 收集所有口诀（按行：row=被乘数，col=乘数，col≤row）
  const lines = [];
  for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= row; col++) {
      lines.push({ a: col, b: row, rhyme: timesRhyme(col, row) });
    }
  }

  // 链式朗读：每句读完接下一句，自动按句子长短调整
  let idx = 0;
  function next() {
    if (!timesReadingAll || idx >= lines.length) {
      timesReadingAll = false;
      if (btn) btn.textContent = '▶ 读整体口诀';
      document.querySelectorAll('.times-cell.reading').forEach(el => el.classList.remove('reading'));
      return;
    }
    const item = lines[idx];
    // 高亮当前格（col=乘数=a, row=被乘数=b）
    // 网格含占位共 81 个 cell，定位用 grid.children（含占位）
    const allCells = document.getElementById('times-table').children;
    const cellIdx = (item.b - 1) * 9 + (item.a - 1);
    const cell = allCells[cellIdx];
    document.querySelectorAll('.times-cell.reading').forEach(el => el.classList.remove('reading'));
    if (cell) cell.classList.add('reading');

    speechSynthesis.cancel();
    const u = _makeUtterance(item.rhyme, 'zh-CN');
    u.rate = 0.9; u.pitch = 1.0;
    let finished = false;
    const finishOnce = () => {
      if (finished) return;
      finished = true;
      idx++;
      const t = setTimeout(next, 200);  // 句间停顿 200ms
      timesReadTimers.push(t);
    };
    u.onend = finishOnce;
    u.onerror = finishOnce;
    // 兜底：5字以上句子给 2.5s，否则 1.5s
    const fallbackMs = item.rhyme.length >= 5 ? 2500 : 1500;
    const tFallback = setTimeout(finishOnce, fallbackMs);
    timesReadTimers.push(tFallback);
    _safeSpeak(u);
  }
  next();
}
