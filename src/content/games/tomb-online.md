---
title: 墓前在线（Cyber Tomb）
summary: 微信社交小游戏：为活着的朋友提前留一块"永不掉线"的赛博纪念地——布置坟墓、邀请好友扫墓，把签到和关心变成一场带黑色幽默的日常仪式。
description: Unity 6000.4 微信小游戏转译 + 云函数服务端：本地双账号分享落地、扫墓互动、双边金币幂等结算；第一周低保真原型可在浏览器直接玩，Unity 切片开发中。
pubDate: 2026-09-16
status: playable
featured: false
tags:
  - 社交
  - 放置
  - 黑色幽默
  - 微信小游戏
engine: Unity 6000.4（微信小游戏转译）+ 微信云函数
platforms:
  - 微信小游戏
  - 浏览器（低保真原型）
aiTools:
  - Codex
thumbnail: /images/games/tomb-online-cover.svg
screenshots:
  - src: /images/games/tomb-online-shot-1.jpg
    title: 低保真原型：我的墓园主界面
    note: 第一周可点击原型——墓园、金币钱包与功能入口的完整信息架构。
  - src: /images/games/tomb-online-shot-2.jpg
    title: 装扮与互动流程
    note: 原型验证"布置 → 邀请 → 扫墓 → 结算"的社交循环手感，再做 Unity 切片。
playableWeb: true
embedUrl: /play/tomb-online/index.html
repoUrl: https://github.com/HongyiLU/tomb-online
role: 玩法与社交系统设计 / 经济系统设计 / 验收标准制定
teamSize: 单人（AI 全程实现）
coreLoop:
  - label: 布置
    summary: 装扮自己的赛博坟墓——墓碑、天气、访客特效与电子遗言，一眼看出"是我的"。
  - label: 邀请
    summary: 通过微信分享把墓园链接发给朋友："我还活着，但你可以先来看看我。"
  - label: 扫墓
    summary: 好友献花、擦碑、上香、留言——低压力的每日问候，不寒暄也能表达关心。
  - label: 结算
    summary: 墓主与访客双边获得金币，服务端幂等处理保证经济安全。
  - label: 经营
    summary: 金币解锁新装扮，收集与展示驱动长期留存。
loopPunchline: 这里记录的不是死亡，而是一个人在互联网上留下的痕迹。
aiWorkflow:
  - label: 策划案先行
    summary: 游戏策划案冻结核心口号与定位（黑色幽默 × 温情、30 秒～3 分钟单局），成功信号与边界写进文档，Codex 对着文档实现。
  - label: 低保真原型验证
    summary: 第一周先做可点击 HTML 原型验证"布置 → 邀请 → 扫墓"的社交循环手感，再进入 Unity 垂直切片。
  - label: 经济安全设计
    summary: 客户端永不提交价格与奖励金额；所有经济写操作带唯一业务引用、由云函数服务端幂等处理——经济系统从第一天就按服务端权威设计。
  - label: 领域测试
    summary: 纯 JavaScript 领域逻辑与 Unity C# Domain 程序集分离，不依赖第三方库的测试覆盖结算规则。
workflowNote: 由 Codex 全程实现；社交互动设计、经济规则与验收标准由我制定。
challenge: 把"扫墓"重新解释为朋友之间的调侃、签到和关心——黑色幽默与温情要同时成立，单局 30 秒～3 分钟的节奏要求所有互动都轻到"顺手就做了"。
contribution:
  - 社交互动设计：献花/擦碑/上香/留言的轻互动组合与双边奖励机制
  - 经济系统设计：双边金币结算 + 服务端幂等 + 客户端零金额原则
  - 黑色幽默与温情的文案基调控制（"本人在线，只是提前装修"）
  - 低保真原型 → Unity 切片的两段式验证路径设计
outcome: 第 2 周：Unity 垂直切片开发中（本地双账号分享落地、扫墓与双边金币结算）；低保真原型已完成社交循环验证。
nextStep:
  - Unity 垂直切片收口：双账号分享与扫墓流程跑通
  - 录制微信端实机画面补充展示
milestones:
  - date: 2026-09-16
    title: 策划案冻结 + 低保真原型完成
    summary: 核心循环、经济安全原则（服务端幂等/客户端零金额）与社交互动组合定型；第一周可点击原型验证"布置 → 邀请 → 扫墓"循环。
  - date: 2026-09-16
    title: 进入 Unity 垂直切片（第 2 周）
    summary: Unity 6000.4 微信小游戏工程建立，本地双账号分享落地、扫墓与双边金币结算开发中。
---

社交压力设计是这款游戏的核心命题：扫墓互动必须轻到"顺手就做了"，但奖励要双边成立——墓主被来访的满足感，和访客动手的趣味感，缺一半循环就不转。

页面内嵌的是第一周低保真原型（可直接玩），Unity 小游戏切片面向微信端，等切片收口后会录制实机画面替换展示。
