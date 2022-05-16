import express from "express";
import { listenerCount } from "process";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("node-sql-exercise")
});

app.listen(port, () => console.log(`Server running in port ${port}`));