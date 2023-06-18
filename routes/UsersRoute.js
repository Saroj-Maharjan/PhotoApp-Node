const {req, res} = require('express');
const express = require('express');
const UsersRouter = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const saltRounds = 10;

UsersRouter.route('/login')
.post((req, res) => {
    // username and password are required
    console.log(req.body)
    const password = req.body.password;
    const username = req.body.username;
    db.user.findOne({
        where: {
            username: username,
        }
    }).then( async (user) => {
        if(user){
            bcrypt.compare(password, user.password, (err, same) => {
                if(same){
                    console.log("Logged In with Username: " + username)
                    req.session.userId = user.id;
                    res.redirect('/')
                }
                else {
                    alert("Incorrect Password")
                    res.redirect('/login')
                }
            })
        } else {
            res.status(401)
            console.log("401 Error")
            res.redirect('/badlogin')
        }
    }).catch((error) => {
        console.log("this fired", error);
        res.send(error);
    })
})

UsersRouter.route('/signUp').post( async (req, res) => {
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    // email, password, username
    const email = req.body.email;
    const username = req.body.username;
    //   console.log(encryptedPassword)
    db.user
        .create({ email: email[0], password: encryptedPassword, username: username })
        //response.send(user) // changed in chapter 7.2
        .then((user) => {
            //response.send(user) // changed in chapter 7.2
            res.redirect("/login");
        })
        .catch((err) => {
            err;
        });
  });

module.exports = UsersRouter;