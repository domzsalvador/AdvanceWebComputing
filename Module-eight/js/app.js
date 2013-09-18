var globalMovies;

$(function () {
	$('#movie-details').css({display: 'none'});

	var keyword;
	var movies;
	var pageNum;
	var urlParam;
	var dataParam;
	var total;
	var pageLimit = 50;
	var pageCounter = 1;
	
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/';
	var data = {q: '', apiKey:'gvru729uj8x33ykh4zjvw4nv', page_limit: pageLimit, page: pageCounter};
	
	function request(urlIn, dataIn){
		urlParam = urlIn;
		dataParam = dataIn;
		
		$.ajax({
			url: urlIn,
			dataType: 'jsonp',
			data: dataIn,
			success: saveData
		});
	}
	
	function saveData(response){
		total = response.total;
		var tempMovies = response.movies;

		for (var i = 0; i < tempMovies.length; i++){
			movies.push(tempMovies[i]);
		}

		if (pageCounter < Math.ceil(total/pageLimit)){
			pageCounter++;
			dataParam.page = pageCounter;
			request(urlParam, dataParam);
		}else{
			showMovies();
		}
	}

	function showMovies(){
		if (movies.length > 0){
			globalMovies = movies;
			for (var i = 0; i < movies.length; i++) {
				var movie = movies[i];
				var movieTitle = movie.title;
				movie.titleReserve = movieTitle;
				if (movie.title.length > 30) {
					movie.title = movieTitle.substring(0, 27) + "...";
				}
				
				if (movie.year.length != 0){
					movie.year = "(" + movie.year + ")";
				}
				
				movie.indexId = i;
				$('#list').append(getTemplate('tpl-movie', movie));
				$('#list-temp').append(getTemplate('tpl-movie', movie));
				
				$('#movie-details-' + movie.indexId).css({display: 'none'});
			}
			
			if (movies.length % 4 == 0) {
				$('#list').append('<div class="spacer">&nbsp;&nbsp;&nbsp;<br><br><br></div>');
			} else {
				$('#list').append('<div class="spacer">&nbsp;&nbsp;&nbsp;<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div>');
			}
			
			$('#list-temp').css({display: 'none'});
			$('#h3').replaceWith('<h3></h3>');
			$('#msg').animate({margin: '0px auto 0px auto'}, 600);
		} else {
			$('#msg').css({margin: '250px'});
			$('h3').replaceWith('<h3>Sorry, there are no results for "' + keyword + '"' + '</h3>');
			$('h3').css({color: 'red'});
			
		}
	}
	
	$('#textbox').keydown(function(event){
		if (event.which == 13) {
			$('#btn-search').click();
		};
	});
	
	$('#btn-search').click(function(){
		keyword = $('#textbox').val();
		data.q = keyword;
		resetValues();
		$('#textbox').val(keyword);
		
		if (keyword.length > 0){
			request(url + "movies.json", data);
		} else {
			$('h3').css({color: 'black'});
			$('#msg').css({margin: '250px'});
			$('h3').replaceWith('<h3>Input movie title.</h3>');
			$('#msg').animate({margin: '0px auto 0px auto'}, 2000);
		}
	});
	
	$('#box-office').click(function(){
		resetValues();
		$('#box-office').addClass("disabled");
		request(url + "lists/movies/box_office.json", data);
	});
	
	$('#in-theaters').click(function(){
		resetValues();
		$('#in-theaters').addClass("disabled");
		request(url + "lists/movies/in_theaters.json", data);
	});
	
	$('#opening-movies').click(function(){
		resetValues();
		$('#opening-movies').addClass("disabled");
		request(url + "lists/movies/opening.json", data);
	});
	
	$('#upcoming-movies').click(function(){
		resetValues();
		$('#upcoming-movies').addClass("disabled");
		request(url + "lists/movies/upcoming.json", data);
	});
	
	$('#top-rentals').click(function(){
		resetValues();
		$('#top-rentals').addClass("disabled");
		request(url + "lists/dvds/top_rentals.json", data);
	});
	
	$('#current-release').click(function(){
		resetValues();
		$('#current-release').addClass("disabled");
		request(url + "lists/dvds/current_releases.json", data);
	});
	
	$('#new-release-dvds').click(function(){
		resetValues();
		$('#new-release-dvds').addClass("disabled");
		request(url + "lists/dvds/new_releases.json", data);
	});
	
	$('#upcoming-dvds').click(function(){
		resetValues();
		$('#upcoming-dvds').addClass("disabled");
		request(url + "lists/dvds/upcoming.json", data);
	});
	
	function resetValues(){
		var myNode = document.getElementById("list").innerHTML = '';
		var myNode = document.getElementById("list-temp").innerHTML = '';
		
		$('#msg').css({margin: '250px'});
		$('h3').css({color: 'black'});
		$('h3').replaceWith('<h3>Searching movies...</h3>');
		$('#textbox').val('');
		movies = [];
		pageNum = 1;
		urlParam = '';
		dataParam = '';
		total = 0;
		data.page = 1;
		
		$('#box-office').removeClass("disabled");
		$('#in-theaters').removeClass("disabled");
		$('#opening-movies').removeClass("disabled");
		$('#upcoming-movies').removeClass("disabled");
		$('#top-rentals').removeClass("disabled");
		$('#current-release').removeClass("disabled");
		$('#new-release-dvds').removeClass("disabled");
		$('#upcoming-dvds').removeClass("disabled");
	}
});
	
	function getTemplate(template_name, dataIn){
		var markup = '';
		var template = $('#' + template_name).html();
		var $template = Handlebars.compile(template);
		markup = $template(dataIn);
		return markup;
	}

	function showMore(id){
		var globalMovie = globalMovies[id];
		
		if (globalMovie.synopsis.length == 0) {
			globalMovie.synopsis = "No available synopsis.";
		}	
		
		$('list').html(getTemplate('tpl-movie-details', globalMovie));
	}
	
	function back(id){
		var myNode = document.getElementById("list");
		myNode.innerHTML = document.getElementById("list-temp").innerHTML;
	}