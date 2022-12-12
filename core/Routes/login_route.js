const express = require('express');
const login_route = express.Router();
const { DatabaseRepository } = require('../Repository/DatabaseRepository.js');
const UserController = require('../Use_Cases/UserController.js');

login_route.post('/', async (req, res, next) => {
  const account = req.body;
  const userController = new UserController();
  const result = await userController.loginAccount(DatabaseRepository, account);
  console.log(result);
  res.send(result);
  // result.then(data => {
  //   const info = JSON.parse(JSON.stringify(data[0]));
  //   req.session.data = info;  
  //   if (info.length == 0) {
  //     res.status(404).send({message: "User not Found !"});
  //   } else {
  //     res.status(200).send(info);
  //   }
  // }).catch((err) => {
  //   res.status(404).send({ message: err.message });
  // });
});

module.exports = login_route;
