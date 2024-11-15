export interface Category {
  id: number;
  name: string;
}

export interface Entertainment {
  id: number;
  title: string;
  description: string;
  categories: Category[];
}

export interface User {
  id: number;
  username: string;
  role: string | null;
  email: string;
  categories: Category['name'][];
}
