import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAvailableHeroesService from '@modules/heroes/services/ListAvailableHeroesService';

export default class AvailableHeroesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAvailableHeroes = container.resolve(ListAvailableHeroesService);

    const heroes = await listAvailableHeroes.execute();

    return response.json(heroes);
  }
}
