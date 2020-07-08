import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import IOccurrencesRepository from '../repositories/IOccurrencesRepository';
import IOccurrencesHeroesRepository from '../repositories/IOccurrencesHeroesRepository';
import Occurrence from '../infra/typeorm/entities/Occurrence';

@injectable()
class ListInProgressOccurrencesService {
  constructor(
    @inject('OccurrencesRepository')
    private occurrencesRepository: IOccurrencesRepository,

    @inject('OccurrencesHeroesRepository')
    private occurrencesHeroesRepository: IOccurrencesHeroesRepository,
  ) {}

  public async execute(): Promise<Occurrence[]> {
    const occurrences = await this.occurrencesRepository.findByStatus(
      'in progress',
    );

    const dateFormattedOccurrences = occurrences.map(occurrence => {
      let heroes;

      const heroesNames = occurrence.occurrence_hero.map(
        hero => hero.hero.name,
      );

      if (heroesNames.length > 1) {
        heroes = heroesNames.join(', ');
      } else {
        heroes = heroesNames.join();
      }

      return {
        ...occurrence,
        date: format(occurrence.created_at, 'dd/MM/yyyy HH:mm'),
        heroes,
      };
    });

    return dateFormattedOccurrences;
  }
}

export default ListInProgressOccurrencesService;
