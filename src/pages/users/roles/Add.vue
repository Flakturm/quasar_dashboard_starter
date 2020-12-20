<template>
  <q-page padding>
    <role-details />
  </q-page>
</template>

<script>
import RoleDetails from './components/Details'

export default {
  name: 'AddRole',

  components: { RoleDetails }
}
</script>
