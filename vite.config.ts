import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement (depuis .env ou Vercel Settings)
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Remplace `process.env.API_KEY` par sa valeur lors du build
      // Cela empêche l'erreur "process is not defined" dans le navigateur
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  }
})