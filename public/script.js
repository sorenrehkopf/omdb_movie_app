$(function(){

	$('#commentBtn').on('click',function(e){
		e.preventDefault();
		var text = $('#commentText').val();
		var imdbid = $('#imdbid').val();
		console.log(imdbid);
		var comment = $.ajax({
			url:'/comments',
			method: 'POST',
			data: {'text':text,'imdbid':imdbid}
		}).done(function(comment){
			console.log(comment)
			if(comment){
				$('#commentArea').prepend("<div><hr><p>"+comment.createdAt+"</p><p>"+comment.text+"</p><hr></div>");
			}else{
				console.log(false);
				$('.css-alertText').text('You must favorite this movie to comment on it!');
				$('.css-alert').fadeIn(400).delay(3000);
				$('.css-alert').fadeOut(3000);
			};
		});
	});

	$('#tagBtn').on('click',function(e){
		e.preventDefault();
		var name = $('#tagField').val();
		var imdbid = $('#imdbid').val();
		var tag = $.ajax({
			url: '/tags',
			method: 'POST',
			data: {'name':name,'imdbid':imdbid}
		}).done(function(tag){
			console.log(tag)
			if(tag){
				$('#tagArea').append("<span><a href='/tags/"+tag.id+"'>#"+tag.name+"</a></span>");
			}else{
				console.log(false);
				$('.css-alertText').text('You must favorite this movie to add tags!');
				$('.css-alert').fadeIn(400).delay(3000);
				$('.css-alert').fadeOut(3000);
			};
		});

	});

	$('.js-favBtn').on('click',function(e){
		e.preventDefault();
		var imdbid = $('#imdbid').val();
		var title = $('#title').val();
		var year = $('#year').val();
		var poster = $('#poster').val();
			var favorite = $.ajax({
				url: '/favorites',
				method: 'POST',
				data: {'imdbid': imdbid, 'title': title, 'year':year, 'poster':poster}
			}).done(function(favorite){
				console.log(favorite);
				$('.css-alertText').text('This movie has been added to favorites!');
				$('.css-alert').fadeIn(400).delay(3000);
				$('.css-alert').fadeOut(3000);
				$('.js-favBtn').fadeOut(400);
			});
	});

});