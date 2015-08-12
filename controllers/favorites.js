var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	db.favorite.findAll({include:[db.tag]}).then(function(favs){
		res.render('favorites/index',{favs:favs});
	})
});

// router.get('/search', function(req, res){
// 	db.favorite.find({where:{imdbid:imdbid}}).then(function(fav){
// 		if(fav){
// 		res.send(true);
// 		}else{
// 			res.send(false)
// 		};
// 	});
// });

router.post('/', function(req, res){
	var imdb = req.body.imdbid;
	db.favorite.findOrCreate({where:{
			imdbid:imdb,
			title:req.body.title,
			year:req.body.year,
			poster:req.body.poster
		}}).then(function(favorite){
			res.send(favorite);
		});
});

module.exports = router;