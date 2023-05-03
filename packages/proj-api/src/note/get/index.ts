import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const noteId = parseRequestString(event);

    const dbOut = await pool.query(`SELECT * FROM "note" where id=${noteId}`);

    return lambdaResponse(200, { note: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
    const { pathParameters } = event;
    if (!pathParameters) throw Error('Search parameters must be specified');
    const { noteId } = pathParameters;
    if (!noteId) throw Error('Note id must be specified in url path params as /note/{noteId}');
    const id = Number(noteId);
    if (!id) throw Error("Note id must be a number");
    return id;
  };