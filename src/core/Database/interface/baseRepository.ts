import { OpWrite } from "./op.write";
import { OpRead } from "./op.read";

export abstract class BaseRepository<T> implements OpWrite<T>, OpRead<T> {
  protected model: unknown;

  protected constructor(model: unknown) {
    this.model = model;
  }
  abstract deleteById(id: number): Promise<boolean>;
  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T): Promise<T>;

  abstract delete(id: string): Promise<boolean>;

  abstract find(item: T): Promise<T[]>;

  abstract findOne(id: string): Promise<T>;
}