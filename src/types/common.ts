// Pagination parameters for API requests
export interface PaginationParams {
    page: number;
    size: number;
    sort?: string;
  }
  
  // Generic paginated response structure
  export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number; // current page
    first: boolean;
    last: boolean;
    empty: boolean;
  }
  
  // Filter options for product search
  export interface FilterOptions {
    subcategories: Array<{
      categoryId: number;
      name: string;
    }>;
    attributes: Record<string, string[]>; // Map of attribute name to possible values
    tags: string[];
    minPrice: number | null;
    maxPrice: number | null;
    sortOptions: string[];
  }
  
  // Search result containing both products and categories
  export interface SearchResult {
    products: ProductSummary[];
    categories: Category[];
    totalProductCount: number;
    totalCategoryCount: number;
    searchTerm?: string;
    searchDurationMs?: number;
  }
  
  // Importing from other type files to avoid circular dependencies
  import { ProductSummary } from './product';
  import { Category } from './category';