import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { LabelBody } from "../../../../lib/projectTypes";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        if (!body.project_id) throw { message: "'project_id' cannot be null" }
        if (!body.name) throw { message: "'name' cannot be null" };

        const label: LabelBody = { project_id: body.project_id, name: body.name }

        const result = await createRecord(pool, 'label', label)
        return lambdaResponse(200, { message: "project", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}