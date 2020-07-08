import { getRepository, Repository } from 'typeorm';

import IOccurrencesRepository from '@modules/occurrences/repositories/IOccurrencesRepository';
import ICreateOccurrenceDTO from '@modules/occurrences/dtos/ICreateOccurrenceDTO';

import ISetAssignmentDTO from '@modules/occurrences/dtos/ISetAssignmentDTO';
import Occurrence from '../entities/Occurrence';

class OccurrencesRepository implements IOccurrencesRepository {
  private ormRepository: Repository<Occurrence>;

  constructor() {
    this.ormRepository = getRepository(Occurrence);
  }

  public async findByStatus(status: string): Promise<Occurrence[]> {
    const occurrences = await this.ormRepository.find({
      where: { status },
      order: { updated_at: 'DESC' },
      relations: ['occurrence_hero'],
    });

    return occurrences;
  }

  public async findFirstOpenIn(): Promise<Occurrence | undefined> {
    const occurrence = await this.ormRepository.findOne({
      where: { status: 'open' },
      order: { created_at: 'ASC' },
    });

    return occurrence;
  }

  public async findById(id: string): Promise<Occurrence | undefined> {
    const occurrence = await this.ormRepository.findOne(id, {
      relations: ['occurrence_hero'],
    });

    return occurrence;
  }

  public async setSolved(id: string): Promise<void> {
    await this.ormRepository.update(id, { status: 'solved' });
  }

  public async create({
    latitude,
    longitude,
    dangerLevel,
    monsterName,
    status,
  }: ICreateOccurrenceDTO): Promise<Occurrence> {
    const occurrence = this.ormRepository.create({
      latitude,
      longitude,
      danger_level: dangerLevel,
      monster_name: monsterName,
      status,
    });

    await this.ormRepository.save(occurrence);

    return occurrence;
  }

  public async save({
    occurrence,
    heroes,
  }: ISetAssignmentDTO): Promise<Occurrence> {
    return this.ormRepository.save({
      ...occurrence,
      occurrence_hero: heroes,
    });
  }
}

export default OccurrencesRepository;
