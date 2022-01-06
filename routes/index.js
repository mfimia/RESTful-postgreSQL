const users = require("./users");
const orders = require("./orders");

module.exports = (app) => {
  app.use("/users", users);
  app.use("/orders", orders);
};
