var db = require('./models');

db.tag.findOrCreate({where:{name: "the final frontier"}}).spread(function(tag, created){
	db.favorite.findById(22).then(function(favorite){
		favorite.addTag(tag).then(function(){
			console.log(tag.get())
		});
	});
});