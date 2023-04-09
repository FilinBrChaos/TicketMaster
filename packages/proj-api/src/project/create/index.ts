import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../lib/lambda";
import { setupApiPool } from "../../../lib/database";
import { parseEvent } from "../../../lib/validations"
import { createRecord } from '../../../services/dbservice';
import { Comment, Project } from "../../../lib/types";

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    try {

        const result = await createRecord(pool, 'project', { name: "project", description: 'description' } as Project)
        return lambdaResponse(200, { message: "user", id: result.rows[0].id });

    } catch (e) {
        throw { message: "error", error: JSON.stringify(e) }
    }
}