const path = require("path");
const express = require("express");
const app = express();
const login = require("./controllers/login");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get('/login', login.signin.get);
app.post('/login', login.signin.post);

app.get('/register', login.register.get);
app.post('/register', login.register.post);

app.get('/user', login.userinfo.get);
app.post('/logout', login.signout.post);


app.listen(3000, () => {
    console.log("App is running on Port 3000");
});