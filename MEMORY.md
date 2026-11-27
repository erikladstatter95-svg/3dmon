# MEMORY.md — 3DMON (`3dmon.shop`)

## Contexto del Proyecto
- **Nombre:** 3DMON (`https://3dmon.shop/`)
- **Ubicación y Cobertura:** San Juan Capital, Argentina, con envíos nacionales a todo el país.
- **Rubro y Propósito:** Laboratorio y tienda de impresión 3D a medida (piezas personalizadas, repuestos rotos o discontinuados, prototipado rápido para PyMEs e ingenieros, figuras, llaveros, medallas, souvenirs y merchandising corporativo por mayor, más asesoramiento técnico en materiales PLA, PLA+, PETG, ABS, ASA, TPU y resinas).
- **Canales Oficiales de Contacto:**
  - **WhatsApp Comercial Único:** `+54 264 411-3760` (`542644113760`, enlaces `https://wa.me/542644113760`)
  - **Instagram:** `https://www.instagram.com/3d.mon_/`
- **Host Canónico Verificado:** `https://3dmon.shop/` (`www.3dmon.shop` no posee registro DNS activo).

---

## Stack Tecnológico & Entorno
- **Frontend & Build:** Arquitectura híbrida MPA en **Vite 7 (`vite.config.js`)**:
  - **Home (`/`):** React 19 (`src/App.jsx`, componentes CSS modulares en `src/components/`, estilos globales en `src/index.css` y `src/App.css`).
  - **Hub y Artículos del Blog (`/blog/` y `/blog/<slug>/`):** HTML5 semántico estático multipágina con hoja de estilos compartida (`src/styles/blog.css`) y módulo ES compartido (`src/js/analytics.js` + `src/js/blog.js`).
  - **Página 404 real (`404.html`):** Compilada en raíz de `dist/` para evitar Soft-404 en Cloudflare Pages.
- **Hosting / CDN:** Cloudflare Pages (`server: cloudflare`, IPs `104.21.49.143` / `172.67.163.168`), con `public/_redirects` para redirecciones `301` y `HTTP 404` real para rutas inexistentes.
- **Google Search Console & Indexing API:** Propiedad `sc-domain:3dmon.shop` verificada con permisos `siteOwner` mediante `C:\Users\erikl\.config\claude-seo\service_account.json` (`seo-asistente@erik-website-seo.iam.gserviceaccount.com`).
- **Google Analytics 4 (GA4):** Tag `G-E76DZMT0FL` conectado a la Propiedad **`properties/513929397`** (ID de Cuenta: `304404800`), con lectura API verificada y operativa vía `seo-asistente@erik-website-seo.iam.gserviceaccount.com`.
- **Bing Webmaster Tools & IndexNow:** Sitio `https://3dmon.shop/` verificado (`IsVerified: True`, cuota `10.000/día` y `50.000/mes`). Clave IndexNow oficial de `3dmon.shop`: `a315c508d3144b2fa8adffd5d8badf13` (alojada en `public/a315c508d3144b2fa8adffd5d8badf13.txt`). *(Nota: la clave `361e05fea98a46139b7ba6e961b91cbf` corresponde a `erikwebsite.com` y no debe usarse en `3dmon.shop`).*
- **Grafo de Conocimiento Local:** `graphify-out/graph.json` en la raíz del proyecto (`python -m graphify . --code-only`).
- **Automatización SEO/AEO Local (`scratch/`):** `sunday_seo_command.py`, `check_cannibalization.py`, `verify_article_hygiene.py`, `audit_all_internal_links.py`, `submit_indexing.py` y `free_alsoasked_ai_fanout.py`.

---

