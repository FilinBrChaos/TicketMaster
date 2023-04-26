import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { parseEvent } from "../../../lib/validations"
import { createRecord } from '../../../services/dbservice';
import { CommentBody } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        console.log(JSON.stringify(body));
        if (!body.comment) throw { message: 'field "comment" cannot be null' };
        if (!body.project_id) throw { message: 'field "projectId" cannot be null' };
        if (!body.user_id) throw { message: 'field "user_id" cannot be null' }

        const comment: CommentBody = {
            user_id: body.user_id,
            project_id: body.project_id,
            comment: body.comment
        }

        const result = await createRecord(pool, 'comment', comment)
        return lambdaResponse(200, { message: "user", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}