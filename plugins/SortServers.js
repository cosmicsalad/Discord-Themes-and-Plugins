//META{"name":"ServerSort"}*//

function ServerSort(){}

ServerSort.prototype.getName = function() {
    return "Server Sort";
};

ServerSort.prototype.getDescription = function() {
    return "Reorder the list of servers";
};

ServerSort.prototype.getVersion = function() {
    return "1.0";
};

ServerSort.prototype.getAuthor = function() {
    return "CosmicSalad";
};

ServerSort.prototype.start = function() {

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://raw.githubusercontent.com/voidberg/html5sortable/master/dist/html.sortable.min.js';
	$("head").append(script);
	console.log("server sort loaded");

	//set var for list without fluff
	var serverList = $('.guilds li[data-reactid*=".0.1.1.0.0.0.3:"]');

	// set initial order
	var storedOrder = JSON.parse(localStorage.getItem("sortOrder"));

	// make list sortable
	/*$(".guilds").sortable({
		axis: 'y',
		items: 'li[data-reactid*=".0.1.1.0.0.0.3:"]',
		update: function (e, ui) {
			ServerSort.prototype.storeNewList();
		}
	}).disableSelection();*/
	$('.guilds').sortable({
		handle: 'a',
		items: 'li[data-reactid*=".0.1.1.0.0.0.3:"]'
	});

	$('.guilds').sortable().bind('sortstart', function(e, ui) {
		console.log('grabbed');
		$('.guild-inner:before').hide();
	});

	$('.guilds').sortable().bind('sortupdate', function(e, ui) {
		ServerSort.prototype.storeNewList();
	});

	//set initial order if order changed
	if(storedOrder) {
		$.each(storedOrder,function(index,value) {
			$(".guilds").append($('li[data-reactid*="'+value+'"]'));
			$('.guilds-add').parent().appendTo($('.guilds'));
		});
	};

	this.checkNew();
	this.storeNewList();

};

ServerSort.prototype.storeNewList = function() {
	dataArray = $.map($(".guilds").children('li[data-reactid*=".0.1.1.0.0.0.3:"]'), function(el) {
		return $(el).data('reactid');
	});
	localStorage.setItem("sortOrder", JSON.stringify(dataArray));
};

ServerSort.prototype.checkNew = function() {
    $(".guilds").on('DOMNodeInserted', 'li[data-reactid*=".0.1.1.0.0.0.3:"]', function(e) {
    	var storedOrder = JSON.parse(localStorage.getItem("sortOrder"));
    	if($.inArray($(e.target).data('reactid'), storedOrder) !== -1) {
    		//console.log('IS IN ARRAY');
    	} else {
    		console.log('IS NOT IN ARRAY');
    		$(e.target).appendTo($('.guilds'));
    		ServerSort.prototype.storeNewList();
    		$('.guilds-add').parent().appendTo($('.guilds'));
    	}
    });
};

ServerSort.prototype.load = function() {};
ServerSort.prototype.unload = function() {};
ServerSort.prototype.stop = function() {};
ServerSort.prototype.onSwitch = function() {};
ServerSort.prototype.getSettingsPanel = function() {
    return '';
};