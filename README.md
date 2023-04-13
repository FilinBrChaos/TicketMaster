
#TicketMaster

Project for my course work at year 3

##Build&run

For start whole project run (in root folder!!):

1. `docker compose up`
2. `sh scripts/migrate-schema.sh`


###Developer notes

To run api without container run `sh scripts/start-serverless.sh` and change `packages/proj-api/env/api-config.json/postgresHost` to `localhost` and disable running api container in docker. In case you want to start api with default workflow change `packages/proj-api/env/api-config.json/postgresHost` to `ticket_master_db`.