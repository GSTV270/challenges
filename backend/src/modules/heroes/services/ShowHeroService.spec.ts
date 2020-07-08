import FakeHeroesRepository from '../repositories/fakes/FakeHeroesRepository';
import ShowHeroService from './ShowHeroService';

let fakeHeroesRepository: FakeHeroesRepository;
let showHeroService: ShowHeroService;

describe('ShowHero', () => {
  beforeEach(() => {
    fakeHeroesRepository = new FakeHeroesRepository();

    showHeroService = new ShowHeroService(fakeHeroesRepository);
  });

  it('should be able to show a hero by its id', async () => {
    const hero1 = await fakeHeroesRepository.create({
      name: 'John1',
      rank: 'S',
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
    });

    const hero = await showHeroService.execute(hero1.id);

    expect(hero).toEqual(hero1);
  });
});
