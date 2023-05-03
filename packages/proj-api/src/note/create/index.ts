import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { NoteBody, ProjectBody } from "../../../../lib/projectTypes";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        if (!body.title) throw { message: '"title" cannot be null' };
        if (!body.retro_id) throw { message: '"retro_id" cannot be null' };

        const note: NoteBody = {
            title: body.title,
            description: body.description,
            retro_id: body.retro_id,
            topic_id: body.topic_id
        }

        const result = await createRecord(pool, 'note', note)
        return lambdaResponse(200, { message: "ok", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}