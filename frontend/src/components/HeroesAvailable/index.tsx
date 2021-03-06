import React, { useEffect, useState, useCallback } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

import { format } from 'date-fns';
import { Container, Update } from './styles';
import api from '../../services/api';

interface Hero {
  id: string;
  name: string;
  rank: string;
  latitude: number;
  longitude: number;
}

const HeroesAvailable: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const getData = useCallback(() => {
    api.get('/heroes/available').then((response) => {
      setHeroes(response.data);
    });

    const date = new Date();

    const formattedDate = format(date, 'HH:mm');

    setLastUpdate(formattedDate);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Update>
        <div>
          <button type="button" onClick={getData}>
            <FiRefreshCw size={20} />
          </button>
          <p>Atualizado às {lastUpdate}</p>
        </div>
      </Update>
      <Container>
        <div>
          <strong>Herói</strong>
          <strong>Nível</strong>
          <strong>Latitude</strong>
          <strong>Longitude</strong>
        </div>
        {heroes.map((hero) => (
          <div key={hero.id}>
            <strong>{hero.name}</strong>
            <p>{hero.rank}</p>
            <p>{hero.latitude}</p>
            <p>{hero.longitude}</p>
          </div>
        ))}
      </Container>
    </>
  );
};

export default HeroesAvailable;
