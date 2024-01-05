<template>
  <div class="header-right">
    <div class="right-wrapper">
      <div class="username-wrapper">
        <el-icon>
          <avatar></avatar>
        </el-icon>
        <div class="username">{{ userInfo.nickname }}</div>
      </div>
      <div class="divide"></div>
      <div class="icons">
        <div class="bell">
          <el-icon>
            <bell></bell>
          </el-icon>
          <div class="num">12</div>
        </div>
        <el-icon>
          <setting></setting>
        </el-icon>
        <el-icon>
          <question-filled></question-filled>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Avatar, Bell, Setting, QuestionFilled } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home-store'

const homeStore = useHomeStore()
const { userInfo } = storeToRefs(homeStore)
</script>

<style lang="scss" scoped>
.header-panel {
  background-color: #303133;
  padding: 20px;
  .tenant {
    .title {
      font-size: 16px;
      margin-bottom: 5px;
      &:hover {
        cursor: pointer;
      }
    }
    .active-tenant {
      margin-bottom: 20px;
    }
  }

  .role-view {
    .title {
      color: white;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .role-options {
      display: flex;

      &:hover {
        cursor: pointer;
      }

      .role-name {
        margin-right: 60px;

        &.active {
          color: var(--el-color-primary);
        }
      }
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  margin-left: 10px;
  .tree-wrapper {
    height: 600px;
    overflow-y: scroll;
  }
  .right-wrapper {
    display: flex;
    align-items: center;
    .username-wrapper {
      display: flex;
      align-items: center;
      font-size: 12px;

      .username {
        color: white;
        margin-left: 5px;
      }
    }
    .divide {
      margin: 0 20px;
      background-color: white;
      height: 12px;
      width: 1px;
    }
    .icons {
      display: flex;
      align-items: center;
      .bell {
        position: relative;
        display: flex;
        align-items: center;
        .num {
          top: -10px;
          right: -2px;
          text-align: center;
          position: absolute;
          background-color: red;
          height: 16px;
          line-height: 16px;
          width: 26px;
          border-radius: 8px;
          color: white;
          font-size: 12px;
        }
      }
      .el-icon {
        margin-right: 16px;
        color: rgba(white, 0.6);
        &:hover {
          color: white;
          filter: drop-shadow(2px 2px 3px #0070dd);
        }
      }
    }
  }
}
</style>
