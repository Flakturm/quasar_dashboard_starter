<template>
  <q-page padding>
    <q-card>
      <q-table
        :title="title"
        :data="list"
        :columns="columns"
        :loading="loading"
        hide-bottom
        flat
      >
        <template v-slot:top-right>
          <q-btn
            class="q-ml-md"
            color="positive"
            label="Add"
            :to="{ name: 'users.roles.add' }"
          />
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                dense
                color="primary"
                icon="edit"
                :to="{ name: 'users.roles.edit', params: { id: props.row.id } }"
              />
              <q-btn
                v-if="props.rowIndex > 0"
                dense
                color="red"
                icon="delete"
                @click="onDelete(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Permissions',

  computed: {
    title () {
      return this.$route.meta.title
    },
  },

  data () {
    return {
      list: [],
      columns: [
        {
          label: 'Roles',
          name: 'name',
          field: 'name',
          align: 'left'
        },
        {
          label: '',
          name: 'action',
          field: 'action'
        }
      ],
      loading: false
    }
  },

  mounted () {
    this.fetchList()
  },

  methods: {
    fetchList () {
      this.loading = true

      this.$axios.get(`${process.env.DASHBOARD_API_PREFIX}/roles`)
        .then((response) => {
          this.list = response.data
          this.loading = false
        }).catch((err) => {
          this.loading = false
        })
    },

    onDelete (item) {
      this.$q.dialog({
        title: `刪除`,
        message: `確定刪除 ${item.name}?`,
        ok: {
          label: '刪除',
          color: 'negative'
        },
        cancel: '取消'
      }).onOk(() => {
        this.$axios.delete(`${process.env.DASHBOARD_API_PREFIX}/roles/${item.id}`)
          .then(() => {
            this.fetchList()
            this.$q.notify({
              message: `${item.name} 已刪除`,
              color: 'positive',
              icon: 'check'
            })
          })

      })
    }
  },
}
</script>
