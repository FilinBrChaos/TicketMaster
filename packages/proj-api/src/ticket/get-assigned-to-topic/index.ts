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
            *
        FROM 
            "ticket" t
        WHERE 
            t.topic_id = ${queryParams.topic_id}`);

    return lambdaResponse(200, { tickets: result.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}
