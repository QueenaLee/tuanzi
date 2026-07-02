# 儿童学习应用 (Kids Learning App)

这是一个基于 PWA 技术的儿童英语学习应用，可以安装到 iOS 设备。

## 架构方案

### 问题 1：不数据库和服务器是否可行？
**答案：完全可以实现**

理由：
1. **Service Worker + 离线存储** - 可以使用 Service Worker 缓存所有静态资源，实现离线访问
2. **IndexedDB** - 浏览器内置数据库，可用于存储用户进度、学习记录等数据（约可存储 GB 级数据）
3. **Local File API** - 应用启动时从本地文件读取数据，不依赖网络

方案：
- 启动时：从 IndexedDB 读取用户数据（进度、记录）
- 学习数据：从本地 JSON 文件读取（预打包或从 IndexedDB 读取）
- 所有资源：通过 Service Worker 缓存，实现完全离线使用

### 问题 2：数据文件存储位置与更新方案

**推荐方案：使用 IndexedDB 存储数据**

结构：
```
 kids-learning-app/
├── index.html          # 主页面
├── manifest.json       # PWA 配置
├── sw.js              # Service Worker
├── data.js            # 学习数据（约 5-10MB）
├── user-data.js       # 用户数据（可动态存储）
├── words/             # 分类数据
│   ├── vocabulary.json
│   ├── phonics.json
│   ├── pinyin.json
│   └── hanzi.json
└── assets/            # 图标、字体等
```

**更新方案：**
1. **方案 A - 手动更新（推荐）**：
   - 用户手动删除并重新安装应用
   - 适合数据范围固定的情况

2. **方案 B - IndexedDB 动态加载**：
   - 应用启动时检查是否存在 data.js
   - 如果不存在，提示用户更新
   - 通过 fetch API 从服务器下载（可选）

3. **方案 C - WebAssembly 解析本地文件**：
   - 应用启动时提示用户选择数据文件
   - 使用 WASM 在内存中解析，不保存
   - 实现真正的"零数据"模式

## 当前进度

- [x] 原型设计完成（参考 kids-english-learning.html）
- [x] PWA 基础配置完成（manifest.json）
- [ ] 数据文件生成
- [ ] Service Worker 配置
- [ ] IndexedDB 实现

## 下一步工作

1. 生成完整的 data.js 文件
2. 创建 Service Worker 实现离线缓存
3. 实现 IndexedDB 用户数据管理
4. 创建 iOS 安装描述文件
5. 测试和调试
