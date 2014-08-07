//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.

/*
1. get data
2. Parse
3. Display in popup.html
*/

/* http://viralpatel.net/blogs/jquery-get-text-element-without-child-element/ */
jQuery.fn.textOnly = function() { 
    return $(this).clone()
            .children()
            .remove()
            .end()
            .text();
};

$(function() {
	predikt = {
		init: function(options) {
			this.default = options;
			this.dataObj = [];
			this.scrapeData();
		},
		scrapeData: function() {
			var cons = '';
			$('#profile').find('*').each(function(index, ele) {
				var blacklist = ["script", "link"];
				if($.inArray($(this).prop("tagName").toLowerCase(), blacklist) < 0) {
					var text = $(this).textOnly();
					var id = $(this).attr('id');
					var className = $(this).attr('class');
					if(text) {
						var data = {};
						if(id) data.id = id;
						if(className) data.className = className;
						if(text) { 
							data.text = text;
							cons += text + ' ';
						}
						predikt.dataObj.push(data);
					}
				}
			});
			console.log(cons);
		}
	};
	
	/* Options */
	var host = window.location.hostname;
	var option = {'host': host};
	predikt.init(option);
});