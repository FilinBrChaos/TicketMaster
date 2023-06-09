import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const queryParams = event.queryStringParameters;

    if (!queryParams) throw { message: 'query params must be present' }
    if (!queryParams.ticket_id) throw { message: '"ticket_id" must be present in request params' }

    let dbOut = await pool.query(`SELECT 
        U.id, 
        U.name, 
        U.color 
      FROM 
        "user" U
      LEFT JOIN "assigned_user" AU 
        ON U.id = AU.user_id AND AU.ticket_id=${queryParams.ticket_id}
      WHERE AU.id is null`);

    return lambdaResponse(200, { unAssignedUsers: dbOut?.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}