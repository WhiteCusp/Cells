/*
 * 事件细胞 
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition)
	} else {
		window['cell'] = window.cell || {}
		window['cell'][name] = definition()
	}
})('event',function() {
  "use strict"

	function Cell() {
		this._listeners = {}
	}

	cellfn = Cell.prototype = {
    // 事件绑定
		on : function(ele, evTypes, cb) {
      var eleLength = ele.length

      if (eleLength) {
        for (var i = 0; i < eleLength; i++) {
          this.on(ele[i], evTypes, cb)
        }
      }

			if (evTypes.indexOf(' ') !== -1) {
        var eventList = evTypes.split(' '),
                  len = eventList.length

				for (var i = 0; i < len; i++) {
					this.on(ele, eventList[i], cb)
				}
			}

      if (isDomEvent(ele, evTypes)) {
        this.addEventListener(ele, evTypes, cb)
      } else {
				this._listeners[evTypes] = this._listeners[evTypes] || [];
				this._listeners[evTypes].push(cb);
			}

		},
    // 事件解除绑定
		off : function(ele, evTypes, cb) {
      var eleLength = ele.length

      if (eleLength) {
        for (var i = 0; i < eleLength; i++) {
          this.off(ele[i], evTypes, cb)
        }
      }

			if (evTypes.indexOf(' ') !== -1) {
        var eventList = evTypes.split(' '),
                  len = eventList.length

        for (var i = 0; i < len; i++) {
          this.off(ele, eventList[i], cb)
        }
      }

      if (isDomEvent(ele, evTypes)) {
        this.removeEventListener(ele, evTypes, cb)
      } else {
				if (typeof this._listeners[evTypes] !== 'undefined') {
					var listeners = this._listeners[evTypes],
						n = listeners.length;
					for (; n >= 0; n--) {
						listeners[n] === cb && listeners.splice(n,1);
					}
				}
			}
		},
    // 事件触发
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

		},
    // 绑定DOM事件
    addEventListener: function(ele, evTypes, cb, useCapture) {
      useCapture = useCapture || false

      if (isW3C()) {
        ele.addEventListener(evTypes, cb, useCapture)
      } else {
        if(ele.attachEvent){
          ele.attachEvent('on' + evTypes, cb)
        }
        else{
          oldCallback = obj['on' + evTypes]

          obj['on' + evTypes] = function(){
            if(oldCallback) {
              oldCallback.apply(this, arguments)
            }
            return cb.apply(this, arguments)
          }
        }
      }
    },
    // 解除绑定DOM事件
    removeEventListener: function(ele, evTypes, cb, useCapture) {
      useCapture = useCapture || false

      if (isW3C()) {
        ele.removeEventListener(evTypes, cb, useCapture)
      } else {
        if(ele.detachEvent){
          ele.detachEvent('on' + evTypes, cb)
        }
        else{
          obj['on' + evTypes] = ''
        }
      }
    }
	}
  // 判断是否传统DOM事件
  var isDomEvent=function(obj,evtType){
    if(("on" + evtType).toLowerCase() in obj){
      return true
    } else { return false }
  }
  // 判断是否实现W3C标准的事件监听
  var isW3C = function() {
    return !!document.addEventListener
  }

	return new Cell()
});