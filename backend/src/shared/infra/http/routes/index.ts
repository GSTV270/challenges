import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import heroesRouter from '@modules/heroes/infra/http/routes/heroes.routes';
import occurrencesRouter from '@modules/occurrences/infra/http/routes/occurrences.routes';

const routes = Router();

routes.use('/heroes', heroesRouter);
routes.use('/occurrences', occurrencesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

export default routes;
