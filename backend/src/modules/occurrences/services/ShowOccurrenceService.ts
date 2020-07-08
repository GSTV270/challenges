import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import Hero from '@modules/heroes/infra/typeorm/entities/Hero';
import AppError from '@shared/errors/AppError';
import IOccurrencesRepository from '../repositories/IOccurrencesRepository';
import Occurrence from '../infra/typeorm/entities/Occurrence';

interface OccurrenceWithHeroes {
  occurrence: Occurrence | undefined;
  heroes: Hero[] | undefined;
  formattedDate: string | undefined;
}

@injectable()
class ShowOccurrenceService {
  constructor(
    @inject('OccurrencesRepository')
    private occurrencesRepository: IOccurrencesRepository,
  ) {}

  public async execute(id: string): Promise<OccurrenceWithHeroes | undefined> {
    const occurrence = await this.occurrencesRepository.findById(id);

    if (!occurrence) {
      throw new AppError('Occurrence does not exist');
    }

    const heroes = occurrence.occurrence_hero.map(hero => hero.hero);

    const formattedDate = format(occurrence.updated_at, 'dd/MM/yyyy HH:mm');

    return {
      occurrence,
      heroes,
      formattedDate,
    };
  }
}

export default ShowOccurrenceService;
