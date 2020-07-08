import AppError from '@shared/errors/AppError';
import FakeOccurrencesRepository from '../repositories/fakes/FakeOccurrencesRepository';
import ShowOccurrenceService from './ShowOccurrenceService';

let fakeOccurrencesRepository: FakeOccurrencesRepository;
let showOccurrence: ShowOccurrenceService;

describe('ShowOccurrence', () => {
  beforeEach(() => {
    fakeOccurrencesRepository = new FakeOccurrencesRepository();

    showOccurrence = new ShowOccurrenceService(fakeOccurrencesRepository);
  });

  it('should be able to show a occurrence by its id', async () => {
    const occurrence = await fakeOccurrencesRepository.create({
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
      dangerLevel: 'God',
      monsterName: 'Gedou Mazou',
      status: 'open',
    });

    const occurrenceById = await showOccurrence.execute(occurrence.id);

    expect(occurrenceById?.occurrence?.id).toBe(occurrence.id);
  });

  it('should not be able to show a non existing occurrence', async () => {
    await expect(
      showOccurrence.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
