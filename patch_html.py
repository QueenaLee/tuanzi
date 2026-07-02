#!/usr/bin/env python3
"""Patch the HTML to add PWA support and use external data.js"""
import re

html_path = r'C:/Users/ganlu1/AppData/Roaming/WeiboAP/Data/agents/agent_1776133474942_iimlq7np1/kids-learning-app/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add PWA manifest link in <head>
manifest_link = '  <link rel="manifest" href="manifest.json">\n  <meta name="theme-color" content="#FF6B6B">\n  <meta name="apple-mobile-web-app-capable" content="yes">\n  <meta name="apple-mobile-web-app-status-bar-style" content="default">\n  <meta name="apple-mobile-web-app-title" content="小小学习家">\n  <link rel="apple-touch-icon" href="icons/icon-192.png">\n'
html = html.replace('</title>', '</title>\n' + manifest_link)

# 2. Add service worker registration before </body>
sw_code = '''<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(() => console.log('SW registered'));
}
</script>'''
html = html.replace('</body>', sw_code + '\n</body>')

# 3. Replace inline data with external data.js reference
# Find the <script> block that starts with const WORDS
# and replace everything from there to the start of the function code

# The pattern: from "const WORDS = {" to the line before "/* HOME SUBJECT TAB SWITCH"
data_start = html.find('const WORDS = {')
if data_start == -1:
    print("ERROR: Could not find 'const WORDS' in HTML")
    exit(1)

# Find the end of data section - it's right before the HOME SUBJECT TAB SWITCH comment
data_end_marker = '/* ═══════════════════════════════════════════\n   HOME SUBJECT TAB SWITCH'
data_end = html.find(data_end_marker)
if data_end == -1:
    print("ERROR: Could not find 'HOME SUBJECT TAB SWITCH' marker")
    exit(1)

# Also find the <script> tag before data
script_tag_start = html.rfind('<script>', 0, data_start)
script_tag_end = html.find('\n', script_tag_start) + 1

# Replace: remove old <script> tag and data, add new <script src="data.js"> tag + remaining functions
# We need to keep the functions that were in the same <script> block
# The data section ends at data_end, but functions start at the HOME SUBJECT TAB SWITCH comment

# Replace the entire old script block content from <script> to just before HOME SUBJECT TAB SWITCH
# with just the data.js import
replacement = '<script src="data.js"></script>\n<script>\n/* ═══════════════════════════════════════════\n   HOME SUBJECT TAB SWITCH'
html = html[:script_tag_start] + replacement + html[data_end + len(data_end_marker):]

# 4. Update PY_SONGS usage - the original code references PY_SONGS directly
# Our data.js already exports it as PY_SONGS, so it should work

# 5. Update WORDS category tabs - original has hardcoded tabs for 'fruits', 'animals', 'body'
# We need to make the tabs dynamic. Find the cat-tabs section and update it.
# The original HTML has hardcoded cat-tab buttons in #word-cards and #word-flash pages
# We'll need to make those dynamic via JS instead

# 6. Update flash category selection - original has hardcoded buttons for 3 categories
# Find the flash-cat-screen section

# 7. Replace PY_SONGS data that was inline
# Already handled by removing the data block

# 8. Also need to handle: the original HANZI_DATA structure is different from HANZI_LEVELS
# Original: HANZI_DATA = { nature: [...], body: [...], numbers: [...] }
# New: HANZI_LEVELS = { level1: { name, categories: { cat1: [...], ... } }, ... }
# We need to add a compatibility layer or update the hanzi rendering code

# Let's add a compatibility wrapper in the script that converts HANZI_LEVELS to the format
# the original code expects, and also adds dynamic category tabs

