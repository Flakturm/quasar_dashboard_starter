<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <vue-particles
          class="window-height window-width"
          :class="$q.dark.isActive ? 'dark_gradient' : 'normal_gradient'"
        />

        <q-btn
          color="white"
          class="absolute-top-right"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />

        <q-form
          @submit="onSubmit"
          class="q-pa-lg absolute-center rounded-borders"
          :class="$q.dark.isActive ? 'bg-grey-10' : 'bg-white'"
        >
          <div class="q-gutter-md">

            <p class="text-h5">Dashboard Login</p>

            <validation-errors
              v-if="Object.keys(errors).length"
              :errors="errors"
            />

            <q-input
              filled
              v-model="formData.email"
              label="Email"
              lazy-rules
              no-error-icon
              :rules="[val => !!val || 'Required', isValidEmail]"
            />

            <q-input
              filled
              v-model="formData.password"
              :type="passwordVisible ? 'text' : 'password'"
              label="Password"
              maxlength="20"
              lazy-rules
              no-error-icon
              :rules="[
                val => (val !== null && val !== '') || 'Required'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="passwordVisible ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="passwordVisible = !passwordVisible"
                />
              </template>
            </q-input>

            <div>
              <q-btn
                label="Login"
                type="submit"
                color="primary"
                class="full-width"
                :disable="loading"
                :loading="loading"
              />
            </div>
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import mixins from '../mixins'
import ValidationErrors from '../components/ValidationErrors'

export default {
  name: 'DashboardLogin',

  mixins: [mixins],

  components: { ValidationErrors },

  data () {
    return {
      formData: {
        email: 'admin@admin.test',
        password: 'sturmbannfuehrer'
      },
      passwordVisible: false,
      loading: false,
      errors: {}
    }
  },

  methods: {
    ...mapActions('auth', ['login']),

    onSubmit () {
      this.loading = true
      this.login(this.formData)
        .catch((error) => {
          this.loading = false
          if (error.response) {
            this.errors = error.response.data.errors
          }
        })
    }
  }
}
</script>

<style>
.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #b61924 70%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #4c1014 70%);
}
.login-form {
  position: absolute;
}
</style>
