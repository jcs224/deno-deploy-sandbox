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
          <v-alert
            color="red"
            outlined
            v-if="errors"
            dismissible
          >
            {{ errors }}
          </v-alert>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              name="email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              type="password"
            ></v-text-field>

            <v-btn
              color="primary"
              type="submit"
              :loading="loggingIn"
            >
              Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: {
    errors: String
  },

  data() {
    return {
      email: '',
      password: '',
      loggingIn: false,
    }
  },

  methods: {
    login() {
      var self = this
      this.loggingIn = true
      this.$inertia.post('/login', {
        email: this.email,
        password: this.password
      }, {
        onError() {
          self.loggingIn = false
        }
      })
    }
  }
}
</script>