compat_code = '''
/* ═══ DATA COMPAT & DYNAMIC INIT ═══ */
// Convert HANZI_LEVELS to flat HANZI_DATA format for original code compatibility
const HANZI_DATA = {};
for (const [lvl, data] of Object.entries(HANZI_LEVELS)) {
  for (const [cat, chars] of Object.entries(data.categories)) {
    HANZI_DATA[cat] = chars;
  }
}

// Category display names (Chinese labels for tabs)
const CAT_LABELS = {
  fruit: '水果', seaAnimals: '海洋动物', wildAnimals: '野生动物', farmAnimals: '农场动物',
  pets: '宠物', stapleFood: '主食', snacks: '零食甜点', drinks: '饮品',
  fastFood: '快餐', vegetables: '蔬菜', clothes: '服饰', schoolSupplies: '学习用品',
  toysDolls: '玩具', transport: '交通工具', places: '场所', jobs: '职业',
  prepositions: '方位', feelings: '情绪', colours: '颜色', insects: '昆虫',
  bodyParts: '身体', weather: '天气', week: '星期', month: '月份',
  dailySentences: '日常短句', furniture: '家居', antonyms: '反义词', numbers: '数字',
  fruit: '🍎水果', seaanimals: '🐟海洋', wildanimals: '🦁野生', farmanimals: '🐔农场',
  pets: '🐶宠物', staplefood: '🍚主食', snacksdesserts: '🍰零食', drinks: '🥤饮品',
  fastfood: '🍔快餐', vegetables: '🥕蔬菜', clothes: '👕服饰', schoolsupplies: '✏️文具',
  toysdolls: '🧸玩具', transport: '🚗交通', places: '🏫场所', jobs: '👷职业',
  prepositionsofplace: '📍方位', feelingsemotions: '😊情绪', colours: '🎨颜色',
  insects: '🦋昆虫', bodyparts: '👀身体', weather: '☀️天气', week: '📅星期',
  month: '🗓️月份', dailysentences: '💬短句', furniture: '🛋️家居', antonyms: '⚖️反义词',
  numbers: '🔢数字',
};

// Build dynamic category tabs for word cards and word-flash pages
function buildCatTabs(containerId, onSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = CAT_KEYS.map((key, i) =>
    `<div class="cat-tab ${i === 0 ? 'active' : ''}" data-idx="${i}" onclick="${onSelect}(${i})">${CAT_LABELS[key] || key}</div>`
  ).join('');
}

// Initialize dynamic tabs on page load
function initDynamicTabs() {
  buildCatTabs('wc-tabs', 'wcSelectCat');
  buildCatTabs('wf-tabs', 'wfSelectCat');
  buildCatTabs('quiz-cat-tabs', 'quizSelectCat');
  buildCatTabs('match-cat-tabs', 'matchSelectCat');
}

// Override category selection for word-cards
let wcCat = 0;
let wcPage = 0;
const WC_PAGE_SIZE = 6;

function wcSelectCat(idx) {
  wcCat = idx; wcPage = 0;
  document.querySelectorAll('#wc-tabs .cat-tab').forEach((t, i) => t.classList.toggle('active', i === idx));
  renderWcGrid();
}

function wcChangePage(delta) {
  const words = WORDS[CAT_KEYS[wcCat]];
  const totalPages = Math.ceil(words.length / WC_PAGE_SIZE);
  wcPage = Math.max(0, Math.min(totalPages - 1, wcPage + delta));
  renderWcGrid();
}

function renderWcGrid() {
  const words = WORDS[CAT_KEYS[wcCat]];
  const totalPages = Math.ceil(words.length / WC_PAGE_SIZE);
  const slice = words.slice(wcPage * WC_PAGE_SIZE, wcPage * WC_PAGE_SIZE + WC_PAGE_SIZE);
  document.getElementById('word-grid').innerHTML = slice.map(w => `
    <div class="word-card" onclick="speakWordText('${w.en.replace(/'/g, "\\'")}')">
      <span class="w-emoji">${w.emoji}</span>
      <div class="w-en">${w.en}</div>
      <div class="w-zh">${w.zh}</div>
    </div>
  `).join('');
  document.getElementById('wc-page-info').textContent = `${wcPage + 1} / ${totalPages}`;
  document.getElementById('wc-prev').disabled = wcPage === 0;
  document.getElementById('wc-next').disabled = wcPage >= totalPages - 1;
}

'''

# Insert compat code right after the HOME SUBJECT TAB SWITCH comment
insert_pos = html.find('/* ═══════════════════════════════════════════\n   HOME SUBJECT TAB SWITCH')
if insert_pos != -1:
    html = html[:insert_pos] + compat_code + html[insert_pos:]

# 9. Add initDynamicTabs() call at the end of the script
# Find the window.onload or DOMContentLoaded or the initialization part
init_call = '\ninitDynamicTabs();\n'
# Add it before the closing </script> of the main script block
# Find the last </script> before the SW registration we added
last_script_close = html.rfind('</script>')
if last_script_close != -1:
    html = html[:last_script_close] + init_call + html[last_script_close:]

# 10. Update the flash category screen to be dynamic
# Find the flash-cat-screen and make it dynamic
flash_cat_pattern = r'<div id="flash-cat-screen"[^>]*>.*?</div>\s*</div>'
# This is complex, let's just replace the hardcoded buttons inside it

# Find and replace the hardcoded flash category buttons
flash_cat_start = html.find('id="flash-cat-screen"')
if flash_cat_start != -1:
    # Find the inner content
    inner_start = html.find('>', flash_cat_start) + 1
    # Find the closing divs - we need to be careful here
    # Let's find the pattern of hardcoded flash buttons
    old_flash_btns = re.search(r'<div id="flash-cat-screen"[^>]*>.*?(?=<div id="flash-main")', html, re.DOTALL)
    if old_flash_btns:
        new_flash_html = '''<div id="flash-cat-screen" style="padding:20px;max-width:480px;margin:0 auto;">
    <div style="display:flex;flex-direction:column;gap:14px;" id="flash-cat-list"></div>
  </div>'''
        html = html[:old_flash_btns.start()] + new_flash_html + html[old_flash_btns.end():]

