import { uuid } from 'uuidv4';

import IOccurrencesRepository from '@modules/occurrences/repositories/IOccurrencesRepository';
import ICreateOccurrenceDTO from '@modules/occurrences/dtos/ICreateOccurrenceDTO';
import ISetAssignmentDTO from '@modules/occurrences/dtos/ISetAssignmentDTO';

import Occurrence from '../../infra/typeorm/entities/Occurrence';

class FakeOccurrencesRepository implements IOccurrencesRepository {
  private occurrences: Occurrence[] = [];

  public async findByStatus(status: string): Promise<Occurrence[]> {
    const occurrences = this.occurrences.filter(
      occurrence => occurrence.status === status,
    );

    return occurrences;
  }

  public async findFirstOpenIn(): Promise<Occurrence | undefined> {
    const openOccurrences = this.occurrences.filter(
      occurrence => occurrence.status === 'open',
    );

    const firstOpenOccurrence = openOccurrences[0];

    return firstOpenOccurrence;
  }

  public async findById(id: string): Promise<Occurrence | undefined> {
    const occurrence = this.occurrences.find(occur => occur.id === id);

    return occurrence;
  }

  public async setSolved(id: string): Promise<void> {
    const findIndex = this.occurrences.findIndex(
      findOccurence => findOccurence.id === id,
    );

    const occurrence = this.occurrences[findIndex];

    occurrence.status = 'solved';

    this.occurrences[findIndex] = occurrence;
  }

  public async create({
    latitude,
    longitude,
    dangerLevel,
    monsterName,
    status,
  }: ICreateOccurrenceDTO): Promise<Occurrence> {
    const occurrence = new Occurrence();

    const date = new Date();

    Object.assign(occurrence, {
      id: uuid(),
      latitude,
      longitude,
      occurrence_hero: [],
      danger_level: dangerLevel,
      monster_name: monsterName,
      status,
      created_at: date,
      updated_at: date,
    });

    this.occurrences.push(occurrence);

    return occurrence;
  }

  public async save(occurrenceData: ISetAssignmentDTO): Promise<Occurrence> {
    const { occurrence } = occurrenceData;

    const findIndex = this.occurrences.findIndex(
      findOccurence => findOccurence.id === occurrence.id,
    );

    this.occurrences[findIndex] = occurrence;

    return occurrence;
  }
}

export default FakeOccurrencesRepository;
