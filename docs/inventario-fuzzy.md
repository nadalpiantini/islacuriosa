# Inventario Fuzzy → Isla Curiosa

## Resumen

| Categoría | Total | 🟢 Lleva | 🟡 Después | 🔴 No aplica | ❓ Preguntar |
|-----------|-------|----------|------------|--------------|-------------|
| Rutas | 82 | 30 | 12 | 36 | 4 |
| Componentes | 38 dirs | 8 | 10 | 20 | 0 |
| Libs | 47 | 10 | 12 | 25 | 0 |
| Juegos | 27 | 15 | 8 | 4 | 0 |
| APIs | 68 | 8 | 15 | 45 | 0 |

---

## Rutas

### Core del Producto

| Ruta | Descripción | Clasificación | Notas |
|------|-------------|---------------|-------|
| `/` | Homepage | 🟢 LLEVA | Ya existe como landing/waitlist |
| `/island` | Mapa interactivo de la isla | 🟢 LLEVA | → `/isla` — 10 zonas de RD |
| `/watch` | Fuzzy TV — grid de episodios por temporada | 🟢 LLEVA | → integrado en zonas de la isla |
| `/watch/[slug]` | Video player de episodio individual | 🟢 LLEVA | → `/episodio/[slug]` |
| `/games` | Portal de juegos — categorías | 🟢 LLEVA | → `/juegos` |
| `/learn` | Mundos de aprendizaje — progreso por materia | 🟢 LLEVA | Adaptado a zonas de la isla |
| `/learn/library` | Biblioteca de recursos | 🟡 DESPUÉS | Fase 3 |
| `/learn/map` | Mapa curricular | 🟡 DESPUÉS | Se reemplaza con la isla |
| `/learn/missions` | Misiones especiales | 🟡 DESPUÉS | Fase 2 — logros |
| `/play` | Juegos rápidos — acceso directo | 🟢 LLEVA | → `/juegos` |
| `/progress` | Progreso del estudiante | 🟢 LLEVA | → `/explorador` (Fase 2) |
| `/progress/me` | Mi progreso personal | 🟢 LLEVA | Dentro de `/explorador` |
| `/library` | Biblioteca general | 🟡 DESPUÉS | Fase 3 |
| `/tutor` | Chat AI con DeepSeek | 🟡 DESPUÉS | Fase 3 |
| `/subscription` | Planes de suscripción | 🟡 DESPUÉS | Fase 3 — monetización |
| `/colonial-rally` | AR Quest Zona Colonial | 🟡 DESPUÉS | Posible adaptación para El Fuerte |
| `/quest/[id]` | Quest individual | 🟡 DESPUÉS | Vinculado a AR |

### Roles B2B — No aplica

| Ruta | Descripción | Clasificación |
|------|-------------|---------------|
| `/admin` | Panel admin | 🔴 NO APLICA |
| `/admin/fuzzy-control` | Control de Fuzzy | 🔴 NO APLICA |
| `/admin/integrations` | Integraciones admin | 🔴 NO APLICA |
| `/admin/kpi` | KPIs admin | 🔴 NO APLICA |
| `/admin/login` | Login admin | 🔴 NO APLICA |
| `/admin/settings` | Settings admin | 🔴 NO APLICA |
| `/admin/tools` | Tools admin | 🔴 NO APLICA |
| `/admin/users` | Usuarios admin | 🔴 NO APLICA |
| `/teacher` | Dashboard maestro | 🔴 NO APLICA |
| `/teacher/analytics` | Analytics maestro | 🔴 NO APLICA |
| `/teacher/classes` | Clases maestro | 🔴 NO APLICA |
| `/teacher/content` | Contenido maestro | 🔴 NO APLICA |
| `/teacher/reports` | Reportes maestro | 🔴 NO APLICA |
| `/teacher/resources` | Recursos maestro | 🔴 NO APLICA |
| `/teacher/settings` | Settings maestro | 🔴 NO APLICA |
| `/teacher/tasks` | Tareas maestro | 🔴 NO APLICA |
| `/parent` | Dashboard padre | 🔴 NO APLICA |
| `/parent/dashboard` | Dashboard padre detalle | 🔴 NO APLICA |
| `/parent/family` | Familia | 🔴 NO APLICA |
| `/parent/reports` | Reportes padre | 🔴 NO APLICA |
| `/parent/settings` | Settings padre | 🔴 NO APLICA |
| `/student` | Dashboard estudiante (con auth) | 🔴 NO APLICA |
| `/student/tutor` | Tutor del estudiante | 🔴 NO APLICA |

