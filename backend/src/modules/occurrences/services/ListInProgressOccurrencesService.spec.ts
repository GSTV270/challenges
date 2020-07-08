import FakeOccurrencesRepository from '../repositories/fakes/FakeOccurrencesRepository';
import FakeOccurrencesHeroesRepository from '../repositories/fakes/FakeOccurrencesHeroesRepository';
import ListInProgressOccurrencesSerivce from './ListInProgressOccurrencesService';

let fakeOccurrencesRepository: FakeOccurrencesRepository;
let fakeOccurrencesHeroesRepository: FakeOccurrencesHeroesRepository;
let listInProgressOccurrencesSerivce: ListInProgressOccurrencesSerivce;

describe('ListInProgressOccurrences', () => {
  beforeEach(() => {
    fakeOccurrencesRepository = new FakeOccurrencesRepository();
    fakeOccurrencesHeroesRepository = new FakeOccurrencesHeroesRepository();

    listInProgressOccurrencesSerivce = new ListInProgressOccurrencesSerivce(
      fakeOccurrencesRepository,
      fakeOccurrencesHeroesRepository,
    );
  });

  it('should be able to list all in progress occurrences', async () => {
    await fakeOccurrencesRepository.create({
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
      dangerLevel: 'God',
      monsterName: 'Gedou Mazou',
      status: 'open',
    });

    const occurrence2 = await fakeOccurrencesRepository.create({
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

    const occurrences = await listInProgressOccurrencesSerivce.execute();

    expect(occurrences[0].id).toBe(occurrence2.id);
  });
});
