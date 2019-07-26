
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
