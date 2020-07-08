import IHeroesRepository from '@modules/heroes/repositories/IHeroesRepository';
import ICreateHeroDTO from '@modules/heroes/dtos/ICreateHeroDTO';

import { uuid } from 'uuidv4';
import Hero from '../../infra/typeorm/entities/Hero';

class HeroesRepository implements IHeroesRepository {
  private heroes: Hero[] = [];

  public async findAll(): Promise<Hero[]> {
    return this.heroes;
  }

  public async findAvailableHeroes(): Promise<Hero[]> {
    let availableHeroes = this.heroes;

    availableHeroes = this.heroes.filter(hero => hero.available === true);

    return availableHeroes;
  }

  public async findAvailableHeroesByRank(rank: string): Promise<Hero[]> {
    let availableHeroesByRank = this.heroes;

    availableHeroesByRank = this.heroes.filter(
      hero => hero.available === true && hero.rank === rank,
    );

    return availableHeroesByRank;
  }

  public async findUnavailableHeroes(): Promise<Hero[]> {
    let unavailableHeroes = this.heroes;

    unavailableHeroes = this.heroes.filter(hero => hero.available === false);

    return unavailableHeroes;
  }

  public async findByName(name: string): Promise<Hero | undefined> {
    const heroByName = this.heroes.find(hero => hero.name === name);

    return heroByName;
  }

  public async findById(id: string): Promise<Hero | undefined> {
    const heroById = this.heroes.find(hero => hero.id === id);

    return heroById;
  }

  public async setAvailable(ids: string[]): Promise<void> {
    ids.forEach(id => {
      const findIndex = this.heroes.findIndex(
        findHeroes => findHeroes.id === id,
      );

      this.heroes[findIndex] = {
        ...this.heroes[findIndex],
        available: true,
      };
    });
  }

  public async setUnavailable(ids: string[]): Promise<void> {
    ids.forEach(id => {
      const findIndex = this.heroes.findIndex(
        findHeroes => findHeroes.id === id,
      );

      this.heroes[findIndex] = {
        ...this.heroes[findIndex],
        available: false,
      };
    });
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.heroes.findIndex(findHeroes => findHeroes.id === id);

    this.heroes.splice(findIndex, 1);
  }

  public async create({
    name,
    rank,
    latitude,
    longitude,
  }: ICreateHeroDTO): Promise<Hero> {
    const hero = new Hero();

    Object.assign(hero, {
      id: uuid(),
      name,
      rank,
      latitude,
      longitude,
      available: true,
    });

    this.heroes.push(hero);

    return hero;
  }

  public async save(hero: Hero): Promise<Hero> {
    const findIndex = this.heroes.findIndex(
      findHeroes => findHeroes.id === hero.id,
    );

    this.heroes[findIndex] = hero;

    return hero;
  }
}

export default HeroesRepository;
