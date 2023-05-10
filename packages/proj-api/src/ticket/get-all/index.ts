import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";

interface TicketPageSearchParams {
  byStatus: 'Open' | 'Closed';
  byDate: 'ASC' | 'DESC';
  byPattern?: string;
}

const searchParamsKeys = {
  byStatusKey: 'byStatus',
  byDateKey: 'byDate',
  byPatternKey: 'byPattern'
}

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const params = event.queryStringParameters;
    const projectId = parseRequestString(event);
    let additional = '';

    if (params) {
      const sortParams = getSortParams(params);
      additional += `AND state='${sortParams.byStatus}' `;
      additional += sortParams.byPattern ? `AND (name || description) like '%${sortParams.byPattern}%' ` : '';
      additional += `ORDER BY created_at ${sortParams.byDate}`;
    }

    console.log("additional params - " + additional)
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

const getSortParams = (params: APIGatewayProxyEventQueryStringParameters): TicketPageSearchParams => {
  let byStatus: 'Open' | 'Closed' = params[searchParamsKeys.byStatusKey] === 'Closed' ? 'Closed' : 'Open';
  let byDate: 'ASC' | 'DESC' = params[searchParamsKeys.byDateKey] === 'DESC' ? 'DESC' : 'ASC';
  let byPattern = params[searchParamsKeys.byPatternKey] ? decodeURI(params[searchParamsKeys.byPatternKey]!) : undefined;
  console.log(`params: byStatus - ${byStatus}, byDate - ${byDate}, byPattern - ${byPattern}`)

  return {
    byStatus: byStatus,
    byDate: byDate,
    byPattern: byPattern
  }
}