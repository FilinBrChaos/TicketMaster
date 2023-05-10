import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { createRecord } from '../../../services/dbservice';
import { parseEvent } from '../../../lib/validations';
import { TicketBody, TopicRatingBody } from '../../../../lib/projectTypes';
import { Body } from "node-fetch";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const { body } = parseEvent(event);

        console.log(JSON.stringify(body));
        if (!body.topic_id) throw { message: 'field "topic_id" cannot be null' };
        if (!body.user_id) throw { message: 'field "user_id" cannot be null' };
        if (!body.score) body.score = 0

        await pool.query(`UPDATE topic_rating SET score = ${body.score} WHERE user_id = ${body.user_id} AND topic_id = ${body.topic_id};
            INSERT INTO topic_rating (user_id, topic_id, score) 
            SELECT ${body.user_id}, ${body.topic_id}, ${ !body.score ? 0 : body.score } 
            WHERE NOT EXISTS (SELECT 1 FROM topic_rating WHERE user_id = ${body.user_id} AND topic_id = ${body.topic_id})`)

        return lambdaResponse(200, { message: "ok" });
    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}