import FakeOccurrencesRepository from '../repositories/fakes/FakeOccurrencesRepository';
import ListSolvedOccurrencesSerivce from './ListSolvedOccurrencesService';

let fakeOccurrencesRepository: FakeOccurrencesRepository;
let listSolvedOccurrencesSerivce: ListSolvedOccurrencesSerivce;

describe('ListSolvedOccurrences', () => {
  beforeEach(() => {
    fakeOccurrencesRepository = new FakeOccurrencesRepository();

    listSolvedOccurrencesSerivce = new ListSolvedOccurrencesSerivce(
      fakeOccurrencesRepository,
    );
  });

  it('should be able to list all solved occurrences', async () => {
    await fakeOccurrencesRepository.create({
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

    const occurrence3 = await fakeOccurrencesRepository.create({
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
      dangerLevel: 'God',
      monsterName: 'Arlong',
      status: 'solved',
    });

    const occurrences = await listSolvedOccurrencesSerivce.execute();

    expect(occurrences[0].id).toBe(occurrence3.id);
  });
});
