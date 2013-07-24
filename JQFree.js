(function(window){
	var _JQF = $ = function(str) {
		return new _JQF.fn.init(str);
	};

	_JQF.fn = _JQF.prototype = {
		init: function(str) {
			var elem = document.querySelectorAll(str);
			_JQF.merge(this,elem);
		},

		append: function(ele) {
			if (typeof ele==="string") {
				this[0].innerHTML += ele;
			} else if (ele instanceof _JQF) {
				for (var i = 0,len = ele.length; i < len; i++) {
					this[0].appendChild(ele[i]);
				}
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
				for (var i = 0,len = this.length; i < len; i++) {
					this[i].addEventListener(type,fn,false);
				}
			} else if (this[0].attachEvent) {
				for (var i = 0,len = this.length; i < len; i++) {
					this[i].addachEvent("on"+type,fn);
				}
			} else {
				for (var i = 0,len = this.length; i < len; i++) {
					this[i]["on" + type] = fn;
				}
			}
		},

		removeEvent: function(type, fn) {
			if (this[0].removeEventListener) {
				for (var i = 0,len = this.length; i < len; i++) {
					this[i].removeEventListener(type,fn,false);
				}
			} else if (this[0].attachEvent) {
				for (var i = 0,len = this.length; i < len; i++) {
					this[i].detachEvent("on"+type,fn);
				}
			} else {
				for (var i = 0,len = this.length; i < len; i++) {
					this[i]["on" + type] = null;
				}
			}
		},

		addClass: function(clsName) {
			try {
				if (typeof clsName !== "string" || !/^[a-zA-Z_]\w*$/.test(clsName)) {
					throw new Error("Not a correct className format!");
				}
			} catch (e) {
				console.log(e.message);
				return;
			}
			
			if (this[0].classList) {
				this[0].classList.add(clsName);
			} else {
				var origClass = this[0].className;
				var reg = new RegExp("\\b"+clsName+"\\b");
				if (!reg.test(origClass)) {
					this[0].className += (origClass.length==0 ? clsName : " " + clsName);
				} 
			}
		},

		removeClass: function(clsName) {
			try {
				if (typeof clsName !== "string" || !/^[a-zA-Z_]\w*$/.test(clsName)) {
					throw new Error("Not a correct className format!");
				}
			} catch (e) {
				console.log(e.message);
				return;
			}
			if (this[0].classList) {
				this[0].classList.remove(clsName);
			} else {
				var origClass = this[0].className;
				var reg = new RegExp("\\s"+clsName+"\\b\|\\b" + clsName + "\\s");
				origClass = origClass.replace(reg,"");
				this[0].className = origClass.replace(/\s{2,}/g," ");
			}
		}

	};
	_JQF.fn.init.prototype = _JQF.fn;

	_JQF.merge = function( first, second ) {
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
	};

	_JQF.createXHR = function() {
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		} else {
			var xmlVer = ["Microsoft.XMLHTTP", "MSXML2.XMLHTTP"];
			for (var i = xmlVer.length - 1; i >= 0; i--) {
				try {
					return new ActiveXObject(xmlVer[i]);
				} catch(e) {}
			};
		}
	};

	_JQF.ajax = function(type, url, callback,param) {
		var xhr = _JQF.createXHR(),
			encodeParams = [];
		for (var i = param.length - 1; i >= 0; i--) {
			encodeParams.push(encodeURIComponent(param[i].name) + "=" + encodeURIComponent(param[i].value));
		}
		encodeParams = encodeParams.join("&");

		if (type == "POST") {
			xhr.open(type, url, true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		} else {
			url += url.indexOf("?")==-1 ? ("?" + encodeParams) : ("&" + encodeParams);
			xhr.open(type, url, true);
			encodeParams = null;
		}

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					callback(xhr.responseText);
				}
			};
		};
		xhr.send(encodeParams);
	};

	_JQF.bind = function(fn, context) {
		return function() {
			fn.apply(context, arguments);
		}
	};
	
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
/*
var li = document.createElement("li");
console.log(li.__proto__===HTMLLIElement.prototype);
console.log(HTMLLIElement.prototype.__proto__===HTMLElement.prototype);
console.log(typeof HTMLLIElement);
console.log(typeof HTMLElement);
console.log(typeof li);
console.log(li instanceof HTMLLIElement);
console.log(li instanceof HTMLElement);
console.log(li instanceof Object);

console.log(li.constructor);//HTMLLIElement()
console.log(HTMLLIElement.constructor);//Object()
console.log(HTMLLIElement.prototype.constructor);//HTMLLIElement()
console.log(HTMLElement.constructor);//Object()
console.log(HTMLLIElement.__proto__===Object.prototype);//true*/