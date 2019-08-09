
export interface Instance {
  label: number;
  features: number[];
}

export interface Decision {
  id: number;
  value: string;
}

export interface Feature {
  id: number;
  value: string;
  updated_at?: string;
}

export interface FetchOptions {
  page?: number | string;
  pageSize?: number | string;
}

export interface Pagination {
  page?: number;
  pageCount?: number;
  pageSize?: number;
  rowCount?: number;
}
export interface FeaturesPage {
  list: Feature[];
  pagination: Pagination;
}

export interface DecisionsPage {
  list: Decision[];
  pagination: Pagination;
}
