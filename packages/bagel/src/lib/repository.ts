import { Entity } from '../models/entity';

export interface Repository<K extends number | string, T extends Entity<K>> {
  get(id: K): T;
  create(data: T): void;
  update(id: K, data: T): void;
  patch(id: K, data: T): void;
  remove(id: K): void;
}
