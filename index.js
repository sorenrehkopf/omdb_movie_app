var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var request = require('request');

require('express-helpers')(app);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/favorites', require('./controllers/favorites.js'));
app.use('/comments', require('./controllers/comments.js'));
app.use('/movies', require('./controllers/movies.js'));
app.use('/tags', require('./controllers/tags.js'));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render('main/index.ejs')
});

app.listen(3000);