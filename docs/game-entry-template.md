---
title: 示例游戏：把这份文件复制成你的第一个作品
summary: 一个演示完整页面结构的示例条目——核心循环、截图集和 AI 开发工作流各长什么样，照着填就能上线。
description: 复制这个文件，重命名为你的游戏 slug，把 frontmatter 和各字段换成你的内容，页面会自动生成。
pubDate: 2026-09-13
status: showcase
featured: true
tags:
  - 示例
  - 休闲
  - 网页游戏
engine: Web / HTML5
platforms:
  - 浏览器
  - 手机
aiTools:
  - Claude Code
  - Codex
thumbnail: /images/games/sample-cover.svg
screenshots:
  - src: /images/games/sample-shot-1.svg
    title: 主界面：玩家第一眼看到的画面
    note: 建议选能同时看清 HUD 和核心玩法的画面。
  - src: /images/games/sample-shot-2.svg
    title: 核心循环的典型时刻
    note: 最好是"正要决策"或"刚刚获得反馈"的瞬间。
  - src: /images/games/sample-shot-3.svg
    title: 系统深度或特殊时刻
    note: 展示循环之外的扩展层，比如成长、连击或 Boss。
playableWeb: false
repoUrl: https://github.com/HongyiLU/your-game
role: 玩法设计 / 数值设计 / AI 工作流搭建
teamSize: 单人
coreLoop:
  - label: 观察
    summary: 玩家看到局面与目标，判断当前最有价值的动作。
  - label: 行动
    summary: 用唯一的输入方式做出操作，游戏立即给出清晰反馈。
  - label: 奖励
    summary: 好的决策被分数、资源或进度放大，形成正向刺激。
  - label: 更难
    summary: 难度曲线推进，把上一轮学到的技巧变成下一轮的默认要求。
loopPunchline: 一条 30 秒的闭环，转 3 圈之后玩家应该能说出"我变强了"。
aiWorkflow:
  - label: 设计输入
    summary: 我把核心循环写成一句话规则 + 一页验收标准（节奏多快、反馈是什么、什么算好玩），这是 AI 的唯一需求来源。
  - label: 提示词迭代
    summary: 让 AI 先输出可玩骨架，再逐轮提修改意见；每轮只改一件事，避免回归混乱。
    image: /images/games/sample-workflow-1.svg
  - label: 试玩验证
    summary: 每个版本自己上手玩 5 分钟，用"第 3 圈是否还想再来一局"来判断方向对不对。
  - label: 收口上架
    summary: 冻结玩法、补 HUD 与引导、导出 Web 版开 GitHub Pages，最后写这个陈列页。
workflowNote: 工具：Claude Code 做主实现，Codex 做交叉检查；所有设计决策由我确认后才合入。
challenge: 在最小的实现成本里验证这条核心循环是否好玩，并把过程沉淀成可展示的页面。
contribution:
  - 核心循环与难度曲线设计
  - 提示词工作流与验收标准制定
  - 每个版本的试玩验证与调优决策
outcome: 示例条目：把这里的文字换成你自己的结论。
nextStep:
  - 换成你的第一个真实游戏
milestones:
  - date: 2026-09-13
    title: 建立作品集骨架
    summary: 确定每个游戏的陈列页结构：核心循环、截图集、AI 开发工作流、试玩入口。
---

这里是正文区（Markdown），可以放一段不放进结构化模块的补充说明；留空则整个正文块不渲染。

## 使用说明

1. 复制 `src/content/games/sample-game.md`，重命名为你的游戏（文件名即 URL）。
2. 逐个字段替换成你的内容；`coreLoop` 和 `aiWorkflow` 是这个站点的特色模块。
3. 截图放进 `public/images/games/`，推荐 webp 格式、单张小于 500KB。
4. 游戏本体若已开 GitHub Pages，把 `embedUrl` 填上并设 `playableWeb: true`，页面会出现内嵌试玩。
