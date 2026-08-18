# 赛博朋克樱花个人作品集 · Cyberpunk Sakura Portfolio

郑超 (Zheng Chao) 的个人作品集网站 —— 深色电影感 + 樱花粒子 + 霓虹赛博有机风格。

## 亮点

- **会动的环境人像**：首页与滚动镜头旅程使用无缝循环人像视频（呼吸缩放 + 花瓣飘落 + 霓虹光点）
- **Canvas 樱花雨**：全站 70+ 花瓣粒子，摇摆、旋转、景深
- **GSAP 滚动镜头旅程**：200vh 钉住区段，滚动驱动人像推进 + 文案模糊过渡
- **玻璃拟态卡片**：blur(18px) 磨砂玻璃浮于花瓣之上
- **5 个页面**：Home / Work / Journal / About / Contact

## 技术栈

React 19 · TypeScript · Vite 7 · Tailwind CSS 3.4 · shadcn/ui · GSAP + ScrollTrigger · Lenis · Framer Motion · react-router-dom 7

## 本地运行

```bash
npm install        # 生成 package-lock.json（本仓库未提交 lock 文件）
npm run dev        # 开发
npm run build      # 构建到 dist/
```

## 目录结构

- `src/pages` — 5 个页面入口
- `src/sections` — 各页面的区段组件（Hero / CameraJourney / 作品网格 / 文章阅读器等）
- `src/components` — 共享组件（Navbar / Footer / PetalField / KenBurns / ui 库）
- `docs/design` — 完整设计文档（设计系统 + 每页规格）
- `public` — 图片与人像视频素材

## 素材说明

`public/` 下的图片（29 张）与人像视频（2 段 mp4）体积较大，未随源码一起导入，
需要单独上传（GitHub 网页 → Add file → Upload files，把整个 public 文件夹拖进去即可）。
