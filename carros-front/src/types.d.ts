export interface Carro {
  id?: number,
  nome: string,
  marca: string,
  modelo: string,
  valor: number,
  foto: string
}

export interface APIGetResponse {
  content?: Carro[] | null;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