# 11. Update startFlashCat to work with new categories
# The original startFlashCat only handles 'all', 'fruits', 'animals', 'body'
# We need to update it to handle any category key
old_flash_cat = 'function startFlashCat(cat) {'
new_flash_cat = 'function startFlashCat(cat) {'
# Find the function body
flash_cat_func_start = html.find('function startFlashCat(cat) {')
if flash_cat_func_start != -1:
    func_end = html.find('\n}', flash_cat_func_start + 1)
    # Also find the next function to make sure we get the right closing brace
    # Actually let's find the matching brace
    brace_count = 0
    func_body_start = html.find('{', flash_cat_func_start)
    for i in range(func_body_start, len(html)):
        if html[i] == '{': brace_count += 1
        elif html[i] == '}': brace_count -= 1
        if brace_count == 0:
            func_body_end = i + 1
            break

    old_func = html[flash_cat_func_start:func_body_end]
    new_func = '''function startFlashCat(cat) {
  let pool;
  if (cat === 'all') {
    pool = shuffle(Object.values(WORDS).flat()).slice(0, 6);
  } else {
    pool = [...WORDS[cat]];
  }
  flashQueue = pool;
  flashIdx   = 0;
  document.getElementById('flash-cat-screen').style.display = 'none';
  document.getElementById('flash-main').style.display = 'block';
  flashRunWord();
}'''
    html = html[:flash_cat_func_start] + new_func + html[func_body_end:]

# 12. Build flash category buttons dynamically
# Add this to the initDynamicTabs function
flash_init_code = '''
  // Build flash category buttons
  const flashCatList = document.getElementById('flash-cat-list');
  if (flashCatList) {
    const allBtn = `<div class="flash-cat-btn" onclick="startFlashCat('all')">
      <span style="font-size:36px">🌟</span>
      <div><div style="font-size:18px;font-weight:800">随机练习</div>
      <div style="font-size:13px;color:#718096">从所有类别随机选词</div></div></div>`;
    const catBtns = CAT_KEYS.map(key => {
      const count = WORDS[key] ? WORDS[key].length : 0;
      const label = CAT_LABELS[key] || key;
      return `<div class="flash-cat-btn" onclick="startFlashCat('${key}')">
        <span style="font-size:36px">${(WORDS[key] && WORDS[key][0]) ? WORDS[key][0].emoji : '📝'}</span>
        <div><div style="font-size:18px;font-weight:800">${label}</div>
        <div style="font-size:13px;color:#718096">${count} 个词</div></div></div>`;
    }).join('');
    flashCatList.innerHTML = allBtn + catBtns;
  }
'''
# Add to initDynamicTabs
html = html.replace('initDynamicTabs();', flash_init_code + 'initDynamicTabs();')

# 13. Update wfStartSingleFlash to work with all categories
old_wf_start = "const allWords = [...WORDS.fruits, ...WORDS.animals, ...WORDS.body];"
new_wf_start = "const allWords = Object.values(WORDS).flat();"
html = html.replace(old_wf_start, new_wf_start)

# Also update startFlashCat's 'all' pool
old_all_pool = "pool = shuffle([...WORDS.fruits, ...WORDS.animals, ...WORDS.body]).slice(0, 6);"
new_all_pool = "pool = shuffle(Object.values(WORDS).flat()).slice(0, 6);"
html = html.replace(old_all_pool, new_all_pool)

# 14. Update the quiz and match to use new category structure
# These already use CAT_KEYS and WORDS dynamically, so should work

# 15. Fix the word-flash tabs - replace hardcoded tab HTML
# Find and replace the wf-tabs content
wf_tabs_pattern = r'<div id="wf-tabs" class="cat-tabs">.*?</div>'
wf_tabs_match = re.search(r'<div id="wf-tabs" class="cat-tabs">.*?</div>', html, re.DOTALL)
if wf_tabs_match:
    html = html[:wf_tabs_match.start()] + '<div id="wf-tabs" class="cat-tabs"></div>' + html[wf_tabs_match.end():]

# Same for wc-tabs
wc_tabs_match = re.search(r'<div id="wc-tabs" class="cat-tabs">.*?</div>', html, re.DOTALL)
if wc_tabs_match:
    html = html[:wc_tabs_match.start()] + '<div id="wc-tabs" class="cat-tabs"></div>' + html[wc_tabs_match.end():]

# Save
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("HTML patched successfully!")
print(f"File size: {len(html)} chars")
