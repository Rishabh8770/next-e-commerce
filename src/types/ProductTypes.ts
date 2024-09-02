export type ProductTypes = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string[];
  brand: string;
  rating: number;
  reviews?: ReviewType[];
  discount?: number;
  sellerId?: number | null;
};

export interface CartItem {
  id: number;
  quantity: number;
  pricePerQuantity: number;
  productTotal: number;
  discount: number;
}

export type Cart = CartItem[];

export type ReviewType = {
  userImage: string;
  username: string;
  comment: string;
  ratings: number;
};

export type CategoryWithImage = {
  name: string;
  image: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  cart?: { id: number; quantity: number }[];
};
