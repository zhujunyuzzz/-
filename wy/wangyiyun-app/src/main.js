import { createApp } from 'vue'
import App from './App.vue'
import getVant from './plugins';
import router from './route'
import store from './store'
const app = createApp(App)
getVant(app)
app.use(store)
app.use(router)
app.mount('#app')





