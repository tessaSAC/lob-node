import { createApp } from 'vue'
import App from './App.vue'
import Chakra, { CReset } from '@chakra-ui/vue-next'

const app = createApp(App)

app.use(Chakra, CReset)
app.mount('#app')