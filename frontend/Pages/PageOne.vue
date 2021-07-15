<template>
  <div>
    <h1>Hey, page 1!</h1>
    {{ hello }}
    <InertiaLink href="/inertia/2">Page 2</InertiaLink>
  </div>
</template>

<script>
import Layout from '../Shared/Layout.vue'

export default {
  layout: Layout,
  props: {
    hello: String
  }
}
</script>
