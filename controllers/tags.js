var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	db.tag.findAll({include:[db.favorite]}).then(function(tags){
		res.render('tags/index',{tags:tags});
	})
});

router.get('/:id', function(req, res){
	var id = parseInt(req.params.id);
	db.tag.find({where:{id:id}, include:[db.favorite]}).then(function(tag){
		res.render('tags/show',{tag:tag});
	})

})

router.post('/', function(req, res){
	var imdbid = req.body.imdbid;
 	 var name = req.body.name;

  db.tag.findOrCreate({where:{name:name}}).spread(function(tag, created){
	db.favorite.find({where:{imdbid:imdbid}}).then(function(favorite){
		if(favorite){
		favorite.addTag(tag).then(function(){
			res.send(tag);
		});
		}else{
			res.send(false);
		}
	});
});
});

module.exports = router;