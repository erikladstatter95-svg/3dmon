# PLAN_SEMANAL_SEO.md — Sistema Operativo Semanal (`3dmon.shop`)

> **Propósito:** Hoja de ruta semanal para posicionar a **3DMON (`https://3dmon.shop/`)** lo más alto posible en Google, Bing y asistentes de IA (ChatGPT Search, Perplexity, Gemini), maximizando consultas y pedidos por WhatsApp (`+54 264 411-3760`).

---

## 1. Cadencia Semanal en 3 Ejes (100% Enfoque Comprador y Ventas) + Comando Dominical

> **Pivote Estratégico (27/11/2026):** Se eliminan los temas orientados a personas que ya tienen impresora 3D (calibración, temperatura de cama, warping o fallas de impresión). Los 3 ejes apuntan 100% a **compradores, curiosos listos para encargar y empresas** que buscan soluciones impresas a medida, regalos, tendencias de redes, repuestos y pedidos por mayor.

| Día | Eje Estratégico | Foco Editorial y Comercial (Compradores) | Regla Operativa |
| :--- | :--- | :--- | :--- |
| **Lunes** | **Eje 1: Comprador Nuevo, Regalos y Redes (`principiantes`)** | "Vi algo en TikTok/Instagram/MakerWorld, cómo lo encargo", regalos personalizados, llaveros Spotify, figuras coleccionables, macetas y tendencias virales | Boost (si hay URL >= 14d en pos. 4–20) + 1 guía nueva + interlinking |
| **Martes** | **Eje 2: Soluciones por Material y Uso (`tecnico`)** | Qué material pedir según el uso real (piezas para sol/auto/calor, cortantes de galletitas seguros, acabados multicolor/transparentes, modelado desde foto o pieza rota) | Boost (>= 14d) + 1 guía práctica para clientes + interlinking |
| **Miércoles** | **Eje 3: Comercial, Precios y B2B (`comercial`)** | Conversión directa: Mercado Libre vs compra directa sin comisiones, precios y presupuestos, dónde imprimir cerca de mí, souvenirs de eventos, repuestos y prototipos PyMEs | Boost (>= 14d) + 1 artículo transaccional + CTA directo a WhatsApp |
| **Jueves** | **Eje 1: Comprador Nuevo, Regalos y Redes (`principiantes`)** | Productos virales, accesorios de películas/series, organizadores gamer/escritorio y guías sin jerga para encargar por primera vez | Boost (>= 14d) + 1 guía nueva + interlinking |
| **Viernes** | **Eje 2: Soluciones por Material y Uso (`tecnico`)** | Comparativas orientadas a durabilidad y acabado para el comprador que necesita que su pieza aguante uso diario, agua, calor o impacto | Boost (>= 14d) + 1 guía práctica nueva + interlinking |
| **Sábado** | **Eje 3: Comercial, Precios y B2B (`comercial`)** | Pedidos mayoristas, medallas y trofeos, maquetas de arquitectura, comprar impresora vs encargar, empresas y envíos nacionales | Boost (>= 14d) + 1 artículo comercial + interlinking |
| **Domingo** | **Comando Dominical de Auditoría** | Correr `python scratch/sunday_seo_command.py` (GSC + Bing + GA4 `513929397` + SerpBear), evaluar URLs >= 14 días, detectar canibalización y definir el plan de la semana | Reporte en `PLAN_SEMANAL_SEO.md` + selección de 2–3 URLs comerciales para interlinking |

### Protocolo de Interlinking Semanal y Control de Canibalización
- **Interlinking semanal:** Elegir entre **2 y 3 páginas comerciales/servicios clave** por semana (por ejemplo: Home `/`, repuestos a medida, prototipado rápido para PyMEs, merchandising/llaveros por mayor) e inyectar enlaces contextuales naturales hacia ellas desde los artículos del blog.
- **Control de canibalización (`python scratch/check_cannibalization.py "<keyword>"`):**
  - Solapamiento **`>= 70%`**: no crear URL nueva; absorber los términos faltantes como **Boost** (`<h2>`, tabla o FAQ) dentro del artículo existente.
  - Solapamiento **`< 60%`**: luz verde para crear artículo nuevo con slug corto de **3 a 5 palabras sin año**.

