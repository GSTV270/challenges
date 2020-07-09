import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { Container, Register } from './styles';

interface Hero {
  id: string;
  name: string;
  rank: string;
  latitude: number;
  longitude: number;
}

const HeroesManagment: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    api.get('/heroes').then((response) => {
      setHeroes(response.data);
    });
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/heroes/${id}`);

        setHeroes((oldState) => oldState.filter((hero) => hero.id !== id));
      } catch (err) {
        if (err.response.data.message === 'You can not delete a busy hero') {
          addToast({
            type: 'error',
            title: 'Erro na exclusão!',
            description: 'Você não pode excluir um herói que está em missão',
          });
        }
      }
    },
    [addToast],
  );

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
