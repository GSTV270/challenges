import React, { useEffect, useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import Button from '../../components/Button';
import { Container, Content, Information } from './styles';
import api from '../../services/api';

interface Params {
  id: string;
}

const Hero: React.FC = () => {
  const [name, setName] = useState('Saitama');
  const [rank, setRank] = useState('S');
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    -23.433757217972598,
    -46.71878099441529,
  ]);
  const { addToast } = useToast();
  const { params } = useRouteMatch<Params>();
  const history = useHistory();

  useEffect(() => {
    api.get(`/heroes/${params.id}`).then((response) => {
      setName(response.data.name);
      setRank(response.data.rank);
      setSelectedPosition([response.data.latitude, response.data.longitude]);
    });
  }, [params]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setInitialPosition([latitude, longitude]);
      },
      (error) => console.warn(error),
      { enableHighAccuracy: true },
    );
  }, []);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handlePositionChange = useCallback((value, field) => {
    if (field === 'lat') {
      setSelectedPosition((oldState) => [value, oldState[1]]);
    }
    if (field === 'lng') {
      setSelectedPosition((oldState) => [oldState[0], value]);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      if (rank !== 'S' && rank !== 'A' && rank !== 'B' && rank !== 'C') {
        addToast({ type: 'error', title: 'Ranking inválido!' });
        return;
      }

      const data = {
        id: params.id,
        name,
        rank,
        latitude: selectedPosition[0],
        longitude: selectedPosition[1],
      };

      await api.put('/heroes', data);

      addToast({
        type: 'success',
        title: 'Herói atualizado com sucesso!',
      });

      history.push('/heroes?section=3');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Houve uma falha!',
        description:
          'Houve uma falha ao atualizar o herói, cheque os dados inseridos',
      });
    }
  }, [addToast, rank, name, selectedPosition, params, history]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/heroes?section=3">
            <FiArrowLeft />
          </Link>
          <h1>Herói: Saitama</h1>
        </div>
      </header>

      <Content>
        <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={selectedPosition} />
        </Map>
        <Information>
          <div>
            <strong>Nome do Herói</strong>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <strong>Ranking (S/A/B/C)</strong>
            <input
              value={rank}
              onChange={(e) => setRank(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <strong>Latitude</strong>
            <input
              value={selectedPosition[0]}
              onChange={(e) => handlePositionChange(e.target.value, 'lat')}
            />
          </div>
          <div>
            <strong>Longitude</strong>
            <input
              value={selectedPosition[1]}
              onChange={(e) => handlePositionChange(e.target.value, 'lng')}
            />
          </div>
          <Button type="button" onClick={handleSubmit}>
            Atualizar Herói
          </Button>
        </Information>
      </Content>
    </Container>
  );
};

export default Hero;
