import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/EnsureAuthenticated';
import OpenOccurrencesController from '../controllers/OpenOccurrencesController';
import InProgressOccurrencesController from '../controllers/InProgressOccurrencesController';
import SolvedOccurrencesController from '../controllers/SolvedOccurrencesController';
import OccurrencesController from '../controllers/OccurrencesController';

const occurrencesRouter = Router();

const openOccurrencesController = new OpenOccurrencesController();
const inProgressOccurrencesController = new InProgressOccurrencesController();
const solvedOccurrencesController = new SolvedOccurrencesController();
const occurrencesController = new OccurrencesController();

occurrencesRouter.use(ensureAuthenticated);

occurrencesRouter.get('/open', openOccurrencesController.index);
occurrencesRouter.get('/in-progress', inProgressOccurrencesController.index);
occurrencesRouter.patch('/set-solved/:id', solvedOccurrencesController.update);
occurrencesRouter.get('/solved', solvedOccurrencesController.index);
occurrencesRouter.get('/:id', occurrencesController.show);

export default occurrencesRouter;
