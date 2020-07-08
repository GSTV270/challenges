import Hero from '../infra/typeorm/entities/Hero';
import ICreateHeroDTO from '../dtos/ICreateHeroDTO';

export default interface IHeroesRepository {
  findAll(): Promise<Hero[]>;
  findAvailableHeroes(): Promise<Hero[]>;
  findAvailableHeroesByRank(rank: string): Promise<Hero[]>;
  findUnavailableHeroes(): Promise<Hero[]>;
  findByName(name: string): Promise<Hero | undefined>;
  findById(name: string): Promise<Hero | undefined>;
  setUnavailable(ids: string[]): Promise<void>;
  setAvailable(ids: string[]): Promise<void>;
  delete(id: string): Promise<void>;
  create(data: ICreateHeroDTO): Promise<Hero>;
  save(hero: Hero): Promise<Hero>;
}
