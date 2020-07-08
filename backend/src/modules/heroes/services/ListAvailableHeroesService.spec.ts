import FakeHeroesRepository from '../repositories/fakes/FakeHeroesRepository';
import ListAvailableHeroesService from './ListAvailableHeroesService';

let fakeHeroesRepository: FakeHeroesRepository;
let listAvailableHeroesService: ListAvailableHeroesService;

describe('ListAvailableHeroes', () => {
  beforeEach(() => {
    fakeHeroesRepository = new FakeHeroesRepository();

    listAvailableHeroesService = new ListAvailableHeroesService(
      fakeHeroesRepository,
    );
  });

  it('should be able to create a new hero', async () => {
    const hero1 = await fakeHeroesRepository.create({
      name: 'John1',
      rank: 'S',
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
    });

    const hero2 = await fakeHeroesRepository.create({
      name: 'John2',
      rank: 'A',
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
    });

    hero2.available = false;

    await fakeHeroesRepository.save(hero2);

    const heroes = await listAvailableHeroesService.execute();

    expect(heroes).toEqual([hero1]);
  });
});
