<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { useRoleStore } from '../store/role-store'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { api } from '@/utils/api-instance'
import FooterButton from '@/components/base/dialog/footer-button.vue'
import type { FormInstance, FormRules } from 'element-plus'
import MenuTree from '@/views/menu/components/menu-tree.vue'
import type { MenuTreeDto } from '@/typings'
import { useHomeStore } from '@/stores/home-store'

const roleStore = useRoleStore()
const { closeDialog, reloadTableData } = roleStore
const { updateForm, dialogData } = storeToRefs(roleStore)
const updateFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof updateForm>>({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
})
const init = async () => {
  dialogData.value.title = '编辑'
  const res = await api.roleController.findById({ id: updateForm.value.id || '' })
  updateForm.value = {
    ...res,
    menuIds: res.menusView.map((menu) => menu.id)
  }
}
watch(
  () => dialogData.value.visible,
  (value) => {
    if (value) {
      init()
    }
  },
  { immediate: true }
)
const handleConfirm = () => {
  updateFormRef.value?.validate(
    assertFormValidate(() => {
      api.roleController.save({ body: updateForm.value }).then(async (res) => {
        assertSuccess(res).then(() => {
          closeDialog()
          reloadTableData()
        })
      })
    })
  )
}
const homeStore = useHomeStore()
const handleNodeCheckChange = (
  value1: MenuTreeDto,
  value2: { checkedNodes: MenuTreeDto[]; checkedKeys: string[] }
) => {
  updateForm.value.menuIds = value2.checkedKeys
}
</script>
<template>
  <div class="update-form">
    <el-form labelWidth="120" class="form" ref="updateFormRef" :model="updateForm" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="updateForm.name"></el-input>
      </el-form-item>
    </el-form>
    <el-form-item label="菜单">
      <menu-tree
        :key="updateForm.id"
        :menu-tree="homeStore.menuTrees"
        show-checkbox
        check-strictly
        nodeKey="id"
        @check="handleNodeCheckChange"
        :default-checked-keys="updateForm.menuIds"
      >
        <template v-slot:default="{ node }">{{ node.label }} </template>
      </menu-tree>
    </el-form-item>
    <FooterButton @close="closeDialog" @confirm="handleConfirm"></FooterButton>
  </div>
</template>

<style lang="scss" scoped>
.update-form {
  margin-right: 30px;
}
</style>
