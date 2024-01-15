<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElOption, ElSelect } from 'element-plus'
export interface OptionItem {
  label: string
  value: string
}
const props = withDefaults(
  defineProps<{
    modelValue: string[] | string | undefined
    queryOptions: (query: string) => Promise<Record<string, any>[]>
    multiple?: boolean
    labelProp: string
    valueProp?: string
  }>(),
  {
    multiple: false,
    valueProp: 'id',
    modelValue: ''
  }
)
const emit = defineEmits<{ 'update:modelValue': [value: string | string[]] }>()

const options = ref<OptionItem[]>([])
const loading = ref(false)
const remoteMethod = (keyword: string, enforce: boolean = false) => {
  if (keyword || enforce) {
    loading.value = true
    props.queryOptions(keyword.trim()).then((res) => {
      options.value = res.map((row) => {
        return {
          label: row[props.labelProp] as string,
          value: row[props.valueProp]
        } satisfies OptionItem
      })
      loading.value = false
    })
  }
}
const handleChange = (value: string[] | string) => {
  emit('update:modelValue', value)
}

onMounted(() => {
  remoteMethod('', true)
})
</script>
<template>
  <el-select
    :model-value="modelValue"
    clearable
    collapseTags
    filterable
    :multiple="multiple"
    remote
    :remote-show-suffix="true"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="handleChange"
  >
    <el-option
      :key="option.value"
      :value="option.value"
      :label="option.label"
      v-for="option in options"
    ></el-option>
  </el-select>
</template>
