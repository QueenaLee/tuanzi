#!/usr/bin/env python3
"""Parse data files and inject into the HTML app."""
import re
import json

# ── 1. Parse 词汇表.txt → WORDS + SYLLABLES ──
def parse_vocab(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    words = {}
    syllables = {}

    current_cat = None
    cat_key = None
    # emoji mapping for categories
    cat_emojis = {
        '水果': '🍎', '海洋动物': '🐟', '野生动物': '🦁', '农场动物': '🐔',
        '宠物': '🐶', '主食': '🍚', '零食甜点': '🍰', '饮品': '🥤',
        '快餐': '🍔', '蔬菜': '🥕', '服饰': '👕', '学习用品': '✏️',
        '玩具': '🧸', '交通工具': '🚗', '场所': '🏫', '职业': '👨‍⚕️',
        '方位': '📍', '情绪': '😊', '颜色': '🎨', '昆虫': '🦋',
        '五官身体部位': '👀', '天气': '☀️', '星期': '📅', '月份': '🗓️',
        '日常生活短句': '💬', '家居物品': '🛋️', '启蒙反义词': '⚖️', '数字': '🔢',
    }

    for line in text.strip().split('\n'):
        line = line.strip()
        if not line:
            continue

        # Category header: ## 一、水果 Fruit  or ## 十一、服饰 Clothes（完整扩充版）
        m = re.match(r'##\s*[一二三四五六七八九十]+、(.+)', line)
        if m:
            full = m.group(1).strip()
            # Split Chinese name from English: "水果 Fruit" or "服饰 Clothes（完整扩充版）"
            parts = re.match(r'([一-鿿　-〿＀-￯]+)\s*(.*)', full)
            if parts:
                cat_cn = parts.group(1).strip()
                cat_en = parts.group(2).strip()
            else:
                cat_cn = full
                cat_en = ''
            # Clean key: strip Chinese parenthetical notes, use English only
            cat_en_clean = re.sub(r'[（(].+?[）)]', '', cat_en).strip()
            cat_key = re.sub(r'[^a-zA-Z]', '', cat_en_clean).lower() if cat_en_clean else ''
            if not cat_key:
                cn_to_en = {
                    '水果': 'fruits', '海洋动物': 'seaAnimals', '野生动物': 'wildAnimals',
                    '农场动物': 'farmAnimals', '宠物': 'pets', '主食': 'stapleFood',
                    '零食甜点': 'snacks', '饮品': 'drinks', '快餐': 'fastFood',
                    '蔬菜': 'vegetables', '服饰': 'clothes', '学习用品': 'schoolSupplies',
                    '玩具': 'toys', '交通工具': 'transport', '场所': 'places',
                    '职业': 'jobs', '方位': 'prepositions', '情绪': 'feelings',
                    '颜色': 'colours', '昆虫': 'insects', '五官身体部位': 'bodyParts',
                    '天气': 'weather', '星期': 'week', '月份': 'month',
                    '日常生活短句': 'dailySentences', '家居物品': 'furniture',
                    '启蒙反义词': 'antonyms', '数字': 'numbers',
                }
                cat_key = cn_to_en.get(cat_cn, cat_cn)
            current_cat = cat_cn
            if cat_key not in words:
                words[cat_key] = []
            continue

        # Sub-header: ### 一、起居洗漱｜日常作息
        if line.startswith('###'):
            continue

        # Special: antonyms line format is different
        if current_cat and current_cat == '启蒙反义词':
            # big — 大的 ｜ small — 小的
            parts = re.split(r'｜', line)
            for part in parts:
                m2 = re.match(r'(\w+)\s*—\s*(.+)', part.strip())
                if m2:
                    en_word = m2.group(1).strip()
                    zh_word = m2.group(2).strip()
                    emoji = cat_emojis.get(current_cat, '📝')
                    if cat_key and cat_key in words:
                        words[cat_key].append({
                            'en': en_word, 'zh': zh_word, 'emoji': emoji
                        })
            continue

        # Daily sentences format
        if current_cat and current_cat == '日常生活短句':
            m2 = re.match(r'(.+?)\s*—\s*(.+)', line)
            if m2:
                en_phrase = m2.group(1).strip()
                zh_phrase = m2.group(2).strip()
                emoji = cat_emojis.get(current_cat, '💬')
                if cat_key and cat_key in words:
                    words[cat_key].append({
                        'en': en_phrase, 'zh': zh_phrase, 'emoji': emoji
                    })
            continue

        # Number format: zero /ˈzɪərəʊ/ — 零
        # Standard format: apple /ˈæpl/ — 苹果
        m2 = re.match(r'(.+?)\s*/[^/]*/\s*—\s*(.+)', line)
        if m2 and current_cat:
            en_word = m2.group(1).strip()
            zh_word = m2.group(2).strip()
            emoji = cat_emojis.get(current_cat, '📝')
            if cat_key and cat_key in words:
                words[cat_key].append({
                    'en': en_word, 'zh': zh_word, 'emoji': emoji
                })
                # Generate syllables
                syls = generate_syllables(en_word)
                syllables[en_word] = syls

    return words, syllables


def generate_syllables(word):
    """Simple syllable splitting for common English words."""
    word = word.strip().lower()
    # Multi-word phrases: split by spaces
    if ' ' in word:
        parts = word.split()
        result = []
        for p in parts:
            result.extend(generate_syllables(p))
        return result

    # Common word mapping
    known = {
        'apple': ['ap','ple'], 'banana': ['ba','na','na'], 'orange': ['or','ange'],
        'watermelon': ['wa','ter','mel','on'], 'pineapple': ['pine','ap','ple'],
        'cherry': ['cher','ry'], 'lemon': ['lem','on'], 'strawberry': ['straw','ber','ry'],
        'blueberry': ['blue','ber','ry'], 'grapefruit': ['grape','fruit'],
        'pomegranate': ['pome','gran','ate'], 'avocado': ['av','o','ca','do'],
        'dolphin': ['dol','phin'], 'octopus': ['oc','to','pus'], 'jellyfish': ['jel','ly','fish'],
        'seahorse': ['sea','horse'], 'starfish': ['star','fish'], 'elephant': ['el','e','phant'],
        'giraffe': ['gi','raffe'], 'kangaroo': ['kan','ga','roo'], 'gorilla': ['go','ril','la'],
        'hippopotamus': ['hip','po','pot','a','mus'], 'restaurant': ['res','tau','rant'],
        'supermarket': ['su','per','mar','ket'], 'playground': ['play','ground'],
        'hamburger': ['ham','bur','ger'], 'broccoli': ['broc','co','li'],
        'cauliflower': ['cau','li','flow','er'], 'cucumber': ['cu','cum','ber'],
        'mushroom': ['mush','room'], 'volleyball': ['vol','ley','ball'],
        'watermelon': ['wa','ter','mel','on'], 'helicopter': ['hel','i','cop','ter'],
        'motorcycle': ['mo','tor','cy','cle'], 'astronaut': ['as','tro','naut'],
        'calculator': ['cal','cu','la','tor'], 'dinosaur': ['di','no','saur'],
        'elevator': ['el','e','va','tor'], 'hamburger': ['ham','bur','ger'],
        'instrument': ['in','stru','ment'], 'geography': ['ge','og','ra','phy'],
        'thermometer': ['ther','mom','e','ter'], 'crocodile': ['croc','o','dile'],
        'dragonfly': ['drag','on','fly'], 'pineapple': ['pine','ap','ple'],
        'sunshine': ['sun','shine'], 'chocolate': ['choc','o','late'],
        'everything': ['ev','ery','thing'], 'classroom': ['class','room'],
        'fireplace': ['fire','place'], 'paragraph': ['par','a','graph'],
        'backpack': ['back','pack'],
    }
    if word in known:
        return known[word]

    # Simple vowel-based splitting
    vowels = 'aeiouy'
    syls = []
    current = ''
    for i, ch in enumerate(word):
        current += ch
        if ch in vowels and i < len(word) - 1:
            # Look ahead: if next is consonant and the one after is vowel, break
            if i + 1 < len(word) and word[i+1] not in vowels:
                if i + 2 < len(word) and word[i+2] in vowels:
                    syls.append(current)
                    current = ''
    if current:
        if syls and len(current) <= 2:
            syls[-1] += current
        else:
            syls.append(current)

    return syls if syls else [word]


# ── 2. Parse 拼音儿歌.txt → PY_SONGS ──
def parse_pinyin_songs(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    songs = []
    current_title = None
    current_lines = []

    for line in text.strip().split('\n'):
        line = line.strip()
        if not line:
            continue

        # Section header: ## 一、开篇总起儿歌（学拼音目的）
        m = re.match(r'##\s*[一二三四五六七八九十]+、(.+)', line)
        if m:
            if current_title and current_lines:
                songs.append({'title': current_title, 'lines': current_lines})
            current_title = m.group(1).strip()
            current_lines = []
            continue

        # Sub-section header: ### 1.介母认知儿歌
        if line.startswith('###'):
            if current_title and current_lines:
                songs.append({'title': current_title, 'lines': current_lines})
            current_title = line.replace('###', '').strip()
            current_lines = []
            continue

        current_lines.append(line)

    if current_title and current_lines:
        songs.append({'title': current_title, 'lines': current_lines})

    return songs


# ── 3. Parse 英语自然拼读.txt → PHONICS data ──
def parse_phonics(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    letter_sounds = []
    digraphs = []
    blends = []
    phonics_songs = []

    for line in text.strip().split('\n'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue

        # Section headers
        if line.startswith('##'):
            continue

        # Letter line: A a /æ/ /æ/ /æ/ apple apple /æ/ /æ/ /æ/ ant animal /æ/ /æ/ /æ/ alphabet /æ/ /æ/ /æ/
        m = re.match(r'^([A-Z])\s+([a-z])\s+(/[^/]+/)\s+/[^/]*/\s+/[^/]*/\s+(\w+)\s+\w+\s+/[^/]*/\s+/[^/]*/\s+/[^/]*/\s+(\w+)', line)
        if m:
            letter = m.group(1)
            sound = m.group(3)
            word1 = m.group(4)
            word2 = m.group(5)
            letter_sounds.append({
                'L': letter, 'l': letter.lower(), 's': sound,
                'w': word1, 'e': get_emoji(word1)
            })
            continue

        # Blend lines: sh /ʃ/ /ʃ/ /ʃ/ ship ship /ʃ/ /ʃ/ /ʃ/ shop shadow /ʃ/ /ʃ/ /ʃ/ sunshine /ʃ/ /ʃ/ /ʃ/
        m = re.match(r'^(sh|ch|th清|th浊|ph)\s+(/[^/]+/)\s+/[^/]*/\s+/[^/]*/\s+(\w+)', line)
        if m:
            combo = m.group(1)
            sound = m.group(2)
            word = m.group(3)
            digraphs.append({
                'c': combo, 's': sound, 'w': word, 'e': get_emoji(word)
            })
            continue

        m = re.match(r'^(bl|cl|fl|gl|pl|sl|br|cr|dr|fr|gr|pr|tr|ck|ng|nk)\s+(/[^/]+/)\s+/[^/]*/\s+/[^/]*/\s+(\w+)', line)
        if m:
            combo = m.group(1)
            sound = m.group(2)
            word = m.group(3)
            blends.append({
                'c': combo, 's': sound, 'w': word, 'e': get_emoji(word)
            })
            continue

        # Rhyme lines
        m = re.match(r'^([A-Z][a-z])\s+(/[^/]+/),?\s*(.+)', line)
        if m:
            letter = m.group(1)
            sound = m.group(2)
            rhyme = m.group(3)
            phonics_songs.append({
                'letter': letter, 'sound': sound, 'rhyme': rhyme
            })
            continue

        # Sh/ch/bl etc rhyme lines
        m = re.match(r'^(sh|ch|th|bl|cl|fl|gl|pl|sl|br|cr|dr|fr|gr|pr|tr|ck|ng|nk)\S*\s+(.+)', line)
        if m:
            phonics_songs.append({
                'letter': m.group(1), 'sound': '', 'rhyme': m.group(2)
            })
            continue

    return letter_sounds, digraphs, blends, phonics_songs


def get_emoji(word):
    """Map common words to emoji."""
    emoji_map = {
        'apple': '🍎', 'ant': '🐜', 'alphabet': '🔤', 'ball': '⚽', 'bag': '👜',
        'basket': '🧺', 'banana': '🍌', 'cat': '🐱', 'cap': '🧢', 'camera': '📷',
        'calculator': '🧮', 'dog': '🐶', 'dot': '⚫', 'dinner': '🍽️', 'dinosaur': '🦕',
        'egg': '🥚', 'pen': '🖊️', 'elephant': '🐘', 'elevator': '🛗', 'fish': '🐟',
        'fan': '🌬️', 'flower': '🌸', 'family': '👨‍👩‍👧', 'goat': '🐐', 'gun': '🔫',
        'garden': '🌻', 'geography': '🌍', 'hat': '🎩', 'ham': '🍖', 'honey': '🍯',
        'hamburger': '🍔', 'igloo': '🧊', 'ink': '🖊️', 'insect': '🐛', 'instrument': '🎵',
        'jam': '🍓', 'jug': '🫗', 'jacket': '🧥', 'January': '🗓️', 'kite': '🪁',
        'kid': '🧒', 'kitchen': '🍳', 'kangaroo': '🦘', 'log': '🪵', 'leg': '🦵',
        'lemon': '🍋', 'library': '📚', 'mat': '🧘', 'map': '🗺️', 'mango': '🥭',
        'magazine': '📰', 'nut': '🥜', 'net': '🏸', 'number': '🔢', 'necklace': '📿',
        'orange': '🍊', 'ox': '🐂', 'octopus': '🐙', 'october': '🎃', 'pig': '🐷',
        'pizza': '🍕', 'paragraph': '📝', 'queen': '👸', 'quit': '🚪', 'quiet': '🤫',
        'quantity': '📊', 'rat': '🐀', 'rug': '🟫', 'rabbit': '🐰', 'radio': '📻',
        'sun': '☀️', 'sock': '🧦', 'salad': '🥗', 'sandwich': '🥪', 'tiger': '🐯',
        'tap': '🚰', 'tomato': '🍅', 'telephone': '☎️', 'umbrella': '☂️', 'uncle': '👨',
        'university': '🎓', 'van': '🚐', 'vest': '🦺', 'violin': '🎻', 'volleyball': '🏐',
        'web': '🕸️', 'wig': '💇', 'window': '🪟', 'watermelon': '🍉', 'box': '📦',
        'fox': '🦊', 'taxi': '🚕', 'maximum': '📈', 'yam': '🍠', 'yard': '🏡',
        'yogurt': '🥛', 'yesterday': '📅', 'zoo': '🦁', 'zip': '🤐', 'zebra': '🦓',
        'zero': '0️⃣', 'ship': '🚢', 'shop': '🛒', 'shadow': '👤', 'sunshine': '🌞',
        'chair': '🪑', 'cherry': '🍒', 'chicken': '🐔', 'chocolate': '🍫', 'tooth': '🦷',
        'three': '3️⃣', 'thread': '🧵', 'this': '👆', 'that': '👉', 'father': '👨',
        'together': '🤝', 'phone': '📱', 'photo': '📸', 'blue': '🔵', 'block': '🧱',
        'blanket': '🛌', 'broccoli': '🥦', 'clock': '🕐', 'cloud': '☁️', 'clever': '🧠',
        'classroom': '🏫', 'flower': '🌸', 'fly': '🪰', 'flamingo': '🦩', 'fireplace': '🔥',
        'glass': '🥛', 'globe': '🌍', 'glitter': '✨', 'glacier': '🏔️', 'plane': '✈️',
        'plant': '🌱', 'pumpkin': '🎃', 'pineapple': '🍍', 'snake': '🐍', 'sleep': '😴',
        'slow': '🐌', 'slipper': '🩴', 'bread': '🍞', 'brown': '🟤', 'brother': '👦',
        'crab': '🦀', 'cream': '🍦', 'crayon': '🖍️', 'crocodile': '🐊', 'dress': '👗',
        'dream': '💤', 'dragon': '🐉', 'dragonfly': '🪰', 'frog': '🐸', 'fruit': '🍇',
        'friend': '🤝', 'February': '📅', 'grape': '🍇', 'grass': '🌿', 'grandpa': '👴',
        'grocery': '🛒', 'press': '🖱️', 'pride': '🦁', 'present': '🎁', 'president': '👔',
        'tree': '🌳', 'train': '🚂', 'triangle': '🔺', 'traffic': '🚦', 'duck': '🦆',
        'black': '⬛', 'backpack': '🎒', 'sing': '🎤', 'king': '👑', 'morning': '🌅',
        'pink': '🩷', 'sink': '🚰', 'thinker': '🤔',
    }
    return emoji_map.get(word.lower(), '📝')


# ── 4. Parse 汉字.txt → HANZI_DATA ──
def parse_hanzi(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    levels = {}
    current_level = None
    current_cat = None

    for line in text.strip().split('\n'):
        line = line.strip()
        if not line:
            continue

        # Level header: # 第一级 幼儿园入门基础识字（零基础3-5岁）
        m = re.match(r'#\s*第([一二三四五六七])级\s+(.+)', line)
        if m:
            level_num = '一二三四五六七'.index(m.group(1)) + 1
            level_name = m.group(2).strip()
            current_level = f'level{level_num}'
            levels[current_level] = {'name': level_name, 'categories': {}}
            continue

        # Category header: ## 1.数字基础
        m = re.match(r'##\s*\d+\.(.+)', line)
        if m and current_level:
            current_cat = m.group(1).strip()
            levels[current_level]['categories'][current_cat] = []
            continue

        # Character line: 零、一、二、三、... or 长方形、正方形、...
        if current_level and current_cat and not line.startswith('#') and not line.startswith('##'):
            if current_cat not in levels[current_level]['categories']:
                levels[current_level]['categories'][current_cat] = []
            chars = re.split(r'[、，,\s]+', line)
            for ch in chars:
                ch = ch.strip()
                if ch and len(ch) <= 6 and not ch.startswith('#'):
                    levels[current_level]['categories'][current_cat].append({
                        'c': ch, 'py': '', 'e': '📝', 'words': []
                    })

    return levels


# ── Main: parse all and generate JS ──
if __name__ == '__main__':
    base = r'C:/Users/ganlu1/Desktop'

    words, syllables = parse_vocab(f'{base}/词汇表.txt')
    py_songs = parse_pinyin_songs(f'{base}/拼音儿歌.txt')
    letter_sounds, digraphs, blends, phonics_songs = parse_phonics(f'{base}/英语自然拼读.txt')
    hanzi_levels = parse_hanzi(f'{base}/汉字.txt')

    # Generate JS code
    js_words = f'const WORDS = {json.dumps(words, ensure_ascii=False, indent=2)};\n'
    js_words += f"const CAT_KEYS = {json.dumps(list(words.keys()), ensure_ascii=False)};\n"
    js_words += f'const SYLLABLES = {json.dumps(syllables, ensure_ascii=False, indent=2)};\n'
    js_py_songs = f'const PY_SONGS = {json.dumps(py_songs, ensure_ascii=False, indent=2)};\n'
    js_phonics = f'const LETTER_SOUNDS = {json.dumps(letter_sounds, ensure_ascii=False, indent=2)};\n'
    js_phonics += f'const DIGRAPHS = {json.dumps(digraphs, ensure_ascii=False, indent=2)};\n'
    js_phonics += f'const BLENDS = {json.dumps(blends, ensure_ascii=False, indent=2)};\n'
    js_phonics += f'const PHONICS_SONGS = {json.dumps(phonics_songs, ensure_ascii=False, indent=2)};\n'
    js_hanzi = f'const HANZI_LEVELS = {json.dumps(hanzi_levels, ensure_ascii=False, indent=2)};\n'

    # Write to a data JS file
    out_dir = r'C:/Users/ganlu1/AppData/Roaming/WeiboAP/Data/agents/agent_1776133474942_iimlq7np1/kids-learning-app'
    with open(f'{out_dir}/data.js', 'w', encoding='utf-8') as f:
        f.write('/* Auto-generated data from external files */\n\n')
        f.write(js_words)
        f.write('\n')
        f.write(js_py_songs)
        f.write('\n')
        f.write(js_phonics)
        f.write('\n')
        f.write(js_hanzi)

    print(f'WORDS categories: {list(words.keys())}')
    for k, v in words.items():
        print(f'  {k}: {len(v)} items')
    print(f'SYLLABLES: {len(syllables)} entries')
    print(f'PY_SONGS: {len(py_songs)} songs')
    print(f'LETTER_SOUNDS: {len(letter_sounds)} entries')
    print(f'DIGRAPHS: {len(digraphs)} entries')
    print(f'BLENDS: {len(blends)} entries')
    print(f'PHONICS_SONGS: {len(phonics_songs)} entries')
    print(f'HANZI_LEVELS: {len(hanzi_levels)} levels')
    for k, v in hanzi_levels.items():
        total = sum(len(chars) for chars in v['categories'].values())
        print(f'  {k} ({v["name"]}): {total} chars')
