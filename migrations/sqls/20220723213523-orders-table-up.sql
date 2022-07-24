
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    status bool NOT NULL,
    user_id UUID NOT NULL REFERENCES users (id),
    CONSTRAINT fk_orders_users
        FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
);
