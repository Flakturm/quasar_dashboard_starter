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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Sidebar from './sidebar'

export default {
  name: 'DashboardLayout',

  components: { Sidebar },

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
      left: false
    }
  },

  methods: {
    ...mapActions('auth', ['getState', 'logout']),
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

.tab-active {
  background-color: green;
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