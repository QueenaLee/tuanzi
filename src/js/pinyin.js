// 汉语拼音 - 从首页直接跳入子模块
function goPinyin(sub) {
  showPage('pinyin');
  showSub('pinyin', sub);
}
/* ═══════════════════════════════════════════
   PINYIN 汉语拼音
═══════════════════════════════════════════ */
// PY_INITIAL_GROUPS, PY_FINAL_GROUPS, PY_INITIALS, PY_FINALS, PY_TONE_DATA, PY_TONE_LABELS are in data.js
// 声调练习数据（字+正确声调序号1-4）
let currentPyItem = '';
let pyCurrentTab = 'initials';
let pyToneQueue = [], pyToneIdx = 0, pyToneAnswered = false;
let pyBlendInit = '', pyBlendFinal = '';
function pyRenderChips(tab) {
  pyCurrentTab = tab;
  const groups = tab === 'initials' ? PY_INITIAL_GROUPS : PY_FINAL_GROUPS;
  // 展平所有 item，赋全局索引，用于点击定位
  let globalIdx = 0;
  const html = groups.map(g => {
    const chips = g.items.map(d => {
      const i = globalIdx++;
      return `<div class="py-chip ${g.cls}" id="pyc-${i}" data-idx="${i}" data-tab="${tab}"
        onclick="pyShowDetail(${i},'${tab}')">
        <span class="pc-py">${d.py}</span>
        <span class="pc-ex">${d.ex}</span>
      </div>`;
    }).join('');
    return `<div class="py-section">
      <div class="py-section-label">${g.label}</div>
      <div class="py-row">${chips}</div>
    </div>`;
  }).join('');
  document.getElementById('py-chip-grid').innerHTML = html;
  document.getElementById('py-detail-card').style.display = 'none';
}

function pyShowDetail(idx, tab) {
  const data = tab === 'initials' ? PY_INITIALS : PY_FINALS;
  const d = data[idx];
  currentPyItem = d.py;
  document.querySelectorAll('.py-chip').forEach(c => c.classList.remove('selected'));
  document.getElementById(`pyc-${idx}`)?.classList.add('selected');
  const card = document.getElementById('py-detail-card');
  card.innerHTML = `
    <div class="py-detail-popup">
      <div class="pd-big">${d.py}</div>
      <div class="pd-info">
        <div class="pd-ex">${d.ex}</div>
        <div class="pd-hint">${d.hint}</div>
      </div>
      <button class="song-play-btn" style="flex-shrink:0" onclick="pyChainSpeak('${d.py}','${d.ex}','${tab}')">🔊 听读音</button>
    </div>`;
  card.style.display = 'block';
  pyChainSpeak(d.py, d.ex, tab);
}

function pySelectTab(tab) {
  document.getElementById('py-tab-i').classList.toggle('active', tab==='initials');
  document.getElementById('py-tab-f').classList.toggle('active', tab==='finals');
  pyRenderChips(tab);
}

function pySpeak(text) {
  speechSynthesis.cancel();
  // 不直接读拼音字母（TTS会将拼音当英文字母朗读），拆分为声母+韵母分别映射为注音汉字
  const { initial, final } = _splitPinyin(text);
  const initialChar = initial ? PY_SOUND_MAP[initial] : null;
  const finalChar = PY_SOUND_MAP[final] || PY_SOUND_MAP[text] || null;
  if (initialChar && finalChar && initialChar !== finalChar) {
    // 声母(慢) → 韵母 → 合(快)
    const seq = [
      { char: initialChar, rate: 0.55, gap: 300 },
      { char: finalChar, rate: 0.75, gap: 100 },
      { char: initialChar + finalChar, rate: 0.9, gap: 0 }
    ];
    const speak = (idx) => {
      if (idx >= seq.length) return;
      const u = _makeUtterance(seq[idx].char, 'zh-CN');
      u.rate = seq[idx].rate; u.pitch = 1.0;
      u.onend = () => setTimeout(() => speak(idx + 1), seq[idx].gap);
      _safeSpeak(u);
    };
    speak(0);
  } else if (finalChar) {
    // 纯韵母
    const u = _makeUtterance(finalChar, 'zh-CN');
    u.rate = 0.75; u.pitch = 1.0;
    _safeSpeak(u);
  } else if (initialChar) {
    // 纯声母
    const u = _makeUtterance(initialChar, 'zh-CN');
    u.rate = 0.75; u.pitch = 1.0;
    _safeSpeak(u);
  } else {
    // 兜底：直接读（少数无法映射的情况）
    const u = _makeUtterance(text, 'zh-CN');
    u.rate = 0.75; u.pitch = 1.0;
    _safeSpeak(u);
  }
}

