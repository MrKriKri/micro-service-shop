export class CreateOrderRequestDto{
  ref: string

  product: { id: string, quantity: number}[]

  discount: number

  customer: string

}
