<template>
  <q-layout view="lHh LpR lFf">
    <q-header
      reveal
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <q-btn
          @click="left = !left"
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
        />

        <q-space />

        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn
            dense
            flat
            no-wrap
          >
            <q-avatar
              rounded
              size="3em"
            >
              <img :src="avatar">
            </q-avatar>
            <q-icon
              name="arrow_drop_down"
              size="16px"
            />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>{{ details.name }}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  @click="dialog = true"
                >
                  <q-item-section>
                    Change password
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section @click="logout">Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      side="left"
      v-model="left"
      bordered
      show-if-above
      class="text-white"
      :width="250"
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px);padding:10px;">
          <q-toolbar>
            <q-toolbar-title>Dashboard</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area class="full-height">
            <q-list padding>
              <sidebar />
            </q-list>
          </q-scroll-area>
        </div>
      </div>

    </q-drawer>

    <q-dialog
      v-model="dialog"
      @hide="onReset"
    >
      <q-card>
        <q-form @submit="onSubmit">
          <q-card-section v-if="Object.keys(errors).length">
            <validation-errors :errors="errors" />
          </q-card-section>
          <q-card-section>
            <q-input
              filled
              v-model="formData.password"
              :type="passwordVisible ? 'text' : 'password'"
              label="Password"
              maxlength="20"
              lazy-rules
              no-error-icon
              :rules="[isRequired, isValidPassword]"
            >
              <template v-slot:append>
                <q-icon
                  :name="passwordVisible ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="passwordVisible = !passwordVisible"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions
            class="q-mt-none"
            align="right"
          >
            <q-btn
              flat
              label="Close"
              v-close-popup
            />
            <q-btn
              label="Save"
              type="submit"
              color="primary"
              :disable="loading"
              :loading="loading"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinValidation from 'src/mixins/validation'
import Sidebar from './sidebar'
import ValidationErrors from 'components/ValidationErrors'

export default {
  name: 'DashboardLayout',

  mixins: [mixinValidation],

  components: { Sidebar, ValidationErrors },

  computed: {
    ...mapState('auth', ['details']),

    avatar () {
      return this.details.avatar ? this.details.avatar : 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Sunglasses&hatColor=Red&facialHairType=BeardMagestic&facialHairColor=Brown&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Light'
    }
  },

  mounted () {
    this.getState()
  },

  data () {
    return {
      left: false,
      dialog: false,
      formData: {},
      errors: {},
      passwordVisible: false,
      loading: false
    }
  },

  methods: {
    ...mapActions('auth', ['updatePassword', 'getState', 'logout']),

    onSubmit () {
      this.clearError()
      this.loading = true
      this.updatePassword(this.formData)
        .then(() => {
          this.loading = false
          this.$q.notify({
            message: '更新成功',
            color: 'positive',
            icon: 'check'
          })
          this.dialog = false
        }).catch(error => {
          this.loading = false
          if (error.response) {
            this.errors = error.response.data.errors
          }
        })
    },

    onReset () {
      this.formData = {}
      this.clearError()
    },

    clearError () {
      this.errors = {}
    }
  }
}
</script>

<style>
.q-drawer {
  background-image: url("/images/kilt-rock.jpg") !important;
  background-size: cover !important;
  background-position: 25%;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(32, 106, 80) 15%,
    rgb(21, 57, 102) 70%
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>