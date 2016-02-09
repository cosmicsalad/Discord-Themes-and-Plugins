//META{"name":"KillKappa"}*//

function KillKappa(){}

KillKappa.prototype.getName = function() {
    return "Murder Kappa";
};

KillKappa.prototype.getDescription = function() {
    return "The most acceptable felony. I just really hate this emote.";
};

KillKappa.prototype.getVersion = function() {
    return "1.0";
};

KillKappa.prototype.getAuthor = function() {
    return "CosmicSalad";
};

KillKappa.prototype.start = function() {
	KillKappa.prototype.murder();
};

KillKappa.prototype.onMessage = function() {
    var str = $('.message .markup').text();
	if (str.indexOf("Kappa") >= 0) {
		KillKappa.prototype.murder();
	};
};

KillKappa.prototype.murder = function() {
	$('.message .markup').find(":contains('Kappa')").each( function() {
		var text = $(this).text();
		text = text.replace('Kappa','I\'M A FLAMING BAG OF DICKS');
		$(this).text(text);
	});
};

KillKappa.prototype.load = function() {};
KillKappa.prototype.unload = function() {};
KillKappa.prototype.stop = function() {};
KillKappa.prototype.onSwitch = function() {};
KillKappa.prototype.getSettingsPanel = function() {};