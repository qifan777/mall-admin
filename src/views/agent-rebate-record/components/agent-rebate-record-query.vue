<script lang="ts" setup>
import { toRefs } from 'vue'
import { useAgentRebateRecordStore } from '../store/agent-rebate-record-store'
import { storeToRefs } from 'pinia'
import DictSelect from '@/components/dict/dict-select.vue'
import { DictConstants } from '@/apis/__generated/model/enums/DictConstants'

const agentRebateRecordStore = useAgentRebateRecordStore()
const { queryData } = storeToRefs(agentRebateRecordStore)
const { query } = toRefs(queryData.value)
</script>
<template>
  <div class="search">
    <el-form inline label-width="80" size="small">
      <el-form-item label="代理人">
        <el-input v-model="query.agent!.agentNo"></el-input>
      </el-form-item>
      <el-form-item label="返佣订单号">
        <el-input v-model="query.productOrderId"></el-input>
      </el-form-item>
      <el-form-item label="钱包流水号">
        <el-input v-model="query.walletRecordId"></el-input>
      </el-form-item>
      <el-form-item label="返佣者">
        <el-input v-model="query.fromAgent!.id"></el-input>
      </el-form-item>
      <el-form-item label="来自第n级的返佣">
        <dict-select
          :dict-id="DictConstants.AGENT_LEVEL_NAME"
          v-model="query.fromLevelName"
        ></dict-select>
      </el-form-item>
      <el-form-item label=" ">
        <div class="btn-wrapper">
          <el-button
            type="primary"
            size="small"
            @click="agentRebateRecordStore.reloadTableData({ query: query, likeMode: 'ANYWHERE' })"
          >
            查询
          </el-button>
          <el-button type="warning" size="small" @click="agentRebateRecordStore.restQuery()">
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
