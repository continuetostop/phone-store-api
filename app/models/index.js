const user = require('./User.model')
const role = require('./Role.model')
const GroupProduct = require('./GroupProduct.model');
const ProductDetail = require('./ProductDetail.model');
const Option = require('./Option.model');
const ProductDetailOption = require('./ProductDetailOption.model');
role.belongsToMany(user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
user.belongsToMany(role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

GroupProduct.hasMany(ProductDetail);
ProductDetail.belongsTo(GroupProduct);

GroupProduct.hasMany(Option);
Option.belongsTo(GroupProduct);


ProductDetail.belongsToMany(Option,
    {
        through: 'product_detail_option',
        foreignKey: "productDetailId",
        otherKey: "optionId"
    });
Option.belongsToMany(ProductDetail,
    {
        through: 'product_detail_option',
        foreignKey: "optionId",
        otherKey: "productDetailId"
    });
