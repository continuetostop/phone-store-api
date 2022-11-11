--lưu trữ định dạng của ô input trong form
--
-- Table structure for table `oc_option`
--
DROP TABLE IF EXISTS `oc_option`;

CREATE TABLE `oc_option` (
    `option_id` int(11) NOT NULL,
    `type` varchar(32) NOT NULL,
    `sort_order` int(3) NOT NULL
) ENGINE = MyISAM DEFAULT CHARSET = utf8;

--
-- Dumping data for table `oc_option`
--
INSERT INTO
    `oc_option` (`option_id`, `type`, `sort_order`)
VALUES
    (1, 'radio', 1),
    (2, 'checkbox', 2),
    (4, 'text', 3),
    (5, 'select', 4),
    (6, 'textarea', 5),
    (7, 'file', 6),
    (8, 'date', 7),
    (9, 'time', 8),
    (10, 'datetime', 9),
    (11, 'checkbox', 10),
    (12, 'date', 11),
    (13, 'radio', 0),
    -- --------------------------------------------------------
    --thêm ô input theo ngôn ngữ được được hiển thị để người dùng có dễ dàng có thể chọn được
    --
    -- Table structure for table `oc_option_description`
    --
    DROP TABLE IF EXISTS `oc_option_description`;

CREATE TABLE `oc_option_description` (
    `option_id` int(11) NOT NULL,
    `language_id` int(11) NOT NULL,
    `name` varchar(128) NOT NULL
) ENGINE = MyISAM DEFAULT CHARSET = utf8;

--
-- Dumping data for table `oc_option_description`
--
INSERT INTO
    `oc_option_description` (`option_id`, `language_id`, `name`)
VALUES
    (1, 1, 'Radio'),
    (2, 3, 'Cân nặng'),
    (6, 1, 'Textarea'),
    (8, 1, 'Date'),
    (5, 2, 'Select'),
    (9, 1, 'Time'),
    (10, 1, 'Date &amp; Time'),
    (1, 2, 'Radio'),
    (4, 3, 'Văn bản'),
    (6, 2, 'Textarea'),
    (8, 2, 'Date'),
    (7, 3, 'Tập tin'),
    (5, 1, 'Select'),
    (9, 2, 'Time'),
    (10, 2, 'Date &amp; Time'),
    (12, 3, 'Ngày vận chuyển'),
    (11, 3, 'Kích cỡ'),
    (13, 3, 'Màu'),
    (1, 3, 'Radio'),
    (4, 1, 'Text'),
    (6, 3, 'Textarea'),
    (8, 3, 'Date'),
    (7, 1, 'File'),
    (9, 3, 'Time'),
    (10, 3, 'Date &amp; Time'),
    (12, 1, 'Delivery Date'),
    (11, 1, 'Size'),
    (2, 1, 'weight'),
    (5, 3, 'Select'),
    (13, 1, 'Color');

-- --------------------------------------------------------
--
-- Table structure for table `oc_option_value`
--
DROP TABLE IF EXISTS `oc_option_value`;

CREATE TABLE `oc_option_value` (
    `option_value_id` int(11) NOT NULL,
    `option_id` int(11) NOT NULL,
    `image` varchar(255) NOT NULL,
    `sort_order` int(3) NOT NULL
) ENGINE = MyISAM DEFAULT CHARSET = utf8;

--
-- Dumping data for table `oc_option_value`
--
INSERT INTO
    `oc_option_value` (
        `option_value_id`,
        `option_id`,
        `image`,
        `sort_order`
    )
VALUES
    (43, 1, '', 3),
    (32, 1, '', 1),
    (45, 2, '', 4),
    (44, 2, '', 3),
    (41, 5, '', 3),
    (40, 5, '', 2),
    (39, 5, '', 1),
    (31, 1, '', 2),
    (24, 2, '', 2),
    (23, 2, '', 1),
    (48, 11, '', 3),
    (47, 11, '', 2),
    (46, 11, '', 1),
    (50, 13, 'catalog/color/yellow.png', 1),
    (52, 11, '', 0),
    (53, 13, 'catalog/color/pink.png', 0),
    (49, 13, 'catalog/color/red.png', 0),
    (51, 13, 'catalog/color/blue.png', 2);

