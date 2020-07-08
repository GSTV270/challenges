import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AssignOccurrenceService from '@modules/occurrences/services/AssignOccurrenceService';
import ListSolvedOccurrencesService from '@modules/occurrences/services/ListSolvedOccurrencesService';
import SetSolvedOccurrenceService from '@modules/occurrences/services/SetSolvedOccurrenceService';

export default class SolvedOccurrencesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSolvedOccurrences = container.resolve(
      ListSolvedOccurrencesService,
    );

    const solvedOccurrences = await listSolvedOccurrences.execute();

    return response.json(solvedOccurrences);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const setSolvedOccurrence = container.resolve(SetSolvedOccurrenceService);

    await setSolvedOccurrence.execute(id);

    const assignOccurrence = container.resolve(AssignOccurrenceService);

    await assignOccurrence.execute();

    return response.status(204).json();
  }
}
