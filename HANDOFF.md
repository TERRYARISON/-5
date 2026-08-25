# HANDOFF.md — 郑超个人网站项目交接文档

> 写给完全没有上下文的新会话。读完这份文档，你应该能无缝接手这个项目。
> 最后更新：2026-08-26（v9 交付后）

---

## 1. 项目是什么

用户 **郑超（Terry，GitHub: TERRYARISON）** 的个人作品集网站，「赛博朋克 × 樱花」视觉风格。
他是前电台主持人/艺人经纪人/直播运营，现在写小说、做佛牌文化交流（泰瑞堂，非盈利）、做独立开发。

- **GitHub 仓库**：`TERRYARISON/-5`（main 分支）
- **本地共享仓库**：`/mnt/agents/output/app`（OSS 持久化，NON-BARE，master 分支）
- **线上版本卡**：通过 `website_version_manager build_version`（type=static, project_dir=/mnt/agents/output/app）保存，最新 v9 = `2a471e3`，v8 = `47c5539`

## 2. 技术栈

React 19 + TypeScript + Vite 7.2.4 + Tailwind 3.4.19 + react-router-dom 7（**BrowserRouter**，仅在生成单文件预览时临时切 HashRouter）+ GSAP ScrollTrigger + Framer Motion + Lenis。Node 20。

设计系统（**已冻结，只可扩展不可改**）：
- 色板：void #07070D / abyss #0B0B14 / ink #12121E / sakura #F0A6C0 / sakura-deep #D97B9E / neon #7DE8F0 / violet #A78BFA
- 字体：font-serif（Cormorant Garamond）展示、font-sans（Space Grotesk）UI；**中文禁止斜体**
- 工具类：.eyebrow（注意：text-transform:uppercase，Playwright 读到的文本是大写）/ .section-h2 / .hero-h1 / .hero-scrim / .glass-card / .kenburns-*
- Tailwind JIT：**禁止模板拼接类名**，配置数据里的 class 必须写全

## 3. 硬性约束（永远不要违反）

1. **电话号码 15521214032 永不发布**；邮箱 371225659@qq.com 可用于 mailto
2. **不要在共享仓库 /mnt/agents/output/app 里装/链 node_modules 构建**（会产生坏包 "Cannot read properties of null (reading 'useState')"）。永远走 worktree 构建：
   ```bash
   cd /mnt/agents/output/app && rm -f .git/HEAD.lock .git/index.lock
   git worktree prune && git branch -f final-build master
   NODE_MODULES_SRC=/app/.agents/skills/webapp-building-swarm/scripts/template/node_modules \
     bash /app/.agents/skills/swarm-workspace/scripts/setup-local.sh final-build $HOME/app-fbN
   cd $HOME/app-fbN && npm run build
   rm -rf /mnt/agents/output/app/dist && cp -r dist /mnt/agents/output/app/dist
   ```
3. **/tmp 和 /home/kimi 每轮对话间会被清空**——构建+测试必须在单次工具调用链内完成；worktree 丢了就按上面重建
4. **GitHub MCP push_files 只能推文本文件**；图片/视频等二进制由用户手动上传（每次交付时把新增素材打成 zip 给他）
5. 验证归档规则：`/mnt/agents/output/work/verifier/` 下按版本建 vN/ 目录，runs/ 里放带时间戳的运行记录，README.md 是 append-only 索引

## 4. 当前架构（v9 之后）

### 内容层 —— 用户可自主替换一切
所有文字/图片/视频集中在 `src/content/` 的 **8 个配置文件**（每个顶部有中文注释）：

| 文件 | 内容 |
|---|---|
| `home.ts` | 首页全部：HERO（开屏视频+标题）、JOURNEY（镜头旅程）、MANIFESTO、JOURNEY_SHOTS（履历树两侧图）、FEATURED、JOURNAL_PREVIEW、WORLDS_CONTENT、CLOSING |
| `profile.ts` | BIO、TIMELINE、CREDENTIALS、CASES、PORTRAIT_MEDIA（关于/联系页照片） |
| `work.ts` | 作品页全数据（GROUPS/FILTERS/WORK_ITEMS）+ WORK_HERO |
| `journal.ts` | 随笔文章数据 ARTICLES + JOURNAL_MEDIA |
| `novels.ts` / `amulet.ts` / `apps.ts` | 小说（含 NOVELS_HERO）/ 泰瑞堂 / APP 实验室 |
| `site.ts` | 导航、页底环线、社交链接 |

- 配置里 `video: null` = 只显示静态图；旧引用通过垫片兼容（`sections/work/data.ts`、`sections/journal/articles.tsx` 是 re-export 壳）
- 换内容教学在 `内容维护指南.md`（仓库根目录）

### 三语系统
`src/i18n.tsx`：LangProvider + useLang + DICT（zh/en/th），localStorage 键 `zc-lang`，同步 `<html lang>`。**只翻 UI 壳（导航/按钮/标签），长文保持中文**。导航栏桌面+移动顶栏都有中/EN/ไทย切换（移动端 compact 版直接露出，不用开菜单）。

