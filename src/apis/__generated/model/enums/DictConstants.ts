import type { DictInput } from '@/apis/__generated/model/static'

export const DictConstants = {
  MENU_TYPE: 1002,
  GENDER: 1001
}
export const Dictionaries: { [index: string]: { [index: string]: DictInput } } = {
  MenuType: {
    BUTTON: {
      keyId: 2,
      keyName: '按钮',
      keyEnName: 'BUTTON',
      dictId: 1002,
      dictName: '菜单类型',
      dictEnName: 'MENU_TYPE',
      orderNum: 2
    },
    PAGE: {
      keyId: 0,
      keyName: '页面',
      keyEnName: 'PAGE',
      dictId: 1002,
      dictName: '菜单类型',
      dictEnName: 'MENU_TYPE',
      orderNum: 1
    },
    DIRECTORY: {
      keyId: 1,
      keyName: '目录',
      keyEnName: 'DIRECTORY',
      dictId: 1002,
      dictName: '菜单类型',
      dictEnName: 'MENU_TYPE',
      orderNum: 0
    }
  },
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
  }
}
