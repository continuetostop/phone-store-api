create table ab_address(
    `address_id` int(11) primary key AUTO_INCREMENT,
    `city_name` varchar(225) not null,
    `district_name` varchar(225) not null,
    `ward_name` varchar(225) not null
);

create table address_details(
    `address_details_id` int(11) primary key AUTO_INCREMENT,
    street_address varchar(225) not null,
    id_user int(11),
    address_id int(11) not null,
    FOREIGN KEY (address_id) REFERENCES ab_address(address_id)
);
CREATE TABLE `ab_user_group` (
    `user_group_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(64) NOT NULL,
    `permission` text
);

CREATE TABLE `ab_users` (
    `user_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_group_id` int(11) NOT NULL,
    `username` varchar(20) NOT NULL,
    `password` varchar(40),
    `salt` varchar(9),
    `firstname` varchar(32) NOT NULL,
    `lastname` varchar(32) NOT NULL,
    `email` varchar(96),
    `image` varchar(255) DEFAULT null,
    `status` tinyint(1) NOT NULL DEFAULT 0,
    updatedAt datetime,
    createdAt datetime,
    FOREIGN KEY (user_group_id) REFERENCES ab_user_group(user_group_id)
);



create table ab_brand(
    brand_id int(11) not null primary key AUTO_INCREMENT,
    brand_name varchar(225) not null,
    address_details_id int(11) not null,
    createdAt datetime,
    updatedAt datetime,
    FOREIGN KEY (address_details_id) REFERENCES address_details(address_details_id)
);

CREATE TABLE `ab_category` (
    `category_id` int(11) NOT NULL primary key AUTO_INCREMENT,
    `name` varchar(255) not null,
    `image` varchar(255) DEFAULT NULL,
    `parent_id` int(11) NOT NULL DEFAULT 0,
    `sort_order` int(3) NOT NULL DEFAULT 0,
    `status` tinyint(1) NOT NULL DEFAULT 1,
    `createdAt` datetime NOT NULL,
    `updateAt` datetime NOT NULL,
);

create table ab_option(
    option_id int(11) primary key AUTO_INCREMENT,
    option_name varchar(225) NOT NULL UNIQUE
);

create table ab_product(
    product_id int(11) not null primary key AUTO_INCREMENT,
    product_name varchar(225),
    product_description text,
    procduct_meta_title varchar(225),
    procduct_stock_status_id int(11),
    procduct_status tinyint(1) NOT NULL,
    product_price int(30),
    product_image varchar(255),
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
    category_id int(11) not null,
    user_id int(11),
    FOREIGN KEY (category_id) REFERENCES ab_category(category_id),
    FOREIGN KEY (user_id) REFERENCES ab_users(user_id)
);

--giá trị của bảng này được tự động tạo mỗi khi thêm giá trị option cho sản phẩm
--khi chưa có giá trị option thì bảng sẽ tự động tạo ra giá trị nhằm mục đích quản lí sản phẩm về sau tốt hơn mỗi khi thêm sản phẩm
create table ab_procduct_detail(
    procduct_detail_id int(11) not null primary key AUTO_INCREMENT,
    procduct_detail_qty int,
    procduct_detail_price int(30),
    product_id int(11),
    createdAt datetime not null,
    updatedAt datetime not null,
    FOREIGN KEY (product_id) REFERENCES ab_procduct(product_id)
);

create table ab_product_option(
    procduct_detail_id int(11),
    option_id int(11),
    option_value varchar(255),
    updatedAt datetime not null,
    createdAt datetime not null,
    PRIMARY KEY (procduct_detail_id, option_id),
    FOREIGN KEY (procduct_detail_id) REFERENCES ab_procduct_detail(procduct_detail_id),
    FOREIGN KEY (option_id) REFERENCES ab_option(option_id)
);