---

## 2. Bloque 0: Saneamiento Técnico, Bing/IndexNow, GA4 y Cloudflare

### Ya implementado localmente en Fase 1 (listo para deploy)
- [x] Archivo de verificación IndexNow `public/a315c508d3144b2fa8adffd5d8badf13.txt` (contenido exacto `a315c508d3144b2fa8adffd5d8badf13`).
- [x] `404.html` real en raíz de build + `public/_redirects` (`301` desde las 3 URLs viejas de WordPress hacia `/blog/`) + catch-all SPA desactivado en `netlify.toml` para eliminar Soft-404 masivo.
- [x] `public/sitemap.xml` / `sitemap.xml` y `public/llms.txt` / `llms.txt` creados y sincronizados; `public/robots.txt` actualizado.
- [x] `<html lang="es-AR">`, Open Graph / Twitter Cards con URLs absolutas, `LocalBusiness` enriquecido con `hasOfferCatalog`, filtro interno `?soy_erik=1` / `?soy_3dmon=1` y tracking GA4 (`generate_lead`, `whatsapp_click`, `faq_expand`, `article_read_75`).
- [x] Hub `/blog/` (`blog/index.html`, `src/styles/blog.css`) y plantilla maestra (`templates/article.html`) + scripts en `scratch/`.

### Acciones pendientes (requieren confirmación o acceso del dueño)
1. **Configuración de Build en Cloudflare Pages (urgente — resuelve pantalla en negro):**
   - Al migrar del Worker a Cloudflare Pages, el primer deploy publicó la raíz sin compilar (`src/main.jsx` crudo como `text/jsx` y sin copiar `public/`). Configurar en Cloudflare Pages → *Settings → Builds & deployments*: **Build command:** `npm run build`, **Build output directory:** `dist`, variable `NODE_VERSION = 20`, y reintentar el deploy. Con Cloudflare Pages ya responde `HTTP 404` real en rutas inexistentes.
2. **Configuración adicional en Cloudflare (panel web de `3dmon.shop`):**
   - Activar **Always Use HTTPS** (hoy `http://3dmon.shop/` responde `200 OK` sin redirigir a `https://3dmon.shop/`).
   - Revisar las 2 capas de **AI Crawl Control**: los bots aparecen como *Permitidos* en acceso HTTP/WAF (`OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot` habilitados), pero el interruptor separado *Managed `robots.txt` / Instruct AI bots* inyecta `# BEGIN Cloudflare Managed content` con `ai-train=no` y `Disallow: /` para `GPTBot`, `ClaudeBot`, `Google-Extended`, `anthropic-ai`, `Claude-Web`, `Applebot-Extended`, etc. (En `erikwebsite.com` ese interruptor está apagado).
   - Confirmar que el certificado DNS no usa `www` (mantener canónico `https://3dmon.shop/`).
3. **Limpieza de Sitemaps Heredados:** Eliminar `sitemap_index.xml` y `product-sitemap.xml` en GSC y Bing Webmaster Tools, dejando únicamente `https://3dmon.shop/sitemap.xml` (y re-enviar IndexNow tras activar `npm run build` en Cloudflare Pages).
4. **Compresión de Imágenes de Portafolio (Performance LCP/Peso):** Optimizar `public/portfolio/p1.jpg`..`p9.jpg` (actualmente pesan entre `1,4 MB` y `3,4 MB` cada una, sumando `24,2 MB` / `23,1 MiB`) a formato ligero `< 350 KB` cada una.

---

## 3. Evolución Histórica — Baseline Inicial (Jueves 26 de Noviembre de 2026)

