import { uuid } from 'uuidv4';

import IOccurrencesHeroesRepository from '@modules/occurrences/repositories/IOccurrencesHeroesRepository';
import ICreateOccurrenceHeroDTO from '@modules/occurrences/dtos/ICreateOccurrenceHeroDTO';

import OccurrenceHero from '../../infra/typeorm/entities/OccurrenceHero';

class FakeOccurrencesRepository implements IOccurrencesHeroesRepository {
  private occurrencesHeroes: OccurrenceHero[] = [];

  public async create(data: ICreateOccurrenceHeroDTO[]): Promise<void> {
    data.forEach(occurrenceHeroRegister => {
      const occurrenceHero = new OccurrenceHero();

      const date = new Date();

      Object.assign(occurrenceHero, {
        id: uuid(),
        hero_id: occurrenceHeroRegister.hero_id,
        occurrence_id: occurrenceHeroRegister.occurrence_id,
        created_at: date,
        updated_at: date,
      });

      this.occurrencesHeroes.push(occurrenceHero);
    });
  }

  public async findByHero(id: string): Promise<OccurrenceHero[]> {
    const occurenceHeroes = this.occurrencesHeroes.filter(
      o => o.hero_id === id,
    );
    return occurenceHeroes;
  }

  public async findByOccurrence(id: string): Promise<OccurrenceHero[]> {
    const occurenceHeroes = this.occurrencesHeroes.filter(
      o => o.occurrence_id === id,
    );
    return occurenceHeroes;
  }
}

export default FakeOccurrencesRepository;
