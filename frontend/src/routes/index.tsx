import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Occurrences from '../pages/Occurrences';
import Occurrence from '../pages/Occurrence';
import Heroes from '../pages/Heroes';
import Hero from '../pages/Hero';
import NewHero from '../pages/NewHero';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/occurrences/" exact component={Occurrences} isPrivate />
      <Route path="/occurrence/:id" exact component={Occurrence} isPrivate />
      <Route path="/heroes" exact component={Heroes} isPrivate />
      <Route path="/hero/:id" exact component={Hero} isPrivate />
      <Route path="/register-hero" exact component={NewHero} isPrivate />
      <Route path="/profile" exact component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
