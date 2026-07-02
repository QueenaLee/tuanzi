// ═══ phonics.js: 字母发音/拼读数据 ═══
// ── LETTER_SOUNDS (字母发音) ──
const LETTER_SOUNDS = [
  {
    "L": "A",
    "l": "a",
    "s": "/æ/",
    "w": "apple",
    "e": "🍎"
  },
  {
    "L": "B",
    "l": "b",
    "s": "/b/",
    "w": "ball",
    "e": "⚽"
  },
  {
    "L": "C",
    "l": "c",
    "s": "/k/",
    "w": "cat",
    "e": "🐱"
  },
  {
    "L": "D",
    "l": "d",
    "s": "/d/",
    "w": "dog",
    "e": "🐶"
  },
  {
    "L": "E",
    "l": "e",
    "s": "/e/",
    "w": "egg",
    "e": "🥚"
  },
  {
    "L": "F",
    "l": "f",
    "s": "/f/",
    "w": "fish",
    "e": "🐟"
  },
  {
    "L": "G",
    "l": "g",
    "s": "/ɡ/",
    "w": "goat",
    "e": "🐐"
  },
  {
    "L": "H",
    "l": "h",
    "s": "/h/",
    "w": "hat",
    "e": "🎩"
  },
  {
    "L": "I",
    "l": "i",
    "s": "/ɪ/",
    "w": "igloo",
    "e": "🧊"
  },
  {
    "L": "J",
    "l": "j",
    "s": "/dʒ/",
    "w": "jam",
    "e": "🍓"
  },
  {
    "L": "K",
    "l": "k",
    "s": "/k/",
    "w": "kite",
    "e": "🪁"
  },
  {
    "L": "L",
    "l": "l",
    "s": "/l/",
    "w": "log",
    "e": "🪵"
  },
  {
    "L": "M",
    "l": "m",
    "s": "/m/",
    "w": "mat",
    "e": "🧘"
  },
  {
    "L": "N",
    "l": "n",
    "s": "/n/",
    "w": "nut",
    "e": "🥜"
  },
  {
    "L": "O",
    "l": "o",
    "s": "/ɒ/",
    "w": "orange",
    "e": "🍊"
  },
  {
    "L": "P",
    "l": "p",
    "s": "/p/",
    "w": "pen",
    "e": "🖊️"
  },
  {
    "L": "Q",
    "l": "q",
    "s": "/kw/",
    "w": "queen",
    "e": "👸"
  },
  {
    "L": "R",
    "l": "r",
    "s": "/r/",
    "w": "rat",
    "e": "🐀"
  },
  {
    "L": "S",
    "l": "s",
    "s": "/s/",
    "w": "sun",
    "e": "☀️"
  },
  {
    "L": "T",
    "l": "t",
    "s": "/t/",
    "w": "tiger",
    "e": "🐯"
  },
  {
    "L": "U",
    "l": "u",
    "s": "/ʌ/",
    "w": "umbrella",
    "e": "☂️"
  },
  {
    "L": "V",
    "l": "v",
    "s": "/v/",
    "w": "van",
    "e": "🚐"
  },
  {
    "L": "W",
    "l": "w",
    "s": "/w/",
    "w": "web",
    "e": "🕸️"
  },
  {
    "L": "X",
    "l": "x",
    "s": "/ks/",
    "w": "box",
    "e": "📦"
  },
  {
    "L": "Y",
    "l": "y",
    "s": "/j/",
    "w": "yam",
    "e": "🍠"
  },
  {
    "L": "Z",
    "l": "z",
    "s": "/z/",
    "w": "zoo",
    "e": "🦁"
  }

// ── DIGRAPHS (双字母组合) ──

];
const DIGRAPHS = [
  {
    "c": "sh",
    "s": "/ʃ/",
    "w": "ship",
    "e": "🚢"
  },
  {
    "c": "ch",
    "s": "/tʃ/",
    "w": "chair",
    "e": "🪑"
  },
  {
    "c": "th清",
    "s": "/θ/",
    "w": "tooth",
    "e": "🦷"
  },
  {
    "c": "th浊",
    "s": "/ð/",
    "w": "this",
    "e": "👆"
  },
  {
    "c": "ph",
    "s": "/f/",
    "w": "phone",
    "e": "📱"
  }

// ── BLENDS (辅音群) ──

];
const BLENDS = [
  {
    "c": "bl",
    "s": "/bl/",
    "w": "blue",
    "e": "🔵"
  },
  {
    "c": "cl",
    "s": "/kl/",
    "w": "clock",
    "e": "🕐"
  },
  {
    "c": "fl",
    "s": "/fl/",
    "w": "flower",
    "e": "🌸"
  },
  {
    "c": "gl",
    "s": "/ɡl/",
    "w": "glass",
    "e": "🥛"
  },
  {
    "c": "pl",
    "s": "/pl/",
    "w": "plane",
    "e": "✈️"
  },
  {
    "c": "sl",
    "s": "/sl/",
    "w": "snake",
    "e": "🐍"
  },
  {
    "c": "br",
    "s": "/br/",
    "w": "bread",
    "e": "🍞"
  },
  {
    "c": "cr",
    "s": "/kr/",
    "w": "crab",
    "e": "🦀"
  },
  {
    "c": "dr",
    "s": "/dr/",
    "w": "dress",
    "e": "👗"
  },
  {
    "c": "fr",
    "s": "/fr/",
    "w": "frog",
    "e": "🐸"
  },
  {
    "c": "gr",
    "s": "/ɡr/",
    "w": "grape",
    "e": "🍇"
  },
  {
    "c": "pr",
    "s": "/pr/",
    "w": "press",
    "e": "🖱️"
  },
  {
    "c": "tr",
    "s": "/tr/",
    "w": "tree",
    "e": "🌳"
  },
  {
    "c": "ck",
    "s": "/k/",
    "w": "duck",
    "e": "🦆"
  },
  {
    "c": "ng",
    "s": "/ŋ/",
    "w": "sing",
    "e": "🎤"
  },
  {
    "c": "nk",
    "s": "/ŋk/",
    "w": "pink",
    "e": "🩷"
  }

// ── PHONICS_SONGS (phonics 儿歌) ──

];
const PHONICS_SONGS = [
  {
    "title": "第一部分：26个字母基础拼读",
    "lines": [
      "A a /æ/ apple apple ant animal alphabet",
      "B b /b/ ball ball bag basket banana",
      "C c /k/ cat cat cap camera calculator",
      "D d /d/ dog dog dot dinner dinosaur",
      "E e /e/ egg egg pen elephant elevator",
      "F f /f/ fish fish fan flower family",
      "G g /g/ goat goat gun garden geography",
      "H h /h/ hat hat ham honey hamburger",
      "I i /i/ igloo igloo ink insect instrument",
      "J j /j/ jam jam jug jacket January",
      "K k /k/ kite kite kid kitchen kangaroo",
      "L l /l/ log log leg lemon library",
      "M m /m/ mat mat map mango magazine",
      "N n /n/ nut nut net number necklace",
      "O o /o/ orange orange ox octopus october",
      "P p /p/ pen pen pig pizza paragraph",
      "Q q /kw/ queen queen quit quiet quantity",
      "R r /r/ rat rat rug rabbit radio",
      "S s /s/ sun sun sock salad sandwich",
      "T t /t/ tiger tiger tap tomato telephone",
      "U u /u/ umbrella umbrella up uncle university",
      "V v /v/ van van vest violin volleyball",
      "W w /w/ web web wig window watermelon",
      "X x /ks/ box box fox taxi maximum",
      "Y y /j/ yam yam yard yogurt yesterday",
      "Z z /z/ zoo zoo zip zebra zero"
    ]
  },
  {
    "title": "第二部分：辅音组合拼读",
    "lines": [
      "sh ship ship shop shadow sunshine",
      "ch chair chair cherry chicken chocolate",
      "th tooth tooth three thread thermometer",
      "th this this that father together",
      "ph phone phone photo elephant paragraph",
      "bl blue blue block blanket broccoli",
      "cl clock clock cloud clever classroom",
      "fl flower flower fly flamingo fireplace",
      "gl glass glass globe glitter glacier",
      "pl plane plane plant pumpkin pineapple",
      "sl snake snake sleep slow slipper",
      "br bread bread brown brother broccoli",
      "cr crab crab cream crayon crocodile",
      "dr dress dress dream dragon dragonfly",
      "fr frog frog fruit friend February",
      "gr grape grape grass grandpa grocery",
      "pr press press pride present president",
      "tr tree tree train triangle traffic",
      "ck duck duck black jacket backpack",
      "ng sing sing king morning everything",
      "nk pink pink sink blanket thinker"
    ]
  },
  {
    "title": "第三部分：配套朗读顺口溜（A-Z）",
    "lines": [
      "Aa apple甜，animal小，alphabet字母表",
      "Bb ball滚，basket筐，banana香蕉香",
      "Cc cat喵，camera拍，calculator计算器",
      "Dd dog跑，dinner饭，dinosaur恐龙大",
      "Ee egg圆，elephant象，elevator电梯上下转",
      "Ff fish游，flower花，family一家人",
      "Gg goat爬，garden园，geography地理课",
      "Hh hat戴，honey蜜，hamburger汉堡香",
      "Ii igloo冰，insect虫，instrument小乐器",
      "Jj jam甜，jacket衫，January一月到",
      "Kk kite飘，kitchen厨，kangaroo袋鼠跳",
      "Ll log木，lemon柠，library图书馆",
      "Mm mat垫，mango芒，magazine杂志翻",
      "Nn nut脆，number数，necklace项链美",
      "Oo orange橙，octopus章，october十月凉",
      "Pp pen写，pizza饼，paragraph小段落",
      "Qq queen美，quiet静，quantity数量记",
      "Rr rat窜，rabbit兔，radio收音机",
      "Ss sun亮，salad菜，sandwich三明治",
      "Tt tiger虎，tomato柿，telephone电话机",
      "Uu umbrella伞，uncle叔，university大学",
      "Vv van货车，violin琴，volleyball排球",
      "Ww web蛛网，window窗，watermelon西瓜",
      "Xx box盒子，taxi车，maximum最大值",
      "Yy yam山药，yogurt酸奶，yesterday昨天",
      "Zz zoo动物园，zip拉链，zero数字零"
    ]
  },
  {
    "title": "第三部分：配套朗读顺口溜（辅音组合）",
    "lines": [
      "sh沙沙 ship船，shadow影子，sunshine阳光满",
      "ch吃吃 chair椅，chicken小鸡，chocolate巧克力",
      "th轻咬 three三，this that，thermometer温度计",
      "bl蓝色 block砖，blanket毯子，broccoli西兰花",
      "cl时钟 cloud云，clever聪明，classroom教室",
      "fl花朵 fly飞，flamingo火烈鸟，fireplace壁炉",
      "gl玻璃 globe球，glitter闪光，glacier冰川",
      "pl飞机 plant草，pumpkin南瓜，pineapple菠萝",
      "sl蛇 sleep睡，slow慢，slipper拖鞋",
      "br面包 brown棕，brother兄弟，broccoli西兰花",
      "cr螃蟹 crayon蜡笔，crocodile鳄鱼",
      "dr裙子 dream梦，dragon龙，dragonfly蜻蜓",
      "fr青蛙 fruit果，friend朋友，February二月",
      "gr葡萄 grass草，grandpa爷爷，grocery杂货店",
      "pr礼物 pride骄傲，present礼物，president总统",
      "tr大树 train火车，triangle三角，traffic交通",
      "ck小鸭 duck叫，black黑色，backpack背包",
      "ng sing唱歌，king国王，everything所有事",
      "nk pink粉色，sink水槽，thinker思想家"
    ]
  }
];

