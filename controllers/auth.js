const mysql = require("mysql");
const bcrypt = require('bcryptjs');
const { render } = require("express/lib/response");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

Register-User1
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) {
          console.log(error);
        }
    
        if( results.length > 0 ) {
          return res.render('register', {
            message: 'That email is already in use'
          })
        } else if( password !== passwordConfirm ) {
          return res.render('register', {
            message: 'Passwords do not match'
          });
        }
        let hashedpassword = await bcrypt.hash(password, 8);
      console.log(hashedpassword);
      db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedpassword }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
          return res.render('register', {
            message: 'user register'
          });
        }
      })
    });
  
}  

