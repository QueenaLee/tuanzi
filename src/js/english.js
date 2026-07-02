// 拼读 Phonics - 字母发音+组合合并页（从英语TAB直接进入）
function goPhonicsLetters() {
  showPage('phonics');
  showSub('phonics', 'letters');
}

// 英语顺口溜（独立页面，从英语TAB直接进入）
function showEngRhymes() {
  renderEngRhymes();
  showPage('eng-rhymes');
}

function renderEngRhymes() {
  document.getElementById('eng-rhymes-list').innerHTML = PHONICS_SONGS.map((s, si) => {
    const title = Array.isArray(s) ? s[0] : s.title;
    const lines = Array.isArray(s) ? s[1] : s.lines;
    return `
    <div class="song-card">
      <div class="song-title">${title}</div>
      ${lines.map((l, li) => `<div class="song-line" id="ersong-${si}-${li}">${l}</div>`).join('')}
      <button class="song-play-btn" onclick="playEngRhyme(${si})">▶ 朗读</button>
    </div>
  `;
  }).join('');
}

let engRhymeTimers = [];
let _engRhymePlaying = null;
function playEngRhyme(idx) {
  if (_engRhymePlaying === idx) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      _setErBtn(idx, '||');
    } else {
      speechSynthesis.pause();
      _setErBtn(idx, '▶');
    }
    return;
  }
  engRhymeTimers.forEach(t=>clearTimeout(t)); engRhymeTimers=[];
  _resetAllPlayBtns();
  speechSynthesis.cancel();
  _engRhymePlaying = idx;
  _setErBtn(idx, '||');
  const raw = PHONICS_SONGS[idx];
  const song = Array.isArray(raw) ? { title: raw[0], lines: raw[1] } : raw;
  const GAP = 800;
  function speakLine(li) {
    if (li >= song.lines.length) {
      document.querySelectorAll(`[id^="ersong-${idx}-"]`).forEach(el=>el.classList.remove('hl'));
      _stopKeepalive();
      _engRhymePlaying = null;
      _setErBtn(idx, '▶');
      return;
    }
    const rawLine = song.lines[li];
    const _IPA = {'æ':'ah','ɑ':'ah','ə':'uh','ɪ':'ih','ʊ':'oo','ɔ':'aw','ɛ':'eh','ʌ':'uh','ʃ':'sh','ʒ':'zh','θ':'th','ð':'th','ŋ':'ng','ɒ':'oh'};
    const speakText = rawLine.replace(/\/([^/]+)\//g, (_,p)=>_IPA[p]||p).replace(/\s+/g,' ').trim();
    document.querySelectorAll(`[id^="ersong-${idx}-"]`).forEach(el=>el.classList.remove('hl'));
    document.getElementById(`ersong-${idx}-${li}`)?.classList.add('hl');
    const u = _makeUtterance(speakText, 'en-US');
    u.rate = 0.35; u.pitch = 1.0;
    u.onend = () => { const t = setTimeout(()=>speakLine(li+1), GAP); engRhymeTimers.push(t); };
    u.onerror = (e) => { if (e.error !== 'interrupted') { const t = setTimeout(()=>speakLine(li+1), GAP); engRhymeTimers.push(t); } };
    _safeSpeak(u);
  }
  _startKeepalive();
  speakLine(0);
}

// 拼读 Phonics - 从首页直接跳入子模块
function goPhonics(sub) {
  showPage('phonics');
  showSub('phonics', sub);
}
// 合并页内部 TAB 切换
function phlSelectTab(tab) {
  document.getElementById('phl-tab-sounds').classList.toggle('active', tab === 'sounds');
  document.getElementById('phl-tab-digraphs').classList.toggle('active', tab === 'digraphs');
  document.getElementById('phl-tab-blends').classList.toggle('active', tab === 'blends');
  document.getElementById('phl-sounds-panel').style.display = tab === 'sounds' ? 'block' : 'none';
  document.getElementById('phl-blend-panel').style.display = tab !== 'sounds' ? 'block' : 'none';
  if (tab === 'digraphs') phlRenderBlend('digraphs');
  if (tab === 'blends')   phlRenderBlend('blends');
  window.scrollTo(0, 0);
}

function phlInit() {
  // 渲染字母发音网格（复用 LETTER_SOUNDS 数据，写入独立容器避免冲突）
  document.getElementById('phl-letter-grid').innerHTML = LETTER_SOUNDS.map(d => `
    <div class="ph-letter-card" onclick="phSpeakLetter('${d.L}','${d.w}')">
      <div class="ph-emoji">${d.e}</div>
      <div class="ph-letter">${d.L}</div>
      <div class="ph-sound">${d.s}</div>
      <div class="ph-example">${d.w}</div>
    </div>
  `).join('');
  // 默认显示字母发音
  phlSelectTab('sounds');
}

