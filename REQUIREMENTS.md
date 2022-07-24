# API Requirements

## API Endpoints

#### Users `/api/users`

- Login (POST `/login`)
- Index `protected with token` (GET `/`)
- Show `protected with token` (GET `/:id`)
- Create (POST `/`)
- Update `protected with token` (PUT `/:id`)
- Delete `protected with token` (DELETE `/:id`)

#### Products `/api/products`

- Index (GET `/` )
- Show (GET `/:id`)
- Create `protected with token` (POST `/`)
- Update `protected with token` (PUT `/:id`)
- Delete `protected with token` (DELETE `/:id`)

#### Order /api/orders/

- Index `protected with token` (GET `/`)
- Show `protected with token` (GET `/:id`)
- Create `protected with token` (POST `/`)
- Update `protected with token` (PUT `/:id`)
- Delete `protected with token` (DELETE `/:id`)
- Add product to order `protected with token` (POST `/:id/products`)
- Remove product from order `protected with token` (POST `/:id/products/:product_id`)
- Current Order by user id `protected with token` (GET `/user/:id`)

## Data Shapes

#### Users

The table has the following fields:

- id
- first_name
- last_name
- email
- password

The SQL:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

#### Products

The table has the following fields:

- id
- name
- description
- price

The SQL:

```sql
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    price NUMERIC(12,2) NOT NULL
);
```

#### Orders

The table has the following fields:

- id
- status of order (active or complete)
- user_id

The SQL:

```sql
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
```

#### order_products

The table has the following fields:

- order_id
- product_id
- quantity

The SQL:

```sql
CREATE TABLE order_products (
  order_id   UUID NOT NULL REFERENCES orders (id),
  product_id UUID NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_products
    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
        ON  UPDATE CASCADE
);
```
