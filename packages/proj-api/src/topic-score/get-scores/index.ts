import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { TopicRating } from '../../../../lib/projectTypes';

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        const queryParams = event.queryStringParameters;

        if (!queryParams) throw { message: 'query params must be present' }
        if (!queryParams.topic_id) throw { message: '"topic_id" must be present in request params' }
        if (!queryParams.user_id) throw { message: '"user_id" must be present in request params' }

        const scoreSum = (await pool.query(`select sum(tr.score) as "sum" from topic_rating tr where tr.topic_id = ${queryParams.topic_id}`));

        const currentUserScoreObj = await pool.query(`select * from topic_rating tr where tr.user_id = ${queryParams.user_id} and tr.topic_id = ${queryParams.topic_id}`);

        if (currentUserScoreObj.rows.length > 0) {
            const obj = currentUserScoreObj.rows[0];
            const topicRating: TopicRating = { id: obj.id, user_id: obj.user_id, topic_id: obj.topic_id, score: obj.score, score_sum: scoreSum.rows[0].sum }
            return lambdaResponse(200, { message: "ok", topic_rating: topicRating });
        } 
        else if (scoreSum.rows.length > 0) {
            const topicRating: TopicRating = { id: 0, user_id: Number(queryParams.user_id), topic_id: Number(queryParams.topic_id), score: 0, score_sum: !scoreSum.rows[0].sum ? 0 : scoreSum.rows[0].sum }
            return lambdaResponse(200, { message: 'ok', topic_rating: topicRating })
        } 
        else {
            return lambdaResponse(200, { message: 'ok', topic_rating: null })
        }
    } catch (e) {
        return lambdaResponse(500, { error: JSON.stringify(e) });
    }
}