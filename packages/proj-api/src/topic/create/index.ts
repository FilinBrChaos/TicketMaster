import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { TopicBody } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        if (!body.name) throw { message: '"name" cannot be null' };
        if (!body.retro_id) throw { message: '"retro_id" cannot be null' };

        const topic: TopicBody = {
            name: body.name,
            description: body.description,
            retro_id: body.retro_id,
        }

        const result = await createRecord(pool, 'topic', topic);
        return lambdaResponse(200, { message: "ok", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}