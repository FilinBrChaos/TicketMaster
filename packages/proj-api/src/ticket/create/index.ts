import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { TicketBody } from "../../../../lib/projectTypes";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        console.log(JSON.stringify(body));
        if (!body.name) throw { message: 'field "name" cannot be null' };
        if (!body.project_id) throw { message: 'field "projectId" cannot be null' };


        const ticket: TicketBody = { 
            name: body.name,
            project_id: body.project_id,
            description: body.description,
            topic_id: body.topicId
        }

        const result = await createRecord(pool, 'ticket', ticket)
        return lambdaResponse(200, { message: "ticket", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}