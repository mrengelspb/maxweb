const express = require('express');

const app = express();
require('dotenv').config();

app.get("/", (req, res) => {
    res.send("Hello World !")
});

app.listen(process.debugPort, ()=> {
    console.log(`Server listen in port ${process.PORT}`);
});