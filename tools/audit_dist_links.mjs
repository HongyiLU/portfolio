// 校验 dist 内所有内部链接（href/src）都指向真实存在的文件，
// 防止上线后出现 404。
import { readdir, readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

async function walkFiles(dir) {
  const entries = [];
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      entries.push(...(await walkFiles(full)));
    } else {
      entries.push(full);
    }
  }
  return entries;
}

function resolveHref(target) {
  if (!target || /^(https?:)?\/\//i.test(target) || target.startsWith('mailto:') || target.startsWith('tel:')) {
    return null;
  }
  const [withoutHash] = target.split('#');
  if (!withoutHash) return null;
  const clean = decodeURIComponent(withoutHash.split('?')[0]);
  if (path.isAbsolute(clean)) {
    // 站点以 / 部署；若使用子路径 BASE_PATH，这里同样按根处理
    return path.join(distDir, clean.replace(/^\/+/, ''));
  }
  return null;
}

const htmlFiles = (await walkFiles(distDir)).filter((file) => file.endsWith('.html'));
const broken = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pattern = /(?:href|src)="([^"#][^"]*)"/g;
  let match;
  while ((match = pattern.exec(html))) {
    const resolved = resolveHref(match[1]);
    if (!resolved) continue;
    const candidates = [
      resolved,
      `${resolved}.html`,
      path.join(resolved, 'index.html')
    ];
    if (!candidates.some((candidate) => existsSync(candidate) && statSyncIsFile(candidate))) {
      broken.push({ file: path.relative(distDir, file), target: match[1] });
    }
  }
}

function statSyncIsFile(candidate) {
  try {
    return statSync(candidate).isFile();
  } catch {
    return false;
  }
}

if (broken.length > 0) {
  console.error(`发现 ${broken.length} 个失效链接：`);
  for (const item of broken.slice(0, 40)) {
    console.error(`- ${item.file} -> ${item.target}`);
  }
  process.exit(1);
}

console.log(`链接审计通过：${htmlFiles.length} 个页面，无失效内部链接。`);
