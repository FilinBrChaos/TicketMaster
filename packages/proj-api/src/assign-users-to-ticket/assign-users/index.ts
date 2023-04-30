import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { parseEvent } from "../../../lib/validations"
import { createRecord } from '../../../services/dbservice';
import { AssignedUserBody } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const poolClient = await pool.connect();
    try {
        const { body } = parseEvent(event);
    
        console.log('create comment body: ' + JSON.stringify(body));
        
        if (!body.assignUsers) throw { message: '"assignUsers" array must be present in request body' }

        const assignUsers = body.assignUsers.map((element: { user_id: number, ticket_id: number }) => { 
            const obj: AssignedUserBody = {
                user_id: element.user_id,
                ticket_id: element.ticket_id
            }
            return obj;
        })

        await poolClient.query('BEGIN');
        for (let i = 0; i < assignUsers.length; i++) {
            (await createRecord(pool, 'assigned_user', assignUsers[i]))
        }
        await poolClient.query('COMMIT');

        return lambdaResponse(200, { message: "ok" });

    } catch (e) {
        poolClient.query('ROLLBACK');
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}