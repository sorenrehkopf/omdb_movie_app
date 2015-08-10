var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request')

require('express-helpers')(app);

app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

function Movie(title, year, plot, poster, imdb, tomatoes){
	this.title = title;
	this.year = year;
	this.plot = plot;
	this.poster = poster;
	this.imdb = imdb;
	this.tomatoes = tomatoes;
};
function Movies(title, year, plot, poster){
	this.title = title;
	this.year = year;
};


app.get("/", function(req, res){
	res.render('main/index.ejs')
});

app.get("/movies", function(req, res){
	var q = req.query.q
	var url = "http://www.omdbapi.com/?s="+q.toLowerCase()+""
	request(url, function(error, response, data) {
		var parsedData = JSON.parse(data);
			// for(i=0;i<parsedData.length;i++){
			// var title = parsedData[i].Title;
			// var year = parsedData[i].Year;
			// var newMovie = new Movies(title, year);
			// rsltMovies.push(newMovie);
			// };
		res.render('movies/movies.ejs', {movies: parsedData.Search})
	});
});

app.get("/movies/show", function(req, res){
	var q = req.query.q
	var url = "http://www.omdbapi.com/?i="+q.toLowerCase()+"&tomatoes=true"
	request(url, function(error, response, data) {
		var parsedData = JSON.parse(data);
		var title = parsedData.Title;
		var year = parsedData.Year;
		var plot = parsedData.Plot;
		var poster = parsedData.Poster;
		var imdb = parsedData.imdbRating;
		var tomatoes = parsedData.tomatoRating
		var rsltMovie = new Movie(title, year, plot, poster, imdb, tomatoes);
		res.render('movies/show.ejs', {movie: rsltMovie}); 
		// res.send(parsedData)
	});
});


app.listen(3000)