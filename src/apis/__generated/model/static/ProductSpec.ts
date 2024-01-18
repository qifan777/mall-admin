import type { Attribute } from './'

/**
 * Entity for table "product"
 */
export interface ProductSpec {
  price?: number | undefined
  cover?: string | undefined
  stock?: number | undefined
  specifications?: Array<Attribute> | undefined
  attributes?: Array<Attribute> | undefined
  name?: string | undefined
  tags?: string | undefined
  description?: string | undefined
  brand?: string | undefined
  categoryId?: string | undefined
  id?: string | undefined
  minCreatedTime?: string | undefined
  maxCreatedTime?: string | undefined
  minEditedTime?: string | undefined
  maxEditedTime?: string | undefined
}