-- --------------------------------------------------------
--lưu trữ giá trị của cho phần mô tả sản phẩm căn cứ vào thuộc tính
--
-- Table structure for table `oc_option_value_description`
--
DROP TABLE IF EXISTS `oc_option_value_description`;

CREATE TABLE `oc_option_value_description` (
    `option_value_id` int(11) NOT NULL,
    `language_id` int(11) NOT NULL,
    `option_id` int(11) NOT NULL,
    `name` varchar(128) NOT NULL
) ENGINE = MyISAM DEFAULT CHARSET = utf8;

--
-- Dumping data for table `oc_option_value_description`
--
INSERT INTO
    `oc_option_value_description` (
        `option_value_id`,
        `language_id`,
        `option_id`,
        `name`
    )
VALUES
    (43, 1, 1, 'Large'),
    (32, 1, 1, 'Small'),
    (31, 1, 1, 'Medium'),
    (40, 1, 5, '1 pc 300 g - 800 g'),
    (43, 2, 1, 'Large'),
    (32, 2, 1, 'Small'),
    (45, 3, 2, '4KG'),
    (45, 1, 2, '4KG'),
    (31, 2, 1, 'Medium'),
    (39, 2, 5, '1 pc 500 g - 900 g'),
    (39, 1, 5, '1 pc 500 g - 900 g'),
    (44, 3, 2, '3KG'),
    (44, 1, 2, '3KG'),
    (48, 3, 11, 'L'),
    (48, 1, 11, 'L'),
    (51, 3, 13, 'xanh'),
    (51, 1, 13, 'blue'),
    (40, 2, 5, '1 pc 300 g - 800 g'),
    (41, 1, 5, '500 g'),
    (41, 2, 5, '500 g'),
    (47, 3, 11, 'M'),
    (47, 1, 11, 'M'),
    (50, 3, 13, 'vàng'),
    (50, 1, 13, 'yellow'),
    (53, 3, 13, 'hồng'),
    (43, 3, 1, 'Large'),
    (32, 3, 1, 'Small'),
    (24, 3, 2, '2KG'),
    (31, 3, 1, 'Medium'),
    (40, 3, 5, '1 pc 300 g - 800 g'),
    (24, 1, 2, '2KG'),
    (46, 3, 11, 'S'),
    (23, 3, 2, '1KG'),
    (39, 3, 5, '1 pc 500 g - 900 g'),
    (23, 1, 2, '1KG'),
    (46, 1, 11, 'S'),
    (52, 3, 11, 'XL'),
    (53, 1, 13, 'pink'),
    (49, 3, 13, 'đỏ'),
    (41, 3, 5, '500 g'),
    (52, 1, 11, 'XL'),
    (49, 1, 13, 'red');



--lưu trữ các yếu tố ảnh hưởng đến giá của sản phẩm
create table options(
    option_id int,
    option_type varchar(20),
    option_name varchar (50),
    sort_order int(3)
);

--lưu trữ  giá trị của các yếu tố ảnh hưởng đến giá của sản phẩm
INSERT INTO
    `options` (`option_id`, `option_type`, `option_name`,`sort_order`)
VALUES
    (1, 'radio', 'ram',3);

create option_value(
    option_value_id int,
    option_value_name varchar(50),
    option_value_img varchar(225),
    option_id int
);
INSERT INTO `option_value` (`option_value_id`,  `option_value_name`, `option_value_img`, `option_id`) VALUES
(1, 1, 'linkimage' ,1),

--dùng để thêm các thuộc tính đặc biệt của các sản phẩm vÍ dụ (laptop, điện thoại,ipad)
create table attribute_group(
    attribute_group_id int,
    attribute_group_name varchar(255)
);

create table attribute_description(
    attribute_description_id int,
    attribute_description_name varchar(50) attribute_group_id int
);

create table category(
    category_id int,
    category_name varchar(255),
    category_description text,
);



create table product_detail (product_detail_id int,);

