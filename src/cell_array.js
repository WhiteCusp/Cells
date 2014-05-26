/*
 * 数组细胞 
 */
;(function (name, definition) {
	if (typeof define == 'function') {
		define(name,[],definition);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	} else {
		window[name] = definition;
	}
})('cell_array',function() {

	var ArrayProto = Array.prototype;

	function Cell() {};

	cellfn = Cell.prototype = {
		/**
		 * 合并数组。
		 * @param  {Array}  源数组
		 * @param  {Array}  源数组
		 * @return  {Array}  返回数组
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
		 * @param  {Array}  数组
		 * @return  {Array}  去重后数组
		 */
		distinct : function (arr) {
			var ret = [],
				len = arr.length;

			for ( var i = 0; i < len; i++ ){
				for( var j = i+1; j < len; j++ ){
					if( arr[i] === arr[j] ){
						j = ++i;
					}
				}
				ret.push(arr[i]);
			}

			return ret;
		},

		/**
		 * 返回数组中的最小值，用于数字数组
		 * @param  {Array}  数组
		 * @return  {Number}  返回值
		 */
		min : function (arr) {
			return Math.min.apply(0, arr);
		},

		/**
		 * 返回数组中的最大值，用于数字数组
		 * @param  {Array}  数组
		 * @return  {Number}  返回值
		 */
		max : function (arr) {
			//返回数组中的最大值，用于数字数组。
			return Math.max.apply(0, arr);
		},

		/**
		 * 返回数组中指定元素的索引
		 * @param  {Array}  数组
		 * @param  {item}  元素值
		 * @return  {Number}  指定元素的索引
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
		 * @param  {Array}  数组
		 * @param  {Number}  元素索引
		 * @return  {Array}  删除元素后的数组
		 */
		removeAt : function(arr, index) {
			if (arr.splice(index, 1).length === 1) {return true;}
			return false;
		},

		/**
		 * 根据值删除数组中的元素
		 * @param  {Array}  数组
		 * @param  {Array}  元素值
		 * @return  {Array}  删除元素后的数组
		 */
		remove : function(arr, value) {
			var index = this.indexOf(arr, value);
			if (index !== -1) {
				this.removeAt(arr, index);
				return true;
			}
			return false;
		},


		/**
		 * 清理数组中的空数据。
		 * @param  {Array}  数组
		 * @return  {Array}   数组
		 */
		clean : function (arr) {
			var result = [],
			empty = [undefined, null, ''];
			for (var i = 0, len = arr.length; i < len; i += 1) {
				if (!(A.findOut(empty, arr[i]).length)) {
					result.push(arr[i]);
				}
			}
			return result;
		}
	};

	return new Cell();
});