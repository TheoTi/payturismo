export interface IAgencyRepository<T = any> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}
