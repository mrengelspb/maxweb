const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { database } = require('./Database.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/consultas", (req, res) => {
    const query = database.query('CALL pa_fe_consultas(?, ?)', [1, process.env.RUC]);
    query.then((response) => {
        console.log(response);
        res.status(200).send(JSON.parse(JSON.stringify(response)));
    })
    .catch((err) => {
        console.error(err);
    })
});

app.get("/product/:id", (req, res) => {
    const query = database.query('CALL pa_pr_searchProductById(?)', [req.params.id]);
    query.then((response) => {
        res.status(200).send(JSON.parse(JSON.stringify(response)));
    })
    .catch((err) => {
        console.error(err);
    })
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`);
});
