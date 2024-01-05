<template>
  <div class="tags" v-if="tagStore.show">
    <div class="tags-wrapper">
      <router-tag
        :tag="tag"
        :index="index"
        v-for="(tag, index) in tagStore.tags"
        :key="tag.id"
      ></router-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTagStore } from '@/layout/store/tag-store'
import RouterTag from './router-tag.vue'
const tagStore = useTagStore()
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  justify-content: space-between;

  .tags-wrapper {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      --bar-width: 0px;
      width: 0px;
      height: 0px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      background-clip: content-box;
      border: 1px solid transparent;
    }
  }
}
</style>
