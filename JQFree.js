(function(window){
	var _JQF = $ = function(selector) {
		return new _JQF.fn.init(selector);
	};

	_JQF.fn = _JQF.prototype = {
		init: function(selector) {
			if (typeof selector === "string") {
				var elem = document.querySelectorAll(selector);
				$.merge(this,elem);
			} else if (selector.nodeType) {
				this[0] = selector;
				this.length = 1;
			};
		},

		append: function(ele) {
			if (typeof ele==="string") {
				this[0].innerHTML += ele;
			} else if (ele instanceof _JQF) {
				for (var i = 0,len = ele.length; i < len; i++) {
					this[0].appendChild(ele[i]);
				}
			} else if(ele.nodeType) {
				this[0].appendChild(ele);
			}
			return this;
		},

		prepend: function(ele) {
			if (typeof ele==="string") {
				this[0].innerHTML = ele + this[0].innerHTML;
			} else if (ele instanceof _JQF) {
				for (var i = 0,len = ele.length; i < len; i++) {
					this[0].insertBefore(ele[i],this[0].firstChild);
				}
			} else if(ele.nodeType) {
				this[0].insertBefore(ele,this[0].firstChild);
			}
			return this;
		},

		remove: function() {
			var parent = this[0].parentNode;
			for (var i = this.length - 1; i >= 0; i--) {
				parent.removeChild(this[i]);
			}
		},

		addEvent: function(type, fn) {
			if (this[0].addEventListener) {
				$.fn.addEvent = function(type, fn) {
					for (var i = 0,len = this.length; i < len; i++) {
						this[i].addEventListener(type,fn,false);
					}
				}
			} else if (this[0].attachEvent) {
				$.fn.addEvent = function(type, fn) {
					for (var i = 0,len = this.length; i < len; i++) {
						this[i].addachEvent("on"+type,fn);
					}
				}
			} else {
				$.fn.addEvent = function(type, fn) {
					for (var i = 0,len = this.length; i < len; i++) {
						this[i]["on" + type] = fn;
					}
				}
			}

			return $.fn.addEvent.call(this, type, fn);
		},

		removeEvent: function(type, fn) {
			if (this[0].removeEventListener) {
				$.fn.removeEvent = function(type, fn) {
					for (var i = 0,len = this.length; i < len; i++) {
						this[i].removeEventListener(type,fn,false);
					}
				}
			} else if (this[0].attachEvent) {
				$.fn.removeEvent = function(type, fn) {
					for (var i = 0,len = this.length; i < len; i++) {
						this[i].detachEvent("on"+type,fn);
					}
				}
			} else {
				$.fn.removeEvent = function(type, fn) {
					for (var i = 0,len = this.length; i < len; i++) {
						this[i]["on" + type] = null;
					}
				}
			}

			return $.fn.removeEvent.call(this, type, fn);
		},

		addClass: function(clsName) {
			if (this[0].classList) {
				$.fn.addClass = function(clsName) {
					try {
						if (typeof clsName !== "string" || !/^[a-zA-Z_]\w*$/.test(clsName)) {
							throw new Error("Not a correct className format!");
						}
					} catch (e) {
						console.log(e.message);
						return;
					}
					this[0].classList.add(clsName);
				}
			} else {
				$.fn.addClass = function(clsName) {
					try {
						if (typeof clsName !== "string" || !/^[a-zA-Z_]\w*$/.test(clsName)) {
							throw new Error("Not a correct className format!");
						}
					} catch (e) {
						console.log(e.message);
						return;
					}
					var origClass = this[0].className;
					var reg = new RegExp("\\b"+clsName+"\\b");
					if (!reg.test(origClass)) {
						this[0].className += (origClass.length==0 ? clsName : " " + clsName);
					} 
				}
			}

			return $.fn.addClass.call(this, clsName);
		},

		removeClass: function(clsName) {
			if (this[0].classList) {
				$.fn.removeClass = function(clsName) {
					try {
						if (typeof clsName !== "string" || !/^[a-zA-Z_]\w*$/.test(clsName)) {
							throw new Error("Not a correct className format!");
						}
					} catch (e) {
						console.log(e.message);
						return;
					}

					this[0].classList.remove(clsName);
				}
			} else {
				$.fn.removeClass = function(clsName) {
					try {
						if (typeof clsName !== "string" || !/^[a-zA-Z_]\w*$/.test(clsName)) {
							throw new Error("Not a correct className format!");
						}
					} catch (e) {
						console.log(e.message);
						return;
					}

					var origClass = this[0].className;
					var reg = new RegExp("\\s"+clsName+"\\b\|\\b" + clsName + "\\s");
					origClass = origClass.replace(reg,"");
					this[0].className = origClass.replace(/\s{2,}/g," ");
				}
			}

			return $.fn.removeClass.call(this, clsName);
		},

		attr: function(name, value) {
			this[0].setAttribute(name, value);
		},

		html: function(str) {
			this[0].innerHTML = str;
		},

		data: function(name, value) {
			if (!name) {return;};
			if (arguments.length === 1) {
				return this[0].dataset[name];
			} else {
				this[0].dataset[name] = value;
			}
		}

	};
	_JQF.fn.init.prototype = _JQF.fn;

	_JQF.extend = function(obj1, obj2) {
		for(prop in obj2) {
			if (obj2.hasOwnProperty(prop)) {
				obj1[prop] = obj2[prop];
			};
		}
	}

	$.extend(_JQF, {
		merge: function( first, second ) {
			var l = second.length,
				i = first.length || 0,
				j = 0;

			if ( typeof l === "number" ) {
				for ( ; j < l; j++ ) {
					first[ i++ ] = second[ j ];
				}
			} else {
				while ( second[j] !== undefined ) {
					first[ i++ ] = second[ j++ ];
				}
			}

			first.length = i;

			return first;
		},

		createXHR: function() {
			if (typeof XMLHttpRequest !== "undefined") {
				$.createXHR = function() {
					return new XMLHttpRequest();
				}
			} else {
				$.createXHR = function() {
					var xmlVer = ["Microsoft.XMLHTTP", "MSXML2.XMLHTTP"];
					for (var i = xmlVer.length - 1; i >= 0; i--) {
						try {
							return new ActiveXObject(xmlVer[i]);
						} catch(e) {}
					};
				}
			}

			return $.createXHR();
		},

		ajax: function(type, url, callback,param) {
			var xhr = _JQF.createXHR(),
				encodeParams = [];
			if (param) {
				for (var i = param.length - 1; i >= 0; i--) {
					encodeParams.push(encodeURIComponent(param[i].name) + "=" + encodeURIComponent(param[i].value));
				}
				encodeParams = encodeParams.join("&");
			};

			if (type == "POST") {
				xhr.open(type, url, true);
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			} else {
				if (param) {
					url += url.indexOf("?")==-1 ? ("?" + encodeParams) : ("&" + encodeParams);
				} else {
					encodeParams = null;
				}
				xhr.open(type, url, true);
			}

			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						callback(xhr.responseText);
					}
				};
			};
			xhr.send(encodeParams);
		},

		bind: function(fn, context) {
			return function() {
				fn.apply(context, arguments);
			}
		}
	});

	var _core = {};
	_core.Browser = new function() {
		var _regConfig = {
			Chrome: {
				Reg: /.*(chrome)\/([\w.]+).*/,
				Core: "Webkit"
			},
			Firefox: {
				Reg: /.*(firefox)\/([\w.]+).*/,
				Core: "Moz"
			},
			Opera: {
				Reg: /(opera).+version\/([\w.]+)/,
				Core: "O"
			},
			Safari: {
				Reg: /.*version\/([\w.]+).*(safari).*/,
				Core: "Webkit"
			},
			Ie: {
				Reg: /.*(msie) ([\w.]+).*/,
				Core: "Ms"
			}
		}, 
		_userAgent = navigator.userAgent.toLowerCase();
		this.getDetail = function() {
			for (var _o in _regConfig) {
				var _result = _regConfig[_o].Reg.exec(_userAgent);
				if (_result != null) {
					return {
						Browser: _result[1] || "",
						Version: _result[2] || "0",
						Core: _regConfig[_o].Core
					};
				}
			}
			return {
				Browser: "UNKNOWN",
				Version: "UNKNOWN",
				Core: "UNKNOWN"
			};
		};
		this.isChrome = function() {
			return _regConfig.Chrome.Reg.test(_userAgent);
		};
		this.isFirefox = function() {
			return _regConfig.Firefox.Reg.test(_userAgent);
		};
		this.isOpera = function() {
			return _regConfig.Opera.Reg.test(_userAgent);
		};
		this.isSafari = function() {
			return _regConfig.Safari.Reg.test(_userAgent);
		};
		this.isIe = function() {
			return _regConfig.Ie.Reg.test(_userAgent);
		};
		this.isIPad = function() {
			return (/ipad/).test(_userAgent);
		};
	};

	window.JQF = window.$ = _JQF;
	window.core = _core;
})(window)
