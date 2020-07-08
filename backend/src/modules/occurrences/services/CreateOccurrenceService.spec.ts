import FakeOccurrencesRepository from '../repositories/fakes/FakeOccurrencesRepository';
import CreateOccurrenceService from './CreateOccurrenceService';

let fakeOccurrencesRepository: FakeOccurrencesRepository;
let createOccurrenceService: CreateOccurrenceService;

describe('CreateOccurrence', () => {
  beforeEach(() => {
    fakeOccurrencesRepository = new FakeOccurrencesRepository();

    createOccurrenceService = new CreateOccurrenceService(
      fakeOccurrencesRepository,
    );
  });

  it('should be able to create a new occurrence', async () => {
    const occurrence = await createOccurrenceService.execute({
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
      dangerLevel: 'God',
      monsterName: 'Gedou Mazou',
    });

    expect(occurrence).toHaveProperty('id');
  });
});
