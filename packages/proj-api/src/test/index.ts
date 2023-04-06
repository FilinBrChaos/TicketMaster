import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { lambdaResponse } from '../utils/lambda';

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    console.log('something');
    return lambdaResponse(200, { status: "ok", event: JSON.stringify(event) });
}