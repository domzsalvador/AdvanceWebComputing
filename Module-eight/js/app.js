$(function () {
	
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/';
	var keyword;

	function request(url, data, callback){
		$.ajax({
			url: url,
			dataType: 'jsonp',
			data: data,
			success: callback
		});

	}
	
	function getTemplate(template_name, data){
		var markup = '';
		var template = $('#' + template_name).html();
		var $template = Handlebars.compile(template);
		markup = $template(data);
		return markup;
	}

	function ShowMovies(response){
		console.log(response);
		var myNode = document.getElementById("list");
		myNode.innerHTML = '';
		
		var movies = response.movies;
		for (var i = 0; i < movies.length; i++) {
			var movie = response.movies[i];
			$('ul').append(getTemplate('tpl-movie', movie));
			//$('thumbnails').append(getTemplate('tpl-movie', movie));
		}
	}
	
	$('#textbox').keydown(function(event){
		if (event.which == 13) {
			$('#btn-search').click();
		};
	});
	
	$('#btn-search').click(function(){
		keyword = $('#textbox').val();
		request(url + "movies.json", {q:keyword, apiKey:'gvru729uj8x33ykh4zjvw4nv'}, ShowMovies);
	});
	
	$('#box-office').click(function(){
		request(url + "lists/movies/box_office.json", {apiKey:'gvru729uj8x33ykh4zjvw4nv'}, ShowMovies);
	});
	
	$('#in-theaters').click(function(){
		request(url + "lists/movies/in_theaters.json", {apiKey:'gvru729uj8x33ykh4zjvw4nv'}, ShowMovies);
	});
	
	$('#opening').click(function(){
		request(url + "lists/movies/opening.json", {apiKey:'gvru729uj8x33ykh4zjvw4nv'}, ShowMovies);
	});
	
	$('#upcoming').click(function(){
		request(url + "lists/movies/upcoming.json", {apiKey:'gvru729uj8x33ykh4zjvw4nv'}, ShowMovies);
	});
	
});