import { injectable, inject } from 'tsyringe';

import dangerConfig from '@config/danger';
import IOccurrencesRepository from '../repositories/IOccurrencesRepository';
import Occurrence from '../infra/typeorm/entities/Occurrence';

interface ISocketEvent {
  latitude: number;
  longitude: number;
  dangerLevel: 'God' | 'Dragon' | 'Tiger' | 'Wolf';
  monsterName: string;
}

@injectable()
class CreateOccurrenceService {
  constructor(
    @inject('OccurrencesRepository')
    private occurrencesRepository: IOccurrencesRepository,
  ) {}

  public async execute({
    latitude,
    longitude,
    dangerLevel,
    monsterName,
  }: ISocketEvent): Promise<Occurrence> {
    const convertedDangerLevel =
      dangerConfig.dangerLevelConvertion[dangerLevel];

    const occurrence = await this.occurrencesRepository.create({
      latitude,
      longitude,
      dangerLevel: convertedDangerLevel,
      monsterName,
      status: 'open',
    });

    return occurrence;
  }
}

export default CreateOccurrenceService;
