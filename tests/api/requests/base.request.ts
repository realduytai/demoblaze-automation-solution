import supertest from 'supertest';
import { headers } from '../materials/headers.material.ts';

export async function sendPOSTRequest(baseUrl: any, apiEndPoint: any, requestBody: any) {
    try {
        return await supertest(baseUrl)
            .post(apiEndPoint)
            .retry(2)
            .set(headers.ACCEPT_JSON)
            .set(headers.APPLICATION_JSON)
            .send(requestBody);
    } catch (err) {
        console.log('Error in sending POST Request: ', err);
    }
}

export async function sendGETRequest(baseUrl: any, apiEndPoint: any) {
    try {
        return await supertest(baseUrl).get(apiEndPoint).retry(2).set(headers.ACCEPT_JSON).set(headers.APPLICATION_JSON);
    } catch (err) {
        console.log('Error in sending GET Request: ', err);
    }
}

// TODO: add more methods to request different request types in needed
