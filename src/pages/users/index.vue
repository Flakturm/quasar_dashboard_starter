<template>
  <q-page padding>

    <user-table
      ref="userTable"
      @load-user-table="loadUserTable"
      @load-trashed-user-table="loadTrashedUserTable"
    />

    <q-list
      bordered
      class="q-mt-md"
    >
      <q-expansion-item
        v-model="expanded"
        expand-separator
        label="已刪除名單"
        @show="loadTrashedUserTable"
      >
        <user-table
          ref="trashedUserTable"
          :trashed="true"
          @load-user-table="loadUserTable"
          @load-trashed-user-table="loadTrashedUserTable"
        />
      </q-expansion-item>
    </q-list>

  </q-page>
</template>

<script>


import UserTable from './components/UserTable'

export default {
  name: 'Users',

  components: { UserTable },

  data () {
    return {
      expanded: false
    }
  },

  methods: {
    loadUserTable () {
      this.$refs.userTable.loadRequest()
    },

    loadTrashedUserTable () {
      this.$refs.trashedUserTable.loadRequest()
    }
  },

  watch: {
    $route: {
      handler: function () {
        this.expanded = false
      }
    }
  },
}
</script>
