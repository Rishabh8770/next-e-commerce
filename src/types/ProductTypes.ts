export type ProductTypes = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string[];
  brand: string;
  rating: number;
  reviews?: ReviewType[]
};

export interface CartItem {
  id: number;
  quantity: number;
}

export type Cart = Record<string, number>;

export type ReviewType = {
  userImage: string;
  username: string;
  comment: string
  ratings: number
}

export type CategoryWithImage = {
  name: string;
  image: string;
};

