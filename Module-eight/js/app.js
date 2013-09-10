$(function () {
	var keyword;
	var movies;
	var pageNum;
	var urlParam;
	var dataParam;
	var total;
	var pageLimit = 15;
	
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/';
	var data = {q: '', apiKey:'gvru729uj8x33ykh4zjvw4nv', page_limit: pageLimit, page: 1};
	
	function request(urlIn, dataIn){
		urlParam = urlIn;
		dataParam = dataIn;
		
		$.ajax({
			url: urlIn,
			dataType: 'jsonp',
			data: dataIn,
			success: showMovies
		});
	}
	
	function getTemplate(template_name, dataIn){
		var markup = '';
		var template = $('#' + template_name).html();
		var $template = Handlebars.compile(template);
		markup = $template(dataIn);
		return markup;
	}

	function showMovies(response){
		console.log(response);
		
		total = response.total;
		movies = response.movies;
		
		if (movies.length > 0){
			
		
			for (var i = 0; i < movies.length; i++) {
				var movie = movies[i];
				$('#list').append(getTemplate('tpl-movie', movie));
			}
		} else {
			console.log('no search result');
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
			console.log("input movie title");
		}
	});
	
	$('#box-office').click(function(){
		resetValues();
		request(url + "lists/movies/box_office.json", data);
	});
	
	$('#in-theaters').click(function(){
		resetValues();
		request(url + "lists/movies/in_theaters.json", data);
	});
	
	$('#opening-movies').click(function(){
		resetValues();
		request(url + "lists/movies/opening.json", data);
	});
	
	$('#upcoming-movies').click(function(){
		resetValues();
		request(url + "lists/movies/upcoming.json", data);
	});
	
	$('#top-rentals').click(function(){
		resetValues();
		request(url + "lists/dvds/top_rentals.json", data);
	});
	
	$('#current-release').click(function(){
		resetValues();
		request(url + "lists/dvds/current_releases.json", data);
	});
	
	$('#new-release-dvds').click(function(){
		resetValues();
		request(url + "lists/dvds/new_releases.json", data);
	});
	
	$('#upcoming-dvds').click(function(){
		resetValues();
		request(url + "lists/dvds/upcoming.json", data);
	});
	
	function resetValues(){
		var myNode = document.getElementById("list");
		myNode.innerHTML = '';
		
		console.log('Searching movies');
		$('#textbox').val('');
		movies = [];
		pageNum = 1;
		urlParam = '';
		dataParam = '';
		total = 0;
		data.page = 1;
	}
	
});