const axios = require("axios");
const User = require('../model/user');
var host = 'https://sensorhub.tech';
var apiURL = '/api';
var authToken = '';

exports.signin = {};

exports.signin.get = (req, res) => {
    res.render('login');
};

exports.signin.post = (req, res) => {
    var user = {
        "email": req.body.email,
        "password": req.body.password
    };
    var requestURL = host + apiURL + "/login";
    axios.post(requestURL, user)
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

exports.register = {};

exports.register.get = (req, res) => {
    res.render('register');
};

exports.register.post = (req, res) => {
    var user = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    };
    var requestURL = host + apiURL + "/register";
    axios.post(requestURL, user)
        .then(function (response) {
            console.log(response);
            res.redirect('/user');
        })
        .catch(function (error) {
            console.log(error);
            res.redirect('/register');
        });
};

exports.userinfo = {};

exports.userinfo.get = (req, res) => {
    var requestURL = host + apiURL + '/me';
    var headers = {
        'Authorization': authToken
    };
    axios.get(requestURL, { headers: headers })
        .then(function (response) {
            console.log(response);
            var userInfo = new User(response.data);
            res.render('user', {
                user: userInfo,
                tokens: userInfo.data.tokens
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

exports.signout = {};

exports.signout.post = (req, res) => {
    var requestURL = host + apiURL + '/me/logout';
    var headers = {
        'Authorization': authToken
    };
    axios.post(requestURL, null, { headers: headers })
        .then(function (response) {
            console.log(response);
            res.redirect('/login');
        })
        .catch(function (error) {
            console.log(error);
            res.redirect('/user');
        });
};