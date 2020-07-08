import { getRepository, Repository } from 'typeorm';

import IHeroesRepository from '@modules/heroes/repositories/IHeroesRepository';
import ICreateHeroDTO from '@modules/heroes/dtos/ICreateHeroDTO';

import Hero from '../entities/Hero';

class HeroesRepository implements IHeroesRepository {
  private ormRepository: Repository<Hero>;

  constructor() {
    this.ormRepository = getRepository(Hero);
  }

  public async findAll(): Promise<Hero[]> {
    const heroes = await this.ormRepository.find();

    return heroes;
  }

  public async findAvailableHeroes(): Promise<Hero[]> {
    const heroes = await this.ormRepository.find({
      where: {
        available: true,
      },
    });

    return heroes;
  }

  public async findAvailableHeroesByRank(rank: string): Promise<Hero[]> {
    const heroes = await this.ormRepository.find({
      where: {
        available: true,
        rank,
      },
    });

    return heroes;
  }

  public async findUnavailableHeroes(): Promise<Hero[]> {
    const heroes = await this.ormRepository.find({
      where: {
        available: false,
      },
      relations: ['occurrence_hero'],
    });

    return heroes;
  }

  public async findByName(name: string): Promise<Hero | undefined> {
    const hero = await this.ormRepository.findOne({ where: { name } });

    return hero;
  }

  public async findById(id: string): Promise<Hero | undefined> {
    const hero = await this.ormRepository.findOne(id);

    return hero;
  }

  public async setAvailable(ids: string[]): Promise<void> {
    await this.ormRepository.update(ids, { available: true });
  }

  public async setUnavailable(ids: string[]): Promise<void> {
    await this.ormRepository.update(ids, { available: false });
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create({
    name,
    rank,
    latitude,
    longitude,
  }: ICreateHeroDTO): Promise<Hero> {
    const hero = this.ormRepository.create({
      name,
      rank,
      latitude,
      longitude,
      available: true,
    });

    await this.ormRepository.save(hero);

    return hero;
  }

  public async save(hero: Hero): Promise<Hero> {
    return this.ormRepository.save(hero);
  }
}

export default HeroesRepository;
