const users = require("./users");
const orders = require("./orders");

module.exports = (app) => {
  app.use("api/users", users);
  app.use("api/orders", orders);
};
