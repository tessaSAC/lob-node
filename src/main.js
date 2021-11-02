import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Chakra, { CReset } from '@chakra-ui/vue-next'

createApp(App)
  .use(router)
  .use(Chakra, CReset)
  .mount('#app')