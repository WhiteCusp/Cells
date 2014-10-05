/*
 * 事件细胞 
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else {
		window['cell'] = window.cell || {};
		window['cell'][name] = definition();
	}
})('event',function() {
	function Cell() {
		this._listeners = {};
	}

	cellfn = Cell.prototype = {

		on : function(types, fn) {
			if (types.indexOf(' ') !== -1) {
				var					i = 0,
									len = eventList.length,
						eventList = types.split(' ');

				for (; i < len; i++) {
					this.on(eventList[i], fn);
				}
			} else {
				this._listeners[types] = this._listeners[types] || [];
				this._listeners[types].push(fn);
			}
		},

		off : function(types, fn) {
			if (types.indexOf(' ') !== -1) {
				var eventList = types.split(' ');
				var i = 0,
				len = eventList.length;
				for (; i < len; i++) {
					this.off(eventList[i], fn);
				}
			} else {
				if (typeof this._listeners[types] !== 'undefined') {
					var listeners = this._listeners[types],
						n = listeners.length;
					for (; n >= 0; n--) {
						listeners[n] == fn && listeners.splice(n,1);
					}
				}
			}
		},

		trigger : function () {
			var ev = arguments[0],
				param = Array.prototype.slice.call(arguments,1);

			if (this._listeners[ev] !== undefined) {
				var n = this._listeners[ev].length,
					listeners = this._listeners[ev];
				for (var i = 0; i < n; i++) {
					listeners[i].apply(this,param || null);
				};
			}

		}
	};

	return new Cell();
});