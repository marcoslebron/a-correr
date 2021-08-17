export interface InvoiceShowInterface {
  id: string;
}

export interface InvoiceParamsInterface {
  date: string;
  dueDate: string;
  client: string;
  seller: string;
  items: Record<string, unknown>[];
}

export interface SellerPointInterface {
  id: string;
  name: string;
  points: number;
}

export interface ClientInterface {
  id: string;
  name: string;
}

export interface ProductInterface {
  id: string;
  name: string;
  quantity: number;
  price: { price: number }[]
}