// ── VOWEL_RULES (元音规则) ──
const VOWEL_RULES = [
  { title:'短元音 Short Vowels', color:'#FFE4CC', border:'#FFA060',
    rows:[
      {v:'a', ex:'cat, bat, hat', emoji:'🐱'},
      {v:'e', ex:'bed, red, ten', emoji:'🛏️'},
      {v:'i', ex:'big, pig, sit', emoji:'🐷'},
      {v:'o', ex:'hot, dog, fox', emoji:'🦊'},
      {v:'u', ex:'cup, sun, run', emoji:'☀️'},
    ]},
  { title:'长元音 Long Vowels (CVCe)', color:'#D0F0FF', border:'#60C0F0',
    rows:[
      {v:'a_e', ex:'cake, lake, name', emoji:'🎂'},
      {v:'i_e', ex:'bike, kite, five', emoji:'🚲'},
      {v:'o_e', ex:'note, hope, bone', emoji:'🎵'},
      {v:'u_e', ex:'cube, tune, cute', emoji:'🧊'},
    ]},

// ── CVC_WORDS_LIST (CVC 单词) ──

];
const CVC_WORDS_LIST = [
  {w:'cat',e:'🐱'},{w:'dog',e:'🐶'},{w:'big',e:'🐘'},{w:'hot',e:'☀️'},
  {w:'cup',e:'☕'},{w:'bed',e:'🛏️'},{w:'sit',e:'🪑'},{w:'log',e:'🪵'},
  {w:'fun',e:'🎉'},{w:'red',e:'🔴'},{w:'hat',e:'🎩'},{w:'pig',e:'🐷'},
  {w:'sun',e:'🌞'},{w:'bug',e:'🐛'},{w:'map',e:'🗺️'},{w:'net',e:'🥅'},
];