## Convenciones y Reglas Obligatorias de `3dmon.shop`
1. **Slugs Cortos y Limpios (3 a 5 palabras, sin años):** Todo artículo nuevo en `/blog/<slug>/` debe tener un slug entre 3 y 5 palabras alineado a la Main Keyword (ej. `/blog/pla-vs-petg-cual-conviene/`). Queda prohibido incluir años (`2026`, etc.) en la URL.
2. **Límites Duros de Metadatos y Fórmula Sturm (AEO/GEO):**
   - `<title>`: máximo **60 caracteres** (sincronizado con `og:title` y `twitter:title`).
   - `<h1>`: máximo **78 caracteres**, directo y sin relleno retórico.
   - `<meta name="description">`: máximo **160 caracteres** (sincronizado con `og:description` y `twitter:description`).
   - **Bloque de Respuesta Directa (40–60 palabras):** Ubicado inmediatamente debajo del `<h1>` con la keyword principal dentro de las primeras **5 a 10 palabras** del texto.
   - **Tablas HTML Semánticas Accesibles:** Envoltorio `.table-wrapper` con `tabindex="0"`, `role="region"`, `<caption>`, `<thead>`, `<tbody>`, `<th>` y `data-label` para vista móvil.
3. **Datos Estructurados `Schema.org` y Paridad Exacta FAQ 1:1:**
   - Incluir JSON-LD `@graph` con `BlogPosting` (incluyendo `datePublished` y `dateModified`), `BreadcrumbList` y `FAQPage`, más `Service` o `Product` cuando el artículo sea comercial o de servicio.
   - **Paridad Exacta 1:1:** Misma cantidad y texto exacto entre los acordeones HTML `<details class="faq-item">` y las preguntas de `FAQPage` (`mainEntity`), apuntando a **6/6 FAQs** por artículo. Prohibido colocar encabezados `<h2>`–`<h6>` dentro de `<summary>`, y evitar acordeones exclusivos (`name=...`).
4. **Redacción Humana Rioplatense y Regla #31 (Honestidad SEO):**
   - Redactar en español argentino natural con voseo consistente (*podés, tenés, elegís, querés, traenos, envianos*).
   - **0 emojis decorativos** en textos, títulos, badges, botones o código HTML/JSX.
   - **0 guiones largos (`—`)** típicos de IA: reemplazar por comas, dos puntos o paréntesis.
   - **Regla #31 (Honestidad SEO):** Nunca prometer el puesto `#1` en Google ni garantizar posiciones exactas; comunicar siempre que optimizamos para posicionarnos lo más alto posible y competir por los primeros lugares.
5. **Taxonomía Cerrada del Blog (3 Ejes — Pivote 100% Comprador desde 27/11/2026):**
   - Toda tarjeta en `blog/index.html` debe usar exclusivamente uno de los 3 valores de `data-cat`: `principiantes` (Comprador Nuevo, Regalos y Redes), `tecnico` (Soluciones por Material y Uso para clientes, NO makers) y `comercial` (Transaccional Directo, Precios, Eventos y B2B).
   - **Prohibido contenido maker/dueño de impresora:** No escribir tutoriales de calibración, temperatura de cama, warping ni cómo reparar impresoras; todo artículo debe atraer compradores listos para encargar piezas.
   - Mantener sincronizados los contadores en las píldoras, el `<select>` y el texto `Mostrando N guías`.
6. **Teléfono Oficial Único y Botones WhatsApp:**
   - El único teléfono permitido en todo el repositorio (`wa.me/`, `data-wa-phone` y `Schema.org`) es `542644113760`.
   - No mostrar el número explícito dentro del texto del botón; usar textos limpios (`Consultar por WhatsApp`, `Pedí tu Presupuesto`).
7. **Filtro de Tráfico Interno y Eventos GA4 (`G-E76DZMT0FL`):**
   - Toda página pública debe incluir `<script id="dm-internal-filter">` en `<head>` antes de `gtag` (soporta `?soy_erik=1` / `?soy_3dmon=1` y `localhost`), bloqueando el envío propio a GA4 `properties/513929397`.
   - Mantener activos los eventos `generate_lead`, `whatsapp_click`, `faq_expand` y `article_read_75` mediante `src/js/analytics.js`.
8. **Higiene de Imágenes, Enlaces y Archivos Raíz:**
   - Imágenes editoriales del blog en `public/images/blog/` con tamaño **`1200x675` (16:9)** y peso **`< 490 KB`**.
   - **0 enlaces internos rotos:** verificar siempre con `python scratch/audit_all_internal_links.py`.
   - Mantener idénticos y sincronizados `sitemap.xml` / `public/sitemap.xml`, `llms.txt` / `public/llms.txt` y `public/robots.txt`.
