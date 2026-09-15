export const siteMeta = {
  name: 'Adam的游戏策划Demo作品集',
  authorName: '卢竑邑',
  authorNameEn: 'Adam',
  parentBrand: '卢竑邑 Adam',
  title: '核心循环 · 截图集 · AI 开发工作流',
  description: '卢竑邑（Adam）的游戏策划 Demo 作品集：每款游戏一个陈列页，展示核心循环拆解、游戏截图，以及从设计稿到可玩版本的 AI 开发工作流。',
  tagline: '核心循环 / 截图集 / AI 开发工作流',
  englishTitle: "Adam's Game Design Demo Portfolio: Core Loops, Screenshots & AI Workflows",
  englishDescription:
    "Adam (Lu Hongyi) is a game designer whose portfolio shows every game as a playable demo: the core loop, real screenshots, and the AI-assisted workflow that made it playable.",
  githubProfile: 'https://github.com/HongyiLU',
  repository: 'https://github.com/HongyiLU',
  rss: '/rss.xml',
  shareImage: '/images/games/sample-cover.svg',
  favicon: '/favicon.svg'
};

export const navLinks = [
  { href: '/', label: '首页' },
  { href: '/games', label: '游戏' },
  { href: '/about', label: '关于' }
];

export const gameStatusLabels: Record<string, string> = {
  prototype: '原型阶段',
  playable: '可玩验证',
  showcase: '展示版本',
  ongoing: '持续迭代'
};

export const profileFocusAreas = [
  {
    title: '玩法与核心循环设计',
    ratio: '45%',
    summary: '从一条可感知的核心循环出发做设计，用可玩原型验证节奏、反馈和目标感，再逐步扩展系统。'
  },
  {
    title: 'AI 辅助开发工作流',
    ratio: '35%',
    summary: '用 Claude Code / Codex 把设计直接变成可玩版本：设计输入、提示词迭代、AI 产出与人工调优形成稳定流程。'
  },
  {
    title: '作品表达与展示',
    ratio: '20%',
    summary: '把每个项目整理成核心循环、截图集和工作流三层结构，让玩家和设计者都能快速看懂设计意图。'
  }
] as const;

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function estimateReadingTime(source: string): string {
  const plainText = source
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/[#>*_\-\r\n]/g, ' ')
    .replace(/\s+/g, '');

  const charCount = plainText.length;
  const minutes = Math.max(1, Math.ceil(charCount / 450));

  return `${minutes} 分钟阅读`;
}

export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\+/g, ' plus ')
    .replace(/\s+/g, '-')
    .replace(/[^\p{Letter}\p{Number}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
