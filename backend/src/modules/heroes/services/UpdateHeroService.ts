import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHeroesRepository from '../repositories/IHeroesRepository';
import Hero from '../infra/typeorm/entities/Hero';

interface IRequest {
  id: string;
  name: string;
  rank: string;
  latitude: number;
  longitude: number;
}

@injectable()
class UpdateHeroService {
  constructor(
    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,
  ) {}

  public async execute({
    id,
    name,
    rank,
    latitude,
    longitude,
  }: IRequest): Promise<Hero> {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new AppError('This hero does not exists');
    }

    if (name !== hero.name) {
      const findHeroByName = await this.heroesRepository.findByName(name);

      if (findHeroByName) {
        throw new AppError('This hero already exists');
      }
    }

    Object.assign(hero, {
      name,
      rank,
      latitude,
      longitude,
    });

    return this.heroesRepository.save(hero);
  }
}

export default UpdateHeroService;
