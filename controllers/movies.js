var db = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');

function Movie(title, year, plot, poster, imdb, tomatoes, imdbid){
	this.title = title;
	this.year = year;
	this.plot = plot;
	this.poster = poster;
	this.imdb = imdb;
	this.imdbid = imdbid;
	this.tomatoes = tomatoes;
};
function Movies(title, year, plot, poster){
	this.title = title;
	this.year = year;
};

router.get("/", function(req, res){
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

router.get("/show", function(req, res){
	var q = req.query.q
	var url = "http://www.omdbapi.com/?i="+q.toLowerCase()+"&tomatoes=true"
	var comments =[]
	var tags = []
	var favorited
	db.favorite.find({where:{imdbid:q}, include: [db.tag]}).then(function(favorite){
		if(favorite){
			favorited = true;
			if(favorite.tags){
			favorite.tags.map(function(tag){
				tags.push(tag);
			});
			};
		db.comment.findAll({where: {favoriteId:favorite.id}}).then(function(commentss){
			commentss.map(function(comment){
				comments.push(comment);
			});
		});
	}else{favorited=false}
	}).then(function(){
	request(url, function(error, response, data) {
		var parsedData = JSON.parse(data);
		var title = parsedData.Title;
		var year = parsedData.Year;
		var plot = parsedData.Plot;
		var poster = parsedData.Poster;
		var imdbid = parsedData.imdbID;
		var imdb = parsedData.imdbRating;
		var tomatoes = parsedData.tomatoRating
		var rsltMovie = new Movie(title, year, plot, poster, imdb, tomatoes, imdbid);
		console.log(tags)
		res.render('movies/show.ejs', {movie: rsltMovie,comments:comments,tags:tags,favorited:favorited}); 
		// res.send(comments)
	});
});

});


module.exports = router;