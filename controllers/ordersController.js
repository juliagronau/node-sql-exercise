import pool from "../db/pg.js";

export const getAllOrders = (req, res) => {
  pool
    .query("SELECT * FROM orders")
    //.then((data) => console.log(data))
    .then((data) => res.json({ orders: data.rows }))
    .catch((err) => res.status(500).json(err));
};

export const getSingleOrder = (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM orders WHERE id=$1;", [id])
    .then((data) => {
      // console.log(data);
      if (data.rowCount == 0) {
        res.status(404).send("There is no order matching this id");
      } else {
        res.status(200).json(data.rows[0]);
      }
    })
    .catch((error) => res.status(500).json(error));
};

export const createOrder = (req, res) => {
  // console.log(req.body);
  const { price, date, user_id } = req.body;
  pool
    .query(
      //Wir brauchen RETURNING damit die Ressource (alle Spalten) wieder zurückgeschickt wird
      "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *;",
      [price, date, user_id]
    )
    .then((data) => {
      // console.log(data);
      res.status(201).json(data.rows[0]);
    })
    .catch((err) => res.status(404).json(err));
};

export const deleteOrder = (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM orders WHERE id=$1", [id])
    .then((data) => {
      // console.log(data);
      if (data.rowCount == 0) {
        res.status(404).send("There is no order matching this id");
      } else {
        res.status(200).send("order successfully deleted");
      }
    })
    .catch((err) => res.status(500).json(err));
};

export const updateOrder = (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  pool
    .query(
      "UPDATE orders SET price=$1, date=$2 WHERE user_id=$3 RETURNING *;",
      [price, date, user_id]
    )
    .then((data) => {
      if (data.rowCount == 0) {
        res.status(404).send("There is no order matching this id");
      } else {
        res.status(200).json(data.rows[0]);
      }
    });
};
