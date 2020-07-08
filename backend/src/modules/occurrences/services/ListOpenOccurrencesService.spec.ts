import FakeOccurrencesRepository from '../repositories/fakes/FakeOccurrencesRepository';
import ListOpenOccurrencesSerivce from './ListOpenOccurrencesService';

let fakeOccurrencesRepository: FakeOccurrencesRepository;
let listOpenOccurrencesSerivce: ListOpenOccurrencesSerivce;

describe('ListOpenOccurrences', () => {
  beforeEach(() => {
    fakeOccurrencesRepository = new FakeOccurrencesRepository();

    listOpenOccurrencesSerivce = new ListOpenOccurrencesSerivce(
      fakeOccurrencesRepository,
    );
  });

  it('should be able to list all open occurrences', async () => {
    const occurrence1 = await fakeOccurrencesRepository.create({
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
      dangerLevel: 'God',
      monsterName: 'Gedou Mazou',
      status: 'open',
    });

    await fakeOccurrencesRepository.create({
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
      dangerLevel: 'God',
      monsterName: 'Freeza',
      status: 'in progress',
    });

    await fakeOccurrencesRepository.create({
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
      dangerLevel: 'God',
      monsterName: 'Arlong',
      status: 'solved',
    });

    const occurrences = await listOpenOccurrencesSerivce.execute();

    expect(occurrences[0].id).toBe(occurrence1.id);
  });
});
