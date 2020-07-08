import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import OccurrenceHero from './OccurrenceHero';

@Entity('occurrences')
class Occurrence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  danger_level: string;

  @Column()
  monster_name: string;

  @Column()
  status: string;

  @OneToMany(
    () => OccurrenceHero,
    occurrenceHero => occurrenceHero.occurrence,
    {
      cascade: true,
    },
  )
  occurrence_hero: OccurrenceHero[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Occurrence;
