//META{"name":"Replyer"}*//

var Replyer = function () {};

Replyer.prototype.onMessage = function() {
};
Replyer.prototype.onSwitch = function() {
};
Replyer.prototype.start = function() {
	$(document).on("mouseover.rpr", function(e) {
		var target = $(e.target);
		if(target.parents(".message").length > 0) {
			var allmessages = $('.messages .message-group');
			var nameDateBlock = $('.messages .message-group .comment .message .body h2');
			var replyBtn = '<span class="replyer" style="cursor:pointer;color:#fff !important;position:relative;top:-1px;margin-left:5px;text-transform:uppercase;font-size:10px;padding:3px 5px;box-sizing:border-box;background:rgba(0,0,0,0.4)">Reply</span>';
			allmessages.on('mouseover',function() {
				if(nameDateBlock.find('.replyer').length == 0) {
					$(this).find(nameDateBlock).append(replyBtn);
					$(this).find('.replyer').click(function() {
						var user = $(this).parent().find('.user-name').text();
						$('.content .channel-textarea textarea').val('@'+user+' ').focus();
					});
				}
			});
			allmessages.on('mouseleave',function() {
				if(nameDateBlock.find('.replyer').length == 1) {
					$(this).find('.replyer').empty().remove();
				}
			});
		}
	});
	console.log('Replyer started.');
};

Replyer.prototype.load = function() {};
Replyer.prototype.unload = function() {
	$(document).off("mouseover.rpr");
};
Replyer.prototype.stop = function() {
	$(document).off("mouseover.rpr");
};
Replyer.prototype.getSettingsPanel = function() {
	return null;
};

Replyer.prototype.getName = function() {
    return "Replyer";
};
Replyer.prototype.getDescription = function() {
    return "Reply to people with a button";
};
Replyer.prototype.getVersion = function() {
    return "1.0";
};
Replyer.prototype.getAuthor = function() {
    return "CosmicSalad";
};