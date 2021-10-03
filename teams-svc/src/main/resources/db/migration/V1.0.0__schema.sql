DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS league;

DROP SEQUENCE IF EXISTS player_id_seq;
DROP SEQUENCE IF EXISTS team_id_seq;
DROP SEQUENCE IF EXISTS league_id_seq;

CREATE SEQUENCE player_id_seq START WITH 100000;
CREATE SEQUENCE team_id_seq START WITH 100000;
CREATE SEQUENCE league_id_seq START WITH 100000;

CREATE TABLE league
(
    id BIGINT DEFAULT nextval('league_id_seq'),
    league_name VARCHAR(100) NOT NULL,

    CONSTRAINT league_pk PRIMARY KEY (id),
    CONSTRAINT league_name_index UNIQUE (league_name)
);

CREATE TABLE team
(
    id BIGINT DEFAULT nextval('team_id_seq'),
    team_code VARCHAR(20) NOT NULL,
    team_name VARCHAR(30) NOT NULL,
    league_id BIGINT NOT NULL,

    CONSTRAINT team_co_fk FOREIGN KEY (league_id) REFERENCES league(id),
    CONSTRAINT team_pk PRIMARY KEY (id),
    CONSTRAINT team_code_co_index UNIQUE (team_code, league_id),
    CONSTRAINT team_name_co_index UNIQUE (team_name, league_id)
);

CREATE TABLE player
(
    id BIGINT DEFAULT nextval('player_id_seq'),
    full_name VARCHAR(100) NOT NULL,
    position VARCHAR(40) NOT NULL,
    team_id BIGINT NOT NULL,

    CONSTRAINT player_team_fk FOREIGN KEY (team_id) REFERENCES team(id),
    CONSTRAINT player_pk PRIMARY KEY (id)
);
