export interface OpWrite<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  deleteById(id: number): Promise<boolean>;
}
