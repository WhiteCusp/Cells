/*
 * 工具细胞 
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
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
		},

		random : function(min, max) {
			if (max === null) {
				max = min;
				min = 0;
			}
			return min + Math.floor(Math.random() * (max - min + 1));
		},

		scrollTop: function() {
			return document.documentElement.scrollTop || document.body.scrollTop;
		},

		getOffset: function(element) {
      var result = {
				top:element.offsetTop,
				left:element.offsetLeft
      };
      var parent = element.offsetParent;

      while(parent !== null) {
        result.top += parent.offsetTop;
        result.left += parent.offsetLeft;
        parent = parent.offsetParent;
      }

      return result;
    },

    fixEvent: function(ev) {
    	//ie 6 7 8不存在target、pageX、pageY
			ev.target = ev.srcElement || ev.target; 
			ev.pageX = ev.x || ev.pageX;
			ev.pageY = ev.y || ev.pageY;
    }
	};

	return new Cell();
});