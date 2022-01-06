const Router = require("express-promise-router");
const db = require("../db");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

// @route   GET api/orders
// desc     Get all orders
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM orders");
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/orders
// desc     Get individual order
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
    res.send(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/orders
// desc     Create a new order
router.post("/", async (req, res) => {
  const { price, date, user_id } = req.body;
  const query = {
    text: "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3)",
    values: [price, date, user_id],
  };
  try {
    await db.query(query);
    const { rows } = await db.query("SELECT * FROM orders");
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
