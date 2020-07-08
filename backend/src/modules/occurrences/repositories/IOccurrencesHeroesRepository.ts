import ICreateOccurrenceHeroDTO from '../dtos/ICreateOccurrenceHeroDTO';
import OccurrenceHero from '../infra/typeorm/entities/OccurrenceHero';

export default interface IOccurrencesHeroesRepository {
  findByOccurrence(occurrenceId: string): Promise<OccurrenceHero[]>;
  findByHero(heroId: string): Promise<OccurrenceHero[]>;
  create(data: ICreateOccurrenceHeroDTO[]): Promise<void>;
}
