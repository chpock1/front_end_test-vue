import { createRouter, createWebHistory } from 'vue-router'
import testIndex from '../components/testIndex.vue'
import testForm from '../components/form/testFormIndex.vue'
import formSend from '../components/form/testFormSend.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: testIndex,
    children: [
      {
        path: 'form',
        name: 'form',
        component: testForm,
      },
      {
        path: 'formSend',
        name: 'formSend',
        component: formSend,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
