CREATE TYPE CART_STATUS AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status CART_STATUS NOT NULL
);

CREATE TABLE IF NOT EXISTS cart_items (
    cart_id UUID REFERENCES carts(id),
    product_id UUID,
    count INT
);

insert into carts (id, user_id, created_at, updated_at, status) values
(gen_random_uuid(), gen_random_uuid(), '2024-05-13', '2023-05-13', 'ORDERED'),
(gen_random_uuid(), gen_random_uuid(), '2024-05-13', '2023-05-13',  'ORDERED'),
(gen_random_uuid(), gen_random_uuid(), '2024-05-13', '2023-05-13',  'ORDERED'),
(gen_random_uuid(), gen_random_uuid(), '2024-05-13', '2023-05-13',  'OPEN'),
(gen_random_uuid(), gen_random_uuid(), '2024-05-13', '2023-05-13',  'OPEN'),
(gen_random_uuid(), gen_random_uuid(), '2024-05-13', '2023-05-13',  'OPEN');

insert into cart_items (cart_id, product_id, count) values
('4ec3847f-c300-4746-9272-7c31e980fefd', gen_random_uuid(), 1),
('c75dfd41-0411-4e31-a931-c4267e415243', gen_random_uuid(), 2),
('376ca57b-7db4-495f-ad74-0d06f49b50c7', gen_random_uuid(), 3),
('ee0e9499-d6a6-4162-b056-d0811fd259e8', gen_random_uuid(), 4),
('193b9554-5ca1-44b5-993a-a2bf0593fb87', gen_random_uuid(), 5),
('2d272407-d2bf-4131-9bcd-0173300c1262', gen_random_uuid(), 6);