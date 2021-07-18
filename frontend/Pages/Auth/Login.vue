<template>
  <v-app>
    <v-container
      style="height: 100vh;"
    > 
      <v-row
        style="height: 100%;"
        justify="center"
        align="center"
      >
        <v-col
          sm="8"
          md="6"
          lg="4"
        >
          <v-text-field
            v-model="email"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>

          <v-btn
            color="primary"
            @click="login"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login() {
      this.$inertia.post('/login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
