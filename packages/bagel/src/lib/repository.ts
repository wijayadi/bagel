export interface Repository<K, T> {
  get(id: K): T;
  create(data: T);
  update(id: K, data: T);
  patch(id: K, data: T);
  remove(id: K);
}
