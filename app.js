const express = require("express");
const mountRoutes = require("./routes/index");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json({ extended: false }));

mountRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
