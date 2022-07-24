
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    price NUMERIC(12,2) NOT NULL
);