### Dev/Test — No aplica

| Ruta | Descripción | Clasificación |
|------|-------------|---------------|
| `/ai-dashboard` | Dashboard AI experimental | 🔴 NO APLICA |
| `/ai-insights` | Insights AI experimental | 🔴 NO APLICA |
| `/design-system` | Showcase design system | 🔴 NO APLICA |
| `/demo/audio` | Demo audio | 🔴 NO APLICA |
| `/test/brain-master` | Test brain engine | 🔴 NO APLICA |
| `/test/integration` | Test integración | 🔴 NO APLICA |

### Preguntar

| Ruta | Descripción | Clasificación | Pregunta |
|------|-------------|---------------|----------|
| `/dashboard` | Dashboard estudiante | ❓ PREGUNTAR | Reemplazado por `/explorador`? |
| `/amaia/spelling-bee` | Spelling bee de Amaia | ❓ PREGUNTAR | Es personal, no aplica? |
| `/progress/family` | Progreso familiar | ❓ PREGUNTAR | Se vincula a padre? |
| `/progress/analytics` + 7 sub-rutas | Analytics detalle | ❓ PREGUNTAR | Demasiado complejo para Fase 1? |

---

## Juegos Implementados (27 tipos)

### 🟢 LLEVA — Core (15 juegos)

| Juego | Tipo | Ruta |
|-------|------|------|
| Memory Cards | Memoria/matching | `/games/memory-cards` |
| Drag & Drop | Categorización | `/games/drag-drop` |
| Crossword | Crucigrama | `/games/crossword` |
| Word Search | Sopa de letras | `/games/word-search` |
| Gap Fill | Completar espacios | `/games/gap-fill` |
| True/False | Verdadero/falso | `/games/true-false` |
| Match | Emparejar | `/games/match` |
| Flashcards | Tarjetas flash (SRS) | `/games/flashcards` |
| Hotspot | Click en imagen | `/games/hotspot` |
| Image Sequence | Ordenar imágenes | `/games/image-sequence` |
| Short Answer | Respuesta corta | `/games/short-answer` |
| Timeline | Línea de tiempo | `/games/timeline` |
| Branching Scenario | Historia con decisiones | `/games/branching-scenario` |
| Math Solver | Resolución matemáticas | `/games/math-solver` |
| Mind Map | Mapa mental | `/games/mind-map` |

### 🟡 DESPUÉS — Fase 2+ (8 juegos)

| Juego | Tipo | Ruta | Notas |
|-------|------|------|-------|
| Blockly Maze | Programación visual | `/games/blockly-maze` | Requiere Blockly (26MB assets) |
| Blockly Bird | Programación visual | `/games/blockly-bird` | Requiere Blockly |
| Blockly Turtle | Programación visual | `/games/blockly-turtle` | Requiere Blockly |
| Blockly Pond | Programación visual | `/games/blockly-pond` | Requiere Blockly |
| Code Challenge | Coding | `/games/code-challenge` | Requiere runtime |
| Live Quiz | Competencia en vivo | `/games/live-quiz` | Requiere WebSocket |
| Team Challenge | Equipo | `/games/team-challenge` | Requiere multiplayer |
| Critical Thinking | Pensamiento crítico | `/games/critical-thinking` | Complejo |

### 🔴 NO APLICA (4 juegos)

