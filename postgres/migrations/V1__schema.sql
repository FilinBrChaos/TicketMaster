CREATE TABLE "client" (
  id bigserial primary key,
  name VARCHAR
);

CREATE TABLE "project" (
  id bigserial PRIMARY KEY,
  name VARCHAR,
  description VARCHAR
);

CREATE TABLE "ticket" (
  id bigserial PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  assigned_client_id bigserial,
  project_id bigserial,
  topic_id bigserial,
  CONSTRAINT fk_project_id
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);

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

--  create trigger on client name update
CREATE TABLE "comment" (
  id bigserial PRIMARY KEY,
  comment VARCHAR,
  client_name VARCHAR,
  project_id bigserial,
  CONSTRAINT fk_project_id 
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);

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

CREATE TABLE "retro" (
  id bigserial PRIMARY KEY,
  name varchar,
  description varchar,
  project_id bigserial,
  CONSTRAINT fk_project_id 
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE
);

CREATE TABLE "topic" (
  id bigserial PRIMARY KEY,
  name varchar,
  description varchar,
  retro_id bigserial,
  CONSTRAINT fk_retro_id 
  FOREIGN KEY (retro_id) 
  REFERENCES retro (id)
  ON DELETE CASCADE
);

CREATE TABLE "note" (
  id bigserial PRIMARY KEY,
  title varchar,
  description varchar,
  topic_id bigserial,
  retro_id bigserial,
  CONSTRAINT fk_retro_id 
  FOREIGN KEY (retro_id) 
  REFERENCES retro (id)
  ON DELETE CASCADE
);

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