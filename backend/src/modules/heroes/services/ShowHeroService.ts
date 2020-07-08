import { injectable, inject } from 'tsyringe';

import IHeroesRepository from '../repositories/IHeroesRepository';
import Hero from '../infra/typeorm/entities/Hero';

@injectable()
class ShowHeroService {
  constructor(
    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,
  ) {}

  public async execute(id: string): Promise<Hero | undefined> {
    const hero = await this.heroesRepository.findById(id);

    return hero;
  }
}

export default ShowHeroService;
