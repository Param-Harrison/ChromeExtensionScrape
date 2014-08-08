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

			if(cons) {
				var div = '<div class="-pred-sticky-right -pred-show">';
				div += '<div data-show="1" class="-pred-side-click">';
				div += '<div class="-pred-side-button">';
				div += '<div class="-pred-side-btn-txt">...</div>';
				div += '</div>';
				div += '</div>';
				//div += '<div>'+ cons +'</div>';
				div += '</div>';

				$('body').append(div).css({'margin-right': '260px'});

				$('.-pred-side-click').click(function() {
					var show = $(this).attr('data-show');
					if(show == '1') {
						$(this).attr({'data-show': '0'});
						$(this).parents('.-pred-sticky-right').addClass('-pred-hide').removeClass('-pred-show');
					} 
					else {
						$(this).attr({'data-show': '1'});
						$(this).parents('.-pred-sticky-right').addClass('-pred-show').removeClass('-pred-hide');
					}
				});
			}
		}
	};
	
	/* Options */
	var host = window.location.hostname;
	var option = {'host': host};
	setTimeout(function() {
		predikt.init(option);
	}, 2000);
});