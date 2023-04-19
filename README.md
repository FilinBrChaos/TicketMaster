
# TicketMaster

Project for my course work at year 3. Frontend in `packages/frontend` on react typescript, backend in `packages/proj-api` on serverless and node typescript.

## Build&run

First thing first you need to have [Docker](https://www.docker.com/) and [flyway](https://www.red-gate.com/products/flyway/) installed on your pc.

For start whole project run (in root folder!!):

1. `docker compose up`
2. `sh scripts/migrate-schema.sh`(for mac)


### Developer notes

To run api without container:
1. disable running api container in docker
2. change `packages/proj-api/env/api-config.json/postgresHost` to `localhost`
3. run `sh scripts/start-serverless.sh`

In case you want to start api with default workflow change `packages/proj-api/env/api-config.json/postgresHost` to `ticket_master_db`.