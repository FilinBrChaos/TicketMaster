import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const projectId = parseRequestString(event);

    console.log('project get one project id param ' + projectId);

    const dbOut = await pool.query(`SELECT * FROM "project" where id=${projectId}`);

    return lambdaResponse(200, { project: dbOut.rows[0] });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}

const parseRequestString = (event: APIGatewayProxyEvent) => {
  const { pathParameters } = event;
  if (!pathParameters) throw Error('Search parameters must be specified');
  const { projId } = pathParameters;
  if (!projId) throw Error('Project id must be specified in url path params as /projects/{projId}');
  const id = Number(projId);
  if (!id) throw Error("Project id must be a number");
  return id;
};