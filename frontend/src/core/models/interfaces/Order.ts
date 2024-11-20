interface CreateOrder {
  materials: {
    material_id: number;
    center_id: number;
  }[];
}

interface OrderResponse{
  ok: string;
  order_id: number;
}

interface OrderResponseChanges{
  ok: boolean;
  message: string;
}

interface GetOrderResponse {
  ok: boolean
  orders: Order[]
}

interface Order {
  center_name: string
  materials: MaterialOrder[]
  order_id: number
}

interface MaterialOrder {
  category_name: string
  description: string
  image: string
  material_id: number
  name: string
}

export {CreateOrder, OrderResponse, GetOrderResponse, Order, MaterialOrder, OrderResponseChanges};