| Juego | Ruta | Razón |
|-------|------|-------|
| Leadership | `/games/leadership` | B2B/escolar |
| Research Methods | `/games/research-methods` | Académico avanzado |
| External (PhET/etc) | `/games/external` | Embeds de terceros |
| Spelling Bee | `/amaia/spelling-bee` | Personal de Amaia |

---

## Componentes

### 🟢 LLEVA

| Componente | Ubicación | Qué hace |
|------------|-----------|----------|
| `fuzzy/BigButton` | `components/fuzzy/BigButton.tsx` | Botón grande estilo Beast Academy |
| `fuzzy/EpisodeCard` | `components/fuzzy/EpisodeCard.tsx` | Tarjeta de episodio |
| `fuzzy/HeroSection` | `components/fuzzy/HeroSection.tsx` | Hero con personaje/icono |
| `fuzzy/StatCard` | `components/fuzzy/StatCard.tsx` | Tarjeta de estadística |
| `fuzzy/VideoPlayer` | `components/fuzzy/VideoPlayer.tsx` | Player de video |
| `fuzzy/IconBadge` | `components/fuzzy/IconBadge.tsx` | Badge con icono |
| `games/*` | `components/games/` | Componentes de juegos (MCQ, DragDrop, etc) |
| `ui/*` | `components/ui/` | Primitivos UI (Card, Button, Input) |

### 🟡 DESPUÉS

| Componente | Ubicación | Qué hace |
|------------|-----------|----------|
| `onboarding/` | `components/onboarding/` | Flujo de onboarding |
| `progress/` | `components/progress/` | Visualización de progreso |
| `notifications/` | `components/notifications/` | Sistema de notificaciones |
| `quiz/` | `components/quiz/` | Generador de quizzes |
| `spelling/` | `components/spelling/` | Spelling bee |
| `play/` | `components/play/` | Juegos rápidos |
| `learn/` | `components/learn/` | Mundos de aprendizaje |
| `layout/` | `components/layout/` | Layout compartido |
| `shell/` | `components/shell/` | Shell de navegación |
| `shared/` | `components/shared/` | Componentes compartidos |

### 🔴 NO APLICA

| Componente | Razón |
|------------|-------|
| `admin/` | Panel admin |
| `ai/` | Dashboard AI |
| `analytics/` | Analytics avanzado |
| `brain-master/` | Brain engine UI |
| `cultural/` | Contexto cultural específico |
| `curriculum/` | Curricular escolar |
| `dashboard/` | Dashboard con auth |
| `demo/` | Demos |
| `examples/` | Ejemplos |
| `h5p/` | Integración H5P |
| `hooked/` | Sistema Hooked |
| `icons/` | Iconos custom |
| `kpi-dashboard/` | KPIs |
| `lesson/` | Lecciones formales |
| `live-gaming/` | Multiplayer live |
| `parent/` | Panel padre |
| `parent-reports/` | Reportes padre |
| `subscription/` | Suscripciones |
| `tutor/` | Tutor AI UI |
| `adaptive/` | Aprendizaje adaptativo |

---

## Utilidades / Lib

### 🟢 LLEVA

| Archivo | Qué exporta |
|---------|-------------|
| `fuzzy-data.ts` | Data contract + provider registry (episodios, mundos, progreso) |
| `utils.ts` | cn() helper (clsx + tailwind-merge) |
| `gameUtils.ts` | Utilidades para juegos |
| `types.ts` | Tipos TypeScript compartidos |
| `database.types.ts` | Tipos de Supabase |
| `supabase/` | Cliente Supabase |
| `game-factory/` | Factory pattern para juegos |
| `schemas/` | Schemas de validación |
| `fuzzy/` | Datos y config de Fuzzy |
| `sample-data.ts` | Datos de ejemplo (para desarrollo) |

### 🟡 DESPUÉS

