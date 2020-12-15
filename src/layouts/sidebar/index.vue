<template>
  <div>
    <q-item
      v-for="(item, index) in itemsWithoutChildren"
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

    <div v-if="itemsWithChildren.length > 0">
      <q-expansion-item
        v-for="(itemWithChildren, itemWithChildrenIndex) in itemsWithChildren"
        :key="itemWithChildrenIndex"
        :icon="itemWithChildren.meta.icon"
        :label="itemWithChildren.meta.title"
        class="q-ma-sm"
        :default-opened="$route.name.includes(itemWithChildren.name)"
      >
        <q-item
          v-for="(child, childIndex) in itemWithChildren.children"
          :key="childIndex"
          :to="{ name: child.name }"
          active-class="tab-active"
          exact
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
export default {
  name: 'Sidebar',

  props: {
    items: {
      type: Array
    }
  },

  computed: {
    itemsWithoutChildren () {
      return this.items.filter(item => item.children.length < 2)
    },

    itemsWithChildren () {
      return this.items.filter(item => item.children.length > 1)
    }
  }
}
</script>

<style>
</style>