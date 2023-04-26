import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const ticketId = parseRequestString(event);

    const dbOut = await pool.query(`SELECT * FROM "ticket" where id=${ticketId}`);

    return lambdaResponse(200, { ticket: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
  const { pathParameters } = event;
  if (!pathParameters) throw Error('Search parameters must be specified');
  const { ticketId } = pathParameters;
  if (!ticketId) throw Error('Ticket id must be specified in url path params as /tickets/{ticketId}');
  const id = Number(ticketId);
  if (!id) throw Error("Ticket id must be a number");
  return id;
};