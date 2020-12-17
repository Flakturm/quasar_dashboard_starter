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
          @click="userDialog = true"
        />
      </template>
    </q-table>

    <q-dialog
      v-model="userDialog"
      persistent
    >
      <q-card style="width: 400px; max-width: 60vw;">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">
              新增
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
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label class="q-pb-xs">名稱</q-item-label>
                  <q-input
                    v-model="formData.name"
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
                    dense
                    outlined
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    :rules="[isRequired, isValidEmail]"
                  />
                </q-item-section>
              </q-item>
              <q-item class="q-px-none">
                <q-item-section>
                  <q-item-label class="q-pb-xs">密碼</q-item-label>
                  <q-input
                    v-model="formData.password"
                    type="password"
                    dense
                    outlined
                    maxlength="12"
                    lazy-rules
                    no-error-icon
                    hide-bottom-space
                    :rules="[isRequired, isValidPassword]"
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

    showAdminUser () {
      return this.$route.name === 'users.admin'
    },

    url () {
      let url = '/api/dashboard/users'
      url += this.showAdminUser ? '/admin' : ''
      return url
    }
  },

  data () {
    return {
      formData: {},
      errors: {},
      userDialog: false,
      tableLoading: false,
      formLoading: false,
      pagination: {
        filter: '',
        rowsPerPage: 10,
        rowsNumber: 10,
        descending: true,
        sortBy: 'id'
      },
      list: [],
      columns: [
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
        }
      ]
    }
  },

  mounted () {
    this.loadRequest()
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

    onSubmit () {
      this.formLoading = true

      this.$axios.post(this.url, this.formData)
        .then((response) => {
          this.loadRequest()
          this.formLoading = false
          this.userDialog = false
        }).catch((err) => {
          this.errors = err.response.data.errors
          this.formLoading = false
        })
    }
  },

  watch: {
    showAdminUser () {
      this.loadRequest()
    }
  }
}
</script>
