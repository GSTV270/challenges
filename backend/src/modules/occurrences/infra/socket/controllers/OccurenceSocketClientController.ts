import { container } from 'tsyringe';

import CreateOccurrenceService from '@modules/occurrences/services/CreateOccurrenceService';
import AssignOccurrenceService from '@modules/occurrences/services/AssignOccurrenceService';

interface ISocketData {
  location: Array<{
    lat: number;
    lng: number;
  }>;
  dangerLevel: string;
  monsterName: string;
}

class OccurrenceSocketClientController {
  public async create({
    dangerLevel,
    monsterName,
    location,
  }: ISocketData): Promise<void> {
    const { lat, lng } = location[0];

    const createOccurrence = container.resolve(CreateOccurrenceService);

    if (
      dangerLevel !== 'God' &&
      dangerLevel !== 'Dragon' &&
      dangerLevel !== 'Tiger' &&
      dangerLevel !== 'Wolf'
    ) {
      return;
    }

    await createOccurrence.execute({
      latitude: lat,
      longitude: lng,
      dangerLevel,
      monsterName,
    });

    const assignOccurrence = container.resolve(AssignOccurrenceService);

    await assignOccurrence.execute();
  }
}

export default OccurrenceSocketClientController;
