import 'vite/dynamic-import-polyfill';
import { createInertiaApp, Link } from '@inertiajs/inertia-vue'
import Vue from 'vue'
import vuetify from './Plugins/Vuetify'

import { InertiaProgress } from '@inertiajs/progress'
InertiaProgress.init()

const Pages = import.meta.glob('./Pages/**/*.vue')

Vue.component('InertiaLink', Link)

createInertiaApp({
  resolve: name => Pages['./Pages/'+name+'.vue']().then(bundle => bundle.default),
  setup({ el, app, props }) {
    new Vue({
      vuetify,
      render: h => h(app, props)
    }).$mount(el)
  }
})

// Vue.use(InertiaApp)
// const app = document.getElementById('app')
// new Vue({
//   render: h => h(InertiaApp, {
//     props: {
//       initialPage: JSON.parse(app.dataset.page),
//       resolveComponent: name => Pages['./Pages/'+name+'.vue']().then(bundle => bundle.default)
//     }
//   })
// }).$mount(app)

// createApp({
//     render: () => h(App, {
//         initialPage: JSON.parse(el.dataset.page),
//         resolveComponent: name => Pages['./Pages/'+name+'.vue']().then(bundle => bundle.default),
//     })
// }).use(plugin).mount(el)