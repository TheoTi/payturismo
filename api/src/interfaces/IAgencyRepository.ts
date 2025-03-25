export interface IAgencyRepository<T = any> {
  findAll(): Promise<T[]>;
}
