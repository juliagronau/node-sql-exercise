import pool from "../db/pg.js";

export const getAllUsers = (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json({ users: data.rows }))
    .catch((err) => res.status(500).json(err));
};

export const getSingleUser = (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => {
      if (data.rowCount == 0) {
        res.status(404).send("There is no user matching this id");
      } else {
        res.status(200).json(data.rows[0]);
      }
    })
    .catch((error) => res.status(500).json(error));
};

export const createUser = (req, res) => {
  console.log(req.body);
  const { first_name, last_name, age } = req.body;
  pool
    .query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *;",
      [first_name, last_name, age]
    )
    .then((data) => {
      res.status(201).json(data.rows[0]);
    })
    .catch((err) => res.status(404).json(err));
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM users WHERE id=$1", [id])
    .then((data) => {
      if (data.rowCount == 0) {
        res.status(404).send("There is no user matching this id");
      } else {
        res.status(200).send("User successfully deleted");
      }
    })
    .catch((err) => res.status(500).json(err));
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  pool
    .query(
      "UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;",
      [first_name, last_name, age, id]
    )
    .then((data) => {
      if (data.rowCount == 0) {
        res.status(404).send("There is no user matching this id");
      } else {
        res.status(200).json(data.rows[0]);
      }
    });
};

//Bonus:
export const getOrdersByUsers = (req, res) => {
  const { id } = req.params;
  pool
    .query(
      "SELECT orders.id, orders.price, orders.user_id, users.first_name, users.last_name FROM users JOIN orders ON users.id = orders.user_id WHERE users.id=$1",
      [id]
    )
    .then((data) => res.json({ orders: data.rows }))
    .catch((err) => res.status(500).json(err));
};

//Bonus:
export const setInactiveIfNoOrder = (req, res) => {
  const { id } = req.params;
  pool
    .query(
      "SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE users.id=$1;",
      [id]
    )
    .then((data) => {
      if (data.rowCount == 0) {
        pool
          .query(
            "UPDATE users SET active=false WHERE id=$1 RETURNING *;",
            [id]
          )
          .then((data) =>
            res.status(404).json({ UserUpdated: data.rows })
          );
      } else {
        res.status(200).json({ Orders: data.rows });
      }
    })
    .catch((err) => res.status(500).json(err));
};
