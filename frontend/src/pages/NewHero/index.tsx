import React, { useEffect, useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import Button from '../../components/Button';
import { Container, Content, Information } from './styles';
import api from '../../services/api';

const NewHero: React.FC = () => {
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const { addToast } = useToast();
  const history = useHistory();

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
        name,
        rank,
        latitude: selectedPosition[0],
        longitude: selectedPosition[1],
      };

      await api.post('/heroes', data);

      addToast({
        type: 'success',
        title: 'Herói cadastrado com sucesso!',
      });

      history.push('/heroes?section=3');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Houve uma falha no cadastro do herói!',
      });
    }
  }, [addToast, rank, name, selectedPosition, history]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/heroes?section=3">
            <FiArrowLeft />
          </Link>
          <h1>Cadastrar Herói</h1>
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
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Saitama"
            />
          </div>
          <div>
            <strong>Ranking (S/A/B/C)</strong>
            <input
              value={rank}
              onChange={(e) => setRank(e.target.value.toUpperCase())}
              placeholder="Ex: S"
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
            Cadastrar herói
          </Button>
        </Information>
      </Content>
    </Container>
  );
};

export default NewHero;
