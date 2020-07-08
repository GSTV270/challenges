import React, { useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';

import { FiRefreshCw } from 'react-icons/fi';
import { Container, Update } from './styles';
import api from '../../services/api';

interface Occurrence {
  id: string;
  monster_name: string;
  danger_level: string;
  latitude: number;
  longitude: number;
  updated_at: Date;
  heroes: string;
}

const OccurrencesOngoing: React.FC = () => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [lastUpdate, setLastUpdate] = useState('');

  const getData = useCallback(() => {
    api.get('/occurrences/in-progress').then((response) => {
      setOccurrences(response.data);
    });

    const date = new Date();

    const formattedDate = format(date, 'HH:mm');

    setLastUpdate(formattedDate);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSolved = useCallback(async (occurrenceId: string) => {
    await api.patch(`/occurrences/set-solved/${occurrenceId}`);

    setOccurrences((oldState) => oldState.filter((o) => o.id !== occurrenceId));
  }, []);

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
          <strong>Ameaça</strong>
          <strong>Nível</strong>
          <strong>Latitude</strong>
          <strong>Longitude</strong>
          <strong>Herói(s) Alocado(s)</strong>
        </div>
        {occurrences.map((occurrence) => (
          <div key={occurrence.id}>
            <strong>{occurrence.monster_name}</strong>
            <p>{occurrence.danger_level}</p>
            <p>{occurrence.latitude}</p>
            <p>{occurrence.longitude}</p>
            <p>{occurrence.heroes}</p>
            <button type="button" onClick={() => handleSolved(occurrence.id)}>
              Concluída
            </button>
          </div>
        ))}
      </Container>
    </>
  );
};

export default OccurrencesOngoing;
