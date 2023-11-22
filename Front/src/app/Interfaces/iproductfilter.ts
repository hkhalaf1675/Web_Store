export interface IproductFilter {
  sort?: string; // name(default) | priceAsc | priceDesc
  categoryid?: string;
  brandId?: string;
  condition?: string; // enum 0/1
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  search?: string;
  pageSize?: string;
  pageIndex?: string;
  
  [key: string]: string | undefined; // Index signature
}
