import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const queryParams = event.queryStringParameters;

    if (!queryParams) throw { message: 'query params must be present' }
    if (!queryParams.topic_id) throw { message: '"ticket_id" must be present in request params' }
    if (!queryParams.retro_id) throw { message: '"project_id" must be present in request params' }

    let dbOut = await pool.query(`SELECT 
            N.*
          FROM 
            "note" N
          LEFT JOIN "topic_note" TN 
            ON N.id = TN.note_id 
            AND TN.topic_id=${queryParams.topic_id} 
          WHERE 
            TN.id is null
            AND N.retro_id=${queryParams.retro_id} `);

    return lambdaResponse(200, { notes: dbOut?.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}