9. **Protocolo Post-Push y Verificación Obligatoria:**
   - Antes de publicar: correr `python scratch/verify_article_hygiene.py --hub <archivos>`, `python scratch/audit_all_internal_links.py`, `npm run lint` y `npm run build`.
   - Tras `git push origin main`: notificar URLs nuevas o modificadas mediante `python scratch/submit_indexing.py` (Google Indexing API v3 + GSC Sitemap + IndexNow con key `a315c508d3144b2fa8adffd5d8badf13` + Bing Webmaster API).
10. **Control de Canibalización y Boost (>= 14 días):**
    - Antes de crear cualquier artículo nuevo, correr `python scratch/check_cannibalization.py "<keyword>"`. Si el solapamiento es `>= 70%`, no duplicar URL: hacer **Boost** sobre la URL existente (H2, tabla y FAQs).
    - Las auditorías de Boost se aplican únicamente sobre páginas con `>= 14 días` desde su publicación/indexación.

---

## Decisiones de Arquitectura
- **Híbrido Vite MPA (`index.html` React + `blog/` HTML5 Estático):** La Home conserva React 19 por su slider interactivo de portafolio y comparador antes/después; la sección `/blog/` y cada guía `/blog/<slug>/` se compilan como páginas HTML estáticas independientes registradas automáticamente en `vite.config.js` para lograr HTML pre-renderizado inmediato, `Schema.org` específico por URL y carga veloz sin depender de hidratación CSR para crawlers e IAs.
- **Plantilla Maestra Fuera de `blog/` (`templates/article.html`):** Se aloja fuera de `blog/` para impedir que el autodescubrimiento de Vite la compile a producción como ruta indexable.
- **Eliminación de Soft-404:** Se creó `404.html` en raíz + `public/_redirects` con redirecciones `301` para las 3 URLs heredadas del viejo WordPress que Bing seguía rastreando, y se desactivó el catch-all `/* -> /index.html 200` en `netlify.toml`.
- **Soporte Dual Dark/Light Sin FOUC:** Se conserva la identidad oscura (`#0f0f0f`, `#3D8700`, `#E9A900`, `Orbitron` + `Inter`) y el modo claro crema (`#f5f2e8`) de `3dmon.shop`, sincronizando `localStorage ('3dmon_theme')`, `data-theme` y `<meta name="color-scheme">`.

---

## Registro de Tareas & Estado
- [x] **2026-11-26 — Fase 1 (Diagnóstico e Infraestructura SEO/AEO/GEO):**
  - Diagnosticado estado en vivo de `https://3dmon.shop/`: host canónico sin `www`, Cloudflare Pages, causas raíz de baja visibilidad y 0 clics en 28d en Bing (`17` impr / `0` clics en 28d; `sitemap_index.xml` vacío + ausencia de `404.html` + falta de IndexNow + `http://` sin redirect), bloqueo Cloudflare AI Crawl Control en `robots.txt`, permiso `403` pendiente en GA4 `properties/304404800`, discrepancia de clave IndexNow resuelta (`a315c508d3144b2fa8adffd5d8badf13`), y peso de `24,2 MB` (`23,1 MiB`) en `public/portfolio/p1-p9.jpg`.
  - Creados `public/a315c508d3144b2fa8adffd5d8badf13.txt`, `public/robots.txt`, `public/sitemap.xml` + `sitemap.xml`, `public/llms.txt` + `llms.txt`, `public/_redirects`, `404.html`, `keywords/.gitkeep`.
  - Configurado `vite.config.js` MPA con autodescubrimiento de artículos en `blog/` y `eslint.config.js` compatible con Node/Browser.
  - Implementado filtro interno (`dm-internal-filter`), tracking GA4 compartido (`src/js/analytics.js`, `src/js/blog.js`), mejoras SEO/voseo/accesibilidad en Home (`index.html`, `src/App.jsx`, componentes) y diseño completo del Hub `/blog/` (`blog/index.html`, `src/styles/blog.css`, `templates/article.html`).
  - Creados 6 scripts Python en `scratch/` (`sunday_seo_command.py`, `check_cannibalization.py`, `verify_article_hygiene.py`, `audit_all_internal_links.py`, `submit_indexing.py`, `free_alsoasked_ai_fanout.py`).
  - Generado grafo `graphify-out/graph.json`, `MEMORY.md` y `PLAN_SEMANAL_SEO.md`.
