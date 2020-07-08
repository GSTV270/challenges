import AppError from '@shared/errors/AppError';

import FakeHeroesRepository from '../repositories/fakes/FakeHeroesRepository';
import DeleteHeroService from './DeleteHeroService';

let fakeHeroesRepository: FakeHeroesRepository;
let deleteHeroService: DeleteHeroService;

describe('DeleteHero', () => {
  beforeEach(() => {
    fakeHeroesRepository = new FakeHeroesRepository();

    deleteHeroService = new DeleteHeroService(fakeHeroesRepository);
  });

  it('should be able to delete a hero', async () => {
    const hero = await fakeHeroesRepository.create({
      name: 'Jon',
      rank: 'S',
      latitude: 32.32132131,
      longitude: 32.32132131,
    });

    await deleteHeroService.execute(hero.id);

    const users = await fakeHeroesRepository.findAll();

    expect(users).toEqual([]);
  });

  it('should not be able to delete non existing user', async () => {
    await expect(deleteHeroService.execute('wrong-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to delete non existing user', async () => {
    const hero = await fakeHeroesRepository.create({
      name: 'Jon',
      rank: 'S',
      latitude: 32.32132131,
      longitude: 32.32132131,
    });

    await fakeHeroesRepository.setUnavailable([hero.id]);

    await expect(deleteHeroService.execute(hero.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
