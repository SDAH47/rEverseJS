/**
 * rEverseJS JavaScript Library.
 * Written by SD Asif Hossein on 24 January 2020, Friday at 7:14 PM.
 *
 * Released under ______ license.
 *
 * @author SD Asif Hossein
 * @version 1.0.1
 */

/* IF ANYBODY READING THIS FILE KINDLY REQUESTED TO NOT TO MODIFY ANYTHING. THANK YOU. */

/* Catching the whole environment under strict. */

'use strict';

( function( global, factory ) {
	// For CommonJS or Node.js environments.
	
	typeof exports === 'object' && module != undefined ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define( factory() ) :
			global.rEverse = factory();
} )( window != undefined ? window : this, function() {
	
	// Storing important snippets properties which will be comprehensively used.
	// In purpose to use the prototyped methods of a certain element.
	
	var RJS = {
		// To call the original belonging toString() method of a certain object.
		toString: {}.toString,
		
		// Array slice() prototype.
		slice: [].slice,
		
		// Array splice() prototype.
		splice: [].splice,
		
		// Array push() prototype.
		push: [].push,
		
		// Array indexOf() prototype.
		indexOf: [].indexOf,
		
		// Object hasOwnProperty prototype.
		hasOwnProperty: {}.hasOwnProperty,
		
		// Transforms a function source to pure string.
		fnToString: hasOwnProperty.toString
	};
	
	// Function Overloaders.
	// Inspired from MooTools.
	
	/**
	 * Function.prototype.standardSetter() creates a standard JavaScript function setter, which allows to set
	 * values with keys dynamically.
	 *
	 * @param {Boolean} usePlural
	 * @returns {Function}
	 */
	
	Function.prototype.standardSetter = function( usePlural ) {
		var self = this;
		
		// Returning a standard setter function for this function.
		return function __standardSetter( key, value ) {
			// If 'key' is not defined or null, terminate the setter.
			if( key == null )
				return self;
			
			// Condition: If any object is passed in setter.
			// If the key is a string and usePlural is true, enumerate between the key string and set it.
			if( usePlural === true || typeof key !== 'string' ) {
				var name;
				
				for( name in key )
					self.call( this, name, key[ name ] );
			} else self.call( this, key, value );
			
			return self;
		};
	};
	
	/**
	 * Function.prototype.standardSetter() creates a standard JavaScript function getter, which allows to get
	 * values with keys dynamically.
	 *
	 * @param {Boolean} usePlural
	 * @returns {anyType}
	 */
	
	Function.prototype.standardGetter = function( usePlural ) {
		var self = this;
		
		// Returning a standard getter.
		return function __standardGetter( key ) {
			// Terminate the getter if 'key' is null or undefined.
			if( key == null )
				return self;
			
			var target = null,
			    self_t = this,
			    result;
			
			if( typeof key !== 'string' )
				target = RJS.slice.call( key );
			else if( arguments.length > 1 )
				target = RJS.slice.call( arguments );
			
			// For all time dynamic getter.
			else if( usePlural === true )
				target = [ key ];
			
			if( target != null ) {
				result = {};
				
				target.forEach( function( k ) {
					result[ k ] = self.call( self_t, k );
				} );
			} else result = self.call( this, key );
			
			return result;
		};
	};
	
	/**
	 * Function.prototype.implement() is an overloaded prototype setter, which allows to add any prototype member
	 * to any JavaScript constructor.
	 *
	 * @param {String} key
	 * @param {anyType} value
	 * @returns {Function}
	 */
	
	Function.prototype.implement = function __implement( key, value ) {
		// If the constructor is a sub-class/sub-constructor of any class and has a overridable implementation, 
		// add the superclass implementation to this.super object and override it.
		if( typeof this.prototype.super === 'function' && this.prototype[ key ] != null ) {
			this.prototype.super[ key ] = this.prototype[ key ];
			
			// Adding it to the stack.
			this.prototype.super.superStack.push( key );
		}
		
		// Setting all the method and properties non-enumerable.
		Object.defineProperty( this.prototype, key, { enumerable: false, value: value } );
	}.standardSetter();
	
	/**
	 * Function.prototype.static() is an overloaded static scope setter, which allows to add any static member
	 * to any JavaScript constructor assuming it as an object.
	 *
	 * @param {String} key
	 * @param {anyType} value
	 * @returns {Function}
	 */
	
	Function.prototype.static = function __static( key, value ) {
		this[ key ] = value;
	}.standardSetter();
	
	// ***** OBJECT IMPLEMENTATION *****
	
	// Private functions.
	
	function deepClone( item ) {
		return Object.isObject( item ) ?
			Array.isArray( item ) && item.clone( true ) || Object.clone( item, true ) : item;
	}
	
	// Iterates through every keys (Enumerable or Non-Enumerable) of an object.
	
	function crazyForEach( object, callback, context ) {
		Object.getOwnPropertyNames( object ).forEach( callback, context || object );
		
		return object;
	}
	
	// Fills absent properties to any prototype.
	
	function polyfill( proto, name, value ) {
		if( Object.isSimpleObject( name ) ) {
			for( var N in name ) {
				if( !proto[ N ] )
					proto[ N ] = name[ N ];
			}
		} else proto[ name ] = value;
	}
	
	Object.static( {
		/**
		 * Object.isObject() checks whether the given items are object or not.
		 *
		 * @returns {Boolean}
		 */
		
		isObject: function __isObject() {
			for( var i = 0; i < arguments.length; i++ ) {
				if( arguments[ i ] == null || typeof arguments[ i ] !== 'object' )
					return false;
			}
			
			return arguments.length !== 0;
		},
		
		/**
		 * Array is an object. Object.isSimpleObject() ensures the given item is not an array but an object.
		 *
		 * @returns {Boolean}
		 */
		
		isSimpleObject: function __isSimpleObject() {
			for( var i = 0; i < arguments.length; i++ ) {
				if( !Object.isObject( arguments[ i ] ) || Array.isArray( arguments[ i ] ) )
					return false;
			}
			
			return arguments.length !== 0;
		},
		
		/**
		 * Clones a plain object.
		 *
		 * @param {Boolean} deep
		 */
		
		clone: function __cloneObject( object, deep ) {
			var clonedObject = {};
			
			crazyForEach( object, function( key ) {
				var desc = Object.getOwnPropertyDescriptor( object, key );
				
				if( deep === true ) 
					desc.value = deepClone( desc.value );
				
				Object.defineProperty( clonedObject, key, desc );
			} );
			
			// Returning the cloned object.
			return clonedObject;
		},
		
		/**
		 * The objects created through {} or 'new Object()' are plain objects. Object.isPlain() detects
		 * plain objects.
		 *
		 * @returns {Boolean}
		 */
		
		isPlain: function __isPlain() {
			if( arguments.length === 1 ) {
				var object = arguments[ 0 ];
				
				if( !Object.isSimpleObject( object ) )
					return false;
					
				// Checking of the prototypes of 'object'. If has one, then it's not a plain object.
				var prototypes = Object.getPrototypeOf( object );
				
				if( !prototypes )
					return true;
				
				// Constructor.
				var _constructor = RJS.hasOwnProperty.call( prototypes, 'constructor' ) && prototypes.constructor;
				
				return Function.isFunction( _constructor ) && _constructor === Object;
			}
			
			for( var i = 0; i < arguments.length; i++ ) {
				if( !Object.isPlain( arguments[ i ] ) )
					return false;
			}
			
			return arguments.length !== 0;
		},
		
		/**
		 * Clears an object by saving the object reference.
		 * 
		 * Note: Use it if you need to maintain the references of other variables. Else use 'variable = {}' to empty
		 * an object.
		 *
		 * @param {Object} object
		 * @returns {Object}
		 */
		
		empty: function( object ) {
			crazyForEach( object, function( key ) {
				delete this[ key ];
			} );
			
			return object;
		},
		
		/**
		 * Counts the number of properties in a object.
		 *
		 * @param {Object} object
		 * @returns {Number}
		 */
		
		count: function __count( object ) {
			return Number( Object.isObject( object ) ) && Object.getOwnPropertyNames( object ).length;
		},
		
		/**
		 * Enumerates through each of the enumerable properties of an object.
		 *
		 * Object.forEach( myObject, function( key, value, obj ) {}, bind );
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Object}
		 */
		
		forEach: function __forEachObject( object, callback, context ) {
			for( var key in object ) 
				callback.call( context, object[ key ], key, object );
			
			return object;
		},
		
		/**
		 * Performs a reduce operation in a certain object.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @param {anyType} initialValue
		 * @returns {anyType}
		 */
		
		reduce: function __reduce( object, callback, initialValue ) {
			if( !Object.isSimpleObject( object ) )
				throw new TypeError( 'Object.reduce(object, ..., ...): The provided target is not an object or null/undefined.' );
			
			// Throwing an error, if no callback is provided.
			if( !Function.isFunction( callback ) )
				throw new TypeError( 'Object.reduce(..., callback, ...): Expecting the second parameter to be a Function, "' + typeof callback + '" given.' );
			
			// All the keys (Enumerable, Non-Enumerable).
			var keys = Object.getOwnPropertyNames( object ),
			
			// If 'initialValue' is not defined or null, start with the value determined by the first key.
			accumulator = initialValue != null ? initialValue : object[ keys.shift() ];
			
			keys.forEach( function( key ) {
				accumulator = callback( accumulator, this[ key ], key, this );
			}, object );
			
			return accumulator;
		},
		
		/**
		 * Identifies the proper key of a certain value of an object.
		 *
		 * @param {Object} object
		 * @param {anyType} value
		 * @returns {String | null}
		 */
		
		keyOf: function __keyOf( object, value ) {
			if( !Object.isSimpleObject( object ) )
				throw new TypeError( 'Object.keyOf(object, ..., ...): The provided target is not an object or null/undefined.' );
			
			var keys = Object.getOwnPropertyNames( object ), i = 0;
			
			for( ; i < keys.length; i++ )
				if( object[ keys[ i ] ] === value )
					return keys[ i ];
			
			// Return null as key.
			return null;
		},
		
		/**
		 * Returns an array containing a random key and it's value.
		 *
		 * @param {Object} object
		 * @returns {Array}
		 */
		
		random: function __randomObject( object ) {
			// Creating an array of with a random 'object' key.
			var rand = [ Object.getOwnPropertyNames( object ).random() ];
			
			rand.push( object[ rand.first() ] );
			
			return rand;
		},
		
		/**
		 * Checks whether the object contains the provided value.
		 *
		 * @param {Object} object
		 * @param {anyType} value
		 * @returns {Boolean}
		 */
		
		includes: function __includesObject( object, value ) {
			// If multiple items are passed as an array to the 'value' parameter, iterate it.
			if( Array.isArray( value ) ) {
				for( var i = 0; i < value.length; i++ ) {
					if( !Object.includes( object, value[ i ] ) )
						return false;
				}
				
				return value.length !== 0;
			}
			
			return this.keyOf( object, value ) != null;
		},
		
		/**
		 * Creates a conditional mapping sequence and returns the mapped object.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Object}
		 */
		
		map: function __map( object, callback, context ) {
			if( !Object.isSimpleObject( object ) )
				throw new TypeError( 'Object.map(object, ..., ...): The provided target is not an object or null/undefined.' );
			
			callback = callback || function() {};
			 context = context  || {};
			
			// A object to map.
			var mappedObject = {};
			
			crazyForEach( object, function( key ) {
				mappedObject[ key ] = callback.call( context, this[ key ], key, object );
			} );
			
			return mappedObject;
		},
		
		/**
		 * Returns a string concatenating the object values with a specific knot.
		 *
		 * @param {Object} object
		 * @param {String} knot
		 * @returns {String}
		 */
		
		join: function __join( object, knot ) {
			if( !Object.isSimpleObject( object ) )
				throw new TypeError( 'Object.join(object, ...): The provided target is not an object or null/undefined.' );
			
			return Object.values( object ).join( knot );
		},
		
		/**
		 * Trims an object by modifying it removing null or undefined values.
		 *
		 * @param {Object} object
		 * @returns {object}
		 */
		
		trim: function __trimObject( object ) {
			return Object.filter( object, function( item ) {
				return item != null;
			} );
		},
		
		/**
		 * Creates a query string taking up values of the provided object.
		 *
		 * Note: Only enumerable values are used to create the query string.
		 *
		 * Inspired from MooTools.
		 *
		 * @param {Object | Array} obj
		 * @param {String} base
		 * @param {String} URL
		 * @returns {String}
		 */
		
		toQueryString: function __toQueryString( obj, base, URL ) {
			if( obj == null )
				throw new TypeError( 'Object.map(obj, ..., ...): No target object/array defined or null.' );
			
			var queryData = [];
			
			Object.forEach( obj, function( value, key ) {
				key = base ? base + '[' + key + ']' : key;
				
				queryData.push( Object.isObject( value ) ? Object.toQueryString( value, key ) : key + '=' + encodeURIComponent( value ) );
			} );
			
			queryData = queryData.join( '&' );
			
			return URL ? URL + '?' + queryData : queryData;
		},
		
		/**
		 * Fetches values from a certain object with the provided keys.
		 *
		 * @param {Object} object
		 * @param {Array} keys
		 * @returns {Object}
		 */
		
		fetch: function __fetch( object, keys ) {
			var modObj = {};
			
			keys.forEach( function( key ) {
				if( key in object )
					modObj[ key ] = object[ key ];
			} );
			
			return modObj;
		},
		
		/**
		 * Returns all the values provided objects, having the same name.
		 * 
		 * @param {String} name 
		 * @returns {Array}
		 */
		
		pluck: function __pluck( name ) {
			// If the 'name' parameter is not a string, throw a TypeError.
			if( !String.isString( name ) ) 
				throw new TypeError( 'Object.pluck(name): Provided "name" should be a string.' );
			
			var plucked = [], temp;
			
			for( var i = 1; i < arguments.length; i++ ) {
				temp = arguments[ i ];
				
				if( Object.isObject( temp ) && temp[ name ] != null ) 
					plucked.push( temp[ name ] );
			}
			
			return plucked;
		},
		
		/**
		 * Identifies the common keys of the provided objects and returns it as an array.
		 * 
		 * Note: Non-Enumerable properties are included.
		 * 
		 * @returns {Array}
		 */
		
		common: function __common() {
			var args = Array.toArray( arguments ),
			   index = 0, lowestCount = Object.count( args[ index ] ), i = 0, temp;
			
			var common = [];
			
			// Finding out the smallest object among them.
			for( ; i < args.length; i++ ) {
				if( ( temp = Object.count( args[ i ] ) ) === 0 ) 
					return common;
				
				if( temp < lowestCount ) {
					index = i;
					lowestCount = temp;
				}
			}
			
			common = Object.getOwnPropertyNames( args.splice( index, 1 )[ 0 ] );
			
			var target;
			
			for( i = 0; i < args.length; i++ ) {
				target = args[ i ];
			
				// If there is a key which is not found in all the objects won't be common.
				common.forEach( function( key, idx ) {
					if( !( key in target ) ) 
						this.remove( idx );
				} );
			}
			
			return common;
		},
		
		/**
		 * Filters the provided object.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Object}
		 */
		
		filter: function __filter( object, callback, context ) {
			if( object == null )
				throw new TypeError( 'Object.filter(object, ..., ...): The provided target is not an object or null/undefined.' );
			
			callback = callback || function() {};
			 context = context  || {};
			
			var filteredObject = {};
			
			crazyForEach( object, function( key ) {
				if( callback.call( context, this[ key ], key, object ) )
					filteredObject[ key ] = this[ key ];
			} );
			
			return filteredObject;
		},
		
		/**
		 * Works opposite of Object.filter().
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Object}
		 */
		
		reject: function __rejectObject( object, callback, context ) {
			if( object == null )
				throw new TypeError( 'Object.reject(object, ..., ...): The provided target is not an object or null/undefined.' );
			
			callback = callback || function() {};
			 context = context  || {};
			 
			var rejectedObject = {};
			
			crazyForEach( object, function( key ) {
				if( !callback.call( context, this[ key ], key, object ) )
					rejectedObject[ key ] = this[ key ];
			} );
			
			return rejectedObject;
		},
		
		/**
		 * Returns 'true', if all the elements present in a certain object satisfies the provided callback.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Boolean}
		 */
		
		every: function __every( object, callback, context ) {
			if( object == null )
				throw new TypeError( 'Object.every(object, ..., ...): The provided target is not an object or null/undefined.' );
			
			// Parameter fix.
			callback = callback || function() {};
			 context = context  || {};
			
			var keys = Object.getOwnPropertyNames( object ), i = 0;
			
			for( ; i < keys.length; i++ )
				if( !callback.call( context, object[ keys[ i ] ], keys[ i ], object ) )
					return false;
			
			return true;
		},
		
		/**
		 * Returns 'true' if any element present in the object satisfies the provided callback.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Boolean}
		 */
		
		some: function __some( object, callback, context ) {
			if( object == null )
				throw new TypeError( 'Object.some(object, ..., ...): The provided target is not an object or null/undefined.' );
			
			// Same thing over here.
			callback = callback || function() {};
			 context = context  || {};
			
			var keys = Object.getOwnPropertyNames( object ), i = 0;
			
			for( ; i < keys.length; i++ )
				if( callback.call( context, object[ keys[ i ] ], keys[ i ], object ) )
					return true;
					 
			return false;
		},
		
		/**
		 * Object.isEmpty() ensures an empty object.
		 *
		 * @param {Object} object
		 */
		
		isEmpty: function __isEmptyObject( object ) {
			return Object.isSimpleObject( object ) && Array.isEmpty( Object.getOwnPropertyNames( object ) );
		},
		
		/**
		 * Appends all the argument objects value to original object.
		 *
		 * Note: Does changes to the original object.
		 *
		 * @param {Object} original
		 * @returns {Object}
		 */
		
		append: function __appendObject( original ) {
			var obj;
			
			for( var i = 1; i < arguments.length; i++ ) {
				obj = arguments[ i ];
				
				if( !Object.isObject( obj ) )
					break;
				
				crazyForEach( obj, function( key ) {
					if( !( key in original ) )
						original[ key ] = this[ key ];
				} );
			}
			
			return arguments.length !== 0 ? original : {};
		},
	} );
	
	// Polyfill Object Statics.
	polyfill( Object, {
		/**
		 * Deep merges between objects.
		 *
		 * @param {Object} original
		 * @returns {Object}
		 */
		
		assign: function __assign( original ) {
			var item;
			
			for( var i = 1; i < arguments.length; i++ ) {
				item = arguments[ i ];
			
				if( Object.isSimpleObject( item ) ) {
					for( var name in item ) 
						original[ name ] = Object.isSimpleObject( original[ name ], item[ name ] ) ? Object.assign( original[ name ], item[ name ] ) : item[ name ];
				}
			}
			
			return arguments.length !== 0 ? original : {};
		},
		
		/**
		 * Strictly compares between objects.
		 *
		 * @param {Object} obj_a
		 * @param {Object} obj_b
		 * @returns {Boolean}
		 */
		
		is: function __isObject( obj_a, obj_b ) {
			return obj_a === obj_b;
		},
		
		/**
		 * Returns a [ key, value ] entries as an array;
		 *
		 * @param {Object} target
		 */
		
		entries: function __entriesObject( target ) {
			var ent = [];
			
			for( var key in target )
				ent.push( [ key, target[ key ] ] );
			
			return ent;
		},
		
		/**
		 * Creates a new object from iterable entries full of key - value pairs.
		 *
		 * @param {Array | Map | Set} entries
		 */
		
		fromEntries: function __fromEntries( entries ) {
			var obj = {};
			
			entries.forEach( function( value, key ) {
				obj[ key ] = value;
			} );
			
			return obj;
		},
		
		/**
		 * Returns all the enumerable values of an object as an array.
		 *
		 * @param {Object} target
		 */
		
		values: function __valuesObject( target ) {
			var arr = [];
			
			// Enumerable values only.
			for( var key in target )
				arr.push( target[ key ] );
			
			return arr;
		},
		
		/**
		 * Returns an object holding all the property descriptors.
		 * 
		 * @param {Object} obj 
		 * @returns {Object}
		 */
		
		getOwnPropertyDescriptors: function __getOwnPropertyDescriptors( obj ) {
			var desc = {};
			
			// Every enumerable/non-enumerable keys.
			crazyForEach( obj, function( key ) {
				desc[ key ] = Object.getOwnPropertyDescriptor( this, key );
			} );
			
			return desc;
		},
		
		getOwnPropertySymbols: function __getOwnPropertySymbols() {
			// Note:- IE 11 doesn't support property symboling. So, leaving this blank.
		}
	} );
	
	// ***** ARRAY IMPLEMENTATIONS *****
	
	Array.implement( {
		/**
		 * Removes a number of elements from a certain array.
		 *
		 * [].splice(..., ...) does remove elements. But the major difference between [].remove() and [].splice()
		 * is [].splice() returns the spliced elements as an array.
		 *
		 * @param {Number | Array} index Passing an array will remove multiple elements.
		 * @param {Number} quantity
		 * @returns {Array}
		 */
		
		remove: function __removeArray( index, quantity ) {
			if( Array.isArray( index ) ) {
				// Removing from the very last index.
				index.sort().reverse().forEach( function( idx ) {
					this.remove( idx, 1 );
				}, this );
			} else this.splice( index, quantity || 1 );
			
			return this;
		},
		
		/**
		 * Removes the provided items from the array.
		 *
		 * @returns {Array}
		 */
		
		removeItem: function __removeItemArray() {
			Object.forEach( arguments, function( item ) {
				if( this.includes( item ) )
					this.remove( this.indexOf( item ), 1 );
			}, this );
			
			return this;
		},
		
		/**
		 * Returns the unique version of original (this) array. All the elements are unique.
		 *
		 * @returns {Array}
		 */
		
		unique: function __unique() {
			// Will be returning a new array.
			var uniques = [];
			
			this.forEach( function( item ) {
				this.add( item );
			}, uniques );
			
			return uniques;
		},
		
		/**
		 * Works opposite of Array.prototype.filter().
		 *
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Array}
		 */
		
		reject: function __rejectArray( callback, context ) {
			// If no callback defined, throw a TypeError.
			if( callback == null )
				throw new TypeError( 'Array.prototype.reject(callback, ...): Expecting the first parameter to be a function, "' + typeof callback + '" given.' );
			
			var rejected = [];
			
			this.forEach( function( item, index ) {
				if( !callback.call( context, item, index, this ) )
					rejected.push( item );
			} );
			
			return rejected;
		},
		
		/**
		 * Returns the first element of the array.
		 *
		 * @returns {anyType}
		 */
		
		first: function __firstArray() {
			return this.length !== 0 ? this[ 0 ] : null;
		},
		
		/**
		 * Returns the last element of the array.
		 *
		 * @returns {anyType}
		 */
		
		last: function __lastArray() {
			return this.length !== 0 ? this[ this.length - 1 ] : null;
		},
		
		/**
		 * Includes the provided item if the original array (this) doesn't have those.
		 *
		 * @returns {Array}
		 */
		
		add: function __addArray() {
			Object.forEach( arguments, function( item ) {
				// If the original (this) array doesn't have the item, push it.
				if( !this.includes( item ) )
					this.push( item );
			}, this );
			
			return this;
		},
		
		/**
		 * Clears an array.
		 *
		 * @returns {Array}
		 */
		
		empty: function __emptyArray() {
			// Changing the length affects the element(s).
			this.length = 0;
			
			return this;
		},
		
		/**
		 * Trims an array (Deleting null and undefined values).
		 */
		
		trim: function __trimArray() {
			return this.filter( function( item ) {
				return item != null;
			} );
		},
		
		/**
		 * Creates an object with the provided associative keys and original (this) array's values.
		 *
		 * @param {Array} keys
		 * @returns {Object}
		 */
		
		associate: function __associateArray( keys ) {
			var associative = {},
				len = Math.min( this.length, keys.length ),
				  i = 0;
			
			for( ; i < len; i++  )
				associative[ keys[ i ] ] = this[ i ];
			
			return associative;
		},
		
		/**
		 * Removes the first occurrence of a certain element in array.
		 * 
		 * Note: The function returns true, if it successfully removes the element. Otherwise false.
		 * 
		 * @param {anyType} item 
		 * @returns {Boolean}
		 */
		
		removeFirstOccurrence: function __removeFirstOccurrence( item ) {
			for( var i = 0; i < this.length; i++ ) {
				if( this[ i ] === item ) {
					this.remove( i );
					break;
				}
			}
			
			return this;
		},
		
		/**
		 * Removes the last occurrence of a certain element in array.
		 * 
		 * Note: The function returns true, if it successfully removes the element. Otherwise false.
		 * 
		 * @param {anyType} item 
		 * @returns {Boolean}
		 */
		
		removeLastOccurrence: function __removeLastOccurrence( item ) {
			var len = this.length >>> 0;
			
			while( len-- ) {
				if( this[ len ] === item ) {
					this.remove( len );
					break;
				}
			}
			
			return this;
		},
		
		/**
		 * Sets the value to the specific index, pushing rest of the elements backward.
		 * 
		 * Note: Modifies the array. To force multiple elements to array, pass an array on 'item' parameter.
		 * 
		 * @param {Number} index 
		 * @param {anyType} item 
		 */
		
		force: function __forceArray( index, item ) {
			index = Math.max( index, 0 );
			
			// If index is greater than the length, we cannot be able to force it inside.
			if( index + 1 > this.length ) 
				throw new TypeError( 'Array.prototype.force(index, ...): The given index is out of bound.' );
			
			if( item != null ) {
				// A concatenated array along with the 'item'
				var arr = this.concat( item, this.splice( index, this.length - index ) );
				
				// Making the array empty.
				this.empty();
				
				// Now setting all the values to this array.
				while( arr.length ) 
					this.push( arr.shift() );
			}
			
			return this;
		},
		
		/**
		 * Returns a new array by replacing elements.
		 * 
		 * @param {anyType} item_1 
		 * @param {anyType} item_2 
		 * @returns {Array}
		 */
		
		replace: function __replace( item_1, item_2 ) {
			return this.map( function( value ) {
				return value === item_1 ? item_2 : value;
			} );
		},
		
		/**
		 * Returns a new array by replacing the first occurred element.
		 * 
		 * @param {anyType} item_1 
		 * @param {anyType} item_2 
		 * @returns {Array}
		 */
		
		replaceFirstOccurrence: function __replaceFirstOccurrence( item_1, item_2 ) {
			// Cloned array to be returned as a new copy of the array.
			var arr = this.clone( true ), i = 0;
			
			for( ; i < arr.length; i++ ) {
				if( arr[ i ] === item_1 ) {
					arr[ i ] = item_2;
					break;
				}
			}
			
			return arr;
		},
		
		/**
		 * Returns a new array by replacing the last occurred element.
		 * 
		 * @param {anyType} item_1 
		 * @param {anyType} item_2 
		 * @returns {Array}
		 */
		
		replaceLastOccurrence: function __replaceLastOccurrence( item_1, item_2 ) {
			var arr = this.clone( true ), i = arr.length;
			
			while( i-- ) {
				if( arr[ i ] === item_1 ) {
					arr[ i ] = item_2;
					break;
				}
			}
			
			return arr;
		},
		
		/**
		 * Operates an append operation to the original (this) array followed by the provided arrays, where all the
		 * elements are uniquely merged to original array.
		 *
		 * Note: [].append() does not modify the array.
		 *
		 * @returns {Array}
		 */
		
		append: function __appendArray() {
			// An cloned array to append.
			var appended = this.clone( true );
			
			Object.forEach( arguments, function( arr ) {
				[].add.apply( this, arr );
			}, appended );
			
			return appended;
		},
		
		/**
		 * Checks if the array includes the given item.
		 *
		 * @override
		 *
		 * Overriding the main occurrence with a modified better version of includes.
		 *
		 * @param {Boolean} item
		 * @param {Number} formIndex
		 * @returns {Boolean}
		 */
		
		includes: function __includesArray( item, fromIndex ) {
			// If multiple items are passed as an array on 'item' paramter, iterate it.
			if( Array.isArray( item ) ) {
				for( var i = 0; i < item.length; i++ ) {
					if( !this.includes( item[ i ] ) )
						return false;
				}
				
				return item.length !== 0;
			}
			
			return this.indexOf( item, fromIndex ) !== -1;
		},
		
		/**
		 * Clones an array. Use 'true' as first argument to make it deep.
		 *
		 * @param {Boolean} deep
		 * @returns {Array}
		 */
		
		clone: function __cloneArray( deep ) {
			var i       = this.length >>> 0,
			clonedArray = new Array( i );
			
			while( i-- )
				clonedArray[ i ] = deep === true ? deepClone( this[ i ] ) : this[ i ];
			
			return clonedArray;
		},
		
		/**
		 * Counts the number of occurrences of a particular item.
		 * 
		 * @param {anyType} item 
		 * @returns {Number}
		 */
		
		count: function __count( item ) {
			var count = 0, i = 0;
			
			for( ; i < this.length; i++ ) 
				if( this[ i ] === item ) count++;
			
			return count;
		},
		
		/**
		 * Returns any random property present in the array.
		 *
		 * @returns {anyType}
		 */
		
		random: function __random() {
			return this[ ( Math.random() * this.length ).toInt() ];
		},
		
		/**
		 * [].forEach() with stride support.
		 *
		 * @override
		 *
		 * @param {Functions} callback The callback function
		 * @param {Object} context Object will be used as the callback context
		 * @param {Number} stride A number to stride from the beginning of the array. Pass negative value to stride from the end.
		 * @returns {Array}
		 */
		
		forEach: function __forEachArray( callback, context, stride ) {
			stride = stride || 0;
			
			var len = this.length >>> 0;
			
			if( stride > len )
				throw new TypeError( 'Array.prototype.forEach( ..., ..., stride ): Stride greater than array length is not allowed.' );
			
			 var i = Number( stride > 0 && stride ),
			len = stride < 0 && len + stride || len;
			
			for( ; i < len; i++ ) 
				callback.call( context || this, this[ i ], i, this, stride );
			
			return this;
		}
	} );
	
	// ArrayIterator class.
	// For Array.prototype.keys() and other purposes.
	
	const ArrayIterator = function __ArrayIterator( array ) {
		// The iterating index.
		this.index = 0,
		
		// The value.
		this.value = array[ this.index ],
		
		// The done specifier.
		this.done = array.length === 0,
		
		// Storing the array.
		this.array = array;
	};
	
	// ArrayIterator.next()
	
	ArrayIterator.implement( 'next', function() {
		var returnable = { value: this.value, done: this.done };
		
		if( this.value !== undefined ) {
			this.index = this.index + 1 < this.array.length ? ++this.index : -1;
			
			this.value = this.array[ this.index ];
			
			if( this.value === undefined )
				this.done = true;
		}
		
		return returnable;
	} );
	
	// Polyfill Array.prototype for IE 11.
	polyfill( Array.prototype, {
		/**
		 * Returns a ArrayIterator iterating the indexes.
		 *
		 * @returns {ArrayIterator}
		 */
		
		keys: function __keysArray() {
			return new ArrayIterator( Array.range( 0, this.length - 1 ) );
		},
		
		/**
		 * Returns a ArrayIterator iterating all the values.
		 *
		 * @returns {ArrayIterator}
		 */
		
		values: function __valuesArray() {
			return new ArrayIterator( this );
		},
		
		/**
		 * changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length)
		 * Note: It returns the modified array.
		 *
		 * @param {anyType} value
		 * @param {Number} startIndex
		 * @param {Number} endIndex
		 * @returns {Array}
		 */
		
		fill: function __fillArray( value, startIndex, endIndex ) {
			if( value == null )
				throw new TypeError( '[...].fill(value, ..., ...): The provided first parameter is undefined/null.' );
			
			var returnable = Array.isArray( this ) ? this.clone() : Object.clone( this ),
			        length = this.length >>> 0;
			
			// Step 1.
			startIndex = startIndex >> 0,
			  endIndex = endIndex >> 0 || length;
			
			// Step 2.
			startIndex = startIndex < 0 ? Math.max( length + startIndex, 0 ) : Math.min( startIndex, length );
			endIndex = endIndex < 0 ? Math.max( length + endIndex, 0 ) : Math.min( endIndex, length );
			
			while( startIndex < endIndex )
				returnable[ startIndex++ ] = value;
			
			return returnable;
		},
		
		/**
		 * Finds a value and returns the first occurrence of it matched by the provided callback condition.
		 *
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {anyType}
		 */
		
		find: function __findArray( callback, context ) {
			// If no callback provided, throw a TypeError.
			if( callback == null )
				throw new TypeError( 'Array.prototype.find(callback, ...): The provided callback is null/undefined.' );
			
			for( var i = 0; i < this.length; i++ ) {
				if( callback.call( context, this[ i ], i, this ) )
					return this[ i ];
			}
			
			return undefined;
		},
		
		/**
		 * Finds a value and returns the index of it's first occurrence.
		 *
		 * @param {Function} callback
		 * @param {Object} context
		 */
		
		findIndex: function __findIndexArray( callback, context ) {
			// If no callback provided, throw a TypeError.
			if( callback == null )
				throw new TypeError( 'Array.prototype.find(callback, ...): The provided callback is null/undefined.' );
			
			for( var i = 0; i < this.length; i++ ) {
				if( callback.call( context, this[ i ], i, this ) )
					return i;
			}
			
			return -1;
		},
		
		/**
		 * Returns an ArrayIterator iterating through the [ index, value ] pair arrays.
		 *
		 * @returns {ArrayIterator}
		 */
		
		entries: function __entriesArray() {
			var pairs = [], i = 0;
			
			for( ; i < this.length; i++ )
				pairs.push( [ i, this[ i ] ] );
			
			return new ArrayIterator( pairs );
		},
		
		/**
		 * Shallow copies part of an array to another location in the same array and returns it without modifying its length.
		 *
		 * @param {Number} target
		 * @param {Number} start
		 * @param {Number} end
		 * @returns {Array}
		 */
		
		copyWithin: function __copyWithin( target, start, end ) {
			// If no target defined.
			if( target == null )
				throw new TypeError( 'Array.prototype.copyWithin(target, ..., ...): The target is null/undefined.' );
			
			var returnable = Array.isArray( this ) ? this.clone() : Object.clone( this ),
				   length = this.length >>> 0;
			
			// Step 1.
			target = target >> 0,
			 start = start >> 0,
			   end = end >> 0 || length;
			
			// Step 2.
			target = target < 0 ? Math.max( length + target, 0 ) : Math.min( target, length ),
			start = start < 0 ? Math.max( length + start, 0 ) : Math.min( start, length ),
			end = end < 0 ? Math.max( length + end, 0 ) : Math.min( end, length );
			
			var count = Math.min( end - start, length - target ),
			direction = 1;
			
			if( start < target && target < ( start + count ) ) {
				// Change the direction to negative.
				direction = -1;
				 start += count + direction;
				target += count + direction;
			}
			
			for( ; count-- > 0; start += direction, target += direction ) {
				if( start in returnable )
					returnable[ target ] = returnable[ start ];
				else delete returnable[ target ];
			}
			
			return returnable;
		},
		
		/**
		 * Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
		 *
		 * @param {Number} depth
		 * @returns {Array}
		 */
		
		flat: function __flatArray( depth ) {
			return ( depth > 0 ? this.reduce( function( acc, value ) {
				return acc.concat( Array.isArray( value ) ? value.flat( --depth ) : value );
			}, [] ) : RJS.slice.call( this ) ).trim();
		},
		
		/**
		 * The flatMap() method first maps each element using a mapping function, then flattens the result into a new array.
		 * It is identical to a map() followed by a flat() of depth 1.
		 *
		 * @param {Function} callback
		 * @param {Object} context
		 */
		
		flatMap: function __flatMapArray( callback, context ) {
			return this.reduce( function( acc, value, index, array ) {
				return acc.concat( callback.call( context, value, index, array ) );
			}, [] );
		}
	} );
	
	// Polyfill Array Statics.
	polyfill( Array, {
		/**
		 * Transforms the passed arguments to array.
		 *
		 * @returns {Array}
		 */
		
		of: function __ofArray() {
			return Array.from( arguments );
		},
		
		/**
		 * Creates a new, shallow-copied Array instance from an array-like or iterable object.
		 *
		 * @param {Object | String | Array} item
		 * @param {Function} callback
		 * @param {Object} context
		 */
		
		from: function __fromArray( item, callback, context ) {
			// The 'item' cannot be undefined/null.
			if( item == null )
				throw new TypeError( 'Array.from(item, ..., ...): The provided first parameter is null/undefined.' )
			
			var modArr = RJS.slice.call( item );
			
			if( callback != null ) {
				var i = 0;
				
				while( i < modArr.length )
					modArr[ i ] = callback.call( context, modArr[ i ], i++, modArr );
			}
			
			return modArr;
		}
	} );
	
	// Array of characters.
	var arrayOfCharacters = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];
	
	// Capitalized characters.
	arrayOfCharacters.forEach( function( ch ) {
		this.push( ch.toUpperCase() );
	} );
	
	Array.static( {
		/**
		 * Array.isEmpty() ensures an empty array.
		 *
		 * @param {Array} array
		 * @returns {Boolean}
		 */
		
		isEmpty: function __isEmptyArray( array ) {
			return Array.isArray( array ) && !array.length;
		},
		
		/**
		 * Checks whether the provided object is an array like object or not.
		 *
		 * @param {Object} object
		 * @returns {Boolean}
		 */
		
		isArrayLike: function __isArrayLike( object ) {
			return Object.isObject( object ) && 'length' in object &&
				Number.isNumber( object.length ) && object.length > -1;
		},
		
		/**
		 * Transforms any object to an array.
		 *
		 * Note: The difference between Array.from() and Array.toArray() is Array.toArray() provides slicing feature,
		 * where Array.from() provides mapping feature.
		 *
		 * @param {Object} object
		 * @param {Number} start
		 * @param {Number} quantity
		 * @returns {Array}
		 */
		
		toArray: function __toArray( object, start, quantity ) {
			return RJS.slice.call( object, start, quantity );
		},
		
		/**
		 * Returns an array iterating until it reaches to the given range from a provided initial value.
		 *
		 * Note: To get a range between character value pass either Ex: Array.range( 'a', 'z' ) or Ex: Array.range( 'A', 'Z' ).
		 * Or it will return unnecessary characters.
		 *
		 * @param {Number | String} start
		 * @param {Number | String} stop
		 * @param {Number} increment
		 * @returns {Array}
		 */
		
		range: function __range( start, stop, increment ) {
			// If 'start' or 'stop' is null/undefined, throw an error.
			if( start == null || stop == null ) 
				throw new TypeError( 'Array.range(start, stop, ...): The paramter "start" or "stop" is null or undefined.' )
			
			var range = [];
			
			if( typeof start === typeof stop ) {
				increment = increment || 1;
				
				if( String.isCharacter( start ) && arrayOfCharacters.includes( [ start, stop ] ) ) {
					var i = arrayOfCharacters.indexOf( start ),
					   to = arrayOfCharacters.indexOf( stop );
					
					for( ; i <= to; i += increment ) 
						range.push( arrayOfCharacters[ i ] );
				}
				else if( Number.isNumber( start ) ) {
					for( ; start <= stop; start += increment ) 
						range.push( start );
				}
			}
			
			return range;
		},
		
		/**
		 * Repeats a value in an array by provided times.
		 * 
		 * @param {anyType} value 
		 * @param {Number} quantity 
		 * @returns {Array}
		 */
		
		times: function __times( value, quantity ) {
			return new Array( quantity ).fill( value );
		},
		
		/**
		 * Transforms an array to an array like object.
		 *
		 * @param {Array} array
		 * @returns {Object}
		 */
		
		toObject: function __toObject( array ) {
			// Object to be an array like object.
			var obj = {},
			
			// 'array' keys.
			   keys = array.keys(), key = null;
			
			while( ( key = keys.next() ).done === false )
				obj[ key.value ] = array[ key.value ];
			
			// Setting the length to make 'obj' a true array like object.
			obj.length = array.length;
			
			return obj;
		}
	} );
	
	// ***** FUNCTION IMPLEMENTATION *****
	
	Function.implement( {
		/**
		 * Attempts to fire a function, creating an environment where no error triggers.
		 *
		 * Note: If the function successfully runs, attempt() will return the value this function would return.
		 * If the function fails, returns -1.
		 *
		 * @param {Object} context
		 * @param {Array} args
		 * @returns {anyType}
		 */
		
		attempt: function __attempt( context, args ) {
			try {
				return this.apply( context, args );
			} catch(e) {}
			
			return -1;
		},
		
		/**
		 * Alternative of Function.prototype.bind() with arguments passed in array.
		 *
		 * @param {Object} context
		 * @param {Array} args
		 */
		
		pass: function __pass( context, args ) {
			var self = this;
			
			return function() {
				self.apply( context, args || arguments );
			}
		},
		
		/**
		 * Calls a function delaying specific amount of time.
		 *
		 * @param {Number} milliseconds
		 * @param {Object} context
		 * @param {Array} args
		 * @returns {Object}
		 */
		
		delay: function __delayFunction( milliseconds, context, args ) {
			var self = this,
			      id = setTimeout( self.pass( context, args ), milliseconds );
			
			return {
				stop: function() {
					clearTimeout( id );
					self.apply( context, args );
				}
			}
		},
		
		/**
		 * Calls a function periodically with specific amount of time.
		 *
		 * @param {Number} milliseconds
		 * @param {Object} context
		 * @param {Array} args
		 * @returns {Object}
		 */
		
		periodical: function __periodicalFunction( milliseconds, context, args ) {
			var id = setInterval( this.pass( context, args ), milliseconds );
			
			return {
				stop: function() {
					clearInterval( id );
				}
			}
		}
	} );
	
	Function.static( {
		/**
		 * Function.isFunction() returns true if the given element is a pure function.
		 *
		 * Note: This function does not identify HTML <object> element as a function.
		 *
		 * @param {anyType} item
		 * @returns {Boolean}
		 */
		
		isFunction: function __isFunction( item ) {
			// Some browsers classifies HTML <object> element as a function. So, we don't want any HTML element
			// to be a function.
			return typeof item === 'function' && item.nodeType == null;
		},
		
		/**
		 * Creates a function which returns the provided item.
		 *
		 * @param {anyType} item
		 */
		
		toFunction: function __toFunction( item ) {
			return Function.isFunction( item ) ? item : function() {
				return item;
			};
		}
	} );
	
	// ***** BOOLEAN IMPLEMENTATION *****
	
	Boolean.static( 'isBoolean', function __isBoolean( item ) {
		return item != null && typeof item === 'boolean';
	} );
	
	// ***** NUMBER IMPLEMENTATION *****
	
	Number.implement( {
		/**
		 * Transforms any number to an integer.
		 *
		 * @param {Number} radix The numbering base.
		 * @returns {Boolean}
		 */
		
		toInt: function __toIntNumber( radix ) {
			return parseInt( this, radix || 10 /* DECIMAL BASE */ );
		},
		
		/**
		 * Transforms any number to an float.
		 *
		 * @returns {Boolean}
		 */
		
		toFloat: function __toFloatNumber() {
			return parseFloat( this );
		}
	} );
	
	Number.static( {
		/**
		 * Checks whether the provided element is an number or not.
		 *
		 * @param {anyType} item
		 * @returns {Boolean}
		 */
		
		isNumber: function __isNumber( item ) {
			return item != null && typeof item === 'number';
		},
		
		/**
		 * Checks whether the given number is a float.
		 *
		 * @param {Number} num
		 * @return {Boolean}
		 */
		
		isFloat: function __isFloat( num ) {
			return !Number.isInteger( num );
		}
	} );
	
	// Polyfill of Number statics.
	polyfill( Number, {
		// Max safe integer to operate.
		MAX_SAFE_INTEGER: 9007199254740991,
		
		// Min safe integer to operate.
		MIN_SAFE_INTEGER: -9007199254740991,
		
		// Represents the difference between 1 and the smallest floating point number greater than 1
		EPSILON: 2.220446049250313e-16,
		
		/**
		 * Determines whether the passed value is a finite number
		 * 
		 * @param {anyType} item 
		 * @returns {Boolean}
		 */
		
		isFinite: function __isFiniteNumber( item ) {
			return Number.isNumber( item ) && window.isFinite( item );
		},
		
		/**
		 * Determines whether the passed value is NaN and its type is Number. It is a more robust version of the original, window.isNaN().
		 * 
		 * @param {anyType} item 
		 * @returns {Boolean}
		 */
		
		isNaN: function __isNaN( item ) {
			return Number.isNumber( item ) && item !== item;
		},
		
		/**
		 * Determines whether the given number is an integer or not.
		 * 
		 * @param {Number} item 
		 * @returns {Boolean}
		 */
		
		isInteger: function __isInteger( item ) {
			return Number.isFinite( item ) && Math.floor( item ) === item;
		},
		
		/**
		 * Determines whether the provided value is a number that is a safe integer.
		 * 
		 * @param {Number} num 
		 */
		
		isSafeInteger: function __isSafeInteger( num ) {
			return Number.isInteger( num ) && Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
		}
	} );
	
	// ***** STRING IMPLEMENTATION *****
	
	String.implement( {
		/**
		 * Tests the original (this) string with the provided regular expression.
		 *
		 * @param {RegExp | String} regexp
		 * @param {String} param
		 * @returns {Boolean}
		 */
		
		test: function __test( regexp, param ) {
			return ( RegExp.isRegExp( regexp ) ? regexp : /* Assuming 'regexp' a string. */ new RegExp( regexp, param ) ).test( this );
		},
		
		/**
		 * Returns a new string having a provided length repeating the current string.
		 * 
		 * @param {Number} length 
		 * @returns {String}
		 */
		
		repeatUntil: function __repeatUntil( length ) {
			var str = this.repeat( ( length / this.length ) | 0 ),
			    len = length - str.length /* Remaining length */, i = 0;
			
			// Adding the characters of the remaining length as the length number was floored in 'str'.
			while( len-- ) {
				str += this[ i ];
				
				if( ( i++ + 1 ) === this.length ) 
					i = 0;
			}
			
			return str;
		},
		
		/**
		 * Converts a string to an integer.
		 * 
		 * @param {Number} radix 
		 * @returns {Number}
		 */
		
		toInt: function __toIntString( radix /* base */ ) {
			return parseInt( this, radix );
		},
		
		/**
		 * Converts a string to an floating point number.
		 * 
		 * @returns {Number}
		 */
		
		toFloat: function __toFloatString() {
			return parseFloat( this );
		},
		
		/**
		 * Checks whether the given string(s) are included in original (this) string.
		 * 
		 * @param {String | Array} string 
		 * @param {Number} position 
		 */
		
		includes: function __includesString( string, position ) {
			// if 'string' is an array, representing multiple strings, iterate it.
			if( Array.isArray( string ) ) {
				for( var i = 0; i < string.length; i++ ) {
					// If one og them is missing, return false.
					if( !this.includes( string[ i ] ) ) 
						return false;
				}
				
				return true;
			}
			
			return this.indexOf( string, position ) !== -1;
		},
		
		/**
		 * Returns the first character of the string.
		 *
		 * @returns {String}
		 */
		
		first: function __firstString() {
			return this.length !== 0 ? this.charAt( 0 ) : '';
		},
		
		/**
		 * Returns the final character of the string.
		 *
		 * @returns {String}
		 */
		
		last: function __lastString() {
			return this.length !== 0 ? this.charAt( this.length - 1 ) : '';
		},
		
		/**
		 * Reverses a string.
		 * 
		 * @returns {String}
		 */
		
		reverse: function __reverseString() {
			// Using the Array.prototype.reverse() method.
			return this.split( '' ).reverse().join( '' );
		},
		
		/**
		 * Removes all the extraneous whitespaces and trims a string.
		 *
		 * @returns {String}
		 */
		
		clean: function __clean() {
			return String( this ).replace( /\s+/, ' ' ).trim();
		},
		
		/**
		 * Substitutes a string with the given values in an object, sequentially.
		 * 
		 * Note: Use \ before a replaceable block to escape it.
		 * 
		 * @param {Object} object 
		 * @returns {String}
		 */
		
		substitute: function __substitute( object ) {
			if( !Object.isSimpleObject( object ) ) 
				throw new TypeError( 'String.prototype.substitute(object): The provided object is not a proper object or null/undefined.' );
			
			var value;
			
			return String( this ).replace( /\\?{{\s*[\w+.]*\s*}}/g, function( match ) {
				// If match has a escape character before it, abort replacement.
				if( match.charAt( 0 ) === '\\' ) 
					return match.slice( 1 );
				
				match = match.remove( /^{{\s*/, /\s*}}$/ ).split( '.' );
				
				value = object;
				
				while( match.length ) 
					value = value[ match.shift() ];
				
				return value || '';
			} );
		},
		
		/**
		 * Formats a string by replacing '%s' characters with the passed arguments sequentially.
		 * 
		 * Note: use \ (Backslash) to escape it.
		 * 
		 * @returns {String}
		 */
		
		format: function __format() {
			var target = arguments, i = 0;
			
			return String( this ).replace( /\\?%s/g, function( match ) {
				if( match.charAt( 0 ) === '\\' ) 
					return match.slice( 1 );
				
				return target[ i++ ] || '';
			} );
		},
		
		/**
		 * Removes particular nodes from a string.
		 *
		 * @returns {String}
		 */
		
		remove: function __removeString() {
			var str = String( this );
			
			for( var i = 0; i < arguments.length; i++ ) 
				str = str.replace( arguments[ i ], '' );
			
			// The modified new string.
			return str;
		}
	} );
	
	// Polyfills of String.prototype for IE 11 or others.
	polyfill( String.prototype, {
		/**
		 * The code is inspired from @mathias; https://mths.be/codepointat.
		 * 
		 * Returns a non-negative integer that is the Unicode code point value.
		 * 
		 * @param {Number} position 
		 * @returns {Boolean}
		 */
		
		codePointAt: function __codePointAt( position ) {
			if( position == null ) 
				throw new TypeError( 'String.prototype.codePointAt(position): The character position is null/undefined.' );
			
			// Fixing the position.
			position = Number.isNumber( position ) && position || 0;
			
			var len = this.length;
			
			if( position < 0 || position >= len ) 
				return undefined;
			
			// Get the first code unit.
			var first = this.charCodeAt( position ), second;
			
			// Check if it’s the start of a surrogate pair
			if( first >= 0xD800 && first <= 0xDBFF && len > position + 1 ) {
				second = string.charCodeAt(index + 1);
				
				if (second >= 0xDC00 && second <= 0xDFFF) 	// low surrogate
					// Surrogate-formula.
					return ( first - 0xD800 ) * 0x400 + second - 0xDC00 + 0x10000;
			}
			
			return first;
		},
		
		/**
		 * The method polyfill is inspired from Mathias Bynens (https://github.com/mathiasbynens/String.prototype.startsWith).
		 * 
		 * Determines whether a string begins with the characters of a specified string, returning true or false as appropriate.
		 * 
		 * @param {String} search 
		 * @param {Number} position 
		 */
		
		startsWith: function __startsWith( search, position ) {
			positions = position > 0 ? position | 0 /* Bitwise floor */ : 0;
			
            	return this.substring( position, position + search.length ) === search;
		},
		
		/**
		 * Determines whether a string ends with the characters of a specified string, returning true or false as appropriate.
		 * 
		 * @param {String} search 
		 * @param {Number} length 
		 */
		
		endsWith: function __endsWith( search, length ) {
			// Fixing the length.
			if( length == null || length > this.length ) 
				length = this.length;
			
			return this.substring( length - search.length, length ) === search;
		},
		
		/**
		 * Returns a new string which holds specific number of copies of the current string.
		 * 
		 * @param {Number} count 
		 * @returns {String}
		 */
		
		repeat: function __repeatString( count ) {
			if( count == null ) 
				throw new TypeError( 'String.prototype.repeat(count): The first parameter "count" is null/undefined.' );
			
			// Original string copy.
			var str = '' + this;
			
			// RangeError.
			if( count === Infinity || count < 0 ) 
				throw new RangeError( 'String.prototype.repeat(count): The count is out of range.' )
			
			// If count is a NaN value, fix it.
			count = Number( !isNaN( count ) ) && count | 0;
			
			if( str.length === 0 || count === 0 ) 
				return '';
			
			var maxCount = str.length * count;
			
			// Ensuring count a 32-bit signed integer. Cause browsers from 2014 or earlier can't handle strings of
			// 1 << 28 length or longer.
			if( maxCount >= 1 << 28 ) 
				throw new RangeError( 'String.prototype.repeat(count): String cannot overflow the maximum string size.' );
			
			count = Math.log2( count ) | 0;
			
			while( count-- ) 
				str += str;
			
			str += str.substring( 0, maxCount - str.length );
			
			return str;
		},
		
		/**
		 * Pads the current string with another string (multiple times, if needed) until the resulting string reaches the given 
		 * length.
		 * 
		 * Note: The padding is applied from the start of the current string.
		 * 
		 * @param {Number} length 
		 * @param {String} string 
		 * @returns {String}
		 */
		
		padStart: function __padStart( length, string ) {
			// Fixing the 'length'.
			length = Number( Number.isNumber( length ) ) && Math.max( length, 0 );
			
			// Provided length should be greater than the original string.
			if( length <= this.length ) 
				return this;
			
			// The length bugs.
			if( length === Infinity || Number.isNaN( length ) || length >= 1 << 28 /* Maximum string length */ ) 
				throw new RangeError( 'String.prototype.padStart(length, ...): The provided length is not in range.' );
			
			string = string != null && String( string ) || ' ';
			
			// Returning the final string.
			return string.repeatUntil( length - this.length ) + this;
		},
		
		/**
		 * pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length.
		 * 
		 * Note: The padding is applied from the end of the current string.
		 * 
		 * @param {Number} length 
		 * @param {String} string 
		 * @returns {String}
		 */
		
		padEnd: function __padEnd( length, string ) {
			// Fixing the 'length'.
			length = Number( Number.isNumber( length ) ) && Math.max( length, 0 );
			
			// Provided length should be greater than the original string.
			if( length <= this.length ) 
				return this;
			
			// The length bugs.
			if( length === Infinity || Number.isNaN( length ) || length >= 1 << 28 /* Maximum string length */ ) 
				throw new RangeError( 'String.prototype.padStart(length, ...): The provided length is not in range.' );
			
			string = string != null && String( string ) || ' ';
			
			// Returning the final string.
			return this + string.repeatUntil( length - this.length );
		},
		
		/**
		 * Removes whitespace from the beginning of a string.
		 * 
		 * Note: trimLeft() is an alias of this method.
		 * 
		 * @returns {String}
		 */
		
		trimStart: function __trimStart() {
			return this.remove( /^\s+/ );
		},
		
		/**
		 * Removes whitespace from the end of a string.
		 * 
		 * Note: trimRight() is an alias of this method.
		 * 
		 * @returns {String}
		 */
		
		trimEnd: function __trimEnd() {
			return this.remove( /\s+$/ );
		},
		
		normalize: function __normalize() {
			// String.prototype.normalize() does not have any standard polyfill.
		}
	} );
	
	// Aliases of String.prototype .
	setAlias( {
		trimLeft:  'trimStart',
		trimRight: 'trimEnd'
	}, String.prototype );
	
	String.static( {
		/**
		 * Checks whether the item is a string.
		 *
		 * @param {anyType} item
		 */
		
		isString: function __isString( item ) {
			return item != null && typeof item === 'string';
		},
		
		/**
		 * Checks whether the string is empty.
		 *
		 * @param {String} string
		 */
		
		isEmpty: function __isEmptyString( string ) {
			return String.isString( string ) && string.length === 0;
		},
		
		/**
		 * Checks whether the provided string is a character.
		 *
		 * @param {String} string
		 */
		
		isCharacter: function __isCharacter( string ) {
			return String.isString( string ) && string.length === 1;
		},
		
		/**
		 * Capitalizes first letter of the first words of the string.
		 *
		 * @param {String} string
		 * @returns {String}
		 */
		
		capitalize: function __capitalize( string ) {
			return String( string ).replace( /\b[a-z]/, function( match ) {
				return match.toUpperCase();
			} );
		},
		
		/**
		 * Capitalizes each of the word's first letter of a string.
		 *
		 * @param {String} string
		 * @returns {String}
		 */
		
		capitalizeEach: function __capitalizeEach( string ) {
			return String( string ).replace( /\b[a-z]/g, function( match ) {
				return match.toUpperCase();
			} );
		},
		
		/**
		 * Hyphenates a camel cased string.
		 *
		 * @param {String} string
		 * @returns {String}
		 */
		
		hyphenate: function __hyphenate( string ) {
			return String( string ).replace( /[A-Z]/g, function( match ) {
				return '-' + match.toLowerCase();
			} );
		},
		
		/**
		 * Transforms a hyphenated string to a camel cased string.
		 *
		 * @param {String} string
		 * @return {String}
		 */
		
		camelCase: function __camelCase( string ) {
			return String( string ).replace( /-\D/g, function( match ) {
				return match.last().toUpperCase();
			} );
		},
		
		/**
		 * Escapes all regular expression characters from the string.
		 *
		 * @param {String} string
		 * @return {String}
		 */
		
		escapeRegExp: function __escapeRegExp( string ) {
			return String( string ).replace( /([-.*+?^${}()|[\]\/\\])/g, '\\$1' );
		}
	} );
	
	// Polyfill String Statics.
	polyfill( String, {
		/**
		 * Returns a string created by using the specified sequence of code points.
		 * 
		 * @returns {String}
		 */
		
		fromCodePoint: function __fromCodePoint() {
			var codeUnits = [], codeLength = 0, result = '';
			
			Object.forEach( arguments, function( value ) {
				// Handle incorrect code point cases.
				if( !( value < 0x10FFFF && ( value >>> 0 ) === value ) ) 
					throw new RangeError( 'String.fromCodePoint(): Invalid code point: ' + value );
				
				// BMP code point
				if ( value <= 0xFFFF ) 
					codeLength = codeUnits.push( value );
				else {
					value -= 0x10000;
					
					// Surrogate formula.
					codeLength = codeUnits.push(
						( value >> 10 ) + 0xD800,  // highSurrogate
						( value % 0x400 ) + 0xDC00 // lowSurrogate
					);
				}
				
				if( codeLength >= 0x3fff ) {
					result += String.fromCharCode.apply( null, codeUnits );
          			codeUnits.length = 0;
				}
			} );
			
			return result + String.fromCharCode.apply( null, codeUnits );
		},
		
		// Dependencies doesn't meet the proper support for this polyfill.
		raw: function __raw() {}
	} );
	
	// Polyfill Math's absent properties.
	polyfill( Math, {
		/**
		 * Returns the 2 based logarithm value of provided number.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		log2: function __log2( x ) {
			return Math.log( x ) / Math.LN2;
		},
		
		/**
		 * Returns the 2 based logarithm value of provided number.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		log10: function __log10( x ) {
			return Math.log( x ) / Math.LN10;
		},
		
		/**
		 * Returns the natural logarithm (base e) of 1 + a number
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		log1p: function __log1p( x ) {
			x = Number( x );
			
			if ( -1 < x && x < 1 ) {
				var y = x;
				
				for ( var i = 2; i <= 300; i++ ) {
					y += Math.pow( ( -1 ), ( i - 1 ) ) * Math.pow( x, i ) / i;
				}
				
				return y;
			}

			return Math.log( 1 + x );
		},
		
		/**
		 * Returns either a positive or negative +/- 1, indicating the sign of a number passed into the argument. 
		 * If the number passed into Math.sign() is 0, it will return a +/- 0.
		 * 
		 * Note: If the number is positive, an explicit (+) will not be returned.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		sign: function __sign( x ) {
			x = Number( x );
			
			// If x is NaN, the result is NaN.
			if( isNaN( x ) ) 
				return NaN;
			
			// If x is -0, the result is -0.
			else if( 1 / x === -Infinity ) 
				return -0;
			
			// If x is +0, the result is +0.
			else if( 1 / x === Infinity ) 
				return 0;
			
			// If x is negative and not -0, the result is -1.
			else if( x < 0 ) 
				return -1;
			
			// If x is positive and not +0, the result is +1.
			else if(x > 0) 
				return 1;
			
			return NaN;
		},
		
		/**
		 * The Math.imul() function returns the result of the C-like 32-bit multiplication of the two parameters.
		 * 
		 * @param {Number} x 
		 * @param {Number} y 
		 * @returns {Number}
		 */
		
		imul: function __imul( x, y ) {
			var xHi = ( x >>> 16 ) & 0xffff,
			    xLo = x & 0xffff,
			    yHi = ( y >>> 16 ) & 0xffff,
			    yLo = y & 0xffff;
			
			// The shift by 0 fixes the sign on the high part.
			// The final | 0 converts the unsigned value into a signed value
			return ( ( xLo * yLo ) + ( ( ( xHi * yLo + xLo * yHi ) << 16 ) >>> 0 ) | 0);
		},
		
		/**
		 * Returns the hyperbolic arc-cosine of a number.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		acosh: function __acosh( x ) {
			// If x is NaN, the result is NaN.
			if( isNaN( x ) ) 
				return NaN;
			
			// If x is less than 1, the result is NaN.
			if( x < 1 ) 
				return NaN;
			
			// If x is 1, the result is +0.
			if( x === 1 ) 
				return 0;
			
			// If x is +∞, the result is +∞.
			if( x === Infinity ) 
				return Infinity;
			
			return Math.log( x + Math.sqrt( x * x - 1 ) );
		},
		
		/**
		 * Returns the hyperbolic arcsine of a number
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		asinh: function( x )  {
			// If x is NaN, the result is NaN.
			if( isNaN( x ) ) 
				return NaN;
			
			// If x is +0, the result is +0.
			if( x === 0 && 1/x === Infinity ) 
				return 0;
				
			// If x is -0, the result is -0.
			if( x === 0 && 1/x === -Infinity ) 
				return -0;
				
			// If x is +∞, the result is +∞.
			if( x === Infinity ) 
				return Infinity;
				
			// If x is -∞, the result is -∞.
			if( x === -Infinity ) 
				return -Infinity;
				
			return Math.log( x + Math.sqrt( x * x + 1 ) );
		},
		
		/**
		 * Returns the hyperbolic arctangent of a number
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		atanh: function __atanh( x ) {
			// If x is NaN, the result is NaN.
			if( isNaN( x ) ) 
				return NaN;
			
			// If x is less than -1, the result is NaN.
			if( x < -1 ) 
				return NaN;
			
			// If x is greater than 1, the result is NaN.
			if( x > 1 ) 
				return NaN;
			
			// If x is -1, the result is -∞.
			if( x === -1 ) 
				return -Infinity;
			
			// If x is +1, the result is +∞.
			if( x === 1 ) 
				return Infinity;
			
			// If x is +0, the result is +0.
			if( x === 0 && 1/x === Infinity ) 
				return 0;
			
			// If x is -0, the result is -0.
			if( x === 0 && 1/x === -Infinity ) 
				return -0;
			
			return Math.log( ( 1 + x ) / ( 1 - x ) ) / 2;
		},
		
		/**
		 * Returns the cube root of a number
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		cbrt: function __cbrt( x ) {
			// If x is NaN, the result is NaN.
			if( isNaN( x ) ) 
				return NaN;
			
			// If x is +0, the result is +0.
			if( x === 0 && 1/x === Infinity ) 
				return 0;
			
			// If x is -0, the result is -0.
			if( x === 0 && 1/x === -Infinity ) 
				return -0;
			
			// If x is +∞, the result is +∞.
			if( x === Infinity ) 
				return Infinity;
			
			// If x is -∞, the result is -∞.
			if( x === -Infinity ) 
				return -Infinity;
			
			return ( x < 0 ? -1 : 1 ) * Math.pow( Math.abs( x ), 1 / 3 );
		},
		
		/**
		 * Returns e^x - 1, where x is the argument, and e the base of the natural logarithms.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		expm1: function __expm1( x ) {
			// If x is NaN, the result is NaN.
			if( isNaN( x ) ) 
				return NaN;
			
			// If x is +0, the result is +0.
			if( x === 0 && 1/x === Infinity ) 
				return 0;
			
			// If x is -0, the result is -0.
			if( x === 0 && 1/x === -Infinity ) 
				return -0;
			
			// If x is +∞, the result is +∞.
			if( x === Infinity ) 
				return Infinity;
			
			// If x is -∞, the result is -1.
			if( x === -Infinity ) 
				return -1;

			return ( x > -1e-6 && x < 1e-6 ) ? ( x + x * x / 2 ) : Math.exp( x ) - 1;
		},
		
		/**
		 * Returns the number of leading zero bits in the 32-bit binary representation of a number.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		clz32: function __clz32( x ) {
			var asUint = x >>> 0;
			
			if( asUint === 0 ) {
				return 32;
			}
			
			return 31 - ( Math.log2( asUint ) | 0 ) | 0;
		},
		
		/**
		 * Returns the square root of the sum of squares of its arguments.
		 * 
		 * @returns {Number}
		 */
		
		hypot: function __hypot() {	
			var y = 0;
			i = arguments.length;
			
			while( i-- ) 
				y += arguments[i] * arguments[i];
			
			return Math.sqrt( y) ;
		},
		
		/**
		 * Returns the nearest 32-bit single precision float representation of a Number.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		fround: function __fround( x ) {
			x = Number(x);
			
			// Return early for ±0 and NaN.
			if( !x ) return x;
			
			var sign = x < 0 ? -1 : 1;
			
			if( sign < 0 ) x = -x;
			
			// Compute the exponent (8 bits, signed).
			var exp = Math.floor( Math.log( x ) / Math.LN2 ),
			 powexp = Math.pow( 2, Math.max( -126, Math.min( exp, 127 ) ) ),
			
			// Handle sub-normals: leading digit is zero if exponent bits are all zero.
			leading = exp < -127 ? 0 : 1,
			
			// Compute 23 bits of mantissa, inverted to round toward zero.
			mantissa = Math.round( ( leading - x / powexp ) * 0x800000 );
			
			return mantissa <= -0x800000 ? sign * Infinity : ( sign * powexp * (leading - mantissa / 0x800000) );
		},
		
		/**
		 * Returns the integer part of the number slicing the fraction.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		trunc: function __trunc( x ) {
			x = +x;
			
			if( !isFinite( x ) ) 
				return x;
		
			return ( x - x % 1 ) || ( x < 0 ? -0 : x === 0 ? x : 0 );
		},
		
		/**
		 * Returns the hyperbolic cosine of a number, that can be expressed using the constant e.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		cosh: function __cosh( x ) {
			x = Math.exp( x );
  			return ( x + 1 / x ) / 2;
		},
		
		/**
		 * Returns the hyperbolic sine of a number, that can be expressed using the constant e.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		sinh: function __sinh( x ) {
			x = Math.exp( x );
  			return ( x - 1 / x ) / 2;
		},
		
		/**
		 * Returns the hyperbolic tangent of a number, that can be expressed using the constant e.
		 * 
		 * @param {Number} x 
		 * @returns {Number}
		 */
		
		tanh: function __tanh( x ) {
			if( x === Infinity ) 
				return 1;
			else if( x === -Infinity ) 
				return -1;
			
			return Math.sinh( x ) / Math.cosh( x );
		}
	} );
	
	// ***** REGULAR EXPRESSION IMPLEMENTATION *****
	
	RegExp.static( 'isRegExp', function __isRegExp( item ) {
		return item != null && item instanceof RegExp;
	} );
	
	// If no document is not defined, then use a virtual document to perform RJS operations.
	var document = window.document || new Document();
	
	const rEverse = function rEverse( elem ) {
		
	};
	
	// Global interface notations.
	window.INTF_METHOD = 'm_ethod',
	 window.INTF_VALUE = 'v_alue';
	
	function intfValidator( object, type ) {
		var name;
		
		for( name in object ) {
			if( object[ name ] !== INTF_METHOD && object[ name ] !== INTF_VALUE ) 
				throw new TypeError( 'InterfaceMap(): Invalid interface. Try having specific types, INTF_METHOD or INTF_VALUE on "%s" block.'.format( type ) );
		}
	}
	
	/**
	 * A class to map the interface object ready to be implemented into another class.
	 * 
	 * @param {Object} obj 
	 */
	
	const InterfaceMap = function( obj ) {
		// If the interface name is not a string, throw an Error. 
		if( !String.isString( obj.name ) ) 
			throw new TypeError( 'InterfaceMap(object): The provided interface name is not a string or null/undefined.' );
		
		// Setting the name of the interface.
		this.name = obj.name,
		
		// A reference object to hold the prototypes and static properties.
		this.Reference = {
			implement: {},
			static: {}
		};
		
		var extended = ( obj.extends != null && Array.isArray( obj.extends ) ? obj.extend : [ obj.extends ] || [] ).filter( function( intf ) {
			return rEverse.isInterface( intf );
		} );
		
		// Targets (short).
		var targetImplement = this.Reference.implement,
		       targetStatic = this.Reference.static;
		
		// The prototype methods.
		Object.assign.apply( null, [ targetImplement ].concat( extended.map( function( intf ) {
			return intf.Reference.implement;
		} ), obj.implement || {} ) );
		
		// The static methods.
		Object.assign.apply( null, [ targetStatic ].concat( extended.map( function( intf ) {
			return intf.Reference.static;
		} ), obj.static || {} ) );
		
		// Validation block.
		
		intfValidator( targetImplement, 'implement' );
		intfValidator( targetStatic, 'static' );
	};
	
	// Getter function for 'name' (InterfaceMap).
	InterfaceMap.implement( 'getName', function() { return this.name; } );
	
	// Interface specific typechecker.
	InterfaceMap.static( 'typeOf', function( item ) {
		if( Function.isFunction( item ) ) 
			return INTF_METHOD;
		
		if( item != null ) 
			return INTF_VALUE;
		
		return null;
	} );
	
	rEverse.static( {
		// rEverseJS infos.
		info: {
			name: 'rEverseJS',
			author: 'SD Asif Hossein',
			version: '1.0.1',
			keywords: [ 'rEverseJS', 'Class', 'JavaScript', 'Client', 'Browser' ],
			dependencies: {}
		},
		
		// Current time as seconds counting from 1970.
		now: Date.now(),
		
		/**
		 * Creates a new InterfaceMap object and returns it.
		 * 
		 * @param {Object} obj 
		 * @returns {InterfaceMap}
		 */
		
		Interface: function __Interface( obj ) {
			return new InterfaceMap( obj );
		},
		
		/**
		 * Creates a class according to the specific object.
		 * 
		 * Note: Provide a 'name' as the object.name property and also provide a constructor in object[ 'name' ].
		 * 
		 * @param {Object} object 
		 */
		
		Class: function( object ) {
			// If 'object' should have a constructor as a Function.
			if( !String.isString( object.name ) || object.constructor == null ) 
				throw new TypeError( 'rEverse.Class(object): Provided object must have a class name along with the constructor.' );
			
			var _constructor = Function( 'object', 'return function %s() { var sup = this.super; while( sup.superStack.length ) { var name = sup.superStack.shift(); sup[ name ] = sup[ name ].bind( this ); } object.constructor.apply( this, arguments ); }'.format( object.name ) )( object );
			
			// Implementing the prototypes and the statics.
			_constructor.implement( object.implement || {} );
			_constructor.static( object.static || {} );
			
			// Adding the default super constructor.
			_constructor.prototype.super = function __super() {};
			_constructor.prototype.super.superStack = [];
			
			// Extending the object making it a sub-constructor/sub-class (If parent class is defined).
			if( object.extends ) {
				// If 'object.extends' is not a constructor, throw a TypeError.
				if( !Function.isFunction( object.extends ) ) 
					throw new TypeError( 'rEverse.Class(object): "object.extends" is not a constructor' );
				
				var clonedPrototypes = Object.clone( _constructor.prototype, true );
				
				// Extending.
				// (Overrides the constructor).
				_constructor.prototype = Object.create( object.extends.prototype );
				
				// Adding the superclass constructor.
				_constructor.prototype.super = object.extends;
				
				// Stack to hold the entries of superclass overridable implementations.
				_constructor.prototype.super.superStack = [];
				
				// Adding the elements to super Object, as they are common.
				Object.common( _constructor.prototype, clonedPrototypes ).removeItem( 'constructor' ).forEach( function( key ) {
					this.prototype.super[ key ] = this.prototype[ key ];
					this.prototype.super.superStack.push( key );
				}, _constructor );
				
				// Changing the constructor to the main constructor.
				_constructor.prototype.constructor = clonedPrototypes.constructor;
				
				// Implementing the prototypes.
				_constructor.implement( clonedPrototypes );
			}
			
			// Interface validation.
			var visualize = object.visualizes || object.implements;
			
			if( visualize ) {
				visualize = Array.isArray( visualize ) && visualize || [ visualize ];
				
				var impl, stc, name, err = 'rEverse.Class(...): %s is not implemented on the "%s" block from interface %s.';
				
				visualize.forEach( function( intf ) {
					impl = intf.Reference.implement,
					 stc = intf.Reference.static;
					
					for( name in impl ) {
						if( InterfaceMap.typeOf( _constructor.prototype[ name ] ) !== impl[ name ] ) 
							throw new TypeError( err.format( name, 'implement', intf.getName() ) );
					}
					
					for( name in stc ) {
						if( InterfaceMap.typeOf( _constructor[ name ] ) !== stc[ name ] ) 
							throw new TypeError( err.format( name, 'static', intf.getName() ) );
					}
				} );
			}
			
			return _constructor;
		},
		
		/** 
		 * Checks whether the provided item is an InterfaceMap Object.
		 * 
		 * @param {anyType} item
		 * @returns {Boolean}
		 */
		
		isInterface: function __isInterface( item ) {
			return item instanceof InterfaceMap;
		}
	} );
	
	// Sets aliases of a Class.
	
	function setAlias( object, prototype ) {
		Object.forEach( object, function( main, alias ) {
			Object.defineProperty( prototype, alias, { enumerable: false, value: prototype[ main ] } );
		} );
	}
	
	// Private functions for HashTable.
	
	// Gets the maximum possible length of a row of an hashtable.
	
	function getLargestLength( object ) {
		var keys = Object.getOwnPropertyNames( object ),
		
		// Setting the first array length to be the largest.
			max = object[ keys.shift() ].length;
		
		keys.forEach( function( key ) {
			var item = object[ key ];
			
			// If the item is an array simply compare the length.
			max = Array.isArray( item ) ? ( item.length > max && max || max ) : ( 1 > max && 1 || max );
		} );
		
		return max;
	}
	
	/**
	 * Creates a table representing the rows with provided keys and elements.
	 * 
	 * Inspired from Java, C++.
	 * 
	 * @param {Number} rowLength 
	 */
	
	window.HashTable = rEverse.Class( {
		// Class name.
		name: 'HashTable',
		
		// Constructor.
		
		constructor: function( rowLength ) {
			this.rowx = Number.isNumber( rowLength ) && Math.abs( rowLength ) || 1;
		},
		
		static: {
			/**
			 * Identifies whether the provided item is a HashTable.
			 * 
			 * @param {anyType} item 
			 */
			
			isHashTable: function __isHashTable( item ) {
				return item instanceof HashTable;
			},
			
			/**
			 * Creates a new HashTable from an object.
			 * 
			 * Note: Pass the items as an array to set multiple items. Single items will be marked as a 1 item array.
			 * 
			 * @param {Object} object 
			 * @returns {HashTable}
			 */
			
			create: function __create( object ) {
				// If the provided object is not a plain object, return an empty table.
				if( !Object.isPlain( object ) ) 
					return new HashTable;
				
				var ht = new HashTable( getLargestLength( object ) ), item;
				
				// Now setting all the items present in the object to 'ht' (HashTable).
				for( var key in object ) {
					item = Array.isArray( object[ key ] ) ? object[ key ] : [ object[ key ] ];
					
					ht.set.apply( ht, [ key ].concat( item ) );
				}
				
				return ht;
			}
		}
	} );
	
	// ***** HASHTABLE IMPLEMENTATION ***** 
	
	HashTable.implement( {
		// The table (Used arrays to store the keys and the values in perfect order).
		table: {
			// Properly ordered keys.
			keys: [],
			
			// Holds the values.
			structure: []
		},
		
		/**
		 * Sets a row to the hashtable.
		 * 
		 * Note: To add more than one elements, pass array on the 'elem' parameter.
		 * Can set an existing entry, rather than updating it.
		 * 
		 * @param {String} key 
		 * @param {anyType | Array} elem 
		 */
		
		set: function __setHashTable( key, elem ) {
			// The key must be defined and should be a string.
			if( !String.isString( key ) ) 
				throw new TypeError( 'HashTable.prototype.set(key, ...): The provided key is null/undefined or is not a string.' );
			
			// If elem is not defined, abort.
			if( elem == null ) 
				return this.size();
			
			elem = Array.isArray( elem ) ? elem : [ elem ];
			
			// Key index.
			var index = this.entryNo( key ), arr = [];
			
			// If the key has not been added before, add it to the keys stack.
			if( index === -1 ) 
				index = this.table.keys.push( key ) - 1;
			else throw new ReferenceError( 'HashTable.prototype.set(key, ...): Attempt to set values to an existed key, "%s". Try update() instead.'.format( key ) );
			
			// Adding the elements.
			for( var i = 0; i < this.rowx; i++ ) 
				arr.push( elem[ i ] != null ? elem[ i ] : null );
			
			// Replaces the current row of the key.
			this.table.structure[ index ] = arr;
			
			return this.size();
		},
		
		get: function __getHashTable( key, column ) {
			// The key must be a string.
			if( !String.isString( key ) ) 
				throw new TypeError( 'HashTable.prototype.get(key, ...): The provided key is null/undefined or not a string.' );
			
			// Default column number is 0.
			column = Number.isNumber( column ) && Math.abs( column ) || 0;
			
			// returning the element.
			return this.table.structure[ this.entryNo( key ) ][ column ];
		},
		
		/**
		 * Returns the whole row of the table identified by the key.
		 * 
		 * @param {String} key 
		 * @returns {Array}
		 */
		
		getX: function __getX( key ) {
			var index = this.entryNo( key );
			
			// If the key does not exist, throw a TypeError.
			if( index === -1 ) 
				throw new ReferenceError( 'HashTable.prototype.getX(key): The provided key does not exist on the key stack.' );
			
			return this.table.structure[ index ];
		},
		
		/**
		 * Returns the whole column of the table identified by the column number.
		 * 
		 * @param {Number} column 
		 * @returns {Array}
		 */
		
		getY: function __getY( column ) {
			column = Number.isNumber( column ) && Math.abs( column ) || 0;
			
			if( column + 1 > this.rowx ) 
				throw new Error( 'HashTable.prototype.getY(column): The provided column number exceeds maximum column stack.' );
			
			// Array to store the values of the Y axis.
			var arr = [];
			
			this.table.structure.forEach( function( col ) {
				arr.push( col[ column ] );
			} );
			
			return arr;
		},
		
		/**
		 * Returns the number of entries on a HashTable.
		 * 
		 * @returns {Number}
		 */
		
		size: function() {
			return this.table.keys.length;
		},
		
		/**
		 * Returns the first position found of the provided item. 
		 * 
		 * Note: If no occurrences found, a negative array will be returned.
		 * 
		 * @param {anyType} item 
		 * @returns {Array}
		 */
		
		position: function __position( item ) {
			var struct = this.table.structure, index;
			
			for( var i = 0; i < struct.length; i++ ) {
				// Searching for the item in every row.
				index = struct[ i ].indexOf( item );
				
				if( index !== -1 ) 
					return [ this.table.keys[ i ], index ];
			}
			
			return [ null, -1 ];
		},
		
		/**
		 * Forces element(s) to a specific position of the table by moving rest of the elements backward.
		 * 
		 * Note: Elements exceeding the row boundary will be spliced and returned as an array.
		 * 
		 * @param {String} key 
		 * @param {Number} column 
		 * @param {anyType} item 
		 * @returns {Array}
		 */
		
		force: function __forceHashTable( key, column, item ) {
			var index = this.entryNo( key );
			
			if( index === -1 ) 
				throw new ReferenceError( 'HashTable.prototype.force(key, ..., ...): The provided key does not exist in the table.' );
			
			column = Number.isNumber( column ) ? Math.abs( column ) : 0;
			
			if( column + 1 > this.rowx ) 
				throw new Error( 'HashTable.prototype.force(..., column, ...): The column number is out of bound.' );
				
			// Preferring null instead of undefined.
			item = Array.isArray( item ) ? item.replace( undefined, null ) : [ item != null ? item : null ];
			
			var arr = this.table.structure[ index ];
			
			return arr.force( column, item ).splice( this.rowx, arr.length - this.rowx );
		},
		
		/**
		 * Returns all the available positions of a certain item in an array.
		 * 
		 * @param {anyType} item 
		 * @returns {Array}
		 */
		
		positionAll: function __positionAll( item ) {
			var struct = this.table.structure, index, 
			positionStack = [];
			
			for( var i = 0; i < struct.length; i++ ) {
				// Searching for the item in every row.
				index = struct[ i ].indexOf( item );
				
				if( index !== -1 ) 
					positionStack.push( [ this.table.keys[ i ], index ] );
			}
			
			return positionStack;
		},
		
		/**
		 * Erases an item (Setting it to null) from the table.
		 * 
		 * @param {String} key 
		 * @param {Number} column 
		 * @returns {HashTable}
		 */
		
		erase: function __erase( key, column ) {
			var index = this.entryNo( key );
			
			// If the key doesn't exist in the key stack, throw new TypeError.
			if( index === -1 ) 
				throw new ReferenceError( 'HashTable.prototype.erase(key, ...): The provided key does not exist in the table.' );
			
			// Default column number is 0 (First column).
			column = Number.isNumber( column ) ? Math.abs( column ) : 0;
			
			if( column + 1 > this.rowx ) 
				throw new Error( 'HashTable.prototype.erase(key, ...): The provided column number is out of bound.' );
			
			this.table.structure[ index ][ column ] = null;
			
			return this;
		},
		
		/**
		 * Erases a whole row of the HashTable.
		 * 
		 * @param {String} key 
		 * @returns {HashTable} 
		 */
		
		eraseX: function __eraseX( key ) {
			var index = this.entryNo( key );
			
			// Non-existed key.
			if( index === -1 ) 
				throw new ReferenceError( 'HashTable.prototype.eraseX(key): The provided key does not exist in the table.' );
			
			// Erasing all the row by setting it to null.
			this.table.structure.fill( null );
			
			return this;
		},
		
		/**
		 * Erases a whole column of the HashTable.
		 * 
		 * @param {String} key 
		 * @returns {HashTable} 
		 */
		
		eraseY: function __eraseY( column ) {
			column = Number.isNumber( column ) ? Math.abs( column ) : 0;
			
			// If column is out of bound.
			if( column + 1 > this.rowx ) 
				throw new Error( 'HashTable.prototype.eraseY(column): The provided column number is out of bound.' );
			
			// For every column.
			this.table.structure.forEach( function( col ) {
				col[ column ] = null;
			} );
			
			return this;
		},
		
		/**
		 * Erases the whole hashtable.
		 * 
		 * @returns {HashTable}
		 */
		
		eraseAll: function __eraseAll() {
			this.table.structure.forEach( function( col ) {
				col.fill( null );
			} );
			
			return this;
		},
		
		/**
		 * Removes a row from the HashTable.
		 * 
		 * @param {String} key 
		 * @returns {HashTable}
		 */
		
		removeX: function __removeX( key ) {
			var index = this.entryNo( key );
			
			if( index === -1 ) 
				throw new ReferenceError( 'HashTable.prototype.removeX(key): The provided key does not exist in the table.' );
			
			// Removing the key form the key stack.
			this.table.keys.remove( index );
			this.table.structure.remove( index );
			
			return this;
		},
		
		/**
		 * Removes the whole column from the HashTable.
		 * 
		 * @param {String} key 
		 * @returns {HashTable}
		 */
		
		removeY: function __removeY( column ) {
			column = Number.isNumber( column ) ? Math.abs( column ) : 0;
			
			if( column + 1 > this.rowx ) 
				throw new Error( 'HashTable.prototype.eraseY(column): The provided column number is out of bound.' );
			
			this.table.structure.forEach( function( col ) {
				col.remove( column );
			} );
			
			// Decreasing total row bound.
			this.rowx--;
			
			return this;
		},
		
		/**
		 * Updates an item on a certain position in the hashtable.
		 * 
		 * @param {String} key 
		 * @param {Number} column 
		 * @param {anyType} item 
		 * @returns {HashTable}
		 */
		
		update: function __update( key, column, item ) {
			var index = this.entryNo( key );
			
			// If the key doesn't exist in the key stack, throw new TypeError.
			if( index === -1 ) 
				throw new ReferenceError( 'HashTable.prototype.erase(key, ...): The provided key does not exist in the table.' );
			
			// Default column number is 0 (First column).
			column = Number.isNumber( column ) ? Math.abs( column ) : 0;
			
			if( column + 1 > this.rowx ) 
				throw new Error( 'HashTable.prototype.erase(key, ...): The provided column number is out of bound.' );
			
			// The existing item on that position.
			var exItem = this.table.structure[ index ][ column ];
			
			// If the provided item is null/undefined, the position on the hashtable won't be updated.
			this.table.structure[ index ][ column ] = item != null ? item : exItem;
			
			return this;
		},
		
		/**
		 * Updates a whole row of the hashtable.
		 * 
		 * @param {String} key 
		 * @param {anyType} items 
		 * @returns {HashTable}
		 */
		
		updateX: function __updateX( key, items ) {
			var index = this.entryNo( key );
			
			if( index === -1 ) 
				throw new ReferenceError( 'HashTable.prototype.erase(key, ...): The provided key does not exist in the table.' );
			
			// Converting non-array 'item' to an array.
			items = Array.isArray( items ) ? items : [ items ];
			
			var currentRow;
			
			for( var i = 0; i < items.length; i++ ) {
				currentRow = this.table.structure[ index ];
				
				// If null/undefined provided, the positions won't be updated.
				currentRow[ i ] = items[ i ] != null ? items[ i ] : currentRow[ i ];
			}
			
			return this;
		},
		
		/**
		 * Updates a column of the hashtable.
		 * 
		 * @param {String} key 
		 * @param {anyType} items 
		 * @returns {HashTable}
		 */
		
		updateY: function __updateY( column, items ) {
			column = Number.isNumber( column ) ? Math.abs( column ) : 0;
			
			if( column + 1 > this.rowx ) 
				throw new Error( 'HashTable.prototype.eraseY(column): The provided column number is out of bound.' );
			
			items = Array.isArray( items ) ? items : [ items ];
			
			this.table.structure.forEach( function( col, index ) {
				col[ column ] = items[ index ] != null ? items[ index ] : col[ column ];
			} );
			
			return this;
		},
		
		/**
		 * Returns the very first element of the hashtable.
		 * 
		 * @returns {anyType}
		 */
		
		first: function __firstHashTable() {
			return this.firstX().first();
		},
		
		/**
		 * Returns the last element of the hashtable.
		 */
		
		last: function __lastHashTable() {
			return this.lastX().last();
		},
		
		/**
		 * Returns the first row/entry.
		 * 
		 * @returns {Array}
		 */
		
		firstX: function __firstX() {
			return this.table.structure.first();
		},
		
		/**
		 * Returns the last row/entry.
		 * 
		 * @returns {Array}
		 */
		
		lastX: function __lastX() {
			return this.table.structure.last();
		},
		
		/**
		 * Returns the very first item of a column identical to the column number.
		 * 
		 * @returns {Array}
		 */
		
		firstY: function __firstY() {
			// Array of elements of a particular column.
			var columnArr = [];
			
			this.table.structure.forEach( function( col ) {
				columnArr.push( col.first() );
			} );
			
			return columnArr;
		},
		
		/**
		 * Returns the last item of a column identical to the column number.
		 * 
		 * @returns {anyType}
		 */
		
		lastY: function __lastY() {
			var columnArr = [];
			
			this.table.structure.forEach( function( col ) {
				columnArr.push( col.last() );
			} );
			
			return columnArr;
		},
		
		/**
		 * Returns the maximum limit of the rows length.
		 */
		
		rowLength: function __rowLength() {
			return this.rowx;
		},
		
		/**
		 * Rehashes (Updates row length) the table.
		 * 
		 * @param {Number} rowLength 
		 * @returns {HashTable}
		 */
		
		rehash: function __rehash( rowLength ) {
			rowLength = Number.isNumber( rowLength ) ? Math.abs( rowLength ) : this.rowx;
			
			if( rowLength > this.rowx ) {
				// Extra items on each row.
				var extra = Array.times( null, rowLength - this.rowx ), struct = this.table.structure, i = 0;
				
				for( ; i < struct.length; i++ ) 
					struct[ i ] = struct[ i ].concat( extra );
			}
			else if( rowLength < this.rowx ) {
				var struct = this.table.structure, i = 0;
				
				for( ; i < struct.length; i++ ) 
					struct[ i ] = struct[ i ].splice( 0, rowLength );
			}
			
			// Setting the provided 'rowLength' to 'this.rowx'.
			this.rowx = rowLength;
			
			return this;
		},
		
		/**
		 * 
		 * 
		 * @param {Function} callback 
		 * @param {Object} context 
		 * @return {HashTable}
		 */
		
		filter: function __filter( callback, context ) {
			
		},
		
		/**
		 * Returns the entry no the provided key. If there is no entry of the key, returns -1.
		 * 
		 * @param {String} key 
		 * @returns {Number}
		 */
		
		entryNo: function __entryNo( key ) {
			return this.table.keys.indexOf( key );
		},
		
		/**
		 * Clears the whole table.
		 * 
		 * @returns {HashTable}
		 */
		
		clear: function __clear() {
			// Clearing the array including all it's references.
			this.table.keys.empty();
			this.table.structure.empty();
			
			return this;
		},
		
		/**
		 * Clones a hashtable.
		 * 
		 * @returns {HashTable}
		 */
		
		clone: function __cloneHashTable() {
			return HashTable.create( this.table.structure.associate( this.table.keys ) );
		}
	} );
	
	// HashTable aliases.
	setAlias( {
		getRow:       'getX',
		getColumn:    'getY',
		eraseRow:     'eraseX',
		eraseColumn:  'eraseY',
		removeRow:    'removeX',
		removeColumn: 'removeY',
		updateRow:    'updateX',
		updateColumn: 'updateY',
		firstRow:     'firstX',
		firstColumn:  'firstY',
		lastRow:      'lastX',
		lastColumn:   'lastY',
		removeAll:    'clear'
	}, HashTable.prototype );
	
	return rEverse;
} );