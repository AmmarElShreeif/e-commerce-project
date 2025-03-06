export interface Product {
  [x: string]: string | number | never[] | any;
  id: string;
  documentId: string;
  image: never[] | string | any;
  rate: number;
  title: string;
  price: number;
  category: string;
}

export type ProductType = {
  [x: string]: string | number | never[];
  id: string;
  documentId: string;
  image: never[] | string | any;
  rate: number;
  title: string;
  price: number;
  category: string;
};
