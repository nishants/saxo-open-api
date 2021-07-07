import http from 'k6/http';
import { check } from 'k6';
import signalr from '@microsoft/signalr';

export default function () {
  console.log("Hello i am running")
  console.log("SingalR", signalr);
  const title= 'Load Impact is now k6';
  check('Load Impact is now k6', {
    'has correct title': () => title == 'Load Impact is now k6',
  });
}
