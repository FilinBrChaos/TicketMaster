import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaResponse } from "../../../utils/lambda";
import { setupApiPool } from "../../../utils/database";
import { validateParseEvent } from "../../../utils/validations"

const pool = setupApiPool();

export const index: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = validateParseEvent(event).body;

    let name = body.name ? body.name : 'default';

    const result = (
        await pool.query(
          `INSERT INTO "client" (name) VALUES ($1) RETURNING id`,
          [name]
        )
      ).rows[0];

    console.log('user created');
    return lambdaResponse(200, { message: "user", id: result.id });
  } catch (e) {
    throw { error: "internal error" }
  }
}