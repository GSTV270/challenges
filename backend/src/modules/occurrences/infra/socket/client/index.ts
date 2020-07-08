import io from 'socket.io-client';

import OccurrenceSocketClientController from '../controllers/OccurenceSocketClientController';

const occurrenceSocketClientController = new OccurrenceSocketClientController();

interface Occurrence {
  location: Array<{
    lat: number;
    lng: number;
  }>;
  dangerLevel: string;
  monsterName: string;
}

const socket = io('https://zrp-challenge-socket.herokuapp.com:443');

socket.on('occurrence', (data: Occurrence) => {
  occurrenceSocketClientController.create(data);
});
