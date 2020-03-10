var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    request.get({
        url: config.apiUrl + '/questions/',
        json: true
    }, function(error, response){
        if(error){
            return res.render('question', { error: 'An error occurred' });
        }
        
        var viewData = { questions: response };
        res.redirect('questions', viewData);
    })
});

router.post('/', function (req, res) {
    // authenticate using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/questions/create',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('question', { error: 'An error occurred' });
        }

        if (!body.token) {
            return res.render('question', { error: body, username: req.body.username });
        }

        // save JWT token and the userId in the session to make it available to the angular app
        req.session.token = body.token;
        req.session.userId = body.userId;

        // redirect to returnUrl
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);
    });
})

module.exports = router;