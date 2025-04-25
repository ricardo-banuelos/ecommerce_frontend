// Basic category information
export interface Category {
    categoryId: number;
    name: string;
    description: string | null;
    parentCategoryId: number | null;
    parentCategoryName: string | null;
    isActive: boolean;
    hasChildren: boolean;
    productCount: number | null;
    createdAt: string; // ISO datetime string
    updatedAt: string; // ISO datetime string
  }
  
  // Detailed category information including subcategories
  export interface CategoryDetail extends Omit<Category, 'hasChildren'> {
    subcategories: Category[];
  }
  
  // Tree structure for nested category navigation
  export interface CategoryTree {
    categoryId: number;
    name: string;
    productCount: number | null;
    children: CategoryTree[];
  }