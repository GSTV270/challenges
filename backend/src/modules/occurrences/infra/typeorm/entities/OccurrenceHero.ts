import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Hero from '@modules/heroes/infra/typeorm/entities/Hero';
import Occurrence from './Occurrence';

@Entity('occurrences_heroes')
class OccurrenceHero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Occurrence, occurrence => occurrence.occurrence_hero, {
    eager: true,
  })
  @JoinColumn({ name: 'occurrence_id' })
  occurrence: Occurrence;

  @Column()
  occurrence_id: string;

  @ManyToOne(() => Hero, hero => hero.occurrence_hero, { eager: true })
  @JoinColumn({ name: 'hero_id' })
  hero: Hero;

  @Column()
  hero_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OccurrenceHero;
