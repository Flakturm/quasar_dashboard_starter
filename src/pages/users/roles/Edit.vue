<template>
  <q-page padding>
    <role-details :is-edit="true" />
  </q-page>
</template>

<script>
import RoleDetails from './components/Details'

export default {
  name: 'EditRole',

  components: { RoleDetails }
}
</script>