// 声母/韵母 → 标准注音汉字映射（汉语拼音方案）
const PY_SOUND_MAP = {
  'b':'玻','p':'坡','m':'摸','f':'佛',
  'd':'得','t':'特','n':'讷','l':'勒',
  'g':'哥','k':'科','h':'喝',
  'j':'基','q':'欺','x':'希',
  'zh':'知','ch':'蚩','sh':'诗','r':'日',
  'z':'资','c':'雌','s':'思',
  'y':'医','w':'乌',
  'a':'啊','o':'哦','e':'鹅',
  'i':'一','u':'乌','ü':'鱼',
  'ai':'爱','ei':'诶','ui':'回',
  'ao':'熬','ou':'欧','iu':'有',
  'ie':'耶','üe':'月','er':'耳',
  'an':'安','en':'恩','in':'因','un':'温','ün':'晕',
  'ang':'昂','eng':'鞥','ing':'英','ong':'翁',
};

// 从带声调音节中拆出声母和韵母
// 例：bà → {initial:'b', final:'a'}，shì → {initial:'sh', final:'i'}
function _splitPinyin(syllable) {
  const plain = syllable.normalize('NFD').replace(/[̀-ͯ]/g, '').replace('ü','u');
  // 整体认读音节：y/w 是隔音符不是声母，直接视为无声母
  const whole = ['zhi','chi','shi','ri','zi','ci','si','yi','wu','yu',
                 'ye','yue','yuan','yin','yun','ying'];
  if (whole.includes(plain)) return { initial: null, final: plain };
  // 以 y/w 开头的其他音节同样无声母
  if (plain.startsWith('y') || plain.startsWith('w')) {
    return { initial: null, final: plain };
  }
  const initials = ['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','r','z','c','s'];
  for (const ini of initials) {
    if (plain.startsWith(ini)) {
      const fin = plain.slice(ini.length);
      return { initial: ini, final: fin || null };
    }
  }
  return { initial: null, final: plain };
}

// 拼读流程：
// 声母 tab：声母(慢) → 声母(快)+韵母(快)=示例字(正常)
//   例：点 b → 玻 → [停400ms] → 玻+啊=爸
// 韵母 tab：韵母(慢) → 声母(快)+韵母(快)=示例字(正常)
//   例：点 a → 啊 → [停400ms] → 玻+啊=爸
function pyChainSpeak(py, ex, tab) {
  speechSynthesis.cancel();
  const exampleChar = ex ? ex[0] : null;
  const syllable = ex ? ex.slice(1) : '';
  const { initial, final } = _splitPinyin(syllable);

  const initialChar = initial ? PY_SOUND_MAP[initial] : null;
  const finalChar = PY_SOUND_MAP[final] || PY_SOUND_MAP[py] || exampleChar;

  const seq = [];
  const isInitialTab = (tab === 'initials');

  if (isInitialTab) {
    // 声母 tab：先读声母，再拼读
    if (initialChar) seq.push({ char: initialChar, rate: 0.55, gap: 400 });
  } else {
    // 韵母 tab：先读韵母，再拼读
    if (finalChar) seq.push({ char: finalChar, rate: 0.55, gap: 400 });
  }

  // 拼读阶段：声母 + 韵母 = 示例字（紧凑连读）
  if (initialChar) seq.push({ char: initialChar, rate: 0.75, gap: 100 });
  if (finalChar && finalChar !== initialChar) seq.push({ char: finalChar, rate: 0.75, gap: 100 });
  if (exampleChar) seq.push({ char: exampleChar, rate: 0.9, gap: 0 });

  if (!seq.length) return;

  const speak = (idx) => {
    if (idx >= seq.length) return;
    const u = _makeUtterance(seq[idx].char, 'zh-CN');
    u.rate = seq[idx].rate; u.pitch = 1.0;
    u.onend = () => setTimeout(() => speak(idx + 1), seq[idx].gap);
    _safeSpeak(u);
  };
  speak(0);
}

