<script lang="ts" setup>
import AgentLevelTable from './components/agent-level-table.vue'
import AgentLevelQuery from './components/agent-level-query.vue'
import AgentLevelDialog from './components/agent-level-dialog.vue'
</script>
<template>
  <div class="agent-level-view">
    <agent-level-query></agent-level-query>
    <agent-level-dialog></agent-level-dialog>
    <agent-level-table></agent-level-table>
  </div>
</template>

<style lang="scss" scoped>
.agent-level-view {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
