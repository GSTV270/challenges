import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUnavailableHeroesService from '@modules/heroes/services/ListUnavailableHeroesService';

export default class UnavailableHeroesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUnavailableHeroes = container.resolve(
      ListUnavailableHeroesService,
    );

    const heroes = await listUnavailableHeroes.execute();

    return response.json(heroes);
  }
}
