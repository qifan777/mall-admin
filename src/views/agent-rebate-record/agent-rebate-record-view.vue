<script lang="ts" setup>
import AgentRebateRecordTable from './components/agent-rebate-record-table.vue'
import AgentRebateRecordQuery from './components/agent-rebate-record-query.vue'
import AgentRebateRecordDialog from './components/agent-rebate-record-dialog.vue'
</script>
<template>
  <div class="agent-rebate-record-view">
    <agent-rebate-record-query></agent-rebate-record-query>
    <agent-rebate-record-dialog></agent-rebate-record-dialog>
    <agent-rebate-record-table></agent-rebate-record-table>
  </div>
</template>

<style lang="scss" scoped>
.agent-rebate-record-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
