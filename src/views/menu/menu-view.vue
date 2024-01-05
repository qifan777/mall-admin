<script lang="ts" setup>
import MenuTable from './components/menu-table.vue'
import MenuQuery from './components/menu-query.vue'
import MenuDialog from './components/menu-dialog.vue'
import MenuTree from '@/views/menu/components/menu-tree.vue'
import { useMenuStore } from './store/menu-store'
import { storeToRefs } from 'pinia'
import type { MenuTreeDto } from '@/typings'
import { DictConstants } from '@/typings/dict-constants'
const menuStore = useMenuStore()
const { createForm, menuTreeList } = storeToRefs(menuStore)
menuStore.reloadMenuTree()
const handleCreate = (data: MenuTreeDto) => {
  menuStore.openDialog('CREATE')
  createForm.value = { ...menuStore.initForm }
  createForm.value.parentId = data.id
}
</script>
<template>
  <div class="menu-view">
    <div class="menu-tree">
      <menu-tree :menu-tree="menuTreeList">
        <template v-slot="{ node, data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="primary"
                link
                size="small"
                @click="handleCreate(data)"
                v-if="data.menuType === DictConstants.MenuType.DIRECTORY"
                >添加子菜单</el-button
              >
            </span>
          </span>
        </template>
      </menu-tree>
    </div>
    <div class="menu-manage">
      <MenuQuery></MenuQuery>
      <MenuDialog></MenuDialog>
      <MenuTable></MenuTable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-view {
  display: flex;
  background: white;
  padding: 20px;
  border-radius: 5px;
  .menu-tree {
    width: 300px;
  }
  .menu-manage {
    width: 100%;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
