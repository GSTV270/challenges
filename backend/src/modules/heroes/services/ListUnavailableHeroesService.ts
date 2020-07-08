import { injectable, inject } from 'tsyringe';

import OccurrenceHero from '@modules/occurrences/infra/typeorm/entities/OccurrenceHero';
import IHeroesRepository from '../repositories/IHeroesRepository';
import Hero from '../infra/typeorm/entities/Hero';

interface heroesWithCurrentlyOccurrence extends Hero {
  current_occurrence: OccurrenceHero;
}

@injectable()
class ListAvailableHeroesService {
  constructor(
    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,
  ) {}

  public async execute(): Promise<heroesWithCurrentlyOccurrence[]> {
    const heroes = await this.heroesRepository.findUnavailableHeroes();

    const heroesWithCurrentlyOccurrence = heroes.map(hero => ({
      ...hero,
      current_occurrence: hero.occurrence_hero[hero.occurrence_hero.length - 1],
    }));

    return heroesWithCurrentlyOccurrence;
  }
}

export default ListAvailableHeroesService;