function pyStartTones() {
  pyToneQueue = shuffle([...PY_TONE_DATA]).slice(0, 10);
  pyToneIdx = 0; pyToneAnswered = false;
  pyRenderToneQ();
}

function pyRenderToneQ() {
  if (pyToneIdx >= pyToneQueue.length) { showSub('pinyin','home'); return; }

  pyToneAnswered = false;
  const q = pyToneQueue[pyToneIdx];
  document.getElementById('py-tone-char').textContent = q.char;
  document.getElementById('py-tone-label').textContent = `第 ${pyToneIdx+1} 题 / 共 ${pyToneQueue.length} 题`;
  document.getElementById('py-tone-fill').style.width = `${(pyToneIdx/pyToneQueue.length)*100}%`;
  document.getElementById('py-tone-next').disabled = true;
  const opts = shuffle([1,2,3,4]);
  document.getElementById('py-tone-opts').innerHTML = opts.map(t => `
    <div class="quiz-opt" style="font-size:18px;font-weight:800"
      onclick="pyToneSelect(this,${t},${q.tone})">${PY_TONE_LABELS[t]}</div>
  `).join('');
  setTimeout(() => pySpeak(q.char), 300);
}

function pySpeakCurrent() {
  if (pyToneIdx < pyToneQueue.length) pySpeak(pyToneQueue[pyToneIdx].char);
}

function pyToneSelect(el, chosen, correct) {
  if (pyToneAnswered) return;
  pyToneAnswered = true;
  el.classList.add(chosen === correct ? 'correct' : 'wrong');
  if (chosen === correct) burst(el);
  document.getElementById('py-tone-next').disabled = false;
}

function pyToneNext() { pyToneIdx++; pyRenderToneQ(); }

function pyRenderBlend() {
  pyBlendInit = ''; pyBlendFinal = '';
  document.getElementById('py-b-init').textContent = '_';
  document.getElementById('py-b-final').textContent = '_';
  document.getElementById('py-b-result').textContent = '？';
  document.getElementById('py-b-init-grid').innerHTML =
    PY_INITIAL_GROUPS.map(g =>
      `<div class="py-section"><div class="py-section-label">${g.label}</div><div class="py-row">${
        g.items.map(d=>`<div class="py-chip ${g.cls}" onclick="pySetBlend('i','${escAttr(d.py)}')"><span class="pc-py">${esc(d.py)}</span></div>`).join('')
      }</div></div>`
    ).join('');
  document.getElementById('py-b-final-grid').innerHTML =
    PY_FINAL_GROUPS.map(g =>
      `<div class="py-section"><div class="py-section-label">${g.label}</div><div class="py-row">${
        g.items.map(d=>`<div class="py-chip ${g.cls}" onclick="pySetBlend('f','${escAttr(d.py)}')"><span class="pc-py">${esc(d.py)}</span></div>`).join('')
      }</div></div>`
    ).join('');
}

function pySetBlend(type, val) {
  if (type === 'i') { pyBlendInit = val; document.getElementById('py-b-init').textContent = val; }
  else              { pyBlendFinal = val; document.getElementById('py-b-final').textContent = val; }

  if (pyBlendInit && pyBlendFinal) {
    const combined = pyBlendInit + pyBlendFinal;
    document.getElementById('py-b-result').textContent = combined;
    pySpeak(combined);
  }

}

function pyRenderSongs() {
  document.getElementById('py-songs-list').innerHTML = PY_SONGS.map((s, si) => `
    <div class="song-card">
      <div class="song-title">${s.title}</div>
      ${s.lines.map((l, li) => `<div class="song-line" id="pysong-${si}-${li}">${l}</div>`).join('')}
      <button class="song-play-btn" onclick="playSong('py',${si})">▶ 朗读全曲</button>
    </div>
  `).join('');
}
