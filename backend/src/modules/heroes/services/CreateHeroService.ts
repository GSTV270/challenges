import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHeroesRepository from '../repositories/IHeroesRepository';
import Hero from '../infra/typeorm/entities/Hero';

interface IRequest {
  name: string;
  rank: string;
  latitude: number;
  longitude: number;
}

@injectable()
class CreateHeroService {
  constructor(
    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,
  ) {}

  public async execute({
    name,
    rank,
    latitude,
    longitude,
  }: IRequest): Promise<Hero> {
    const findHeroByName = await this.heroesRepository.findByName(name);

    if (findHeroByName) {
      throw new AppError('This hero already exists');
    }

    const hero = await this.heroesRepository.create({
      name,
      rank,
      latitude,
      longitude,
    });

    return hero;
  }
}

export default CreateHeroService;
