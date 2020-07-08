import { injectable, inject } from 'tsyringe';

import IHeroesRepository from '../repositories/IHeroesRepository';
import Hero from '../infra/typeorm/entities/Hero';

@injectable()
class ListAvailableHeroesService {
  constructor(
    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,
  ) {}

  public async execute(): Promise<Hero[]> {
    const heroes = await this.heroesRepository.findAvailableHeroes();

    return heroes;
  }
}

export default ListAvailableHeroesService;
