$(document).ready(function() { 
	// Add RFC1918 addresses
	$("#addrfc").click(function(e) { advancedAdd('addrfc', e.target); });

	// Add 'this host'
	$("#addhost").click(function(e) { advancedAdd('addthishost', e.target); });


});




function advancedAdd(cmd, target) {
	$(target).text("Updating...").prop('disabled', true);
	$.ajax({
		url: window.FreePBX.ajaxurl,
		data: { command: cmd, module: 'firewall' },
		complete: function(data) { 
			$(target).text("Added");
		}
	});
}

function updateQuery(key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"), hash;
	var url = window.location.href;

	if (re.test(url)) {
		if (typeof value !== 'undefined' && value !== null) {
			return url.replace(re, '$1' + key + "=" + value + '$2$3');
		} else {
			hash = url.split('#');
			url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
			if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
				url += '#' + hash[1];
			}
			return url;
		}
	} else {
		if (typeof value !== 'undefined' && value !== null) {
			var separator = url.indexOf('?') !== -1 ? '&' : '?';
			hash = url.split('#');
			url = hash[0] + separator + key + '=' + value;
			if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
				url += '#' + hash[1];
			return url;
		} else {
			return url;
		}
	}
}

