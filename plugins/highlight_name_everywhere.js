//META{"name":"ehln"}*//

function ehln() {}

ehln.prototype.highlight = function () {
		var n = document.querySelector('span.username');
		if(n === null) return;
		var name = n.innerHTML;
		var color = localStorage.getItem('ehln_color') || '#009933';
		var msg = document.querySelectorAll('div.message-text');
		for (i = 0; i < msg.length; ++i) {
			if(msg[i].innerHTML.indexOf(name) != -1){
				msg[i].style.backgroundColor = color;
			}
		}
};

ehln.prototype.setColor = function (e) {
	var color = e.value;
	localStorage.setItem('ehln_color', color);
};
ehln.prototype.resetConfig = function () {
	localStorage.removeItem('ehln_color');
	
	var cp = document.querySelector('#colorpick');
	if(cp !== null){
		cp.value = '#009933';
	}
};
ehln.prototype.onMessage = function () {
	this.highlight();
};

ehln.prototype.onSwitch = function () {
	this.highlight();
};

ehln.prototype.start = function () {
	this.highlight();
};

ehln.prototype.load = function () {};
ehln.prototype.unload = function () {};
ehln.prototype.stop = function () {};
ehln.prototype.getSettingsPanel = function () {
	var html = [];
	html.push('</br>');
	html.push('<label for="colorpick">Click to select Highlight-Color</label>');
	var color = localStorage.getItem('ehln_color') || '#009933';
	html.push('<input type="color" id="colorpick" onchange="ehln.prototype.setColor(this)" value="' + color + '" style="width:100px;">');
	html.push('</br><input type="button" id="resetConfig" onclick="ehln.prototype.resetConfig()" value="Reset Config">');
	return html.join('\n');
};

ehln.prototype.getName = function () {
    return "Highlight Name Everywhere";
};
ehln.prototype.getDescription = function () {
    return "Highlights Lines containing Name";
};
ehln.prototype.getVersion = function () {
    return "0.0.1";
};
ehln.prototype.getAuthor = function () {
    return "Pohky";
};
