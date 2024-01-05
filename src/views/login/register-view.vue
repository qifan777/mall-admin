<script lang="tsx">
import {
  ElAvatar,
  ElButton,
  ElCard,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  type FormInstance,
  type FormRules
} from 'element-plus'
import { defineComponent, onMounted, reactive, ref, Transition } from 'vue'
import logo from '@/assets/logo.jpg'
import router from '@/router'
import background from '@/assets/background.jpg'
import { api } from '@/utils/api-instance'
import type { UserRegisterInput } from '@/apis/__generated/model/static'
import { assertFormValidate, assertSuccess } from '@/utils/common'
import { sendSMS } from '@/apis/sms/sms-api'

export default defineComponent({
  name: 'RegisterView',
  setup() {
    const loginForm = reactive<UserRegisterInput>({ phone: '', password: '', code: '' })

    const showPanel = ref(false)
    onMounted(() => {
      setTimeout(() => {
        showPanel.value = true
      }, 1000)
    })
    const ruleFormRef = ref<FormInstance>()

    const rules = reactive<FormRules<typeof loginForm>>({
      phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { max: 16, min: 6, message: '密码长度介于6，16' }
      ],
      code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    })
    const handleRegister = async () => {
      if (!ruleFormRef.value) return
      await ruleFormRef.value.validate(
        assertFormValidate(() =>
          api.userController.register({ body: loginForm }).then((res) => {
            assertSuccess(res).then(() => {
              router.replace({ path: '/' })
              localStorage.setItem('token', res.tokenValue)
            })
          })
        )
      )
    }

    const countDown = ref(0)
    let intervalId = 0
    const handleSendSMS = () => {
      sendSMS(loginForm.phone).then((res) => {
        assertSuccess(res).then(() => {
          countDown.value = 120
          intervalId = setInterval(() => {
            if (countDown.value === 0) {
              clearInterval(intervalId)
              return
            }
            countDown.value--
          }, 1000)
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
                      <div class="description">创建你的账号</div>
                      <ElForm
                        ref={ruleFormRef}
                        model={loginForm}
                        rules={rules}
                        class="form"
                        label-position="top"
                        label-width="100px"
                      >
                        <ElFormItem label="手机号" prop="phone">
                          <ElInput v-model={loginForm.phone}></ElInput>
                        </ElFormItem>
                        <ElFormItem label="密码" prop="password">
                          <ElInput v-model={loginForm.password} type={'password'}></ElInput>
                        </ElFormItem>
                        <ElFormItem label="验证码" prop="code">
                          <div class="sms">
                            <ElInput v-model={loginForm.code}></ElInput>
                            <ElButton
                              class="send-sms"
                              type="success"
                              onClick={handleSendSMS}
                              disabled={countDown.value > 0}
                            >
                              {countDown.value === 0 ? '发送验证码' : countDown.value}
                            </ElButton>
                          </div>
                        </ElFormItem>
                      </ElForm>
                      <div class="button-wrapper">
                        <ElButton class="register" type={'primary'} onClick={handleRegister}>
                          注册
                        </ElButton>
                        <ElButton
                          class="login"
                          size="small"
                          link
                          onClick={() => router.replace('/login')}
                        >
                          登录
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

          .sms {
            display: flex;
            align-items: center;
            width: 100%;

            .send-sms {
              margin-left: 20px;
            }
          }
        }

        .button-wrapper {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          position: relative;
          .register {
            width: 120px;
          }
          .login {
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
