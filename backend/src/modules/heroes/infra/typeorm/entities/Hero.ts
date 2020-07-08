import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import OccurrenceHero from '@modules/occurrences/infra/typeorm/entities/OccurrenceHero';

@Entity('heroes')
class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rank: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => OccurrenceHero, occurrenceHero => occurrenceHero.hero)
  occurrence_hero: OccurrenceHero[];

  @Column()
  available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Hero;
