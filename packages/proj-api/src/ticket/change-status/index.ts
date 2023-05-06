import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from '../../../lib/database';
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { TicketBody } from "../../../../lib/projectTypes";
import { QueryResult } from 'pg';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);
        const params = event.queryStringParameters;

        if (!params || !params.ticket_id) throw { message: '"ticket_id" must be present in path query params' }

        if (!body.status) throw { message: 'field "status" cannot be null' };
        if (body.status !== 'Open' && body.status !== 'Closed') throw { message: 'status value can be "Open" or "Closed" only' }

        const ticket_id: number = Number(params.ticket_id);
        const newStatus: string = body.status;

        console.log('ticket id ' + params.ticket_id + ' type ' + (typeof ticket_id) + ' new status ' + body.status + ' type ' + (typeof newStatus))

        const result = await pool.query(`UPDATE "ticket" SET state='${newStatus}' WHERE id = ${ticket_id} RETURNING id`);
        return lambdaResponse(200, { message: "ok", id: result.rows[0].id });

    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}