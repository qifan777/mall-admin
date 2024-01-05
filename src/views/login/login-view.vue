<script lang="tsx">
import { ElAvatar, ElButton, ElCard, ElCol, ElForm, ElFormItem, ElInput, ElRow } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, Transition } from 'vue'
import logo from '@/assets/logo.jpg'
import router from '@/router'
import background from '@/assets/background.jpg'
import { api } from '@/utils/api-instance'
import type { PhonePasswordAuth } from '@/apis/__generated/model/static'
import { assertSuccess } from '@/utils/common'
import { useHomeStore } from '@/stores/home-store'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const loginForm = reactive<PhonePasswordAuth>({ phoneNumber: '', password: '' })

    const showPanel = ref(false)
    onMounted(() => {
      setTimeout(() => {
        showPanel.value = true
      }, 1000)
    })
    const handleLogin = () => {
      api.authController.authByPhonePassword({ body: loginForm }).then((res) => {
        assertSuccess(res).then(async () => {
          await useHomeStore().init()
          router.replace({ path: '/' })
        })
      })
    }

    return () => (
      <div>
        <img alt="背景图片" class="background" src={background} />
        <ElRow class="panel-wrapper" justify={'center'} align={'middle'}>
          <ElCol xs={18} sm={16} md={14} lg={10} xl={10}>
            <Transition name="el-zoom-in-top">
              {showPanel.value ? (
                <ElCard class="panel">
                  <div class="content">
                    <div class="panel-left">
                      <ElAvatar alt="logo" size={30} shape={'square'} src={logo}></ElAvatar>
                      <div class="title">会员后台管理系统</div>
                      <div class="description">积分，优惠券,VIP等营销功能</div>
                    </div>
                    <div class="panel-right">
                      <div class="title">快速开始</div>
                      <div class="description">登录你的账号</div>
                      <ElForm
                        model={loginForm}
                        class="form"
                        label-position="top"
                        label-width="100px"
                      >
                        <ElFormItem label="手机号">
                          <ElInput v-model={loginForm.phoneNumber}></ElInput>
                        </ElFormItem>
                        <ElFormItem label="密码">
                          <ElInput v-model={loginForm.password} type={'password'}></ElInput>
                        </ElFormItem>
                      </ElForm>
                      <div class="button-wrapper">
                        <ElButton class="login" type={'primary'} onClick={(e) => handleLogin()}>
                          登录
                        </ElButton>
                        <ElButton
                          class="register"
                          type="info"
                          size="small"
                          link
                          onClick={() => router.push('/register')}
                        >
                          注册
                        </ElButton>
                      </div>
                    </div>
                  </div>
                </ElCard>
              ) : (
                ''
              )}
            </Transition>
          </ElCol>
        </ElRow>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  width: 100vw;
  height: auto;
  z-index: -10;
}

.panel-wrapper {
  height: 100vh;

  .panel {
    .content {
      display: flex;
      align-items: stretch;
      height: 50vh;

      .title {
        font-size: var(--el-font-size-extra-large);
        margin-top: 16px;
        font-weight: bold;
      }

      .description {
        margin-top: 20px;
        font-size: var(--el-font-size-base);
        color: var(--el-text-col);
      }

      .panel-left {
        box-sizing: border-box;
        padding: 30px;
        background-color: rgb(243, 245, 249);
        width: 50%;
        border-radius: 5px;
      }

      .panel-right {
        padding: 30px;
        width: 50%;

        .form {
          margin-top: 30px;
        }

        .button-wrapper {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          position: relative;

          .login {
            width: 120px;
          }

          .register {
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
