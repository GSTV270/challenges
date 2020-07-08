import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import HeroesController from '../controllers/HeroesController';
import AvailableHeroesController from '../controllers/AvailableHeroesController';
import UnavailableHeroesController from '../controllers/UnavailableHeroesController';

const heroesRouter = Router();

const heroesController = new HeroesController();
const availableHeroesController = new AvailableHeroesController();
const unavailableHeroesController = new UnavailableHeroesController();

heroesRouter.get('/available', availableHeroesController.index);
heroesRouter.get('/unavailable', unavailableHeroesController.index);

heroesRouter.get('/', heroesController.index);
heroesRouter.get('/:id', heroesController.show);
heroesRouter.delete('/:id', heroesController.delete);
heroesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      rank: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  heroesController.create,
);
heroesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      rank: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  heroesController.update,
);

export default heroesRouter;
