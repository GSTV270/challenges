import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Container, Register } from './styles';
import api from '../../services/api';

interface Hero {
  id: string;
  name: string;
  rank: string;
  latitude: number;
  longitude: number;
}

const HeroesManagment: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    api.get('/heroes').then((response) => {
      setHeroes(response.data);
    });
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    await api.delete(`/heroes/${id}`);

    setHeroes((oldState) => oldState.filter((hero) => hero.id !== id));
  }, []);

  return (
    <>
      <Register>
        <Link to="/register-hero">Cadastrar Herói</Link>
      </Register>
      <Container>
        <div>
          <strong>Herói</strong>
          <strong>Nível</strong>
          <strong>Latitude</strong>
          <strong>Longitude</strong>
          <strong>Ações</strong>
        </div>
        {heroes.map((hero) => (
          <div key={hero.id}>
            <strong>{hero.name}</strong>
            <p>{hero.rank}</p>
            <p>{hero.latitude}</p>
            <p>{hero.longitude}</p>
            <div>
              <Link to={`/hero/${hero.id}`}>Editar</Link>
              <button type="button" onClick={() => handleDelete(hero.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default HeroesManagment;
