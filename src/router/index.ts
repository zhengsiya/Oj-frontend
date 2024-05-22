import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

routes

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

export default router
