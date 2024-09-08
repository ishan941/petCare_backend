export interface OpRead<T> {
  find(item: T): Promise<Array<T>>;
  findOne(id: string): Promise<T>;
}
