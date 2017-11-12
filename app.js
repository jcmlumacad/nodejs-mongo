var express = require('express');
var mongoose = require('mongoose');
var app = express();

app.set('port', (process.env.PORT || 3000));

// views is directory for all template files
app.set('view engine', 'ejs');

// MongoDB Configuration
var uri = 'mongodb://localhost/test';
var database = mongoose.connection;
database.on('error', function (error) {
    console.log('Error:', error);
});
database.once('open', () => {
    console.log('Connected to database');
});
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useMongoClient: true
});

// User Schema
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
});

// User Model
var User = mongoose.model('User', UserSchema);

app.get('/', function(request, response) {
    var params = {
        name: 'John Doe',
        email: 'john@doe.com',
        role: 'admin'
    };
    var user = new User(params);
    // Before saving user
    user.save(function (error, _user) {
        // After saving user
        response.render('pages/index', {
            user: _user
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
