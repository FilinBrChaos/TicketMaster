import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { getAllRecords } from '../../../services/dbservice';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const retroId = parseRequestString(event);

    const result = await pool.query(`SELECT * FROM "note" where retro_id=${retroId}`);

    return lambdaResponse(200, { notes: result.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
    const { pathParameters } = event;
    if (!pathParameters) throw Error('Search parameters must be specified');
    const { retroId } = pathParameters;
    if (!retroId) throw Error('Retro id must be specified in url path params as /notes/{retroId}');
    const id = Number(retroId);
    if (!id) throw Error("Retro id must be a number");
    return id;
  };