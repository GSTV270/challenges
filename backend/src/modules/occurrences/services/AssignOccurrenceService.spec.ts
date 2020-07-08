import FakeHeroesRepository from '@modules/heroes/repositories/fakes/FakeHeroesRepository';
import AppError from '@shared/errors/AppError';
import FakeOccurrencesRepository from '../repositories/fakes/FakeOccurrencesRepository';
import FakeOccurrencesHeroesRepository from '../repositories/fakes/FakeOccurrencesHeroesRepository';

import AssignOccurrenceService from './AssignOccurrenceService';

let fakeHeroesRepository: FakeHeroesRepository;
let fakeOccurrencesRepository: FakeOccurrencesRepository;
let fakeOccurrencesHeroesRepository: FakeOccurrencesHeroesRepository;
let assignOccurrenceService: AssignOccurrenceService;

describe('AssignOccurrence', () => {
  beforeEach(() => {
    fakeOccurrencesRepository = new FakeOccurrencesRepository();
    fakeOccurrencesHeroesRepository = new FakeOccurrencesHeroesRepository();
    fakeHeroesRepository = new FakeHeroesRepository();

    assignOccurrenceService = new AssignOccurrenceService(
      fakeOccurrencesRepository,
      fakeOccurrencesHeroesRepository,
      fakeHeroesRepository,
    );
  });

  it('should be able to assign hero to a occurrence / first in, first out', async () => {
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
      { hero_id: hero.id, occurrence_id: occurrence.id },
    ]);

    await assignOccurrenceService.execute();

    const checkOccurenceStatus = await fakeOccurrencesRepository.findById(
      occurrence.id,
    );
    const checkHeroAvailability = await fakeHeroesRepository.findAll();
    const checkOccurrencesHeroes = await fakeOccurrencesHeroesRepository.findByOccurrence(
      occurrence.id,
    );

    expect(checkOccurenceStatus?.status).toBe('in progress');
    expect(checkHeroAvailability[0].available).toBe(false);
    expect(checkOccurrencesHeroes[0].hero_id).toBe(hero.id);
  });

  it('should not be able to assign hero to a occurrence with invalid danger level', async () => {
    await fakeHeroesRepository.create({
      name: 'Goku',
      rank: 'S',
      latitude: -23.3213123,
      longitude: -45.3213123,
    });

    const occurrence = await fakeOccurrencesRepository.create({
      monsterName: 'Freeza',
      dangerLevel: 'Golda',
      status: 'open',
      latitude: -23.3213123,
      longitude: -45.3213123,
    });

    await assignOccurrenceService.execute();

    const checkOccurenceStatus = await fakeOccurrencesRepository.findById(
      occurrence.id,
    );
    const checkHeroAvailability = await fakeHeroesRepository.findAll();

    expect(checkOccurenceStatus?.status).toBe('open');
    expect(checkHeroAvailability[0].available).toBe(true);
  });

  it('should be not able to assign hero when there are no heroes', async () => {
    const occurrence = await fakeOccurrencesRepository.create({
      monsterName: 'Freeza',
      dangerLevel: 'Gold',
      status: 'open',
      latitude: -23.3213123,
      longitude: -45.3213123,
    });

    await assignOccurrenceService.execute();

    const checkOccurenceStatus = await fakeOccurrencesRepository.findById(
      occurrence.id,
    );
    expect(checkOccurenceStatus?.status).toBe('open');
  });

  it('should be able to assign closest hero that fits the occurrence', async () => {
    await fakeHeroesRepository.create({
      name: 'Goku',
      rank: 'S',
      latitude: -23.4342521,
      longitude: -46.718843,
    });

    const closestHero = await fakeHeroesRepository.create({
      name: 'Vegeta',
      rank: 'S',
      latitude: -22.5038883,
      longitude: -46.9467077,
    });

    const occurrence = await fakeOccurrencesRepository.create({
      monsterName: 'Freeza',
      dangerLevel: 'Gold',
      status: 'open',
      latitude: 30.09115,
      longitude: -117.82654,
    });

    await assignOccurrenceService.execute();

    await fakeOccurrencesHeroesRepository.create([
      { hero_id: closestHero.id, occurrence_id: occurrence.id },
    ]);

    const checkOccurenceStatus = await fakeOccurrencesRepository.findById(
      occurrence.id,
    );
    const checkHeroAvailability = await fakeHeroesRepository.findUnavailableHeroes();
    const checkOccurrencesHeroes = await fakeOccurrencesHeroesRepository.findByOccurrence(
      occurrence.id,
    );

    expect(checkOccurenceStatus?.status).toBe('in progress');
    expect(checkHeroAvailability[0].available).toBe(false);
    expect(checkOccurrencesHeroes[0].hero_id).toBe(closestHero.id);
  });

  it('should be able to assign multiple lower tier heros to fit the occurrence if needed', async () => {
    const hero1 = await fakeHeroesRepository.create({
      name: 'Piccolo',
      rank: 'B',
      latitude: -23.4342522,
      longitude: -46.718841,
    });

    const hero2 = await fakeHeroesRepository.create({
      name: 'Goku',
      rank: 'B',
      latitude: -23.4342521,
      longitude: -46.718843,
    });

    await fakeHeroesRepository.create({
      name: 'Kuririm',
      rank: 'B',
      latitude: -23.4342521,
      longitude: -46.718843,
    });

    await fakeHeroesRepository.create({
      name: 'Yamcha',
      rank: 'B',
      latitude: -23.4342521,
      longitude: -46.718843,
    });

    await fakeHeroesRepository.create({
      name: 'Vegeta',
      rank: 'S',
      latitude: -22.5038883,
      longitude: -46.9467077,
    });

    const occurrence = await fakeOccurrencesRepository.create({
      monsterName: 'Freeza',
      dangerLevel: 'Silver',
      status: 'open',
      latitude: -23.5206073,
      longitude: -46.7133245,
    });

    await assignOccurrenceService.execute();

    const checkOccurenceStatus = await fakeOccurrencesRepository.findById(
      occurrence.id,
    );
    const checkHeroAvailability = await fakeHeroesRepository.findUnavailableHeroes();

    hero1.available = false;
    hero2.available = false;

    expect(checkOccurenceStatus?.status).toBe('in progress');
    expect(checkHeroAvailability).toEqual([hero1, hero2]);
  });

  it('should be able to assign one upper tier hero to fit the occurrence if needed', async () => {
    const hero1 = await fakeHeroesRepository.create({
      name: 'Piccolo',
      rank: 'S',
      latitude: -23.4342522,
      longitude: -46.718841,
    });

    await fakeHeroesRepository.create({
      name: 'Yamcha',
      rank: 'B',
      latitude: -23.4342521,
      longitude: -46.718843,
    });

    await fakeHeroesRepository.create({
      name: 'Vegeta',
      rank: 'C',
      latitude: -22.5038883,
      longitude: -46.9467077,
    });

    const occurrence = await fakeOccurrencesRepository.create({
      monsterName: 'Freeza',
      dangerLevel: 'Silver',
      status: 'open',
      latitude: -23.5206073,
      longitude: -46.7133245,
    });

    await assignOccurrenceService.execute();

    const checkOccurenceStatus = await fakeOccurrencesRepository.findById(
      occurrence.id,
    );
    const checkHeroAvailability = await fakeHeroesRepository.findUnavailableHeroes();

    hero1.available = false;

    expect(checkOccurenceStatus?.status).toBe('in progress');
    expect(checkHeroAvailability).toEqual([hero1]);
  });
});
