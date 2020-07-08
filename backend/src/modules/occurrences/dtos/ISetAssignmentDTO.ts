import Occurrence from '../infra/typeorm/entities/Occurrence';

interface HeroAssigned {
  hero_id: string;
  occurrence_id: string;
}

export default interface ISetAssignmentDTO {
  occurrence: Occurrence;
  heroes: HeroAssigned[];
}
