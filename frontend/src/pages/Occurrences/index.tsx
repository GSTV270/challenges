import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

import Header from '../../components/Header';
import OccurrencesOngoing from '../../components/OccurrencesOngoing';
import OccurrencesOnHold from '../../components/OccurrencesOnHold';
import OccurrencesHistory from '../../components/OccurrencesHistory';
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
            <p>Ocorrências em atendimento</p>
          </button>
          <button
            type="button"
            className={selectedMenuItem === 2 ? 'selected' : ''}
            onClick={() => setSelectedMenuItem(2)}
          >
            <p>Ocorrências em espera</p>
          </button>
          <button
            type="button"
            className={selectedMenuItem === 3 ? 'selected' : ''}
            onClick={() => setSelectedMenuItem(3)}
          >
            <p>Histórico de ocorrências</p>
          </button>
        </Menu>
        <Data>
          {selectedMenuItem === 1 && <OccurrencesOngoing />}
          {selectedMenuItem === 2 && <OccurrencesOnHold />}
          {selectedMenuItem === 3 && <OccurrencesHistory />}
        </Data>
      </Container>
    </>
  );
};

export default Occurrences;
