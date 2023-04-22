import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { TicketBody } from '../../../lib/types';
import { parseEvent } from '../../../lib/validations';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        if (!body.name) throw Error('field "name" cannot be null');
        if (!body.projectId) throw Error('field "projectId" cannot be null');

        const ticket: TicketBody = { 
            name: body.name,
            project_id: body.projectId,
            description: body.description,
            assigned_user_id: body.assignedUserId,
            topic_id: body.topicId
        }

        const result = await createRecord(pool, 'ticket', ticket)
        return lambdaResponse(200, { message: "ticket", id: result.rows[0].id });

    } catch (e) {
        throw { message: "error", error: JSON.stringify(e) }
    }
}