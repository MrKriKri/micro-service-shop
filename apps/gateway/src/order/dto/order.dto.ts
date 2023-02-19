export interface Order {
  _id: string

  createdAt: Date

  updatedAt: Date

  ref: string

  product: {[key: string]: any}[]

  customer: {[key: string]: any}

  total: number

  discount: number

  netTotal: number

  status: string

}
