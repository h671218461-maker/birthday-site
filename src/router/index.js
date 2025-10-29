import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/wishes',
    name: 'Wishes',
    component: () => import('../pages/WishesPage.vue')
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../pages/GalleryPage.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../pages/MessagePage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
