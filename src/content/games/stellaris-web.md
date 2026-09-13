---
title: Stellaris Web
summary: 网页版 3D 星系争夺游戏：占领星系部署算力矩阵，挂机持续产出算力，再用它造舰扩张或对抗 AI 帝国——变现与变强争夺同一份资源的 RTS-lite。
description: 单机 MVP（Phase 1）：确定性星系生成、真实时间舰队航行、算力产出引擎、AI 帝国对抗、劫掠与排行榜，47 个单元测试覆盖仿真层。
pubDate: 2026-09-12
status: playable
featured: true
tags:
  - 策略
  - RTS-lite
  - 3D
  - 网页游戏
engine: Vite + React + Three.js + TypeScript
platforms:
  - 浏览器
  - 桌面
aiTools:
  - Claude Code
thumbnail: /images/games/stellaris-web-cover.svg
screenshots:
  - src: /images/games/stellaris-web-shot-1.svg
    title: 3D 银河视图：恒星光谱着色、航道网络与领土范围
    note: 银河 ↔ 星系两级缩放，旋臂星系按种子确定性生成。
  - src: /images/games/stellaris-web-shot-2.svg
    title: 星系面板：占领之后的核心决策点
    note: 部署/升级算力矩阵、出征劫掠、侦察守军都在这里完成。
playableWeb: true
embedUrl: /games/stellaris-web/index.html
repoUrl: https://github.com/HongyiLU/stellaris-web
role: 玩法与系统设计 / 数值与经济设计 / 验收标准制定
teamSize: 单人（AI 全程实现）
coreLoop:
  - label: 探索
    summary: 派舰队沿航道扫描周边中立星系，真实航行时间制造决策窗口。
  - label: 占领
    summary: 攻打中立星系（vs NPC 守军自动战斗），胜者拿下一颗"会下金蛋"的资产。
  - label: 部署
    summary: 在占领星系建算力矩阵，等级决定产出倍率——星系从此按小时持续产出算力。
  - label: 收取
    summary: 上线一键收取积累的算力（离线累计上限 8 小时），未收取的池子可能被敌人劫掠。
  - label: 再投入
    summary: 算力三选一：造更多更强的舰、升级已有矩阵、或铸造 NFT 凭证——扩张与精耕的取舍从这里开始。
  - label: 对抗
    summary: 与 AI 帝国边界相接后进入冲突循环：侦察 → 针对性造舰 → 攻打，战果三选一（占领 / 劫掠算力 / 摧毁矩阵）。
loopPunchline: 每一颗星系都是持续产出的资产，所以每一次争夺都有真实的收益计算。
aiWorkflow:
  - label: 设计文档先行
    summary: 先写核心循环设计（CORE_GAME_LOOPS）和工程计划（DEVELOPMENT_PLAN），把"好玩的标准"变成可验收的文档，再让 AI 对着文档实现。
  - label: 仿真层与表现层分离
    summary: 要求 AI 先搭纯 TypeScript 仿真层：零环境依赖、确定性、可序列化、命令模式——这份架构约束让 47 个单元测试成为可能。
  - label: 分里程碑推进
    summary: M0 银河舞台 → M1 占领与算力产出 → M2 AI 帝国对抗 → M3 收口，每个里程碑都要求"实机可玩"而不是"代码写完"。
  - label: 单元测试 + 验收走查
    summary: AI 写仿真层测试（同种子逐字节一致、战斗三路径、产出幂等等），我按验收清单在浏览器里实机走查 MVP 循环的每一步。
workflowNote: 全程由 Claude Code 实现；设计判断、验收标准与"无收益自测"（把经济拿掉循环是否依然成立）由我完成。
challenge: 在单机 MVP 里验证"占领-产出-对抗"这条核心循环是否成立，同时把算力经济的风险护栏（离线上限、维护成本、双出口）直接做进系统。
contribution:
  - 核心循环与双货币经济模型设计（算力必须有游戏内消耗与变现双出口）
  - 冲突循环的收益计算设计：占领 / 劫掠 / 摧毁三选一战果，让攻击不占领也有收益
  - 离线保护与劫掠风险的对抗设计：护盾时间对冲"纯挂机"策略
  - MVP 范围裁剪与验收标准制定（陌生玩家 30 分钟内看懂算力是核心资产）
outcome: Phase 1 单机 MVP 验收通过：完整 MVP 循环可玩，AI 帝国会扩张、会攻击玩家、会被劫掠；47 个单元测试覆盖仿真层，帧间隔 3–9ms。
nextStep:
  - Phase 2：真人在线对抗接入（循环形状不变，对手从 AI 换成真人）
  - 补充真实玩法录屏与截图，替换当前占位图
milestones:
  - date: 2026-09-10
    title: 设计方向定为"持久化对抗 + 算力经济"
    summary: 核心循环 v0.2 重写：时间成为收益来源，领土成为会下金蛋的资产，对抗从后期内容变成核心玩法。
  - date: 2026-09-11
    title: M0–M1 落地：银河舞台与算力产出
    summary: 确定性星系生成、航道网络、两级缩放相机、占领与矩阵建造、惰性求值的产出引擎（含 8h 离线上限）全部通过测试。
  - date: 2026-09-12
    title: M2–M3 收口：AI 帝国与完整验收
    summary: AI 帝国同规则扩张与进攻、劫掠未收取算力、排行榜、难度分级、胜负条件、NFT 本地记账；47 个单元测试 + 实机验收走查通过。
---

设计上最有意思的三个判断：

1. **算力必须有双出口**——如果算力唯一去向是变现，游戏会退化成纯 ROI 计算器。"提现还是投入军备"这个选择本身就是玩法。
2. **劫掠机制对冲挂机**——未收取的算力可能被抢走，逼迫玩家做在线决策，"不上线"永远不是最优策略。
3. **底线原则**——把 NFT 收益全部拿掉，L1/L2 循环必须依然好玩。每次版本迭代都用这条自测。

> 设计文档：`CORE_GAME_LOOPS.md`（核心循环 v0.2）、`DEVELOPMENT_PLAN.md`（工程计划 v0.3）、`ACCEPTANCE.md`（Phase 1 验收记录）。
