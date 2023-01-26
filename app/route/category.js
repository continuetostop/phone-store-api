const CategoryCtrl = require("../controllers/CategoryCtrl");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
    app.post(
        "/api/v1/auth/admin/category",
        [authJwt.verifyToken, authJwt.isAdmin],
        CategoryCtrl.create
    );
    app.get("/api/v1/category/:id", CategoryCtrl.getOne);
    app.get("/api/v1/categorys", CategoryCtrl.getAll);
    app.put(
        "/api/v1/auth/admin/category/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        CategoryCtrl.update
    );
    app.delete(
        "/api/v1/category/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        CategoryCtrl.delete
    );
};
