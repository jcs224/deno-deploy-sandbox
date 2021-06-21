<template>
  <h1>Hey, page 1!</h1>
  {{ hello }}
  <inertia-link href="/inertia/2">Page 2</inertia-link>
</template>

<script>
export default {
  props: {
    hello: String
  }
}
</script>
