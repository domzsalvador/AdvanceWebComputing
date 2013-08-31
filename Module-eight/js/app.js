$function () {
	
	var app={};

	function request(url, data, callback){
		$.ajax({
			url: server,
			dataType: 'jsonp',
			data: data,
			success: saveData
		});

	}
	function getTemplate(template_name, data){
		var markup = '';
		var template_name = $('#' + template_name).html();
		var $template = Handlebars.compile(template);
		markup = $template(data);
		return markup;
	}

	function ShowBoxOffice(response){
		var movie;
		for (var i = 0; i < response.movies.length; i++) {
			movie = response.movies[i];
			$('ul').append(getTemplate('tpl-movie', movie));
		}
	}

	request(url, {apiKey:'gvru729uj8x33ykh4zjvw4nv'}, ShowBoxOffice);
}