function phlRenderBlend(tab) {
  const data = tab === 'digraphs' ? DIGRAPHS : BLENDS;
  document.getElementById('phl-blend-grid').innerHTML = data.map(d => `
    <div class="ph-blend-card" onclick="phSpeakBlend('${d.c}','${d.w}')">
      <div class="ph-combo">${d.c}</div>
      <div class="ph-sound" style="font-size:12px">${d.s}</div>
      <div style="font-size:26px">${d.e}</div>
      <div class="ph-example">${d.w}</div>
    </div>
  `).join('');
}
/* ═══════════════════════════════════════════
   PHONICS 英语自然拼读
═══════════════════════════════════════════ */
// LETTER_SOUNDS, DIGRAPHS, BLENDS, VOWEL_RULES, CVC_WORDS_LIST, PHONICS_SONGS are in data.js
let cvcQueue=[], cvcIdx=0, cvcAnswered=false;
let cvcCurrent='';
function phSpeakLetter(letter, word) {
  speechSynthesis.cancel();
  const u1 = _makeUtterance(letter, 'en-US');
  u1.rate = 0.6; u1.pitch = 1.0;
  _safeSpeak(u1);
  const u2 = _makeUtterance(word, 'en-US');
  u2.rate = 0.8; u2.pitch = 1.0;
  u1.onend = () => { setTimeout(() => _safeSpeak(u2), 300); };
}

function phSpeakBlend(combo, word) {
  speechSynthesis.cancel();
  const u1 = _makeUtterance(combo, 'en-US');
  u1.rate = 0.5; u1.pitch = 1.0;
  _safeSpeak(u1);
  const u2 = _makeUtterance(word, 'en-US');
  u2.rate = 0.8; u2.pitch = 1.0;
  u1.onend = () => { setTimeout(() => _safeSpeak(u2), 300); };
}

function phRenderVowels() {
  document.getElementById('ph-vowel-content').innerHTML = VOWEL_RULES.map(rule => `
    <div style="background:${rule.color};border:3px solid ${rule.border};border-radius:20px;padding:16px;margin-bottom:14px">
      <div style="font-size:17px;font-weight:800;margin-bottom:10px">${rule.title}</div>
      ${rule.rows.map(r => `
        <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid rgba(0,0,0,0.08)">
          <span style="font-size:28px;min-width:40px;text-align:center;font-weight:900">${esc(r.emoji)}</span>
          <div>
            <span style="font-size:20px;font-weight:800;color:#333">${esc(r.v)}</span>
            <span style="font-size:14px;color:#666;margin-left:8px">${esc(r.ex)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function cvcStart() {
  cvcQueue = shuffle([...CVC_WORDS_LIST]).slice(0,10);
  cvcIdx = 0; cvcAnswered = false;
  cvcRenderQ();
}

function cvcRenderQ() {
  if (cvcIdx >= cvcQueue.length) { showSub('phonics','home'); return; }

  cvcAnswered = false;
  const item = cvcQueue[cvcIdx];
  cvcCurrent = item.w;
  document.getElementById('cvc-prog-label').textContent = `第 ${cvcIdx+1} 题 / 共 ${cvcQueue.length} 题`;
  document.getElementById('cvc-prog-fill').style.width = `${(cvcIdx/cvcQueue.length)*100}%`;
  document.getElementById('cvc-next').disabled = true;
  // 显示字母色块
  const letters = item.w.split('');
  document.getElementById('cvc-letters').innerHTML = letters.map((l,i)=>`
    <div class="ph-cvc-chip ${i===1?'hl-v':'hl-c'}">${l.toUpperCase()}</div>
  `).join('');
  // 4个选项（图片）
  const all = CVC_WORDS_LIST;
  const others = shuffle(all.filter(x=>x.w!==item.w)).slice(0,3);
  const opts = shuffle([item,...others]);
  document.getElementById('cvc-opts').innerHTML = opts.map(o=>`
    <div class="quiz-opt" onclick="cvcSelect(this,'${o.w}','${item.w}')">
      <span style="font-size:48px">${o.e}</span>
    </div>
  `).join('');
  setTimeout(()=>speakWordText(item.w), 300);
}

function cvcSelect(el, chosen, correct) {
  if (cvcAnswered) return;
  cvcAnswered = true;
  el.classList.add(chosen===correct?'correct':'wrong');
  if (chosen===correct) burst(el);
  document.getElementById('cvc-next').disabled = false;
}

function cvcNext() { cvcIdx++; cvcRenderQ(); }

function phRenderSongs() {
  document.getElementById('ph-songs-list').innerHTML = PHONICS_SONGS.map((s,si)=>`
    <div class="song-card">
      <div class="song-title">${s.title}</div>
      ${s.lines.map((l,li)=>`<div class="song-line" id="phsong-${si}-${li}">${l}</div>`).join('')}
      <button class="song-play-btn" onclick="playSong('ph',${si})">▶ 朗读全曲</button>
    </div>
  `).join('');
}
