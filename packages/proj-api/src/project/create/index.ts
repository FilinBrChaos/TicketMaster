import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { ProjectBody } from "../../../../lib/projectTypes";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        if (!body.name) throw Error('"name" cannot be null');

        const result = await createRecord(pool, 'project', { name: body.name, description: body.description } as ProjectBody)
        return lambdaResponse(200, { message: "project", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}