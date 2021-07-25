<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item-group v-model="group">
          <v-list-item link v-for="m in menu" :key="m.name" @click="visit(m.link)">
            <v-list-item-content>
              <v-list-item-title>{{ m.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Deno Deploy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn 
        color="info" 
        @click="logout"
        :loading="loggingOut"
      >Logout</v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      group: null,
      loggingOut: false,
      menu: [
        {
          name: 'Dashboard',
          link: '/dashboard'
        },
        {
          name: 'Inertia 1',
          link: '/inertia/1',
        },
        {
          name: 'Inertia 2',
          link: '/inertia/2',
        }
      ] 
    }),

    methods: {
      logout() {
        this.loggingOut = true
        this.$inertia.post('/logout', {
          _skipSession: 'true'
        })
      },

      visit(link) {
        this.$inertia.visit(link)
      }
    },

    watch: {
      group() {
        if (this.$vuetify.breakpoint.mobile) {
          this.drawer = false
        }
      }
    }
  }
</script>