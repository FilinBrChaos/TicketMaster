import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const queryParams = event.queryStringParameters;

    if (!queryParams) throw { message: 'query params must be present' }
    if (!queryParams.ticket_id && !queryParams.topic_id) throw { message: 'One of "ticket_id" or "topic_id" params must be present in request params' }

    let dbOut;

    if (queryParams.ticket_id) 
      dbOut = await pool.query(`SELECT 
        U.name as "user_name", 
        U.color as "user_color", 
        C.id, 
        C.user_id, 
        C.project_id, 
        C.comment, 
        C.created_at, 
        C.updated_at 
      FROM 
        "comment" C, "ticket_comment" TC, "user" U 
      WHERE C.id=TC.comment_id AND TC.ticket_id=${queryParams.ticket_id} AND U.id=C.user_id`);

    if (queryParams.topic_id)
      dbOut = await pool.query(`SELECT 
      U.name as "user_name", 
      U.color as "user_color", 
      C.id, 
      C.user_id, 
      C.project_id, 
      C.comment, 
      C.created_at, 
      C.updated_at 
    FROM 
      "comment" C, "topic_comment" TC, "user" U 
    WHERE C.id=TC.comment_id AND TC.topic_id=${queryParams.topic_id} AND U.id=C.user_id`)

    

    return lambdaResponse(200, { comments: dbOut?.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}