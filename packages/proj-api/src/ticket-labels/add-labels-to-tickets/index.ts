import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { parseEvent } from "../../../lib/validations"
import { createRecord } from '../../../services/dbservice';
import { AssignedUserBody, TicketLabelBody } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const poolClient = await pool.connect();
    try {
        const { body } = parseEvent(event);
            
        if (!body.ticketsLabels) throw { message: '"ticketsLabels" array must be present in request body' }

        const ticketLabels = body.ticketsLabels.map((element: { label_id: number, ticket_id: number }) => { 
            const obj: TicketLabelBody = {
                label_id: element.label_id,
                ticket_id: element.ticket_id
            }
            return obj;
        })

        await poolClient.query('BEGIN');
        for (let i = 0; i < ticketLabels.length; i++) {
            (await createRecord(pool, 'ticket_label', ticketLabels[i]))
        }
        await poolClient.query('COMMIT');

        return lambdaResponse(200, { message: "ok" });

    } catch (e) {
        poolClient.query('ROLLBACK');
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}