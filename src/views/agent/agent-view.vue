<script lang="ts" setup>
import AgentTable from './components/agent-table.vue'
import AgentQuery from './components/agent-query.vue'
import AgentDialog from './components/agent-dialog.vue'
</script>
<template>
  <div class="agent-view">
    <agent-query></agent-query>
    <agent-dialog></agent-dialog>
    <agent-table></agent-table>
  </div>
</template>

<style lang="scss" scoped>
.agent-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
