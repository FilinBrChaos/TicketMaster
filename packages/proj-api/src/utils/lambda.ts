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
};

export const lambdaResponse: LambdaResponseFunc = (statusCode, body, headers = defaultHeaders) => {
  const response = {
    statusCode,
    headers,
    body: body ? JSON.stringify(body) : '',
  };
  console.log('Response (first 10000 chars):', JSON.stringify(response).substr(0, 10000));

  return Promise.resolve(response);
};