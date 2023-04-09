import { APIGatewayProxyEvent } from "aws-lambda";

export interface Event {
    body: any
}

export const parseEvent = (event: APIGatewayProxyEvent): Event => {
    if (!event.body) throw { err: "no body" }
    return { 
        body: JSON.parse(event.body) 
    };
}