| Archivo | Qué exporta |
|---------|-------------|
| `points-system/` | Sistema de puntos |
| `srs/` | Spaced Repetition System |
| `hooks/` | Custom hooks |
| `i18n/` | Internacionalización |
| `email/` | Templates de email |
| `pwa/` | Progressive Web App config |
| `spelling/` | Lógica spelling |
| `tutor/` | Lógica tutor AI |
| `quiz-generator-client.ts` | Cliente generador de quizzes |
| `feature-flags/` | Feature flags |
| `monitoring/` | Monitoreo |
| `optimization/` | Optimización |

### 🔴 NO APLICA

| Archivo | Razón |
|---------|-------|
| `ai-adaptive/` | Aprendizaje adaptativo AI |
| `ai-content/` | Generación contenido AI |
| `ai-personalization/` | Personalización AI |
| `ai-quiz-generator.ts` | Generador quizzes AI |
| `analytics/` | Analytics complejo |
| `auth/` | Autenticación con roles |
| `brain-engine/` | Brain engine |
| `brain-master/` | Brain master |
| `cultural-context/` | Contexto cultural |
| `dashboard/` | Dashboard logic |
| `env.ts` | Variables de entorno (específicas) |
| `live-gaming/` | Multiplayer |
| `moderation/` | Moderación contenido |
| `ops.ts` | Operaciones admin |
| `parent-reports/` | Reportes padre |
| `roles.ts` + `roles-client.ts` | Sistema de roles |
| `stripe/` | Pagos Stripe |
| `subscriptions/` | Lógica suscripciones |
| `trpc/` | tRPC router |
| `websocket/` | WebSocket server |
| `fuzzy-rpc-examples.ts` | Ejemplos RPC |
| `h5p/` | Integración H5P |

---

## APIs

### 🟢 LLEVA

| Endpoint | Método | Qué hace |
|----------|--------|----------|
| `/api/episodes` | GET | Lista episodios |
| `/api/episodes/[slug]` | GET | Episodio por slug |
| `/api/seasons` | GET | Lista temporadas |
| `/api/characters` | GET | Lista personajes |
| `/api/games/next` | GET | Siguiente juego sugerido |
| `/api/points/award` | POST | Otorgar puntos |
| `/api/chapter/progress` | POST | Progreso de capítulo |
| `/api/_health` | GET | Health check |

### 🟡 DESPUÉS

| Endpoint | Qué hace |
|----------|----------|
| `/api/quiz/generate` | Generar quiz |
| `/api/tutor` | Chat tutor AI |
| `/api/audio/generate` | Generar audio |
| `/api/deepseek` | DeepSeek AI |
| `/api/notifications/*` | Notificaciones |
| `/api/award-badge` | Otorgar insignia |
| `/api/points/leaderboard` | Tabla de líderes |
| `/api/pool/ensure` | Pool de juegos |
| `/api/cron/*` | Tareas programadas |
| `/api/episodes/scan` | Escanear episodios |
| `/api/external-games` | Juegos externos |
| `/api/adaptive/*` | Aprendizaje adaptativo |
| `/api/ai/insights` | Insights AI |
| `/api/analytics/*` | Analytics |
| `/api/curriculum/*` | Curricular |

### 🔴 NO APLICA (35+ endpoints)

Admin, teacher, parent, stripe, websocket, brain-master, alerts, jobs, etc.

---

## Dependencias npm clave

### 🟢 Necesarias

| Package | Para qué |
|---------|----------|
| `next` | Framework |
| `react` / `react-dom` | UI |
| `@supabase/supabase-js` | Base de datos |
| `lucide-react` | Iconos SVG |
| `clsx` + `tailwind-merge` | Utilidad CSS |
| `tailwindcss` | Estilos |

### 🟡 Probablemente

| Package | Para qué |
|---------|----------|
| `zustand` | Estado global (progreso) |
| `framer-motion` | Animaciones isla/juegos |
| `@radix-ui/*` | Primitivos UI accesibles |

### 🔴 No necesarias

tRPC, Stripe, Blockly, langchain, openai, websocket, H5P, GSAP
