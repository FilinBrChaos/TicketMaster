import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { parseEvent } from "../../../lib/validations"
import { createRecord } from "../../../services/dbservice"
import { User } from '../../../lib/types';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = parseEvent(event).body;
    let name = body.name ? body.name : 'default';
    let color = body.color ? body.color : '#000000';

    const result = await createRecord(pool, 'user', { name: name, color: color } as User)

    return lambdaResponse(200, { id: result.rows[0].id });
  } catch (e) {
    return lambdaResponse(500, { error: JSON.stringify(e) });
  }
}