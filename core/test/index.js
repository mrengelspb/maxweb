const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const tokgen = new TokenGenerator();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send({message: "Server Running !"});
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`);
});
