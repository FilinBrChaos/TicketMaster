
CREATE FUNCTION "updateUpdatedAtColumn"()
  RETURNS TRIGGER AS $$
  BEGIN
     NEW.updated_at = now(); 
     RETURN NEW;
  END;
  $$ language 'plpgsql';


CREATE TABLE "user" (
  id bigserial primary key,
  color VARCHAR,
  name VARCHAR
);

CREATE TABLE "project" (
  id bigserial PRIMARY KEY,
  name VARCHAR,
  description VARCHAR
);

CREATE TYPE ticket_state AS ENUM ('Backlog', 'In process', 'Ready for test', 'Ready for build', 'Completed');

CREATE TABLE "ticket" (
  id bigserial PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  state ticket_state,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  assigned_user_id bigserial,
  project_id bigserial,
  topic_id bigserial,
  CONSTRAINT fk_project_id
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);

CREATE TRIGGER updateTicketUpdatedAt BEFORE UPDATE
  ON "ticket" FOR EACH ROW EXECUTE PROCEDURE 
  "updateUpdatedAtColumn"();

CREATE TABLE "label" (
  id bigserial PRIMARY KEY,
  name VARCHAR,
  project_id bigserial,
  CONSTRAINT fk_project_id 
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);

CREATE TABLE "ticket_label" (
  id bigserial PRIMARY KEY,
  ticket_id bigserial,
  label_id bigserial,
  CONSTRAINT fk_ticket_id 
  FOREIGN KEY (ticket_id) 
  REFERENCES ticket (id)
  ON DELETE CASCADE,
  CONSTRAINT fk_label_id 
  FOREIGN KEY (label_id) 
  REFERENCES label (id)
  ON DELETE CASCADE
);

--  create trigger on user name update
CREATE TABLE "comment" (
  id bigserial PRIMARY KEY,
  comment VARCHAR,
  user_name VARCHAR,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  project_id bigserial,
  CONSTRAINT fk_project_id 
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);
CREATE TRIGGER updateCommentUpdatedAt BEFORE UPDATE
  ON "comment" FOR EACH ROW EXECUTE PROCEDURE 
  "updateUpdatedAtColumn"();


CREATE TABLE "ticket_comment" (
  id bigserial PRIMARY KEY,
  ticket_id bigserial,
  comment_id bigserial,
  CONSTRAINT fk_ticket_id 
  FOREIGN KEY (ticket_id) 
  REFERENCES ticket (id)
  ON DELETE CASCADE,
  CONSTRAINT fk_comment_id 
  FOREIGN KEY (comment_id) 
  REFERENCES comment (id)
  ON DELETE CASCADE
);

CREATE TYPE retro_state AS ENUM ('noting', 'grouping', 'voting', 'discussions');

CREATE TABLE "retro" (
  id bigserial PRIMARY KEY,
  name varchar,
  description varchar,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  state retro_state,
  project_id bigserial,
  CONSTRAINT fk_project_id 
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);

CREATE TRIGGER updateRetroUpdatedAt BEFORE UPDATE
  ON "retro" FOR EACH ROW EXECUTE PROCEDURE 
  "updateUpdatedAtColumn"();

CREATE TABLE "topic" (
  id bigserial PRIMARY KEY,
  name varchar,
  description varchar,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  retro_id bigserial,
  CONSTRAINT fk_retro_id 
  FOREIGN KEY (retro_id) 
  REFERENCES retro (id)
  ON DELETE CASCADE
);

CREATE TRIGGER updateTopicUpdatedAt BEFORE UPDATE
  ON "topic" FOR EACH ROW EXECUTE PROCEDURE 
  "updateUpdatedAtColumn"();

CREATE TABLE "note" (
  id bigserial PRIMARY KEY,
  title varchar,
  description varchar,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  topic_id bigserial,
  retro_id bigserial,
  CONSTRAINT fk_retro_id 
  FOREIGN KEY (retro_id) 
  REFERENCES retro (id)
  ON DELETE CASCADE
);

CREATE TRIGGER updateNoteUpdatedAt BEFORE UPDATE
  ON "note" FOR EACH ROW EXECUTE PROCEDURE 
  "updateUpdatedAtColumn"();

create TABLE "topic_rating" (
  id bigserial PRIMARY KEY,
  score INT,
  user_id bigserial,
  topic_id bigserial,
  CONSTRAINT fk_topic_id 
  FOREIGN KEY (topic_id) 
  REFERENCES topic (id)
  ON DELETE CASCADE
);

CREATE TABLE "topic_comment" (
  id bigserial PRIMARY KEY,
  topic_id bigserial,
  comment_id bigserial,
  CONSTRAINT fk_topic_id 
  FOREIGN KEY (topic_id) 
  REFERENCES topic (id)
  ON DELETE CASCADE,
  CONSTRAINT fk_comment_id 
  FOREIGN KEY (comment_id) 
  REFERENCES comment (id)
  ON DELETE CASCADE
);