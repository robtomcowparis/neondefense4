import { defineConfig } from 'vite'
import { resolve } from 'path'
import { existsSync } from 'fs'

// Resolve /subgame/ URLs to their index.html in the public dir
function publicDirIndex() {
  return {
    name: 'public-dir-index',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url.endsWith('/') && req.url !== '/') {
          const filePath = resolve(__dirname, 'src/public' + req.url + 'index.html')
          if (existsSync(filePath)) {
            req.url += 'index.html'
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  root: 'src',
  plugins: [publicDirIndex()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        game: resolve(__dirname, 'src/game.html'),
      },
    },
  },
})