/*
 * 数组细胞 
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else {
		window['cell'] = window.cell || {};
		window['cell'][name] = definition();
	}
})('array',function() {

	"use strict"

	var ArrayProto = Array.prototype;

	function Cell() {};

	var cellfn = Cell.prototype = {
		/**
		 * 合并数组。
		 * @param  {Array} arr1 源数组
		 * @param  {Array} arr2 源数组
		 * @return  {Array}  合并后的数组
		 * @method merge
		 */
		merge : function(arr1, arr2) {
			var i = arr1.length,
				j = arr2.length,
				n = 0;

			for (; n < j; n++) {
				arr1[i++] = arr2[n];
			}

			return arr1;
		},

		/**
		 * 数组去重(遍历法)
		 * @param  {Array} arr 数组
		 * @return  {Array} 去重后数组
		 * @method unique 
		 */
		unique : function (arr) {
			var ret = []

			for ( var i = arr.length - 1; i >= 0; i-- ){
				for( var j = i-1; j >= 0; j-- ){
					if( arr[i] === arr[j] ){
						j = --i;
					}
				}
				ret.unshift(arr[i]);
			}

			return ret;
		},

		/**
		 * 返回数组中的最小值，用于数字数组
		 * @param  {Array} arr 数组
		 * @return  {Number} 数组中的最小值
		 * @method min
		 */
		min : function (arr) {
			return Math.min.apply(0, arr);
		},

		/**
		 * 返回数组中的最大值，用于数字数组
		 * @param  {Array} arr 数组
		 * @return  {Number} 数组中的最大值
		 * @method max
		 */
		max : function (arr) {
			//返回数组中的最大值，用于数字数组。
			return Math.max.apply(0, arr);
		},

		/**
		 * 返回数组中的随机项，用于数字数组
		 * @param  {Array} arr 数组
		 * @return  {Number} 数组中的随机项
		 * @method randomItem
		 */
		randomItem: function(arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		},

		/**
		 * 返回数组中指定元素的索引
		 * @param  {Array} arr 数组
		 * @param  {item} value 元素值
		 * @return  {Number} 指定元素的索引
		 * @method indexOf
		 */
		indexOf : function (arr, value) {
			if (ArrayProto.indexOf) {
				return ArrayProto.indexOf.call(arr,value);
			}

			var index = -1,
				len = arr.length;

			for (var i = 0; i < len; i++) {
				if (arr[i] === value) {
					index = i;
					break;
				}
			}

			return index;
		},

		/**
		 * 删除数组中指定索引的元素
		 * @param  {Array} arr 数组
		 * @param  {Number} index 元素索引
		 * @return  {Array}  删除指定元素后的数组
		 * @method removeAt
		 */
		removeAt : function(arr, index) {
			if (arr.splice(index - 1, 1).length === 1) {return true;}
			return false;
		},

		/**
		 * 根据值删除数组中的元素
		 * @param  {Array}  数组
		 * @param  {?}  元素值
		 * @return  {Array}  删除指定元素后的数组
		 * @method remove
		 */
		remove : function(arr, value) {
			for (var len = arr.length - 1; len >= 0; len--) {
				arr[len] === value && arr.splice(len, 1)
			}
		},


		/**
		 * 去除数组中的空数据。
		 * @param  {Array} arr 数组
		 * @return  {Array}  去除空元素后的数组
		 * @method clean
		 */
		clean : function (arr) {
			var result = [],
			empty = [undefined, null, ''];
			for (var i = 0, len = arr.length; i < len; i += 1) {
				if (this.indexOf(empty, arr[i]) === -1) {
					result.push(arr[i]);
				}
			}
			return result;
		},

		/**
		 * 打乱一个数组（此方法返回的数组分布不均匀）
		 * @param  {Array} arr 数组
		 * @return  {Array}  顺序打乱后的数组
		 * @method clean
		 */
		shuffle : function(arr) {
			return arr.sort(function(){ return Math.random() - 0.5});
		}
	};

	return new Cell();
});