- [x] **2026-11-26 — Alta en SerpBear + CSVs + Matriz 30 Artículos + Deploy Fase 1:**
  - Actualizado `.gitignore` para mantener privados `scratch/`, `graphify-out/` y `keywords/`.
  - Dado de alta y sincronizado `3dmon.shop` en SerpBear local (`12` keywords activas, cache `SC_3dmon.shop.json` con `31` registros 30d).
  - Procesados 6 CSVs de Google Ads Keyword Planner en `keywords/` (`827` keywords únicas en Argentina, `764` con volumen `>= 50`) y cerrada la matriz de `30` artículos fundacionales (`10` hoy + `10` viernes + `10` sábado) en `PLAN_SEMANAL_SEO.md`.
- [x] **2026-11-26 — Conexión GA4 `properties/513929397` + Migración a Cloudflare Pages:**
  - Confirmado que `304404800` era el ID de Cuenta de GA4 y el Property ID real es **`properties/513929397`** (`AI Assistant`: `5` usuarios / `5` sesiones / `100%` engaged en 28d). Actualizado `scratch/sunday_seo_command.py`.
  - Verificado `HTTP 404` real en Cloudflare Pages para rutas inexistentes (pendiente configurar `npm run build` -> `dist` en Cloudflare Pages Build Settings para compilar `src/main.jsx` y `public/`).
- [x] **2026-11-26 — Publicación Tanda 1 del Blog (10 artículos fundacionales + imágenes `1200x675`):**
  - Generadas y procesadas 10 fotografías editoriales `1200x675` JPEG (`93.2 KB`–`173.2 KB`, todas `< 490 KB`) en `public/images/blog/` con pastilla por eje y sello `3dmon.shop`.
  - Publicados `10` artículos HTML5 completos (`4` Principiantes, `3` Técnico 3D, `3` Comercial con Schema `Service`) con paridad FAQ 6/6, tablas accesibles, Respuesta Directa Sturm, interlinking cruzado y voseo natural.
  - Sincronizados `blog/index.html` (`10` guías activas), `sitemap.xml` + `public/sitemap.xml` (`12` URLs) y `llms.txt` + `public/llms.txt`.
- [x] **2026-11-27 — Pivote Estratégico 100% Comprador + Publicación Tanda 2 del Blog (10 artículos comerciales/comprador):**
  - Procesado nuevo CSV `keywords/Keyword Stats 2026-11-27 at 11_47_38.csv` (`124` keywords filtradas de compra 3D: `souvenirs 3d`, `cortantes 3d`, `repuestos impresion 3d`, `donde imprimir en 3d`, `impresion 3d mercado libre`).
  - Reestructurado `PLAN_SEMANAL_SEO.md` eliminando temas para dueños de impresoras y enfocando los 3 ejes 100% en compradores y empresas.
  - Publicados `10` artículos nuevos (`5` Comerciales con Schema `Service`, `2` Soluciones por Material, `3` Comprador y Redes) + `10` imágenes `1200x675` `< 490 KB` en `public/images/blog/` (8 fotos editoriales nuevas + 2 fotos reales del taller `p4.jpg` y `p1.jpg`).
  - Sincronizados `blog/index.html` (`20` guías activas: `P=7`, `T=5`, `C=8`), `sitemap.xml` + `public/sitemap.xml` (`22` URLs) y `llms.txt` + `public/llms.txt`.
- [ ] **Pendiente Bloque 0 (Acciones en Panel):** Revisar *Managed `robots.txt`* y *Always Use HTTPS* en Cloudflare, limpiar sitemaps WP viejos en GSC/Bing y comprimir `public/portfolio/p1.jpg`..`p9.jpg` (`24,2 MB`).
- [ ] **Pendiente Sprint Fundacional del Blog (10 artículos restantes):** Tanda 3 (10 sábado 28/11 — 100% comprador/comercial) según matriz actualizada en `PLAN_SEMANAL_SEO.md`.
