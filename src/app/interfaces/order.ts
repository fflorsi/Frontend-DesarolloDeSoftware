export interface OrderItem {
  id?: number;  
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
  };
}
  
  export interface Order {
    id?: number;
    total: number;
    date?: Date;
    items: OrderItem[];
  }