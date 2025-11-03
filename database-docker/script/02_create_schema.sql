-- restaurant_analytics schema
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sub_brands (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER REFERENCES brands(id),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CONTINUE COM TODAS AS OUTRAS TABELAS QUE VOCÊ ME PASSOU...
-- (seu schema completo aqui)
-- Inclua todas as tabelas: stores, channels, categories, products, 
-- option_groups, items, customers, sales, product_sales, etc.

CREATE TABLE IF NOT EXISTS coupon_sales (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
    coupon_id INTEGER REFERENCES coupons(id),
    value FLOAT,
    target VARCHAR(100),
    sponsorship VARCHAR(100)
);