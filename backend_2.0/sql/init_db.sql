-- CREATE DATABASE sync_cloud;

-- USE sync_cloud; - Не работает так как в Postgresql необходимо создавать коннекшен с определённой БД
-- \connect sync_cloud

CREATE TABLE
    users (
        _id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"'),
        created_at TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"')
    );

CREATE TYPE
    file_status AS ENUM (
        'pending',
        'processed',
        'success',
        'error'
    );

CREATE TABLE
    files (
        _id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        path TEXT NOT NULL,
        filename TEXT NOT NULL,
        status file_status NOT NULL DEFAULT 'pending',
        hash_sum TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"'),
        created_at TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"'),

        FOREIGN KEY (user_id) REFERENCES users (_id) ON DELETE CASCADE
    );

CREATE TABLE
    sessions (
        _id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL UNIQUE,
        updated_at TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"'),
        created_at TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"'),

        FOREIGN KEY (user_id) REFERENCES users (_id) ON DELETE CASCADE
    );


CREATE OR REPLACE FUNCTION TRIGGER_SET_TIMESTAMP()
RETURNS TRIGGER AS $$
	BEGIN NEW.updated_at = to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS:MS"Z"');
	RETURN NEW;
	END;
	$$ LANGUAGE
PLPGSQL;

CREATE TRIGGER SET_TIMESTAMP_USERS
	BEFORE
	UPDATE ON users FOR EACH ROW
	EXECUTE
	    PROCEDURE trigger_set_timestamp();
;

CREATE TRIGGER SET_TIMESTAMP_FILES
	BEFORE
	UPDATE ON files FOR EACH ROW
	EXECUTE
	    PROCEDURE trigger_set_timestamp();
;

CREATE TRIGGER SET_TIMESTAMP_SESSIONS
	BEFORE
	UPDATE ON sessions FOR EACH ROW
	EXECUTE
	    PROCEDURE trigger_set_timestamp();
;

 -- Тестовый пользователь admin@admin.com/admin
INSERT INTO users (name, email, password) VALUES('Vlad', 'admin@admin.com', '$2b$10$qkZ0UhRYQArxz2idIYS9qOA9eQOR8B26dmi4V5Spqu54H4Y5OVDjy') RETURNING _id;
