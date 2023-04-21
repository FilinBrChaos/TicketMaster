import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { deleteWithId } from "../../../services/dbservice";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const userId = parseRequestString(event);

    const dbOut = await deleteWithId(pool, 'user', userId);

    return lambdaResponse(200, { user: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
  const { pathParameters } = event;
  if (!pathParameters) throw Error('Search parameters must be specified');
  const { userId } = pathParameters;
  if (!userId) throw Error('User id must be specified in url path params as /user/{userId}');
  const id = Number(userId);
  if (!id) throw Error("User id must be a number");
  return id;
};