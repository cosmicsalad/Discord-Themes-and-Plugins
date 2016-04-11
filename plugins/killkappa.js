//META{"name":"KillKappa"}*//

function KillKappa(){}

KillKappa.prototype.getName = function() {
    return "Murder Kappa";
};

KillKappa.prototype.getDescription = function() {
    return "The most acceptable felony. This emote must die in every way possible";
};

KillKappa.prototype.getVersion = function() {
    return "1.0";
};

KillKappa.prototype.getAuthor = function() {
    return "CosmicSalad";
};

KillKappa.prototype.start = function() {
	KillKappa.prototype.murder();
	var replaceInsult = localStorage.getItem('murderText');
};

KillKappa.prototype.onMessage = function() {
    var str = $('.message .markup').text();
	if (str.indexOf("Kappa") >= 0) {
		KillKappa.prototype.murder();
	};
};

KillKappa.prototype.murder = function(e) {
	if (this.replaceInsult == null) this.replaceInsult = "I'M A FLAMING BAG OF DICKS";
	if (e) this.replaceInsult = e;
	localStorage.setItem('murderText',this.replaceInsult);
	$('.message .markup').find(":contains('Kappa')").each( function() {
		var text = $(this).text();
		text = text.replace('Kappa',localStorage.getItem('murderText'));
		$(this).text(text);
	});
};

KillKappa.prototype.load = function() {};
KillKappa.prototype.unload = function() {};
KillKappa.prototype.stop = function() {};
KillKappa.prototype.onSwitch = function() {
	KillKappa.prototype.murder();
};
KillKappa.prototype.getSettingsPanel = function() {
	/*return '<label for="murdered">Replace Text: </label> ' + 
           '<input type="text" placeholder="Game.." name="murdered" id="murdered" value="'+localStorage.getItem('murderText')+'" style="width:200px;">' + 
           '<button onclick="KillKappa.prototype.murder(document.getElementById(\'murdered\').value)">Murder</button>';
           */
};