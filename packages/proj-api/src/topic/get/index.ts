import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const topicId = parseRequestString(event);

    const dbOut = await pool.query(`SELECT * FROM "topic" where id=${topicId}`);

    return lambdaResponse(200, { topic: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
    const { pathParameters } = event;
    if (!pathParameters) throw Error('Search parameters must be specified');
    const { topicId } = pathParameters;
    if (!topicId) throw Error('Topic id must be specified in url path params as /topic/{topicId}');
    const id = Number(topicId);
    if (!id) throw Error("Topic id must be a number");
    return id;
};