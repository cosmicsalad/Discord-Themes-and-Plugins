//META{"name":"ServerSort"}*//

function ServerSort(){}

ServerSort.prototype.getName = function() {
    return "Server Sort";
};

ServerSort.prototype.getDescription = function() {
    return "Drag and Drop to reorder the list of servers and channels";
};

ServerSort.prototype.getVersion = function() {
    return "1.1";
};

ServerSort.prototype.getAuthor = function() {
    return "CosmicSalad";
};

ServerSort.prototype.start = function() {

	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://raw.githubusercontent.com/cosmicsalad/Discord-Themes-and-Plugins/master/lib/jquery-ui.min.js';
	$("head").append(script);
	console.log("server sort loaded");

	this.initServerList();
	this.initChannelList();

};

ServerSort.prototype.initServerList = function() {

	// set initial order
	var storedOrder = JSON.parse(localStorage.getItem("sortOrder"));

	// make server list sortable
	$(".guilds").sortable({
		axis: 'y',
		distance: 10,
		items: 'li[data-reactid*=".0.1.1.0.0.0.3:"]',
		update: function (e, ui) {
			ServerSort.prototype.storeNewServerList();
		}
	}).disableSelection();

	//set initial order if order changed
	if(storedOrder) {
		$.each(storedOrder,function(index,value) {
			$(".guilds").append($('li[data-reactid*="'+value+'"]'));
			$('.guilds-add').parent().appendTo($('.guilds'));
		});
	};

	this.checkNewServer();
	this.storeNewServerList();

};

ServerSort.prototype.storeNewServerList = function() {
	serverArray = $.map($(".guilds").children('li[data-reactid*=".0.1.1.0.0.0.3:"]'), function(el) {
		return $(el).data('reactid');
	});
	localStorage.setItem("sortOrder", JSON.stringify(serverArray));
};

ServerSort.prototype.initChannelList = function() {

	// set initial order
	storedChannelOrder = JSON.parse(localStorage.getItem("sortChannelOrder"));

	// make channel list sortable
	$(".guild-channels ul").sortable({
		axis: 'y',
		distance: 10,
		items: 'li[data-reactid*=".0.1.1.0.1.0.1.0.0.1.0:"]',
		update: function (e, ui) {
			ServerSort.prototype.storeNewChannelList();
		}
	}).disableSelection();

	currentServer = $('.guilds li.active').data('reactid');

	//set initial order if order changed
	if(storedChannelOrder && storedChannelOrder[currentServer]) {
		$.each(storedChannelOrder[currentServer],function(index,value) {
			$(".guild-channels ul[data-reactid='.0.1.1.0.1.0.1.0.0.1']").append($('li[data-reactid*="'+value+'"]'));
		});
	}

	//this.checkNewChannel();
	this.storeNewChannelList();

};

ServerSort.prototype.storeNewChannelList = function() {

	currentServer = $('.guilds li.active').data('reactid');
	channels = $.map($(".guild-channels ul").children('li[data-reactid*=".0.1.1.0.1.0.1.0.0.1.0:"]'), function(el) { 
		return $(el).data('reactid');
	});

	var storedChannelOrder = JSON.parse(localStorage.getItem("sortChannelOrder"));

	channelList = {};
	channelList[currentServer] = channels;
	newChannelList = $.extend({}, storedChannelOrder, channelList);

	localStorage.setItem("sortChannelOrder", JSON.stringify(newChannelList));
};

ServerSort.prototype.checkNewServer = function() {
    $(".guilds").on('DOMNodeInserted', 'li[data-reactid*=".0.1.1.0.0.0.3:"]', function(e) {
    	var storedOrder = JSON.parse(localStorage.getItem("sortOrder"));
    	if($.inArray($(e.target).data('reactid'), storedOrder) !== -1) {
    		//console.log('IS IN ARRAY');
    	} else {
    		//console.log('IS NOT IN ARRAY');
    		ServerSort.prototype.storeNewList();
    		$('.guilds-add').parent().appendTo($('.guilds'));
    	}
    });
};

ServerSort.prototype.load = function() {};
ServerSort.prototype.unload = function() {};
ServerSort.prototype.stop = function() {};
ServerSort.prototype.onSwitch = function() {
	this.initChannelList();
};
ServerSort.prototype.getSettingsPanel = function() {
    return null;
};