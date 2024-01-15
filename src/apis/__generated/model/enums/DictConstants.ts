import type { DictInput } from '@/apis/__generated/model/static'

export const DictConstants = {
  GENDER: 1001,
  SYSTEM_CONSTANT: 1002
}
export const Dictionaries: { [index: string]: { [index: string]: DictInput } } = {
  Gender: {
    PRIVATE: {
      keyId: 2,
      keyName: '保密',
      keyEnName: 'PRIVATE',
      dictId: 1001,
      dictName: '性别',
      dictEnName: 'GENDER',
      orderNum: 0
    },
    MALE: {
      keyId: 0,
      keyName: '男',
      keyEnName: 'MALE',
      dictId: 1001,
      dictName: '性别',
      dictEnName: 'GENDER',
      orderNum: 0
    },
    FEMALE: {
      keyId: 1,
      keyName: '女',
      keyEnName: 'FEMALE',
      dictId: 1001,
      dictName: '性别',
      dictEnName: 'GENDER',
      orderNum: 1
    }
  },
  SystemConstant: {
    ADMIN: {
      keyId: 1,
      keyName: '管理员',
      keyEnName: 'ADMIN',
      dictId: 1002,
      dictName: '系统常量',
      dictEnName: 'SYSTEM_CONSTANT',
      orderNum: 0
    }
  }
}
