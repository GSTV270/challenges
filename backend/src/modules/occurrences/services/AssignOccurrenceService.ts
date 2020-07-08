import { injectable, inject } from 'tsyringe';
import { getDistance } from 'geolib';

import dangerConfig from '@config/danger';

import IHeroesRepository from '@modules/heroes/repositories/IHeroesRepository';
import Hero from '@modules/heroes/infra/typeorm/entities/Hero';
import IOccurrencesRepository from '../repositories/IOccurrencesRepository';
import IOccurrencesHeroesRepository from '../repositories/IOccurrencesHeroesRepository';

@injectable()
class AssignOccurrenceService {
  constructor(
    @inject('OccurrencesRepository')
    private occurrenceRepository: IOccurrencesRepository,

    @inject('OccurrencesHeroesRepository')
    private occurrencesHeroesRepository: IOccurrencesHeroesRepository,

    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,
  ) {}

  public async execute(): Promise<void> {
    const occurrence = await this.occurrenceRepository.findFirstOpenIn();

    if (!occurrence) {
      return;
    }

    const { danger_level, latitude, longitude } = occurrence;

    if (
      danger_level !== 'Gold' &&
      danger_level !== 'Silver' &&
      danger_level !== 'Cooper' &&
      danger_level !== 'Wood'
    ) {
      return;
    }

    const heroRequired = dangerConfig.heroDangerRelation[danger_level];

    let heroes = await this.heroesRepository.findAvailableHeroesByRank(
      heroRequired,
    );

    const weightRequired = dangerConfig.dangerWeights[danger_level];

    const weightIndex = dangerConfig.heroWeights.findIndex(
      weight => weight === weightRequired,
    );

    if (heroes.length <= 0) {
      const availableHeroes = await this.heroesRepository.findAvailableHeroes();

      const lowerTiers: string[] = [];
      let i = weightIndex;
      while (i >= 0) {
        lowerTiers.push(dangerConfig.heroTiers[i]);
        i -= 1;
      }

      const checkForLowerTiers = availableHeroes.filter(hero =>
        lowerTiers.includes(hero.rank),
      );

      const checkForLowerTiersWithWeight = checkForLowerTiers.map(hero => {
        return {
          ...hero,
          // @ts-ignore
          weight: dangerConfig.heroTierWeight[hero.rank],
        };
      });

      if (checkForLowerTiersWithWeight) {
        const lowerTierWeight = checkForLowerTiersWithWeight.reduce(
          (accumulator, hero) => accumulator + hero.weight,
          0,
        );

        if (lowerTierWeight >= weightRequired) {
          heroes = checkForLowerTiers;
        }
      }
    }

    if (heroes.length <= 0) {
      const availableHeroes = await this.heroesRepository.findAvailableHeroes();

      const upperTiers: string[] = [];
      let i = weightIndex;
      while (i <= 3) {
        upperTiers.push(dangerConfig.heroTiers[i]);
        i += 1;
      }

      const checkForUpperTiers = availableHeroes.filter(hero =>
        upperTiers.includes(hero.rank),
      );

      if (checkForUpperTiers) {
        heroes = checkForUpperTiers;
      }
    }

    if (heroes.length <= 0) {
      return;
    }

    const heroesWithDistance = heroes.map(hero => {
      const distance = getDistance(
        { latitude, longitude },
        { latitude: hero.latitude, longitude: hero.longitude },
      );

      return {
        ...hero,
        // @ts-ignore
        weight: dangerConfig.heroTierWeight[hero.rank],
        distance,
      };
    });

    const sortedHeroesWithDistance = heroesWithDistance.sort((a, b) => {
      if (a.distance < b.distance) return -1;
      if (a.distance > b.distance) return 1;
      return 0;
    });

    let requirementMatch = 0;
    const heroesToAssign: Hero[] = [];

    for (let i = 0; i <= sortedHeroesWithDistance.length; i += 1) {
      requirementMatch += sortedHeroesWithDistance[i].weight;
      heroesToAssign.push(sortedHeroesWithDistance[i]);

      if (requirementMatch >= weightRequired) {
        break;
      }
    }

    const occurrenceHeroes = heroesToAssign.map(hero => ({
      hero_id: hero.id,
      occurrence_id: occurrence.id,
    }));

    // await this.occurrencesHeroesRepository.create(occurrenceHeroes);

    occurrence.status = 'in progress';

    await this.occurrenceRepository.save({
      occurrence,
      heroes: occurrenceHeroes,
    });

    const heroesIds = occurrenceHeroes.map(hero => hero.hero_id);

    await this.heroesRepository.setUnavailable(heroesIds);
  }
}

export default AssignOccurrenceService;
