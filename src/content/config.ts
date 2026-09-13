import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const games = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/games',
    generateId: ({ entry }) => entry.replace(/\.md$/, '')
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    status: z.enum(['prototype', 'playable', 'showcase', 'ongoing']),
    tags: z.array(z.string()).default([]),
    engine: z.string().default('Web'),
    platforms: z.array(z.string()).default([]),
    aiTools: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    thumbnail: z.string().optional(),
    playtestVideo: z.string().optional(),
    playtestPoster: z.string().optional(),
    screenshots: z.array(
      z.object({
        src: z.string(),
        title: z.string(),
        note: z.string().optional()
      })
    ).default([]),
    playableWeb: z.boolean().default(false),
    embedUrl: z.string().optional(),
    downloadLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string()
      })
    ).default([]),
    externalPage: z.string().optional(),
    repoUrl: z.string().optional(),
    role: z.string().optional(),
    teamSize: z.string().default('单人'),
    // 核心循环：环节数组，按顺序展示为循环步骤条
    coreLoop: z.array(
      z.object({
        label: z.string(),
        summary: z.string()
      })
    ).default([]),
    loopPunchline: z.string().optional(),
    // AI 开发工作流：纵向时间线
    aiWorkflow: z.array(
      z.object({
        label: z.string(),
        summary: z.string(),
        image: z.string().optional()
      })
    ).default([]),
    workflowNote: z.string().optional(),
    challenge: z.string().optional(),
    contribution: z.array(z.string()).default([]),
    outcome: z.string().optional(),
    nextStep: z.array(z.string()).default([]),
    milestones: z.array(
      z.object({
        date: z.coerce.date(),
        title: z.string(),
        summary: z.string()
      })
    ).default([])
  })
});

export const collections = { games };
