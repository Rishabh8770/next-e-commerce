export type ProductTypes = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string[];
  brand: string;
  rating: number;
};

export interface CartItem {
  id: number;
  quantity: number;
}

export type Cart = Record<string, number>;
