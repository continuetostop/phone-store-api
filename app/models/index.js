const user = require("./User.model");
const role = require("./Role.model");
const GroupProduct = require("./GroupProduct.model");
const ProductDetail = require("./ProductDetail.model");
const Option = require("./Option.model");
const ProductDetailOption = require("./ProductDetailOption.model");
const OrderDetail = require("./OrderDetail.model");
const Customers = require("./Customers.model");
const StatusOrder = require("./StatusOrder.model");
const Order = require("./Order.model");
const Category = require("./Category.model");
role.belongsToMany(user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});
user.belongsToMany(role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});

GroupProduct.hasMany(ProductDetail, {
    onDelete: "CASCADE",
});
ProductDetail.belongsTo(GroupProduct);

GroupProduct.hasMany(Option, {
    onDelete: "CASCADE",
});
Option.belongsTo(GroupProduct);

Category.hasMany(GroupProduct);
GroupProduct.belongsTo(Category);

ProductDetail.belongsToMany(Option, {
    through: "product_detail_option",
    foreignKey: "productDetailId",
    otherKey: "optionId",
});
Option.belongsToMany(ProductDetail, {
    through: "product_detail_option",
    foreignKey: "optionId",
    otherKey: "productDetailId",
});
Customers.hasMany(Order);
Order.belongsTo(Customers);

Order.belongsToMany(ProductDetail, {
    through: "order_detail",
    foreignKey: "orderId",
    otherKey: "productDetailId",
});
ProductDetail.belongsToMany(Order, {
    through: "order_detail",
    foreignKey: "productDetailId",
    otherKey: "orderId",
});

Order.belongsToMany(StatusOrder, {
    through: "order_status_order",
    foreignKey: "orderId",
    otherKey: "statusOrderId",
});
StatusOrder.belongsToMany(Order, {
    through: "order_status_order",
    foreignKey: "statusOrderId",
    otherKey: "orderId",
});
