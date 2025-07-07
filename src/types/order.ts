export interface OrderCreateInput {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentIntentId?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    price: number;
    // ... other product fields
  };
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  shippingAddress: any;
  billingAddress?: any;
  paymentIntentId?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
}
