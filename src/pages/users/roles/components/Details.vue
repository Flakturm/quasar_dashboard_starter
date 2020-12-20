<template>
  <div>
    <div class="q-mb-md">
      <q-btn
        color="primary"
        icon="keyboard_arrow_left"
        label="Back"
        flat
        @click="$router.go(-1)"
      />
    </div>
    <q-form @submit="onSubmit">
      <q-card>
        <q-card-section>
          <span class="text-h6">{{ title }}</span>
          <q-btn
            color="positive"
            label="Save"
            class="float-right"
            type="submit"
            :disable="loading"
            :loading="loading"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2">Name</div>
          <q-input
            v-model="formData.name"
            outlined
            dense
            lazy-rules
            no-error-icon
            hide-bottom-space
            :rules="[val => !!val || 'Required']"
          />
        </q-card-section>
        <q-separator class="q-my-lg" />
        <q-card-section>
          <div class="text-h6 q-mb-md">權限</div>
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold">頁面</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">允許</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-for="(item, index) in list"
              :key="index"
            >
              <q-item-section>{{ permissions[index] }}</q-item-section>
              <q-item-section>
                <q-checkbox
                  v-model="formData.permissions"
                  :true-value="item"
                  :val="item"
                  false-value=""
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'Details',

  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    title () {
      const type = this.isEdit ? '編輯' : '新增'
      return `${type}角色`
    }
  },

  data () {
    return {
      id: '',
      formData: {
        permissions: []
      },
      list: [],
      permissions: [
        '進入後台',
        '權限管理',
        '管理員',
        '會員',
        '經銷商'
      ],
      loading: false
    }
  },

  mounted () {
    if (this.isEdit) {
      this.id = this.$route.params.id
      this.fetchRole()
    }
    this.fetchPermissions()
  },

  methods: {
    fetchPermissions () {
      this.$axios.get(`${process.env.DASHBOARD_API_PREFIX}/permissions`)
        .then((response) => {
          this.list = response.data
        }).catch((err) => {
          console.log(err.data)
        })
    },

    async fetchRole () {
      const { data } = await this.$axios.get(`${process.env.DASHBOARD_API_PREFIX}/roles/${this.id}`)
      this.formData = data
    },

    onSubmit () {
      this.loading = true

      const axios = this.isEdit ? this.$axios.put(`${process.env.DASHBOARD_API_PREFIX}/roles/${this.id}`, this.formData) : this.$axios.post(`${process.env.DASHBOARD_API_PREFIX}/roles`, this.formData)

      axios
        .then(() => {
          this.$router.replace({ name: 'users.roles' })
        }).catch((err) => {
          this.loading = false
          console.log(err.data)
        })
    }
  },
}
</script>
