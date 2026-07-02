#!/usr/bin/env python3
"""Remove inline data definitions that are now in data.js"""
import re

html_path = r'C:/Users/ganlu1/AppData/Roaming/WeiboAP/Data/agents/agent_1776133474942_iimlq7np1/kids-learning-app/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Data constants to remove (they're in data.js now)
# For each, find the const declaration and remove it entirely
constants_to_remove = [
    'PY_INITIAL_GROUPS',
    'PY_FINAL_GROUPS',
    'PY_TONE_DATA',
    'PY_TONE_LABELS',
    'PY_SONGS',
    'LETTER_SOUNDS',
    'DIGRAPHS',
    'BLENDS',
    'VOWEL_RULES',
    'PHONICS_SONGS',
    'HANZI_DATA',  # The second one (original inline) - compat layer already creates it
    'STROKE_DATA',
    'MATH_RHYMES',
    'TIMES_COLORS',
]

for const_name in constants_to_remove:
    # Find the const declaration
    pattern = f'const {const_name} = '
    start = html.find(pattern)
    if start == -1:
        # For HANZI_DATA, there might be a second one after the compat layer
        if const_name == 'HANZI_DATA':
            # Find the second occurrence
            first = html.find('const HANZI_DATA = ')
            second = html.find('const HANZI_DATA = ', first + 1)
            if second != -1:
                start = second
            else:
                continue
        else:
            continue

    # Skip the compat layer HANZI_DATA (first occurrence)
    if const_name == 'HANZI_DATA':
        first = html.find('const HANZI_DATA = ')
        if start == first:
            # This is the compat layer, skip it
            second = html.find('const HANZI_DATA = ', first + 1)
            if second != -1:
                start = second
            else:
                continue

    # Find the end of the declaration (matching braces/brackets)
    # Find the opening bracket
    bracket_pos = html.find('[', start) if html.find('[', start) < html.find('{', start) or html.find('{', start) == -1 else html.find('{', start)
    if bracket_pos == -1 or bracket_pos > start + 200:
        # For single-line like PY_TONE_LABELS
        line_end = html.find(';\n', start)
        if line_end != -1:
            # Find the start of the line
            line_start = html.rfind('\n', 0, start) + 1
            html = html[:line_start] + html[line_end + 2:]
            print(f"Removed inline: {const_name} (single-line)")
            continue
        print(f"WARNING: Could not find end for {const_name}")
        continue

    # Count matching brackets
    open_char = html[bracket_pos]
    close_char = ']' if open_char == '[' else '}'
    brace_count = 0
    end_pos = bracket_pos
    for i in range(bracket_pos, len(html)):
        if html[i] == open_char:
            brace_count += 1
        elif html[i] == close_char:
            brace_count -= 1
            if brace_count == 0:
                end_pos = i + 1
                break

    # Find the semicolon after the closing bracket
    semi_pos = html.find(';', end_pos)
    if semi_pos != -1 and semi_pos < end_pos + 5:
        end_pos = semi_pos + 1

    # Find the start of the line (or comment block before it)
    line_start = start
    # Look backwards for a comment or blank line
    temp = html.rfind('\n', 0, line_start)
    if temp != -1:
        # Check if the line before is a comment
        prev_line = html[temp:line_start].strip()
        if prev_line.startswith('/*') or prev_line.startswith('//'):
            line_start = temp
        else:
            line_start = temp + 1

    # Find end of line
    newline_pos = html.find('\n', end_pos)
    if newline_pos != -1:
        end_pos = newline_pos + 1

    removed = html[line_start:end_pos]
    html = html[:line_start] + html[end_pos:]
    print(f"Removed inline: {const_name} ({len(removed)} chars)")

# Also remove the CVC_WORDS_LIST since it's used by the original code
# but we don't have it in data.js - let's keep it for now

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nFinal file size: {len(html)} chars")
