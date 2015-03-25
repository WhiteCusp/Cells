/*
 * �¼�ϸ�� 
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
    // �¼���
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
    // �¼������
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
    // �¼�����
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
    // ��DOM�¼�
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
    // �����DOM�¼�
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
  // �ж��Ƿ�ͳDOM�¼�
  var isDomEvent=function(obj,evtType){
    if(("on" + evtType).toLowerCase() in obj){
      return true
    } else { return false }
  }
  // �ж��Ƿ�ʵ��W3C��׼���¼�����
  var isW3C = function() {
    return !!document.addEventListener
  }

	return new Cell()
});