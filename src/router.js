import { createRouter, createWebHistory } from 'vue-router'
import AppOverview from './components/AppOverview.vue'
import AddressBook from './components/AddressBook.vue'
import PostcardDesigner from './components/PostcardDesigner.vue'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppOverview,
    },
    {
      path: '/postcard-designer',
      name: 'PostcardDesigner',
      component: PostcardDesigner,
    },
    {
      path: '/address-book',
      component: AddressBook,
    }
  ]
})