import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHeroesRepository from '@modules/heroes/repositories/IHeroesRepository';
import IOccurrencesRepository from '../repositories/IOccurrencesRepository';
import IOccurrencesHeroesRepository from '../repositories/IOccurrencesHeroesRepository';

@injectable()
class SetSolvedOccurrenceService {
  constructor(
    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,

    @inject('OccurrencesRepository')
    private occurrencesRepository: IOccurrencesRepository,

    @inject('OccurrencesHeroesRepository')
    private occurrencesHeroesRepository: IOccurrencesHeroesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const occurrence = await this.occurrencesRepository.findById(id);

    if (!occurrence) {
      throw new AppError('This occurrence does not exists');
    }

    if (occurrence.status === 'solved') {
      throw new AppError('This occurrence is already solved');
    }

    const occurrencesHeroes = await this.occurrencesHeroesRepository.findByOccurrence(
      occurrence.id,
    );

    const heroes = occurrencesHeroes.filter(
      occurrenceHeroes => occurrenceHeroes.occurrence_id === occurrence.id,
    );

    const heroesIds = heroes.map(hero => hero.hero_id);

    await this.heroesRepository.setAvailable(heroesIds);
    await this.occurrencesRepository.setSolved(occurrence.id);
  }
}

export default SetSolvedOccurrenceService;
