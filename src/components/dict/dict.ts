import type { DictSpec, Page } from '@/apis/__generated/model/static'
import type { DictDto } from '@/apis/__generated/model/dto'
import { api } from '@/utils/api-instance'
import { onMounted, ref } from 'vue'

const dictMap: Record<number, Promise<Page<DictDto['DictRepository/COMPLEX_FETCHER']>>> = {}
export const queryDict = (dictSpec: DictSpec) => {
  if (!dictSpec.dictId) return
  let res = dictMap[dictSpec.dictId]
  if (res) return res
  res = api.dictController.query({
    body: {
      pageNum: 1,
      pageSize: 1000,
      likeMode: 'ANYWHERE',
      query: dictSpec,
      sorts: [{ property: 'dictId', direction: 'ASC' }]
    }
  })
  dictMap[dictSpec.dictId] = res
  return res
}
export const getDict = async (dictId: number, keyName: string) => {
  const res = queryDict({ dictId })
  if (res) {
    const dict = (await res).content.find((dict) => dict.keyName === keyName)
    return dict ? dict.id : ''
  } else {
    return ''
  }
}
export const getDictList = async (dictId: number) => {
  const res = queryDict({ dictId })
  if (res) {
    return (await res).content
  } else {
    return []
  }
}
