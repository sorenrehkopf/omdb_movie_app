var db = require('../models');
var express = require('express');
var router = express.Router();

// router.get('/', function(req, res){
// 	db.comment.findAll().then(console.log)
// });

router.post('/', function(req, res){
	var imdb = req.body.imdbid;	
	db.favorite.find({where:{imdbid:imdb}}).then(function(favorite){
		if(favorite){
		favorite.createComment({
			text:req.body.text
		}).then(function(comment){
			res.send(comment)
		});
		}else{
			res.send(false);
		}
	});
});

module.exports = router;