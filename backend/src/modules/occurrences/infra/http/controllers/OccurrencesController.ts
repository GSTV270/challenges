import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowOccurrenceService from '@modules/occurrences/services/ShowOccurrenceService';

export default class OccurrencesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOccurrence = container.resolve(ShowOccurrenceService);

    const occurrence = await showOccurrence.execute(id);

    return response.json(occurrence);
  }
}
