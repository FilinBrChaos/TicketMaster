import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const queryParams = event.queryStringParameters;

    if (!queryParams) throw { message: 'query params must be present' }
    if (!queryParams.ticket_id || !queryParams.label_id) throw { message: '"ticket_id" and "label_id" params must be present in request params' }

    const dbOut = await pool.query(`DELETE FROM "ticket_label" WHERE ticket_id=${queryParams.ticket_id} AND label_id=${queryParams.label_id} RETURNING id`);

    return lambdaResponse(200, { id: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}
