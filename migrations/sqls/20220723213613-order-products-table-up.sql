
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