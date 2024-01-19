<template>
  <div class="attribute-section">
    <div class="attribute-wrapper" v-for="(attribute, index) in attributes" :key="index">
      <el-button
        class="close-btn"
        type="warning"
        size="small"
        circle
        @click="deleteAttribute(index)"
      >
        <el-icon>
          <close></close>
        </el-icon>
      </el-button>
      <el-form label-width="80" label-position="left">
        <el-form-item label="属性名称">
          <el-input style="width: 100px" v-model="attributes[index].name" size="small"> </el-input>
        </el-form-item>
        <el-form-item label="属性值">
          <values-input v-model="attributes[index].values"></values-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" size="small" class="plus" @click="addAttribute">
      <el-icon>
        <plus></plus>
      </el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Close, Plus } from '@element-plus/icons-vue'
import ValuesInput from '@/views/product/components/values-input.vue'
import type { Attribute } from '@/apis/__generated/model/static'

const props = defineProps<{ modelValue?: Attribute[] }>()
const emit = defineEmits<{
  change: [data: Attribute[]]
  'update:modelValue': [data: Attribute[]]
}>()
const attributes = ref<Attribute[]>([])
const deleteAttribute = (index: number) => {
  attributes.value.splice(index, 1)
}
const addAttribute = () => {
  attributes.value.push({
    name: '',
    values: []
  })
}
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      attributes.value = newValue
    }
  }
)
watch(
  () => attributes.value,
  () => {
    emit('update:modelValue', attributes.value)
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.attribute-section {
  width: 100%;
  .plus {
    margin-top: 20px;
  }
  .attribute-wrapper {
    margin-bottom: 20px;
    border: rgba(114, 207, 222, 0.5) 1px dashed;
    padding: 10px;
    position: relative;
    margin-top: 20px;
    .close-btn {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
