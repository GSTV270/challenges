import AppError from '@shared/errors/AppError';

import FakeHeroesRepository from '../repositories/fakes/FakeHeroesRepository';
import UpdateHeroService from './UpdateHeroService';

let fakeHeroesRepository: FakeHeroesRepository;
let updateHeroService: UpdateHeroService;

describe('UpdateHero', () => {
  beforeEach(() => {
    fakeHeroesRepository = new FakeHeroesRepository();

    updateHeroService = new UpdateHeroService(fakeHeroesRepository);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeHeroesRepository.create({
      name: 'Jon',
      rank: 'S',
      latitude: 32.32132131,
      longitude: 32.32132131,
    });

    const updatedUser = await updateHeroService.execute({
      id: user.id,
      name: 'Jon T',
      rank: 'A',
      latitude: 32.32132131,
      longitude: 32.32132131,
    });

    expect(updatedUser.name).toBe('Jon T');
    expect(updatedUser.rank).toBe('A');
  });

  it('should not be able to update the name to an already used one', async () => {
    await fakeHeroesRepository.create({
      name: 'Jon',
      rank: 'S',
      latitude: 32.32132131,
      longitude: 32.32132131,
    });

    const hero = await fakeHeroesRepository.create({
      name: 'John',
      rank: 'S',
      latitude: 32.32132131,
      longitude: 32.32132131,
    });

    await expect(
      updateHeroService.execute({
        id: hero.id,
        name: 'Jon',
        rank: 'A',
        latitude: 32.32132131,
        longitude: 32.32132131,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update hero name to its own name', async () => {
    const hero = await fakeHeroesRepository.create({
      name: 'Jon',
      rank: 'S',
      latitude: 32.32132131,
      longitude: 32.32132131,
    });

    const updattedHero = await updateHeroService.execute({
      id: hero.id,
      name: 'Jon',
      latitude: hero.latitude,
      longitude: hero.longitude,
      rank: 'S',
    });

    expect(updattedHero.name).toBe('Jon');
  });

  it('should not be able to update non existing user', async () => {
    await expect(
      updateHeroService.execute({
        id: 'wrong-id',
        name: 'R Talsorian',
        rank: 'A',
        latitude: 32.32132131,
        longitude: 32.32132131,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
