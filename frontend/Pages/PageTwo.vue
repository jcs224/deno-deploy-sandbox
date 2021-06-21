<template>
  <h1>This is page 2.</h1>
  {{ hey }}
  <inertia-link href="/inertia/1">Page 1</inertia-link>
</template>

<script>
export default {
  props: {
    hey: String
  }
}
</script>
