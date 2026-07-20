// ═══ words.js: 单词/短语 + 音节拆分 + 数学口诀 ═══
// ── WORDS_LIST (单词+短语扁平列表) ──
const WORDS_LIST = [
  { "en": "apple", "zh": "苹果", "emoji": "🍎", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34e.svg", "type": "word" },
  { "en": "banana", "zh": "香蕉", "emoji": "🍌", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34c.svg", "type": "word" },
  { "en": "orange", "zh": "橙子", "emoji": "🍊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34a.svg", "type": "word" },
  { "en": "grape", "zh": "葡萄", "emoji": "🍇", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f347.svg", "type": "word" },
  { "en": "pear", "zh": "梨", "emoji": "🍐", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f350.svg", "type": "word" },
  { "en": "peach", "zh": "桃子", "emoji": "🍑", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f351.svg", "type": "word" },
  { "en": "watermelon", "zh": "西瓜", "emoji": "🍉", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f349.svg", "type": "word" },
  { "en": "strawberry", "zh": "草莓", "emoji": "🍓", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f353.svg", "type": "word" },
  { "en": "pineapple", "zh": "菠萝", "emoji": "🍍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34d.svg", "type": "word" },
  { "en": "mango", "zh": "芒果", "emoji": "🥭", "type": "word" },
  { "en": "kiwi", "zh": "猕猴桃", "emoji": "🥝", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95d.svg", "type": "word" },
  { "en": "cherry", "zh": "樱桃", "emoji": "🍒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f352.svg", "type": "word" },
  { "en": "blueberry", "zh": "蓝莓", "emoji": "🫐", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fad0.svg", "type": "word" },
  { "en": "lemon", "zh": "柠檬", "emoji": "🍋", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34b.svg", "type": "word" },
  { "en": "lychee", "zh": "荔枝", "emoji": "🍏", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f34f.svg", "type": "word" },
  { "en": "pitaya", "zh": "火龙果", "emoji": "🌺", "type": "word" },
  { "en": "longan", "zh": "龙眼", "emoji": "🟤", "type": "word" },
  { "en": "grapefruit", "zh": "西柚", "emoji": "🟠", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e0.svg", "type": "word" },
  { "en": "avocado", "zh": "牛油果", "emoji": "🥑", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f951.svg", "type": "word" },
  { "en": "pomegranate", "zh": "石榴", "emoji": "🔴", "type": "word" },
  { "en": "fish", "zh": "鱼", "emoji": "🐟", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41f.svg", "type": "word" },
  { "en": "shark", "zh": "鲨鱼", "emoji": "🦈", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f988.svg", "type": "word" },
  { "en": "dolphin", "zh": "海豚", "emoji": "🐬", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f42c.svg", "type": "word" },
  { "en": "whale", "zh": "鲸鱼", "emoji": "🐳", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f433.svg", "type": "word" },
  { "en": "turtle", "zh": "海龟", "emoji": "🐢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f422.svg", "type": "word" },
  { "en": "crab", "zh": "螃蟹", "emoji": "🦀", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f980.svg", "type": "word" },
  { "en": "lobster", "zh": "龙虾", "emoji": "🦞", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f99e.svg", "type": "word" },
  { "en": "octopus", "zh": "章鱼", "emoji": "🐙", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f419.svg", "type": "word" },
  { "en": "starfish", "zh": "海星", "emoji": "🐚", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41a.svg", "type": "word" },
  { "en": "seahorse", "zh": "海马", "emoji": "🐉", "type": "word" },
  { "en": "jellyfish", "zh": "水母", "emoji": "🪼", "img": "https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/svg/emoji_u1fabc.svg", "type": "word" },
  { "en": "seal", "zh": "海豹", "emoji": "🦭", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ad.svg", "type": "word" },
  { "en": "clam", "zh": "蛤蜊", "emoji": "🪨", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1faa8.svg", "type": "word" },
  { "en": "tiger", "zh": "老虎", "emoji": "🐯", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f42f.svg", "type": "word" },
  { "en": "lion", "zh": "狮子", "emoji": "🦁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f981.svg", "type": "word" },
  { "en": "elephant", "zh": "大象", "emoji": "🐘", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg", "type": "word" },
  { "en": "monkey", "zh": "猴子", "emoji": "🐒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f412.svg", "type": "word" },
  { "en": "panda", "zh": "熊猫", "emoji": "🐼", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43c.svg", "type": "word" },
  { "en": "bear", "zh": "熊", "emoji": "🐻", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43b.svg", "type": "word" },
  { "en": "wolf", "zh": "狼", "emoji": "🐺", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43a.svg", "type": "word" },
  { "en": "zebra", "zh": "斑马", "emoji": "🦓", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f993.svg", "type": "word" },
  { "en": "giraffe", "zh": "长颈鹿", "emoji": "🦒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f992.svg", "type": "word" },
  { "en": "deer", "zh": "鹿", "emoji": "🦌", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98c.svg", "type": "word" },
  { "en": "fox", "zh": "狐狸", "emoji": "🦊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98a.svg", "type": "word" },
  { "en": "kangaroo", "zh": "袋鼠", "emoji": "🦘", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f998.svg", "type": "word" },
  { "en": "snake", "zh": "蛇", "emoji": "🐍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f40d.svg", "type": "word" },
  { "en": "gorilla", "zh": "大猩猩", "emoji": "🦍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98d.svg", "type": "word" },
  { "en": "hippo", "zh": "河马", "emoji": "🦛", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f99b.svg", "type": "word" },
  { "en": "chicken", "zh": "小鸡", "emoji": "🐔", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f414.svg", "type": "word" },
  { "en": "rooster", "zh": "公鸡", "emoji": "🐓", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f413.svg", "type": "word" },
  { "en": "duck", "zh": "鸭子", "emoji": "🦆", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f986.svg", "type": "word" },
  { "en": "goose", "zh": "鹅", "emoji": "🪿", "img": "https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/svg/emoji_u1fabf.svg", "type": "word" },
  { "en": "cow", "zh": "奶牛", "emoji": "🐄", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f404.svg", "type": "word" },
  { "en": "bull", "zh": "公牛", "emoji": "🐂", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f402.svg", "type": "word" },
  { "en": "pig", "zh": "小猪", "emoji": "🐷", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f437.svg", "type": "word" },
  { "en": "sheep", "zh": "绵羊", "emoji": "🐑", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f411.svg", "type": "word" },
  { "en": "goat", "zh": "山羊", "emoji": "🐐", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f410.svg", "type": "word" },
  { "en": "horse", "zh": "小马", "emoji": "🐴", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f434.svg", "type": "word" },
  { "en": "donkey", "zh": "驴子", "emoji": "🐴", "type": "word" },
  { "en": "rabbit", "zh": "家兔", "emoji": "🐰", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg", "type": "word" },
  { "en": "turkey", "zh": "火鸡", "emoji": "🦃", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f983.svg", "type": "word" },
  { "en": "dog", "zh": "小狗", "emoji": "🐶", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg", "type": "word" },
  { "en": "puppy", "zh": "幼犬", "emoji": "🐕", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f415.svg", "type": "word" },
  { "en": "cat", "zh": "小猫", "emoji": "🐱", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg", "type": "word" },
  { "en": "kitten", "zh": "幼猫", "emoji": "🐈", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f408.svg", "type": "word" },
  { "en": "hamster", "zh": "仓鼠", "emoji": "🐹", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg", "type": "word" },
  { "en": "guinea pig", "zh": "豚鼠", "emoji": "🐁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f401.svg", "type": "word" },
  { "en": "parrot", "zh": "鹦鹉", "emoji": "🦜", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f99c.svg", "type": "word" },
  { "en": "goldfish", "zh": "金鱼", "emoji": "🐠", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f420.svg", "type": "word" },
  { "en": "pet turtle", "zh": "宠物龟", "emoji": "🦎", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98e.svg", "type": "word" },
  { "en": "bird", "zh": "小鸟", "emoji": "🐦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f426.svg", "type": "word" },
  { "en": "mouse", "zh": "小老鼠", "emoji": "🐭", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f42d.svg", "type": "word" },
  { "en": "rice", "zh": "米饭", "emoji": "🍚", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35a.svg", "type": "word" },
  { "en": "noodle", "zh": "面条", "emoji": "🍜", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35c.svg", "type": "word" },
  { "en": "bread", "zh": "面包", "emoji": "🍞", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35e.svg", "type": "word" },
  { "en": "steamed bun", "zh": "馒头", "emoji": "🫓", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fad3.svg", "type": "word" },
  { "en": "bun", "zh": "包子", "emoji": "🥖", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f956.svg", "type": "word" },
  { "en": "dumpling", "zh": "饺子", "emoji": "🥟", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95f.svg", "type": "word" },
  { "en": "porridge", "zh": "粥", "emoji": "🥣", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f963.svg", "type": "word" },
  { "en": "oat", "zh": "燕麦", "emoji": "🌾", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33e.svg", "type": "word" },
  { "en": "pasta", "zh": "意大利面", "emoji": "🍝", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35d.svg", "type": "word" },
  { "en": "corn", "zh": "玉米", "emoji": "🌽", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33d.svg", "type": "word" },
  { "en": "potato", "zh": "土豆", "emoji": "🥔", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f954.svg", "type": "word" },
  { "en": "egg", "zh": "鸡蛋", "emoji": "🥚", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95a.svg", "type": "word" },
  { "en": "pork", "zh": "猪肉", "emoji": "🥩", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f969.svg", "type": "word" },
  { "en": "beef", "zh": "牛肉", "emoji": "🍖", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f356.svg", "type": "word" },
  { "en": "chicken meat", "zh": "鸡肉", "emoji": "🍗", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f357.svg", "type": "word" },
  { "en": "shrimp", "zh": "虾仁", "emoji": "🦐", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f990.svg", "type": "word" },
  { "en": "soup", "zh": "汤", "emoji": "🍲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f372.svg", "type": "word" },
  { "en": "cake", "zh": "蛋糕", "emoji": "🎂", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f382.svg", "type": "word" },
  { "en": "cookie", "zh": "饼干", "emoji": "🍪", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36a.svg", "type": "word" },
  { "en": "biscuit", "zh": "小饼干", "emoji": "🥐", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f950.svg", "type": "word" },
  { "en": "chocolate", "zh": "巧克力", "emoji": "🍫", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36b.svg", "type": "word" },
  { "en": "ice cream", "zh": "冰淇淋", "emoji": "🍦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f366.svg", "type": "word" },
  { "en": "candy", "zh": "糖果", "emoji": "🍬", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36c.svg", "type": "word" },
  { "en": "lollipop", "zh": "棒棒糖", "emoji": "🍭", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36d.svg", "type": "word" },
  { "en": "jelly", "zh": "果冻", "emoji": "🍮", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36e.svg", "type": "word" },
  { "en": "popcorn", "zh": "爆米花", "emoji": "🍿", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f37f.svg", "type": "word" },
  { "en": "chips", "zh": "薯片", "emoji": "🥔", "type": "word" },
  { "en": "nut", "zh": "坚果", "emoji": "🥜", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95c.svg", "type": "word" },
  { "en": "raisin", "zh": "葡萄干", "emoji": "🍫", "type": "word" },
  { "en": "wafer", "zh": "威化饼", "emoji": "🧇", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c7.svg", "type": "word" },
  { "en": "pudding", "zh": "布丁", "emoji": "🍰", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f370.svg", "type": "word" },
  { "en": "water", "zh": "白开水", "emoji": "💧", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a7.svg", "type": "word" },
  { "en": "milk", "zh": "牛奶", "emoji": "🥛", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f95b.svg", "type": "word" },
  { "en": "juice", "zh": "果汁", "emoji": "🧃", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c3.svg", "type": "word" },
  { "en": "milk tea", "zh": "奶茶", "emoji": "🥤", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f964.svg", "type": "word" },
  { "en": "tea", "zh": "茶", "emoji": "🍵", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f375.svg", "type": "word" },
  { "en": "honey water", "zh": "蜂蜜水", "emoji": "🍯", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f36f.svg", "type": "word" },
  { "en": "yogurt", "zh": "酸奶", "emoji": "🧀", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c0.svg", "type": "word" },
  { "en": "hamburger", "zh": "汉堡包", "emoji": "🍔", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f354.svg", "type": "word" },
  { "en": "hot dog", "zh": "热狗", "emoji": "🌭", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f32d.svg", "type": "word" },
  { "en": "fries", "zh": "薯条", "emoji": "🍟", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35f.svg", "type": "word" },
  { "en": "pizza", "zh": "披萨", "emoji": "🍕", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f355.svg", "type": "word" },
  { "en": "tomato", "zh": "西红柿", "emoji": "🍅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f345.svg", "type": "word" },
  { "en": "cabbage", "zh": "卷心菜", "emoji": "🥬", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f96c.svg", "type": "word" },
  { "en": "carrot", "zh": "胡萝卜", "emoji": "🥕", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f955.svg", "type": "word" },
  { "en": "cucumber", "zh": "黄瓜", "emoji": "🥒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f952.svg", "type": "word" },
  { "en": "onion", "zh": "洋葱", "emoji": "🧅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c5.svg", "type": "word" },
  { "en": "garlic", "zh": "大蒜", "emoji": "🧄", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9c4.svg", "type": "word" },
  { "en": "spinach", "zh": "菠菜", "emoji": "🥗", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f957.svg", "type": "word" },
  { "en": "broccoli", "zh": "西兰花", "emoji": "🥦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f966.svg", "type": "word" },
  { "en": "cauliflower", "zh": "花菜", "emoji": "🥦", "type": "word" },
  { "en": "eggplant", "zh": "茄子", "emoji": "🍆", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f346.svg", "type": "word" },
  { "en": "mushroom", "zh": "蘑菇", "emoji": "🍄", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f344.svg", "type": "word" },
  { "en": "green bean", "zh": "豆角", "emoji": "🫛", "img": "https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/svg/emoji_u1fadb.svg", "type": "word" },
  { "en": "celery", "zh": "芹菜", "emoji": "🌿", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33f.svg", "type": "word" },
  { "en": "coat", "zh": "外套", "emoji": "🧥", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e5.svg", "type": "word" },
  { "en": "jacket", "zh": "夹克", "emoji": "🧤", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e4.svg", "type": "word" },
  { "en": "shirt", "zh": "衬衫", "emoji": "👕", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f455.svg", "type": "word" },
  { "en": "blouse", "zh": "女式衬衫", "emoji": "👚", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f45a.svg", "type": "word" },
  { "en": "skirt", "zh": "短裙", "emoji": "👗", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f457.svg", "type": "word" },
  { "en": "dress", "zh": "连衣裙", "emoji": "👘", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f458.svg", "type": "word" },
  { "en": "pants", "zh": "长裤", "emoji": "👖", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f456.svg", "type": "word" },
  { "en": "shorts", "zh": "短裤", "emoji": "🩳", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa73.svg", "type": "word" },
  { "en": "jeans", "zh": "牛仔裤", "emoji": "🩳", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa73.svg", "type": "word" },
  { "en": "sock", "zh": "袜子", "emoji": "🧦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e6.svg", "type": "word" },
  { "en": "shoe", "zh": "鞋子", "emoji": "👞", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f45e.svg", "type": "word" },
  { "en": "sneaker", "zh": "运动鞋", "emoji": "👟", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f45f.svg", "type": "word" },
  { "en": "boot", "zh": "雨靴", "emoji": "👢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f462.svg", "type": "word" },
  { "en": "hat", "zh": "宽边帽子", "emoji": "🎩", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3a9.svg", "type": "word" },
  { "en": "cap", "zh": "鸭舌帽", "emoji": "🧢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e2.svg", "type": "word" },
  { "en": "scarf", "zh": "围巾", "emoji": "🧣", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e3.svg", "type": "word" },
  { "en": "gloves", "zh": "手套", "emoji": "🧤", "type": "word" },
  { "en": "sweater", "zh": "毛衣", "emoji": "🧶", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f6.svg", "type": "word" },
  { "en": "cardigan", "zh": "开衫毛衣", "emoji": "🧵", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f5.svg", "type": "word" },
  { "en": "underwear", "zh": "内衣", "emoji": "🩲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa72.svg", "type": "word" },
  { "en": "vest", "zh": "背心", "emoji": "🦺", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ba.svg", "type": "word" },
  { "en": "swimsuit", "zh": "泳衣", "emoji": "🩱", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa71.svg", "type": "word" },
  { "en": "pencil", "zh": "铅笔", "emoji": "✏️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270f.svg", "type": "word" },
  { "en": "pencil box", "zh": "铅笔盒", "emoji": "🗃️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5c3.svg", "type": "word" },
  { "en": "eraser", "zh": "橡皮", "emoji": "🧽", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9fd.svg", "type": "word" },
  { "en": "ruler", "zh": "尺子", "emoji": "📏", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cf.svg", "type": "word" },
  { "en": "pen", "zh": "钢笔", "emoji": "🖊️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f58a.svg", "type": "word" },
  { "en": "crayon", "zh": "蜡笔", "emoji": "🖌️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f58c.svg", "type": "word" },
  { "en": "marker", "zh": "马克笔", "emoji": "🖍️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f58d.svg", "type": "word" },
  { "en": "bag", "zh": "书包", "emoji": "🎒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f392.svg", "type": "word" },
  { "en": "book", "zh": "书本", "emoji": "📖", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d6.svg", "type": "word" },
  { "en": "notebook", "zh": "笔记本", "emoji": "📓", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4d3.svg", "type": "word" },
  { "en": "desk", "zh": "书桌", "emoji": "🪑", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg", "type": "word" },
  { "en": "chair", "zh": "椅子", "emoji": "💺", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4ba.svg", "type": "word" },
  { "en": "glue", "zh": "胶水", "emoji": "🧴", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f4.svg", "type": "word" },
  { "en": "scissors", "zh": "剪刀", "emoji": "✂️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2702.svg", "type": "word" },
  { "en": "paper", "zh": "纸张", "emoji": "📄", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c4.svg", "type": "word" },
  { "en": "sharpener", "zh": "卷笔刀", "emoji": "✒️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2712.svg", "type": "word" },
  { "en": "whiteboard", "zh": "白板", "emoji": "📋", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cb.svg", "type": "word" },
  { "en": "blackboard", "zh": "黑板", "emoji": "🪧", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1faa7.svg", "type": "word" },
  { "en": "toy car", "zh": "玩具车", "emoji": "🚙", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f699.svg", "type": "word" },
  { "en": "ball", "zh": "皮球", "emoji": "🏀", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c0.svg", "type": "word" },
  { "en": "block", "zh": "积木", "emoji": "🧱", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f1.svg", "type": "word" },
  { "en": "kite", "zh": "风筝", "emoji": "🪁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa81.svg", "type": "word" },
  { "en": "yo-yo", "zh": "悠悠球", "emoji": "🪀", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa80.svg", "type": "word" },
  { "en": "robot", "zh": "机器人", "emoji": "🤖", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg", "type": "word" },
  { "en": "train toy", "zh": "玩具火车", "emoji": "🚋", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f68b.svg", "type": "word" },
  { "en": "doll", "zh": "洋娃娃", "emoji": "🪆", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa86.svg", "type": "word" },
  { "en": "teddy bear", "zh": "泰迪熊", "emoji": "🧸", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9f8.svg", "type": "word" },
  { "en": "stuffed animal", "zh": "毛绒玩偶", "emoji": "🦄", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f984.svg", "type": "word" },
  { "en": "puzzle", "zh": "拼图", "emoji": "🧩", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e9.svg", "type": "word" },
  { "en": "rattle", "zh": "摇铃", "emoji": "🎺", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ba.svg", "type": "word" },
  { "en": "bike", "zh": "自行车", "emoji": "🚲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6b2.svg", "type": "word" },
  { "en": "car", "zh": "小汽车", "emoji": "🏎️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ce.svg", "type": "word" },
  { "en": "bus", "zh": "公交车", "emoji": "🚌", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f68c.svg", "type": "word" },
  { "en": "train", "zh": "火车", "emoji": "🚂", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f682.svg", "type": "word" },
  { "en": "plane", "zh": "飞机", "emoji": "✈️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2708.svg", "type": "word" },
  { "en": "ship", "zh": "轮船", "emoji": "🚢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6a2.svg", "type": "word" },
  { "en": "boat", "zh": "小船", "emoji": "⛵", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26f5.svg", "type": "word" },
  { "en": "subway", "zh": "地铁", "emoji": "🚇", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f687.svg", "type": "word" },
  { "en": "truck", "zh": "卡车", "emoji": "🚚", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f69a.svg", "type": "word" },
  { "en": "motorcycle", "zh": "摩托车", "emoji": "🏍️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3cd.svg", "type": "word" },
  { "en": "helicopter", "zh": "直升机", "emoji": "🚁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f681.svg", "type": "word" },
  { "en": "home", "zh": "家", "emoji": "🏠", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3e0.svg", "type": "word" },
  { "en": "school", "zh": "学校", "emoji": "🏫", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3eb.svg", "type": "word" },
  { "en": "park", "zh": "公园", "emoji": "🏞️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3de.svg", "type": "word" },
  { "en": "zoo", "zh": "动物园", "emoji": "🎪", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3aa.svg", "type": "word" },
  { "en": "hospital", "zh": "医院", "emoji": "🏥", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3e5.svg", "type": "word" },
  { "en": "supermarket", "zh": "超市", "emoji": "🏪", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ea.svg", "type": "word" },
  { "en": "restaurant", "zh": "餐厅", "emoji": "🍽️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f37d.svg", "type": "word" },
  { "en": "library", "zh": "图书馆", "emoji": "📚", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4da.svg", "type": "word" },
  { "en": "playground", "zh": "游乐场", "emoji": "🎠", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3a0.svg", "type": "word" },
  { "en": "garden", "zh": "花园", "emoji": "🌻", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33b.svg", "type": "word" },
  { "en": "shop", "zh": "商店", "emoji": "🛒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6d2.svg", "type": "word" },
  { "en": "cinema", "zh": "电影院", "emoji": "🎬", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ac.svg", "type": "word" },
  { "en": "teacher", "zh": "老师", "emoji": "👩‍🏫", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f469-200d-1f3eb.svg", "type": "word" },
  { "en": "doctor", "zh": "医生", "emoji": "🩺", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa7a.svg", "type": "word" },
  { "en": "nurse", "zh": "护士", "emoji": "💊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f48a.svg", "type": "word" },
  { "en": "driver", "zh": "司机", "emoji": "🚗", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f697.svg", "type": "word" },
  { "en": "cook", "zh": "厨师", "emoji": "🍳", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f373.svg", "type": "word" },
  { "en": "fireman", "zh": "消防员", "emoji": "🚒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f692.svg", "type": "word" },
  { "en": "policeman", "zh": "警察", "emoji": "👮", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f46e.svg", "type": "word" },
  { "en": "farmer", "zh": "农民", "emoji": "🧑‍🌾", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9d1-200d-1f33e.svg", "type": "word" },
  { "en": "worker", "zh": "工人", "emoji": "🔧", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f527.svg", "type": "word" },
  { "en": "singer", "zh": "歌手", "emoji": "🎤", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3a4.svg", "type": "word" },
  { "en": "dancer", "zh": "舞者", "emoji": "💃", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f483.svg", "type": "word" },
  { "en": "astronaut", "zh": "宇航员", "emoji": "🚀", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f680.svg", "type": "word" },
  { "en": "in", "zh": "在……里面", "emoji": "📦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e6.svg", "type": "word" },
  { "en": "on", "zh": "在……上面", "emoji": "👆", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f446.svg", "type": "word" },
  { "en": "under", "zh": "在……下面", "emoji": "👇", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f447.svg", "type": "word" },
  { "en": "beside", "zh": "在……旁边", "emoji": "📍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cd.svg", "type": "word" },
  { "en": "next to", "zh": "紧挨着", "emoji": "↔️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2194.svg", "type": "word" },
  { "en": "behind", "zh": "在……后面", "emoji": "🔙", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f519.svg", "type": "word" },
  { "en": "in front of", "zh": "在……前面", "emoji": "🔜", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f51c.svg", "type": "word" },
  { "en": "between", "zh": "在……中间", "emoji": "↔️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2194.svg", "type": "word" },
  { "en": "near", "zh": "在……附近", "emoji": "📍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cd.svg", "type": "word" },
  { "en": "far", "zh": "遥远的", "emoji": "🔭", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f52d.svg", "type": "word" },
  { "en": "inside", "zh": "在内部", "emoji": "📥", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e5.svg", "type": "word" },
  { "en": "outside", "zh": "在外面", "emoji": "📤", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e4.svg", "type": "word" },
  { "en": "up", "zh": "向上", "emoji": "⬆️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b06.svg", "type": "word" },
  { "en": "down", "zh": "向下", "emoji": "⬇️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b07.svg", "type": "word" },
  { "en": "happy", "zh": "开心的", "emoji": "😊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60a.svg", "type": "word" },
  { "en": "sad", "zh": "难过的", "emoji": "😢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f622.svg", "type": "word" },
  { "en": "angry", "zh": "生气的", "emoji": "😠", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f620.svg", "type": "word" },
  { "en": "scared", "zh": "害怕的", "emoji": "😨", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f628.svg", "type": "word" },
  { "en": "tired", "zh": "疲惫的", "emoji": "😴", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f634.svg", "type": "word" },
  { "en": "excited", "zh": "兴奋的", "emoji": "🤩", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f929.svg", "type": "word" },
  { "en": "shy", "zh": "害羞的", "emoji": "😳", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f633.svg", "type": "word" },
  { "en": "surprised", "zh": "惊讶的", "emoji": "😲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f632.svg", "type": "word" },
  { "en": "bored", "zh": "无聊的", "emoji": "😒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f612.svg", "type": "word" },
  { "en": "calm", "zh": "平静的", "emoji": "😌", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60c.svg", "type": "word" },
  { "en": "proud", "zh": "自豪的", "emoji": "🏆", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c6.svg", "type": "word" },
  { "en": "upset", "zh": "沮丧的", "emoji": "😤", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f624.svg", "type": "word" },
  { "en": "sleepy", "zh": "困的", "emoji": "😪", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f62a.svg", "type": "word" },
  { "en": "red", "zh": "红色", "emoji": "🔴", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f534.svg", "type": "word" },
  { "en": "yellow", "zh": "黄色", "emoji": "🟡", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e1.svg", "type": "word" },
  { "en": "blue", "zh": "蓝色", "emoji": "🔵", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f535.svg", "type": "word" },
  { "en": "green", "zh": "绿色", "emoji": "🟢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e2.svg", "type": "word" },
  { "en": "orange", "zh": "橙色", "emoji": "🟧", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e7.svg", "type": "word" },
  { "en": "purple", "zh": "紫色", "emoji": "🟣", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e3.svg", "type": "word" },
  { "en": "pink", "zh": "粉色", "emoji": "🩷", "img": "https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/svg/emoji_u1fa77.svg", "type": "word" },
  { "en": "black", "zh": "黑色", "emoji": "🖤", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5a4.svg", "type": "word" },
  { "en": "white", "zh": "白色", "emoji": "🤍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f90d.svg", "type": "word" },
  { "en": "grey", "zh": "灰色", "emoji": "🩶", "img": "https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji@main/svg/emoji_u1fa76.svg", "type": "word" },
  { "en": "brown", "zh": "棕色", "emoji": "🟤", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f7e4.svg", "type": "word" },
  { "en": "gold", "zh": "金色", "emoji": "🥇", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f947.svg", "type": "word" },
  { "en": "silver", "zh": "银色", "emoji": "🥈", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f948.svg", "type": "word" },
  { "en": "butterfly", "zh": "蝴蝶", "emoji": "🦋", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98b.svg", "type": "word" },
  { "en": "bee", "zh": "蜜蜂", "emoji": "🐝", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41d.svg", "type": "word" },
  { "en": "ant", "zh": "蚂蚁", "emoji": "🐜", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41c.svg", "type": "word" },
  { "en": "ladybug", "zh": "瓢虫", "emoji": "🐞", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41e.svg", "type": "word" },
  { "en": "dragonfly", "zh": "蜻蜓", "emoji": "🐝", "type": "word" },
  { "en": "mosquito", "zh": "蚊子", "emoji": "🦟", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f99f.svg", "type": "word" },
  { "en": "fly", "zh": "苍蝇", "emoji": "🪰", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fab0.svg", "type": "word" },
  { "en": "caterpillar", "zh": "毛毛虫", "emoji": "🐛", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41b.svg", "type": "word" },
  { "en": "grasshopper", "zh": "蚱蜢", "emoji": "🦗", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f997.svg", "type": "word" },
  { "en": "beetle", "zh": "甲虫", "emoji": "🪲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fab2.svg", "type": "word" },
  { "en": "cricket", "zh": "蟋蟀", "emoji": "🪳", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fab3.svg", "type": "word" },
  { "en": "firefly", "zh": "萤火虫", "emoji": "⭐", "type": "word" },
  { "en": "eye", "zh": "眼睛", "emoji": "👁️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f441.svg", "type": "word" },
  { "en": "ear", "zh": "耳朵", "emoji": "👂", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f442.svg", "type": "word" },
  { "en": "nose", "zh": "鼻子", "emoji": "👃", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f443.svg", "type": "word" },
  { "en": "mouth", "zh": "嘴巴", "emoji": "👄", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f444.svg", "type": "word" },
  { "en": "tongue", "zh": "舌头", "emoji": "👅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f445.svg", "type": "word" },
  { "en": "eyebrow", "zh": "眉毛", "emoji": "🤨", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f928.svg", "type": "word" },
  { "en": "eyelash", "zh": "睫毛", "emoji": "👁️", "type": "word" },
  { "en": "cheek", "zh": "脸颊", "emoji": "😊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60a.svg", "type": "word" },
  { "en": "chin", "zh": "下巴", "emoji": "😶", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f636.svg", "type": "word" },
  { "en": "lip", "zh": "嘴唇", "emoji": "💋", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f48b.svg", "type": "word" },
  { "en": "forehead", "zh": "额头", "emoji": "🤦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f926.svg", "type": "word" },
  { "en": "shoulder", "zh": "肩膀", "emoji": "🤷", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f937.svg", "type": "word" },
  { "en": "arm", "zh": "手臂", "emoji": "💪", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4aa.svg", "type": "word" },
  { "en": "hand", "zh": "手", "emoji": "🤚", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f91a.svg", "type": "word" },
  { "en": "finger", "zh": "手指", "emoji": "☝️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/261d.svg", "type": "word" },
  { "en": "leg", "zh": "腿", "emoji": "🦵", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9b5.svg", "type": "word" },
  { "en": "toe", "zh": "脚趾", "emoji": "🦶", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9b6.svg", "type": "word" },
  { "en": "neck", "zh": "脖子", "emoji": "👔", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f454.svg", "type": "word" },
  { "en": "back", "zh": "后背", "emoji": "🔙", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f519.svg", "type": "word" },
  { "en": "chest", "zh": "胸口", "emoji": "🫁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fac1.svg", "type": "word" },
  { "en": "knee", "zh": "膝盖", "emoji": "🧎", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ce.svg", "type": "word" },
  { "en": "elbow", "zh": "手肘", "emoji": "🤲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f932.svg", "type": "word" },
  { "en": "sunny", "zh": "晴朗的", "emoji": "☀️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg", "type": "word" },
  { "en": "rainy", "zh": "下雨的", "emoji": "🌧️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f327.svg", "type": "word" },
  { "en": "cloudy", "zh": "多云的", "emoji": "☁️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2601.svg", "type": "word" },
  { "en": "windy", "zh": "刮风的", "emoji": "🌬️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f32c.svg", "type": "word" },
  { "en": "snowy", "zh": "下雪的", "emoji": "❄️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2744.svg", "type": "word" },
  { "en": "foggy", "zh": "有雾的", "emoji": "🌫️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f32b.svg", "type": "word" },
  { "en": "hot", "zh": "炎热的", "emoji": "🥵", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f975.svg", "type": "word" },
  { "en": "cold", "zh": "寒冷的", "emoji": "🥶", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f976.svg", "type": "word" },
  { "en": "warm", "zh": "温暖的", "emoji": "🌤️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f324.svg", "type": "word" },
  { "en": "cool", "zh": "凉爽的", "emoji": "😎", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60e.svg", "type": "word" },
  { "en": "stormy", "zh": "暴风雨的", "emoji": "⛈️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26c8.svg", "type": "word" },
  { "en": "icy", "zh": "结冰的", "emoji": "🧊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ca.svg", "type": "word" },
  { "en": "Monday", "zh": "星期一", "emoji": "📅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg", "type": "word" },
  { "en": "Tuesday", "zh": "星期二", "emoji": "📅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg", "type": "word" },
  { "en": "Wednesday", "zh": "星期三", "emoji": "📅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg", "type": "word" },
  { "en": "Thursday", "zh": "星期四", "emoji": "📅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg", "type": "word" },
  { "en": "Friday", "zh": "星期五", "emoji": "📅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg", "type": "word" },
  { "en": "Saturday", "zh": "星期六", "emoji": "📅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg", "type": "word" },
  { "en": "Sunday", "zh": "星期日", "emoji": "📅", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c5.svg", "type": "word" },
  { "en": "January", "zh": "一月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "February", "zh": "二月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "March", "zh": "三月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "April", "zh": "四月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "May", "zh": "五月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "June", "zh": "六月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "July", "zh": "七月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "August", "zh": "八月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "September", "zh": "九月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "October", "zh": "十月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "November", "zh": "十一月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "December", "zh": "十二月", "emoji": "🗓️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5d3.svg", "type": "word" },
  { "en": "get up", "zh": "起床", "emoji": "💬", "type": "sentence" },
  { "en": "wake up", "zh": "醒来", "emoji": "💬", "type": "sentence" },
  { "en": "brush teeth", "zh": "刷牙", "emoji": "💬", "type": "sentence" },
  { "en": "wash face", "zh": "洗脸", "emoji": "💬", "type": "sentence" },
  { "en": "wash hands", "zh": "洗手", "emoji": "💬", "type": "sentence" },
  { "en": "take a shower", "zh": "洗澡", "emoji": "💬", "type": "sentence" },
  { "en": "comb hair", "zh": "梳头", "emoji": "💬", "type": "sentence" },
  { "en": "get dressed", "zh": "穿衣服", "emoji": "💬", "type": "sentence" },
  { "en": "take a nap", "zh": "睡午觉", "emoji": "💬", "type": "sentence" },
  { "en": "go to bed", "zh": "上床睡觉", "emoji": "💬", "type": "sentence" },
  { "en": "good night", "zh": "晚安", "emoji": "💬", "type": "sentence" },
  { "en": "eat breakfast", "zh": "吃早餐", "emoji": "💬", "type": "sentence" },
  { "en": "eat lunch", "zh": "吃午餐", "emoji": "💬", "type": "sentence" },
  { "en": "eat dinner", "zh": "吃晚餐", "emoji": "💬", "type": "sentence" },
  { "en": "drink water", "zh": "喝水", "emoji": "💬", "type": "sentence" },
  { "en": "go to school", "zh": "去上学", "emoji": "💬", "type": "sentence" },
  { "en": "go home", "zh": "回家", "emoji": "💬", "type": "sentence" },
  { "en": "do homework", "zh": "写作业", "emoji": "💬", "type": "sentence" },
  { "en": "read books", "zh": "读书", "emoji": "💬", "type": "sentence" },
  { "en": "write words", "zh": "写字", "emoji": "💬", "type": "sentence" },
  { "en": "draw pictures", "zh": "画画", "emoji": "💬", "type": "sentence" },
  { "en": "sing songs", "zh": "唱歌", "emoji": "💬", "type": "sentence" },
  { "en": "dance", "zh": "跳舞", "emoji": "💬", "type": "word" },
  { "en": "listen to music", "zh": "听音乐", "emoji": "💬", "type": "sentence" },
  { "en": "watch TV", "zh": "看电视", "emoji": "💬", "type": "sentence" },
  { "en": "play toys", "zh": "玩玩具", "emoji": "💬", "type": "sentence" },
  { "en": "play games", "zh": "玩游戏", "emoji": "💬", "type": "sentence" },
  { "en": "play outside", "zh": "出去玩", "emoji": "💬", "type": "sentence" },
  { "en": "take a walk", "zh": "散步", "emoji": "💬", "type": "sentence" },
  { "en": "run fast", "zh": "快跑", "emoji": "💬", "type": "sentence" },
  { "en": "jump high", "zh": "跳高", "emoji": "💬", "type": "sentence" },
  { "en": "swim", "zh": "游泳", "emoji": "💬", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ca.svg", "type": "word" },
  { "en": "ride a bike", "zh": "骑自行车", "emoji": "💬", "type": "sentence" },
  { "en": "play ball", "zh": "玩球", "emoji": "💬", "type": "sentence" },
  { "en": "I can run", "zh": "我会跑", "emoji": "💬", "type": "sentence" },
  { "en": "I can jump", "zh": "我会跳", "emoji": "💬", "type": "sentence" },
  { "en": "I can sing", "zh": "我会唱歌", "emoji": "💬", "type": "sentence" },
  { "en": "I can walk", "zh": "我会走路", "emoji": "💬", "type": "sentence" },
  { "en": "I can talk", "zh": "我会说话", "emoji": "💬", "type": "sentence" },
  { "en": "I can see", "zh": "我看得见", "emoji": "💬", "type": "sentence" },
  { "en": "I can hear", "zh": "我听得见", "emoji": "💬", "type": "sentence" },
  { "en": "clean room", "zh": "打扫房间", "emoji": "💬", "type": "sentence" },
  { "en": "wash clothes", "zh": "洗衣服", "emoji": "💬", "type": "sentence" },
  { "en": "wipe the table", "zh": "擦桌子", "emoji": "💬", "type": "sentence" },
  { "en": "wash cup", "zh": "洗杯子", "emoji": "💬", "type": "sentence" },
  { "en": "pick up toys", "zh": "收拾玩具", "emoji": "💬", "type": "sentence" },
  { "en": "put away books", "zh": "收好书本", "emoji": "💬", "type": "sentence" },
  { "en": "clean up", "zh": "收拾干净", "emoji": "💬", "type": "sentence" },
  { "en": "help mom", "zh": "帮妈妈干活", "emoji": "💬", "type": "sentence" },
  { "en": "blow nose", "zh": "擦鼻涕", "emoji": "💬", "type": "sentence" },
  { "en": "cover mouth", "zh": "捂嘴巴", "emoji": "💬", "type": "sentence" },
  { "en": "good morning", "zh": "早上好", "emoji": "💬", "type": "sentence" },
  { "en": "good afternoon", "zh": "下午好", "emoji": "💬", "type": "sentence" },
  { "en": "say hello", "zh": "打招呼", "emoji": "💬", "type": "sentence" },
  { "en": "say goodbye", "zh": "再见", "emoji": "💬", "type": "sentence" },
  { "en": "thank you", "zh": "谢谢你", "emoji": "💬", "type": "sentence" },
  { "en": "you’re welcome", "zh": "不客气", "emoji": "💬", "type": "sentence" },
  { "en": "sorry", "zh": "对不起", "emoji": "💬", "type": "sentence" },
  { "en": "it’s okay", "zh": "没关系", "emoji": "💬", "type": "sentence" },
  { "en": "please", "zh": "请", "emoji": "💬", "type": "word" },
  { "en": "excuse me", "zh": "打扰一下", "emoji": "💬", "type": "sentence" },
  { "en": "I love mom", "zh": "我爱妈妈", "emoji": "💬", "type": "sentence" },
  { "en": "I love dad", "zh": "我爱爸爸", "emoji": "💬", "type": "sentence" },
  { "en": "stand up", "zh": "站起来", "emoji": "💬", "type": "sentence" },
  { "en": "sit down", "zh": "坐下", "emoji": "💬", "type": "sentence" },
  { "en": "open the door", "zh": "开门", "emoji": "💬", "type": "sentence" },
  { "en": "close the door", "zh": "关门", "emoji": "💬", "type": "sentence" },
  { "en": "open the window", "zh": "开窗", "emoji": "💬", "type": "sentence" },
  { "en": "close the window", "zh": "关窗", "emoji": "💬", "type": "sentence" },
  { "en": "turn on the light", "zh": "开灯", "emoji": "💬", "type": "sentence" },
  { "en": "turn off the light", "zh": "关灯", "emoji": "💬", "type": "sentence" },
  { "en": "listen carefully", "zh": "认真听", "emoji": "💬", "type": "sentence" },
  { "en": "look at me", "zh": "看着我", "emoji": "💬", "type": "sentence" },
  { "en": "be quiet", "zh": "安静", "emoji": "💬", "type": "sentence" },
  { "en": "raise your hand", "zh": "举手", "emoji": "💬", "type": "sentence" },
  { "en": "come here", "zh": "过来", "emoji": "💬", "type": "sentence" },
  { "en": "go back", "zh": "回去", "emoji": "💬", "type": "sentence" },
  { "en": "line up", "zh": "排队", "emoji": "💬", "type": "sentence" },
  { "en": "be good", "zh": "乖乖的", "emoji": "💬", "type": "sentence" },
  { "en": "I’m happy", "zh": "我很开心", "emoji": "💬", "type": "sentence" },
  { "en": "I’m sad", "zh": "我难过", "emoji": "💬", "type": "sentence" },
  { "en": "I’m tired", "zh": "我累了", "emoji": "💬", "type": "sentence" },
  { "en": "I’m hungry", "zh": "我饿了", "emoji": "💬", "type": "sentence" },
  { "en": "I’m thirsty", "zh": "我渴了", "emoji": "💬", "type": "sentence" },
  { "en": "It’s good", "zh": "很棒", "emoji": "💬", "type": "sentence" },
  { "en": "It’s bad", "zh": "不好", "emoji": "💬", "type": "sentence" },
  { "en": "Very good", "zh": "非常棒", "emoji": "💬", "type": "sentence" },
  { "en": "This is my nose", "zh": "这是我的鼻子", "emoji": "💬", "type": "sentence" },
  { "en": "This is my mouth", "zh": "这是我的嘴巴", "emoji": "💬", "type": "sentence" },
  { "en": "This is my eye", "zh": "这是我的眼睛", "emoji": "💬", "type": "sentence" },
  { "en": "This is my ear", "zh": "这是我的耳朵", "emoji": "💬", "type": "sentence" },
  { "en": "This is my hand", "zh": "这是我的小手", "emoji": "💬", "type": "sentence" },
  { "en": "This is a table", "zh": "这是桌子", "emoji": "💬", "type": "sentence" },
  { "en": "This is a chair", "zh": "这是椅子", "emoji": "💬", "type": "sentence" },
  { "en": "This is a bed", "zh": "这是床", "emoji": "💬", "type": "sentence" },
  { "en": "This is a sofa", "zh": "这是沙发", "emoji": "💬", "type": "sentence" },
  { "en": "I see a dog", "zh": "我看见一只小狗", "emoji": "💬", "type": "sentence" },
  { "en": "I see a cat", "zh": "我看见一只小猫", "emoji": "💬", "type": "sentence" },
  { "en": "I see a bird", "zh": "我看见一只小鸟", "emoji": "💬", "type": "sentence" },
  { "en": "I see a red apple", "zh": "我看见一个红苹果", "emoji": "💬", "type": "sentence" },
  { "en": "I see a black dog", "zh": "我看见一只黑色的小狗", "emoji": "💬", "type": "sentence" },
  { "en": "It is sunny", "zh": "天气晴朗", "emoji": "💬", "type": "sentence" },
  { "en": "It is rainy", "zh": "下雨了", "emoji": "💬", "type": "sentence" },
  { "en": "It is cold", "zh": "天气很冷", "emoji": "💬", "type": "sentence" },
  { "en": "It is warm", "zh": "天气暖和", "emoji": "💬", "type": "sentence" },
  { "en": "It is windy", "zh": "刮风了", "emoji": "💬", "type": "sentence" },
  { "en": "It is cloudy", "zh": "多云天气", "emoji": "💬", "type": "sentence" },
  { "en": "I like milk", "zh": "我喜欢牛奶", "emoji": "💬", "type": "sentence" },
  { "en": "I like fruit", "zh": "我喜欢水果", "emoji": "💬", "type": "sentence" },
  { "en": "I like toys", "zh": "我喜欢玩具", "emoji": "💬", "type": "sentence" },
  { "en": "I like animals", "zh": "我喜欢小动物", "emoji": "💬", "type": "sentence" },
  { "en": "I am tall", "zh": "我高高的", "emoji": "💬", "type": "sentence" },
  { "en": "I am small", "zh": "我小小的", "emoji": "💬", "type": "sentence" },
  { "en": "zero / one / two / three", "zh": "零、一、二、三", "emoji": "💬", "type": "sentence" },
  { "en": "How many?", "zh": "有多少？", "emoji": "💬", "type": "sentence" },
  { "en": "One apple.", "zh": "一个苹果。", "emoji": "💬", "type": "sentence" },
  { "en": "Two birds.", "zh": "两只小鸟。", "emoji": "💬", "type": "sentence" },
  { "en": "Three bananas.", "zh": "三根香蕉。", "emoji": "💬", "type": "sentence" },
  { "en": "Ten fingers.", "zh": "十根手指。", "emoji": "💬", "type": "sentence" },
  { "en": "I have five toys.", "zh": "我有五个玩具。", "emoji": "💬", "type": "sentence" },
  { "en": "The pen is on the desk.", "zh": "钢笔在桌子上。", "emoji": "💬", "type": "sentence" },
  { "en": "The ball is under the chair.", "zh": "球在椅子下面。", "emoji": "💬", "type": "sentence" },
  { "en": "I sit behind you.", "zh": "我坐在你后面。", "emoji": "💬", "type": "sentence" },
  { "en": "The cat is beside the box.", "zh": "小猫在盒子旁边。", "emoji": "💬", "type": "sentence" },
  { "en": "house", "zh": "房子", "emoji": "🏡", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3e1.svg", "type": "word" },
  { "en": "door", "zh": "门", "emoji": "🚪", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6aa.svg", "type": "word" },
  { "en": "window", "zh": "窗户", "emoji": "🪟", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa9f.svg", "type": "word" },
  { "en": "wall", "zh": "墙壁", "emoji": "🧱", "type": "word" },
  { "en": "floor", "zh": "地板", "emoji": "🔲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f532.svg", "type": "word" },
  { "en": "ceiling", "zh": "天花板", "emoji": "🏮", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3ee.svg", "type": "word" },
  { "en": "table", "zh": "桌子", "emoji": "🍽️", "type": "word" },
  { "en": "chair", "zh": "椅子", "emoji": "🪑", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa91.svg", "type": "word" },
  { "en": "desk", "zh": "书桌", "emoji": "🖥️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5a5.svg", "type": "word" },
  { "en": "bed", "zh": "床", "emoji": "🛏️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6cf.svg", "type": "word" },
  { "en": "sofa", "zh": "沙发", "emoji": "🛋️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6cb.svg", "type": "word" },
  { "en": "lamp", "zh": "台灯", "emoji": "💡", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a1.svg", "type": "word" },
  { "en": "clock", "zh": "时钟", "emoji": "🕐", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f550.svg", "type": "word" },
  { "en": "mirror", "zh": "镜子", "emoji": "🪞", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1fa9e.svg", "type": "word" },
  { "en": "curtain", "zh": "窗帘", "emoji": "🪟", "type": "word" },
  { "en": "cupboard", "zh": "橱柜", "emoji": "🗄️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f5c4.svg", "type": "word" },
  { "en": "box", "zh": "盒子", "emoji": "📦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e6.svg", "type": "word" },
  { "en": "big", "zh": "大的", "emoji": "🐘", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f418.svg", "type": "word" },
  { "en": "small", "zh": "小的", "emoji": "🐁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f401.svg", "type": "word" },
  { "en": "tall", "zh": "高的", "emoji": "🦒", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f992.svg", "type": "word" },
  { "en": "short", "zh": "矮的/短的", "emoji": "📏", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cf.svg", "type": "word" },
  { "en": "long", "zh": "长的", "emoji": "📏", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cf.svg", "type": "word" },
  { "en": "short", "zh": "短的", "emoji": "📏", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4cf.svg", "type": "word" },
  { "en": "fat", "zh": "胖的", "emoji": "🐷", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f437.svg", "type": "word" },
  { "en": "thin", "zh": "瘦的", "emoji": "🍃", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f343.svg", "type": "word" },
  { "en": "hot", "zh": "热的", "emoji": "🥵", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f975.svg", "type": "word" },
  { "en": "cold", "zh": "冷的", "emoji": "🥶", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f976.svg", "type": "word" },
  { "en": "warm", "zh": "温暖的", "emoji": "🌤️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f324.svg", "type": "word" },
  { "en": "cool", "zh": "凉爽的", "emoji": "😎", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60e.svg", "type": "word" },
  { "en": "fast", "zh": "快的", "emoji": "🏃", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c3.svg", "type": "word" },
  { "en": "slow", "zh": "慢的", "emoji": "🐢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f422.svg", "type": "word" },
  { "en": "happy", "zh": "开心的", "emoji": "😊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f60a.svg", "type": "word" },
  { "en": "sad", "zh": "难过的", "emoji": "😢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f622.svg", "type": "word" },
  { "en": "new", "zh": "新的", "emoji": "🆕", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f195.svg", "type": "word" },
  { "en": "old", "zh": "旧的/老的", "emoji": "🏚️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3da.svg", "type": "word" },
  { "en": "good", "zh": "好的", "emoji": "👍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f44d.svg", "type": "word" },
  { "en": "bad", "zh": "坏的", "emoji": "👎", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f44e.svg", "type": "word" },
  { "en": "clean", "zh": "干净的", "emoji": "🧼", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9fc.svg", "type": "word" },
  { "en": "dirty", "zh": "脏的", "emoji": "🤮", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f92e.svg", "type": "word" },
  { "en": "open", "zh": "打开", "emoji": "📂", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c2.svg", "type": "word" },
  { "en": "close", "zh": "关闭", "emoji": "📁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c1.svg", "type": "word" },
  { "en": "up", "zh": "向上", "emoji": "⬆️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b06.svg", "type": "word" },
  { "en": "down", "zh": "向下", "emoji": "⬇️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b07.svg", "type": "word" },
  { "en": "in", "zh": "在里面", "emoji": "📦", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e6.svg", "type": "word" },
  { "en": "out", "zh": "在外面", "emoji": "🚪", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6aa.svg", "type": "word" },
  { "en": "on", "zh": "在上面", "emoji": "👆", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f446.svg", "type": "word" },
  { "en": "under", "zh": "在下面", "emoji": "👇", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f447.svg", "type": "word" },
  { "en": "front", "zh": "在前面", "emoji": "⏩", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/23e9.svg", "type": "word" },
  { "en": "back", "zh": "在后面", "emoji": "🔙", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f519.svg", "type": "word" },
  { "en": "many", "zh": "多的", "emoji": "⚖️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2696.svg", "type": "word" },
  { "en": "few", "zh": "少的", "emoji": "🤏", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f90f.svg", "type": "word" },
  { "en": "loud", "zh": "大声的", "emoji": "📢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4e2.svg", "type": "word" },
  { "en": "quiet", "zh": "安静的", "emoji": "🤫", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f92b.svg", "type": "word" },
  { "en": "zero", "zh": "零", "emoji": "0️⃣", "type": "word" },
  { "en": "one", "zh": "一", "emoji": "1️⃣", "type": "word" },
  { "en": "two", "zh": "二", "emoji": "2️⃣", "type": "word" },
  { "en": "three", "zh": "三", "emoji": "3️⃣", "type": "word" },
  { "en": "four", "zh": "四", "emoji": "4️⃣", "type": "word" },
  { "en": "five", "zh": "五", "emoji": "5️⃣", "type": "word" },
  { "en": "six", "zh": "六", "emoji": "6️⃣", "type": "word" },
  { "en": "seven", "zh": "七", "emoji": "7️⃣", "type": "word" },
  { "en": "eight", "zh": "八", "emoji": "8️⃣", "type": "word" },
  { "en": "nine", "zh": "九", "emoji": "9️⃣", "type": "word" },
  { "en": "ten", "zh": "十", "emoji": "🔟", "type": "word" },
  { "en": "eleven", "zh": "十一", "emoji": "1️⃣1️⃣", "type": "word" },
  { "en": "twelve", "zh": "十二", "emoji": "1️⃣2️⃣", "type": "word" },
  { "en": "thirteen", "zh": "十三", "emoji": "1️⃣3️⃣", "type": "word" },
  { "en": "fourteen", "zh": "十四", "emoji": "1️⃣4️⃣", "type": "word" },
  { "en": "fifteen", "zh": "十五", "emoji": "1️⃣5️⃣", "type": "word" },
  { "en": "sixteen", "zh": "十六", "emoji": "1️⃣6️⃣", "type": "word" },
  { "en": "seventeen", "zh": "十七", "emoji": "1️⃣7️⃣", "type": "word" },
  { "en": "eighteen", "zh": "十八", "emoji": "1️⃣8️⃣", "type": "word" },
  { "en": "nineteen", "zh": "十九", "emoji": "1️⃣9️⃣", "type": "word" },
  { "en": "twenty", "zh": "二十", "emoji": "2️⃣0️⃣", "type": "word" },
  { "en": "thirty", "zh": "三十", "emoji": "3️⃣0️⃣", "type": "word" },
  { "en": "forty", "zh": "四十", "emoji": "4️⃣0️⃣", "type": "word" },
  { "en": "fifty", "zh": "五十", "emoji": "5️⃣0️⃣", "type": "word" },
  { "en": "sixty", "zh": "六十", "emoji": "6️⃣0️⃣", "type": "word" },
  { "en": "seventy", "zh": "七十", "emoji": "7️⃣0️⃣", "type": "word" },
  { "en": "eighty", "zh": "八十", "emoji": "8️⃣0️⃣", "type": "word" },
  { "en": "ninety", "zh": "九十", "emoji": "9️⃣0️⃣", "type": "word" },
  { "en": "one hundred", "zh": "一百", "emoji": "🔢", "type": "word" },

  { "en": "name", "zh": "名字", "emoji": "🏷️", "type": "word" },
  { "en": "friend", "zh": "朋友", "emoji": "🤝", "type": "word" },
  { "en": "boy", "zh": "男孩", "emoji": "👦", "type": "word" },
  { "en": "girl", "zh": "女孩", "emoji": "👧", "type": "word" },
  { "en": "man", "zh": "男人", "emoji": "👨", "type": "word" },
  { "en": "woman", "zh": "女人", "emoji": "👩", "type": "word" },
  { "en": "people", "zh": "人们", "emoji": "👥", "type": "word" },
  { "en": "child", "zh": "孩子", "emoji": "🧒", "type": "word" },
  { "en": "children", "zh": "孩子们", "emoji": "👫", "type": "word" },
  { "en": "cat", "zh": "猫", "emoji": "🐱", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg", "type": "word" },
  { "en": "dog", "zh": "狗", "emoji": "🐶", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg", "type": "word" },
  { "en": "rabbit", "zh": "兔子", "emoji": "🐰", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg", "type": "word" },
  { "en": "hamster", "zh": "仓鼠", "emoji": "🐹", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg", "type": "word" },
  { "en": "goldfish", "zh": "金鱼", "emoji": "🐠", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f420.svg", "type": "word" },
  { "en": "blackboard", "zh": "黑板", "emoji": "🖤", "type": "word" },
  { "en": "chalk", "zh": "粉笔", "emoji": "✏️", "type": "word" },
  { "en": "marker", "zh": "马克笔", "emoji": "🖊️", "type": "word" },
  { "en": "globe", "zh": "地球仪", "emoji": "🌐", "type": "word" },
  { "en": "map", "zh": "地图", "emoji": "🗺️", "type": "word" },
  { "en": "TV", "zh": "电视", "emoji": "📺", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4fa.svg", "type": "word" },
  { "en": "phone", "zh": "手机", "emoji": "📱", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4f1.svg", "type": "word" },
  { "en": "computer", "zh": "电脑", "emoji": "💻", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bb.svg", "type": "word" },
  { "en": "refrigerator", "zh": "冰箱", "emoji": "🧊", "type": "word" },
  { "en": "microwave", "zh": "微波炉", "emoji": "📦", "type": "word" },
  { "en": "washing machine", "zh": "洗衣机", "emoji": "🫧", "type": "word" },
  { "en": "bowl", "zh": "碗", "emoji": "🥣", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f963.svg", "type": "word" },
  { "en": "plate", "zh": "盘子", "emoji": "🍽️", "type": "word" },
  { "en": "cup", "zh": "杯子", "emoji": "☕", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2615.svg", "type": "word" },
  { "en": "spoon", "zh": "勺子", "emoji": "🥄", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f944.svg", "type": "word" },
  { "en": "fork", "zh": "叉子", "emoji": "🍴", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f374.svg", "type": "word" },
  { "en": "chopsticks", "zh": "筷子", "emoji": "🥢", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f962.svg", "type": "word" },
  { "en": "pot", "zh": "锅", "emoji": "🫕", "type": "word" },
  { "en": "toothbrush", "zh": "牙刷", "emoji": "🪥", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1faa5.svg", "type": "word" },
  { "en": "toothpaste", "zh": "牙膏", "emoji": "🦷", "type": "word" },
  { "en": "towel", "zh": "毛巾", "emoji": "🧻", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9fb.svg", "type": "word" },
  { "en": "comb", "zh": "梳子", "emoji": "💈", "type": "word" },
  { "en": "shower", "zh": "淋浴", "emoji": "🚿", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6bf.svg", "type": "word" },
  { "en": "bath", "zh": "洗澡盆", "emoji": "🛁", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f6c1.svg", "type": "word" },
  { "en": "sun", "zh": "太阳", "emoji": "☀️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg", "type": "word" },
  { "en": "moon", "zh": "月亮", "emoji": "🌙", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f319.svg", "type": "word" },
  { "en": "star", "zh": "星星", "emoji": "⭐", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg", "type": "word" },
  { "en": "cloud", "zh": "云", "emoji": "☁️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2601.svg", "type": "word" },
  { "en": "rain", "zh": "雨", "emoji": "🌧️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f327.svg", "type": "word" },
  { "en": "snow", "zh": "雪", "emoji": "❄️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2744.svg", "type": "word" },
  { "en": "wind", "zh": "风", "emoji": "💨", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4a8.svg", "type": "word" },
  { "en": "rainbow", "zh": "彩虹", "emoji": "🌈", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f308.svg", "type": "word" },
  { "en": "mountain", "zh": "山", "emoji": "⛰️", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/26f0.svg", "type": "word" },
  { "en": "river", "zh": "河流", "emoji": "🏞️", "type": "word" },
  { "en": "sea", "zh": "大海", "emoji": "🌊", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f30a.svg", "type": "word" },
  { "en": "tree", "zh": "树", "emoji": "🌳", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f333.svg", "type": "word" },
  { "en": "flower", "zh": "花", "emoji": "🌸", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f338.svg", "type": "word" },
  { "en": "grass", "zh": "草", "emoji": "🌿", "type": "word" },
  { "en": "leaf", "zh": "叶子", "emoji": "🍃", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f343.svg", "type": "word" },
  { "en": "lake", "zh": "湖", "emoji": "🌅", "type": "word" },
  { "en": "forest", "zh": "森林", "emoji": "🌲", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f332.svg", "type": "word" },
  { "en": "sky", "zh": "天空", "emoji": "🌤️", "type": "word" },
  { "en": "earth", "zh": "地球", "emoji": "🌍", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f30d.svg", "type": "word" },
  { "en": "New Year", "zh": "新年", "emoji": "🎆", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f386.svg", "type": "word" },
  { "en": "Spring Festival", "zh": "春节", "emoji": "🧧", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9e7.svg", "type": "word" },
  { "en": "Mid-Autumn Festival", "zh": "中秋节", "emoji": "🥮", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f96e.svg", "type": "word" },
  { "en": "have lunch", "zh": "吃午饭", "emoji": "🍱", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f371.svg", "type": "sentence" },
  { "en": "have dinner", "zh": "吃晚饭", "emoji": "🍜", "img": "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f35c.svg", "type": "sentence" },

  // ── 代词 ──
  { "en": "I", "zh": "我", "emoji": "🙋", "type": "word" },
  { "en": "you", "zh": "你", "emoji": "👉", "type": "word" },
  { "en": "he", "zh": "他", "emoji": "👦", "type": "word" },
  { "en": "she", "zh": "她", "emoji": "👧", "type": "word" },
  { "en": "it", "zh": "它", "emoji": "🐾", "type": "word" },
  { "en": "we", "zh": "我们", "emoji": "👫", "type": "word" },
  { "en": "they", "zh": "他们", "emoji": "👨‍👩‍👧‍👦", "type": "word" },
  { "en": "my", "zh": "我的", "emoji": "💼", "type": "word" },
  { "en": "your", "zh": "你的", "emoji": "📦", "type": "word" },
  { "en": "his", "zh": "他的", "emoji": "🎒", "type": "word" },
  { "en": "her", "zh": "她的", "emoji": "👜", "type": "word" },
  { "en": "our", "zh": "我们的", "emoji": "🏠", "type": "word" },
  { "en": "their", "zh": "他们的", "emoji": "🏡", "type": "word" },

  // ── 疑问词 ──
  { "en": "what", "zh": "什么", "emoji": "❓", "type": "word" },
  { "en": "who", "zh": "谁", "emoji": "🤷", "type": "word" },
  { "en": "where", "zh": "哪里", "emoji": "📍", "type": "word" },
  { "en": "when", "zh": "什么时候", "emoji": "🕐", "type": "word" },
  { "en": "why", "zh": "为什么", "emoji": "🤔", "type": "word" },
  { "en": "how", "zh": "怎么", "emoji": "💬", "type": "word" },
  { "en": "which", "zh": "哪一个", "emoji": "☝️", "type": "word" },

  // ── 常用词 ──
  { "en": "yes", "zh": "是的", "emoji": "✅", "type": "word" },
  { "en": "no", "zh": "不", "emoji": "❌", "type": "word" },
  { "en": "OK", "zh": "好的", "emoji": "👌", "type": "word" },
  { "en": "hello", "zh": "你好", "emoji": "👋", "type": "word" },
  { "en": "hi", "zh": "嗨", "emoji": "😊", "type": "word" },
  { "en": "goodbye", "zh": "再见", "emoji": "👋", "type": "word" },
  { "en": "bye", "zh": "拜拜", "emoji": "✌️", "type": "word" },
  { "en": "thanks", "zh": "谢谢", "emoji": "😊", "type": "word" },

  // ── 基本动词 ──
  { "en": "go", "zh": "去", "emoji": "🚶", "type": "word" },
  { "en": "come", "zh": "来", "emoji": "🤗", "type": "word" },
  { "en": "get", "zh": "得到", "emoji": "🎁", "type": "word" },
  { "en": "make", "zh": "制作", "emoji": "🔨", "type": "word" },
  { "en": "take", "zh": "拿取", "emoji": "✋", "type": "word" },
  { "en": "give", "zh": "给", "emoji": "🎀", "type": "word" },
  { "en": "find", "zh": "找到", "emoji": "🔍", "type": "word" },
  { "en": "know", "zh": "知道", "emoji": "💡", "type": "word" },
  { "en": "think", "zh": "认为", "emoji": "🤔", "type": "word" },
  { "en": "say", "zh": "说", "emoji": "💬", "type": "word" },
  { "en": "see", "zh": "看见", "emoji": "👀", "type": "word" },
  { "en": "hear", "zh": "听见", "emoji": "👂", "type": "word" },
  { "en": "look", "zh": "看", "emoji": "👁️", "type": "word" },
  { "en": "want", "zh": "想要", "emoji": "💭", "type": "word" },
  { "en": "need", "zh": "需要", "emoji": "📌", "type": "word" },
  { "en": "like", "zh": "喜欢", "emoji": "❤️", "type": "word" },
  { "en": "love", "zh": "爱", "emoji": "💕", "type": "word" },
  { "en": "have", "zh": "有", "emoji": "🤲", "type": "word" },
  { "en": "do", "zh": "做", "emoji": "🙌", "type": "word" },
  { "en": "run", "zh": "跑", "emoji": "🏃", "type": "word" },
  { "en": "walk", "zh": "走路", "emoji": "🚶", "type": "word" },
  { "en": "jump", "zh": "跳", "emoji": "🦘", "type": "word" },
  { "en": "sit", "zh": "坐", "emoji": "🪑", "type": "word" },
  { "en": "stand", "zh": "站立", "emoji": "🧍", "type": "word" },
  { "en": "sleep", "zh": "睡觉", "emoji": "😴", "type": "word" },
  { "en": "ride", "zh": "骑", "emoji": "🚲", "type": "word" },
  { "en": "help", "zh": "帮助", "emoji": "🤝", "type": "word" },
  { "en": "wear", "zh": "穿", "emoji": "👗", "type": "word" },
  { "en": "buy", "zh": "买", "emoji": "🛒", "type": "word" },
  { "en": "sell", "zh": "卖", "emoji": "🏪", "type": "word" },
  { "en": "pay", "zh": "付钱", "emoji": "💰", "type": "word" },
  { "en": "turn", "zh": "转弯", "emoji": "↩️", "type": "word" },
  { "en": "wait", "zh": "等待", "emoji": "⏳", "type": "word" },
  { "en": "stop", "zh": "停止", "emoji": "🛑", "type": "word" },
  { "en": "start", "zh": "开始", "emoji": "🚀", "type": "word" },
  { "en": "sing", "zh": "唱歌", "emoji": "🎤", "type": "word" },
  { "en": "feel", "zh": "感觉", "emoji": "💖", "type": "word" },
  { "en": "visit", "zh": "参观", "emoji": "🏛️", "type": "word" },
  { "en": "arrive", "zh": "到达", "emoji": "🏁", "type": "word" },
  { "en": "leave", "zh": "离开", "emoji": "👋", "type": "word" },

  // ── 学科 ──
  { "en": "Chinese", "zh": "语文", "emoji": "📖", "type": "word" },
  { "en": "English", "zh": "英语", "emoji": "🇬🇧", "type": "word" },
  { "en": "math", "zh": "数学", "emoji": "➕", "type": "word" },
  { "en": "science", "zh": "科学", "emoji": "🔬", "type": "word" },
  { "en": "music", "zh": "音乐课", "emoji": "🎵", "type": "word" },
  { "en": "art", "zh": "美术", "emoji": "🎨", "type": "word" },
  { "en": "PE", "zh": "体育", "emoji": "⚽", "type": "word" },
  { "en": "classroom", "zh": "教室", "emoji": "🏫", "type": "word" },
  { "en": "grade", "zh": "年级", "emoji": "🎓", "type": "word" },
  { "en": "class", "zh": "班级", "emoji": "👨‍🏫", "type": "word" },
  { "en": "lesson", "zh": "课", "emoji": "📚", "type": "word" },
  { "en": "subject", "zh": "科目", "emoji": "📋", "type": "word" },
  { "en": "exam", "zh": "考试", "emoji": "📝", "type": "word" },
  { "en": "test", "zh": "测验", "emoji": "✏️", "type": "word" },
  { "en": "question", "zh": "问题", "emoji": "❓", "type": "word" },
  { "en": "answer", "zh": "答案", "emoji": "💡", "type": "word" },
  { "en": "story", "zh": "故事", "emoji": "📖", "type": "word" },
  { "en": "word", "zh": "单词", "emoji": "🔤", "type": "word" },
  { "en": "letter", "zh": "字母", "emoji": "✉️", "type": "word" },
  { "en": "number", "zh": "数字", "emoji": "🔢", "type": "word" },
  { "en": "textbook", "zh": "教科书", "emoji": "📖", "type": "word" },
  { "en": "dictionary", "zh": "词典", "emoji": "📚", "type": "word" },
  { "en": "projector", "zh": "投影仪", "emoji": "📽️", "type": "word" },

  // ── 家庭成员 ──
  { "en": "father", "zh": "父亲", "emoji": "👨", "type": "word" },
  { "en": "mother", "zh": "母亲", "emoji": "👩", "type": "word" },
  { "en": "dad", "zh": "爸爸", "emoji": "👨", "type": "word" },
  { "en": "mom", "zh": "妈妈", "emoji": "👩", "type": "word" },
  { "en": "brother", "zh": "兄弟", "emoji": "👦", "type": "word" },
  { "en": "sister", "zh": "姐妹", "emoji": "👧", "type": "word" },
  { "en": "grandpa", "zh": "爷爷", "emoji": "👴", "type": "word" },
  { "en": "grandma", "zh": "奶奶", "emoji": "👵", "type": "word" },
  { "en": "grandfather", "zh": "祖父", "emoji": "👴", "type": "word" },
  { "en": "grandmother", "zh": "祖母", "emoji": "👵", "type": "word" },
  { "en": "uncle", "zh": "叔叔", "emoji": "👨", "type": "word" },
  { "en": "aunt", "zh": "阿姨", "emoji": "👩", "type": "word" },
  { "en": "baby", "zh": "宝宝", "emoji": "👶", "type": "word" },
  { "en": "family", "zh": "家庭", "emoji": "👨‍👩‍👧‍👦", "type": "word" },
  { "en": "son", "zh": "儿子", "emoji": "👦", "type": "word" },
  { "en": "daughter", "zh": "女儿", "emoji": "👧", "type": "word" },

  // ── 身体（补充）──
  { "en": "head", "zh": "头", "emoji": "🗣️", "type": "word" },
  { "en": "face", "zh": "脸", "emoji": "😊", "type": "word" },
  { "en": "hair", "zh": "头发", "emoji": "💇", "type": "word" },
  { "en": "tooth", "zh": "牙齿", "emoji": "🦷", "type": "word" },
  { "en": "throat", "zh": "喉咙", "emoji": "🤒", "type": "word" },
  { "en": "stomach", "zh": "肚子", "emoji": "🫃", "type": "word" },
  { "en": "heart", "zh": "心脏", "emoji": "❤️", "type": "word" },

  // ── 健康 ──
  { "en": "sick", "zh": "生病的", "emoji": "🤒", "type": "word" },
  { "en": "headache", "zh": "头痛", "emoji": "🤕", "type": "word" },
  { "en": "toothache", "zh": "牙痛", "emoji": "🦷", "type": "word" },
  { "en": "stomachache", "zh": "胃痛", "emoji": "🫃", "type": "word" },
  { "en": "fever", "zh": "发烧", "emoji": "🌡️", "type": "word" },
  { "en": "medicine", "zh": "药", "emoji": "💊", "type": "word" },
  { "en": "dentist", "zh": "牙医", "emoji": "🦷", "type": "word" },
  { "en": "hurt", "zh": "受伤", "emoji": "🩹", "type": "word" },
  { "en": "healthy", "zh": "健康的", "emoji": "🥗", "type": "word" },
  { "en": "better", "zh": "好转", "emoji": "😊", "type": "word" },

  // ── 购物 ──
  { "en": "price", "zh": "价格", "emoji": "💲", "type": "word" },
  { "en": "cheap", "zh": "便宜的", "emoji": "💸", "type": "word" },
  { "en": "expensive", "zh": "贵的", "emoji": "💎", "type": "word" },
  { "en": "money", "zh": "钱", "emoji": "💰", "type": "word" },
  { "en": "change", "zh": "零钱", "emoji": "🪙", "type": "word" },
  { "en": "mall", "zh": "购物中心", "emoji": "🏬", "type": "word" },
  { "en": "market", "zh": "市场", "emoji": "🏪", "type": "word" },
  { "en": "store", "zh": "商店", "emoji": "🏪", "type": "word" },

  // ── 旅游交通 ──
  { "en": "travel", "zh": "旅行", "emoji": "✈️", "type": "word" },
  { "en": "trip", "zh": "旅程", "emoji": "🧳", "type": "word" },
  { "en": "ticket", "zh": "票", "emoji": "🎫", "type": "word" },
  { "en": "passport", "zh": "护照", "emoji": "📘", "type": "word" },
  { "en": "hotel", "zh": "酒店", "emoji": "🏨", "type": "word" },
  { "en": "suitcase", "zh": "行李箱", "emoji": "🧳", "type": "word" },
  { "en": "airport", "zh": "机场", "emoji": "✈️", "type": "word" },
  { "en": "station", "zh": "车站", "emoji": "🚉", "type": "word" },
  { "en": "taxi", "zh": "出租车", "emoji": "🚕", "type": "word" },
  { "en": "street", "zh": "街道", "emoji": "🛣️", "type": "word" },
  { "en": "road", "zh": "路", "emoji": "🛤️", "type": "word" },
  { "en": "bridge", "zh": "桥", "emoji": "🌉", "type": "word" },
  { "en": "traffic light", "zh": "交通灯", "emoji": "🚦", "type": "word" },
  { "en": "left", "zh": "左边", "emoji": "⬅️", "type": "word" },
  { "en": "right", "zh": "右边", "emoji": "➡️", "type": "word" },
  { "en": "straight", "zh": "直走", "emoji": "⬆️", "type": "word" },
  { "en": "north", "zh": "北", "emoji": "⬆️", "type": "word" },
  { "en": "south", "zh": "南", "emoji": "⬇️", "type": "word" },
  { "en": "east", "zh": "东", "emoji": "➡️", "type": "word" },
  { "en": "west", "zh": "西", "emoji": "⬅️", "type": "word" },

  // ── 季节天气（补充）──
  { "en": "season", "zh": "季节", "emoji": "🌿", "type": "word" },
  { "en": "spring", "zh": "春天", "emoji": "🌸", "type": "word" },
  { "en": "summer", "zh": "夏天", "emoji": "☀️", "type": "word" },
  { "en": "autumn", "zh": "秋天", "emoji": "🍂", "type": "word" },
  { "en": "winter", "zh": "冬天", "emoji": "❄️", "type": "word" },
  { "en": "thunder", "zh": "打雷", "emoji": "⛈️", "type": "word" },
  { "en": "lightning", "zh": "闪电", "emoji": "⚡", "type": "word" },
  { "en": "storm", "zh": "暴风雨", "emoji": "🌩️", "type": "word" },
  { "en": "temperature", "zh": "温度", "emoji": "🌡️", "type": "word" },

  // ── 时间（补充）──
  { "en": "morning", "zh": "早晨", "emoji": "🌄", "type": "word" },
  { "en": "afternoon", "zh": "下午", "emoji": "☀️", "type": "word" },
  { "en": "evening", "zh": "傍晚", "emoji": "🌇", "type": "word" },
  { "en": "night", "zh": "夜晚", "emoji": "🌙", "type": "word" },
  { "en": "today", "zh": "今天", "emoji": "📅", "type": "word" },
  { "en": "yesterday", "zh": "昨天", "emoji": "⏮️", "type": "word" },
  { "en": "tomorrow", "zh": "明天", "emoji": "⏭️", "type": "word" },
  { "en": "week", "zh": "星期", "emoji": "📆", "type": "word" },
  { "en": "month", "zh": "月", "emoji": "🗓️", "type": "word" },
  { "en": "year", "zh": "年", "emoji": "🎊", "type": "word" },
  { "en": "day", "zh": "天", "emoji": "☀️", "type": "word" },
  { "en": "hour", "zh": "小时", "emoji": "⏰", "type": "word" },
  { "en": "minute", "zh": "分钟", "emoji": "⏱️", "type": "word" },
  { "en": "o'clock", "zh": "点钟", "emoji": "🕐", "type": "word" },
  { "en": "half", "zh": "半", "emoji": "⏰", "type": "word" },

  // ── 环境 ──
  { "en": "environment", "zh": "环境", "emoji": "🌍", "type": "word" },
  { "en": "pollution", "zh": "污染", "emoji": "🏭", "type": "word" },
  { "en": "protect", "zh": "保护", "emoji": "🛡️", "type": "word" },
  { "en": "recycle", "zh": "回收", "emoji": "♻️", "type": "word" },
  { "en": "planet", "zh": "星球", "emoji": "🌍", "type": "word" },
  { "en": "ocean", "zh": "海洋", "emoji": "🌊", "type": "word" },
  { "en": "desert", "zh": "沙漠", "emoji": "🏜️", "type": "word" },
  { "en": "jungle", "zh": "丛林", "emoji": "🌴", "type": "word" },
  { "en": "field", "zh": "田野", "emoji": "🌾", "type": "word" },
  { "en": "farm", "zh": "农场", "emoji": "🚜", "type": "word" },

  // ── 职业（补充）──
  { "en": "engineer", "zh": "工程师", "emoji": "👷", "type": "word" },
  { "en": "artist", "zh": "艺术家", "emoji": "🎨", "type": "word" },
  { "en": "writer", "zh": "作家", "emoji": "✍️", "type": "word" },
  { "en": "athlete", "zh": "运动员", "emoji": "🏅", "type": "word" },
  { "en": "actor", "zh": "演员", "emoji": "🎭", "type": "word" },
  { "en": "musician", "zh": "音乐家", "emoji": "🎸", "type": "word" },
  { "en": "sailor", "zh": "水手", "emoji": "⚓", "type": "word" },
  { "en": "soldier", "zh": "士兵", "emoji": "💂", "type": "word" },

  // ── 食物（补充）──
  { "en": "breakfast", "zh": "早饭", "emoji": "🍳", "type": "word" },
  { "en": "lunch", "zh": "午饭", "emoji": "🥗", "type": "word" },
  { "en": "dinner", "zh": "晚饭", "emoji": "🍴", "type": "word" },
  { "en": "meal", "zh": "一餐", "emoji": "🍽️", "type": "word" },
  { "en": "meat", "zh": "肉", "emoji": "🥩", "type": "word" },
  { "en": "vegetable", "zh": "蔬菜", "emoji": "🥦", "type": "word" },
  { "en": "fruit", "zh": "水果", "emoji": "🍎", "type": "word" },
  { "en": "snack", "zh": "零食", "emoji": "🍿", "type": "word" },
  { "en": "salt", "zh": "盐", "emoji": "🧂", "type": "word" },
  { "en": "sugar", "zh": "糖", "emoji": "🍬", "type": "word" },
  { "en": "butter", "zh": "黄油", "emoji": "🧈", "type": "word" },
  { "en": "coffee", "zh": "咖啡", "emoji": "☕", "type": "word" },
  { "en": "soda", "zh": "汽水", "emoji": "🥤", "type": "word" },
  { "en": "delicious", "zh": "美味的", "emoji": "😋", "type": "word" },
  { "en": "taste", "zh": "味道", "emoji": "😋", "type": "word" },

  // ── 房间家具 ──
  { "en": "bedroom", "zh": "卧室", "emoji": "🛏️", "type": "word" },
  { "en": "bathroom", "zh": "浴室", "emoji": "🚿", "type": "word" },
  { "en": "kitchen", "zh": "厨房", "emoji": "🍳", "type": "word" },
  { "en": "living room", "zh": "客厅", "emoji": "🛋️", "type": "word" },
  { "en": "dining room", "zh": "餐厅", "emoji": "🍽️", "type": "word" },
  { "en": "pillow", "zh": "枕头", "emoji": "💤", "type": "word" },
  { "en": "blanket", "zh": "毯子", "emoji": "🛏️", "type": "word" },
  { "en": "wardrobe", "zh": "衣柜", "emoji": "👗", "type": "word" },
  { "en": "toilet", "zh": "马桶", "emoji": "🚽", "type": "word" },
  { "en": "sink", "zh": "水槽", "emoji": "🚰", "type": "word" },
  { "en": "stove", "zh": "炉灶", "emoji": "🔥", "type": "word" },
  { "en": "oven", "zh": "烤箱", "emoji": "🥧", "type": "word" },

  // ── 衣物（补充）──
  { "en": "T-shirt", "zh": "T恤", "emoji": "👕", "type": "word" },
  { "en": "pajamas", "zh": "睡衣", "emoji": "😴", "type": "word" },
  { "en": "uniform", "zh": "校服", "emoji": "👔", "type": "word" },
  { "en": "belt", "zh": "腰带", "emoji": "👖", "type": "word" },

  // ── 运动 ──
  { "en": "football", "zh": "足球", "emoji": "⚽", "type": "word" },
  { "en": "volleyball", "zh": "排球", "emoji": "🏐", "type": "word" },
  { "en": "tennis", "zh": "网球", "emoji": "🎾", "type": "word" },
  { "en": "badminton", "zh": "羽毛球", "emoji": "🏸", "type": "word" },
  { "en": "ping-pong", "zh": "乒乓球", "emoji": "🏓", "type": "word" },
  { "en": "hiking", "zh": "远足", "emoji": "🥾", "type": "word" },
  { "en": "camping", "zh": "露营", "emoji": "⛺", "type": "word" },

  // ── 节日（补充）──
  { "en": "Christmas", "zh": "圣诞节", "emoji": "🎄", "type": "word" },
  { "en": "Easter", "zh": "复活节", "emoji": "🐣", "type": "word" },
  { "en": "Halloween", "zh": "万圣节", "emoji": "🎃", "type": "word" },
  { "en": "Dragon Boat Festival", "zh": "端午节", "emoji": "🚣", "type": "word" },
  { "en": "Lantern Festival", "zh": "元宵节", "emoji": "🏮", "type": "word" },
  { "en": "National Day", "zh": "国庆节", "emoji": "🇨🇳", "type": "word" },

  // ── 动物（补充）──
  { "en": "koala", "zh": "考拉", "emoji": "🐨", "type": "word" },
  { "en": "camel", "zh": "骆驼", "emoji": "🐪", "type": "word" },
  { "en": "dinosaur", "zh": "恐龙", "emoji": "🦕", "type": "word" },
  { "en": "dragon", "zh": "龙", "emoji": "🐉", "type": "word" },
  { "en": "pet", "zh": "宠物", "emoji": "🐾", "type": "word" },

  // ── 科技 ──
  { "en": "tablet", "zh": "平板电脑", "emoji": "📱", "type": "word" },
  { "en": "camera", "zh": "相机", "emoji": "📷", "type": "word" },
  { "en": "video", "zh": "视频", "emoji": "🎬", "type": "word" },
  { "en": "internet", "zh": "互联网", "emoji": "🌐", "type": "word" },
  { "en": "game", "zh": "游戏", "emoji": "🎮", "type": "word" },

  // ── 形容词（补充）──
  { "en": "young", "zh": "年轻的", "emoji": "👶", "type": "word" },
  { "en": "beautiful", "zh": "漂亮的", "emoji": "🌸", "type": "word" },
  { "en": "strong", "zh": "强壮的", "emoji": "💪", "type": "word" },
  { "en": "heavy", "zh": "重的", "emoji": "⚖️", "type": "word" },
  { "en": "hard", "zh": "硬的", "emoji": "🪨", "type": "word" },
  { "en": "soft", "zh": "软的", "emoji": "🧸", "type": "word" },
  { "en": "early", "zh": "早的", "emoji": "🌅", "type": "word" },
  { "en": "late", "zh": "迟的", "emoji": "🕰️", "type": "word" },
  { "en": "easy", "zh": "容易的", "emoji": "😊", "type": "word" },
  { "en": "difficult", "zh": "困难的", "emoji": "😓", "type": "word" },
  { "en": "wrong", "zh": "错的", "emoji": "❌", "type": "word" },
  { "en": "same", "zh": "相同的", "emoji": "🟰", "type": "word" },
  { "en": "different", "zh": "不同的", "emoji": "🔄", "type": "word" },
  { "en": "healthy", "zh": "健康的", "emoji": "🥗", "type": "word" },
  { "en": "delicious", "zh": "美味的", "emoji": "😋", "type": "word" },

  // ── 频率副词 ──
  { "en": "always", "zh": "总是", "emoji": "♾️", "type": "word" },
  { "en": "usually", "zh": "通常", "emoji": "🔁", "type": "word" },
  { "en": "often", "zh": "经常", "emoji": "🔄", "type": "word" },
  { "en": "sometimes", "zh": "有时候", "emoji": "🔀", "type": "word" },
  { "en": "never", "zh": "从不", "emoji": "🚫", "type": "word" },
  { "en": "everyday", "zh": "每天", "emoji": "📅", "type": "word" },

];
const PAGE_SIZE = 8;

// ── SYLLABLES (单词音节拆分) ──
const SYLLABLES = {
  "apple": [
    "ap",
    "ple"
  ],
  "banana": [
    "ba",
    "na",
    "na"
  ],
  "orange": [
    "or",
    "ange"
  ],
  "grape": [
    "grape"
  ],
  "pear": [
    "pear"
  ],
  "peach": [
    "peach"
  ],
  "watermelon": [
    "wa",
    "ter",
    "mel",
    "on"
  ],
  "strawberry": [
    "straw",
    "ber",
    "ry"
  ],
  "pineapple": [
    "pine",
    "ap",
    "ple"
  ],
  "mango": [
    "mango"
  ],
  "kiwi": [
    "kiwi"
  ],
  "cherry": [
    "cher",
    "ry"
  ],
  "blueberry": [
    "blue",
    "ber",
    "ry"
  ],
  "lemon": [
    "lem",
    "on"
  ],
  "lychee": [
    "lychee"
  ],
  "pitaya": [
    "pi",
    "taya"
  ],
  "longan": [
    "longan"
  ],
  "grapefruit": [
    "grape",
    "fruit"
  ],
  "avocado": [
    "av",
    "o",
    "ca",
    "do"
  ],
  "pomegranate": [
    "pome",
    "gran",
    "ate"
  ],
  "fish": [
    "fish"
  ],
  "shark": [
    "shark"
  ],
  "dolphin": [
    "dol",
    "phin"
  ],
  "whale": [
    "whale"
  ],
  "turtle": [
    "turtle"
  ],
  "crab": [
    "crab"
  ],
  "lobster": [
    "lobster"
  ],
  "octopus": [
    "oc",
    "to",
    "pus"
  ],
  "starfish": [
    "star",
    "fish"
  ],
  "seahorse": [
    "sea",
    "horse"
  ],
  "jellyfish": [
    "jel",
    "ly",
    "fish"
  ],
  "seal": [
    "seal"
  ],
  "clam": [
    "clam"
  ],
  "tiger": [
    "ti",
    "ger"
  ],
  "lion": [
    "lion"
  ],
  "elephant": [
    "el",
    "e",
    "phant"
  ],
  "monkey": [
    "monkey"
  ],
  "panda": [
    "panda"
  ],
  "bear": [
    "bear"
  ],
  "wolf": [
    "wolf"
  ],
  "zebra": [
    "zebra"
  ],
  "giraffe": [
    "gi",
    "raffe"
  ],
  "deer": [
    "deer"
  ],
  "fox": [
    "fox"
  ],
  "kangaroo": [
    "kan",
    "ga",
    "roo"
  ],
  "snake": [
    "snake"
  ],
  "gorilla": [
    "go",
    "ril",
    "la"
  ],
  "hippo": [
    "hippo"
  ],
  "chicken": [
    "chicken"
  ],
  "rooster": [
    "rooster"
  ],
  "duck": [
    "duck"
  ],
  "goose": [
    "goose"
  ],
  "cow": [
    "cow"
  ],
  "bull": [
    "bull"
  ],
  "pig": [
    "pig"
  ],
  "sheep": [
    "sheep"
  ],
  "goat": [
    "goat"
  ],
  "horse": [
    "horse"
  ],
  "donkey": [
    "donkey"
  ],
  "rabbit": [
    "rabbit"
  ],
  "turkey": [
    "turkey"
  ],
  "dog": [
    "dog"
  ],
  "puppy": [
    "puppy"
  ],
  "cat": [
    "cat"
  ],
  "kitten": [
    "kitten"
  ],
  "hamster": [
    "hamster"
  ],
  "guinea pig": [
    "gui",
    "nea",
    "pig"
  ],
  "parrot": [
    "parrot"
  ],
  "goldfish": [
    "goldfish"
  ],
  "pet turtle": [
    "pet",
    "turtle"
  ],
  "bird": [
    "bird"
  ],
  "mouse": [
    "mouse"
  ],
  "rice": [
    "rice"
  ],
  "noodle": [
    "noodle"
  ],
  "bread": [
    "bread"
  ],
  "steamed bun": [
    "stea",
    "med",
    "bun"
  ],
  "bun": [
    "bun"
  ],
  "dumpling": [
    "dumpling"
  ],
  "porridge": [
    "porridge"
  ],
  "oat": [
    "oat"
  ],
  "pasta": [
    "pasta"
  ],
  "corn": [
    "corn"
  ],
  "potato": [
    "po",
    "tato"
  ],
  "egg": [
    "egg"
  ],
  "pork": [
    "pork"
  ],
  "beef": [
    "beef"
  ],
  "chicken meat": [
    "chicken",
    "meat"
  ],
  "shrimp": [
    "shrimp"
  ],
  "soup": [
    "soup"
  ],
  "cake": [
    "cake"
  ],
  "cookie": [
    "coo",
    "kie"
  ],
  "biscuit": [
    "biscuit"
  ],
  "chocolate": [
    "choc",
    "o",
    "late"
  ],
  "ice cream": [
    "ice",
    "cream"
  ],
  "candy": [
    "candy"
  ],
  "lollipop": [
    "lolli",
    "pop"
  ],
  "jelly": [
    "jelly"
  ],
  "popcorn": [
    "popcorn"
  ],
  "chips": [
    "chips"
  ],
  "nut": [
    "nut"
  ],
  "raisin": [
    "rai",
    "sin"
  ],
  "wafer": [
    "wa",
    "fer"
  ],
  "pudding": [
    "pudding"
  ],
  "water": [
    "wa",
    "ter"
  ],
  "milk": [
    "milk"
  ],
  "juice": [
    "juice"
  ],
  "milk tea": [
    "milk",
    "tea"
  ],
  "tea": [
    "tea"
  ],
  "honey water": [
    "ho",
    "ney",
    "wa",
    "ter"
  ],
  "yogurt": [
    "yo",
    "gurt"
  ],
  "hamburger": [
    "ham",
    "bur",
    "ger"
  ],
  "hot dog": [
    "hot",
    "dog"
  ],
  "fries": [
    "fries"
  ],
  "pizza": [
    "pizza"
  ],
  "tomato": [
    "to",
    "mato"
  ],
  "cabbage": [
    "cabbage"
  ],
  "carrot": [
    "carrot"
  ],
  "cucumber": [
    "cu",
    "cum",
    "ber"
  ],
  "onion": [
    "o",
    "nion"
  ],
  "garlic": [
    "garlic"
  ],
  "spinach": [
    "spi",
    "nach"
  ],
  "broccoli": [
    "broc",
    "co",
    "li"
  ],
  "cauliflower": [
    "cau",
    "li",
    "flow",
    "er"
  ],
  "eggplant": [
    "eggplant"
  ],
  "mushroom": [
    "mush",
    "room"
  ],
  "green bean": [
    "green",
    "bean"
  ],
  "celery": [
    "ce",
    "lery"
  ],
  "coat": [
    "coat"
  ],
  "jacket": [
    "jacket"
  ],
  "shirt": [
    "shirt"
  ],
  "blouse": [
    "blouse"
  ],
  "skirt": [
    "skirt"
  ],
  "dress": [
    "dress"
  ],
  "pants": [
    "pants"
  ],
  "shorts": [
    "shorts"
  ],
  "jeans": [
    "jeans"
  ],
  "sock": [
    "sock"
  ],
  "shoe": [
    "shoe"
  ],
  "sneaker": [
    "snea",
    "ker"
  ],
  "boot": [
    "boot"
  ],
  "hat": [
    "hat"
  ],
  "cap": [
    "cap"
  ],
  "scarf": [
    "scarf"
  ],
  "gloves": [
    "glo",
    "ves"
  ],
  "sweater": [
    "swea",
    "ter"
  ],
  "cardigan": [
    "cardi",
    "gan"
  ],
  "underwear": [
    "underwear"
  ],
  "vest": [
    "vest"
  ],
  "swimsuit": [
    "swimsuit"
  ],
  "pencil": [
    "pencil"
  ],
  "pencil box": [
    "pencil",
    "box"
  ],
  "eraser": [
    "e",
    "ra",
    "ser"
  ],
  "ruler": [
    "ru",
    "ler"
  ],
  "pen": [
    "pen"
  ],
  "crayon": [
    "crayon"
  ],
  "marker": [
    "marker"
  ],
  "bag": [
    "bag"
  ],
  "book": [
    "book"
  ],
  "notebook": [
    "no",
    "te",
    "book"
  ],
  "desk": [
    "desk"
  ],
  "chair": [
    "chair"
  ],
  "glue": [
    "glue"
  ],
  "scissors": [
    "scissors"
  ],
  "paper": [
    "pa",
    "per"
  ],
  "sharpener": [
    "sharpe",
    "ner"
  ],
  "whiteboard": [
    "whi",
    "te",
    "board"
  ],
  "blackboard": [
    "blackboard"
  ],
  "toy car": [
    "toy",
    "car"
  ],
  "ball": [
    "ball"
  ],
  "block": [
    "block"
  ],
  "kite": [
    "kite"
  ],
  "yo-yo": [
    "yo",
    "-yo"
  ],
  "robot": [
    "ro",
    "bot"
  ],
  "train toy": [
    "train",
    "toy"
  ],
  "doll": [
    "doll"
  ],
  "teddy bear": [
    "teddy",
    "bear"
  ],
  "stuffed animal": [
    "stuffed",
    "a",
    "ni",
    "mal"
  ],
  "puzzle": [
    "puzzle"
  ],
  "rattle": [
    "rattle"
  ],
  "bike": [
    "bike"
  ],
  "car": [
    "car"
  ],
  "bus": [
    "bus"
  ],
  "train": [
    "train"
  ],
  "plane": [
    "plane"
  ],
  "ship": [
    "ship"
  ],
  "boat": [
    "boat"
  ],
  "subway": [
    "subway"
  ],
  "truck": [
    "truck"
  ],
  "motorcycle": [
    "mo",
    "tor",
    "cy",
    "cle"
  ],
  "helicopter": [
    "hel",
    "i",
    "cop",
    "ter"
  ],
  "home": [
    "home"
  ],
  "school": [
    "school"
  ],
  "park": [
    "park"
  ],
  "zoo": [
    "zoo"
  ],
  "hospital": [
    "hos",
    "pi",
    "tal"
  ],
  "supermarket": [
    "su",
    "per",
    "mar",
    "ket"
  ],
  "restaurant": [
    "res",
    "tau",
    "rant"
  ],
  "library": [
    "library"
  ],
  "playground": [
    "play",
    "ground"
  ],
  "garden": [
    "garden"
  ],
  "shop": [
    "shop"
  ],
  "cinema": [
    "ci",
    "nema"
  ],
  "teacher": [
    "teacher"
  ],
  "doctor": [
    "doctor"
  ],
  "nurse": [
    "nurse"
  ],
  "driver": [
    "dri",
    "ver"
  ],
  "cook": [
    "cook"
  ],
  "fireman": [
    "fi",
    "re",
    "man"
  ],
  "policeman": [
    "po",
    "li",
    "ce",
    "man"
  ],
  "farmer": [
    "farmer"
  ],
  "worker": [
    "worker"
  ],
  "singer": [
    "singer"
  ],
  "dancer": [
    "dancer"
  ],
  "astronaut": [
    "as",
    "tro",
    "naut"
  ],
  "in": [
    "in"
  ],
  "on": [
    "on"
  ],
  "under": [
    "under"
  ],
  "beside": [
    "be",
    "side"
  ],
  "next to": [
    "next",
    "to"
  ],
  "behind": [
    "be",
    "hind"
  ],
  "in front of": [
    "in",
    "front",
    "of"
  ],
  "between": [
    "between"
  ],
  "near": [
    "near"
  ],
  "far": [
    "far"
  ],
  "inside": [
    "inside"
  ],
  "outside": [
    "outside"
  ],
  "up": [
    "up"
  ],
  "down": [
    "down"
  ],
  "happy": [
    "happy"
  ],
  "sad": [
    "sad"
  ],
  "angry": [
    "angry"
  ],
  "scared": [
    "sca",
    "red"
  ],
  "tired": [
    "ti",
    "red"
  ],
  "excited": [
    "exci",
    "ted"
  ],
  "shy": [
    "shy"
  ],
  "surprised": [
    "surpri",
    "sed"
  ],
  "bored": [
    "bo",
    "red"
  ],
  "calm": [
    "calm"
  ],
  "proud": [
    "proud"
  ],
  "upset": [
    "upset"
  ],
  "sleepy": [
    "sleepy"
  ],
  "red": [
    "red"
  ],
  "yellow": [
    "yellow"
  ],
  "blue": [
    "blue"
  ],
  "green": [
    "green"
  ],
  "purple": [
    "purple"
  ],
  "pink": [
    "pink"
  ],
  "black": [
    "black"
  ],
  "white": [
    "white"
  ],
  "grey": [
    "grey"
  ],
  "brown": [
    "brown"
  ],
  "gold": [
    "gold"
  ],
  "silver": [
    "silver"
  ],
  "butterfly": [
    "butterfly"
  ],
  "bee": [
    "bee"
  ],
  "ant": [
    "ant"
  ],
  "ladybug": [
    "la",
    "dy",
    "bug"
  ],
  "dragonfly": [
    "drag",
    "on",
    "fly"
  ],
  "mosquito": [
    "mosquito"
  ],
  "fly": [
    "fly"
  ],
  "caterpillar": [
    "ca",
    "terpillar"
  ],
  "grasshopper": [
    "grasshopper"
  ],
  "beetle": [
    "beetle"
  ],
  "cricket": [
    "cricket"
  ],
  "firefly": [
    "fi",
    "refly"
  ],
  "eye": [
    "eye"
  ],
  "ear": [
    "ear"
  ],
  "nose": [
    "nose"
  ],
  "mouth": [
    "mouth"
  ],
  "tongue": [
    "tongue"
  ],
  "eyebrow": [
    "eyebrow"
  ],
  "eyelash": [
    "eye",
    "lash"
  ],
  "cheek": [
    "cheek"
  ],
  "chin": [
    "chin"
  ],
  "lip": [
    "lip"
  ],
  "forehead": [
    "fo",
    "re",
    "head"
  ],
  "shoulder": [
    "shoulder"
  ],
  "arm": [
    "arm"
  ],
  "hand": [
    "hand"
  ],
  "finger": [
    "finger"
  ],
  "leg": [
    "leg"
  ],
  "toe": [
    "toe"
  ],
  "neck": [
    "neck"
  ],
  "back": [
    "back"
  ],
  "chest": [
    "chest"
  ],
  "knee": [
    "knee"
  ],
  "elbow": [
    "elbow"
  ],
  "sunny": [
    "sunny"
  ],
  "rainy": [
    "rainy"
  ],
  "cloudy": [
    "cloudy"
  ],
  "windy": [
    "windy"
  ],
  "snowy": [
    "snowy"
  ],
  "foggy": [
    "foggy"
  ],
  "hot": [
    "hot"
  ],
  "cold": [
    "cold"
  ],
  "warm": [
    "warm"
  ],
  "cool": [
    "cool"
  ],
  "stormy": [
    "stormy"
  ],
  "icy": [
    "icy"
  ],
  "Monday": [
    "monday"
  ],
  "Tuesday": [
    "tuesday"
  ],
  "Wednesday": [
    "wednesday"
  ],
  "Thursday": [
    "thursday"
  ],
  "Friday": [
    "fri",
    "day"
  ],
  "Saturday": [
    "sa",
    "turday"
  ],
  "Sunday": [
    "sunday"
  ],
  "January": [
    "ja",
    "nuary"
  ],
  "February": [
    "february"
  ],
  "March": [
    "march"
  ],
  "April": [
    "april"
  ],
  "May": [
    "may"
  ],
  "June": [
    "june"
  ],
  "July": [
    "july"
  ],
  "August": [
    "au",
    "gust"
  ],
  "September": [
    "september"
  ],
  "October": [
    "octo",
    "ber"
  ],
  "November": [
    "no",
    "vember"
  ],
  "December": [
    "de",
    "cember"
  ],
  "house": [
    "house"
  ],
  "door": [
    "door"
  ],
  "window": [
    "window"
  ],
  "wall": [
    "wall"
  ],
  "floor": [
    "floor"
  ],
  "ceiling": [
    "cei",
    "ling"
  ],
  "table": [
    "table"
  ],
  "bed": [
    "bed"
  ],
  "sofa": [
    "sofa"
  ],
  "lamp": [
    "lamp"
  ],
  "clock": [
    "clock"
  ],
  "mirror": [
    "mirror"
  ],
  "curtain": [
    "curtain"
  ],
  "cupboard": [
    "cupboard"
  ],
  "box": [
    "box"
  ],
  "zero": [
    "zero"
  ],
  "one": [
    "one"
  ],
  "two": [
    "two"
  ],
  "three": [
    "three"
  ],
  "four": [
    "four"
  ],
  "five": [
    "five"
  ],
  "six": [
    "six"
  ],
  "seven": [
    "se",
    "ven"
  ],
  "eight": [
    "eight"
  ],
  "nine": [
    "nine"
  ],
  "ten": [
    "ten"
  ],
  "eleven": [
    "e",
    "le",
    "ven"
  ],
  "twelve": [
    "twelve"
  ],
  "thirteen": [
    "thirteen"
  ],
  "fourteen": [
    "fourteen"
  ],
  "fifteen": [
    "fifteen"
  ],
  "sixteen": [
    "sixteen"
  ],
  "seventeen": [
    "se",
    "venteen"
  ],
  "eighteen": [
    "eighteen"
  ],
  "nineteen": [
    "ni",
    "ne",
    "teen"
  ],
  "twenty": [
    "twenty"
  ],
  "thirty": [
    "thirty"
  ],
  "forty": [
    "forty"
  ],
  "fifty": [
    "fifty"
  ],
  "sixty": [
    "sixty"
  ],
  "seventy": [
    "se",
    "venty"
  ],
  "eighty": [
    "eighty"
  ],
  "ninety": [
    "ni",
    "nety"
  ],
  "one hundred": [
    "one",
    "hundred"
  ]
};

// ── MATH_RHYMES (数学口诀) ──
const MATH_RHYMES = [
  { title:'🎵 凑十歌', lines:[
    '一九一九好朋友，',
    '二八二八手拉手，',
    '三七三七真亲密，',
    '四六四六一起走，',
    '五五凑成一双手。',
  ]},
  { title:'🎵 加法口诀', lines:[
    '一加一，得二分，',
    '二加二，变成四，',
    '三加三，六只脚，',
    '四加四，八条腿，',
    '五加五，十个手指头。',
  ]},
  { title:'🎵 减法口诀', lines:[
    '十减一，剩下九，',
    '十减二，剩下八，',
    '十减三，剩下七，',
    '十减四，剩下六，',
    '十减五，还剩五。',
  ]},
  { title:'🎵 加减一起学', lines:[
    '1+1=2，2-1=1，',
    '1+2=3，2+1=3，',
    '3-1=2，3-2=1，',
    '1+3=4，2+2=4，3+1=4，',
    '4-1=3，4-2=2，4-3=1，',
    '1+4=5，2+3=5，3+2=5，4+1=5，',
    '5-1=4，5-2=3，5-3=2，5-4=1，',
    '1+5=6，2+4=6，3+3=6，4+2=6，5+1=6，',
    '6-1=5，6-2=4，6-3=3，6-4=2，6-5=1，',
    '1+6=7，2+5=7，3+4=7，4+3=7，5+2=7，6+1=7，',
    '7-1=6，7-2=5，7-3=4，7-4=3，7-5=2，7-6=1，',
    '1+7=8，2+6=8，3+5=8，4+4=8，5+3=8，6+2=8，7+1=8，',
    '8-1=7，8-2=6，8-3=5，8-4=4，8-5=3，8-6=2，8-7=1，',
    '1+8=9，2+7=9，3+6=9，4+5=9，5+4=9，6+3=9，7+2=9，8+1=9，',
    '9-1=8，9-2=7，9-3=6，9-4=5，9-5=4，9-6=3，9-7=2，9-8=1，',
    '1+9=10，2+8=10，3+7=10，4+6=10，5+5=10，',
    '10-1=9，10-2=8，10-3=7，10-4=6，10-5=5，',
    '10-6=4，10-7=3，10-8=2，10-9=1，',
    '加减一起学，算术真有趣！',
  ]},
  { title:'🎵 减法顺口溜', lines:[
    '2-1=1，',
    '3-1=2，3-2=1，',
    '4-1=3，4-2=2，4-3=1，',
    '5-1=4，5-2=3，5-3=2，5-4=1，',
    '6-1=5，6-2=4，6-3=3，6-4=2，6-5=1，',
    '7-1=6，7-2=5，7-3=4，7-4=3，7-5=2，7-6=1，',
    '8-1=7，8-2=6，8-3=5，8-4=4，8-5=3，8-6=2，8-7=1，',
    '9-1=8，9-2=7，9-3=6，9-4=5，9-5=4，9-6=3，9-7=2，9-8=1，',
    '10-1=9，10-2=8，10-3=7，10-4=6，10-5=5，',
    '10-6=4，10-7=3，10-8=2，10-9=1，',
    '减法学会了，真棒！',
  ]},

// ── TIMES_COLORS (乘法表颜色) ──

];
const TIMES_COLORS = [
  {bg:'#FFF0E8',border:'#FFA060',text:'#B04000'},
  {bg:'#FFF8E0',border:'#FFD700',text:'#806000'},
  {bg:'#FFFDE0',border:'#FFE040',text:'#606000'},
  {bg:'#EDFFF0',border:'#60C870',text:'#006020'},
  {bg:'#E8F8FF',border:'#60C0F0',text:'#004070'},
  {bg:'#E8F0FF',border:'#7090F0',text:'#202090'},
  {bg:'#F0E8FF',border:'#B080FF',text:'#500090'},
  {bg:'#FFE8F4',border:'#FF80B8',text:'#800050'},
  {bg:'#FFE8E8',border:'#FF8080',text:'#900020'},
];

// Hanzi category keys for the original 3-category view

