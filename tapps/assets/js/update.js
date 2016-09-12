goog.require('goog.crypt.base64');

function stringToByteArray(str) {
	var array = new (window.Uint8Array !== void 0 ? Uint8Array : Array)(str.length);
	var i;
	var il;

	for (i = 0, il = str.length; i < il; ++i) {
		array[i] = str.charCodeAt(i) & 0xff;
	}

	return array;
}

function update() {
	var code = editor.getSession().getValue();
	console.log('Input: ' + code.length + ' bytes');
	var gzip = new Zlib.Gzip(stringToByteArray(code));
	var compressed = gzip.compress();
	console.log('Compressed: ' + compressed.length + ' bytes');
	var compiled = goog.crypt.base64.encodeByteArray(compressed);
	console.log('Compiled: ' + compiled.length + ' bytes');

	$('#code').html('');

	//var arrays = compiled.match(/.{1,512}/g);

	//for (i = 0, ii = arrays.length; i < ii; i++) {
		$('#code').qrcode({
			'ecLevel': 'L',
			'size': 300,
      'fill': '#1ABC9C',
			'text': compiled
		});
	//}
}
