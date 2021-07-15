<template>
  <div>
    <h1>This is page 2.</h1>
    {{ hey }}
    <InertiaLink href="/inertia/1">Page 1</InertiaLink>
  </div>
</template>

<script>
import Layout from '../Shared/Layout.vue'

export default {
  layout: Layout,
  props: {
    hey: String
  }
}
</script>
