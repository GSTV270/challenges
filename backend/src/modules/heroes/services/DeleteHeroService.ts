import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IHeroesRepository from '../repositories/IHeroesRepository';

@injectable()
class DeleteHeroService {
  constructor(
    @inject('HeroesRepository')
    private heroesRepository: IHeroesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const hero = await this.heroesRepository.findById(id);

    if (!hero) {
      throw new AppError('This hero does not exists');
    }

    if (!hero.available) {
      throw new AppError('You can not delete a busy hero');
    }

    return this.heroesRepository.delete(id);
  }
}

export default DeleteHeroService;
