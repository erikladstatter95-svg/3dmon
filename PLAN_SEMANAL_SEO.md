# PLAN_SEMANAL_SEO.md — Sistema Operativo Semanal (`3dmon.shop`)

> **Propósito:** Hoja de ruta semanal para posicionar a **3DMON (`https://3dmon.shop/`)** lo más alto posible en Google, Bing y asistentes de IA (ChatGPT Search, Perplexity, Gemini), maximizando consultas y pedidos por WhatsApp (`+54 264 411-3760`).

---

## 1. Cadencia Semanal en 3 Ejes + Comando Dominical

| Día | Eje Estratégico | Foco Editorial y Comercial | Regla Operativa |
| :--- | :--- | :--- | :--- |
| **Lunes** | **Eje 1: Principiantes en el Mundo 3D** | Guías introductorias: PLA vs PETG, formatos STL/OBJ/3MF, cuidados, ideas útiles y errores al pedir piezas | Boost (si hay URL >= 14d en pos. 4–20) + 1 guía nueva + interlinking |
| **Martes** | **Eje 2: Información Técnica 3D** | Autoridad E-E-A-T: tolerancias y encastres, altura de capa, infill y perímetros, ABS, ASA, TPU, resinas y post-procesado | Boost (>= 14d) + 1 guía técnica nueva + interlinking |
| **Miércoles** | **Eje 3: Comercial y Transaccional** | Conversión B2C/B2B: servicio en Argentina/San Juan, repuestos discontinuados, prototipado PyMEs, llaveros/merchandising por mayor | Boost (>= 14d) + 1 landing/artículo comercial + CTA directo a WhatsApp |
| **Jueves** | **Eje 1: Principiantes en el Mundo 3D** | Dudas frecuentes de compradores nuevos, archivos, acabados y usos cotidianos | Boost (>= 14d) + 1 guía nueva + interlinking |
| **Viernes** | **Eje 2: Información Técnica 3D** | Propiedades térmicas, mecánicas, orientación de capas, resistencia al sol y piezas funcionales | Boost (>= 14d) + 1 guía técnica nueva + interlinking |
| **Sábado** | **Eje 3: Comercial y Transaccional** | Comparativas de costo (imprimir por encargo vs comprar impresora), pedidos mayoristas y casos industriales | Boost (>= 14d) + 1 artículo comercial + interlinking |
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

### Tanda 2 — Viernes 27/11 (10 artículos: 3 Principiantes + 4 Técnico + 3 Comercial)
11. **`[principiantes]`** `/blog/como-funciona-impresora-3d/` — `como funciona una impresora 3d` (`500/mes` · Medio `45`)
12. **`[principiantes]`** `/blog/ideas-para-imprimir-3d/` — `ideas para imprimir en 3d` (`500/mes` · Bajo `18`)
13. **`[principiantes]`** `/blog/que-es-filamento-pla/` — `que es el filamento pla` / `que es material pla` (`50/mes` · Bajo `6`)
14. **`[tecnico]`** `/blog/filamento-abs-vs-petg/` — `filamento abs vs petg` (`50/mes` · Bajo `29`)
15. **`[tecnico]`** `/blog/filamento-asa-propiedades-exterior/` — `filamento asa propiedades` (`50/mes` · Bajo `29`)
16. **`[tecnico]`** `/blog/filamento-resistente-al-calor/` — `pla resistente al calor` / `filamento resistente al calor` (`50/mes` · Bajo `29`)
17. **`[tecnico]`** `/blog/impresion-resina-vs-filamento/` — `impresion 3d resina` / `que es fdm en impresion 3d` (`5.000/mes` + Bajo `12`)
18. **`[comercial]`** `/blog/precio-presupuesto-impresion-3d/` — `precio impresion 3d` / `presupuesto impresion 3d` (`5.000/mes` + Bajo `29`)
19. **`[comercial]`** `/blog/impresion-3d-prototipos-pymes/` — `impresion 3d prototipos` (`50/mes` · Bajo `25`)
20. **`[comercial]`** `/blog/impresion-3d-para-empresas/` — `impresion 3d para empresas` / `empresas impresion 3d` (`50/mes` · Medio `39`)

### Tanda 3 — Sábado 28/11 (10 artículos: 3 Principiantes + 3 Técnico + 4 Comercial)
21. **`[principiantes]`** `/blog/errores-comunes-impresion-3d/` — `errores al imprimir en 3d` / `que es el warping` (`50/mes` · Bajo `0`)
22. **`[principiantes]`** `/blog/macetas-figuras-impresas-3d/` — `macetas impresas en 3d` / `figuras impresas en 3d` (`500/mes` + Bajo `16`)
23. **`[principiantes]`** `/blog/que-imprimir-para-vender/` — `que imprimir en 3d para vender` (`500/mes` · Bajo `14`)
24. **`[tecnico]`** `/blog/tolerancias-encastres-impresion-3d/` — tolerancias, encastres, perímetros e infill (E-E-A-T + Query Fan-Out)
25. **`[tecnico]`** `/blog/filamento-pla-plus-ventajas/` — `filamento pla plus` (`50/mes`)
26. **`[tecnico]`** `/blog/impresion-3d-transparente-multicolor/` — `impresion 3d transparente` / `impresion 3d multicolor` (`500/mes` · Medio `50`)
27. **`[comercial]`** `/blog/fabricacion-repuestos-medida-3d/` — `impresion 3d a medida` / repuestos discontinuados (`500/mes` `a pedido`)
28. **`[comercial]`** `/blog/impresion-maquetas-arquitectura-3d/` — `impresion 3d maquetas` / `impresiones para maquetas` (`50/mes` · Bajo `3`)
29. **`[comercial]`** `/blog/comprar-impresora-vs-encargar/` — `cuanto sale una impresora 3d` / `precio hora impresion 3d` (`500/mes` + Medio `50`)
30. **`[comercial]`** `/blog/impresion-3d-personalizada-pedido/` — `impresiones 3d a pedido` / diseño desde fotos (`500/mes`)

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
