import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toSiteUrl } from '../utils/site';
import { siteMeta } from '../utils/site-meta';

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async ({ site }) => {
  const games = (await getCollection('games')).slice(0, 20);
  const siteUrl = toSiteUrl('/', site);
  const feedUrl = toSiteUrl('/rss.xml', site);
  const lastBuildDate = games[0]?.data.updatedDate ?? games[0]?.data.pubDate ?? new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${xmlEscape(siteMeta.name)}</title>\n    <link>${xmlEscape(siteUrl)}</link>\n    <description>${xmlEscape(siteMeta.description)}</description>\n    <language>zh-CN</language>\n    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>\n    <atom:link href="${xmlEscape(feedUrl)}" rel="self" type="application/rss+xml" />\n${games
    .map((game) => {
      const link = toSiteUrl(`/games/${game.id}`, site);
      return `    <item>\n      <title>${xmlEscape(game.data.title)}</title>\n      <link>${xmlEscape(link)}</link>\n      <guid>${xmlEscape(link)}</guid>\n      <description>${xmlEscape(game.data.summary)}</description>\n      <pubDate>${game.data.pubDate.toUTCString()}</pubDate>\n    </item>`;
    })
    .join('\n')}\n  </channel>\n</rss>\n`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
};
