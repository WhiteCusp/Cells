/*
 * Ajax细胞 
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('cell_ajax',function() {

	var DOC = document,
		head = DOC.getElementsByTagName('head')[0];
		W3C = DOC.addEventListener;

	function initCell() {};

	cellfn = initCell.prototype = {

		loadStyle : function(url) {
			var node = DOC.createElement("link");
			node.rel = "stylesheet";
			node.href = url;
			head.insertBefore(node, head.firstChild);
		},

		loadScript : function(url, options) {
			var option = {
				onPending : options.onPending ||
				function () {},
				onError : options.onError ||
				function () {},
				onSuccess : options.onSuccess ||
				function () {}
			};
			//通过script节点加载目标模块
			var node = DOC.createElement("script");
			node[W3C ? "onload" : "onreadystatechange"] = function () {
				if (W3C || /loaded|complete/i.test(node.readyState)) {
					node.onreadystatechange = node.onload = null;
					option.onSuccess.call(this, node.src);
				}
			}
			node.onerror = function () {
				option.onError.call(this, node.src);
			}

			node.src = url;
			head.insertBefore(node, head.firstChild);
			option.onPending.call(this, node.src);
		}
	};
});