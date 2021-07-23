import { Repository } from '../lib/repository';

export class ArrayRepository<K extends number | string, T> implements Repository<K, T> {
  private coll: Record<K, T>;

  public get(id: K): T {
    return this.coll[id];
  }

  public create(data: T): void {
    this.coll[data['Id'] as K] = data;
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
