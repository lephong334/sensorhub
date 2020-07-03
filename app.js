const path = require("path");
const express = require("express");
const app = express();
const login = require("./controllers/login");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get('/login', login.renderLoginPage);
app.post('/login', login.loginPost);
app.post('/logout', login.logoutPost);

app.get('/register', login.renderRegisterPage);
app.post('/register', login.registerPost);

app.get('/user', login.userInfoGet);


app.listen(3000, () => {
    console.log("App is running on Port 3000");
});