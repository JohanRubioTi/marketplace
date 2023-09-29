
export class Page<T> {
  items: Array<T>;
  pageIndex: number;
  pageCount: number;

  constructor(items: Array<T>, pageIndex: number, pageCount: number) {
    this.items = items;
    this.pageIndex = pageIndex;
    this.pageCount = pageCount;
  }
  get nextPageIndex(): number | null {
    return this.pageIndex < this.pageCount - 1 ? this.pageIndex + 1 : null;
  }

  get previousPageIndex(): number | null {
    return this.pageIndex > 0 ? this.pageIndex - 1 : null;
  }

  get hasNextPage(): boolean {
    return this.nextPageIndex !== null;
  }

  get hasPreviousPage(): boolean {
    return this.previousPageIndex !== null;
  }

  get isFirstPage(): boolean {
    return this.pageIndex === 0;
  }

  get isLastPage(): boolean {
    return this.pageIndex === this.pageCount - 1;
 }

  getNextPageIndexes(): Array<number> {
    const nextIndexes: Array<number> = [];
    for (let i = this.pageIndex + 1; i < this.pageCount && i < this.pageIndex + 4; i++) {
      nextIndexes.push(i);
    }
    return nextIndexes;
  }

  getPreviousPageIndexes(): Array<number> {
    const prevIndexes: Array<number> = [];
    for (let i = this.pageIndex - 1; i >= 0 && i > this.pageIndex - 4; i--) {
      prevIndexes.push(i);
    }
    return prevIndexes;
  }
}
