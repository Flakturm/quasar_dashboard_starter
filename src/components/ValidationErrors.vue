<template>
  <q-banner
    class="bg-red-5 text-white"
    rounded
  >
    <ul>
      <li
        v-for="(item, index) in validationErrors"
        :key="index"
      >{{ item }}</li>
    </ul>
  </q-banner>
</template>

<script>
export default {
  name: 'ValidationErrors',

  props: {
    errors: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  computed: {
    validationErrors () {
      let errors = Object.values(this.errors)
      errors = errors.flat()
      return errors
    }
  }
}
</script>
