// ═══ pinyin.js: 拼音数据 ═══
// ── PY_SONGS (拼音儿歌) ──
const PY_SONGS = [
  {
    "title": "6个单韵母口型儿歌",
    "lines": [
      "单韵母，共六个，口型不变记心头。",
      "张大嘴巴 a a a，公鸡清晨叫喳喳；",
      "拢圆嘴巴 o o o，皮球圆圆滚下坡；",
      "嘴巴扁扁 e e e，大白鹅儿水中歇；",
      "牙齿对齐 i i i，小小穿衣真整齐；",
      "嘴巴突出 u u u，乌鸦树上呜呜呜；",
      "小嘴吹哨 ü ü ü，小鱼吐泡乐悠悠。"
    ]
  },
  {
    "title": "23个声母形状顺口溜（边写边读）",
    "lines": [
      "右下半圆 b b b，广播喇叭 b b b；",
      "右上半圆 p p p，泼水爬山 p p p；",
      "两个门洞 m m m，摸门摸窗 m m m；",
      "一根拐棍 f f f，大佛拜佛 f f f。",
      "左下半圆 d d d，马蹄哒哒 d d d；",
      "伞柄朝下 t t t，梯子登高 t t t；",
      "一个门洞 n n n，奶奶开门 n n n；",
      "一根小棍 l l l，赶猪小路 l l l。",
      "九字带钩 g g g，鸽子咕咕 g g g；",
      "机枪朝上 k k k，蝌蚪喝水 k k k；",
      "一把椅子 h h h，荷花盛开 h h h。",
      "小鸡啄米 j j j；气球拖线 q q q；",
      "叉叉一把 x x x，西瓜香甜 x x x。",
      "像个数字 z z z，写字滋滋 z z z；",
      "半个圆圈 c c c，小草发芽 c c c；",
      "半个八字 s s s，春蚕吐丝 s s s。",
      "z加椅子 zh zh zh；c加椅子 ch ch ch；",
      "s加椅子 sh sh sh；小苗出土 r r r。",
      "小树分权 y y y；屋顶相连 w w w。"
    ]
  },
  {
    "title": "易混声母区分口诀（b/d/p/q 必背）",
    "lines": [
      "右下半圆 b，左下半圆 d；",
      "右上半圆 p，左上半圆 q。",
      "b和d面对面，p和q背对背。"
    ]
  },
  {
    "title": "n/l区分儿歌",
    "lines": [
      "n字有门洞，发音鼻子闷；",
      "l是一根棍，舌头弹出声。"
    ]
  },
  {
    "title": "平翘舌区分短句",
    "lines": [
      "z c s，舌尖平，牙齿后面轻轻碰；",
      "zh ch sh r，舌尖翘，硬腭前面往上靠。"
    ]
  },
  {
    "title": "9个复韵母儿歌",
    "lines": [
      "复韵母，拼着读，前音轻短后音重。",
      "ai ai ai，高矮排队；ei ei ei，白鹅高飞；",
      "ui ui ui，围着围巾；ao ao ao，穿花棉袄；",
      "ou ou ou，海鸥遨游；iu iu iu，邮寄书信；",
      "ie ie ie，树叶飘落；üe üe üe，一轮明月；",
      "er er er，耳朵听话，只做韵母不拼它。"
    ]
  },
  {
    "title": "前鼻音（an en in un ün）",
    "lines": [
      "an an an，登上高山；en en en，按响门铃；",
      "in in in，笑得开心；un un un，转动车轮；",
      "ün ün ün，小鱼头晕。",
      "前鼻尾巴n，舌尖顶前门。"
    ]
  },
  {
    "title": "后鼻音（ang eng ing ong）",
    "lines": [
      "ang ang ang，昂首歌唱；eng eng eng，蜜蜂嗡嗡；",
      "ing ing ing，老鹰飞行；ong ong ong，公鸡打鸣。",
      "后鼻尾巴ng，舌根往后撑。"
    ]
  },
  {
    "title": "声调歌",
    "lines": [
      "一声平平走平地，二声向上扬，",
      "三声拐弯上下绕，四声快速往下降。",
      "ā á ǎ à ，四声分清不混淆。"
    ]
  },
  {
    "title": "标调口诀（必考）",
    "lines": [
      "有a不放过，没a找o e；",
      "i u并排站，声调标在后；",
      "小i戴帽子，小点要抹去。",
      "例：hǎo（有a标a）、guó（无a找o）、liú（iu并列标u）"
    ]
  },
  {
    "title": "j q x 与 ü 拼读专用儿歌（重难点）",
    "lines": [
      "小ü见j q x，摘掉眼泪笑嘻嘻；",
      "去掉两点还读ü，书写上面不加点。",
      "ju qu xu，没有u，都是小鱼来相聚。"
    ]
  },
  {
    "title": "1.介母认知儿歌",
    "lines": [
      "三拼音，有介母，i u ü 三个小帮手。",
      "声母在前站，介母中间牵，韵母最后面。",
      "i u ü，是介母，夹在中间来过渡。"
    ]
  },
  {
    "title": "2.三拼连读口诀（介母拼读）",
    "lines": [
      "声轻介快韵母响，三音连读很顺畅。",
      "声母短，介母快，韵母拉长读响亮。",
      "例：x—i—àng→xiàng  h—u—ā→huā"
    ]
  },
  {
    "title": "3.区分两拼、三拼拍手歌",
    "lines": [
      "两拼音，两部分，声母韵母碰一碰；",
      "三拼音，三部分，中间介母来助阵。",
      "见到i u ü在中间，一定三拼不能乱。"
    ]
  },
  {
    "title": "4.介母分类小口诀",
    "lines": [
      "介母i：jia qia xia 中间i；",
      "介母u：hua gua kua 中间u；",
      "介母ü：juan quan xuan 中间ü；",
      "小ü遇j q x，两点不见别忘记。"
    ]
  },
  {
    "title": "5.三拼书写记忆儿歌",
    "lines": [
      "声母写左边，介母放中间，韵母靠右站，",
      "三个紧紧靠，读音不拆散。"
    ]
  },
  {
    "title": "16个整体认读音节速记口诀（不用拼，直接读）",
    "lines": [
      "zhi chi shi ri，翘舌四兄弟；",
      "zi ci si，平舌三姐弟；",
      "yi w yu，一屋雨；ye yue yuan，夜月圆；",
      "yin yun ying，云老鹰。"
    ]
  },
  {
    "title": "分段顺读儿歌",
    "lines": [
      "知吃诗日资雌思，一乌鱼，夜月圆；",
      "音云鹰，十六个整体认心里。"
    ]
  },
  {
    "title": "四线三格书写儿歌",
    "lines": [
      "四线三格四条线，拼音字母住里面。",
      "中上格，不顶线；中下格，尾巴展；",
      "中格字母要饱满，上下两格别撑满。",
      "b d h k l 头上住，g p q y 脚下驻；",
      "a m n x z c s，乖乖待在中间屋。"
    ]
  },
  {
    "title": "两拼音",
    "lines": [
      "前音轻短后音重，两音相连猛一碰。",
      "例：b—à→bà"
    ]
  },
  {
    "title": "三拼音（结合介母）",
    "lines": [
      "声轻介快韵母响，三音连读很顺畅。",
      "小介母，中间坐，声母韵母两边躲。"
    ]
  },
  {
    "title": "隔音字母 y w 儿歌",
    "lines": [
      "小i单独出门玩，大y来当保护伞（yi）；",
      "小u单独走出门，大w顶上遮风挡雨（wu）；",
      "小鱼ü遇见y，两点消失变yu。"
    ]
  },
  {
    "title": "简短趣味拍手歌（课堂互动）",
    "lines": [
      "拍一，单韵母六个记；",
      "拍二，声母二十三；",
      "拍三，复韵母九个连；",
      "拍四，前后鼻音分两边；",
      "拍五，介母i u ü记心间；",
      "拍六，整体认读十六篇；",
      "拍七，声调标对读准确！"
    ]
  }
];

