import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: "DigiDiary",
        short_name: "DigiDiary",
        start_url: ".",
        background_color: "#1971C2",
        theme_color: "#27272A",
        display: "standalone",
        includeAssets: ["/images/favicon.png"],
        description: 'Me being a literal GOAT at programming 🐐',
        icons: [
          {
            src: "/images/favicon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/images/favicon.png",
            sizes: "512x512",
            type: "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
  ],
})
