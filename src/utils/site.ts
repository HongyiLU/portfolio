function isPassthroughPath(path: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:');
}

function isFilePath(path: string): boolean {
  return /\/[^/?#]+\.[^/?#]+(?:[?#].*)?$/.test(path);
}

function withTrailingSlash(path: string): string {
  if (path === '/' || path.endsWith('/') || isFilePath(path)) {
    return path;
  }

  const match = path.match(/^([^?#]*)(.*)$/);
  if (!match) {
    return path;
  }

  const [, pathname, suffix] = match;
  return `${pathname}/${suffix}`;
}

export function withBase(path: string): string {
  if (!path) {
    return '/';
  }

  if (isPassthroughPath(path)) {
    return path;
  }

  const normalizedPath = path === '/' ? '/' : `/${path.replace(/^\/+/, '')}`;
  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '');

  if (normalizedPath === '/') {
    return normalizedBase ? `${normalizedBase}/` : '/';
  }

  return withTrailingSlash(`${normalizedBase}${normalizedPath}`);
}

export function toSiteUrl(path: string, site: URL | undefined): string {
  const basedPath = withBase(path);
  const normalizedPath = isPassthroughPath(basedPath) ? basedPath : withTrailingSlash(basedPath);
  return new URL(normalizedPath, site ?? 'https://your-portfolio.example.com').toString();
}

// Astro.url.pathname 在 base 部署时已含 base 前缀；先剥离，避免 toSiteUrl 再次拼接出 /base/base
export function withoutBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    return pathname.slice(base.length) || '/';
  }
  return pathname;
}
