$(function () {
	
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/';
	var api_key = 'gvru729uj8x33ykh4zjvw4nv';
	var data = {apiKey:api_key};
	var keyword;
	
	function request(urlIn, dataIn){
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
		var myNode = document.getElementById("list");
		myNode.innerHTML = '';
		
		var movies = response.movies;
		for (var i = 0; i < movies.length; i++) {
			var movie = response.movies[i];
			$('ul').append(getTemplate('tpl-movie', movie));
		}
	}
	
	$('#textbox').keydown(function(event){
		if (event.which == 13) {
			$('#btn-search').click();
		};
	});
	
	$('#btn-search').click(function(){
		keyword = $('#textbox').val();
		var search_data = {q:keyword, apiKey:api_key};
		request(url + "movies.json", search_data);
	});
	
	$('#box-office').click(function(){
		request(url + "lists/movies/box_office.json", data);
	});
	
	$('#in-theaters').click(function(){
		request(url + "lists/movies/in_theaters.json", data);
	});
	
	$('#opening-movies').click(function(){
		request(url + "lists/movies/opening.json", data);
	});
	
	$('#upcoming-movies').click(function(){
		request(url + "lists/movies/upcoming.json", data);
	});
	
	$('#top-rentals').click(function(){
		request(url + "lists/dvds/top_rentals.json", data);
	});
	
	$('#current-release').click(function(){
		request(url + "lists/dvds/current_releases.json", data);
	});
	
	$('#new-release-dvds').click(function(){
		request(url + "lists/dvds/new_releases.json", data);
	});
	
	$('#upcoming-dvds').click(function(){
		request(url + "lists/dvds/upcoming.json", data);
	});
	
});