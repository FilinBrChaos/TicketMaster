import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { ProjectBody, Retro, RetroBody } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        console.log("retro create: request body - " + JSON.stringify(body));

        if (!body.name) throw { message: '"name" cannot be null' };
        if (!body.project_id) throw { message: '"project_id" cannot be null' };

        const retro: RetroBody = {
            name: body.name,
            project_id: body.project_id,
            description: body.description,
            state: body.retro_state
        }

        const result = await createRecord(pool, 'retro', retro)
        return lambdaResponse(200, { message: "ok", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}