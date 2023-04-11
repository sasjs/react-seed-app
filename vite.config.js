import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  root: 'src',
  build: {
    // Relative to the root
    outDir: '../build',
    emptyOutDir: true
  },
  publicDir: '../public',
  plugins: [react(), viteTsconfigPaths()]
})
