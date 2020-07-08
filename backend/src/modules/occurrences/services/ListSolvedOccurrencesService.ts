import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import IOccurrencesRepository from '../repositories/IOccurrencesRepository';
import Occurrence from '../infra/typeorm/entities/Occurrence';

@injectable()
class ListSolvedOccurrencesService {
  constructor(
    @inject('OccurrencesRepository')
    private occurrencesRepository: IOccurrencesRepository,
  ) {}

  public async execute(): Promise<Occurrence[]> {
    const occurrences = await this.occurrencesRepository.findByStatus('solved');

    const dateFormattedOccurrences = occurrences.map(occurrence => ({
      ...occurrence,
      date: format(occurrence.updated_at, 'dd/MM/yyyy HH:mm'),
    }));

    return dateFormattedOccurrences;
  }
}

export default ListSolvedOccurrencesService;
