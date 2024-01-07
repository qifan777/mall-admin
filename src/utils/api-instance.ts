import { Api } from '@/apis/__generated'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const BASE_URL = '/mall-api'
export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
})
http.interceptors.response.use(
  (res) => {
    return res.data.result
  },
  ({ response }) => {
    if (response.data.code !== 1) {
      ElMessage.warning({ message: response.data.msg })
    }
    if (response.data.code === 1001007 || response.data.code === 1001008) {
      console.log(1001007)
      router.push('/login')
    } else {
      /* empty */
    }
    return Promise.reject(response.data.result)
  }
)
// 导出全局变量`apis`
export const api = new Api(async ({ uri, method, body }) => {
  return await http({ url: uri, method, data: body })
})