| Indicador Clave (KPI) | Estado Medido (26/11/2026) | Notas y Diagnóstico |
| :--- | :--- | :--- |
| **URLs Canónicas en `public/sitemap.xml`** | `2` URLs (`/`, `/blog/`) | Antes congelado en `1` URL (`2026-02-19`) |
| **Artículos Activos en `/blog/`** | `0` artículos (`0` P / `0` T / `0` C) | Hub `/blog/` construido y listo para Sprint 10+10+10 |
| **GSC (`sc-domain:3dmon.shop`)** | `28d`: `9` clics · `375` impr · Pos. `5.7` (`90d`: `49` clics · `1.162` impr · Pos. `6.3`) | 1 sola URL (`/`). Líder: `impresiones 3d san juan` (`8` clics, `164` impr en 90d; `52` impr en 28d pos `5.5`) |
| **GSC Sitemaps** | `3` registrados (`sitemap.xml`, `product-sitemap.xml`, `sitemap_index.xml`) | Pendiente borrar los 2 feeds viejos de WordPress |
| **Bing (`https://3dmon.shop/`)** | `InIndex: 4` · `CrawlErrors: 2` · `28d`: `17` impr / `0` clics (`290` impr / `11` clics histórico WP+actual) | `https://3dmon.shop/sitemap.xml` enviado (`Success`, 2 URLs); falta borrar `sitemap_index.xml` |
| **IndexNow** | Listo (`a315c508d3144b2fa8adffd5d8badf13.txt`) | Re-notificar tras activar `npm run build` -> `dist` en Cloudflare Pages |
| **GA4 (`properties/513929397`, `G-E76DZMT0FL`)** | **Conectado OK (28d):** `Direct` `39` u. · `Organic Search` `11` u. · **`AI Assistant` `5` u. (`100%` eng.)** · `Organic Social` `4` u. | `304404800` era el Account ID; eventos nuevos (`generate_lead`, `whatsapp_click`, `faq_expand`, `article_read_75`) ya en código |
| **SerpBear Local** | **Activo: `12` keywords sincronizadas (`3dmon.shop`)** | `SC_3dmon.shop.json` cacheado (`31` registros 30d); 0 canibalizaciones |

---

## 4. Sprint Fundacional del Blog: Matriz Cerrada de 30 Artículos (6 CSVs = 827 Keywords Únicas)

Al existir **0 artículos publicados/indexados** en `/blog/`, durante este lanzamiento **no aplica Boost** todavía. A partir del cruce de los 6 archivos CSV descargados en `keywords/` (`827` keywords únicas en Argentina, `764` con volumen `>= 50`), quedó cerrada la matriz de **30 artículos (10 por eje)** con slugs de 3–5 palabras sin año:

### Tanda 1 — Hoy Jueves 26/11 (**COMPLETADA** — 10 artículos: 4 Principiantes + 3 Técnico + 3 Comercial)
1. [x] **`[principiantes]`** `/blog/que-es-la-impresion-3d/` — *Main KW:* `que es la impresion 3d` (`500/mes` · Bajo `31`)
2. [x] **`[principiantes]`** `/blog/pla-vs-petg-diferencias/` — *Main KW:* `pla vs petg` / `diferencia entre pla y petg` (`50/mes`, `+900% YoY` · Bajo `16`)
3. [x] **`[principiantes]`** `/blog/archivos-stl-para-imprimir/` — *Main KW:* `archivos stl para imprimir` / `stl para imprimir` (`36` variantes `>= 50` · Bajo `13`)
4. [x] **`[principiantes]`** `/blog/filamento-pla-es-toxico/` — *Main KW:* `filamento pla es toxico` (`50/mes`, `8` variantes · Bajo `0`)
5. [x] **`[tecnico]`** `/blog/altura-de-capa-impresion/` — *Main KW:* `altura de capa impresion 3d` (`50/mes` · Bajo `0`)
6. [x] **`[tecnico]`** `/blog/soportes-en-impresion-3d/` — *Main KW:* `soportes en impresion 3d` (`50/mes` · Bajo `4`)
7. [x] **`[tecnico]`** `/blog/filamento-tpu-caracteristicas-usos/` — *Main KW:* `filamento tpu` / `filamento tpu para que sirve` (`500/mes` + `50/mes` Bajo `21`)
8. [x] **`[comercial]`** `/blog/impresion-3d-san-juan/` — *Main KW:* `impresion 3d san juan` (`500/mes` · Bajo `17` · pos `5.5` en GSC)
9. [x] **`[comercial]`** `/blog/servicio-impresion-3d-argentina/` — *Main KW:* `servicio de impresion 3d` / `impresiones 3d argentina` (`500/mes` · Medio `58`)
10. [x] **`[comercial]`** `/blog/llaveros-3d-personalizados-mayor/` — *Main KW:* `llaveros 3d personalizados` / `llaveros 3d por mayor` (`5.000/mes` + `50/mes`)