### 导航防迷路
- `src/components/CompassNav.tsx`：每页右下角指南针，含"你在这里"+全站地图+下一站
- **关键修复（v8）**：所有浮层（作品/小说/案例灯箱、文章阅读器）用 `createPortal(..., document.body)`。原因：Layout 的 `motion.main` 有 `relative z-10` 形成层叠上下文，子浮层 z-[80] 也会被 z-50 的 header 盖住导致关闭按钮点不动

### 页面与路由
`/`（Hero→镜头旅程→宣言→履历树 HomeJourney→精选作品→世界入口 Worlds→随笔预告→ClosingCTA）、`/work`、`/novels`、`/amulet`（3D 可拖旋转金币 CoinLogo）、`/app-lab`、`/journal`、`/about`（简介+简历+案例）、`/contact`、404。每页底部有 SectionNav（上一站/下一站环线）。

### 当前素材
开屏视频 `public/hero-main.mp4`（15s 暗街景）+ 封面 `hero-main.jpg`；个人照片 `public/portrait-main.jpg`（1024×1285）。均为 v9 用户上传替换。

## 5. 版本历史

- **v7**（e826b2b）：四大板块（小说/佛牌/APP/关于）+ 内容层 v1 + PRD 修复包 + 环线闭环 + hero 视频模糊修复
- **v8**（170cc9d+aeaba6c）：三语切换 + 首页履历树（中间履历左右案例图）+ 指南针导航 + createPortal 浮层修复
- **v9**（90bd5f6+8082946）：移动端顶栏三语按钮 + 全站内容层化（8 配置文件）+ 新开屏视频与个人照片

## 6. 踩过的坑（别再踩）

1. **git HEAD.lock/index.lock**（OSS 文件系统残留锁）：操作前 `rm -f .git/*.lock`
2. **`pkill -f <pattern>` 会杀掉自己的 shell**（命令行里含同样 pattern），exit -15。要用就先 `ps` 拿 PID 再 kill
3. **vite 构建必须在 worktree**，共享仓库里 symlink node_modules 会产出坏 bundle（见约束 2）
4. **public/ 文件在首轮提交后曾从工作树消失**——commit 后记得 `git status` 复查
5. **git worktree 指向 /home/kimi 的会在会话间被清**；重建前先 `git worktree prune`，blob 丢失用 `git show <branch>:<path>` 找回
6. **Playwright 坑**：`.eyebrow` 的 text-transform:uppercase 让 inner_text 返回大写；`has-text("EN")` 不区分大小写会误中 "MENU"→用 `text-is()`；桌面+移动两套语言按钮共存→选择器加 `:visible`；BrowserRouter 的 dist 用 python http.server 测会 404→**需要 SPA 回退服务器**（/work 等路径回退到 index.html）；灯箱计数器断言会误中 WorkHero 的 "01 / 05"→断言用 `[role="dialog"]` 存在性
7. **单文件预览 HTML 管线**：worktree 里 sed 切 HashRouter → build → 内联 JS/CSS（注意 dist/index.html 引用是 `./assets/` 相对路径）→ JS/CSS 里引用的 public 资源全部 base64 内联 → 桌面版把 meta viewport 改成 `width=1440` → 恢复 BrowserRouter 重新 build dist。产出约 43MB/个
8. **GitHub push 验证**：raw.githubusercontent 有 CDN 传播延迟，md5 比对遇空结果（d41d8cd8...）要等 5 秒重试；curl 加 `--http1.1`；中文路径要 URL 编码；推送内容用 `cat` 读（read_file 的行号前缀会破坏字节一致性）

## 7. 交付物清单（/mnt/agents/output/）

- `郑超-个人网站-手机版预览.html` / `郑超-个人网站-电脑宽屏版预览.html` —— 单文件预览，双击即开（每次改完要重新生成）
- `素材包-v9-新增图片视频.zip` —— 用户手动上传 GitHub 的 3 个新 public/ 文件（hero-main.mp4/jpg、portrait-main.jpg）
- `app/` —— 共享仓库；`work/verifier/` —— 各版本验证归档；`work/plan-v9.md` —— 上一轮计划

## 8. 标准交付流程（每次改完都走一遍）

1. 改代码/内容 → commit 到 master
2. worktree 构建（见约束 2）→ 拷回 dist
3. Playwright 验证（SPA 服务器！）→ 归档到 verifier/vN+1/
4. 重新生成两个单文件预览 HTML（见坑 7）
5. 若有新增二进制素材 → 打 zip 素材包提醒用户手动上传
6. 委派子代理推 GitHub（push_files 分批 + md5 验证）
7. `website_version_manager build_version`（type=static, project_dir=/mnt/agents/output/app）
8. 回复用户：KIMI_REF 链接 + 改了什么的人话总结

## 9. 下一步可能的方向（用户尚未提出，仅备选）

- 用户提过希望"以后自己能像后台一样编辑内容"——目前是文件配置层方案；若要更进一步，可考虑 GitHub 在线编辑器教学或 Decap CMS，但需先问用户
- 正文长文（简介/小说简介）目前仅中文；若用户要求全文三语，需要在 content 层做 zh/en/th 三字段结构，工作量较大
- 照片/视频继续替换是常态需求，流程已在 内容维护指南.md 中写明
