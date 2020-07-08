import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import api from '../../services/api';

interface Occurrence {
  id: string;
  monster_name: string;
  danger_level: string;
  latitude: number;
  longitude: number;
  date: Date;
}

const OccurrencesHistory: React.FC = () => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  useEffect(() => {
    api.get('/occurrences/solved').then((response) => {
      setOccurrences(response.data);
    });
  }, []);

  return (
    <Container>
      <div>
        <strong>Ameaça</strong>
        <strong>Nível</strong>
        <strong>Latitude</strong>
        <strong>Longitude</strong>
        <strong>Data de Conclusão</strong>
      </div>
      {occurrences.map((occurrence) => (
        <div key={occurrence.id}>
          <strong>{occurrence.monster_name}</strong>
          <p>{occurrence.danger_level}</p>
          <p>{occurrence.latitude}</p>
          <p>{occurrence.longitude}</p>
          <p>{occurrence.date}</p>
          <Link to={`/occurrence/${occurrence.id}`}>Detalhes</Link>
        </div>
      ))}
    </Container>
  );
};

export default OccurrencesHistory;
