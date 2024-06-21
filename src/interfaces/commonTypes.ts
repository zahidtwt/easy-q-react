export interface QueryType {
  [key: string]: string; // Replace `any` with a more specific type if possible
}

export interface IQueryPayload {
  query: QueryType;
  sortField: string;
  sortOrder: 1 | -1;
  page?: number;
  limit?: number;
}
