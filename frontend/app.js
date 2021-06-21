import 'vite/dynamic-import-polyfill';
import { App, plugin } from '@inertiajs/inertia-vue3'
import { createApp, h } from 'vue'

import { InertiaProgress } from '@inertiajs/progress'
InertiaProgress.init()

let Pages = import.meta.glob('./Pages/**/*.vue')

const el = document.getElementById('app')

createApp({
    render: () => h(App, {
        initialPage: JSON.parse(el.dataset.page),
        resolveComponent: name => Pages['./Pages/'+name+'.vue']().then(bundle => bundle.default),
    })
}).use(plugin).mount(el)