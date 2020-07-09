import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { Link, useRouteMatch } from 'react-router-dom';

import { Container, Content, Information } from './styles';
import api from '../../services/api';

interface Params {
  id: string;
}

interface Occurrence {
  danger_level: string;
  monster_name: string;
  latitude: number;
  longitude: number;
  formattedDate: Date;
  heroes: Array<{
    name: string;
    rank: string;
  }>;
}

const Occurrence: React.FC = () => {
  const [occurrence, setOccurrence] = useState<Occurrence>({} as Occurrence);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const { params } = useRouteMatch<Params>();

  useEffect(() => {
    api.get(`/occurrences/${params.id}`).then((response) => {
      setOccurrence({
        ...response.data.occurrence,
        formattedDate: response.data.formattedDate,
        heroes: response.data.heroes,
      });
      setInitialPosition([
        response.data.occurrence.latitude,
        response.data.occurrence.longitude,
      ]);
    });
  }, [params.id]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/occurrences?section=3">
            <FiArrowLeft />
          </Link>
          <h1>Ocorrência: {occurrence.monster_name}</h1>
        </div>
      </header>

      <Content>
        <Map center={initialPosition} zoom={15}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={initialPosition} />
        </Map>
        <Information>
          <div>
            <strong>Nome do Monstro</strong>
            <p>{occurrence.monster_name}</p>
          </div>
          <div>
            <strong>Nível de Ameaça</strong>
            <p>{occurrence.danger_level}</p>
          </div>
          <div>
            <strong>Derrotado em</strong>
            <p>{occurrence.formattedDate}</p>
          </div>
          <div>
            <strong>Derrotado por</strong>
            {occurrence.heroes &&
              occurrence.heroes.map((hero) => (
                <p>
                  {hero.name} | {hero.rank}
                </p>
              ))}
          </div>
          <div>
            <strong>Latitude</strong>
            <p>{occurrence.latitude}</p>
          </div>
          <div>
            <strong>Longitude</strong>
            <p>{occurrence.longitude}</p>
          </div>
        </Information>
      </Content>
    </Container>
  );
};

export default Occurrence;
