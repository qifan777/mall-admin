<script lang="tsx">
import { defineComponent, h, KeepAlive, type ConcreteComponent, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ElIcon, ElContainer, ElHeader, ElMain, ElScrollbar, ElAvatar } from 'element-plus'
import RouterTags from './components/router-tags.vue'
import { Fold } from '@element-plus/icons-vue'
import HeaderRight from '@/layout/components/header-right.vue'
import AsideMenu from './components/aside-menu.vue'
import logo from '@/assets/logo.jpg'
export default defineComponent({
  setup() {
    const route = useRoute()
    const isCollapse = ref(false)
    return () => (
      <ElContainer class="index">
        <ElHeader class="header">
          <div class="top-menu">
            <div class="logo">
              <ElAvatar src={logo} size={22}></ElAvatar>
              <div class="separator"></div>
              <span>Mall-Admin</span>
            </div>
            <div class="flex-grow"></div>

            <HeaderRight></HeaderRight>
          </div>
        </ElHeader>
        <ElContainer>
          <div class="aside-menu-wrapper">
            <AsideMenu collapse={isCollapse.value}></AsideMenu>
          </div>
          <ElMain class="router-wrapper">
            <ElHeader class="router-header">
              <div
                onClick={() => {
                  isCollapse.value = !isCollapse.value
                }}
                class="fold-wrapper"
              >
                <ElIcon class={['fold', isCollapse.value ? 'expand' : '']} size={20}>
                  <Fold />
                </ElIcon>
              </div>
              <RouterTags></RouterTags>
            </ElHeader>
            <ElScrollbar class="router">
              <RouterView>
                {{
                  default: ({ Component }: { Component: ConcreteComponent }) => {
                    let res = h('div')
                    if (Component) {
                      if (!route.meta.iframe) {
                        res = h(Component)
                      }
                    }
                    return <KeepAlive>{res}</KeepAlive>
                  }
                }}
              </RouterView>
            </ElScrollbar>
          </ElMain>
        </ElContainer>
      </ElContainer>
    )
  }
})
</script>

<style lang="scss" scoped>
.index {
  background-color: #f5f5f5;

  .aside-menu-wrapper {
    border-right: solid 1px var(--el-menu-border-color);
    box-shadow: 1px 20px 10px #e3e3e3;
    padding: 0 20px;
    background-color: white;
  }

  .header {
    height: 50px;
    background-color: #3692eb;

    .top-menu {
      height: 100%;
      border-bottom: unset;
      display: flex;
      color: white;

      .logo {
        display: flex;
        align-items: center;
        font-size: 18px;

        .separator {
          width: 1px;
          height: 22px;
          background-color: #ffffff;
          margin: 0 10px;
        }
      }

      .flex-grow {
        flex-grow: 1;
      }

      .avatar-wrapper {
        padding: 0 20px;
        display: flex;
        align-items: center;

        .avatar {
          margin-left: 10px;
        }
      }
    }
  }

  .router-wrapper {
    border-top: var(--el-border-color-light) 1px solid;
    padding: 0;
    height: calc(100vh - 50px);

    .router-header {
      padding: 0;
      height: 40px;
      background-color: white;
      display: flex;
      align-items: center;

      .fold-wrapper {
        height: 100%;
        display: flex;
        align-items: center;

        .fold {
          &:hover {
            cursor: pointer;
          }

          color: var(--el-color-primary);
          margin-left: 10px;
          transform: rotate(0deg);
          transition: transform 0.3s linear;
        }

        .expand {
          transform: rotate(180deg);
        }
      }
    }

    .router {
      height: calc(100vh - 130px);
      margin: 20px 20px 0px 20px;
      border-radius: 5px;

      :deep(.el-scrollbar__view) {
        height: 100%;
      }
    }
  }
}
</style>
