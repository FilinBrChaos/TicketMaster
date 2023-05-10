import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { parseEvent } from "../../../lib/validations"
import { createRecord } from '../../../services/dbservice';
import { TopicNoteBody } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const poolClient = await pool.connect();
    try {
        const { body } = parseEvent(event);
            
        if (!body.topic_notes) throw { message: '"topic_notes" array must be present in request body' }

        const topicLabels = body.topic_notes.map((element: { note_id: number, topic_id: number }) => { 
            const obj: TopicNoteBody = {
                note_id: element.note_id,
                topic_id: element.topic_id
            }
            return obj;
        })

        await poolClient.query('BEGIN');
        for (let i = 0; i < topicLabels.length; i++) {
            (await createRecord(pool, 'topic_note', topicLabels[i]))
        }
        await poolClient.query('COMMIT');

        return lambdaResponse(200, { message: "ok" });

    } catch (e) {
        poolClient.query('ROLLBACK');
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}