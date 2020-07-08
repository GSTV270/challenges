import React, { useEffect, useState, useCallback } from 'react';

import { FiRefreshCw } from 'react-icons/fi';
import { format } from 'date-fns';
import { Container, Update } from './styles';
import api from '../../services/api';

interface Occurrence {
  id: string;
  monster_name: string;
  danger_level: string;
  latitude: number;
  longitude: number;
  date: Date;
}

const OccurrencesOnHold: React.FC = () => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [lastUpdate, setLastUpdate] = useState('');

  const getData = useCallback(() => {
    api.get('/occurrences/open').then((response) => {
      setOccurrences(response.data);
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
          <strong>Ameaça</strong>
          <strong>Nível</strong>
          <strong>Latitude</strong>
          <strong>Longitude</strong>
          <strong>Data</strong>
        </div>
        {occurrences.map((occurrence) => (
          <div key={occurrence.id}>
            <strong>{occurrence.monster_name}</strong>
            <p>{occurrence.danger_level}</p>
            <p>{occurrence.latitude}</p>
            <p>{occurrence.longitude}</p>
            <p>{occurrence.date}</p>
          </div>
        ))}
      </Container>
    </>
  );
};

export default OccurrencesOnHold;
