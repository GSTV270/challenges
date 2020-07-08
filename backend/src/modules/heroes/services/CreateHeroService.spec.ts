import AppError from '@shared/errors/AppError';

import FakeHeroesRepository from '../repositories/fakes/FakeHeroesRepository';
import CreateHeroService from './CreateHeroService';

let fakeHeroesRepository: FakeHeroesRepository;
let createHeroService: CreateHeroService;

describe('CreateHero', () => {
  beforeEach(() => {
    fakeHeroesRepository = new FakeHeroesRepository();

    createHeroService = new CreateHeroService(fakeHeroesRepository);
  });

  it('should be able to create a new hero', async () => {
    const hero = await createHeroService.execute({
      name: 'Jhon',
      rank: 'S',
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
    });

    expect(hero).toHaveProperty('id');
    expect(hero.name).toBe('Jhon');
  });

  it('should not be able to create hero with name already being used', async () => {
    await createHeroService.execute({
      name: 'Jhon',
      rank: 'S',
      latitude: 45.6570969353894,
      longitude: 18.5501181515677,
    });

    await expect(
      createHeroService.execute({
        name: 'Jhon',
        rank: 'S',
        latitude: 45.6570969353894,
        longitude: 18.5501181515677,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
