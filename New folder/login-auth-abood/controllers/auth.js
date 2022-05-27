const mysql = require("mysql");
const { render } = require("express/lib/response");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render('login', {
        message: "please provide us an email and password"
      })
    }
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if (!email || !(await bcrypt.compare(password, results[0].password) ) )
        res.status(401).render('login', {
          message:'email or password is wrong !'
        })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;

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
  