create table product_attribute(
    product_attribute_id int,
    product_attribute_name varchar(225)
);
--lưu trữ thông tin của các sản phẩm theo option nhằm xác định giá cho sản phẩm khác
CREATE TABLE `oc_product_option_value` (
  `product_option_value_id` int(11) NOT NULL,
  `product_option_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `option_value_id` int(11) NOT NULL,
  `quantity` int(3) NOT NULL,
  `subtract` tinyint(1) NOT NULL,
  `price` decimal(15,4) NOT NULL,
  `price_prefix` varchar(1) NOT NULL,
  `points` int(8) NOT NULL,
  `points_prefix` varchar(1) NOT NULL,
  `weight` decimal(15,8) NOT NULL,
  `weight_prefix` varchar(1) NOT NULL
) ;
INSERT INTO `oc_product_option_value` (`product_option_value_id`, `product_option_id`, `product_id`, `option_id`, `option_value_id`, `quantity`, `subtract`, `price`, `price_prefix`, `points`, `points_prefix`, `weight`, `weight_prefix`) VALUES
(31, 232, 44, 13, 51, 20, 1, '145.0000', '+', 0, '+', '0.00000000', '+');



CREATE TABLE `oc_product_option_value` (
  `product_option_value_id` int(11) NOT NULL,
  `product_option_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `option_value_id` int(11) NOT NULL,
  `quantity` int(3) NOT NULL,
  `subtract` tinyint(1) NOT NULL,
  `price` decimal(15,4) NOT NULL,
  `price_prefix` varchar(1) NOT NULL,
  `points` int(8) NOT NULL,
  `points_prefix` varchar(1) NOT NULL,
  `weight` decimal(15,8) NOT NULL,
  `weight_prefix` varchar(1) NOT NULL
);

INSERT INTO `oc_product_option_value` (`product_option_value_id`, `product_option_id`, `product_id`, `option_id`, `option_value_id`, `quantity`, `subtract`, `price`, `price_prefix`, `points`, `points_prefix`, `weight`, `weight_prefix`) VALUES
(31, 232, 44, 13, 51, 20, 1, '145.0000', '+', 0, '+', '0.00000000', '+');


--- thêm thông tin option cho sản phẩm  khi khác hàng order

CREATE TABLE `oc_order_option` (
  `order_option_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_product_id` int(11) NOT NULL,
  `product_option_id` int(11) NOT NULL,
  `product_option_value_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `type` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `oc_order_option`
--


INSERT INTO `oc_order_option` (`order_option_id`, `order_id`, `order_product_id`, `product_option_id`, `product_option_value_id`, `name`, `value`, `type`) VALUES
(1, 1, 1, 229, 23, 'weight', '2KG', 'checkbox')


--lưu trữ thông tin mã coupon giảm giá toàn sàn
--https://stackoverflow.com/questions/72169989/how-to-create-a-discount-coupon-programmaticaly-in-opencart-2-1-0-2
--
-- Table structure for table `oc_coupon`
--

DROP TABLE IF EXISTS `oc_coupon`;
CREATE TABLE `oc_coupon` (
  `coupon_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `code` varchar(20) NOT NULL,
  `type` char(1) NOT NULL,
  `discount` decimal(15,4) NOT NULL,
  `logged` tinyint(1) NOT NULL,
  `shipping` tinyint(1) NOT NULL,
  `total` decimal(15,4) NOT NULL,
  `date_start` date NOT NULL DEFAULT '0000-00-00',
  `date_end` date NOT NULL DEFAULT '0000-00-00',
  `uses_total` int(11) NOT NULL,
  `uses_customer` varchar(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `oc_coupon`
--

INSERT INTO `oc_coupon` (`coupon_id`, `name`, `code`, `type`, `discount`, `logged`, `shipping`, `total`, `date_start`, `date_end`, `uses_total`, `uses_customer`, `status`, `date_added`) VALUES
(4, '-10% Discount', '2222', 'P', '10.0000', 0, 0, '0.0000', '2014-01-01', '2020-01-01', 10, '10', 0, '2009-01-27 13:55:03'),
