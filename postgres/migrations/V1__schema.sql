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
  CONSTRAINT fk_assigned_client_id
  FOREIGN KEY (assigned_client_id) 
  REFERENCES client (id)
  ON DELETE SET NULL,
  CONSTRAINT fk_project_id
  FOREIGN KEY (project_id) 
  REFERENCES project (id)
  ON DELETE CASCADE,
  CONSTRAINT fk_topic_id
  FOREIGN KEY (topic_id) 
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

