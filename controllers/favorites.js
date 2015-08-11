var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	db.favorite.findAll().then(function(favs){
		res.render('favorites/index',{favs:favs});
	})
});

router.post('/', function(req, res){
	var imdbid = req.body.imdbid;
	db.favorite.findOrCreate({where:{
			imdbid:req.body.imdbid,
			title:req.body.title,
			year:req.body.year,
			poster:req.body.poster
		}}).then(function(favorite){
			res.redirect('/movies/show/?q='+imdbid);
		});
});

module.exports = router;