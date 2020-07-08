import FakeHeroesRepository from '../repositories/fakes/FakeHeroesRepository';
import ListHeroService from './ListHeroesService';

let fakeHeroesRepository: FakeHeroesRepository;
let listHeroService: ListHeroService;

describe('ListHeroes', () => {
  beforeEach(() => {
    fakeHeroesRepository = new FakeHeroesRepository();

    listHeroService = new ListHeroService(fakeHeroesRepository);
  });

  it('should be able to list created heroes', async () => {
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

    const heroes = await listHeroService.execute();

    expect(heroes).toEqual([hero1, hero2]);
  });
});
