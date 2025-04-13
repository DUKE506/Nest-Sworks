export class ListMeta {
  totalCount: number;
  pageSize: number;
  page: number;

  constructor({
    totalCount,
    pageSize,
    pageNumber,
  }: {
    totalCount: number;
    pageSize: number;
    pageNumber: number;
    totalPages: number;
  }) {
    (this.totalCount = totalCount),
      (this.pageSize = pageSize),
      (this.page = pageNumber);
  }
}

export class ListModel<T> {
  meta: ListMeta;
  data: T[];

  constructor({ meta, data }: { meta: ListMeta; data: T[] }) {
    this.meta = meta;
    this.data = data;
  }
}
