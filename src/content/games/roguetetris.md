---
title: RogueTetris
summary: 构筑类肉鸽俄罗斯方块：把"无限方块"改成波次制，每波之间从随机强化中三选一，让相同的方块玩出截然不同的策略——每一局都不同。
description: Phase 0–3 已完成：标准方块底座（SRS / 7-bag / Ghost / Hold）+ 肉鸽波次框架 + 三选一构筑系统，强化效果以修饰器形式挂进引擎参数。
pubDate: 2026-07-23
status: playable
featured: false
tags:
  - 休闲
  - 肉鸽
  - 构筑
  - 网页游戏
engine: Vite + TypeScript + Canvas 2D
platforms:
  - 浏览器
  - 桌面
aiTools:
  - Claude Code
thumbnail: /images/games/roguetetris-cover.svg
screenshots:
  - src: /images/games/roguetetris-shot-1.png
    title: 局内：棋盘、波次目标与 HUD
    note: 经典方块底座保留了 SRS 旋转、Ghost 落点、Hold 与 Next 队列。
  - src: /images/games/roguetetris-shot-2.png
    title: 波次间的三选一构筑界面
    note: 强化从随机池抽取，效果以修饰器形式叠加到引擎参数上。
playableWeb: true
embedUrl: /play/roguetetris/index.html
repoUrl: https://github.com/HongyiLU/RogueTetris
role: 玩法设计 / 肉鸽节奏设计 / 数值与升级池设计
teamSize: 单人（AI 全程实现）
coreLoop:
  - label: 消行
    summary: 经典方块操作：消行得分、连击加成，这是所有构筑的资源来源。
  - label: 完成波次
    summary: 无限方块被改造成波次制，每波有明确的消行目标，节奏有了锚点。
  - label: 三选一
    summary: 波次之间从随机强化中挑选一项——这是本作的核心决策点。
  - label: Build 成型
    summary: 重型化、炸弹方块、磁吸、连击大师……强化以修饰器叠加，逐渐偏离标准玩法。
  - label: 更难
    summary: 波次推进带来提速与变体；死亡即本局结束，带着这局的构筑重来。
loopPunchline: 相同的方块，因为三选一的选择不同，每一局都是完全不同的游戏。
aiWorkflow:
  - label: 设计文档先行
    summary: 先写开发计划：项目愿景、7 个 Phase 的路线图、目录结构与验证标准，让 AI 对着文档分阶段实现。
  - label: 逻辑与渲染分离
    summary: 要求纯游戏逻辑（棋盘、方块、引擎）不依赖渲染层——棋盘/方块/7-bag/引擎各自独立模块，为肉鸽系统改造留好接缝。
  - label: 标准机制复刻
    summary: Phase 1 不偷工：SRS 旋转系统 + 踢墙表、7-bag 随机器、Ghost、Hold、Lock delay、DAS/ARR 逐一实现，底座先做扎实。
  - label: 肉鸽层改造
    summary: Phase 2–3 把"无限方块"改成波次状态机，强化效果以修饰器挂到引擎参数上，支持叠加与互斥——构筑系统不改底层逻辑。
workflowNote: 全程由 Claude Code 实现；波次节奏、升级池内容与"什么值得选"的数值判断由我完成。
challenge: 在不破坏经典方块手感的前提下引入肉鸽构筑——强化必须能明显改变玩法，但又不能让棋盘变得不可读。
contribution:
  - 肉鸽节奏设计：波次制替代无限方块，每波 N 行目标
  - 升级池内容设计：重型化 / 磁吸 / 炸弹方块 / 连击大师 / 变形等方向
  - 修饰器架构约束：强化作用于引擎参数而非改逻辑，保证叠加与互斥可控
  - 验证标准制定：消行计分、连击、提速、Game Over 全路径实机验收
outcome: Phase 0–3 验收通过：标准方块底座完整可玩，波次三选一与构筑系统接入，同一套引擎参数能跑出完全不同的 Build。
nextStep:
  - Phase 4：经济与商店——消行产币、波次间购买
  - Phase 5：难度递进与变体——障碍行、特殊/异形方块
  - Phase 6：Meta 进度——跨局解锁与 localStorage 持久化
milestones:
  - date: 2026-07-20
    title: Phase 0–1：底座完成
    summary: Vite + TS 脚手架与完整经典俄罗斯方块落地，端到端可玩。
  - date: 2026-07-22
    title: Phase 2–3：肉鸽框架与构筑系统
    summary: 波次制状态机、三选一界面与升级池接入，强化以修饰器形式作用于引擎参数。
  - date: 2026-07-23
    title: 实机验收通过
    summary: 消行计分、连击、提速、三选一、Game Over 全路径验证；构建无类型错误。
---

核心乐趣只有一句话：**每一局都不同**。通过三选一的构筑选择，让相同的方块玩出截然不同的策略——这是把肉鸽结构嫁接到经典玩法上的全部意义。

后续路线：经济与商店（Phase 4）会让"消行"直接产币，商店购买与三选一形成双入口构筑；再往后是难度变体、跨局解锁和打磨。每完成一个阶段，这个陈列页也会同步更新。
