<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <custom-and-default-icon :type="parentItem.icon || ''" />
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        ></side-menu-item>
        <menu-item
          v-else
          :name="getNameOrHref(item, true)"
          :key="`menu-${item.children[0].name}`"
        >
          <custom-and-default-icon :type="item.children[0].icon || ''" />
          <span>{{ showTitle(item.children[0]) }}</span>
        </menu-item>
      </template>
      <template v-else>
        <side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        ></side-menu-item>
        <menu-item
          v-else
          :name="getNameOrHref(item)"
          :key="`menu-${item.name}`"
        >
          <custom-and-default-icon :type="item.icon || ''" />
          <span>{{ showTitle(item) }}</span>
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component } from 'vue-property-decorator'
import Mixin from './Mixin'
import ItemMixin from './ItemMixin'
import CustomAndDefaultIcon from '@/components/icon/CustomAndDefaultIcon.vue'
@Component({
  components: { CustomAndDefaultIcon }
})
export default class SideMenuItem extends mixins(Mixin, ItemMixin) {
  name = 'SideMenuItem';
}
</script>
