import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

const app = createApp(App)
const rawMessages = import.meta.glob('@/lang/*.yaml', { eager: true }) as Record<
  string,
  { default: Record<string, string> }
>
const messages = Object.fromEntries(
  Object.entries(rawMessages).map(([fileName, exports]) => {
    const locale = fileName.match(/.*\/lang\/(.+)\.yaml/)?.[1]

    return [locale, exports.default]
  }),
)

console.log(messages)

app.use(createI18n({ locale: 'en', messages }))
app.use(createPinia())
app.use(router)

app.mount('#app')
