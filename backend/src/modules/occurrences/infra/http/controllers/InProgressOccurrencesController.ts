import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListInProgressOccurrencesService from '@modules/occurrences/services/ListInProgressOccurrencesService';

export default class InProgressOccurrencesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listInProgressOccurrences = container.resolve(
      ListInProgressOccurrencesService,
    );

    const heroes = await listInProgressOccurrences.execute();

    return response.json(heroes);
  }
}
