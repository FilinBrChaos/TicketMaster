import { Pool, QueryResult } from "pg";
import { ProjectType } from "../../lib/projectTypes";

export const insertIn = async (pool: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> => {
    const dbOut = await pool.query(
        `INSERT INTO "${table}" (${columns.join(', ')}) VALUES (${values.map((o, index) => '$' + (index + 1)).join(', ')}) RETURNING id`,
        values
    );
    return dbOut;
};

// export const updateIn = async (pool: Pool, table: string, columns: string[], values: string[]) => {
//     const dbOut = await pool.query(
//         `UPDATE "${table}" SET (${columns.join(', ')}) VALUES (${values.map((o, index) => '$' + (index + 1)).join(', ')}) WHERE  RETURNING id`,
//         values
//     );
//     return dbOut;
// };

export const deleteWithId = async (pool: Pool, table: string, id: number) => {
    const dbOut = await pool.query(`DELETE FROM "${table}" WHERE id=${id} RETURNING id`);
    return dbOut;
}

export const createRecord = async (pool: Pool, table: string, input: ProjectType) => {
    console.log("keys: " + JSON.stringify(Object.keys(input)) + ", values " + JSON.stringify(Object.values(input)));

    return insertIn(pool, table, Object.keys(input), Object.values(input));
};

export const getAllRecords = async (pool: Pool, table: string) => {
    const dbOut = await pool.query(`SELECT * FROM "${table}"`);
    return dbOut;
};

// export const getWithParams = async (pool: Pool, table: string, columns: string, columnsValues: string[]) => {
//     const dbOut = await pool.query(`SELECT * FROM "${table}" WHERE `, columnsValues);
// };