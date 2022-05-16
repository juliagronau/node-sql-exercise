import "dotenv/config.js";
import express from "express";
import ordersRouter from "./routes/ordersRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
//Need these 2 for Bonus (validation):
import { body, validationResult } from "express-validator";
import pool from "./db/pg.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);

app.get("/", (req, res) => {
  res.send("node-sql-exercise");
});

//With validation example (Bonus):
// app.post(
//   "/api/users-w-validation",
//   body("first_name").isLength({ min: 2 }),
//   (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { first_name, last_name, age } = req.body;
//     pool
//       .query(
//         "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *;",
//         [first_name, last_name, age]
//       )
//       .then((data) => {
//         // console.log(data);
//         res.status(201).json(data.rows[0]);
//       })
//       .catch((err) => res.status(404).json(err));
//   }
// );

app.listen(port, () => console.log(`Server running in port ${port}`));
