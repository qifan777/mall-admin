<script lang="ts" setup>
import { toRefs } from 'vue'
import { useAgentLevelStore } from '../store/agent-level-store'
import { storeToRefs } from 'pinia'
import DictSelect from '@/components/dict/dict-select.vue'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'

const agentLevelStore = useAgentLevelStore()
const { queryData } = storeToRefs(agentLevelStore)
const { query } = toRefs(queryData.value)
</script>
<template>
  <div class="search">
    <el-form inline label-width="80" size="small">
      <el-form-item label="佣金比例">
        <el-input-number v-model="query.rate" controls-position="right"></el-input-number>
      </el-form-item>
      <el-form-item label="代理等级">
        <dict-select :dict-id="DictConstants.AGENT_LEVEL" v-model="query.levelName"></dict-select>
      </el-form-item>
      <el-form-item label=" ">
        <div class="btn-wrapper">
          <el-button
            type="primary"
            size="small"
            @click="agentLevelStore.reloadTableData({ query: query, likeMode: 'ANYWHERE' })"
          >
            查询
          </el-button>
          <el-button type="warning" size="small" @click="agentLevelStore.restQuery()">
            重置</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 5px;
}

.search {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  .btn-wrapper {
    margin-left: 20px;
  }
}
</style>
