import { getRepository, Repository } from 'typeorm';

import IOccurrencesHeroesRepository from '@modules/occurrences/repositories/IOccurrencesHeroesRepository';
import ICreateOccurrenceHeroDTO from '@modules/occurrences/dtos/ICreateOccurrenceHeroDTO';

import OccurrenceHero from '../entities/OccurrenceHero';

class OccurrencesRepository implements IOccurrencesHeroesRepository {
  private ormRepository: Repository<OccurrenceHero>;

  constructor() {
    this.ormRepository = getRepository(OccurrenceHero);
  }

  public async create(data: ICreateOccurrenceHeroDTO[]): Promise<void> {
    const occurrencesHeroes = this.ormRepository.create(data);

    await this.ormRepository.save(occurrencesHeroes);
  }

  public async findByHero(id: string): Promise<OccurrenceHero[]> {
    const occurrencesHeroes = await this.ormRepository.find({
      where: { hero_id: id },
    });

    return occurrencesHeroes;
  }

  public async findByOccurrence(id: string): Promise<OccurrenceHero[]> {
    const occurrencesHeroes = await this.ormRepository.find({
      where: { occurrence_id: id },
    });

    return occurrencesHeroes;
  }
}

export default OccurrencesRepository;
