<template>
  <div>
    <q-item
      v-for="(item, index) in routesWithoutChildren"
      :key="index"
      :to="{ name: item.name }"
      active-class="tab-active"
      exact
      class="q-ma-sm rounded-borders"
      clickable
      v-ripple
    >
      <q-item-section
        avatar
        v-if="item.meta.icon"
      >
        <q-icon :name="item.meta.icon" />
      </q-item-section>

      <q-item-section>
        {{ item.meta.title }}
      </q-item-section>
    </q-item>

    <div v-if="routesWithChildren.length > 0">
      <q-expansion-item
        v-for="(routeWithChildren, routeWithChildrenIndex) in routesWithChildren"
        :key="routeWithChildrenIndex"
        :icon="routeWithChildren.meta.icon"
        :label="routeWithChildren.meta.title"
        class="q-ma-sm"
        :default-opened="$route.name.includes(routeWithChildren.name)"
      >
        <q-item
          v-for="(child, childIndex) in routeWithChildren.children"
          :key="childIndex"
          :to="{ name: child.name }"
          active-class="tab-active"
          class="q-ma-sm rounded-borders"
          clickable
          v-ripple
        >
          <q-item-section
            avatar
            v-if="child.meta.icon"
          >
            <q-icon :name="child.meta.icon" />
          </q-item-section>

          <q-item-section>
            {{ child.meta.title }}
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',

  computed: {
    ...mapState('permission', ['routesWithChildren', 'routesWithoutChildren'])
  },
}
</script>

<style lang="sass">
.tab-active
  background-color: green
</style>