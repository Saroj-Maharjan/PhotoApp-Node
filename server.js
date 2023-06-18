const express = require('express');
const app = new express();
const db = require('./models');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
app.use(expressSession({
  secret: "Kinsta is the best",
}))

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


// DB Connection
const sqlPort = 3307;
db.sequelize
.sync({ force: false})
.then(() => {
  app.listen(sqlPort, () => {
    console.log(
      `MariaDB Connection has been established successfully to http://localhost:${sqlPort}.`
      );
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });


// Server
const port = 8080;
app.listen(port, () => {
    console.log(`Serving photo App on http://localhost:${port}`);
})

const PhotosRouter = require('./routes/PhotosRoute');
const CommentsRouter = require('./routes/CommentsRoute');
const UsersRouter = require('./routes/UsersRoute');
const PageRouter = require('./routes/PageRoute');
app.use("/images", PhotosRouter);
app.use("/comments", CommentsRouter);
app.use("/users", UsersRouter);
app.use("/", PageRouter);
