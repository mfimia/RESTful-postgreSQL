const Router = require("express-promise-router");
const db = require("../db");

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

// @route   GET api/users
// desc     Get all users
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users
// desc     Get individual user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    res.send(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users
// desc     Create a new user
router.post("/", async (req, res) => {
  const { firstName, lastName, age } = req.body;
  const query = {
    text: "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3)",
    values: [firstName, lastName, age],
  };
  try {
    await db.query(query);
    const { rows } = await db.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users
// desc     Edit one user (with id)
router.put("/:id", async (req, res) => {
  const { id } = await req.params;
  const values = [({ first_name, last_name, age } = await req.body)];

  try {
    Object.keys(values[0]).forEach((key, i) => {
      db.query(`UPDATE users SET ${key} = $2 WHERE id = $1`, [
        id,
        Object.values(values[0])[i],
      ]);
    });

    const { rows } = await db.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/users
// desc     Delete one user (with id)

// @route   GET api/users
// desc     Get individual user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    const { rows } = await db.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
