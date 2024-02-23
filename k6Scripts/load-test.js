import http from 'k6/http';
import { sleep } from 'k6';
import * as config from './config.js';

export const options = {
    stages: [
        { duration: '5s', target: 5 },
        { duration: '30s', target: 5 },
        { duration: '5s', target: 10 },
        { duration: '30s', target: 10 },
        { duration: '5s', target: 20 },
        { duration: '30s', target: 20 },
        { duration: '5s', target: 10 },
        { duration: '30s', target: 10 },
        { duration: '5s', target: 5 },
        { duration: '30s', target: 5 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<600'],// 95% of requests should be below 600ms
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