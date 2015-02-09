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

		on : function(ele, types, fn) {
			if (ele.length) {};
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

	var customEvent = {
		tap:function(ele,handler){
      //按下松开之间的移动距离小于20，认为发生了tap
      var TAP_DISTANCE = 20;
      //双击之间最大耗时
      var DOUBLE_TAP_TIME = 300;
      var pt_pos;
      var ct_pos;
      var pt_up_pos;
      var pt_up_time;
      var evtType;
      var startEvtHandler = function(e){
        // e.stopPropagation();
        var touches = e.touches;
        if(!touches || touches.length == 1){//鼠标点击或者单指点击
          ct_pos = pt_pos = getTouchPos(e);
        }
      }
      var moveEvtHandler = function(e){
        // e.stopPropagation();
        e.preventDefault();
        ct_pos = getTouchPos(e);
      }
      var endEvtHandler = function(e){
          // e.stopPropagation();
          var now = Date.now(); 
          var dist = getDist(ct_pos , pt_pos);
          var up_dist = getDist(ct_pos , pt_up_pos);

          if(dist < TAP_DISTANCE){
              if(pt_up_time && now - pt_up_time < DOUBLE_TAP_TIME && up_dist < TAP_DISTANCE){
                  evtType = "doubletap";
              }
              else{
                  evtType = "tap";
              }
              handler.call(ele,{
                  target:e.target,
                  oriEvt:e,
                  type:evtType
              });
          }
          pt_up_pos = ct_pos;
          pt_up_time = now;
      }
  
      ele.on(startEvt,startEvtHandler);
      ele.on(moveEvt,moveEvtHandler);
      ele.on(endEvt,endEvtHandler);

      var evtOpt = {
        ele:ele,
        evtType:"tap",
        handler:handler
      }
      evtOpt.actions = {};
      evtOpt.actions[startEvt] = startEvtHandler;
      evtOpt.actions[moveEvt] = moveEvtHandler;
      evtOpt.actions[endEvt] = endEvtHandler;

      customEventHandlers.push(evtOpt);
	      
	  }
	}

	return new Cell();
});