import Occurrence from '../infra/typeorm/entities/Occurrence';
import ICreateOccurrenceDTO from '../dtos/ICreateOccurrenceDTO';
import ISetAssignmentDTO from '../dtos/ISetAssignmentDTO';

export default interface IOccurrencesRepository {
  findFirstOpenIn(): Promise<Occurrence | undefined>;
  findByStatus(status: string): Promise<Occurrence[]>;
  findById(id: string): Promise<Occurrence | undefined>;
  setSolved(id: string): Promise<void>;
  create(data: ICreateOccurrenceDTO): Promise<Occurrence>;
  save(occurrence: ISetAssignmentDTO): Promise<Occurrence>;
}
