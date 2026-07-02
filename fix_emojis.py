#!/usr/bin/env python3
"""Fix incorrect emojis and add Twemoji image URLs to data.js (excluding dailysentences)."""

import re

def emoji_to_twemoji_url(emoji_str):
    """Convert emoji string to Twemoji SVG URL."""
    codepoints = []
    for ch in emoji_str:
        cp = ord(ch)
        if cp == 0xFE0F or cp == 0x200D:  # variation selector, ZWJ
            continue
        codepoints.append(f'{cp:x}')
    if not codepoints:
        return None
    codepoint_str = '-'.join(codepoints)
    return f'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/{codepoint_str}.svg'

# Correct emoji mapping for entries with wrong/repeated emojis
CORRECT_EMOJIS = {
    # fruit
    "lychee": "🔴",
    "pitaya": "🐉",
    "grapefruit": "🍊",
    "pomegranate": "🍎",
    # seaanimals
    "starfish": "⭐",
    # farmanimals
    "turkey": "🦃",
    # pets
    "kitten": "🐱",
    "pet turtle": "🐢",
    "mouse": "🐭",
    # staplefood - many have generic 🍚
    "noodle": "🍜",
    "bun": "🥟",
    "oat": "🥣",
    "egg": "🥚",
    "pork": "🥩",
    "beef": "🥩",
    "chicken meat": "🍗",
    "shrimp": "🦐",
    "soup": "🍲",
    # snacksdesserts
    "biscuit": "🍪",
    "jelly": "🍮",
    "nut": "🥜",
    "raisin": "🍇",
    "wafer": "🧇",
    # drinks
    "honey water": "🍯",
    "yogurt": "🥛",
    # fastfood
    "fries": "🍟",
    # vegetables
    "cauliflower": "🥦",
    "green bean": "🫛",
    # clothes
    "jacket": "🧥",
    "blouse": "👚",
    "shorts": "🩳",
    "sock": "🧦",
    "shoe": "👟",
    "sneaker": "👟",
    "boot": "👢",
    "cap": "🧢",
    "cardigan": "🧶",
    "underwear": "🩲",
    # schoolsupplies
    "pencil box": "🗃️",
    "eraser": "🧽",
    "chair": "💺",
    "glue": "🧴",
    "blackboard": "🪧",
    # toysdolls
    "toy car": "🚗",
    "block": "🧱",
    "yo-yo": "🪀",
    "train toy": "🚂",
    "doll": "🪆",
    "rattle": "🎺",
    # transport
    "bike": "🚲",
    "plane": "✈️",
    "truck": "🚚",
    # places
    "home": "🏠",
    "school": "🏫",
    "supermarket": "🏪",
    "playground": "🎠",
    "garden": "🌻",
    "shop": "🛒",
    # feelingsemotions
    "calm": "😌",
    "proud": "🏆",
    "upset": "😤",
    "sleepy": "😪",
    # insects
    "cricket": "🦗",
    "firefly": "✨",
    # bodyparts
    "eyebrow": "🤨",
    "eyelash": "👁️",
    "cheek": "😊",
    "chin": "😶",
    "lip": "👄",
    "forehead": "🤦",
    "shoulder": "🤷",
    "neck": "🦒",
    "back": "🔙",
    "chest": "🫁",
    "knee": "🦵",
    "elbow": "💪",
    # weather
    "warm": "🌤️",
    "cool": "🌬️",
    "icy": "🧊",
    # furniture
    "house": "🏠",
    "wall": "🧱",
    "floor": "🏠",
    "ceiling": "🏠",
    "table": "🪑",
    "cupboard": "🗄️",
    "box": "📦",
    # antonyms
    "fat": "🐷",
    "thin": "🍃",
    "good": "👍",
    "bad": "👎",
    "out": "🚪",
    "front": "⏩",
    "few": "🤏",
}

with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the WORDS section boundaries
words_start = content.index('const WORDS = {')
brace_count = 0
words_end = -1
for i in range(words_start + len('const WORDS = '), len(content)):
    if content[i] == '{':
        brace_count += 1
    elif content[i] == '}':
        brace_count -= 1
        if brace_count == 0:
            words_end = i + 1
            break

words_section = content[words_start:words_end]
print(f"WORDS section: {len(words_section)} chars")

# Find dailysentences range to exclude it
ds_start = words_section.index('"dailysentences"')
# Find the next category key after dailysentences
ds_end_match = re.search(r'\],\s*"', words_section[ds_start + 1:])
if ds_end_match:
    ds_end = ds_start + 1 + ds_end_match.start() + 1
else:
    # Last category - find closing bracket
    ds_end_match = re.search(r'\]', words_section[ds_start:])
    ds_end = ds_start + ds_end_match.end()

print(f"dailysentences range: {ds_start} - {ds_end}")

# Process entries
entry_pattern = re.compile(r'\{\s*"en":\s*"([^"]+)",\s*"zh":\s*"([^"]+)",\s*"emoji":\s*"([^"]+)"\s*\}')

entries = list(entry_pattern.finditer(words_section))
print(f"Found {len(entries)} entries total")

fixed_count = 0
img_added_count = 0

# Process from end to start to maintain positions
for match in reversed(entries):
    start = match.start()
    end = match.end()

    # Check if this entry is in dailysentences
    in_dailysentences = ds_start <= start < ds_end

    en = match.group(1)
    zh = match.group(2)
    emoji = match.group(3)

    if in_dailysentences:
        continue

    # Fix incorrect emoji
    new_emoji = CORRECT_EMOJIS.get(en, emoji)
    emoji_changed = new_emoji != emoji

    # Convert emoji to image URL
    img_url = emoji_to_twemoji_url(new_emoji)

    if img_url:
        new_entry = f'{{ "en": "{en}", "zh": "{zh}", "emoji": "{new_emoji}", "img": "{img_url}" }}'
        words_section = words_section[:start] + new_entry + words_section[end:]
        img_added_count += 1
        if emoji_changed:
            fixed_count += 1

print(f"Fixed {fixed_count} incorrect emojis")
print(f"Added {img_added_count} image URLs")

# Reconstruct the full content
new_content = content[:words_start] + words_section + content[words_end:]

with open('data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("data.js updated successfully!")
