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

export type Cart = Record<string, number>;
