// types/index.ts
import { User, Product, Category, CartItem, Order, OrderItem, Review } from '@prisma/client'

// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
    }
  }

  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
  }
}

// Extended types with relations
export type ProductWithCategory = Product & {
  category: Category
  reviews: Review[]
  averageRating?: number
  reviewCount?: number
}

export type CartItemWithProduct = CartItem & {
  product: ProductWithCategory
}

export type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    product: Product
  })[]
}

export type UserWithOrders = User & {
  orders: OrderWithItems[]
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  products: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface CartResponse {
  items: CartItemWithProduct[]
  total: number
  itemCount: number
}

// Form types
export interface ProductFormData {
  name: string
  description?: string
  price: number
  sku: string
  inventory: number
  images: string[]
  categoryId: string
  featured: boolean
}

export interface AddressFormData {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export interface CheckoutFormData {
  shippingAddress: AddressFormData
  billingAddress?: AddressFormData
  sameAsShipping: boolean
}

// Filter types
export interface ProductFilters {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  page?: number
  limit?: number
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

// Enums
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}