-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     ip_address VARCHAR(100),
--     phone VARCHAR(15),
--     balance NUMERIC DEFAULT 0,
--     trunks TEXT[] DEFAULT ARRAY[]::TEXT[]
-- );


-- CREATE TABLE trunks (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );



-- ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL;

-- CREATE TABLE password_reset_tokens (
--     id SERIAL PRIMARY KEY,
--     user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     token VARCHAR(255) NOT NULL,
--     expires_at TIMESTAMP NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  phone VARCHAR(20),
  balance NUMERIC DEFAULT 0,
  trunks JSONB DEFAULT '[]',
  password VARCHAR(255) NOT NULL -- Hashed password
);

