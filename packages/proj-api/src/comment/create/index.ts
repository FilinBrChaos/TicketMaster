import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../utils/lambda";
import { setupApiPool } from "../../../utils/database";
import { validateParseEvent } from "../../../utils/validations"

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {
        // const body = validateParseEvent(event).body;

        // let name = body.name ? body.name : 'default';
        console.log('before');
        const dbOut = await pool.query(
            `INSERT INTO "comment" (comment, client_name) VALUES ($1, $2) RETURNING id`,
            ["comment", "name"]
        );
            console.log('query res: ' + JSON.stringify(dbOut));
        const result = dbOut.rows[0];
        
        console.log('user created');
        return lambdaResponse(200, { message: "user", id: result.id });

    } catch (e) {
        throw { message: "error", error: JSON.stringify(e) }
    }
}