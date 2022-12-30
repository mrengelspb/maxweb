const express = require('express');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const TokenGenerator = require('uuid-token-generator');
const cookieParser = require('cookie-parser');
const sessionController = require('./Routes/sessionController.js');
const adminController = require('./Routes/adminController.js');
const entryController = require('./Routes/entryController.js');
const productController = require('./Routes/productController.js');
const facturaController = require('./Routes/facturaController.js');
const boxController = require('./Routes/boxController.js');
const ReportController = require('./Routes/reportController.js');
const downloadController = require('./Routes/downloadController.js');

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

app.use("/", sessionController);
app.use("/", adminController);
app.use("/", entryController);
app.use("/", productController);
app.use("/", facturaController);
app.use("/", boxController);
app.use("/", ReportController);
app.use("/", downloadController);


app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`);
});