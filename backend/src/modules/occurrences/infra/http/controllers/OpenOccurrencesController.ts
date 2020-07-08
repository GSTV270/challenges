import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOpenOccurrencesService from '@modules/occurrences/services/ListOpenOccurrencesService';

export default class OpenOccurrencesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOpenOccurrences = container.resolve(ListOpenOccurrencesService);

    const heroes = await listOpenOccurrences.execute();

    return response.json(heroes);
  }
}
