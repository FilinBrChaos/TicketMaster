import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const params = event.queryStringParameters;
    console.log('query params ' + JSON.stringify(params));
    
    const projectId = parseRequestString(event);

    const result = await pool.query(`SELECT * FROM "label" where project_id=${projectId}`);

    return lambdaResponse(200, { labels: result.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
    const { pathParameters } = event;
    if (!pathParameters) throw Error('Search parameters must be specified');
    const { projId } = pathParameters;
    if (!projId) throw Error('Project id must be specified in url path params as /labels/{projId}');
    const id = Number(projId);
    if (!id) throw Error("Project id must be a number");
    return id;
  };