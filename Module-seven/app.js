$(function(){

	var movies;
	var total = 0;
	var links;
	var pageCounter;
	var pageLimit = 5;

	var server = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';

	$('#search').click(function(){
		if ($('#textbox').val() == '') {
			$('h3').replaceWith('<h3> Please fill out the search field </h3>')
			$('h3').css({color: 'red'});
			$('#content-wrapper').replaceWith($('<div id = "content-wrapper"</div>'));
			$('.div-wrapper').animate({margin: '250px auto 15px auto'}, 600);
			$('h3').fadeOut(1000);
			$('#sort-container').css({display:'none'});
		} 
		else{
			$('h3').replaceWith('<h3> Searching "' + $('#textbox').val() + '". Please wait...</h3>')
			movies = [];
			links = [];
			pageCounter = 1;
			searchMovies();

			function searchMovies(){
				$.ajax({
					url: server,
					dataType: 'jsonp',
					data:{
						q: $('#textbox').val(),
						apiKey: 'gvru729uj8x33ykh4zjvw4nv',
						page: pageCounter
					},
					success: saveData
				});
			}

			function saveData(response){
				total = response.total;
				var tempMovies = response.movies;;
				var tempLinks = response.links;

				for (var i = 0; i < tempMovies.length; i++){
					movies.push(tempMovies[i]);
					links.push(tempLinks[i]);
				}

				if (pageCounter < Math.ceil(total/30)){
					pageCounter++;
					searchMovies();
				}else{
					showMovies();
				}
			}
		}
	});

	$('#textbox').keydown(function(event){
		if (event.which == 13) {
			$('#search').click();
		};
	});

	function showMovies() {
		pageCounter = 1;
		$('#First').css({display: 'none'});
		$('#Previous').css({display: 'none'});
		
		if (pageCounter < Math.ceil(total/pageLimit)){
			$('#Next').css({display: 'inline'});
			$('#Last').css({display: 'inline'});
		}
		else{
			$('#Next').css({display: 'none'});
			$('#Last').css({display: 'none'});
		}
		sortMovies('none');		
	}

	$('#sort-title').click(function(){
		sortMovies('title');
		$('#sort-title').css({'font-weight': 'bold'});
		$('#sort-year').css({'font-weight': 'normal'});
		$('#sort-ratings').css({'font-weight': 'normal'});
	});

	$('#sort-year').click(function(){
		sortMovies('year');
		$('#sort-title').css({'font-weight': 'normal'});
		$('#sort-year').css({'font-weight': 'bold'});
		$('#sort-ratings').css({'font-weight': 'normal'});
	});	

	$('#sort-ratings').click(function(){
		sortMovies('ratings');
		$('#sort-title').css({'font-weight': 'normal'});
		$('#sort-year').css({'font-weight': 'normal'});
		$('#sort-ratings').css({'font-weight': 'bold'});
	});

	$('#First').click(function(){
		$('#First').css({display: 'none'});
		$('#Previous').css({display: 'none'});
		$('#Next').css({display: 'inline'});
		$('#Last').css({display: 'inline'});
		pageCounter = 1;
		sortMovies('none');
	});

	$('#Next').click(function(){
		$('#First').css({display: 'inline'});
		$('#Previous').css({display: 'inline'});
		
		pageCounter++;

		if (pageCounter == Math.ceil(total/pageLimit)){
			$('#Next').css({display: 'none'});
			$('#Last').css({display: 'none'});
		}else{
			$('#Next').css({display: 'inline'});
			$('#Last').css({display: 'inline'});
		}

		sortMovies('none');
		
	});

	$('#Previous').click(function(){
		$('#Next').css({display: 'inline'});
		$('#Last').css({display: 'inline'});
		pageCounter--;

		if (pageCounter == 1){
			$('#First').css({display: 'none'});
			$('#Previous').css({display: 'none'});
		}else{
			$('#First').css({display: 'inline'});
			$('#Previous').css({display: 'inline'});
		}

		sortMovies('none');
	});

	$('#Last').click(function(){
		$('#First').css({display: 'inline'});
		$('#Previous').css({display: 'inline'});
		$('#Next').css({display: 'none'});
		$('#Last').css({display: 'none'});
		pageCounter = Math.ceil(total/pageLimit);
		sortMovies('none');
	});

	function sortMovies(sortBy){
		if (movies.length == 0) {			
			$('h3').replaceWith('<h3>Sorry, there are no results for "' + $('#textbox').val() + '"' + '</h3>');
			$('#content-wrapper').replaceWith('<div id = "content-wrapper"</div>');
			$('h3').css({color: 'red'});
			$('.div-wrapper').animate({margin: '250px auto 15px auto'}, 600);
			$('#sort-container').css({display:'none'});
		}

		else{
			$('.div-wrapper').animate({margin: '25px auto 25px auto'}, 600);
			$('h3').replaceWith('<h3>There are ' + total + ' search results for "' + $('#textbox').val() + '"</h3>');
			
			if ($('#content-wrapper').children().length > 0) {
				$('#content-wrapper').replaceWith('<div id = "content-wrapper"></div>');
			};

			if (sortBy != 'none'){
				if (sortBy == 'title'){
					movies.sort(function(a, b) {
					   var aObj = a.title;
					   var bObj = b.title;
					   return (aObj == bObj) ? 0 : (aObj > bObj) ? 1 : -1;
					});

					pageCounter = 1;
					$('#First').css({display: 'none'});
					$('#Previous').css({display: 'none'});
		
					if (pageCounter < Math.ceil(total/pageLimit)){
						$('#Next').css({display: 'inline'});
						$('#Last').css({display: 'inline'});
					}
					else{
						$('#Next').css({display: 'none'});
						$('#Last').css({display: 'none'});
					}
				}else if (sortBy == 'year'){
					movies.sort(function(a, b) {
					   var aObj = a.year;
					   var bObj = b.year;
					   return (aObj == bObj) ? 0 : (aObj < bObj) ? 1 : -1;
					});

					pageCounter = 1;
					$('#First').css({display: 'none'});
					$('#Previous').css({display: 'none'});
		
					if (pageCounter < Math.ceil(total/pageLimit)){
						$('#Next').css({display: 'inline'});
						$('#Last').css({display: 'inline'});
					}
					else{
						$('#Next').css({display: 'none'});
						$('#Last').css({display: 'none'});
					}
				}else if (sortBy == 'ratings'){
					movies.sort(function(a, b) {
					   var aObj = a.ratings.critics_score;
					   var bObj = b.ratings.critics_score;
					   return (aObj == bObj) ? 0 : (aObj < bObj) ? 1 : -1;
					});

					pageCounter = 1;
					$('#First').css({display: 'none'});
					$('#Previous').css({display: 'none'});
		
					if (pageCounter < Math.ceil(total/pageLimit)){
						$('#Next').css({display: 'inline'});
						$('#Last').css({display: 'inline'});
					}
					else{
						$('#Next').css({display: 'none'});
						$('#Last').css({display: 'none'});
					}
				}
			}

			for (var i = (pageCounter - 1) * pageLimit; i < (pageCounter * pageLimit) && i < movies.length; i++) {
				var movie = movies[i];
				$('#content-wrapper').append('<div class = "movie-wrapper"> <div class ="title-wrapper"><a href="' + movie.links.alternate + '" target = "_blank">'+ movie.title + '</a>' +
					'</div> <div class = "image-wrapper"> <img src="' + movie.posters.thumbnail + '"/></div>' + 
					'<div class = "desc-wrapper">Year: ' + movie.year + 
					'<br>Runtime: ' + movie.runtime + ' mins' +
					'<br>Critic Reviews: <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"' + movie.critics_consensus + '"'+
					'<br>Ratings: ' + movie.ratings.critics_score + '</div' + '</div>');
			};
			$('.movie-wrapper').css({display:'inherit'});
			$('#sort-container').css({display:'inherit'});
			$('#sort-title').css({'font-weight': 'normal'});
			$('#sort-year').css({'font-weight': 'normal'});
			$('#sort-ratings').css({'font-weight': 'normal'});
		};
	}
});