import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerAliases(['vue', 'html'], { languageName: 'xml' });
hljs.registerAliases(['ts'], { languageName: 'typescript' });
hljs.registerAliases(['js'], { languageName: 'javascript' });
hljs.registerAliases(['sh', 'shell'], { languageName: 'bash' });

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface RenderedDoc {
  title: string;
  /** HTML intercalado con demos: `{ html }` o `{ demo: 'nombre' }`. */
  parts: ({ html: string } | { demo: string })[];
  toc: TocItem[];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const LANG_LABELS: Record<string, string> = {
  vue: 'Vue',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  js: 'JavaScript',
  javascript: 'JavaScript',
  bash: 'Terminal',
  sh: 'Terminal',
  css: 'CSS',
  json: 'JSON',
  html: 'HTML',
};

const md = new MarkdownIt({ html: true, linkify: true, typographer: false });

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info.trim().split(/\s+/)[0] || 'text';
  const code = token.content.replace(/\n$/, '');
  const highlighted = hljs.getLanguage(lang)
    ? hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    : escapeHtml(code);
  return (
    `<div class="code-block"><div class="code-head"><span>${LANG_LABELS[lang] ?? lang}</span>` +
    `<button type="button" class="code-copy" data-copy>Copiar</button></div>` +
    `<pre><code class="hljs">${highlighted}</code></pre></div>`
  );
};

// Tablas con scroll horizontal en pantallas pequeñas.
md.renderer.rules.table_open = () => '<div class="table-wrap"><table>';
md.renderer.rules.table_close = () => '</table></div>';

// Enlaces externos en pestaña nueva.
const defaultLinkOpen =
  md.renderer.rules.link_open ?? ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') ?? '';
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

const CALLOUTS: Record<string, string> = { NOTE: 'Nota', TIP: 'Consejo', WARNING: 'Atención' };

export function renderDoc(source: string): RenderedDoc {
  const env = {};
  const tokens = md.parse(source, env);
  const toc: TocItem[] = [];
  const used = new Set<string>();
  let title = '';

  tokens.forEach((token, i) => {
    if (token.type !== 'heading_open') return;
    const inline = tokens[i + 1];
    const text = inline.children?.map((c) => c.content).join('') ?? inline.content;
    if (token.tag === 'h1') {
      title = text;
      return;
    }
    let id = slugify(text);
    while (used.has(id)) id += '-';
    used.add(id);
    token.attrSet('id', id);
    if (token.tag === 'h2' || token.tag === 'h3') {
      toc.push({ id, text, level: token.tag === 'h2' ? 2 : 3 });
    }
  });

  let html = md.renderer.render(tokens, md.options, env);

  // > [!NOTE] … → aviso con estilo.
  html = html.replace(
    /<blockquote>\s*<p>\[!(NOTE|TIP|WARNING)\]\s*/g,
    (_m, kind: string) =>
      `<blockquote class="callout callout--${kind.toLowerCase()}"><p><strong class="callout-title">${CALLOUTS[kind]}</strong>`,
  );

  const parts: RenderedDoc['parts'] = [];
  const re = /<!--\s*demo:([\w-]+)\s*-->/g;
  let last = 0;
  for (const match of html.matchAll(re)) {
    parts.push({ html: html.slice(last, match.index) });
    parts.push({ demo: match[1] });
    last = (match.index ?? 0) + match[0].length;
  }
  parts.push({ html: html.slice(last) });

  return { title, parts, toc };
}
