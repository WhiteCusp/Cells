/*
 * 工具细胞 
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('cell_event',function() {
	
	function Cell() {}

	cellfn = Cell.prototype = {
		domReady : function(fn) {
			if (document.readyState === 'complete') {
				// 如果文档已完成接收，则直接调用
				setTimeout( fn, 1 );
			} else if ( document.addEventListener ) {
				// IE8+ 否则监听 DOMContentLoaded 事件
				document.addEventListener('DOMContentLoaded', fn, false);
			} else {
				// IE6~8,因为在DOM加载完成前执行document.documentElement.doScroll("left");会返回一个错误
				(function doScrollCheck() {
					try {
						document.documentElement.doScroll("left");
					} catch(e) {
						return setTimeout( doScrollCheck, 50 );
					}
					fn();
				})();
			}
		}
	};

	return new Cell();
});