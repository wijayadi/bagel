import { Repository } from '../lib/repository';
import { Entity } from '../models/entity';
export class ArrayRepository<K extends number | string, T extends Entity<K>> implements Repository<K, T> {
  private coll: Record<K, T>;

  public constructor() {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.coll = {} as Record<K, T>;
  }

  public get(id: K): T {
    return this.coll[id];
  }

  public create(data: T): void {
    this.coll[data.Id] = data;
  }

  public update(id: K, data: T): void {
    this.coll[id] = data;
  }

  public patch(id: K, data: T): void {
    this.coll[id] = data;
  }

  public remove(id: K): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.coll[id];
  }
}
