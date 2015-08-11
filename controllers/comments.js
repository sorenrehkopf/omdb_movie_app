var db = require('../models');
var express = require('express');
var router = express.Router();

// router.get('/', function(req, res){
// 	db.comment.findAll().then(console.log)
// });

router.post('/', function(req, res){
	var imdbid = req.body.imdbid;
	db.favorite.find({where:{imdbid:imdbid}}).then(function(favorite){
		if(favorite){
		favorite.createComment({
			text:req.body.text
		}).then(function(comment){
			res.redirect('/movies/show/?q='+imdbid)
		});
		}else{
			res.redirect('/movies/show/?q='+imdbid);
		}
	});
});

module.exports = router;