import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IHeroesRepository from '@modules/heroes/repositories/IHeroesRepository';
import HeroesRepository from '@modules/heroes/infra/typeorm/repositories/HeroesRepository';

import IOccurrencesRepository from '@modules/occurrences/repositories/IOccurrencesRepository';
import OccurrencesRepository from '@modules/occurrences/infra/typeorm/repositories/OccurrencesRepository';

import IOccurrencesHeroesRepository from '@modules/occurrences/repositories/IOccurrencesHeroesRepository';
import OccurrencesHeroesRepository from '@modules/occurrences/infra/typeorm/repositories/OccurrencesHeroesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHeroesRepository>(
  'HeroesRepository',
  HeroesRepository,
);

container.registerSingleton<IOccurrencesRepository>(
  'OccurrencesRepository',
  OccurrencesRepository,
);

container.registerSingleton<IOccurrencesHeroesRepository>(
  'OccurrencesHeroesRepository',
  OccurrencesHeroesRepository,
);
