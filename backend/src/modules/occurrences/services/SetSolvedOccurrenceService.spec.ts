import FakeHeroesRepository from '@modules/heroes/repositories/fakes/FakeHeroesRepository';
import AppError from '@shared/errors/AppError';
import FakeOccurrencesRepository from '../repositories/fakes/FakeOccurrencesRepository';
import FakeOccurrencesHeroesRepository from '../repositories/fakes/FakeOccurrencesHeroesRepository';

import SetSolvedOccurrenceService from './SetSolvedOccurrenceService';

let fakeHeroesRepository: FakeHeroesRepository;
let fakeOccurrencesRepository: FakeOccurrencesRepository;
let fakeOccurrencesHeroesRepository: FakeOccurrencesHeroesRepository;
let setSolvedOccurrenceService: SetSolvedOccurrenceService;

describe('setSolvedOccurrence', () => {
  beforeEach(() => {
    fakeOccurrencesRepository = new FakeOccurrencesRepository();
    fakeOccurrencesHeroesRepository = new FakeOccurrencesHeroesRepository();
    fakeHeroesRepository = new FakeHeroesRepository();

    setSolvedOccurrenceService = new SetSolvedOccurrenceService(
      fakeHeroesRepository,
      fakeOccurrencesRepository,
      fakeOccurrencesHeroesRepository,
    );
  });

  it('should be able to set a occurrence solved', async () => {
    const hero = await fakeHeroesRepository.create({
      name: 'Goku',
      rank: 'S',
      latitude: -23.3213123,
      longitude: -45.3213123,
    });

    const occurrence = await fakeOccurrencesRepository.create({
      monsterName: 'Freeza',
      dangerLevel: 'Gold',
      status: 'open',
      latitude: -23.3213123,
      longitude: -45.3213123,
    });

    await fakeOccurrencesHeroesRepository.create([
      {
        hero_id: hero.id,
        occurrence_id: occurrence.id,
      },
    ]);

    occurrence.status = 'in progress';
    hero.available = false;

    await fakeOccurrencesRepository.save({
      occurrence,
      heroes: [
        {
          hero_id: hero.id,
          occurrence_id: occurrence.id,
        },
      ],
    });
    await fakeHeroesRepository.save(hero);

    await setSolvedOccurrenceService.execute(occurrence.id);

    const checkOccurenceStatus = await fakeOccurrencesRepository.findById(
      occurrence.id,
    );
    const checkHeroAvailability = await fakeHeroesRepository.findAll();

    expect(checkOccurenceStatus?.status).toBe('solved');
    expect(checkHeroAvailability[0].available).toBe(true);
  });

  it('it should not be able to set solved a non existing occurrence', async () => {
    await expect(
      setSolvedOccurrenceService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to set solved an already solved occurrence', async () => {
    const hero = await fakeHeroesRepository.create({
      name: 'Goku',
      rank: 'S',
      latitude: -23.3213123,
      longitude: -45.3213123,
    });

    const occurrence = await fakeOccurrencesRepository.create({
      monsterName: 'Freeza',
      dangerLevel: 'Gold',
      status: 'open',
      latitude: -23.3213123,
      longitude: -45.3213123,
    });

    await fakeOccurrencesHeroesRepository.create([
      {
        hero_id: hero.id,
        occurrence_id: occurrence.id,
      },
    ]);

    occurrence.status = 'in progress';
    hero.available = false;

    await fakeOccurrencesRepository.save({
      occurrence,
      heroes: [
        {
          hero_id: hero.id,
          occurrence_id: occurrence.id,
        },
      ],
    });
    await fakeHeroesRepository.save(hero);

    await setSolvedOccurrenceService.execute(occurrence.id);

    await expect(
      setSolvedOccurrenceService.execute(occurrence.id),
    ).rejects.toBeInstanceOf(AppError);
  });
});
