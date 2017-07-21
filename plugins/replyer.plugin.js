//META{"name":"Replyer"}*//

var Replyer = function () {};

Replyer.prototype.getName = function() {
    return "Replyer";
};
Replyer.prototype.getDescription = function() {
    return "Reply to people with a button (Thanks Zerebos for pointing out a new method for grabbing IDs)";
};
Replyer.prototype.getVersion = function() {
    return "1.2";
};
Replyer.prototype.getAuthor = function() {
    return "Hammock & Zerebos";
};
Replyer.prototype.getReactInstance = function(node) { 
	return node[Object.keys(node).find((key) => key.startsWith("__reactInternalInstance"))];
}
Replyer.prototype.start = function() {
	$(document).on("mouseover.rpr", function(e) {
		var target = $(e.target);
		if(target.parents(".message").length > 0) {
			var isCompact = false;
			var allmessages = $('.messages .message-group');
			var nameDateBlock = $('.messages .message-group .comment .message .body h2');
			var replyBtn = '<span class="replyer" style="cursor:pointer;color:rgba(255,255,255,.4) !important;position:relative;top:-1px;margin-left:5px;text-transform:uppercase;font-size:10px;padding:3px 5px;box-sizing:border-box;background:#282b30;-webkit-border-radius:3px;">Reply</span>';
			allmessages.on('mouseover',function() {
				if (nameDateBlock.find('.replyer').length == 0) {
					$(this).find(nameDateBlock).append(replyBtn);
					$(this).find('.replyer').click(function() {
						var getReactInstance = function(node) { 
							return node[Object.keys(node).find((key) => key.startsWith("__reactInternalInstance"))];
						}
						var group = $(this).parents('.message-group')
						var user = getReactInstance(group[0])._currentElement.props.children[1].props.children["0"]["0"].props.message.author.id
						$('.content .channel-textarea textarea').val('<@!'+user+'> '+$('.content .channel-textarea textarea').val()).focus();
						$('.content .channelTextArea-1HTP3C textarea').val('<@!'+user+'> '+$('.content .channelTextArea-1HTP3C textarea').val()).focus();
						$('.content .channelTextArea-1HTP3C textarea')[0].dispatchEvent(new Event('input', { bubbles: true }))
					});
				}
			});
			allmessages.on('mouseleave',function() {
				if (nameDateBlock.find('.replyer').length == 1) {
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
	$('.messages .message-group').off('mouseover');
	$('.messages .message-group').off('mouseleave');
};
Replyer.prototype.stop = function() {
	$(document).off("mouseover.rpr");
	$('.messages .message-group').off('mouseover');
	$('.messages .message-group').off('mouseleave');
};
Replyer.prototype.getSettingsPanel = function() {
	return null;
};
Replyer.prototype.onMessage = function() {
};
Replyer.prototype.onSwitch = function() {
};
