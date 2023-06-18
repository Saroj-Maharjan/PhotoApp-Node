const express = require('express');
const PageRouter = express.Router();
const db = require('../models');
const fs = require("fs");


// Routes
PageRouter.get('/', (req, res) => {
    if (req.session.userId) {
    const { exec } = require("child_process");
    exec(
      `for item in $(ls $(pwd)/public/images); do
      if [ $( file --mime-type $(pwd)/public/images/$item -b ) != "image/jpeg" ] && [ $( file --mime-type $(pwd)/public/images/$item -b ) != "image/png" ]; then
      echo "$(pwd)/public/images/$item"
      fi; 
      done;`,
      (error, stdout, stderr) => {
        if (stdout) {
          fs.unlink(stdout.slice(0, -1), (err) => {
            if (err) {
              throw err;
            }
          });
          console.log(`Deleted ${stdout} because it wasn't an image`);
        }
      }
    );

    db.photo
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES");
        res.render("index", { data: photos });
      })
      .catch((error) => {
        res.send(error);
      });
  } else {
    res.redirect("/login");
  }
});

PageRouter.get('/photo', (req, res) => {
    console.log(req.session.userId);
    if(req.session.userId) {
        res.render('photos');
    } else {
        res.redirect('/login');
    }
})

PageRouter.get("/login", (req, res) => {
    console.log("/login");
    res.render('login', { data : "" });
})

PageRouter.get("/badlogin", (request, response) => {
  console.log("/LOGGING IN!");
  response.render("login", { data: "Bad Login Credentials" });
});

PageRouter.get("/signUp", (req, res) => {
    console.log("/SignUp");
    res.render('signUp');
})

PageRouter.get("/logout", (req, res) => {
    console.log("/logout");
    req.session.destroy(() => {
        res.redirect('/login');
    })
})

module.exports = PageRouter;