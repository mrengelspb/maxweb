const express = require('express');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const TokenGenerator = require('uuid-token-generator');
const cookieParser = require('cookie-parser');
const login_route = require('./Routes/login_route.js');
const admin_route = require('./Routes/admin_route.js');
const entry_route = require('./Routes/entry_route.js');
const product_route = require('./Routes/product_route.js');

const app = express();
const tokgen = new TokenGenerator(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
  secret: tokgen.generate(),
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24},
  resave: false
}));
app.use(cors());

app.use("/", login_route);
app.use("/", admin_route);
app.use("/", entry_route);
app.use("/", product_route);

app.post("/operador", (req, res) => {

});

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`);
});