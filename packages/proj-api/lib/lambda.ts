import { APIGatewayProxyResult } from 'aws-lambda';

export type LambdaResponseFunc = (
  statusCode: number,
  body: object,
  headers?: {
    [header: string]: boolean | number | string;
  }
) => Promise<APIGatewayProxyResult>;

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  "Access-Control-Allow-Credentials" : true,
  "Content-Type": "application/json"
};

export const lambdaResponse: LambdaResponseFunc = (statusCode, body, headers = defaultHeaders) => {
  const response = {
    statusCode,
    headers,
    body: body ? JSON.stringify(body) : '',
  };
  console.log('Response (first 100000 chars):', JSON.stringify(response).substr(0, 100000));

  return Promise.resolve(response);
};