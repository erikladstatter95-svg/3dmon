import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

function getBlogArticleInputs() {
  const blogDir = path.resolve(rootDir, 'blog')
  const inputs = {}
  if (!fs.existsSync(blogDir)) return inputs

  for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue
    const articleHtml = path.resolve(blogDir, entry.name, 'index.html')
    if (fs.existsSync(articleHtml)) {
      const key = `blog_${entry.name.replace(/[^a-zA-Z0-9_]/g, '_')}`
      inputs[key] = articleHtml
    }
  }
  return inputs
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(rootDir, 'index.html'),
        blog: path.resolve(rootDir, 'blog/index.html'),
        not_found: path.resolve(rootDir, '404.html'),
        ...getBlogArticleInputs(),
      },
    },
  },
})