// ── PY_INITIAL_GROUPS (声母组) ──
const PY_INITIAL_GROUPS = [
  { label:'唇音',   cls:'gi-labial',    items:[
    {py:'b',ex:'爸bà'},{py:'p',ex:'婆pó'},{py:'m',ex:'妈mā'},{py:'f',ex:'飞fēi'}
  ]},
  { label:'舌尖音', cls:'gi-dental',    items:[
    {py:'d',ex:'大dà'},{py:'t',ex:'他tā'},{py:'n',ex:'你nǐ'},{py:'l',ex:'来lái'}
  ]},
  { label:'舌根音', cls:'gi-velar',     items:[
    {py:'g',ex:'哥gē'},{py:'k',ex:'可kě'},{py:'h',ex:'好hǎo'}
  ]},
  { label:'舌面音', cls:'gi-palatal',   items:[
    {py:'j',ex:'鸡jī'},{py:'q',ex:'去qù'},{py:'x',ex:'下xià'}
  ]},
  { label:'卷舌音', cls:'gi-retroflex', items:[
    {py:'zh',ex:'这zhè'},{py:'ch',ex:'吃chī'},{py:'sh',ex:'是shì'},{py:'r',ex:'人rén'}
  ]},
  { label:'平舌音', cls:'gi-sibilant',  items:[
    {py:'z',ex:'字zì'},{py:'c',ex:'草cǎo'},{py:'s',ex:'四sì'}
  ]},
  { label:'半元音', cls:'gi-semi',      items:[
    {py:'y',ex:'鱼yú'},{py:'w',ex:'我wǒ'}
  ]},

// ── PY_FINAL_GROUPS (韵母组) ──

];
const PY_FINAL_GROUPS = [
  { label:'单韵母',          cls:'gf-simple',   items:[
    {py:'a',ex:'啊ā'},{py:'o',ex:'哦ó'},{py:'e',ex:'鹅é'},
    {py:'i',ex:'一yī'},{py:'u',ex:'乌wū'},{py:'ü',ex:'鱼yú'}
  ]},
  { label:'复韵母',          cls:'gf-compound', items:[
    {py:'ai',ex:'爱ài'},{py:'ei',ex:'飞fēi'},{py:'ui',ex:'回huí'},
    {py:'ao',ex:'好hǎo'},{py:'ou',ex:'走zǒu'},{py:'iu',ex:'六liù'}
  ]},
  { label:'复韵母（续）',    cls:'gf-compound', items:[
    {py:'ie',ex:'叶yè'},{py:'üe',ex:'月yuè'},{py:'er',ex:'耳ěr'}
  ]},
  { label:'前鼻韵母（-n）',  cls:'gf-nasal-n',  items:[
    {py:'an',ex:'安ān'},{py:'en',ex:'恩ēn'},{py:'in',ex:'音yīn'},
    {py:'un',ex:'云yún'},{py:'ün',ex:'晕yūn'}
  ]},
  { label:'后鼻韵母（-ng）', cls:'gf-nasal-ng', items:[
    {py:'ang',ex:'昂áng'},{py:'eng',ex:'灯dēng'},
    {py:'ing',ex:'星xīng'},{py:'ong',ex:'红hóng'}
  ]},


];
const PY_INITIALS = PY_INITIAL_GROUPS.flatMap(g => g.items.map(d => ({...d, g:g.cls, hint:g.label})));
const PY_FINALS   = PY_FINAL_GROUPS.flatMap(g   => g.items.map(d => ({...d, g:g.cls, hint:g.label})));

// ── PY_TONE_DATA (声调数据) ──
const PY_TONE_DATA = [
  {char:'妈',tone:1},{char:'麻',tone:2},{char:'马',tone:3},{char:'骂',tone:4},
  {char:'书',tone:1},{char:'石',tone:2},{char:'手',tone:3},{char:'树',tone:4},
  {char:'天',tone:1},{char:'田',tone:2},{char:'舔',tone:3},{char:'甜',tone:2},
  {char:'鱼',tone:2},{char:'语',tone:3},{char:'雨',tone:3},{char:'玉',tone:4},
  {char:'花',tone:1},{char:'苹',tone:2},{char:'果',tone:3},{char:'菜',tone:4},


];
const PY_TONE_LABELS = ['','一声 ─','二声 ╱','三声 ∨','四声 ╲'];

