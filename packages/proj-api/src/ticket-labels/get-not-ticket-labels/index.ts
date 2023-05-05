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
            L.id, 
            L.name, 
            L.project_id, 
            L.color 
        FROM 
            "label" L
        LEFT JOIN "ticket_label" TL 
            ON L.id = TL.label_id AND TL.ticket_id=${queryParams.ticket_id}
        WHERE TL.id is null`);

    return lambdaResponse(200, { labels: dbOut?.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}