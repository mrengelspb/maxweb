const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { database } = require('./Database.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    const query = database.query('SELECT * FROM sch_spbmaxweb.tbl_personal_data;');
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
