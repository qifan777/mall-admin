<template>
  <div class="attribute-chose">
    <div class="attribute">
      <!-- 显示当属性内的多个属性值，用','连接多个属性值 -->
      <el-input
        class="attribute-values"
        size="small"
        readonly
        :model-value="props.values"
      ></el-input>
    </div>
    <div class="attribute-input">
      <template v-for="(tag, index) in tags" :key="tag">
        <!-- 编辑属性值 -->
        <el-input
          v-if="editIndex === index"
          v-model="editInputValue"
          class="attribute-value-input attribute-value"
          size="small"
          @blur="handleEditConfirm"
          @keydown.enter="handleEditConfirm"
        ></el-input>
        <!-- 显示属性值 -->
        <el-tag
          v-else
          class="attribute-value"
          closable
          :disable-transitions="false"
          @close="handleClose(index)"
          @click="handleEdit(index)"
          >{{ tag }}</el-tag
        >
      </template>
      <!-- 点击新增属性显示输入框，否则显示新增按钮  -->
      <el-input
        v-if="inputVisible"
        ref="inputRef"
        v-model="inputValue"
        class="value-input"
        size="small"
        @blur="handleInputConfirm"
        @keydown.enter="handleInputConfirm"
      ></el-input>
      <el-button v-else size="small" @click="showInput"> + 新增属性值 </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { ElButton, ElInput, ElTag } from 'element-plus'

const props = defineProps({ values: { type: String, required: false, default: '' } })
const emit = defineEmits<{ 'update:values': [values: string] }>()

const tags = computed({
  get: () => {
    return props.values ? props.values.split(',') : []
  },
  set: (values) => {
    emit('update:values', values.join(','))
  }
})
// 编辑属性值
const editIndex = ref(-1)
const editInputValue = ref('')
// 点击属性值标签，显示输入框编辑属性值
const handleEdit = (index: number) => {
  editInputValue.value = tags.value[index]
  editIndex.value = index
}
// 编辑属性值输入框确认
const handleEditConfirm = () => {
  if (editInputValue.value === tags.value[editIndex.value]) {
    return
  }
  tags.value[editIndex.value] = editInputValue.value
  tags.value = [...tags.value]
  editIndex.value = -1
}
// 点击属性值标签的右上角触发删除属性值
const handleClose = (index: number) => {
  tags.value.splice(index, 1)
  tags.value = [...tags.value]
}

// 新增属性值
const inputRef = ref<InstanceType<typeof ElInput>>()
const inputVisible = ref(false)
const inputValue = ref('')
const handleInputConfirm = () => {
  if (inputValue.value) {
    tags.value = [...tags.value, inputValue.value]
  }
  inputVisible.value = false
  inputValue.value = ''
}
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    if (inputRef.value && inputRef.value.input) {
      inputRef.value.input.focus()
    }
  })
}
</script>

<style lang="scss" scoped>
.attribute {
  display: flex;
  justify-content: flex-start;

  .attribute-values {
    width: 100px;
  }
}

.attribute-input {
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .attribute-value-input {
    width: 100px;
  }

  .attribute-value {
    margin-right: 5px;
  }

  .value-input {
    width: 100px;
  }
}
</style>
