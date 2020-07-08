import FakeHeroesRepository from '../repositories/fakes/FakeHeroesRepository';
import ListUnavailableHeroesService from './ListUnavailableHeroesService';

let fakeHeroesRepository: FakeHeroesRepository;
let listUnavailableHeroesService: ListUnavailableHeroesService;

describe('ListUnavailableHeroes', () => {
  beforeEach(() => {
    fakeHeroesRepository = new FakeHeroesRepository();

    listUnavailableHeroesService = new ListUnavailableHeroesService(
      fakeHeroesRepository,
    );
  });

  it('should be able to list unavailable hero', async () => {
    await fakeHeroesRepository.create({
      name: 'John1',
      rank: 'S',
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
    });

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

    hero1.available = false;
    hero2.available = false;

    await fakeHeroesRepository.save(hero1);
    await fakeHeroesRepository.save(hero2);

    const heroes = await listUnavailableHeroesService.execute();

    expect(heroes).toEqual([hero1, hero2]);
  });
});
