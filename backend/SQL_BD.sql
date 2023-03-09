CREATE DATABASE sync_cloud;

-- USE sync_cloud; - Не работает так как в Postgresql необходимо создавать коннекшен с определённой БД
-- \connect sync_cloud

CREATE TABLE
    users (
        _id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users (_id) ON DELETE CASCADE
    );

CREATE OR REPLACE FUNCTION TRIGGER_SET_TIMESTAMP()
RETURNS TRIGGER AS $$
	BEGIN NEW.updated_at = NOW();
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

INSERT INTO users (name, email, password) VALUES('Vlad', 'test@test.com', '123') RETURNING _id; -- Тестовый пользователь
