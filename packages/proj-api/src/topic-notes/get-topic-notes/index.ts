import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const queryParams = event.queryStringParameters;
    if (!queryParams) throw { message: 'query params must be present' }
    if (!queryParams.topic_id) throw { message: '"topic_id" must be present in request params' }

    const result = await pool.query(`SELECT 
            N.*
        FROM 
            "note" N, 
            "topic_note" TN 
        WHERE 
            N.id = TN.note_id 
            AND 
            TN.topic_id = ${queryParams.topic_id}`);

    return lambdaResponse(200, { notes: result.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}
