import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const params = event.queryStringParameters;
    const projectId = parseRequestString(event);
    let additional = '';

    if (params && params.status) {
      if (params.status === 'Closed') additional += 'AND status=Closed';
      else additional += 'AND status=Open';
    }

    const result = await pool.query(`SELECT * FROM "ticket" where project_id=${projectId} ${additional}`);

    return lambdaResponse(200, { tickets: result.rows });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
    const { pathParameters } = event;
    if (!pathParameters) throw Error('Search parameters must be specified');
    const { projId } = pathParameters;
    if (!projId) throw Error('Project id must be specified in url path params as /tickets/{projId}');
    const id = Number(projId);
    if (!id) throw Error("Project id must be a number");
    return id;
  };