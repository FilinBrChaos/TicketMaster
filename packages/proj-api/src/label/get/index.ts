import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const labelId = parseRequestString(event);

    const dbOut = await pool.query(`SELECT * FROM "label" where id=${labelId}`);

    return lambdaResponse(200, { label: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
    const { pathParameters } = event;
    if (!pathParameters) throw Error('Search parameters must be specified');
    const { labelId } = pathParameters;
    if (!labelId) throw Error('Label id must be specified in url path params as /label/{labelId}');
    const id = Number(labelId);
    if (!id) throw Error("Label id must be a number");
    return id;
};