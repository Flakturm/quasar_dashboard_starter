<template>
  <q-page padding>
    <q-table
      :title="pageTitle"
      :data="list"
      :columns="columns"
      :loading="tableLoading"
      :filter="pagination.filter"
      @request="onRequest"
      row-key="id"
      binary-state-sort
      :pagination.sync="pagination"
      no-data-label="無資料"
    >
      <template v-slot:top-right>
        <q-input
          v-model="pagination.filter"
          outlined
          dense
          debounce="300"
          clearable
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-md"
          color="orange"
          icon="archive"
          no-caps
          @click="exportTable"
        />

        <q-btn
          class="q-ml-md"
          color="positive"
          label="新增"
          @click="dialog = true"
        />
      </template>

      <template v-slot:body-cell-roles="props">
        <q-td :props="props">
          <q-chip
            color="orange-7"
            text-color="white"
            :label="props.row.roles[0]"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              dense
              color="primary"
              icon="edit"
              @click="handleEdit(props.row)"
            />
            <q-btn
              dense
              color="red"
              icon="delete"
              @click="onDelete(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>

    <q-dialog
      v-model="dialog"
      @hide="clearFormData"
      persistent
    >
      <q-card style="width: 400px; max-width: 60vw;">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">
              {{ dialogTitle }}
              <q-btn
                round
                flat
                dense
                icon="close"
                class="float-right"
                color="grey-8"
                v-close-popup
              ></q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section v-if="Object.keys(errors).length">
            <validation-errors :errors="errors" />
          </q-card-section>

          <q-card-section>
            <q-list>
              <q-item
                class="q-px-none"
                v-if="!isAdminPage && editMode"
              >
                <q-item-section>
                  <q-item-label>轉成{{ type === 'vendors' ? '會員' : '經銷商' }}</q-item-label>
                  <q-toggle
                    v-model="formData.member_vendor_toggle"
                    color="primary"
                  />
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label class="q-pb-xs">名稱</q-item-label>
                  <q-input
                    v-model="formData.name"
                    clearable
                    dense
                    outlined
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    :rules="[isRequired]"
                  />
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label class="q-pb-xs">Email</q-item-label>
                  <q-input
                    v-model="formData.email"
                    clearable
                    dense
                    outlined
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    :rules="[isRequired, isValidEmail]"
                  />
                </q-item-section>
              </q-item>
              <q-item
                class="q-px-none"
                v-if="isAdminPage"
              >
                <q-item-section>
                  <q-item-label class="q-pb-xs">角色</q-item-label>
                  <q-select
                    v-model="formData.roles"
                    :options="roles"
                    clearable
                    outlined
                    dense
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    :rules="[isRequired]"
                  />
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label class="q-pb-xs">密碼</q-item-label>
                  <q-input
                    v-model="formData.password"
                    type="password"
                    clearable
                    dense
                    outlined
                    maxlength="12"
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    :rules="editMode ? [formData.password ? isValidPassword : ''] : [isRequired, isValidPassword]"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="送出"
              color="primary"
              type="submit"
              :disable="tableLoading"
              :loading="tableLoading"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import mixinExport from 'src/mixins/export'
import mixinValidation from 'src/mixins/validation'
import ValidationErrors from 'components/ValidationErrors'

export default {
  name: 'Users',

  mixins: [mixinExport, mixinValidation],

  components: { ValidationErrors },

  computed: {
    pageTitle () {
      return this.$route.meta.title
    },

    dialogTitle () {
      const title = this.editMode ? '編輯' : '新增'
      return title + this.pageTitle
    },

    type () {
      return this.$route.name.replace('users.', '')
    },

    isAdminPage () {
      return this.type === 'admin'
    },

    columns () {
      let columns = [
        {
          label: 'Id',
          name: 'id',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          label: '加入日期',
          name: 'created_at',
          field: 'created_at',
          align: 'left',
          sortable: true
        },
        {
          label: 'Email',
          name: 'email',
          field: 'email',
          align: 'left',
          sortable: true
        },
        {
          label: '名稱',
          name: 'name',
          field: 'name',
          align: 'left'
        },
        {
          label: '',
          name: 'action',
          field: 'action'
        }
      ]

      if (this.isAdminPage) {
        columns.splice(4, 0, {
          label: '角色',
          name: 'roles',
          field: 'roles',
          align: 'center'
        })
      }

      return columns
    },

    url () {
      return `${process.env.DASHBOARD_API_PREFIX}/users/${this.type}`
    }
  },

  data () {
    return {
      formData: {},
      roles: [],
      editMode: false,
      errors: {},
      dialog: false,
      tableLoading: false,
      formLoading: false,
      pagination: {
        filter: '',
        rowsPerPage: 10,
        rowsNumber: 10,
        descending: true,
        sortBy: 'id'
      },
      list: []
    }
  },

  mounted () {
    this.loadRequest()

    if (this.isAdminPage) this.fetchRoles()
  },

  methods: {
    loadRequest () {
      this.onRequest({
        pagination: this.pagination
      })
    },

    onRequest (props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending
      this.fetchList()
    },

    fetchList () {
      this.tableLoading = true

      this.$axios.get(this.url, { params: this.pagination })
        .then((response) => {
          const result = response.data
          this.list = result.data
          this.pagination.rowsNumber = result.total
          this.tableLoading = false
        }).catch((err) => {
          this.tableLoading = false
        })
    },

    async fetchRoles () {
      const { data } = await this.$axios.get(`${process.env.DASHBOARD_API_PREFIX}/roles`)
      this.roles = data.map(item => {
        return [item.name]
      })
    },

    onSubmit () {
      this.formLoading = true

      const axios = this.editMode ? this.$axios.put(`${this.url}/${this.formData.id}`, this.formData) : this.$axios.post(this.url, this.formData)
      axios.then((response) => {
        this.loadRequest()
        this.formLoading = false
        this.dialog = false
      }).catch((err) => {
        this.errors = err.response.data.errors
        this.formLoading = false
      })

    },

    async handleEdit (item) {
      this.editMode = true
      this.dialog = true

      const { data } = await this.$axios.get(`${this.url}/${item.id}`)
      this.formData = data
    },

    onDelete (item) {
      this.$q.dialog({
        title: `刪除${this.pageTitle}`,
        message: `確定刪除 ${item.name}?`,
        ok: {
          label: '刪除',
          color: 'negative'
        },
        cancel: '取消'
      }).onOk(() => {
        this.$axios.delete(`${this.url}/${item.id}`)
          .then(() => {
            this.loadRequest()
            this.$q.notify({
              message: `${item.name} 已刪除`,
              color: 'positive',
              icon: 'check'
            })
          })

      })
    },

    clearFormData () {
      this.editMode = false
      this.errors = {}
      this.formData = {}
    }
  },

  watch: {
    '$route.name': {
      handler: function (val) {
        this.pagination.filter = ''
        this.loadRequest()
      }
    }
  }
}
</script>
