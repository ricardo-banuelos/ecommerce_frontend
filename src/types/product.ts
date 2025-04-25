// Base product summary (listing view)
export interface ProductSummary {
    productId: number;
    name: string;
    price: number;
    sku: string;
    isActive: boolean;
    categoryId: number;
    categoryName: string;
    primaryImageUrl: string | null;
    tags: string[];
  }
  
  // Detailed product information (product detail page)
export interface ProductDetail extends Omit<ProductSummary, 'tags'> {
    description: string;
    quantityInStock: number;
    weight: number | null;
    dimensions: string | null;
    createdAt: string; // ISO datetime string
    updatedAt: string; // ISO datetime string
    images: ProductImage[];
    tags: ProductTag[]; // Different type from ProductSummary
    attributes?: ProductAttributeValue[]; // This field is mentioned in the DTO comment as being added later
  }
  
  // Product image
  export interface ProductImage {
    imageId: number;
    imageUrl: string;
    isPrimary: boolean;
    altText: string | null;
    displayOrder: number | null;
    productId: number;
  }
  
  // Product tag
  export interface ProductTag {
    tagId: number;
    name: string;
    description: string | null;
  }
  
  // Product attribute
  export interface ProductAttribute {
    attributeId: number;
    name: string;
    description: string | null;
    usageCount: number | null;
  }
  
  // Product attribute value
  export interface ProductAttributeValue {
    valueId: number;
    productId: number;
    attributeId: number;
    attributeName: string;
    value: string;
  }