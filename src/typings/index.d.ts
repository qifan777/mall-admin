export type EditMode = 'CREATE' | 'UPDATE'
export interface Scope<T> {
  row: T
  $index: number
}

export type OptionEnum = Array<{ value: string | number; label: string }>
export interface Result<T> {
  code: number
  success: boolean
  msg: string
  result: T
}
import type { MenuDto } from '@/apis/__generated/model/dto'
export type MenuTreeDto = MenuDto['MenuRepository/MENU_TREE_FETCHER']
