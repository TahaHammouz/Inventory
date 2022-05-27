const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require('dotenv');
const path = require('path');
const { allowedNodeEnvironmentFlags } = require("process");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




//define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
//to make sure that i can grab the data from any form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log("my SQL connected ...")
  }
})

app.listen(8088, () => {
    console.log("server started on port 8088")
})
