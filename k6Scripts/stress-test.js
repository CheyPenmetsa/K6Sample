import http from 'k6/http';
import { sleep } from 'k6';
import * as config from './config.js';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '30s', target: 5 },
        { duration: '5s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '5s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '30s', target: 200 },
        { duration: '5s', target: 300 },
        { duration: '30s', target: 300 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<6000'], // 95% of requests should be below 6000ms or 6 seconds
    },
};

export default function() {
    http.get(config.RANDOM_NUMBER_ENDPOINT);
    sleep(1);
    http.get(config.RANDOM_NUMBER_WITH_DELAY_ENDPOINT);
    sleep(1);
    http.get(config.STRING_REVERSE_ENDPOINT.replace('{str}', 'sample'));
    sleep(1);
}