### Tanda 2 — Hoy Viernes 27/11 (**COMPLETADA — REESTRUCTURADA 100% COMPRADOR** — 10 artículos: 5 Comercial + 2 Material/Uso + 3 Comprador/Redes)
11. [x] **`[comercial]`** `/blog/impresion-3d-mercado-libre/` — *Main KW:* `impresion 3d mercado libre` (BoFu: comisiones y envío de plataforma vs compra directa a fabricante en 3DMON)
12. [x] **`[comercial]`** `/blog/precio-presupuesto-impresion-3d/` — *Main KW:* `precio impresion 3d` / `presupuesto impresion 3d` (`5.000/mes` + `50/mes`)
13. [x] **`[comercial]`** `/blog/donde-imprimir-piezas-3d/` — *Main KW:* `impresion 3d cerca de mi` / `donde imprimir en 3d` (`5.000/mes` + `50/mes`)
14. [x] **`[comercial]`** `/blog/souvenirs-impresos-en-3d/` — *Main KW:* `souvenirs 3d` / `souvenirs impresos en 3d` (`500/mes` x 6 variantes: 15 años, cumpleaños, bautismo, comunión)
15. [x] **`[comercial]`** `/blog/repuestos-impresos-en-3d/` — *Main KW:* `repuestos impresion 3d` / `repuestos de autos impresos en 3d` (`500/mes` + `50/mes`: autos y electrodomésticos)
16. [x] **`[tecnico]`** `/blog/cortantes-galletitas-3d-medida/` — *Main KW:* `cortantes 3d` / `cortante de galletitas 3d` (`500/mes` + `50/mes` por mayor, higiene y usos en pastelería)
17. [x] **`[tecnico]`** `/blog/piezas-3d-resistentes-calor/` — *Main KW:* `impresion 3d resiste el sol` / `filamento resistente al calor` (para compradores: qué pedir si la pieza va al sol, al auto o al exterior)
18. [x] **`[principiantes]`** `/blog/encargar-impresion-3d-redes/` — *Main KW:* `impresiones 3d a pedido` / `donde puedo mandar a imprimir en 3d` (Viste algo en Instagram, TikTok o MakerWorld y querés encargarlo con link o foto)
19. [x] **`[principiantes]`** `/blog/figuras-impresas-en-3d/` — *Main KW:* `impresion 3d figuras` / `figuras impresas en 3d` (`500/mes`: coleccionables, películas, series, anime y accesorios fandom a pedido)
20. [x] **`[principiantes]`** `/blog/regalos-personalizados-en-3d/` — *Main KW:* `regalos personalizados en 3d` / `llavero spotify 3d` (`50/mes` Bajo `20`: regalos originales con nombre, foto o canción)

### Tanda 3 — Sábado 28/11 (**REESTRUCTURADA 100% COMPRADOR** — 10 artículos: 5 Comercial + 2 Material/Uso + 3 Comprador/Redes)
21. **`[comercial]`** `/blog/impresion-3d-prototipos-pymes/` — *Main KW:* `impresion 3d prototipos` (`50/mes` · Bajo `25`)
22. **`[comercial]`** `/blog/impresion-3d-para-empresas/` — *Main KW:* `impresion 3d para empresas` / `empresas impresion 3d` (`50/mes` · Medio `39`)
23. **`[comercial]`** `/blog/impresion-maquetas-arquitectura-3d/` — *Main KW:* `impresion 3d maquetas` / `maquetas en 3d` (`50/mes` · Bajo `3`)
24. **`[comercial]`** `/blog/comprar-impresora-vs-encargar/` — *Main KW:* `cuanto sale una impresora 3d` vs encargar piezas (`500/mes`)
25. **`[comercial]`** `/blog/medallas-trofeos-impresos-3d/` — *Main KW:* `medallas y trofeos en 3d` (torneos, clubes, carreras y eventos)
26. **`[tecnico]`** `/blog/impresion-3d-multicolor-transparente/` — *Main KW:* `impresion 3d multicolor` / `impresion 3d transparente` (`500/mes` · acabados visuales a pedido)
27. **`[tecnico]`** `/blog/modelado-3d-desde-foto/` — *Main KW:* `modelado 3d a partir de foto` (cómo te diseñamos e imprimimos una pieza si no tenés el archivo STL)
28. **`[principiantes]`** `/blog/macetas-impresas-en-3d/` — *Main KW:* `macetas impresas en 3d` (`500/mes` · decoración, suculentas y viveros)
29. **`[principiantes]`** `/blog/objetos-virales-impresos-3d/` — *Main KW:* tendencias virales de MakerWorld, cine y series para encargar en Argentina
30. **`[principiantes]`** `/blog/organizador-soportes-escritorio-3d/` — *Main KW:* soportes gamer, auriculares, joysticks y organizadores de escritorio a medida

