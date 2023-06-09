
CREATE FUNCTION "updateUpdatedAtColumn"()
  RETURNS TRIGGER AS $$
  BEGIN
     NEW.updated_at = now(); 
     RETURN NEW;
  END;
  $$ language 'plpgsql';


CREATE TABLE "user" (
  id bigserial primary key,
  name VARCHAR NOT NULL,
  color VARCHAR(30)
);

CREATE TABLE "project" (
  id bigserial PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR
);

CREATE TYPE ticket_state AS ENUM ('Open', 'Closed');

CREATE TABLE "ticket" (
  id bigserial PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  state ticket_state default 'Open',
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  project_id bigserial,
  topic_id int,
  CONSTRAINT fk_project_id
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);

CREATE TRIGGER updateTicketUpdatedAt BEFORE UPDATE
  ON "ticket" FOR EACH ROW EXECUTE PROCEDURE 
  "updateUpdatedAtColumn"();

CREATE TABLE "assigned_user" (
  id bigserial primary key,
  user_id bigserial,
  ticket_id bigserial,
  CONSTRAINT fk_user_id 
  FOREIGN KEY (user_id) 
  REFERENCES "user" (id)
  ON DELETE CASCADE,
  CONSTRAINT fk_ticket_id 
  FOREIGN KEY (ticket_id) 
  REFERENCES ticket (id)
  ON DELETE CASCADE
);

CREATE TABLE "label" (
  id bigserial PRIMARY KEY,
  name VARCHAR NOT NULL,
  color VARCHAR(30),
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
  comment VARCHAR NOT NULL,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  user_id bigserial,
  project_id bigserial,
  CONSTRAINT fk_user_id
  FOREIGN KEY (user_id) 
  REFERENCES "user" (id)
  ON DELETE CASCADE,
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

CREATE TYPE retro_state AS ENUM ('nothing', 'grouping', 'voting', 'discussions');

CREATE TABLE "retro" (
  id bigserial PRIMARY KEY,
  name varchar NOT NULL,
  description varchar,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  state retro_state default 'grouping',
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
  name varchar NOT NULL,
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
  title varchar NOT NULL,
  description varchar,
  created_at timestamp with time zone NOT NULL default current_timestamp,
  updated_at timestamp with time zone NOT NULL default current_timestamp,
  topic_id int,
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
  ON DELETE CASCADE,
  CONSTRAINT fk_user_id 
  FOREIGN KEY (user_id) 
  REFERENCES "user" (id)
  ON DELETE CASCADE
);

create TABLE "topic_note" (
  id bigserial PRIMARY KEY,
  note_id bigserial,
  topic_id bigserial,
  CONSTRAINT fk_topic_id 
  FOREIGN KEY (topic_id) 
  REFERENCES topic (id)
  ON DELETE CASCADE,
  CONSTRAINT fk_note_id 
  FOREIGN KEY (note_id) 
  REFERENCES "note" (id)
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