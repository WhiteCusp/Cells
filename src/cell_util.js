/*
 * util cell
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else {
		window['cell'] = window.cell || {};
		window['cell'][name] = definition();
	}
})('util',function() {
	
	function Cell() {
		this._escapseMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#x27;'
		};

		this._escapseReg = new RegExp('[' + cellfn.keys(this._escapseMap).join('') + ']', 'g');
	}

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
    },

    keys: Object.keys || function(obj) {
			if (obj !== Object(obj)) throw new TypeError('Invalid object');

			var result = [];
			for(var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					result.push(prop);
				}
			}
			return result;
		},

		extend: function(obj1, obj2) {
			for (var prop in obj2) {
				if (obj2.hasOwnProperty(prop)) {
					obj1[prop] = obj2[prop];
				}
			}
		},

		trim: function(str) {
			if (String.prototype.trim) {
				return str.trim();
			}

			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},

		bind: function(fn, context) {
			var args, bound;
			args = Array.prototype.slice.call(arguments, 2);
			
			return bound = function() {
				return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
			};
		}
	};

	
	cellfn.escape = function(str) {

		return str.replace(this._escapseReg, this.bind(function(match){
			return this._escapseMap[match];
		}, this));
	}

	return new Cell();
});