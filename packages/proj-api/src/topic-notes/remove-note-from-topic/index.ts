import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const queryParams = event.queryStringParameters;

    if (!queryParams) throw { message: 'query params must be present' }
    if (!queryParams.topic_id || !queryParams.note_id) throw { message: '"topic_id" and "note_id" params must be present in request params' }

    const dbOut = await pool.query(`DELETE FROM "topic_node" WHERE topic_id=${queryParams.topic_id} AND label_id=${queryParams.note_id} RETURNING id`);

    return lambdaResponse(200, { id: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}
