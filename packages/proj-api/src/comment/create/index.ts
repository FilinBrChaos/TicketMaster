import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { parseEvent } from "../../../lib/validations"
import { createRecord } from '../../../services/dbservice';
import { CommentBody, TicketComment, TicketCommentBody, TopicCommentBody } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const poolClient = await pool.connect();
    try {
        const { body } = parseEvent(event);
        const queryParams = event.queryStringParameters;

        if (!queryParams) throw { message: 'query params must be present' }
        if (!queryParams.ticket_id && !queryParams.topic_id) throw { message: 'One of "ticket_id" or "topic_id" params must be present in request params' }
    
        console.log('create comment body: ' + JSON.stringify(body));

        if (!body.comment) throw { message: 'field "comment" cannot be null' };
        if (!body.project_id) throw { message: 'field "projectId" cannot be null' };
        if (!body.user_id) throw { message: 'field "user_id" cannot be null' };
        
        const comment: CommentBody = {
            user_id: body.user_id,
            project_id: body.project_id,
            comment: body.comment
        }

        await poolClient.query('BEGIN');

        const commentID = (await createRecord(pool, 'comment', comment)).rows[0].id;

        if (queryParams.ticket_id) {
            const ticketComment: TicketCommentBody = {
                ticket_id: Number(queryParams.ticket_id),
                comment_id: commentID
            }
            const ticketCommentID = (await createRecord(pool, 'ticket_comment', ticketComment)).rows[0].id;
        } else if (queryParams.topic_id) {
            const topicComment: TopicCommentBody = {
                topic_id: Number(queryParams.topic_id),
                comment_id: commentID
            }
            const topicCommentID = (await createRecord(pool, 'topic_comment', topicComment)).rows[0].id;
        }


        await poolClient.query('COMMIT');

        return lambdaResponse(200, { message: "comment", id: commentID });

    } catch (e) {
        poolClient.query('ROLLBACK');
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}