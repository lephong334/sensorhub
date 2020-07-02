const axios = require("axios");
var host = 'https://sensorhub.tech';
var apiURL = '/api';
var authToken = '';

exports.renderLoginPage = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    var user = {
        "email": req.body.email,
        "password": req.body.password
    };
    var path = host + apiURL + "/login";
    axios.post(path, user)
        .then(function (response) {
            console.log(response);
            authToken = response.data.token;
            res.render('user');
        })
        .catch(function (error) {
            console.log(error);
            res.render('login');
        });
};

exports.renderRegisterPage = (req, res) => {
    res.render('register');
};

exports.register = (req, res) => {
    var user = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password
    };
    var path = host + apiURL + "/register";
    axios.post(path, user)
        .then(function (response) {
            console.log(response);
            res.render('user');
        })
        .catch(function (error) {
            console.log(error);
            res.render('register');
        });
};

exports.renderUserPage = (req, res) => {
    res.render('user');
};

exports.getUserInfo = (req, res) => {
    var path = host + apiURL + '/me';
    var headers = {
        'Authorization': authToken
    };
    axios.get(path, { headers: headers })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

exports.userLogout = (req, res) => {
    var path = host + apiURL + '/me/logout';
    var headers = {
        'Authorization': authToken
    };
    axios.post(path, null, { headers: headers })
        .then(function (response) {
            console.log(response);
            res.render('login');
        })
        .catch(function (error) {
            console.log(error);
        });
};