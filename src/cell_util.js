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

    // 返回文档的顶部滚动高度
    scrollTop: function() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    },

    // 返回元素相对于文档的偏移值
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

    // 修正IE上的事件对象
    fixEvent: function(ev) {
      //ie 6 7 8不存在target、pageX、pageY
      ev.target = ev.srcElement || ev.target; 
      ev.pageX = ev.x || ev.pageX;
      ev.pageY = ev.y || ev.pageY;
    },

    // 返回包含一个对象的所有属性名的数组
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

    // 拓展一个对象
    extend: function(obj1, obj2) {
      for (var prop in obj2) {
        if (obj2.hasOwnProperty(prop)) {
          obj1[prop] = obj2[prop];
        }
      }
    },

    // 去除一个字符串左右两边的空格（不包含字符串中间的空格）
    trim: function(str) {
      if (String.prototype.trim) {
        return str.trim();
      }

      return str.replace(/^\s+|\s+$/g, '');
      // return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },

    // 将函数绑定到一个指定的上下文中
    bind: function(fn, context) {
      var args, bound;
      args = Array.prototype.slice.call(arguments, 2);
      
      return bound = function() {
        return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
      };
    },

    // 返回一个介于min和max之间的整型随机数
    // 使用 Math.round() 会返回一个不均匀的随机数分布
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // HTML特殊字符转义
    escape : function(str) {
      var _escapseMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };

      return str.replace(/[<>&"]/g, function(match){
        return this._escapseMap[match];
      });
    },

    platform : function() {
      var ua = navigator.userAgent;
      var platform = {};

      // return the IE version or -1
      function getIeVersion(){
          var retVal = -1,
              ua, re;
          if(navigator.appName === 'Microsoft Internet Explorer'){
              ua = navigator.userAgent;
              re = new RegExp('MSIE ([0-9]{1,})');
              if(re.exec(ua) !== null){
                  retVal = parseInt(RegExp.$1);
              }
          }
          return retVal;
      }

      platform.ieVersion = getIeVersion();
      platform.ie = platform.ieVersion !== -1;
      platform.android = ua.match(/Android/i) === null ? false : true;
      platform.iPhone = ua.match(/iPhone/i) === null ? false : true;
      platform.iPad = ua.match(/iPad/i) === null ? false : true;
      platform.iPod = ua.match(/iPod/i) === null ? false : true;
      platform.winPhone = ua.match(/Windows Phone/i) === null ? false : true;
      platform.IOS = platform.iPad || platform.iPhone;
      platform.touchDevice = "ontouchstart" in window;

      return platform;
    }
    
  };

  return new Cell();
});