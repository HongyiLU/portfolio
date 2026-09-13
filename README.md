# Adam 的游戏策划 Demo 作品集

卢竑邑（Adam）的游戏策划作品集静态站点：每款游戏一个陈列页，展示三件事——

1. **核心循环**：图形化步骤条，讲清楚玩家的闭环
2. **截图集**：真实运行画面
3. **AI 开发工作流**：从设计输入到可玩版本的制作路径（Claude Code / Codex）

结构基于 [ciallo-bill/blog](https://github.com/ciallo-bill/blog)（Apache-2.0）改造，技术栈为 Astro 5 + TypeScript 纯静态。

## 快速开始

```bash
npm install
npm run dev
```

打开 `http://localhost:4321` 即可预览。

## 如何添加一款游戏

1. 复制 `docs/game-entry-template.md` 到 `src/content/games/`，重命名为你的游戏 slug（文件名即 URL）。
2. 填写 frontmatter，重点字段：
   - `coreLoop`：核心循环步骤（`label` + `summary`），页面会渲染成编号步骤条
   - `aiWorkflow`：AI 开发工作流步骤，可给每步配 `image`（提示词截图、流程图）
   - `screenshots`：截图集，图片放 `public/images/games/`，推荐 webp、单张 < 500KB
   - `aiTools`：使用的 AI 工具（Claude Code / Codex）
   - `playableWeb` + `embedUrl`：游戏本体开 GitHub Pages 后填入，页面会出现内嵌试玩
3. 提交即可，页面自动生成。

## 部署

- **Vercel / Cloudflare Pages**：框架选 Astro，构建命令 `npm run build`，输出目录 `dist`
- 部署域名通过环境变量 `SITE_URL` 注入（用于 canonical / sitemap / RSS）
- 需要子路径部署时设置 `BASE_PATH`（例如 GitHub Pages 项目页）

## 校验

```bash
npm run verify
```

构建 + 链接审计：检查 `dist` 中所有内部链接指向真实存在的文件，防止上线 404。
不要挂占位试玩链接——`playableWeb: true` 的前提是 `embedUrl` 真的能玩。

## 目录速览

```
src/content/games/*.md    每款游戏一个 Markdown（数据即内容），当前收录 Stellaris Web
src/components/           CoreLoop / AiWorkflow / GameEmbed 等页面模块
src/pages/games/[slug].   游戏陈列页模板
public/images/games/      截图、封面、工作流配图（注意：游戏本体在 public/play/，避免与陈列页路由冲突）
public/play/<slug>/       内嵌试玩的游戏本体（如 stellaris-web，Vite build 后复制进来）
docs/                     新增游戏的数据模板
```
