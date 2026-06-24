import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ourTeam: resolve(__dirname, 'our-team.html'),
        about: resolve(__dirname, 'about.html'),
        missionVision: resolve(__dirname, 'mission-vision.html'),
        search: resolve(__dirname, 'search.html'),
        mediaCenter: resolve(__dirname, 'media-center.html'),
        getInvolved: resolve(__dirname, 'get-involved.html'),
        donation: resolve(__dirname, 'donation.html'),
        partner: resolve(__dirname, 'partner.html'),
        volunteer: resolve(__dirname, 'volunteer.html'),
        mentor: resolve(__dirname, 'mentor.html'),
        news: resolve(__dirname, 'news.html'),
        atw5Highlights: resolve(__dirname, 'atw-5-highlights.html'),
      },
    },
  },
})
