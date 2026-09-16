---
title: 旧物来信（Assemble）
summary: 治愈系物品修理游戏：经营街角修理铺，检查、拆卸、修复承载回忆的旧物，在零件之间读懂物主没有说出口的故事。
description: 三章 3D 网页版（旧怀表/旧相机/音乐盒）：修理规则仿真与 Three.js 渲染分离、版本化存档与损坏恢复、Playwright 桌面/移动/真实画布 e2e 测试。
pubDate: 2026-09-16
status: playable
featured: false
tags:
  - 治愈
  - 解谜
  - 叙事
  - 3D
  - 网页游戏
engine: Vite + Three.js + TypeScript
platforms:
  - 浏览器
  - 桌面
  - 手机
aiTools:
  - Codex
thumbnail: /images/games/assemble-cover.svg
screenshots:
  - src: /images/games/assemble-shot-1.jpg
    title: 顾客来信：每一件旧物，都从一封信开始
    note: 读信即读人——物主的关系与遗憾藏在措辞里，修好物品就是回应这封信。
  - src: /images/games/assemble-shot-2.jpg
    title: 修理台：阶段化的拆解与修复
    note: 怀表关 8 个修理阶段，相机与音乐盒各 11 个阶段，工具与零件依赖各不相同。
playableWeb: true
embedUrl: /play/assemble/index.html
repoUrl: https://github.com/HongyiLU/Assemble
role: 玩法与叙事设计 / 关卡阶段设计 / 验收标准制定
teamSize: 单人（AI 全程实现）
coreLoop:
  - label: 来信
    summary: 收到顾客的委托信，信的措辞暗示物品背后的关系与遗憾。
  - label: 检查
    summary: 在修理台上观察损坏物品，旋转查看，找到故障位置。
  - label: 修复
    summary: 清洁、调整、替换零件——工具与零件有依赖顺序，不能蛮干。
  - label: 重组装
    summary: 把零件按正确顺序装回去，恢复物品的功能。
  - label: 解锁回忆
    summary: 功能测试通过后物品重新运转，解锁物主没有说出口的故事，返回修理铺等下一封信。
loopPunchline: 修好一件旧物，就是替物主把没说出口的话说完。
aiWorkflow:
  - label: 产品文档先行
    summary: 先写产品开发计划：玩家价值、成功信号（80% 试玩者无指导完成教学关）、范围冻结三关垂直切片，Codex 对着文档实现。
  - label: 规则与表现分离
    summary: 修理规则仿真（repairMachine）不依赖 Three.js——纯规则跑单元测试，渲染层可整体替换，GLB 资产未来可逐步接入而不改关卡状态机。
  - label: 三关垂直切片
    summary: 怀表 8 阶段、相机与音乐盒各 11 阶段，零件、工具依赖和维修顺序各不相同；用稳定节点名做资产接口。
  - label: e2e + 单元测试
    summary: Playwright 跑桌面/移动/真实画布操作流程，单元测试覆盖修理规则与存档容错（含损坏存档恢复）。
workflowNote: 由 Codex 全程实现；叙事主题、关卡阶段、验收标准由我制定。
challenge: 用 5–8 分钟的一段修理体验讲完一段人物关系——修复操作要足够简单（鼠标或单指），情感表达要藏在物品细节里而不是长篇对白里。
contribution:
  - 治愈系定位与"以修复推进叙事"的核心体验设计
  - 三关的阶段化拆解：每章 8–11 个修理阶段，工具与零件依赖顺序设计
  - 仿真与渲染分离的架构约束（规则可单测、资产可替换）
  - 成功信号定义：30 秒内理解首次有效操作、无不可恢复卡死
outcome: MVP-01 三章 3D 网页版可玩：三章合计 30 个修理阶段，修理规则与存档容错有单元测试，桌面与移动浏览器端到端流程有 e2e 覆盖。
nextStep:
  - 增加顾客与物主故事文本，把三章叙事补完整
  - 程序化模型替换为 GLB 资产，提升观感
  - 音乐盒章节音效与收尾情绪打磨
milestones:
  - date: 2026-09-15
    title: 产品计划基线 v0.5 冻结
    summary: 怀表流程与 Three.js 路线冻结，三关垂直切片范围确定，明确"参考体验、原创内容"的边界。
  - date: 2026-09-16
    title: MVP-01 三章可玩版
    summary: 三章 3D 网页版（旧怀表/旧相机/音乐盒）端到端可玩，单元测试与 e2e 覆盖修理规则、存档容错与真实画布操作。
---

参考《Assemble with Care》的高层体验（以修复物品推进人物关系），但角色、剧情、物品结构与谜题全部原创。

修复操作刻意做得简单：鼠标或单指触控即可完成，复杂度留给"顺序与依赖"——什么先修什么后修，是每关真正的谜题。