---

## 5. Listas de Keywords Semilla para Google Ads Keyword Planner (10 por búsqueda)

Guardar cada descarga CSV en la carpeta `keywords/` del repositorio.

### Lista 1A — Eje 1: Principiantes (Conceptos, Primeros Pasos y Archivos)
1. `que es la impresion 3d`
2. `como funciona una impresora 3d`
3. `archivos stl para imprimir 3d`
4. `paginas para descargar archivos stl`
5. `formato 3mf vs stl`
6. `archivo obj para impresion 3d`
7. `que necesito para imprimir en 3d`
8. `errores al imprimir en 3d`
9. `como cuidar piezas impresas en 3d`
10. `ideas para imprimir en 3d`

### Lista 1B — Eje 1: Principiantes (Materiales Básicos, Regalos y Usos Cotidianos)
1. `pla vs petg`
2. `que es el filamento pla`
3. `filamento pla es toxico`
4. `impresion 3d en petg`
5. `cortantes de galletas en 3d`
6. `macetas impresas en 3d`
7. `llaveros personalizados en 3d`
8. `regalos personalizados en 3d`
9. `figuras impresas en 3d`
10. `impresion 3d resiste el sol`

### Lista 2A — Eje 2: Técnico 3D (Materiales de Ingeniería y Propiedades)
1. `filamento abs vs petg`
2. `filamento asa propiedades`
3. `filamento tpu flexible`
4. `impresion 3d en resina vs filamento`
5. `filamento pla plus`
6. `resistencia termica pla petg abs`
7. `materiales para piezas mecanicas 3d`
8. `engranajes impresos en 3d material`
9. `filamento resistente al calor`
10. `impresion 3d apta alimentos`

### Lista 2B — Eje 2: Técnico 3D (Parámetros, Tolerancias y Post-Procesado)
1. `tolerancias impresion 3d encastres`
2. `altura de capa impresion 3d`
3. `porcentaje de relleno infill 3d`
4. `perimetros vs relleno resistencia`
5. `orientacion de capas resistencia 3d`
6. `soportes en impresion 3d`
7. `como lijar y pintar impresion 3d`
8. `reparar archivo stl con errores`
9. `espesor minimo pared impresion 3d`
10. `encastre a presion impresion 3d`

### Lista 3A — Eje 3: Comercial y Transaccional (Servicios y Repuestos)
1. `servicio de impresion 3d`
2. `impresion 3d a medida`
3. `impresiones 3d argentina`
4. `impresion 3d san juan`
5. `cuanto cuesta imprimir en 3d`
6. `presupuesto impresion 3d`
7. `fabricacion de repuestos en 3d`
8. `repuestos plasticos a medida 3d`
9. `diseno e impresion 3d por encargo`
10. `imprimir archivo stl precio`

### Lista 3B — Eje 3: Comercial y Transaccional (B2B, PyMEs, Prototipado y Mayorista)
1. `prototipado rapido 3d argentina`
2. `impresion 3d para empresas`
3. `llaveros 3d por mayor`
4. `merchandising personalizado en 3d`
5. `souvenirs en 3d por mayor`
6. `medallas y trofeos en 3d`
7. `maquetas arquitectonicas en 3d`
8. `piezas industriales impresion 3d`
9. `modelado 3d a partir de foto`
10. `conviene comprar impresora 3d o encargar`
