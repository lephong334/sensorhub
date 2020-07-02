const path = require("path");
const express = require("express");
const app = express();
const controller = require("./controllers/controller");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get('/login', controller.renderLoginPage);
app.post('/login', controller.login);
app.get('/register', controller.renderRegisterPage);
app.post('/register', controller.register);
app.get('/user', controller.renderUserPage);
app.get('/userInfo', controller.getUserInfo);
app.post('/logout', controller.userLogout);

app.listen(3000, () => {
    console.log("App is running on Port 3000");
});