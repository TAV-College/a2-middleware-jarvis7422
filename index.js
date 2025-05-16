// Base imports
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {routeLogger} = require("./middleware/logger");
const {errorHandler} = require("./middleware/errorHandler.js");


const mainRouter = require("./routers/main.js");
const bookRouter = require("./routers/books.js");
const userRouter = require("./routers/users.router.js");
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static('./public'));
app.use(routeLogger);

app.use("", mainRouter);
app.use("", bookRouter);
app.use("", userRouter)


app.all('*', (req,res)=>{
  res.status(404).render("error",{
    title: "404 Not Found",
    msg: "This page was not found"
  })
})
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
