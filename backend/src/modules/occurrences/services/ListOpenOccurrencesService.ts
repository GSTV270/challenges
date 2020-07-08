import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import IOccurrencesRepository from '../repositories/IOccurrencesRepository';
import Occurrence from '../infra/typeorm/entities/Occurrence';

interface OccurrenceWithDate extends Occurrence {
  date: string;
}

@injectable()
class ListOpenOccurrencesService {
  constructor(
    @inject('OccurrencesRepository')
    private occurrencesRepository: IOccurrencesRepository,
  ) {}

  public async execute(): Promise<OccurrenceWithDate[]> {
    const occurrences = await this.occurrencesRepository.findByStatus('open');

    const dateFormattedOccurrences = occurrences.map(occurrence => {
      const createdAtDate = new Date(occurrence.created_at);

      const formattedDate = format(createdAtDate, 'dd/MM/yyyy HH:mm');
      return {
        ...occurrence,
        date: formattedDate,
      };
    });

    return dateFormattedOccurrences;
  }
}

export default ListOpenOccurrencesService;
