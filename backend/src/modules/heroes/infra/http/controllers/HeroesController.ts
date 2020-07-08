import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import CreateHeroService from '@modules/heroes/services/CreateHeroService';
import ShowHeroService from '@modules/heroes/services/ShowHeroService';
import UpdateHeroService from '@modules/heroes/services/UpdateHeroService';
import DeleteHeroService from '@modules/heroes/services/DeleteHeroService';
import ListHeroesService from '@modules/heroes/services/ListHeroesService';
import AssignOccurrenceService from '@modules/occurrences/services/AssignOccurrenceService';

export default class HeroesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listHeroes = container.resolve(ListHeroesService);

    const heroes = await listHeroes.execute();

    return response.json(heroes);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, rank, latitude, longitude } = request.body;

    if (rank !== 'S' && rank !== 'A' && rank !== 'B' && rank !== 'C') {
      throw new AppError('Invalid rank');
    }

    const createHero = container.resolve(CreateHeroService);

    const hero = await createHero.execute({ name, rank, latitude, longitude });

    const assignOccurrence = container.resolve(AssignOccurrenceService);

    await assignOccurrence.execute();

    return response.json(hero);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showHero = container.resolve(ShowHeroService);

    const hero = await showHero.execute(id);

    return response.json(hero);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, rank, latitude, longitude } = request.body;

    const updateHero = container.resolve(UpdateHeroService);

    const hero = await updateHero.execute({
      id,
      name,
      rank,
      latitude,
      longitude,
    });

    return response.json(hero);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteHero = container.resolve(DeleteHeroService);

    await deleteHero.execute(id);

    return response.status(204).json();
  }
}
