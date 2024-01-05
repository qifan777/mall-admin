<script lang="tsx">
import { defineComponent, h, resolveComponent } from 'vue'
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { useTagStore } from '../store/tag-store'
import { useHomeStore } from '@/stores/home-store'
import { DictConstants } from '@/typings/dict-constants'

export default defineComponent({
  components: {},
  props: {
    collapse: {
      type: Boolean
    }
  },
  setup(props) {
    const tagStore = useTagStore()
    const homeStore = useHomeStore()
    type Menu = {
      name: string
      orderNum?: number
      menuType: string
      icon?: string
      path: string
      children: Menu[]
    }
    const subMenuList = (menuList: Menu[], depth: number) => {
      menuList = menuList.sort((a, b) => (a.orderNum ?? 999) - (b.orderNum ?? 999))
      if (!menuList) return
      return menuList.map((menu) => {
        if (menu.menuType === DictConstants.MenuType.DIRECTORY) {
          return (
            <ElSubMenu class={depth === 0 ? 'root' : ''} key={menu.path} index={menu.path}>
              {{
                title: () => {
                  return [
                    menu.icon ? <ElIcon size={16}>{h(resolveComponent(menu.icon))}</ElIcon> : '',
                    <span>{menu.name}</span>
                  ]
                },
                default: () => subMenuList(menu.children, depth + 1)
              }}
            </ElSubMenu>
          )
        } else if (menu.menuType === DictConstants.MenuType.MENU_ITEM) {
          return (
            <ElMenuItem
              class={depth === 0 ? 'root' : ''}
              key={menu.path}
              index={menu.path}
              onClick={() => tagStore.openMenu(menu.path)}
            >
              {{
                default: () => {
                  return [
                    menu.icon ? <ElIcon size={16}>{h(resolveComponent(menu.icon))}</ElIcon> : '',
                    <span>{menu.name}</span>
                  ]
                }
              }}
            </ElMenuItem>
          )
        }
        return <div></div>
      })
    }
    return () => (
      <ElMenu collapse={props.collapse} defaultActive={tagStore.activeTag.path}>
        {subMenuList(homeStore.menuTrees, 0)}
      </ElMenu>
    )
  }
})
</script>

<style lang="scss" scoped>
@mixin item-color {
  .el-icon {
    color: rgb(144, 147, 153);
  }
  &:hover {
    color: #3692eb;
    .el-icon {
      svg {
        :deep(path) {
          fill: #3692eb !important;
        }
      }
    }
  }
}
:deep(.el-sub-menu__title) {
  @include item-color;
}
.el-menu-item {
  @include item-color;
}
.el-menu {
  border-right: 0;
  width: 160px;
  @mixin item-active {
    background-image: linear-gradient(to left, #5fc3ff, #4a47ff);
    color: white;
    .el-icon {
      color: white;
      svg {
        :deep(path) {
          fill: white !important;
        }
      }
    }
  }
  @mixin item-basic {
    height: 32px;
    line-height: 32px;
    margin-top: 20px;
    border-radius: 25px;
  }
  .view {
    .view-name {
      height: 100%;
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: clip;
      visibility: unset;
    }
  }
  .divide {
    margin-top: 20px;
    width: 100%;
    border-top: 1px solid var(--el-border-color);
  }
  :deep(.el-menu) {
    border-radius: 5px;
    background-color: #f5f5f5;
    overflow: hidden;

    .el-menu-item {
      height: 42px;
      line-height: 42px;
      position: relative;
      &.is-active {
        color: #3692eb;
        &::before {
          content: '';
          position: absolute;
          background-color: #3692eb;
          height: 6px;
          width: 6px;
          border-radius: 3px;
          left: 25px;
        }
      }
    }
  }
  .root {
    &.el-menu-item {
      @include item-basic();
      &.is-active {
        @include item-active;
      }
    }

    &.el-sub-menu {
      :deep(.el-sub-menu__title) {
        margin-bottom: 10px;
        @include item-basic;
      }
      &.is-active {
        :deep(.el-sub-menu__title) {
          @include item-active;
        }
      }
    }
  }
  &.el-menu--collapse {
    width: 40px;

    .el-menu-item {
      padding: 8px;
      width: 40px;
    }
    :deep(.el-sub-menu__title) {
      padding: 8px;
      width: 40px;
    }
    .view {
      :deep(.el-sub-menu__title) {
        padding: 0 5px;
      }
      .view-name {
        width: 28.3px;
      }
    }
  }
}
</style>
