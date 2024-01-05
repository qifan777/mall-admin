<template>
  <div>
    <el-popover
      :key="tag.path"
      :width="100"
      :visible="visible"
      :show-after="500"
      :popper-style="{ padding: 0 }"
    >
      <div @mouseleave="handleMouseLeave">
        <div class="menu-list">
          <div class="menu-item" @click="handleCommand('refresh')" v-if="isActive(tag)">
            刷新页面
          </div>
          <div class="menu-item" @click="handleCommand('copy')">复制路径</div>
          <div class="menu-item" @click="handleCommand('closeOther')">关闭其他</div>
          <div class="menu-item" @click="handleCommand('closeAll')">关闭所有</div>
        </div>
      </div>
      <template #reference>
        <div
          :class="['tag', isActive(tag) ? 'active' : '', 'tag' + index]"
          @contextmenu.prevent="handleContextMenu"
        >
          <div class="rag-link" @click="handleTagClick(tag)">
            {{ tag.name }}
          </div>
          <el-icon class="close" size="14" @click="closeTags(index)">
            <close></close>
          </el-icon>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { type TagMenu, useTagStore } from '@/layout/store/tag-store'
import { storeToRefs } from 'pinia'
import { Close } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { DictConstants } from '@/typings/dict-constants'
defineProps<{ tag: TagMenu; index: number }>()
const isActive = (tag: TagMenu) => {
  return tag.path === activeTag.value.path
}
const tagStore = useTagStore()
const { closeAll, closeOther, closeTags, openMenu, refresh } = tagStore
const { activeTag } = storeToRefs(tagStore)
const visible = ref(false)
const handleCommand = (command: 'refresh' | 'copy' | 'closeAll' | 'closeOther') => {
  const commandMap = {
    refresh,
    copy: () => {
      navigator.clipboard.writeText(window.location.href)
    },
    closeAll,
    closeOther
  }
  commandMap[command]()
  visible.value = false
}
const handleMouseLeave = () => {
  visible.value = false
}
const handleTagClick = (tag: TagMenu) => {
  if (tag.menuType === DictConstants.MenuType.MENU_ITEM) {
    openMenu(tag.path)
  }
}
const handleContextMenu = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  flex-direction: column;
  .menu-item {
    padding: 5px 10px;
    &:hover {
      color: var(--el-color-primary-dark-2);
      background-color: var(--el-color-primary-light-8);
      cursor: pointer;
    }
  }
}
.tag {
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  justify-content: center;
  border-right: rgba(#d4d7de, 0.5) 1px solid;
  background-color: rgba(#f5f5f5, 0.4);
  position: relative;
  min-width: 140px;

  &:hover {
    cursor: pointer;
  }
  &.active {
    color: #3692eb;
    background-color: white;
    border-right: #d4d7de 1px solid;
  }
  .close {
    color: #d4d7de;
  }
  .rag-link {
    margin-right: 5px;
    font-size: 14px;
    // 文字只能显示一行
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    // 溢出部分用 ...代替
    text-overflow: ellipsis;
  }
}
</style>
