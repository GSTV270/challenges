import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

import Header from '../../components/Header';
import HeroesOnDuty from '../../components/HeroesOnDuty';
import HeroesAvailable from '../../components/HeroesAvailable';
import HeroesManagment from '../../components/HeroesManagment';
import { Container, Menu, Data } from './styles';

const Occurrences: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);
  const { search } = useLocation();

  useEffect(() => {
    const parsedQuery = parse(search);

    if (parsedQuery.section) {
      setSelectedMenuItem(Number(parsedQuery.section));
    }
  }, [search]);

  return (
    <>
      <Header />
      <Container>
        <Menu>
          <button
            type="button"
            className={selectedMenuItem === 1 ? 'selected' : ''}
            onClick={() => setSelectedMenuItem(1)}
          >
            <p>Heróis em atendimento</p>
          </button>
          <button
            type="button"
            className={selectedMenuItem === 2 ? 'selected' : ''}
            onClick={() => setSelectedMenuItem(2)}
          >
            <p>Heróis disponíveis</p>
          </button>
          <button
            type="button"
            className={selectedMenuItem === 3 ? 'selected' : ''}
            onClick={() => setSelectedMenuItem(3)}
          >
            <p>Gerenciamento de heróis</p>
          </button>
        </Menu>
        <Data>
          {selectedMenuItem === 1 && <HeroesOnDuty />}
          {selectedMenuItem === 2 && <HeroesAvailable />}
          {selectedMenuItem === 3 && <HeroesManagment />}
        </Data>
      </Container>
    </>
  );
};

export default Occurrences;
