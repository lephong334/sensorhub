const axios = require("axios");
var authToken = '';

exports.renderLoginPage = (req, res) => {
    res.render('login');
};

exports.login = (req, res) => {
    var url = "https://sensorhub.tech/api/login";
    var user = {
        "email": "nxthongbk@gmail.com",
        "password": "1_Abc_123"
    };
    axios.post(url, user)
        .then(function (response) {
            console.log(response);
            authToken = response.data.token;
            res.redirect('/user');
        })
        .catch(function (error) {
            console.log(error);
        });
};

exports.renderRegisterPage = (req, res) => {
    res.render('register');
};

exports.register = (req, res) => {
    var url = "https://sensorhub.tech/api/register";
    var user = {
        "name": "thong",
        "email": "nxthongbk10@gmail.com",
        "password": "1_Abc_123"
    };
    axios.post(url, user)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

exports.getUserInfo = (req, res) => {
    res.render('user');
    var url = 'https://sensorhub.tech/api/me';
    var options = {
        headers: {
            'Authorization': authToken
        }
    };
    axios.get(url, options)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

exports.userLogout = (req, res) => {
    var url = 'https://sensorhub.tech/api/me/logout';
    var headers = {
        'Authorization': authToken
    };
    axios.post(url, null, {headers: headers})
        .then(function (response) {
            console.log(response);
            res.redirect('login');
        })
        .catch(function (error) {
            console.log(error);
        });
};