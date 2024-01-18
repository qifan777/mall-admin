import type { Attribute } from './'

/**
 * Entity for table "product"
 */
export interface ProductInput {
  name: string
  price: number
  cover: string
  brand: string
  stock: number
  description: string
  tags: string
  categoryId: string
  attributes: Array<Attribute>
  specifications: Array<Attribute>
  id?: string | undefined
}
