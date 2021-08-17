export interface InvoiceShowInterface {
  id: string;
}

export interface InvoiceParamsInterface {
  date: string;
  dueDate: string;
  client: string;
  seller: number;
  items: Record<string, unknown>[];
}

export interface SellerPointInterface {
  id: string;
  name: string;
  points: number;
}
