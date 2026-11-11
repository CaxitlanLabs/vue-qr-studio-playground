<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { demos } from './demos';
import { renderDoc } from './markdown';
import { docGroups, flatDocs } from './nav';
import './docs.css';

const sources = import.meta.glob('./content/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>;

const route = useRoute();
const router = useRouter();

const slug = computed(() => String(route.params.slug ?? ''));
const source = computed(() => sources[`./content/${slug.value}.md`]);
const doc = computed(() => (source.value ? renderDoc(source.value) : null));
const index = computed(() => flatDocs.findIndex((d) => d.slug === slug.value));
const current = computed(() => flatDocs[index.value]);
const prev = computed(() => (index.value > 0 ? flatDocs[index.value - 1] : null));
const next = computed(() => (index.value >= 0 && index.value < flatDocs.length - 1 ? flatDocs[index.value + 1] : null));
const editUrl = computed(
  () => `https://github.com/CaxitlanLabs/vue-qr-studio-playground/edit/main/src/docs/content/${slug.value}.md`,
);

/* ---------- Menú lateral ---------- */
const query = ref('');
const menuOpen = ref(false);
const filteredGroups = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return docGroups;
  return docGroups
    .map((g) => ({
      ...g,
      links: g.links.filter((l) => {
        const text = `${l.title} ${sources[`./content/${l.slug}.md`] ?? ''}`.toLowerCase();
        return text.includes(q);
      }),
    }))
    .filter((g) => g.links.length);
});

watch(slug, () => {
  menuOpen.value = false;
});

/* ---------- Título de la pestaña ---------- */
watch(
  doc,
  (d) => {
    document.title = d ? `${d.title} · vue-qr-studio` : 'vue-qr-studio';
  },
  { immediate: true },
);

/* ---------- Copiar código ---------- */
const article = ref<HTMLElement | null>(null);
async function onArticleClick(e: MouseEvent) {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy]');
  if (!btn) return;
  const code = btn.closest('.code-block')?.querySelector('code')?.textContent ?? '';
  try {
    await navigator.clipboard.writeText(code);
    btn.textContent = '¡Copiado!';
  } catch {
    btn.textContent = 'No se pudo copiar';
  }
  setTimeout(() => (btn.textContent = 'Copiar'), 1500);
}

/* ---------- "En esta página": resalta la sección visible ---------- */
const activeId = ref('');
let observer: IntersectionObserver | null = null;

function observeHeadings() {
  observer?.disconnect();
  if (!article.value || typeof IntersectionObserver === 'undefined') return;
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) activeId.value = visible[0].target.id;
    },
    { rootMargin: '-70px 0px -70% 0px' },
  );
  article.value.querySelectorAll('h2[id], h3[id]').forEach((h) => observer!.observe(h));
}

watch(
  doc,
  async () => {
    activeId.value = doc.value?.toc[0]?.id ?? '';
    await nextTick();
    observeHeadings();
    if (route.hash) document.querySelector(route.hash)?.scrollIntoView();
  },
  { immediate: true, flush: 'post' },
);
onBeforeUnmount(() => observer?.disconnect());

function goTo(id: string) {
  router.replace({ hash: `#${id}` });
}
</script>

<template>
  <div class="docs">
    <button class="docs-menu-toggle" type="button" @click="menuOpen = !menuOpen">
      <span>☰</span> {{ current ? `${current.group} / ${current.title}` : 'Menú' }}
    </button>

    <aside class="docs-sidebar" :class="{ open: menuOpen }">
      <input v-model="query" class="docs-search" type="search" placeholder="Buscar en la documentación…" />
      <nav>
        <div v-for="group in filteredGroups" :key="group.title" class="docs-group">
          <h4>{{ group.title }}</h4>
          <ul>
            <li v-for="link in group.links" :key="link.slug">
              <RouterLink :to="`/docs/${link.slug}`" :class="{ active: link.slug === slug }">{{ link.title }}</RouterLink>
            </li>
          </ul>
        </div>
        <p v-if="!filteredGroups.length" class="docs-empty">Sin resultados para “{{ query }}”.</p>
      </nav>
    </aside>

    <main class="docs-main">
      <article v-if="doc" ref="article" class="prose" @click="onArticleClick">
        <p class="docs-eyebrow">{{ current?.group }}</p>
        <template v-for="(part, i) in doc.parts" :key="`${slug}-${i}`">
          <div v-if="'html' in part" class="prose-chunk" v-html="part.html" />
          <div v-else class="demo-frame">
            <div class="demo-label">Demo en vivo</div>
            <component :is="demos[part.demo]" v-if="demos[part.demo]" />
            <p v-else>Demo «{{ part.demo }}» no encontrada.</p>
          </div>
        </template>

        <footer class="docs-footer">
          <a :href="editUrl" target="_blank" rel="noopener" class="docs-edit">Editar esta página en GitHub</a>
          <nav class="docs-pager">
            <RouterLink v-if="prev" :to="`/docs/${prev.slug}`" class="prev">
              <small>Anterior</small><span>← {{ prev.title }}</span>
            </RouterLink>
            <span v-else />
            <RouterLink v-if="next" :to="`/docs/${next.slug}`" class="next">
              <small>Siguiente</small><span>{{ next.title }} →</span>
            </RouterLink>
          </nav>
        </footer>
      </article>

      <div v-else class="prose prose-chunk">
        <h1>Página no encontrada</h1>
        <p>No existe la sección «{{ slug }}». <RouterLink to="/docs">Volver al inicio de la documentación</RouterLink>.</p>
      </div>
    </main>

    <aside v-if="doc?.toc.length" class="docs-toc">
      <h4>En esta página</h4>
      <ul>
        <li v-for="item in doc.toc" :key="item.id" :class="`lvl-${item.level}`">
          <a :href="`#/docs/${slug}#${item.id}`" :class="{ active: activeId === item.id }" @click.prevent="goTo(item.id)">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>
