const axios = require("axios");
const User = require('../model/user');
var host = 'https://sensorhub.tech';
var apiURL = '/api';
var authToken = '';

exports.renderLoginPage = (req, res) => {
    res.render('login');
};

exports.loginPost = (req, res) => {
    var user = {
        "email": req.body.email,
        "password": req.body.password
    };
    var path = host + apiURL + "/login";
    axios.post(path, user)
        .then(function (response) {
            console.log(response);
            authToken = response.data.token;
            res.redirect('/user');
        })
        .catch(function (error) {
            console.log(error);
            res.redirect('/login');
        });
};

exports.renderRegisterPage = (req, res) => {
    res.render('register');
};

exports.registerPost = (req, res) => {
    var user = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    };
    var path = host + apiURL + "/register";
    axios.post(path, user)
        .then(function (response) {
            console.log(response);
            res.redirect('/user');
        })
        .catch(function (error) {
            console.log(error);
            res.redirect('/register');
        });
};

exports.userInfoGet = (req, res) => {
    var path = host + apiURL + '/me';
    var headers = {
        'Authorization': authToken
    };
    axios.get(path, { headers: headers })
        .then(function (response) {
            console.log(response);            
            var userInfo = new User(response.data);
            res.render('user', {
                user: userInfo
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

exports.logoutPost = (req, res) => {
    var path = host + apiURL + '/me/logout';
    var headers = {
        'Authorization': authToken
    };
    axios.post(path, null, { headers: headers })
        .then(function (response) {
            console.log(response);
            res.redirect('/login');
        })
        .catch(function (error) {
            console.log(error);
        });
};