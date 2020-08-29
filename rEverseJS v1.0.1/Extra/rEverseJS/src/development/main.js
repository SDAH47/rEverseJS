


/**
 * rEverseJS JavaScript library.
 * rEverseJS also called The House Of Manipulator Classes.
 *
 * Written by SD Asif Hossein on 15 September 2018, Saturday.
 *
 * @description Welcome to the world of REVERSE! rEverseJS is kind of library which is full
 * of advanced classes, objects and methods what will manipulate your page and make your page
 * come to your fists. You can able to create a whole page only with a class. Some of the methods
 * are almost same like the jQuery JavaScript library but rEverseJS is pure and not copying
 * jQuery and maintaining policy. These functions are kept for DOM Manipulation as the
 * rEverseJS is a maniulator library.
 *
 * @author SD Asif Hossein
 * @version 1.0.1
 */

/**
 * IF ANYBODY READING THIS FILE IS KINDLY REQUESTED TO NOT TO MODIFY ANYTHING OF IT OR ELSE THAT WILL
 * BE AGAINST OF COPYRIGHT POLICY. THANK YOU.
 */

"use strict";

/**
 *
 * The function is to expose the rEverse class globaly into normal environment and CommonJS
 * environment or Node.js like environment.
 *
 * @param {type} factory
 * @param {type} global
 * @returns {undefined}
 */

( function( factory, global ) {
	// Making the exposing environment under strict.
	"use strict";

	// For CommonJS or Node.js environment.
	typeof exports === "object" && module !== undefined ? module.exports = factory() :
		typeof define === "function" && define.amd ? define( factory() ) :
			// Normal environment exposion.
			Object.defineProperty( global, "rEverse", {
				configurable: false,
				writtable: false,
				enumerable: false,
				value: factory()
			} );
} )( function() {
	// Restricted factory.
	"use strict";

	const info = {
		name: "rEverseJS",
		author: "SD Asif Hossein",
		version: "1.0.1",
		keywords: [ "rEverseJS", "classes", "JavaScript", "client", "browser" ],
		dependencies: {}
	};

	/**
	 * The RJS object holds important methods which is needed to build other functions.
	 * This object is not built for exposements purposes.
	 */

	const RJS = {
		/**
		 * The getPrototype re-defined method will get specific prototype from an
		 * object.
		 */

		getPrototype: Object.getPrototypeOf,

		/**
		 * The hasProperty re-defined method checks if a property is exist in specific
		 * object.
		 */

		hasProperty: Object.hasOwnProperty,

		/**
		 * Just a shortcut for the toString method.
		 */

		string : {}.toString,

		/**
		 * The prop2str will transform the hasProperty into a string with specific
		 * arguments.
		 */

		prop2str: Object.hasOwnProperty.toString,

		/**
		 * The defProp defines properties to an object
		 */

		defProp: Object.defineProperty,

		/**
		 * The following method will add prototypes to a class, inherited from an object.
		 *
		 * @param {Object} proto
		 * @param {Object} object
		 * @returns {Object}
		 */

		addPrototypes: function( proto, object ) {
			var name;					// To pass every property of the object.

			for( name in object ) {
				var modObj = {
					configurable: true,
					enumerable: false,
					writable: true,
					value: object[ name ]
				};

				// Now defining the property.
				this.defProp( proto, name, modObj );
			}
		},

		/**
		 * The following function returns an object transforming a non-enumerable object into
		 * enumerable non-writtable object.
		 *
		 * @param {Object} object
		 * @returns {Object}
		 */

		toEnumObject: function( object ) {
			// This function will only work on simple objects. So, checking is it a simple
			// object or not. If it is, then return an empty, plain and simple object.
			if( typeof object !== "object" || Array.isArray( object ) ) return {};

			// Getting the properties.
			var property = Object.getPrototypeOf( object ),
			keys = Object.getOwnPropertyNames( property ),
			modObj = {},
			enhance;

			// Now adding the properties as enumerable on the modObj object.
			for( enhance of keys ) {
				this.defProp( modObj, enhance, {
					configurable: true,
					writable: true,
					enumerable: true,
					value: property[ enhance ]
				} );
			}

			return modObj;
		}
	};

	/**
	 * Functional 'typeof' returns the type of an element.
	 *
	 * @param {Any_type_of_element} elem
	 * @returns {String}
	 */

	window.$type = function( elem ) {
		// Determining the type.
		var type = typeof elem;

		if( type === "object" ) {
			if( Array.isArray( elem ) )
				return "array";
			else if( $null( elem ) )
				return "null";
			else if( "length" in elem && ( ( elem[ "length" ] - 1 ) in elem || elem[ "length" ] === 0 ) ) {
				if( "caller" in elem && "callee" in elem )
					return "arguments";
				else if( "item" in elem )
					return "collection";

				return "arraylike";
			}
			else if( elem instanceof RegExp )
				return "regexp";
		}

		return typeof elem;
	};

	/**
	 * Checks if the given element is undefined or not.
	 *
	 * @param {Any_type_of_element} elem
	 * @returns {Boolean}
	 */

	window.$undefined = function( elem ) {
		return elem === undefined;
	};

	/**
	 * Checks if the given element is undefined or not.
	 *
	 * @param {Any_type_of_element} elem
	 * @returns {Boolean}
	 */

	window.$defined = function( elem ) {
		return !$undefined( elem );
	};

	/**
	 * Checks if the given element is null or not.
	 *
	 * @param {Any_type_of_element} elem
	 * @returns {Boolean}
	 */

	window.$null = function( elem ) {
		return elem === null;
	};
	
	/**
	 * Implements properties on prototypes.
	 *
	 * @param {String || Object} name
	 * @param {Function} fn
	 */

	Function.prototype.implement = function( name, fn ) {
		// If 'name' is a function (Class Type), then get all the prototypes and implement it.
		if( name instanceof Function ) {
			var obj = name.prototype.clone();
			
			delete obj[ "constructor" ];
			
			return implement( this.prototype, obj );
		}
			
		// Implementing prototypes via implement function.
		return implement( this.prototype, name, fn );
	};

	/**
	 * Adds static type values to a prototype.
	 *
	 * @param {String || Object} name
	 * @param {Function} fn
	 */

	Function.prototype.static = function( name, fn ) {
		// Will be used as static properties on the function object.
		implement( this, name, fn );
	};
	
	// Implementing the extra feature methods on Object.
	// On prototype.
	Object.implement( {
		/**
		 * Extends objects with this object permenantly.
		 *
		 * @returns {Object}
		 */

		extend: function() {
			var OBJ = Object.extend.apply( undefined, [ this ].concat( Array.toArray( arguments ) ) ),
			   name;
			
			for( name in OBJ ) 
				// Merging through 'this' object.
				this[ name ] = OBJ[ name ];
			
			return this;
		},

		/**
		 * Creates a deep extend operation through objects to this object.
		 *
		 * @returns {undefined}
		 */

		superExtend: function() {
			var targets = arguments,
			len = targets.length,
			i = 0;

			for( ; i < len; i++ ) {
				if( Object.isSimpleObject( targets[ i ] ) ) {
					var name;

					for( name in targets[ i ] )
						if( Object.isSimpleObject( targets[ i ][ name ] ) )
							this[ name ] = Object.superExtend( this[ name ], targets[ i ][ name ] );
						else if( Array.isArray( targets[ i ][ name ] ) )
							this[ name ] = Array.merge( this[ name ], targets[ i ][ name ] );
						else this[ name ] = targets[ i ][ name ];
				}
			}

			return this;
		},

		/*
		 * Deletes values from object. Supports multiple deletion.
		 *
		 * @returns {Object}
		 */

		"delete": function() {
			Array.toArray( arguments ).forEach( function( args ) {
				var s = /\s+/g;

				if( s.test( args ) )
					args.split( s ).forEach( function( piece ) {
						delete this[ piece ];
					}, this );
				else delete this[ args ];
			}, this );

			// Returning self.
			return this;
		},

		/**
		 * Cleares the whole object.
		 *
		 * @returns {Object}
		 */

		empty: function() {
			// Clearing every sing properties.
			this.delete.apply( this, Object.getOwnPropertyNames( this ) );

			return this;
		},

		/**
		 * Curtails an object.
		 *
		 * @param {Number} length
		 * @returns {Object}
		 */

		curtail: function( length ) {
			if( length > Object.count( this ) )
				return this;

			// Getting the keys and deleting all of it except keeping the given length of properties.
			Object.getOwnPropertyNames( this ).remove( 0, length ).forEach( function( key ) {
				this.delete( key );
			}, this );

			return this;
		},

		/**
		 * Creates a clone of this object.
		 *
		 * @returns {Object}
		 */

		clone: function() {
			// Taking an object to clone.
			var clone = {};

			// The this objects own properties.
			Object.getOwnPropertyNames( this ).forEach( function( key ) {
				clone[ key ] = this[ key ];
			}, this );

			// Returning the clone.
			return clone;
		},

		/**
		 * Returns any property randomly.
		 *
		 * @returns {Any_type_of_element}
		 */

		random: function() {
			return this[ Object.getOwnPropertyNames( this ).random() ];
		},

		/**
		 * Returns any random values with it's property name.
		 *
		 * @returns {Array}
		 */

		randomProperty: function() {
			var rand = [ this.random() ];
			rand.unshift( this.keyOf( rand.first() ) );

			return rand;
		},

		/**
		 * Returns the key of current value existed.
		 *
		 * @param {Any_type_of_element} value
		 * @returns {String}
		 */

		keyOf: function( value ) {
			var keys = Object.getOwnPropertyNames( this ),
			len = keys.length,
			i = 0;

			for( ; i < len; i++ ) {
				var key = keys[ i ];

				if( this[ key ] === value )
					return key;
			}

			return "";
		},

		/**
		 * Checks if the value is existed is not.
		 *
		 * @param {Any_type_of_element} value
		 * @returns {Boolean}
		 */

		contains: function( value ) {
			return this.key( value ) !== null;
		},

		/**
		 * Maps through an object.
		 *
		 * @param {Function} callback
		 * @param {Object} context
		 * @returns {Object}
		 */

		map: function( callback, context ) {
			//Managing the parameters.
			callback = callback || function() {};
			 context = context || {};
			
			var obj = {};

			Object.getOwnPropertyNames( this ).forEach( function( key ) {
				obj[ key ] = callback.call( context, this[ key ], key, this );
			}, this );

			// Retuerning the maped object.
			return obj;
		},

		/**
		 * Filters through this object.
		 *
		 * @param {Function} fn
		 * @param {Object} context
		 * @returns {Object}
		 */

		filter: function( fn, context ) {
			//Managing the parameters.
			fn      = fn || function() {};
			context = context || {};
			
			var obj = this.clone();

			Object.getOwnPropertyNames( obj ).forEach( function( key ) {
				// Calling the fn and if it returns any false or false like values, delete the value from thi object.
				if( !fn.call( context, this[ key ], key, this ) )
					this.delete( key );
			}, obj );

			return obj;
		},

		/**
		 * Returns a string concating the object values with spcific knot.
		 *
		 * @param {String} knot
		 * @returns {String}
		 */

		join: function( knot ) {
			return Array.toArrayValues( this ).join( String.isString( knot ) ? knot : "" );
		},

		/**
		 * Trims this object by deleting undefined values.
		 *
		 * @returns {Object}
		 */

		trim: function() {
			Object.getOwnPropertyNames( this ).forEach( function( key ) {
				// Delete the key if it is equal to null.
				if( this[ key ] == null )
					this.delete( key );

			}, this );

			return  this;
		},

		/**
		 * Object.reduce
		 *
		 * @param {Function} callback
		 * @param {Any_type_of_values} initialValue
		 * @returns {Any_type_of_values}
		 */

		reduce: function( callback, initialValue ) {
			// If the callback is not a function, then terminate the function and throw a type error.
			if( !Function.isFunction( callback ) )
				throw new TypeError( "Object.reduce expects the first parameter to be a Function, \"" + $type( callback ) + "\" found." );

			// The keys of this object.
			var keys = Object.getOwnPropertyNames( this ),
			accumulator = initialValue != null ? initialValue : this[ keys.shift() ];

			// For every keys.
			keys.forEach( function( key ) {
				accumulator = callback( accumulator, this[ key ], key, this );
			}, this );

			return accumulator;
		},

		/**
		 * Checks every values match by providing an executable callback.
		 *
		 * @param {Function} fn
		 * @param {Object} context
		 * @returns {Boolean}
		 */

		some: function( fn, context ) {
			//Managing the parameters.
			fn = fn || function() {},
			context = context || {};

			var bool = true;

			Object.getOwnPropertyNames( this ).forEach( function( key ) {
				// Now checking all the filtered properties are existed or not. If not, return false.
				if( !fn.call( context, this[ key ], key ) ) {
					bool = false;

					// Break the operation.
					return;
				}
			} );

			return bool;
		}
	} );

	// Implementing the statics.
	Object.static( {
		/**
		 * The following method will return true if the parameter is an object or else false.
		 *
		 * @param {type} object
		 * @returns {Boolean}
		 */

		isObject: function( object ) {
			return $defined( object ) && typeof object === "object";
		},

		/**
		 * The following method will return true if the parameter is an simple
		 * object or else false.
		 *
		 * Note:- We all know array is an object. The isSimpleObject() checks if
		 * the given object is an object and is not an array. Returns true if the
		 * object is not an array and an object.
		 *
		 * @param {type} object
		 * @returns {Boolean}
		 */

		isSimpleObject: function( object ) {
			return Object.isObject( object ) && !Array.isArray( object );
		},

		/**
		 * The extendObject() method returns an modified object basing on given objects.
		 * The method merges the other given object properties to the target object
		 * (First Parameter) and returns it.
		 *
		 * @returns {Object}
		 */

		extend: function() {
			var targets = arguments,
			len = targets.length,
			i = 0,
			obj = {};

			for( ; i < len; i++ ) {
				// If given objects are simple objects, merge it.
				if( Object.isSimpleObject( targets[ i ] ) ) {
					var name;

					for( name in targets[ i ] )
						obj[ name ] = targets[ i ][ name ];			// Merging the properties.
				}
			}

			return obj;
		},

		/**
		 * Returnes an object creating deep copy of given objects on the parameter.
		 *
		 * @returns {Object}
		 */

		superExtend: function() {
			var targets = arguments,
			len = targets.length,
			i = 0,
			obj = {};

			for( ; i < len; i++ ) {
				if( Object.isSimpleObject( targets[ i ] ) ) {
					var name;

					for( name in targets[ i ] )
						if( Object.isSimpleObject( targets[ i ][ name ] ) )
							obj[ name ] = Object.superExtend( obj[ name ], targets[ i ][ name ] );
						else if( Array.isArray( targets[ i ][ name ] ) )
							obj[ name ] = Array.merge( obj[ name ], targets[ i ][ name ] );
						else obj[ name ] = targets[ i ][ name ];
				}
			}

			return obj;
		},

		/**
		 * Checks if the given object is empty or not.
		 *
		 * @param {Object} object
		 * @returns {Boolean}
		 */

		isEmpty: function( object ) {
			// Any simple object is allowed.
			return Object.isSimpleObject( object ) ? Array.isEmpty( Object.getOwnPropertyNames( object ) ) : false;
		},

		/**
		 * Curtails objects to the given number. The given number is the length to keep the values.
		 *
		 * @returns {Object}
		 */

		curtail: function() {
			// If the first argument is not a integer number, throw a TypeError.
			if( !Number.isInteger( arguments[ 0 ] )  )
				throw new TypeError( "Object.curtail accepts the first parameter as an interger number, \"" + arguments[ 0 ] + "\" given" );

			// Taking a copy.
			var targets = arguments,
			len = targets.length,
			oLen = targets[ 0 ];

			// If arguments length is 2, do stuffs with only one object.
			if( len === 2 ) {
				var objct = targets[ 1 ];

				if( oLen > Object.count( objct ) )
					return objct;

				var i = 0,
				obj = {},
				name;

				for( name in objct ) {
					// If i is equal to oLen, stop adding.
					if( i++ === oLen ) break;

					obj[ name ] = objct[ name ];
				}

				return obj;
			}

			// If the arguments length is greater than 2, take an array to stored curtailed objects and return it.
			else if( len > 2 ) {
				var nArr = [],
				i = 1;

				for( ; i < len; i++ ) {
					var trgt = targets[ i ];

					if( oLen > Object.count( trgt ) )
						nArr.push( trgt );
					else {
						var x = 0,
						obj = {},					// Object for modification.
						name;					// Name to pass every property names.

						for( name in trgt ) {
							if( x++ === oLen ) break;

							obj[ name ] = trgt[ name ];
						}

						// Now pushing the modified object.
						nArr.push( obj );
					}
				}

				return nArr;
			}

			// By default, returning an empty object.
			return {};
		},

		/**
		 * Counts an object and returns the length.
		 *
		 * Note:- Function works like class constructor and works like an object. So, this method also counts the
		 * length of the properties defined on any function.
		 *
		 * @param {Object || Function} object
		 * @returns {Number}
		 */

		count: function( object ) {
			// Now returning the object length by gathering own object properties length.
			return Object.isObject( object ) || Function.isFunction( object ) ? Object.getOwnPropertyNames( object ).length : null;
		},

		/**
		 * Checks for a plain object.
		 *
		 * @param {Object} object
		 * @returns {Boolean}
		 */

		isPlainObject: function( object ) {
			// Checking it the object parameter is actually an object or not or
			// is it undefined or not. If it is, then return false.

			// A plain object is just a simple custom object like this {}.

			// Object created from a class holds a constructor and is not a plain
			// object.

			if( !object || RJS.string.call( object ) !== "[object Object]" || !Object.isSimpleObject( object ) )
				return false;

			var objPrototype = RJS.getPrototype( object );

			// If there is no prototype then it's a plain object.
			// So, return will be true.

			if( !objPrototype )
				return true;

			var objConstructor = RJS.hasProperty.call( objPrototype, "constructor" ) &&
				// If constructor found.
				objPrototype.constructor;

			// Now using the basic return if any prototype found.
			return Function.isFunction( objConstructor ) && RJS.prop2str.call( objConstructor ) === RJS.prop2str.call( Object );
		},

		/**
		 * Clones any objects prototypes.
		 *
		 * @param {Object} object
		 * @returns {Object}
		 */

		clonePrototypes: function( object ) {
			return Object.getPrototypeOf( object ).clone();
		}
	} );

	// Adding extra prototype methods to Array.
	Array.implement( {
		/**
		 * Removes values from given index to quantity.
		 *
		 * @param {type} index
		 * @param {type} quantity
		 * @returns {Array}
		 */

		remove: function( index, quantity ) {
			this.splice( index, quantity || 1 );
			return this;
		},

		/**
		 * Removes multiple elements with specific index provided.
		 *
		 * @returns {Array}
		 */

		removeMultiple: function() {
			Array.toArray( arguments ).filter( function( val ) {
				return Number.isNumber( val );
			} ).sort().reverse().forEach( function( index ) {
				this.remove( index );
			}, this );

			return this;
		},

		/**
		 * Merges the provided arrays to this array object.
		 *
		 * @returns {Array}
		 */

		merge: function() {
			Array.toArray( arguments ).forEach( function( elem ) {
				elem = Array.isArray( elem ) ? elem : [];

				// For every values in the array.
				elem.forEach( function( value ) {
					this.push( value );
				}, this );
			}, this );

			// Returning the modified array.
			return this;
		},

		/**
		 * Merges the provided arrays to this array object. Existing element won't be merged.
		 *
		 * @returns {Array}
		 */

		superMerge: function() {
			Array.toArray( arguments ).forEach( function( elem ) {
				elem = Array.isArray( elem ) ? elem : [];

				// For every values in the array.
				elem.forEach( function( value ) {
					this.include( value );
				}, this );
			}, this );

			// Returning the modified array.
			return this;
		},

		/**
		 * Makes this array empty.
		 *
		 * @returns {Array}
		 */

		empty: function() {
			// Removing all elements by changing the length to 0.
			this.length = 0;

			return this;
		},

		/**
		 * Trims an array.
		 *
		 * @returns {Array}
		 */

		trim: function() {
			this.keys().forEach( function( key ) {
				// Removing the null or undefined values.
				if( this[ key ] == null )
					this.remove( key );
			}, this );

			return this;
		},

		/**
		 * Erases given elements if it's defined in the array.
		 *
		 * @returns {Array}
		 */

		erase: function() {
			Array.toArray( arguments ).forEach( function( value ) {
				if( this.has( value ) )
					this.remove( this.indexOf( value ) );
			}, this );

			return this;
		},

		/**
		 * Returns the first element.
		 *
		 * @returns {Any_type_of_element}
		 */

		first: function() {
			return this[ 0 ];
		},

		/**
		 * Returns the last element.
		 *
		 * @returns {Any_type_of_element}
		 */

		last: function() {
			return this[ this.length - 1 ];
		},

		/**
		 * Returns element randomly.
		 *
		 * @returns {Any_type_of_element}
		 */

		random: function() {
			return this[ ( Math.random() * this.length ).toInt() ];
		},

		/**
		 * Includes an element if array does not have it.
		 *
		 * @returns {Array}
		 */

		include: function() {
			Array.toArray( arguments ).forEach( function( value ) {
				if( !this.contains( value ) )
					this.push( value );
			}, this );

			return this;
		},

		/**
		 * Checks for the existance of the given value.
		 *
		 * @param {Any_type_of_element} value
		 * @returns {Boolean}
		 */

		contains: function( value ) {
			return this.indexOf( value ) > -1;
		},

		/**
		 * Plain object works as an associative array. Creates an associative array(Plain Object with keys)
		 * with values of an array.
		 *
		 * @param {type} keys
		 * @returns {Object}
		 */

		associate: function( keys ) {
			keys = !Array.isArray( keys ) ? String.isString( keys ) && keys.split( /\s+/g ) || [] : keys;

			// An object for modification.
			var obj = {},
			len = Math.min( keys.length, this.length ) >>> 0,
			i = 0;

			for( ; i < len; i++ )
				obj[ keys[ i ] ] = this[ i ];

			return obj;
		},

		/**
		 * Clones an array.
		 *
		 * @returns {Array}
		 */

		clone: function() {
			var arr = [];

			this.forEach( function( value ) {
				arr.push( value );
			} );

			return arr;
		}
	} );

	// Adding statics to array.
	Array.static( {
		/**
		 * Transforms an array like object to an array.
		 *
		 * @param {Object} object
		 * @param {Number} slice
		 * @returns {Array}
		 */

		toArray: function( object, slice ) {
			return Array.prototype.slice.call( object, slice );
		},

		/**
		 * Transforms an object values to an array.
		 *
		 * @param {Object} object
		 * @returns {Array}
		 */

		toArrayValues: function( object ) {
			var nArr = [];

			Object.getOwnPropertyNames( object ).forEach( function( key ) {
				nArr.push( object[ key ] );
			}, this );

			return nArr;
		},

		/**
		 * Merges through the given arrays and and merges the existing element.
		 *
		 * @returns {Array}
		 */

		merge: function() {
			var arr = [];

			Array.toArray( arguments ).forEach( function( elem ) {
				elem = Array.isArray( elem ) ? elem : [];

				// For every values in the array.
				elem.forEach( function( value ) {
					arr.include( value );
				} );
			} );

			// Returning the modified array.
			return arr;
		},

		/**
		 * Transforms an array to an array like object.
		 *
		 * @param {Array} array
		 * @returns {Object}
		 */

		toObject: function( array ) {
			if( $undefined( array ) || !Array.isArray( array ) )
				return {};

			// Object for modification.
			var obj = {},

			// The array keys.
			keys = array.keys(),
			key;

			while( !( key = keys.next() ).done )
				obj[ key.value ] = array[ key.value ];

			// Setting the length.
			obj.length = array.length;

			return obj;
		},

		/**
		 * Checks of empty array.
		 *
		 * @param {Array} arr
		 * @returns {Boolean}
		 */

		isEmpty: function( arr ) {
			return Array.isArray( arr ) ? arr.length === 0 : false;
		},

		/**
		 * Checks for an array or any array like object.
		 *
		 * @param {Object} object
		 * @returns {Boolean}
		 */

		isArrayLike: function( object ) {
			return Object.isObject( object ) && "length" in object && ( ( object[ "length" ] - 1 ) in object || object[ "length" ] === 0 );
		}
	} );

	// Adding prototypes to the Number class.
	Number.implement( {
		/**
		 * Parses number to int.
		 *
		 * Note:- This method does not round floats.
		 *
		 * @returns {Number}
		 */

		toInt: function() {
			return parseInt( this );
		},

		/**
		 * Rounds this number same as Math.round.
		 *
		 * @returns {Number}
		 */

		round: function() {
			return Math.round( this );
		},

		/**
		 * Transforms a number to a float.
		 *
		 * @returns {Number}
		 */

		toFloat: function() {
			return parseFloat( this );
		}
	} );

	// Adding statics to Number.
	Number.static( {
		/**
		 * Checks if the giben parameter is a Number or not.
		 *
		 * @param {Any_type_of_element} num
		 * @returns {Boolean}
		 */

		isNumber: function( num ) {
			return $defined( num ) && $type( num ) === "number";
		},

		/**
		 * Checks if the giben parameter is a Float type number or not.
		 *
		 * @param {Any_type_of_element} num
		 * @returns {Boolean}
		 */

		isFloat: function( num ) {
			return !Number.isInteger( num );
		}
	} );

	// Implementing prototypes on Function class.
	Function.implement( {
		/**
		 * Calls a function without triggering any error.
		 *
		 * @param {Array} args
		 * @param {Object} context
		 * @returns {Any_type_of_value}
		 */

		attempt: function( args, context ) {
			try {
				return this.apply( context, args );
			} catch( exception ) {}
		},

		/**
		 * Creates a timeout to call a function after a period of time.
		 *
		 * @returns {Number}
		 */

		wait: function() {
			var args = Array.toArray( arguments ),
			time = args.shift();

			// Fixing the time.
			time = Number.isNumber( time ) ? time : 0;

			return setTimeout( this.bind.apply( this, [ null ].concat( args ) ), time );
		},
		
		/**
		 * Extends a specific class. Does not support multiple inheritance.
		 *
		 * @param {Function} Class
		 * @returns {Boolean}
		 */
		
		extend: function( Class ) {
			// Saving the past prototype, so that the constructor does not change.
			var clone = Object.prototype.clone.call( this.prototype );
			
			this.prototype = Class.prototype;
			
			return this.implement( clone );
		}
	} );

	// Implementing statics on Function.
	Function.static( {
		/**
		 * Checks is the given parameter is a function or not.
		 *
		 * @param {Any_type_of_element} func
		 * @returns {Boolean}
		 */

		isFunction: function( func ) {
			return $defined( func ) && $type( func ) === "function";
		},

		/**
		 * Creates a function which returns the given parameter.
		 *
		 * @param {Any_type_of_element} thing
		 * @returns {Function}
		 */

		create: function( thing ) {
			// Returning a function which returns 'thing'.
			return Function.isFunction( thing ) ? thing : function() {
				return thing;
			};
		},

		/**
		 * Calls funtions without triggering any error.
		 *
		 * @returns {undefined}
		 */

		attempt: function() {
			Array.toArray( arguments ).forEach( function( fn ) {
				try {
					fn();
				} catch( exception ) {}
			} );
		}
	} );

	// Holds string implementations.
	String.implement( {
		/**
		 * Tests a regexp with a string. Reverse method of RegExp.prototype.test()
		 *
		 * @param {Object} reg
		 * @param {Array} params
		 * @returns {Boolean}
		 */

		test: function( reg, params ) {
			return ( RegExp.isRegExp( reg ) ? reg : /* Assuming a string */ new RegExp( "" + reg, params ) ).test( this );
		},

		/**
		 * Determines whether a string is contained or not.
		 *
		 * @param {String} string
		 * @returns {Boolean}
		 */

		contains: function( string ) {
			return $defined( string ) && this.indexOf( string ) > -1;
		},

		/**
		 * Capitalizes all the contained words first letter.
		 *
		 * @returns {String}
		 */

		capitalizeEach: function() {
			return String( this ).replace( /\b[a-z]/g, function( match ) {
				return match.toUpperCase();
			} );
		},

		/**
		 * Capitalizes the first words first letter.
		 *
		 * @returns {String}
		 */

		capitalize: function() {
			var i = 0;

			return String( this ).replace( /\b[a-z]/g, function( match ) {
				if( i === 0 ) {
					// We no longer need to capitalize.
					i++;

					return match.toUpperCase();
				}

				return match;
			} );
		},
		
		/**
		 * Removes a String or RegExp.
		 * 
		 * @param {String || RegExp} node 
		 */
	
		remove: function( node ) {
			return String( this ).replace( node, "" );
		},

		/**
		 * Parses a string to a integer.
		 *
		 * @param {Number} radix
		 * @returns {Number}
		 */

		toInt: function( radix ) {
			return parseInt( this, radix );
		},

		/**
		 * Parses a string to a float.
		 *
		 * @returns {Number}
		 */

		toFloat: function() {
			return parseFloat( this );
		},

		/**
		 * Cleans the string.
		 *
		 * @returns {String}
		 */

		clean: function() {
			return String( this ).replace( /\s+/g, " " ).trim();
		},

		camelCase: function() {
			return String( this ).replace( /-\D/g, function( match ) {
				return match.charAt( 1 ).toUpperCase();
			} );
		}
	} );

	// Adding some statics.
	String.static( {
		/**
		 * Checks if the given element is a string or not. Returns boolean.
		 *
		 * @param {String} string
		 * @returns {Boolean}
		 */

		isString: function( string ) {
			return $type( string ) === "string";
		},

		/**
		 * Checks for an empty string.
		 *
		 * @param {String} str
		 * @returns {Boolean}
		 */

		isEmpty: function( str ) {
			return String.isString( str ) && str.length === 0;
		},

		/**
		 * Checks for a character.
		 *
		 * @param {String} str
		 * @returns {Boolean}
		 */

		isCharacter: function( str ) {
			return String.isString( str ) && str.length === 1;
		},

		/**
		 * Splits a string adding hyphens on the uppercase letters, turning them to lower case.
		 *
		 * @param {String} string
		 * @returns {unresolved}
		 */

		hyphenate: function( string ) {
			return string.replace( /[A-Z]/g, function( match, index, str ) {
				return "-" + match.toLowerCase();
			} );
		}
	} );

	Boolean.static( {
		/**
		 * Checks for a boolean.
		 *
		 * @param {Boolean} bool
		 * @returns {Boolean}
		 */

		isBoolean: function( bool ) {
			return $type( bool ) === "boolean";
		}
	} );

	// Holds isRegExp.
	RegExp.static( {
		/**
		 * Checks for a RegExp.
		 *
		 * @param {Boolean} reg
		 * @returns {Boolean}
		 */

		isRegExp: function( reg ) {
			return $type( reg ) === "regexp";
		}
	} );

	// The global implement method used by the classes.
	function implement( proto, name, thing ) {
		// If name is string and func is a function, then implement it on the prototype.
		if( $type( name ) === "string" ) {
			RJS.defProp( proto, name, {
				configurable: true,
				writtable: false,
				enumerable: false,
				value: thing
			} );
		}

		// Else if the 'name' is an object, extend it.
		else if( $type( name ) === "object" ) {
			RJS.addPrototypes( proto, name );
		}
		
		return true;
	}

	/**
	 * This utility object holds the main utility methods of rEverseJS.
	 */

	const utility = {};

	implement( utility, {
		/**
		 *
		 * The following function will create an array according to the given parameter
		 * command.
		 *
		 * @param {Number || Character} from
		 * @param {Number || Character} destination
		 * @param {Number} increament
		 * @returns {Array}
		 */

		range: function( from, destination, increament ) {
			var sarr = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',	// Array of lowercase characters.
				'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ],
			carr = [],
			enhance;

			for( enhance of sarr ) {
				carr.push( enhance.toUpperCase() );
			}

			if( !destination ) console.error( "rEverse.Utility.arrayRange():- The destination parameter is needed!" );

			var bool;

			if( String.isCharacter( from ) ) bool = true;						// If it the from is a character type
			else if( Number.isNumber( from ) ) bool = false;						// If the from is number type
			else console.error( "rEverse.Utility.arrayRange():- Unsupported type in parameter from." );

			if( bool && !!!String.isCharacter( destination ) || !bool && String.isCharacter( destination ) )
				return -1;

			increament = increament || 1;

			if( bool ) {
				if( carr.indexOf( from ) > -1 ) {
					if( sarr.indexOf( destination ) > -1 ) return null;

					var nArr = [],
					i = carr.indexOf( from ),
					to = carr.indexOf( destination ) + 1;

					for( ; i < to; i += increament ) {
						nArr.push( carr[ i ] );
					}

					return nArr;								// Returning the modified array.
				}
				else if( sarr.indexOf( from ) > -1 ) {
					if( carr.indexOf( destination ) > -1 ) return null;

					var nArr = [],
					i = sarr.indexOf( from ),
					to = sarr.indexOf( destination ) + 1;

					for( ; i < to; i += increament ) {
						nArr.push( sarr[ i ] );
					}

					// Returning the modified array.
					return nArr;
				}
			} else {
				var nArr = [];

				for( var i = from; i <= destination; i += increament ) {
					nArr.push( i );
				}

				return nArr;
			}

			return [];
		},
		
		/**
		 * Creates a impact between two booleans like positive (+) with negative (-).
		 * 
		 * @param {Boolean} bool_1 
		 * @param {Boolean} bool_2 
		 */
		
		impact: function( bool_1, bool_2 ) {
			if( bool_1 && bool_2 ) 
				return true;
			else if( !bool_1 && !bool_2 ) 
				return true;
		
			return false;
		},

		/**
		 * The following method will return an Object modified by
		 * defaultObject;
		 *
		 * @returns {Number || Object || Array}
		 */

		bolt: function() {
			var defaultCopy = arguments[ 0 ],					// In that case not taking any passed parameters;
			targets = arguments,
			len = targets.length,
			i = 1;									// Taking i as 1 because 0 is the default copy;

			if( !targets[ 1 ] ) return -1;

			if( len === 2 ) {
				var obj = {};			// Will return the object after beign modified;

				for( var i = 1; i < len; i++ ) {
					var name;

					if( !defaultCopy )
						return null;

					for( name in defaultCopy ) {
						if( !( name in targets[ i ] ) )
							obj[ name ] = defaultCopy[ name ];
					}
				}

				return obj;
			}
			else if( len > 2 ) {								// Need to set an array if arguments length is more than 2;
				var arr = [];

				for( ; i < len; i++ ) {
					var name;

					if( !defaultCopy )
						arr.push( null );

					for( name in defaultCopy ) {
						if( !( name in targets[ i ] ) )
							targets[ i ][ name ] = defaultCopy[ name ];
					}

					arr.push( targets[ i ] );
				}

				return arr;
			}


			return defaultCopy;
		},

		/**
		 * Returns everything inside a enumerable variable.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {String}
		 */

		reveal: function( element ) {
			// Taking a string to modify and return.
			var string = "";

			if( String.isString( element ) ) {
				if( String.isCharacter( element ) )
					string = string.concat( "TYPE(Character), '" + element + "';" );
				else string = string.concat( "TYPE(String), String(" + element.length + "), \"" + element + "\";" );
			}
			else if( Number.isNumber( element ) ) {
				// If its an float number then, set the type into float.
				if( this.isFloat( element ) ) {
					var numArr = element.toString().split( "." );
					string = string.concat( "TYPE(Number), Float(" + numArr[ 0 ].length + ( this.isDefined( numArr[ 1 ] ) ? ", " + numArr[ 1 ].length : "" ) + "), " + element + ";" );
				} else string = string.concat( "TYPE(Number), Integer(" + element.toString().length + "), " + element + ";" );
			}
			else if( $undefined( element ) ) string = string.concat( "TYPE(undefined);" );
			else if( $null( element ) ) string = string.concat( "TYPE(null);" );
			else if( Function.isFunction( element ) )
				string = string.concat( "TYPE(Function), " + ( element.name.length === 0 ? "[ANONYMOUS]" : element.name ) + "(" + element.length + "), function() { [CODE] };" );
			else if( Boolean.isBoolean( element ) )
				string = string.concat( "TYPE(Boolean), " + element + ";" );
			else if( Object.isObject( element ) ) {
				if( Object.isSimpleObject( element ) ) {
					if( Object.isPlainObject( element ) ) {
						// Name to pass as athe property key.
						var substr = "",
						name;

						for( name in element ) {
							substr = substr.concat( ", \"" + name + "\": " + this.reveal( element[ name ] ).replace( ";", "" ) );
						}

						var objName = RJS.string.call( element ).replace( "[object ", "" ).replace( "]", "" );

						string  = string.concat( "TYPE(Object), " + objName + "(" + this.count( element ) + "), { " + substr.slice( 2 ) + " };" );
					}
					else if( RJS.string.call( element ) !== "[object Object]" ) {
						var objName = RJS.string.call( element ).replace( "[object ", "" ).replace( "]", "" );
						string = string.concat( "TYPE(Object), " + objName + "(1), " + element + ";" );
					} else {
						element = RJS.toEnumObject( element );

						var substr = "",
						name;

						for( name in element ) {
							substr = substr.concat( ", \"" + name + "\": " + this.reveal( element[ name ] ).replace( ";", "" ) );
						}

						var objName = RJS.string.call( element ).replace( "[object ", "" ).replace( "]", "" );

						string  = string.concat( "TYPE(Object), " + objName + "(" + this.count( element ) + "), { " + substr.slice( 2 ) + " };" );
					}
				} else {
					var substr = "";

					for( var i = 0, len = element.length; i < len; i++ ) {
						substr = substr.concat( ", [" + i + "] => " + this.reveal( element[ i ] ).replace( ";", "" ) );
					}

					string = string.concat( "TYPE(Array), Array(" + element.length + "), [ " + substr.slice( 2 ) + " ];" );
				}
			}

			return string;
		},

		/**
		 * The docEval() method evaluates given script to the document body.
		 *
		 * @param {String} codeString
		 * @param {Object} doc
		 * @returns {undefined}
		 */

		docEval: function( codeString, doc ) {
			doc = doc || document;

			var script = document.createElement( "script" );

			script.text = codeString;

			// Now adding it and removing it.
			doc.body.appendChild( script ).parentNode.removeChild( script );
		},

		toString: function( /* No Radix */ ) {
			return "[object rEverse.Utility]";
		}	// END
	} );



utility.extendObject = function() {};




	/**
	 * The vector class of the rEverseJS. Holds elements according to the limit. The elements can not be
	 * added crossing the limit. In one word vector is the full time manipulator of the elements.
	 *
	 * @param {Number} limit
	 */

	const vector = function( limit ) {
		//As vector is a class to manipulate the array, so
		//making a array to use as the main structure of vector.
		this.arr = [];
		this.limitx = limit || 10;
	};

	/**
	 * Configuration for the vector class and may be change over versions.
	 */

	var vector_configuration = {
		constructor: vector,
		version: vector.version = info.version
	};

	RJS.addPrototypes( vector.prototype, utility.extendObject( vector_configuration, {
		/**
		 * The following function will add given element to the vector class according
		 * to the limit. If the limit is crossing it will prevent adding elements.
		 *
		 * @param {Any_type_of_element} element
		 * @param {Boolean} err
		 * @returns {Boolean}
		 */

		addElement: function( element, err ) {
			//Fixing the error element.
			err = err || false;

			//Checking the limit of the vector array.
			//If the array limit is exceeding, then it won't add any element.
			//Else element will be successfull added.
			if( this.limitx > this.size() ) {
				this.arr.push( element );
				return true;
			} else if( err ) console.error( "rEverse.Vector.addElement():- The number of vector elements are crossing limits." );

			return false;
		},

		/**
		 * The following function will add given element to the vector class inversely
		 * according to the limit. If the limit is crossing it will prevent adding elements.
		 *
		 * @param {Any_type_of_element} element
		 * @param {Boolean} err
		 * @returns {Boolean}
		 */

		addElementInverse: function( element, err ) {
			//Fixing the error element.
			err = err || false;

			//Checking the limit of the vector array.
			//If the array limit is exceeding, then it won't add any element.
			//Else element will be successfull added inversely.
			if( this.limitx > this.size() ) {
				this.arr.unshift( element );
				return true;
			} else if( err ) console.error( "rEverse.Vector.addElementInverse():- The number of vector elements are crossing limits." );

			return false;
		},

		/**
		 * The addMultipleElements() function adds multiple elements to the vector class.
		 * If the limit exceeds, it will stop adding elements.
		 *
		 * Note:- If all the elements are successfully added it will return true.
		 *
		 * @returns {Boolean}
		 */

		addMultipleElements: function() {
			var targets = arguments,
			len = targets.length,
			i = 0;

			for( ; i < len; i++ ) {
				if( !this.addElement( targets[ i ] ) ) {
					console.error( "rEverse.Vector.addMultipleElements():- The number of vector elements are crossing limits." );
					return false;
				}
			}

			return true;
		},

		/**
		 * Same as the addMultipleElement() method but it adds elements inversely to the vector class.
		 *
		 * @returns {Boolean}
		 */

		addMultipleElementsInverse: function() {
			var targets = arguments,
			len = targets.length,
			i = 0,
			nArr = [];

			for( ; i < len; i++ ) {
				nArr.unshift( targets[ i ] );
			}

			var enhance;

			for( enhance of nArr ) {
				if( !this.addElementInverse( enhance ) ) {
					console.error( "rEverse.Vector.addMultipleElementsInverse():- The number of vector elements are crossing limits." );
					return false;
				}
			}

			return true;
		},

		/**
		 * Same as the addMultipleElements() method but it adds elements inversely to the vector class
		 * inversed.
		 *
		 * @returns {Boolean}
		 */

		addMultipleElementsII: function() {
			var targets = arguments,
			len = targets.length,
			i = 0;

			for( ; i < len; i++ ) {
				if( !this.addElementInverse( targets[ i ] ) ) {
					console.error( "rEverse.Vector.addMultipleElementsII():- The number of vector elements are crossing limits." );
					return false;
				}
			}

			return true;
		},

		/**
		 * The following function will return the total size of the vector.
		 *
		 * @returns {Number}
		 */

		size: function() {
			return this.arr.length;
		},
	
		/**
		 * The getElement() method is to get the specified element from the vector class.
		 *
		 * @param {type} index
		 * @returns {Any_type_of_element}
		 */

		getElement: function( index ) {
			if( $undefined( index ) || !utility.isInteger( index ) || index < 0 )
				return this.lastElement();

			//Now returning the specified element.
			if( index + 1 <= this.size() )
				return this.arr[ index ];
			else console.error( "rEverse.Vector.getElement():- The given element index is out of bound." );
		},

		/**
		 * The following method getMultipleElements() returns specified selected elements from the
		 * vector and returns it.
		 *
		 * @returns {Any_type_of_element || Array}
		 */

		getMultipleElements: function() {					//Passed by the arguments.
			var targets = arguments,
			len = targets.length;

			if( len === 0 ) return this.getElement();
			else if( len === 1 ) return this.getElement( targets[ 0 ] );
			else {
				var i = 0,
				arr = [];

				for( ; i < len; i++ ) {
					arr.push( this.getElement( targets[ i ] ) );
				}

				return arr;
			}

			return [];
		},

		/**
		 * The following static method createVector() creates an vector with specified parameters.
		 *
		 * @returns {rEverse.Vector}
		 */

		createVector: vector.createVector = function() {
			var targets = arguments,
			len = targets.length,
			firstTarget = targets[ 0 ];

			//The vector
			var vect = new vector( len );

			//Checking the length and thus doing operations.
			if( len === 1 ) {
				if( Array.isArray( firstTarget ) ) {
					var enhance;

					//Resetting the limit.
					vect.limit( firstTarget.length );

					for( enhance of firstTarget ) {
						vect.addElement( enhance );
					}
				}
				else if( Object.isPlainObject( firstTarget ) ) {
					//Resetting the limit.
					vect.limit( Object.count( firstTarget ) );

					var name;

					for( name in firstTarget ) {
						vect.addElement( firstTarget[ name ] );
					}
				}
				else vect.addElement( firstTarget );
			}
			else if( len > 1 ) {
				var i = 0;

				for( ; i < len; i++ ) {
					vect.addElement( targets[ i ] );
				}
			}

			return vect;
		},

		/**
		 * The removeElement() method removes an element from the vector class.
		 *
		 * @param {Number} index
		 * @param {Number} range
		 * @returns {Boolean}
		 */

		removeElement: function( index, range ) {
			//If the index as well as the range is defined, then remove the element starting at
			//the index tor the range.
			if( $defined( this.arr[ index ] ) && range ) {
				this.splice( index, range );
				return true;
			}
			else if( $defined( this.arr[ index ] ) && !!!range ) {
				//Now removing the element without the range.
				this.splice( index, 1 );
				return true;
			} else console.error( "rEverse.Vector.removeElement():- The given array index is out of bound" );

			return false;
		},

		/**
		 * The removeMultipleElements() removes multiple elements from the vector class.
		 *
		 * @returns {Boolean}
		 */

		removeMultipleElements: function() {
			//Making the targets array, sorting them and reversing them, just
			//because if the first placed elements are removed, then the bigger number
			//will fail to do their operations, cause they will be out of bound.

			var targets = Array.toArray( arguments ).sort().reverse(),
			len = targets.length,
			i = 0;

			//Because of returning stuffs.
			var bool = true;

			//If no arguments found, then return false.
			if( len === 0 ) return false;

			//Now removing the elements manually
			for( ; i < len; i++ ) {
				//If the given index is bounded, then it will remove the elements.
				if( targets[ i ] + 1 <= this.size() ) {
					if( !this.removeElement( targets[ i ] ) )
						bool = false;
				}
			}

			return bool;
		},

		/**
		 * The following backshift() method removes the last element of the vector and returns it.
		 *
		 * @returns {Any_type_of_element}
		 */

		backshift: function() {
			//Getting the last element and returning it.
			return this.splice( this.size() - 1, 1 );
		},

		/**
		 * The following shift() method removes the first element of the vector and returns it.
		 *
		 * @returns {Any_type_of_element}
		 */

		shift: function() {
			//Getting the first element and returning it.
			return this.splice( 0, 1 );
		},

		/**
		 * The following reverse() method reverses the whole vector.
		 *
		 * @returns {rEverse.Vector}
		 */

		reverse: function() {
			this.arr.reverse();

			//Returning the window.
			return this;
		},

		/**
		 * Sorts the vector this specific function callback.
		 *
		 * @param {Function} callback
		 * @returns {rEverse.Vector}
		 */

		sort: function( callback ) {
			this.arr.sort( callback );
			return this;
		},

		/**
		 * The following hasElement() method checks if the given element as a parameter is exist in
		 * vector class.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		hasElement: function( element ) {
			return element && this.getElementIndex( element ) > -1;
		},

		/**
		 * The following method getElementIndex() method returns the specific index of existing
		 * element.
		 *
		 * @param {Any_type_of_index} element
		 * @returns {Number}
		 */

		getElementIndex: function( element ) {
			//If no element defined, return false;
			if( $undefined( element ) )
				return -1;

			var arr = this.arr,
			len = arr.length,
			i = 0;

			for( ; i < len; i++ ) {
				if( arr[ i ] === element )
					return i;
			}

			return -1;
		},
	
		/**
		 * The following method ofCopy() creates a vector including mapping.
		 *
		 * Note:- ofCopy() method is a static method.
		 *
		 * @param {rEverse.Vector} vec
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.Vector}
		 */

		ofCopy: vector.ofCopy = function( vec, object, callback ) {
			//Managing the parameters.
			vec = vec || new vector();
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			//Now mapping it.
			return vec.map( object, callback );
		},

		/**
		 * The following method map() creates a new vector with specified mapping on existing
		 * elements.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.Vector}
		 */

		map: function( object, callback ) {
			//Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !Object.isSimpleObject( object ) ? {} : object;

			var len = this.arr.length,
			i = 0;

			for( ; i < len; i++ ) {
				this.arr[ i ] = callback.apply( object, [ this.arr[ i ], this, i ] );
			}

			return this;
		},

		/**
		 * Clears the whole vector.
		 *
		 * @returns {rEverse.Vector}
		 */

		clear: function() {
			this.arr = [];

			//Empty the vector and return a vector.
			return this;
		},

		/**
		 * The following method change() changes a existing element in the vector class.
		 *
		 * @param {Number} index
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		change: function( index, element ) {
			//If the given index is in bound, then it will let the element to
			//be changed.
			if( index + 1 <= this.size() ) {
				this.arr[ index ] = element;
				return true;
			} else console.error( "rEverse.Vector.change():- The given element index is out of bound." );

			return false;
		},

		/**
		 * The following force() method forces a element to its specified index into the vector.
		 *
		 * @param {Number} index
		 * @param {Any_type_of_element} element
		 * @returns {rEverse.Vector}
		 */

		force: function( index, element ) {
			if( index + 1 <= this.size() ) {
				//Extending the limit so that no problem occures.
				if( this.size() === this.limitx ) this.extendLimit( this.limitx + 1 );

				var nArr = [],
				i = 0,
				enhance;

				for( ; i < index; i++ )
					nArr.push( this.shift() );

				//Now the element is ready to push to its specific index.
				nArr.push( element );

				for( enhance of this.arr )
					nArr.push( enhance );

				this.arr = nArr;
			} else console.error( "rEverse.Vector.force():- The given element index is out of bound." );

			return this;
		},

		/**
		 * Concats the given vectors with the current vector and returns a instance of a vector.
		 *
		 * @returns {rEverse.Vector}
		 */

		concat: function() {
			var targets = arguments,
			len = targets.length,
			nArr = this.arr,						//The array for modification.
			i = 0;

			for( ; i < len; i++ ) {
				if( vector.equals( targets[ i ] ) )
					nArr = nArr.concat( targets[ i ].toArray() );
			}

			//Now returning the array by creating a vector.
			return vector.createVector( nArr );
		},

		/**
		 * The permanentConcat() method is almost same as the concat() method of vector but permanentConcat()
		 * concats the values permanently and does not returns any image of the current vector.
		 *
		 * @returns {rEverse.Vector}
		 */

		permanentConcat: function() {
			var targets = arguments,
			len = targets.length,
			i = 0;

			//The permanentConcat() method concats with current vector, but this time it does permanently.
			for( ; i < len; i++ ) {
				if( vector.equals( targets[ i ] ) )
					this.arr = this.arr.concat( targets[ i ].toArray() );
			}

			//Returning the vector.
			return this;
		},

		/**
		 * The following method keys() returns an Array Iterator of vector keys.
		 *
		 * @returns {Array}
		 */

		keys: function() {
			return this.arr.keys();
		},

		/**
		 * The following forEach() method executes a provided function once for each vector element.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.Vector}
		 */

		forEach: function( object, callback ) {
			//Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			var arr = this.arr,
			len = arr.length,
			i = 0;

			for( ;  i < len; i++ ) {
				callback.call( object, arr[ i ], this, i );
			}

			return this;
		},

		/**
		 * Transforms the vector into an Array.
		 *
		 * @returns {Array}
		 */

		toArray: function() {
			return this.arr;
		},

		/**
		 * Tranforms the vector into an Object.
		 *
		 * @returns {Object}
		 */

		toObject: function() {
			return utility.toObject( this.arr );
		},

		/**
		 * The following search method executes a provided callback to find out the elements with specified
		 * boolean value.
		 *
		 * @param {Function} callback
		 * @returns {rEverse.Vector}
		 */

		search: function( callback ) {
			var arr = this.arr,
			len = arr.length,
			nArr = [],
			i = 0;

			for( ; i < len; i++ ) {
				if( callback.apply( {}, [ arr[ i ], this, i ] ) )
					nArr.push( arr[ i ] );
			}

			return vector.createVector( nArr );
		},
	
		/**
		 * The following unite() method unites the whole vector with a specified knot.
		 *
		 * @param {String} knot
		 * @returns {String}
		 */

		unite: function( knot ) {
			//Fixing the absent knot.
			knot = knot.trim() || " ";

			var arr = this.arr,
			len = arr.length,
			string = "",
			i = 0;

			for( ; i < len; i++ ) {
				if( i + 1 === len )
					string = string.concat( arr[ i ] );
				else string = string.concat( arr[ i ], knot );
			}

			return string;
		},

		/**
		 * The following method limit() extends or curtails the limit of the vector.
		 *
		 * Note:- If no parameter defined, then it will return the limit of the vector.
		 *
		 * @param {Number} lim
		 * @returns {Number || rEverse.Vector}
		 */

		limit: function( lim ) {
			//If no limit found, then return the limitx property of the vector.
			if( $undefined( lim ) || !utility.isInteger( lim ) ) return this.limitx;

			if( lim > this.limitx )
				this.extendLimit( lim );
			else if( lim < this.limitx )
				this.curtailLimit( lim );

			return this;
		},

		/**
		 * The following extendLimit() method extends the limit of the vector.
		 *
		 * @param {Number} limit
		 * @returns {rEverse.Vector}
		 */

		extendLimit: function( limit ) {
			if( limit < this.limitx ) {
				console.error( "rEverse.Vector.extendLimit():- The given limit is less then the vector limit." );
				return;
			}

			//If negative value is found, then return.
			if( limit < 0 ) return;

			//Setting the limit.
			this.limitx = limit;

			return this;
		},

		/**
		 * The following curtailLimit() method curtailss the limit of the vector.
		 *
		 * @param {Number} limit
		 * @returns {rEverse.Vector}
		 */

		curtailLimit: function( limit ) {
			if( limit > this.limitx ) {
				console.error( "rEverse.Vector.curtailLimit():- The given limit is greater then the vector limit." );
				return;
			}

			//If negative value is found, then return.
			if( limit < 0 ) return;

			if( this.size() > limit ) {
				this.arr = utility.curtailArray( limit, this.arr );
				this.limitx = limit;
			} else this.limitx = limit;

			return this;
		},

		/**
		 * Returns the first value.
		 *
		 * @returns {Any_type_of_element}
		 */

		firstElement: function() {
			return this.size() > 0 && this.getElement( 0 );
		},

		/**
		 * Returns the last value.
		 *
		 * @returns {Any_type_of_element || undefined}
		 */

		lastElement: function() {
			//To prevent out of bound error.
			return this.size() > 0 && this.getElement( this.size() - 1 ) || undefined;
		},
	
		/**
		 * Vector.equals() or Vector.isVector() checks the given parameter is a vector or not.
		 *
		 * @param {rEverse.Vector} vec
		 * @returns {Boolean}
		 */

		equals: vector.equals = vector.isVector = function( vec ) {
			//If the class code is matched then return true.
			return $defined( vec.classCODE ) && vec.classCODE === "VECTOR_109DFBV7" &&
				vec.constructor === vector;
		},

		/**
		 * Vector.strictEquals() checks the given parameter strictly equals to vector or not.
		 *
		 * @param {rEverse.Vector} vec
		 * @returns {Boolean}
		 */

		strictEquals: function( vec ) {
			//If no vector found then return false;
			if( !vec ) return false;

			return vector.isVector( vec ) && ( function( thisx, vecx ) {
				//If the sizez dont match then it will return false.
				if( thisx.size() !== vecx.size() ) return false;

				var i = 0,
				len = thisx.size();

				//Now checking the values.
				for( ; i < len; i++ ) {
					if( thisx.getElement( i ) !== vecx.getElement( i ) )
						return false;
				}

				return true;
			} )( this, vec );
		},

		/**
		 * Splices the vector.
		 *
		 * @param {Number} index
		 * @param {Number} range
		 * @param {Any_type_of_element} item
		 * @returns {Any_type_of_element}
		 */

		splice: function( index, range, item ) {
			return this.arr.splice( index, range, item );
		},

		/**
		 * Transforms into a string.
		 *
		 * @returns {String}
		 */

		toString: function() {
			return "[object rEverse.Vector]";
		},

		/**
		 * Transforms into a locale string.
		 *
		 * @param {String} locales
		 * @param {Object} option
		 * @returns {String}
		 */

		toLocaleString: function( locales, option ) {
			return this.arr.toLocaleString( locales, option );
		}	//END
	} ) );

	/**
	 * The set class of the rEverseJS. Implemented from the set of mathematics and has same advantages
	 * as the mathematics set. All the elements should be same and same elements is not acceptable to add twice.
	 */

	const set = function() {
		// Declaring the private variables needed for the set class.
		this.array = [];
		this.type = null;

		/**
		 * Private method of set.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {String}
		 */

		this.honestType = function( element ) {
			// If the given element is an object, thrn check for the array and simple object.
			if( Object.isObject( element ) )
				return Object.isSimpleObject( element ) ? "Object" : "Array";
			else if( Number.isNumber( element ) )
				return utility.isInteger( element ) ? "Integer" : "Float";
			else if( String.isString( element ) )
				return "String";
			else if( Function.isFunction( element ) )
				return "Function";
			else if( Boolean.isBoolean( element ) )
				return "Boolean";

			return null;
		};

		/**
		 * Private method of set.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		this.exist = function( element ) {
			// If no element found, then return false;
			if( $undefined( element ) )
				return false;

			var enhance;						// To pass every element on the array.

			for( enhance of this.array ) {
				if( enhance === element )
					return true;
			}

			return false;
		};

		var targets = arguments,
		len = targets.length;

		// If the given length is 1, then check for the array, and the object types.
		// Because, array and object properties will be added to the set.
		if( len === 1 ) {
			var firstElement = targets[ 0 ];

			if( Array.isArray( firstElement ) ) {
				var enhance;

				for( enhance of firstElement ) {
					if( this.array.length === 0 ) {
						this.type = this.honestType( enhance ),
						this.array.push( enhance );
					} else {
						// Checking if the type is correct and the element is exist
						// in the set array.
						if( this.type === this.honestType( enhance ) && !this.exist( enhance ) )
							this.array.push( enhance );
					}
				}
			}
			else if( Object.isPlainObject( firstElement ) ) {
				// Taking a variable to pass through the object properties.
				var name;

				for( name in firstElement ) {
					var element = firstElement[ name ];

					if( this.array.length === 0 ) {
						this.type = this.honestType( element ),
						this.array.push( element );
					} else {
						// Cecking if the type is correct and the element is exist
						// in the set array.
						if( this.type === this.honestType( element ) && !this.exist( element ) )
							this.array.push( element );
					}
				}
			} else {
				if( this.array.length === 0 ) {
					this.type = this.honestType( firstElement ),
					this.array.push( firstElement );
				} else {
					if( this.type === this.honestType( firstElement ) && !!!this.exist( firstElement ) )
						this.array.push( firstElement );
				}
			}
		} else {
			var i = 0;

			for( ; i < len; i++ ) {
				// Same as before.
				if( this.array.length === 0 ) {
					// Checking the type and setting as the default type.
					this.type = this.honestType( targets[ i ] ),
					this.array.push( targets[ i ] );
				} else {
					// If the set array length is not less than 1, then check is the
					// type getting matched with the element and the element exist
					// in the set array.
					// If it is then filterize the element and push it to the array.
					if( this.type === this.honestType( targets[ i ] ) && !!!this.exist( targets[ i ] ) )
						this.array.push( targets[ i ] );
				}
			}
		}
	};

	// The set prototype.
	set.prototype = set.os = {
		constructor: set,
		version: set.version = info.version
	};

	// Now adding the prototypes of set class including inheritance of the set
	// configuration.
	RJS.addPrototypes( set.os, utility.extendObject( {
		/**
		 * The following push() method pushes given element next to the last element on the set.
		 *
		 * Note:- This method checks the element type to the set type and the element
		 * won't be pushed if the element already exists.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		push: function( element ) {
			// If no element is not defined, then return false;
			if( $undefined( element ) )
				return false;

			// If the array length is 0, then set the type and the array.
			if( this.array.length === 0 ) {
				this.type = this.honestType( element ),
				this.array.push( element );

				return true;
			} else if( this.type === this.honestType( element ) && !!!this.exist( element ) ) {
					this.array.push( element );

					// Return true;
					return true;
			}

			return false;
		},

		/**
		 * The pushElement() method pushes element previous to the first element. Which means, the method pushes the
		 * element inverse to the set.
		 *
		 * Note:- This method checks the element type to the set type and the element
		 * won't be pushed if the element already exists.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		pushInverse: function( element ) {
			// If no element is not defined, then return false;
			if( $undefined( element ) )
				return false;

			// If the array length is 0, then set the type and the array.
			if( this.array.length === 0 ) {
				this.type = this.honestType( element ),
				this.array.unshift( element );

				return true;
			} else if( this.type === this.honestType( element ) && !!!this.exist( element ) ) {
					this.array.unshift( element );

					// Return true;
					return true;
			}

			return false;
		},

		/**
		 * Pushes multiple elements to the set passed by arguments. Returns true if all the elements are
		 * successfully added.
		 *
		 * @returns {Boolean}
		 */

		pushMultiple: function() {
			var targets = arguments,
			len = targets.length,
			i = 0;

			// For returning stuffs.
			var bool = true;

			// Now pushing the elements to the set.
			for( ; i < len; i++ ) {
				if( !this.push( targets[ i ] ) )
					bool = false;
			}

			return bool;
		},

		/**
		 * Pushes all the elements before the first element. Specialy said, inversely.
		 *
		 * @returns {Boolean}
		 */

		pushMultipleInverse: function() {
			// Taking an array reversed to push it to the set inversely.
			var nArr = Array.toArray( arguments ).reverse(),
			enhance;

			// For returning stuffs.
			var bool = true;

			// Now adding the elements inversely.
			for( enhance of nArr ) {
				if( !this.pushInverse( enhance ) )
					bool = false;
			}

			return bool;
		},

		/**
		 * The following pushMultipleII() method adds the arguments list of elements inversely to set inversed.
		 *
		 * @returns {Boolean}
		 */

		pushMultipleII: function() {
			var nArr = Array.toArray( arguments ),
			enhance;

			var bool = true;

			// Now adding the elements inversely to the head of set. Or adding the argument inversely inversed.
			for( enhance of nArr ) {
				if( !this.pushInverse( enhance ) )
					bool = false;
			}

			return bool;
		},

		/**
		 * The following size() function of the set prototype returns the length of the set.
		 *
		 * @returns {Number}
		 */

		size: function() {
			// Returning the total length;
			return this.array.length;
		},
	
		/**
		 * The out() method of set returns an element according to the given index number. If the given number is out
		 * of set bound, this will return an error. If no parameter is defined on the callback of the function, then the
		 * last element will be returned.
		 *
		 * @param {Number} index
		 * @returns {Any_type_of_element}
		 */

		out: function( index ) {
			// If no index found, then return the last element;
			if( $undefined( index ) || utility.isInteger( index ) && index < 0 )
				return this.array[ this.size() - 1 ];

			if( index + 1 <= this.size() )
				return this.array[ index ];
			else console.error( "rEverse.Set.out():- The given index is out of bound of the set." );
		},

		/**
		 * The outMultiple() returns an array according to the arguments list of indexes.
		 *
		 * Note:- If the index is out of bound, the element won't be added to the array.
		 *
		 * @returns {Any_type_of_element || Array}
		 */

		outMultiple: function() {
			var targets = arguments,
			len = targets.length;

			// If no arguments defined, then return the last element.
			if( len === 0 )
				return this.out();
			else if( len === 1 ) return this.out( targets[ 0 ] );
			else {
				let i = 0,
				nArr = [];

				for( ; i < len; i++ ) {
					if( targets[ i ] + 1 <= this.size() )
						nArr.push( this.out( targets[ i ] ) );
				}

				return nArr;
			}

			// Returning default array.
			return [];
		},

		/**
		 * Splices the set.
		 *
		 * @param {Number} index
		 * @param {Number} range
		 * @param {Any_type_of_element} item
		 * @returns {Any_type_of_element}
		 */

		splice: function( index, range, item ) {
			return this.array.splice( index, range, item );
		},

		/**
		 * The following remove() method of set removes elements with specific index with range. If no range
		 * is defined, then it will remove the only existing element in the index.
		 *
		 * @param {Number} index
		 * @param {Number} range
		 * @returns {Boolean}
		 */

		remove: function( index, range ) {
			// If the index as well as the range is defined, then remove the element starting at
			// the index tor the range.
			if( $defined( this.array[ index ] ) && range ) {
				this.splice( index, range );
				return true;
			}
			else if( $defined( this.array[ index ] ) && !!!range ) {
				// Now removing the element without the range.
				this.splice( index, 1 );
				return true;
			} else console.error( "rEverse.Set.remove():- The given array index is out of bound" );

			return false;
		},

		/**
		 * The following removeMultiple() method of set helps to remove element with multiple index passes on
		 * arguments.
		 *
		 * @returns {Boolean}
		 */

		removeMultiple: function() {
			// Making the targets array, sorting them and reversing them, just
			// because if the first placed elements are removed, then the bigger number
			// will fail to do their operations, cause they will be out of bound.

			var targets = Array.toArray( arguments ).sort().reverse(),
			len = targets.length,
			i = 0;

			// Because of returning stuffs.
			var bool = true;

			// If no arguments found, then return false.
			if( len === 0 ) return false;

			// Now removing the elements manually
			for( ; i < len; i++ ) {
				// If the given index is bounded, then it will remove the elements.
				if( targets[ i ] + 1 <= this.size() ) {
					if( !this.remove( targets[ i ] ) )
						bool = false;
				}
			}

			return bool;
		},

		/**
		 * Transforms the set into an array.
		 *
		 * @returns {Array}
		 */

		toArray: function() {
			return this.array;
		},

		/**
		 * Transforms the set into an object.
		 *
		 * @returns {Object}
		 */

		toObject: function() {
			return utility.toObject( this.array );
		},

		/**
		 * Sorts the set.
		 *
		 * @param {Function} callback
		 * @returns {rEverse.Set}
		 */

		sort: function( callback ) {
			this.array.sort( callback );
			return this;
		},

		/**
		 * The following toPowerSet() method transforms the set into the power set.
		 *
		 * @returns {rEverse.Set}
		 */

		toPowerSet: function() {
			// This function is the main power set generator.
			// Returns array.

			function powerSet( s ) {
				if( s.length === 0 )
					return [ [] ];

				// Taking a head and a tail. Each of the power set of tail will be included with
				// the head.
				var head = [ s.pop() ],
				tail = powerSet( s );

				return tail.concat( tail.map( function( element ) {
					return head.concat( element );
				} ) );
			}

			// Now the original set manipulation.
			var pset = powerSet( this.array ),
			s = new set();

			pset.forEach( function( element ) {
				s.push( new set( element.sort() ) );
			} );

			return s;							// Returning the modified set.
		},

		/**
		 * Checks is the given set equal or not.
		 *
		 * @param {rEverse.Set} s
		 * @returns {Boolean}
		 */

		equals: set.equals = set.isSet = function( s ) {
			// Checking the instance of the given object with set class.
			return s instanceof set && s.constructor === set;
		},

		/**
		 * Checks is the given set strictly equal to the set or not.
		 *
		 * Note:- strictEquals() is not a static function.
		 *
		 * @param {rEverse.Set} s
		 * @returns {Boolean}
		 */

		strictEquals: function( s ) {
			// If no vector found then return false;
			if( !s ) return false;

			return set.equals( s ) && ( function( thisx, setx ) {
				// If the length are not same then return false;
				if( thisx.size() !== setx.size() )
					return false;

				var len = thisx.size(),
				i = 0;

				for( ; i < len; i++ ) {
					// If the elements are not same then, return false;
					if( thisx.out( i ) !== setx.out( i ) )
						return false;
				}

				return true;
			} )( this, s );
		},

		/**
		 * The following forEach() method executes a provided function once for each set element.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.Set}
		 */

		forEach: function( object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			var arr = this.array,
			len = arr.length,
			i = 0;

			for( ;  i < len; i++ ) {
				callback.call( object, arr[ i ], this, i );
			}

			return this;
		},

		/**
		 * The following backshift() method removes the last element of the set and returns it.
		 *
		 * @returns {Any_type_of_element}
		 */

		backshift: function() {
			// Getting the last element and returning it.
			return this.splice( this.size() - 1, 1 );
		},

		/**
		 * The following shift() method removes the first element of the set and returns it.
		 *
		 * @returns {Any_type_of_element}
		 */

		shift: function() {
			// Getting the first element and returning it.
			return this.splice( this.size() - 1, 1 );
		},

		/**
		 * The following ignite() method clears the whole set.
		 *
		 * @returns {rEverse.Set}
		 */

		ignite: function() {
			// Making the array empty.
			this.array = [];

			return this;
		},

		/**
		 * The following method map() creates a new set object with specified mapping on existing
		 * elements.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.Set}
		 */

		map: function( object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			var len = this.array.length,
			i = 0;

			for( ; i < len; i++ ) {
				this.array[ i ] = callback.apply( object, [ this.array[ i ], this, i ] );
			}

			return this;
		},

		/**
		 * The following method ofCopy() creates a new set object including mapping.
		 *
		 * Note:- ofCopy() method is a static method of set.
		 *
		 * @param {rEverse.Set} setx
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.Set}
		 */

		ofCopy: set.ofCopy = function( setx, object, callback ) {
			// Managing the parameters.
			setx = setx || new set();
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			// Now mapping it.
			return setx.map( object, callback );
		},

		/**
		 * The following search method executes a provided callback to find out the elements from the set
		 * with specified boolean value.
		 *
		 * @param {Function} callback
		 * @returns {rEverse.Set}
		 */

		search: function( callback ) {
			var arr = this.array,
			len = arr.length,
			nArr = [],
			i = 0;

			for( ; i < len; i++ ) {
				if( callback.apply( {}, [ arr[ i ], this, i ] ) )
					nArr.push( arr[ i ] );
			}

			return new set( nArr );
		},

		/**
		 * The force() method pushes the given element to the index given.
		 *
		 * Note:- The the elements index will be changed which are existing after the given index.
		 * If the index is grater than the main size, the index will be counted as out of bound.
		 *
		 * @param {Number} index
		 * @param {Any_type_of_element} element
		 * @returns {rEverse.Set}
		 */

		force: function( index, element ) {
			if( index + 1 <= this.size() ) {
				var nArr = [],
				i = 0,
				enhance;

				for( ; i < index; i++ )
					nArr.push( this.shift() );

				// Now the element is ready to push to its specific index.
				nArr.push( element );

				// Now pushing the other elements.
				for( enhance of this.array )
					nArr.push( enhance );

				// Now setting the modified array as the main array.
				this.array = nArr;
			} else console.error( "rEverse.Set.force():- The given element index is out of bound." );

			return this;
		},

		/**
		 * Checks is the given set a subset of the mother set or not.
		 *
		 * @param {rEverse.Set} s
		 * @returns {Boolean}
		 */

		subSet: function( s ) {
			// Taking a bool, as we are using the forEach() method.
			// At first bool is false.
			var bool = false;

			// If the s is not defined or the given set is not actually a set,
			// then return the bool.
			if( $undefined( s ) || !set.equals( s ) )
				return bool;

			// Creating a power set to get the possible set elements.
			var pset = this.toPowerSet();

			pset.forEach( function( element ) {
				if( element.strictEquals( s ) )
					bool = true;
			} );

			return bool;
		},

		/**
		 * Checks is the given set a proper subset of the mother set or not.
		 *
		 * @param {rEverse.Set} s
		 * @returns {Boolean}
		 */

		properSubSet: function( s ) {
			// Taking a bool, as we are using the forEach() method.
			// At first bool is false.
			var bool = false;

			// If the s is not defined or the given set is not actually a set,
			// then return the bool.
			if( $undefined( s ) || !set.equals( s ) )
				return bool;

			// Creating a power set to get the possible set elements.
			var pset = this.toPowerSet();

			// If the given set is equal to any subset of this set and also not equal to this set
			// is the real subset.
			pset.forEach( pset.last(), function( element ) {
				if( element.strictEquals( s ) && !!!this.strictEquals( s ) )
					bool = true;
			} );

			return bool;
		},

		/**
		 * Returns the first element of the set.
		 *
		 * @returns {Any_type_of_element}
		 */

		first: function() {
			return this.size() > 0 && this.out( 0 );
		},

		/**
		 * Returns the last element of the set.
		 *
		 * @returns {Any_type_of_element || undefined}
		 */

		last: function() {
			// To prevent out of bound error.
			return this.size() > 0 && this.out( this.size() - 1 ) || undefined;
		},
	
		/**
		 * Creates a cross set with given domain and range set relation.
		 *
		 * Note:- cross is a static method of set.
		 *
		 * @param {type} domain
		 * @param {type} range
		 * @returns {rEverse.Set}
		 */

		cross: set.cross = function( domain, range ) {
			// Creating a set to return.
			var setx = new set();

			// If the given elements are not set.
			if( !set.equals( domain ) || !set.equals( range ) )
				return setx;
			else if( set.isEmptySet( domain ) ) {
				var nArr = [ null ];

				range.forEach( function( element ) {
					nArr.push( element );
					setx.push( nArr );
					nArr = [ null ];
				} );
			} else {
				domain.forEach( function( element ) {
					var nArr = [ element ];

					range.forEach( function( elementx ) {
						nArr.push( elementx );
						setx.push( nArr );
						nArr = [ element ];
					} );
				} );
			}

			return setx;
		},

		/**
		 * Returns true if the given set is empty.
		 *
		 * @param {rEverse.Set} s
		 * @returns {Boolean}
		 */

		isEmptySet: set.isEmptySet = function( s ) {
			return $defined( s ) && set.equals( s ) && s.size() === 0;
		},

		/**
		 * Checks is the given element is an cross set or not.
		 *
		 * @param {rEverse.Set} crossx
		 * @returns {Boolean}
		 */

		isCrossSet: set.isCrossSet = function( crossx ) {
			// Taking a boolean variable to return.
			var bool = true;

			if( $undefined( crossx ) || !set.equals( crossx ) )
				return false;

			// Now checking all the elements.
			crossx.forEach( function( element ) {
				if( !Array.isArray( element ) || element.length !== 2 )
					bool = false;
			} );

			return bool;
		},

		/**
		 * Returns the domain set of a cross set.
		 *
		 * @param {rEverse.Set} crossx
		 * @returns {rEverse.Set}
		 */

		getDomain: set.getDomain = function( crossx ) {
			// Creating a set to modify and return.
			var s = new set();

			if( $undefined( crossx ) || !set.isCrossSet( crossx ) )
				return s;

			crossx.forEach( function( element ) {
				s.push( element[ 0 ] );
			} );

			return s;
		},

		/**
		 * Returns the range set of a cross set.
		 *
		 * @param {rEverse.Set} crossx
		 * @returns {rEverse.Set}
		 */

		getRange: set.getRange = function( crossx ) {
			// Creating a set to modify and return.
			var s = new set();

			if( $undefined( crossx ) || !set.isCrossSet( crossx ) )
				return s;

			crossx.forEach( function( element ) {
				s.push( element[ 1 ] );
			} );

			return s;
		},

		/**
		 * Performes an union operation on the given set and returns a simple set.
		 *
		 * @returns {rEverse.Set}
		 */

		union: set.union = function() {
			var targets = arguments,
			len = targets.length,
			setx = new set(),						// New set for modification.
			i = 0;

			for( ; i < len; i++ ) {
				if( set.equals( targets[ i ] ) )
					setx.permanentConcat( targets[ i ] );
			}

			// Returning the modified set.
			return setx;
		},

		/**
		 * Performes an intersection operation on the given targets and returns the modified set.
		 *
		 * @param {rEverse.Set} target_1
		 * @param {rEverse.Set} target_2
		 * @returns {rEverse.Set}
		 */

		intersection: set.intersection = function( target_1, target_2 ) {
			// Checking are given sets are actually set or not.
			// If its not, then a new empty set will be returned.
			if( !set.equals( target_1 ) || !set.equals( target_2 ) )
				return new set();

			// Searching of valid elements on the both targets and returning the set.
			return target_1.search( function( element ) {
				return target_2.has( element );
			} );
		},

		/**
		 * Performes an minus operation on the given targets and returns the modified set.
		 *
		 * Note:- inherited from the mathematical set.
		 *
		 * @param {rEverse.Set} target_1
		 * @param {rEverse.Set} target_2
		 * @returns {rEverse.Set}
		 */

		minus: set.minus = function( target_1, target_2 ) {
			// Checking are given sets are actually set or not.
			// If its not, then a new empty set will be returned.
			if( !set.equals( target_1 ) || !set.equals( target_2 ) )
				return new set();

			// Searching of valid elements on the both targets by the minus operation algorithm
			// and returning the set.
			return target_1.search( function( element ) {
				return !!!target_2.has( element );
			} );
		},

		/**
		 * Makes the whole relation inversed done through the cross set function. Inverses the cross set.
		 *
		 * @param {rEverse.Set} crossx
		 * @returns {rEverse.Set}
		 */

		inverseCross: set.inverseCross = function( crossx ) {
			// If the parameter is undefined or the given set is not a cross set
			// return an empty set.
			if( $undefined( crossx ) || !set.isCrossSet( crossx ) )
				return new set();

			// Now mapping the elements and making them inversed.
			return crossx.map( function( element ) {
				return element.reverse();
			} );
		},
	
		/**
		 * Checks is the given set is the super set of this set or not.
		 *
		 * @param {rEverse.Set} setx
		 * @returns {Boolean}
		 */

		superSet: function( setx ) {
			return setx.subSet( this );
		},

		/**
		 * The following method keys() returns an Array Iterator of set keys.
		 *
		 * @returns {Array}
		 */

		keys: function() {
			return this.array.keys();
		},

		/**
		 * The following unite() method unites the whole set object with a specified knot.
		 *
		 * @param {String} knot
		 * @returns {String}
		 */

		unite: function( knot ) {
			// Fixing the absent knot.
			knot = knot.trim() || " ";

			var arr = this.array,
			len = arr.length,
			string = "",
			i = 0;

			for( ; i < len; i++ ) {
				if( i + 1 === len )
					string = string.concat( arr[ i ] );
				else string = string.concat( arr[ i ], knot );
			}

			return string;
		},

		/**
		 * The following reverse() method reverses the whole set object.
		 *
		 * @returns {rEverse.Set}
		 */

		reverse: function() {
			this.array.reverse();

			// Returning the window.
			return this;
		},

		/**
		 * The concat() mehtod concats the given sets with the current one and returns and image of
		 * the concated set.
		 *
		 * @returns {rEverse.Set}
		 */

		concat: function() {
			var targets = arguments,
			len = targets.length,

			// Creating a new image ot this set.
			setx = new set( this.array ),
			i = 0;

			for( ; i < len; i++ ) {
				if( set.equals( targets[ i ] ) )
					targets[ i ].forEach( function( element ) {
						setx.push( element );
					} );
			}

			// Now returning the modifies set.
			return setx;
		},

		/**
		 * Permanently concats the given sets with the current sets. In this method no image is created
		 * and returns the current set.
		 *
		 * @returns {rEverse.Set}
		 */

		permanentConcat: function() {
			var targets = arguments,
			len = targets.length,
			i = 0;

			// As this is permanentConcat() method, so the elements will bw added permanently
			// And any kind of images of the current set will not be returned. Instead of it, the
			// current set will be returned.
			for( ; i< len; i++ ) {
				if( set.equals( targets[ i ] ) )
					targets[ i ].forEach( this, function( element ) {
						this.push( element );
					} );
			}

			return this;
		},

		/**
		 * The following hasElement() method checks if the given element as a parameter is exist in
		 * set class.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		has: function( element ) {
			return element && this.getIndex( element ) > -1;
		},

		/**
		 * The following method getElementIndex() method returns the specific index of existing
		 * element.
		 *
		 * @param {Any_type_of_index} element
		 * @returns {Number}
		 */

		getIndex: function( element ) {
			// If no element defined, return false;
			if( $undefined( element ) )
				return false;

			var arr = this.array,
			len = arr.length,
			i = 0;

			for( ; i < len; i++ ) {
				if( arr[ i ] === element )
					return i;
			}

			return -1;
		},

		/**
		 * Transforms the set into a string.
		 *
		 * @returns {String}
		 */

		toString: function( /* No Radix */ ) {
			return "[object rEverse.Set]";
		},

		/**
		 * Transforms into a locale string.
		 *
		 * @param {String} locales
		 * @param {Object} option
		 * @returns {String}
		 */

		toLocaleString: function( locales, option ) {
			return this.arr.toLocaleString( locales, option );
		}	// END
	} ) );

	/**
	 * The set class of the rEverseJS. Implemented from the set of mathematics and has same advantages
	 * as the mathematics set. The differance between the set and the iset is the iset can take different
	 * types of values unexisted on the iset object.
	 *
	 * ISet: Indiscriminated Set.
	 */

	const iset = function() {
		// Taking the main array of iset.
		this.array = [],

		/**
		 * Private method of iset.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {undefined}
		 */

		this.exist = function( element ) {
			// If the given element is undefined, then return false.
			if( $undefined( element ) )
				return false;

			// Now checking is the element is really exist in the iset.
			return this.array.indexOf( element ) > -1;
		};

		var targets = arguments,
		len = targets.length;

		// If the length is 1, then check for available element mappings.
		if( len === 1 ) {
			var firstTarget = targets[ 0 ];

			// If the given first element is an array, then all the elements of the
			// array will be added.
			if( Array.isArray( firstTarget ) ) {
				var enhance;						// To pass every elements if the iset array.

				for( enhance of firstTarget ) {
					// If the element is not exist, then add the element.
					if( !this.exist( enhance ) )
						this.array.push( enhance );
				}
			}
			else if( Object.isPlainObject( firstTarget ) ) {
				var name;						// To pass every elements of the object.

				for( name in firstTarget ) {
					// If the element is not exist, then add the element.
					if( !this.exist( firstTarget[ name ] ) )
						this.array.push( firstTarget[ name ] );
				}
			} else if( !this.exist( firstTarget ) )
				this.array.push( firstTarget );
		} else {
			var i = 0;

			for( ; i < len; i++ ) {
				// Now adding the elements defaultly.
				if( !this.exist( targets[ i ] ) )
					this.array.push( targets[ i ] );
			}
		}
	};

	// The iset prototype.
	iset.prototype = iset.os = {
		constructor: iset,
		version: iset.version = info.version
	};

	RJS.addPrototypes( iset.os, utility.extendObject( {
		/**
		 * The following push() method pushes given element next to the last element on the iset.
		 *
		 * Note:- The element won't be pushed if the element already exists.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		push: function( element ) {
			// If the element is not defined, then return false.
			if( $undefined( element ) )
				return false;

			// If the following element already existed, then prevent pushing the element
			// to the iset.
			if( !!!this.exist( element ) ) {
				this.array.push( element );

				// The pushing is successful. So, returning true.
				return true;
			}

			// If the push is not successful then return false.
			return false;
		},

		/**
		 * The pushElement() method pushes element previous to the first element. Which means, the method pushes the
		 * element inverse to the iset.
		 *
		 * Note:- The element won't be pushed if the element already exists.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		pushInverse: function( element ) {
			// If the element is not defined, then return false.
			if( $undefined( element ) )
				return false;

			// If the following element already existed, then prevent pushing the element
			// to the iset.
			if( !!!this.exist( element ) ) {
				this.array.unshift( element );

				// The unshifting or reverse push is successful. So, returning true.
				return true;
			}

			// If the unshifting is not successful then return false.
			return false;
		},

		/**
		 * Pushes multiple elements to the iset passed by arguments. Returns true if all the elements are
		 * successfully added.
		 *
		 * @returns {Boolean}
		 */

		pushMultiple: function() {						// Passed by the arguments.
			var targets = arguments,
			len = targets.length,
			retBool = true,							// Default boolean value for pushMultiple
			i = 0;

			// Now pushing the elements multiply into the iset.
			for( ; i < len; i++ ) {
				// If any push is not successful, then the retBool variable will be false.
				if( !this.push( targets[ i ] ) )
					retBool = false;
			}

			// Returning the retBool.
			return retBool;
		},

		/**
		 * Pushes all the elements before the first element. Specialy said, inversely.
		 *
		 * @returns {Boolean}
		 */

		pushMultipleInverse: function() {					// Passed by the arguments.
			var targets = Array.toArray( arguments ).reverse(),
			retBool = true,
			enhance;							// To get passed on every array element.

			// Now pushing the element inversely into the iset. Which means add the whole arguments
			// Before the first element of iset.
			for( enhance of targets ) {
				if( !this.pushInverse( enhance ) )
					retBool = false;
			}

			// Returning the retBool.
			return retBool;
		},

		/**
		 * The following pushMultipleII() method adds the arguments list of elements inversely to iset inversed.
		 *
		 * @returns {Boolean}
		 */

		pushMultipleII: function() {						// Passed by the arguments.
			var targets = arguments,
			retBool = true,
			name;								// To pass every property name of an object.

			// Now pushing the element inversely making the arguments inversed.
			for( name in targets ) {
				if( !this.pushInverse( targets[ name ] ) )
					retBool = false;
			}

			// Returning the retBool.
			return retBool;
		},

		/**
		 * The following size() function of the iset prototype returns the length of the iset.
		 *
		 * @returns {Number}
		 */

		size: function() {
			// Returning the total length;
			return this.array.length;
		},
	
		/**
		 * The out() method of iset returns an element according to the given index number. If the given number is out
		 * of iset bound, this will return an error. If no parameter is defined on the callback of the function, then the
		 * last element will be returned.
		 *
		 * @param {Number} index
		 * @returns {Any_type_of_element}
		 */

		out: function( index ) {
			// If no index found, then return the last element;
			if( $undefined( index ) || utility.isInteger( index ) && index < 0 )
				return this.array[ this.size() - 1 ];

			if( index + 1 <= this.size() )
				return this.array[ index ];
			else console.error( "rEverse.ISet.out():- The given index is out of bound of the iset." );
		},

		/**
		 * The outMultiple() returns an array according to the arguments list of indexes.
		 *
		 * Note:- If the index is out of bound, the element won't be added to the array.
		 *
		 * @returns {Any_type_of_element || Array}
		 */

		outMultiple: function() {
			var targets = arguments,
			len = targets.length;

			// If no arguments defined, then return the last element.
			if( len === 0 )
				return this.out();
			else if( len === 1 ) return this.out( targets[ 0 ] );
			else {
				let i = 0,
				nArr = [];

				for( ; i < len; i++ ) {
					if( targets[ i ] + 1 <= this.size() )
						nArr.push( this.out( targets[ i ] ) );
				}

				return nArr;
			}

			// Returning default array.
			return [];
		},

		/**
		 * Splices the iset.
		 *
		 * @param {Number} index
		 * @param {Number} range
		 * @param {Any_type_of_element} item
		 * @returns {Any_type_of_element}
		 */

		splice: function( index, range, item ) {
			return this.array.splice( index, range, item );
		},

		/**
		 * The following remove() method of iset removes elements with specific index with range. If no range
		 * is defined, then it will remove the only existing element in the index.
		 *
		 * @param {Number} index
		 * @param {Number} range
		 * @returns {Boolean}
		 */

		remove: function( index, range ) {
			// If the index as well as the range is defined, then remove the element starting at
			// the index tor the range.
			if( $defined( this.array[ index ] ) && range ) {
				this.splice( index, range );
				return true;
			}
			else if( $defined( this.array[ index ] ) && !!!range ) {
				// Now removing the element without the range.
				this.splice( index, 1 );
				return true;
			} else console.error( "rEverse.ISet.remove():- The given array index is out of bound" );

			return false;
		},

		/**
		 * The following removeMultiple() method of iset helps to remove element with multiple index passes on
		 * arguments.
		 *
		 * @returns {Boolean}
		 */

		removeMultiple: function() {
			// Making the targets array, sorting them and reversing them, just
			// because if the first placed elements are removed, then the bigger number
			// will fail to do their operations, cause they will be out of bound.

			var targets = Array.toArray( arguments ).sort().reverse(),
			len = targets.length,
			i = 0;

			// Because of returning stuffs.
			var bool = true;

			// If no arguments found, then return false.
			if( len === 0 ) return false;

			// Now removing the elements manually
			for( ; i < len; i++ ) {
				// If the given index is bounded, then it will remove the elements.
				if( targets[ i ] + 1 <= this.size() ) {
					if( !this.remove( targets[ i ] ) )
						bool = false;
				}
			}

			return bool;
		},

		/**
		 * Transforms the iset into an array.
		 *
		 * @returns {Array}
		 */

		toArray: function() {
			return this.array;
		},

		/**
		 * Transforms the iset into an object.
		 *
		 * @returns {Object}
		 */

		toObject: function() {
			return utility.toObject( this.array );
		},

		/**
		 * Sorts the iset.
		 *
		 * @param {Function} callback
		 * @returns {rEverse.ISet}
		 */

		sort: function( callback ) {
			this.array.sort( callback );
			return this;
		},

		/**
		 * The following toPowerSet() method transforms the iset into the power iset.
		 *
		 * @returns {rEverse.ISet}
		 */

		toPowerSet: function() {
			// This function is the main power iset generator.
			// Returns array.

			function powerSet( s ) {
				if( s.length === 0 )
					return [ [] ];

				// Taking a head and a tail. Each of the power iset of tail will be included with
				// the head.
				var head = [ s.pop() ],
				tail = powerSet( s );

				return tail.concat( tail.map( function( element ) {
					return head.concat( element );
				} ) );
			}

			// Now the original iset manipulation.
			var pset = powerSet( this.array ),
			s = new iset();

			pset.forEach( function( element ) {
				s.push( new iset( element.sort() ) );
			} );

			return s;							// Returning the modified iset.
		},

		/**
		 * Checks is the given iset is equal or not.
		 *
		 * @param {rEverse.ISet} s
		 * @returns {Boolean}
		 */

		equals: iset.equals = iset.isISet = function( s ) {
			// Checking the instance of the given object with set class.
			return s instanceof iset && s.constructor === iset;
		},

		/**
		 * Checks is the given iset strictly equal to the iset or not.
		 *
		 * Note:- strictEquals() is not a static function.
		 *
		 * @param {rEverse.ISet} s
		 * @returns {Boolean}
		 */

		strictEquals: function( s ) {
			// If no vector found then return false;
			if( !s ) return false;

			return iset.equals( s ) && ( function( thisx, setx ) {
				// If the length are not same then return false;
				if( thisx.size() !== setx.size() )
					return false;

				var len = thisx.size(),
				i = 0;

				for( ; i < len; i++ ) {
					// If the elements are not same then, return false;
					if( thisx.out( i ) !== setx.out( i ) )
						return false;
				}

				return true;
			} )( this, s );
		},

		/**
		 * The following forEach() method executes a provided function once for each iset element.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.ISet}
		 */

		forEach: function( object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			var arr = this.array,
			len = arr.length,
			i = 0;

			for( ;  i < len; i++ ) {
				callback.call( object, arr[ i ], this, i );
			}

			return this;
		},

		/**
		 * The following backshift() method removes the last element of the iset and returns it.
		 *
		 * @returns {Any_type_of_element}
		 */

		backshift: function() {
			// Getting the last element and returning it.
			return this.splice( this.size() - 1, 1 );
		},

		/**
		 * The following shift() method removes the first element of the iset and returns it.
		 *
		 * @returns {Any_type_of_element}
		 */

		shift: function() {
			// Getting the first element and returning it.
			return this.splice( this.size() - 1, 1 );
		},

		/**
		 * The following ignite() method clears the whole iset.
		 *
		 * @returns {rEverse.ISet}
		 */

		ignite: function() {
			// Making the array empty.
			this.array = [];

			return this;
		},

		/**
		 * The following method map() creates a new iset object with specified mapping on existing
		 * elements.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.ISet}
		 */

		map: function( object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			var len = this.array.length,
			i = 0;

			for( ; i < len; i++ ) {
				this.array[ i ] = callback.apply( object, [ this.array[ i ], this, i ] );
			}

			return this;
		},

		/**
		 * The following method ofCopy() creates a new iset object including mapping.
		 *
		 * Note:- ofCopy() method is a static method of iset.
		 *
		 * @param {rEverse.ISet} isetx
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.ISet}
		 */

		ofCopy: iset.ofCopy = function( isetx, object, callback ) {
			// Managing the parameters.
			isetx = isetx || new iset();
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			// Now mapping it.
			return isetx.map( object, callback );
		},

		/**
		 * The following search method executes a provided callback to find out the elements from the iset
		 * with specified boolean value.
		 *
		 * @param {Function} callback
		 * @returns {rEverse.ISet}
		 */

		search: function( callback ) {
			var arr = this.array,
			len = arr.length,
			nArr = [],
			i = 0;

			for( ; i < len; i++ ) {
				if( callback.apply( {}, [ arr[ i ], this, i ] ) )
					nArr.push( arr[ i ] );
			}

			return new iset( nArr );
		},

		/**
		 * The force() method pushes the given element to the index given.
		 *
		 * Note:- The the elements index will be changed which are existing after the given index.
		 * If the index is grater than the main size, the index will be counted as out of bound.
		 *
		 * @param {Number} index
		 * @param {Any_type_of_element} element
		 * @returns {rEverse.ISet}
		 */

		force: function( index, element ) {
			if( index + 1 <= this.size() ) {
				var nArr = [],
				i = 0,
				enhance;

				for( ; i < index; i++ )
					nArr.push( this.shift() );

				// Now the element is ready to push to its specific index.
				nArr.push( element );

				// Now pushing the other elements.
				for( enhance of this.array )
					nArr.push( enhance );

				// Now setting the modified array as the main array.
				this.array = nArr;
			} else console.error( "rEverse.ISet.force():- The given element index is out of bound." );

			return this;
		},

		/**
		 * Checks is the given iset is a subset of the mother iset or not.
		 *
		 * @param {rEverse.ISet} is
		 * @returns {Boolean}
		 */

		subSet: function( is ) {
			// Taking a bool, as we are using the forEach() method.
			// At first bool is false.
			var bool = false;

			// If the s is not defined or the given iset is not actually a iset,
			// then return the bool.
			if( $undefined( is ) || !iset.equals( is ) )
				return bool;

			// Creating a power iset to get the possible iset elements.
			var pset = this.toPowerSet();

			pset.forEach( function( element ) {
				if( element.strictEquals( is ) )
					bool = true;
			} );

			return bool;
		},

		/**
		 * Checks is the given iset is a proper subset of the mother iset or not.
		 *
		 * @param {rEverse.ISet} s
		 * @returns {Boolean}
		 */

		properSubSet: function( s ) {
			// Taking a bool, as we are using the forEach() method.
			// At first bool is false.
			var bool = false;

			// If the s is not defined or the given iset is not actually a iset,
			// then return the bool.
			if( $undefined( s ) || !iset.equals( s ) )
				return bool;

			// Creating a power iset to get the possible iset elements.
			var pset = this.toPowerSet();

			// If the given iset is equal to any subset of this iset and also not equal to this iset
			// is the real subset.
			pset.forEach( pset.last(), function( element ) {
				if( element.strictEquals( s ) && !!!this.strictEquals( s ) )
					bool = true;
			} );

			return bool;
		},

		/**
		 * Returns the first element of the iset.
		 *
		 * @returns {Any_type_of_element}
		 */

		first: function() {
			return this.size() > 0 && this.out( 0 );
		},

		/**
		 * Returns the last element of the iset.
		 *
		 * @returns {Any_type_of_element || undefined}
		 */

		last: function() {
			// To prevent out of bound error.
			return this.size() > 0 && this.out( this.size() - 1 ) || undefined;
		},
	
		/**
		 * Creates a cross iset with given domain and range iset relation.
		 *
		 * Note:- cross is a static method of iset.
		 *
		 * @param {type} domain
		 * @param {type} range
		 * @returns {rEverse.ISet}
		 */

		cross: iset.cross = function( domain, range ) {
			// Creating a iset to return.
			var setx = new iset();

			// If the given elements are not iset.
			if( !iset.equals( domain ) || !iset.equals( range ) )
				return setx;
			else if( iset.isEmptySet( domain ) ) {
				var nArr = [ null ];

				range.forEach( function( element ) {
					nArr.push( element );
					setx.push( nArr );
					nArr = [ null ];
				} );
			} else {
				domain.forEach( function( element ) {
					var nArr = [ element ];

					range.forEach( function( elementx ) {
						nArr.push( elementx );
						setx.push( nArr );
						nArr = [ element ];
					} );
				} );
			}

			return setx;
		},

		/**
		 * Returns true if the given iset is empty.
		 *
		 * @param {rEverse.ISet} s
		 * @returns {Boolean}
		 */

		isEmptySet: iset.isEmptySet = function( s ) {
			return $defined( s ) && iset.equals( s ) && s.size() === 0;
		},

		/**
		 * Checks is the given element is an cross iset or not.
		 *
		 * @param {rEverse.ISet} crossx
		 * @returns {Boolean}
		 */

		isCrossSet: iset.isCrossSet = function( crossx ) {
			// Taking a boolean variable to return.
			var bool = true;

			if( $undefined( crossx ) || !iset.equals( crossx ) )
				return false;

			// Now checking all the elements.
			crossx.forEach( function( element ) {
				if( !Array.isArray( element ) || element.length !== 2 )
					bool = false;
			} );

			return bool;
		},

		/**
		 * Returns the domain iset of a cross iset.
		 *
		 * @param {rEverse.ISet} crossx
		 * @returns {rEverse.ISet}
		 */

		getDomain: iset.getDomain = function( crossx ) {
			// Creating a iset to modify and return.
			var s = new iset();

			if( $undefined( crossx ) || !iset.isCrossSet( crossx ) )
				return s;

			crossx.forEach( function( element ) {
				s.push( element[ 0 ] );
			} );

			return s;
		},

		/**
		 * Returns the range iset of a cross iset.
		 *
		 * @param {rEverse.ISet} crossx
		 * @returns {rEverse.ISet}
		 */

		getRange: iset.getRange = function( crossx ) {
			// Creating a iset to modify and return.
			var s = new iset();

			if( $undefined( crossx ) || !iset.isCrossSet( crossx ) )
				return s;

			crossx.forEach( function( element ) {
				s.push( element[ 1 ] );
			} );

			return s;
		},

		/**
		 * Performes an union operation on the given iset and returns a simple iset.
		 *
		 * @returns {rEverse.ISet}
		 */

		union: iset.union = function() {
			var targets = arguments,
			len = targets.length,
			setx = new iset(),						// New iset for modification.
			i = 0;

			for( ; i < len; i++ ) {
				if( iset.equals( targets[ i ] ) )
					setx.permanentConcat( targets[ i ] );
			}

			// Returning the modified iset.
			return setx;
		},

		/**
		 * Performes an intersection operation on the given targets and returns the modified iset.
		 *
		 * @param {rEverse.ISet} target_1
		 * @param {rEverse.ISet} target_2
		 * @returns {rEverse.ISet}
		 */

		intersection: iset.intersection = function( target_1, target_2 ) {
			// Checking are given sets are actually iset or not.
			// If its not, then a new empty iset will be returned.
			if( !iset.equals( target_1 ) || !iset.equals( target_2 ) )
				return new iset();

			// Searching of valid elements on the both targets and returning the iset.
			return target_1.search( function( element ) {
				return target_2.has( element );
			} );
		},

		/**
		 * Performes an minus operation on the given targets and returns the modified iset.
		 *
		 * Note:- inherited from the mathematical iset.
		 *
		 * @param {rEverse.ISet} target_1
		 * @param {rEverse.ISet} target_2
		 * @returns {rEverse.ISet}
		 */

		minus: iset.minus = function( target_1, target_2 ) {
			// Checking are given sets are actually iset or not.
			// If its not, then a new empty iset will be returned.
			if( !iset.equals( target_1 ) || !iset.equals( target_2 ) )
				return new iset();

			// Searching of valid elements on the both targets by the minus operation algorithm
			// and returning the iset.
			return target_1.search( function( element ) {
				return !!!target_2.has( element );
			} );
		},

		/**
		 * Makes the whole relation inversed done through the cross iset function. Inverses the cross iset.
		 *
		 * @param {rEverse.ISet} crossx
		 * @returns {rEverse.ISet}
		 */

		inverseCross: iset.inverseCross = function( crossx ) {
			// If the parameter is undefined or the given iset is not a cross iset
			// return an empty iset.
			if( $undefined( crossx ) || !iset.isCrossSet( crossx ) )
				return new iset();

			// Now mapping the elements and making them inversed.
			return crossx.map( function( element ) {
				return element.reverse();
			} );
		},
	
		/**
		 * Checks is the given iset is the super iset of this iset or not.
		 *
		 * @param {rEverse.ISet} setx
		 * @returns {Boolean}
		 */

		superSet: function( setx ) {
			return setx.subSet( this );
		},

		/**
		 * The following method keys() returns an Array Iterator of iset keys.
		 *
		 * @returns {Array}
		 */

		keys: function() {
			return this.array.keys();
		},

		/**
		 * The following unite() method unites the whole iset object with a specified knot.
		 *
		 * @param {String} knot
		 * @returns {String}
		 */

		unite: function( knot ) {
			// Fixing the absent knot.
			knot = knot.trim() || " ";

			var arr = this.array,
			len = arr.length,
			string = "",
			i = 0;

			for( ; i < len; i++ ) {
				if( i + 1 === len )
					string = string.concat( arr[ i ] );
				else string = string.concat( arr[ i ], knot );
			}

			return string;
		},

		/**
		 * The following reverse() method reverses the whole iset object.
		 *
		 * @returns {rEverse.ISet}
		 */

		reverse: function() {
			this.array.reverse();

			// Returning the window.
			return this;
		},

		/**
		 * The concat() mehtod concats the given sets with the current one and returns and image of
		 * the concated iset.
		 *
		 * @returns {rEverse.ISet}
		 */

		concat: function() {
			var targets = arguments,
			len = targets.length,

			// Creating a new image ot this iset.
			setx = new iset( this.array ),
			i = 0;

			for( ; i < len; i++ ) {
				if( iset.equals( targets[ i ] ) )
					targets[ i ].forEach( function( element ) {
						setx.push( element );
					} );
			}

			// Now returning the modifies iset.
			return setx;
		},

		/**
		 * Permanently concats the given sets with the current sets. In this method no image is created
		 * and returns the current iset.
		 *
		 * @returns {rEverse.ISet}
		 */

		permanentConcat: function() {
			var targets = arguments,
			len = targets.length,
			i = 0;

			// As this is permanentConcat() method, so the elements will bw added permanently
			// And any kind of images of the current iset will not be returned. Instead of it, the
			// current iset will be returned.
			for( ; i< len; i++ ) {
				if( iset.equals( targets[ i ] ) )
					targets[ i ].forEach( this, function( element ) {
						this.push( element );
					} );
			}

			return this;
		},

		/**
		 * The following hasElement() method checks if the given element as a parameter is exist in
		 * iset class.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		has: function( element ) {
			return element && this.getIndex( element ) > -1;
		},

		/**
		 * The following method getElementIndex() method returns the specific index of existing
		 * element.
		 *
		 * @param {Any_type_of_index} element
		 * @returns {Number}
		 */

		getIndex: function( element ) {
			// If no element defined, return false;
			if( $undefined( element ) )
				return false;

			var arr = this.array,
			len = arr.length,
			i = 0;

			for( ; i < len; i++ ) {
				if( arr[ i ] === element )
					return i;
			}

			return -1;
		},

		/**
		 * Transforms the iset into a string.
		 *
		 * @returns {String}
		 */

		toString: function() {
			return "[object rEverse.ISet]";
		},

		/**
		 * Transforms into a locale string.
		 *
		 * @param {String} locales
		 * @param {Object} option
		 * @returns {String}
		 */

		toLocaleString: function( locales, option ) {
			return this.arr.toLocaleString( locales, option );
		}	// END
	} ) );

	/**
	 * The hashtable class of rEverseJS. Creates a virtual table and provides methods and properties to
	 * manipulate it.
	 *
	 * @param {Number} row_len
	 */

	const hashtable = function( row_len ) {
		// Defining the main table.
		this.table = {
			keys: [],							// The array to store keys.
			structure: {}
		},

		// the column length.
		this.rowx = row_len || 1,

		/**
		 * Private method.
		 *
		 * @returns {Object}
		 */

		this.getTableObject = function() {
			var i = 0,
			len = this.table.keys.length,
			callbackObject = {};						// The callback object.

			// Adding each fields with the key into the callbackObject.
			for( ; i < len; i++ ) {
				callbackObject[ this.table.keys[ i ] ] = this.table.structure[ i ];
			}

			return callbackObject;
		};
	};

	// The hashtable prototype.
	hashtable.prototype = hashtable.os = {
		constructor: hashtable,
		version: hashtable.version = info.version
	};

	// Now adding the prototypes of set class including inheritance of the set
	// configuration.

	RJS.addPrototypes( hashtable.os, utility.extendObject( {
		/**
		 * The put() method of the hashtable adds elements to the main table of hashtable. By this method the elements can
		 * be added with a structure of a table.
		 *
		 * Note:- The first parameter will be counted as the key and the other elements will be added according to
		 * the colums length. If the passed element is less than the column length, the element will be counted as null.
		 *
		 * @returns {Boolean}
		 */

		put: function() {							// Passesd by the arguments.
			var targets = arguments,
			len = targets.length;

			// If no arguments is passed or the targets length is 0, then return false.
			if( len === 0 )
				return false;

			// Setting the column as length.
			len = this.rowx;

			var key = targets[ 0 ];						// The first parameter will be counted as the key.

			// Checking if the given key is existed or not. If yes, then trigger an error.
			if( this.table.keys.indexOf( key ) > -1 || Object.isObject( key ) ) {
				console.error( "rEverse.HashTable.put():- The given key \"" + key + "\" is already existed in the main table or an object." );
				return false;
			}

			var nArr = [],							// The array to set on the main structure.
			i = 1;

			for( ; i <= len; i++ ) {
				// If the element is defined, then push it to the nArr.
				if( $defined( targets[ i ] ) )
					nArr.push( targets[ i ] );
				else nArr.push( null );
			}

			// Setting the main key on the table.keys array.
			this.table.keys.push( key );

			// Setting the array on the sructure.
			this.table.structure[ Object.count( this.table.structure ) ] = nArr;

			return true;
		},

		/**
		 * The get() method of hashtable picks an element from the table with crossing the row and the
		 * column data given on the parameter.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Number} c
		 * @returns {Any_type_of_element}
		 */

		get: function( key, c ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.get():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return;							// Break the execution.
			}

			// If the column number is not valid or greater than column length of the table, then return an error.
			if( c + 1 > this.rowx || $undefined( c ) || c < 0 ) {
				console.error( "rEverse.HashTable.get():- The given column number \"" + c + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			// Now returning the element crossed with the row line and the column line.
			return this.table.structure[ index ][ c ];
		},

		/**
		 * The getX() method returns a whole row of the table identified by the key.
		 *
		 * @param {Any_type_of_element} key
		 * @returns {Array}
		 */

		getX: function( key ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.getX():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return;							// Break the execution.
			}

			// Now returning the table row.
			return this.table.structure[ index ];
		},

		/**
		 * The getY() method returns a whole column of the table identified by the column number.
		 *
		 * @param {Number} column_no
		 * @returns {Array}
		 */

		getY: function( column_no ) {
			// If the column number is not valid or greater than column length of the table, then return an error.
			if( column_no + 1 > this.rowx || $undefined( column_no ) || column_no < 0 ) {
				console.error( "rEverse.HashTable.getY():- The given column number \"" + column_no + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			// Taking an array to push the whole column and return.
			var nArr = [],
			struct = this.table.structure,
			name;								// Name to pass everty property of an object.

			for( name in struct ) {
				// Now pushing the element.
				nArr.push( struct[ name ][ column_no ] );
			}

			// Returning the modified array.
			return nArr;
		},

		/**
		 * The erase() method of hashtable clears an element of the main table with specific key and
		 * the column number.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Number} c
		 * @returns {rEverse.HashTable}
		 */

		erase: function( key, c ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.erase():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return;							// Break the execution.
			}

			// If the column number is not valid or greater than column length of the table, then return an error.
			if( c + 1 > this.rowx || $undefined( c ) || c < 0 ) {
				console.error( "rEverse.HashTable.erase():- The given column number \"" + c + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			// Now making the element null or erasing the element.
			this.table.structure[ index ][ c ] = null;

			// Returning self.
			return this;
		},

		/**
		 * The eraseRow() method erases a whole row of the main table identified by the specific key.
		 *
		 * @param {Any_type_of_element} key
		 * @returns {rEverse.HashTable}
		 */

		eraseRow: function( key ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.eraseRow():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return;							// Break the execution.
			}

			var len = this.table.structure[ index ].length,
			i = 0;

			for( ; i < len; i++ ) {
				// Erasing the whole row.
				this.table.structure[ index ][ i ] = null;
			}

			return this;
		},

		/**
		 * The eraseColumn() method erases a whole column of the main table identified by the specific column number.
		 *
		 * @param {Number} column_no
		 * @returns {rEverse.HashTable}
		 */

		eraseColumn: function( column_no ) {
			// If the column number is not valid or greater than column length of the table, then return an error.
			if( column_no + 1 > this.rowx || $undefined( column_no ) || column_no < 0 ) {
				console.error( "rEverse.HashTable.getY():- The given column number \"" + column_no + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			var name;							// Name to pass everty property of an object.

			for( name in this.table.structure ) {
				this.table.structure[ name ][ column_no ] = null;
			}

			// Returning self.
			return this;
		},

		/**
		 * The update() method of hashtable updates a field of the main table structure identified with
		 * the row and the column number.
		 *
		 * Note:- Only one element can be updated at once.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Number} c
		 * @param {Any_type_of_element} element
		 * @returns {rEverse.HashTable}
		 */

		update: function( key, c, element ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.update():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return;							// Break the execution.
			}

			// If the column number is not valid or greater than column length of the table, then return an error.
			if( c + 1 > this.rowx || $undefined( c ) || c < 0 ) {
				console.error( "rEverse.HashTable.update():- The given column number \"" + c + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			// If the element is undefied, then return self.
			if( $undefined( element ) )
				return this;

			// Now updating the field crossed by the row and the column number.
			this.table.structure[ index ][ c ] = element;

			return this;
		},

		/**
		 * The updateKey() method of hashtable updates replcaces a key name woth another key.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Any_type_of_element} key_t
		 * @returns {rEverse.HashTable}
		 */

		updateKey: function( key, key_t ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.updateKey():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return;							// Break the execution.
			}

			// Changing the key.
			this.table.keys[ index ] = key_t;

			// Returning self.
			return this;
		},

		/**
		 * The updateRow() updates the given row with the argumnts. The given parameters will be counted as a each element
		 * for the updatement.
		 *
		 * Note:- Use null to empty a field during update. Use undefined to ensure not to change the field.
		 *
		 * @returns {rEverse.HashTable}
		 */

		updateRow: function() {							// Passed by the arguments.
			var targets = arguments,
			len = targets.length;

			// If no arguments is passed, then return self.
			if( len === 0 )
				return this;

			// Setting the column as the len.
			len = this.rowx;

			// Now getting the key from the arguments and checking is the key is existed on the
			// main hashtable.
			var key = targets[ 0 ],
			index = this.table.keys.indexOf( key );

			// If the index is -1, which means if the given key is not found, then trigger an error.
			if( index === -1 ) {
				console.error( "rEverse.HashTable.updateRow():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return;
			}

			// The existing row.
			var e_row = this.table.structure[ index ],
			nArr = [],							// Taking an array for modification.
			i = 1;

			for( ; i <= len; i++ ) {
				if( $defined( targets[ i ] ) )
					nArr.push( targets[ i ] );
				else nArr.push( e_row[ i - 1 ] );			// i variable is started with 1;
			}

			this.table.structure[ index ] = nArr;

			// Returning self.
			return this;
		},

		/**
		 * The updateColumn() updates the given column with the argumnts. The given parameters will be counted as a each element
		 * for the updatement.
		 *
		 * Note:- Use null to empty a field during update. Use undefined to ensure not to change the field.
		 *
		 * @returns {rEverse.HashTable}
		 */

		updateColumn: function() {						// Passed by the arguments.
			var targets = arguments,
			len = targets.length;

			// If no arguments is passed, then return self.
			if( len === 0 )
				return this;

			var column_no = targets[ 0 ];

			// If the given column is out of bound, then trigger an error.
			if( column_no + 1 > this.rowx ) {
				console.error( "rEverse.HashTable.updateColumn():- The given column number \"" + column_no + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			var i = 1;

			// Changing the len.
			len = Object.count( this.table.structure );

			// Now changing the columns.
			for( ; i <= len; i++ ) {
				if( $defined( targets[ i ] ) )
					this.table.structure[ i - 1 ][ column_no ] = targets[ i ];
			}

			// Returning self.
			return this;
		},

		/**
		 * Removes a row with given key.
		 *
		 * @param {Any_type_of_element} key
		 * @returns {Boolean}
		 */

		removeRow: function( key ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.removeRow():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return false;							// Break the execution.
			}

			// Deleting the key.
			this.table.keys.splice( index, 1 );

			// Deleting the row.
			this.table.structure.delete( index );

			// Equilizing between the row and the array.
			var i = index,
			len = Object.count( this.table.structure );

			for( ; i <= len; i++ ) {
				// If the next element is defined, then add it into the current element.
				if( $defined( this.table.structure[ i + 1 ] ) )
					this.table.structure[ i ] = this.table.structure[ i + 1 ];
				else this.table.structure.delete( i );				// Else delete it.
			}

			return true;
		},

		/**
		 * Removes a column of the hashtable.
		 *
		 * Note:- This method curtails the column length.
		 *
		 * @param {Number} column_no
		 * @returns {Boolean}
		 */

		removeColumn: function( column_no ) {
			// If the given column is out of bound, then trigger an error.
			if( column_no + 1 > this.rowx ) {
				console.error( "rEverse.HashTable.updateColumn():- The given column number \"" + column_no + "\" is not valid or out of column bound." );
				return false;							// Break the execution.
			}

			var i = 0,
			len = Object.count( this.table.structure );							// To pass every property name of an object.

			for( ; i < len; i++ ) {
				this.table.structure[ i ].splice( column_no, 1 );
			}

			// Curtailing the row length (column length actually).
			--this.rowx;

			// Returning self.
			return true;
		},
	
		/**
		 * Returns the length in row wise.
		 *
		 * @returns {Number}
		 */

		rowLength: function() {
			return Object.count( this.table.structure );
		},

		/**
		 * Returns the length in row wise including the key length.
		 *
		 * @returns {Number}
		 */

		rowLengthIKey: function() {
			return Object.count( this.table.structure ) + 1;
		},

		/**
		 * Returns the length in column wise.
		 *
		 * @returns {Number}
		 */

		columnLength: function() {
			return this.rowx;
		},

		/**
		 * Returns the area of the table.
		 *
		 * Note:- Table is counted without the keys.
		 *
		 * @returns {Number}
		 */

		area: function() {
			return this.rowLength() * this.columnLength();
		},

		/**
		 * Returns the area of the table.
		 *
		 * Note:- Table is counted with the keys.
		 *
		 * @returns {Number}
		 */

		areaTotalTable: function() {
			return this.rowLengthIKey() * this.columnLength();
		},

		/**
		 * Returns the first element of the first row.
		 *
		 * @returns {Any_type_of_element}
		 */

		first: function() {
			return this.table.structure[ 0 ][ 0 ];
		},

		/**
		 * Returns the last element of the last row.
		 *
		 * @returns {Any_type_of_element}
		 */

		last: function() {
			return this.table.structure[
				Object.count( this.table.structure ) - 1
			][
				this.table.structure[ Object.count( this.table.structure ) - 1 ].length - 1
			];
		},

		/**
		 * Returns the key of the given roe number.
		 *
		 * Note:- count the row from 0.
		 *
		 * @param {Number} number
		 * @returns {Any_type_of_element}
		 */

		key: function( number ) {
			// If the number is undefined, then return null.
			if( $undefined( number ) )
				return null;

			// Now returning the specific key.
			return this.table.keys[ number ];
		},

		/**
		 * Returns the first row.
		 *
		 * @returns {Array}
		 */

		firstRow: function() {
			return this.getX( this.key( 0 ) );
		},

		/**
		 * Returns the last row.
		 *
		 * @returns {Array}
		 */

		lastRow: function() {
			return this.getX( this.key( this.table.keys.length - 1 ) );
		},

		/**
		 * Returns the first column.
		 *
		 * @returns {Array}
		 */

		firstColumn: function() {
			return this.getY( 0 );
		},

		/**
		 * Returns the last column.
		 *
		 * @returns {Array}
		 */

		lastColumn: function() {
			return this.getY( this.rowx - 1 );
		},

		/**
		 * Clears the whole hashtable.
		 *
		 * @returns {rEverse.HashTable}
		 */

		clearTable: function() {
			// Clearing the keys.
			this.table.keys = [],

			// Clearing the structure.
			this.table.structure = {};

			// Returning self.
			return this;
		},

		/**
		 * Returns the whole key.
		 *
		 * @returns {Array}
		 */

		totalKeys: function() {
			return this.table.keys;
		},
	
		/**
		 * The zing() method helps to forces an element to specific column no and row with specific key. This method
		 * pushes an element to the given column no.
		 *
		 * Note:- using zing() pushes the other elements existed on the row backword and the last element
		 * may be removed if it's not null.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Number} c
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		zing: function( key, c, element ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.zing():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return false;							// Break the execution.
			}

			// If the column number is not valid or greater than column length of the table, then return an error.
			if( c + 1 > this.rowx || $undefined( c ) || c < 0 ) {
				console.error( "rEverse.HashTable.zing():- The given column number \"" + c + "\" is not valid or out of column bound." );
				return false;							// Break the execution.
			}

			// Taking a vector to manipulate the row array.
			var vec = vector.createVector( this.table.structure[ index ] );

			// Extending the vector limit to force the element.
			vec.extendLimit( vec.limit() + 1 );

			// Now forcing the element to the specific index with is known as the column number in hashtable.
			vec.force( c, element );

			// Now curtailing the limit to slice the last element.
			vec.curtailLimit( vec.limit() - 1 );

			// Now setting the vector array as the row.
			this.table.structure[ index ] = vec.toArray();

			return true;
		},

		/**
		 * Exteds the row length with specific column number.
		 *
		 * Note:- Extended fields will defined with null.
		 *
		 * @param {Number} row
		 * @returns {Boolean}
		 */

		extendRow: function( row ) {
			// If the column length is not valid or greater than column length of the table, then return an error.
			if( $undefined( row ) || row < 0 ) {	// Row is the column length
				console.error( "rEverse.HashTable.extendRow():- The given column number \"" + row + "\" is not valid or undefined." );
				return false;							// Break the execution.
			}

			// Taking an array for modification. cause extending the rows creates null fields.
			var nArr = [],
			len = row,
			i = this.rowx;

			for( ; i < len; i++ ) {
				nArr.push( null );
			}

			// Taking a name to pass the properties of an object.
			var name;

			for( name in this.table.structure ) {
				// Concating the nulls.
				this.table.structure[ name ] = this.table.structure[ name ].concat( nArr );
			}

			return true;
		},

		/**
		 * Curtails the row length with specific column number.
		 *
		 * Note:- curtailRow() method delets the fields under curtail.
		 *
		 * @param {Number} row
		 * @returns {Boolean}
		 */

		curtailRow: function( row ) {
			// If the column length is not valid or greater than column length of the table, then return an error.
			if( $undefined( row ) || row < 0 ) {	// Row is the column length
				console.error( "rEverse.HashTable.curtailRow():- The given column number \"" + row + "\" is not valid or undefined." );
				return false;							// Break the execution.
			}
			else if( row === 0 ) {
				console.error( "rEverse.HashTable.curtailRow():- The row should be at least 1." );
				return false;
			}

			var name;							// Taking a name to pass on every property of an object.

			// Now curtailing all the array of structure of the hashtable.
			for( name in this.table.structure ) {
				var vec = vector.createVector( this.table.structure[ name ] );

				// Now curtailing througn vector.
				vec.curtailLimit( row );

				// Now setting the curtailed vectors array as the row.
				this.table.structure[ name ] = vec.toArray();
			}

			// Now setting the row length.
			this.rowx = row;

			return true;
		},

		/**
		 * The row functions returns the row length or it modifies the row length of the table.
		 *
		 * @param {Number} row
		 * @returns {rEverse.HashTable}
		 */

		row: function( row ) {
			// If the row is undefined, then return the rowx or the length of the table row.
			if( $undefined( row ) )
				return this.rowx;
			else if( row > this.rowx )
				this.extendRow( row );
			else if( row < this.rowx )
				this.curtailRow( row );

			// Returning self.
			return this;
		},

		/**
		 * The forEach() method of hashtable executes a provided callback with a specific this argument
		 * for each fields of hashtable.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		forEach: function( object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !Object.isSimpleObject( object ) ? {} : object;

			var i = 0,
			len = this.table.keys.length,

			// Getting the callback object. Just for perticipation.
			callbackObject = this.getTableObject();

			// Taking a name to pass on every property of an object.
			var name;

			for( name in this.table.structure ) {
				var j = 0,
				len = this.table.structure[ name ].length;

				for( ; j < len; j++ ) {
					// Now calling the callback.
					callback.call(
						object,					// The thisArg object.
						this.table.structure[ name ][ j ],	// The element of the field.
						this.table.keys[ Number.parseInt( name ) ],	// The key.
						j,					// The column no.
						this.table.structure[ name ],		// The row array.
						callbackObject				// The callback object.
					);
				}
			}

			// Returning self.
			return this;
		},

		/**
		 * The forEach() method of hashtable executes a provided callback with a specific this argument
		 * for each rows of hashtable.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		forEachRow: function( key, object, callback ) {
			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.forEachRow():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return false;							// Break the execution.
			}

			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !Object.isSimpleObject( object ) ? {} : object;

			var i = 0,
			len = this.table.keys.length,

			// Getting the callback object. Just for perticipation.
			callbackObject = this.getTableObject();

			// Taking a shortcut array.
			var arr = this.table.structure[ index ],
			len = arr.length,
			j = 0;

			for( ; j < len; j++ ) {
				callback.call( object, arr[ j ], key, j, arr, callbackObject );
			}

			// Returning self.
			return this;
		},

		/**
		 * The forEach() method of hashtable executes a provided callback with a specific this argument
		 * for each columns of hashtable.
		 *
		 * @param {Number} column_no
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		forEachColumn: function( column_no, object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !Object.isSimpleObject( object ) ? {} : object;

			// If the column number is not valid or greater than column length of the table, then return an error.
			if( column_no + 1 > this.rowx || $undefined( column_no ) || column_no < 0 ) {
				console.error( "rEverse.HashTable.forEachColumn():- The given column number \"" + column_no + "\" is not valid or out of column bound." );
				return false;							// Break the execution.
			}

			var i = 0,
			len = this.table.keys.length,

			// Getting the callback object. Just for perticipation.
			callbackObject = this.getTableObject();

			// Taking the column array by hashtbles getX mehtod.
			var arr = this.getY( column_no ),
			len = Object.count( this.table.structure ),
			j = 0;

			for( ; j < len; j++ ) {
				callback.call(
					object,						// The thisArg object.
					this.table.structure[ j ][ column_no ],		// The element of the field.
					this.table.keys[ j ],				// The key.
					column_no,					// The column no.
					arr,						// The column array.
					callbackObject					// The callback object.
				);
			}

			// Returning self.
			return this;
		},

		/**
		 * The petrol() method executes a provided method and searches the every field with valid a boolean.
		 *
		 * Note:- If the boolean gets false with the field, the field will be null.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		petrol: function( object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !Object.isSimpleObject( object ) ? {} : object;

			var i = 0,
			len = this.table.keys.length,

			// Getting the callback object. Just for perticipation.
			callbackObject = this.getTableObject();

			// Taking a variable to store this table, modify and then return it.
			var modTable = hashtable.createHashTable( callbackObject );

			var name;								// Taking a name to pass on every property of an object.

			for( name in modTable.table.structure ) {
				var j = 0,
				len = modTable.table.structure[ name ].length;

				for( ; j < len; j++ ) {
					// Now calling the callback.
					if( !!!callback.call(
						object,					// The thisArg object.
						modTable.table.structure[ name ][ j ],	// The element of the field.
						modTable.table.keys[ Number.parseInt( name ) ],	// The key.
						j,					// The column no.
						modTable.table.structure[ name ],	// The row array.
						callbackObject				// The callback object.
					) )
						modTable.table.structure[ name ][ j ] = null;
				}
			}

			// Returning the modified table.
			return modTable;
		},

		/**
		 * The petrolRow() method executes a provided method and searches the every field with valid a boolean.
		 *
		 * Note:- If the boolean gets false with the field, the field will be null.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		petrolRow: function( key, object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !Object.isSimpleObject( object ) ? {} : object;

			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.petrolRow():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return new hashtable();							// Break the execution.
			}

			var i = 0,
			len = this.table.keys.length,

			// Getting the callback object. Just for perticipation.
			callbackObject = this.getTableObject(),

			// Taking a variable to store this table, modify and then return it.
			modTable = hashtable.createHashTable( callbackObject ),
			j = 0,
			len = this.table.structure[ index ].length;

			for( ; j < len; j++ ) {
				// Now calling the callback.
				if( !!!callback.call(
					object,					// The thisArg object.
					modTable.table.structure[ index ][ j ],	// The element of the field.
					key,					// The key.
					j,					// The column no.
					modTable.table.structure[ index ],	// The row array.
					callbackObject				// The callback object.
				) )
					modTable.table.structure[ index ][ j ] = null;
			}

			// Returning the modified table.
			return modTable;
		},

		/**
		 * The petrolColumn() method executes a provided method and searches the every field with a valid boolean return.
		 *
		 * Note:- Petrols the column. If the boolean gets false with the field, the field will be null.
		 *
		 * @param {Number} column_no
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		petrolColumn: function( column_no, object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			// If the column number is not valid or greater than column length of the table, then return an error.
			if( column_no + 1 > this.rowx || $undefined( column_no ) || column_no < 0 ) {
				console.error( "rEverse.HashTable.petrolColumn():- The given column number \"" + column_no + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			// Now taking a column array just for perticipation on the petrol arguments.
			var columnArray = this.getY( column_no ),
			callbackObject = this.getTableObject(),
			modTable = hashtable.createHashTable( callbackObject );		// To modify and return.

			Object.keys( modTable.table.structure ).forEach( function( key ) {
				if( !!!callback.call(
					object,
					modTable.table.structure[ key ][ column_no ],
					modTable.table.keys[ key ],			// The key.
					column_no,
					columnArray,
					callbackObject
				) )
					modTable.table.structure[ key ][ column_no ] = null;
			} );

			// Returning the modified table.
			return modTable;
		},
	
		/**
		 * Creates a new hashtable from a specific object considering the property name as the key and
		 * returns it.
		 *
		 * @param {Object} object
		 * @returns {rEverse.HashTable}
		 */

		createHashTable: hashtable.createHashTable = function( object ) {
			// If the object is undefined, then return an empty table.
			if( !Object.isPlainObject( object ) )
				return new hashtable();

			// Checking is the properties of the object is array or not. If it is, return empty hashtable.
			for( var N in object )
				if( !Array.isArray( object[ N ] ) )
					return new hashtable();

			// Now creating a new hashtable to add the object values as keys and the rows.
			// Getting the lerargest length of the main arrays, so that no bigger size array gets
			// curtailed.
			var htable = new hashtable( getLeargestLength( object ) ),
			name;

			// Now puting the elements of the object with callback.
			for( name in object ) {
				htable.put.apply( htable, [ name ].concat( object[ name ] ) );
			}

			// To get the leargest array length.
			function getLeargestLength( obj ) {
				// Taking a by default max length.
				var max = obj[ Object.keys( obj )[ 0 ] ].length,
				name;							// To pass the properties.

				for( name in obj ) {
					if( obj[ name ].length > max )
						max = obj[ name ].length;
				}

				// Returning max.
				return max;
			}

			// Returning the hashtable.
			return htable;
		},

		/**
		 * The map() method executes a provided callback and defines values of every fields.
		 *
		 * Note:- The return value of the callback changes fields values.
		 *
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		map: function( object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			var i = 0,
			len = this.table.keys.length,

			// Getting the callback object. Just for perticipation.
			callbackObject = this.getTableObject(),
			name;								// Taking a name to pass on every property of an object.

			for( name in this.table.structure ) {
				var j = 0,
				len = this.table.structure[ name ].length;

				for( ; j < len; j++ ) {
					// Now calling the callback to set the element.
					this.table.structure[ name ][ j ] = callback.call(
						object,					// The thisArg object.
						this.table.structure[ name ][ j ],	// The element of the field.
						this.table.keys[ Number.parseInt( name ) ],	// The key.
						j,					// The column no.
						this.table.structure[ name ],		// The row array.
						callbackObject				// The callback object.
					);
				}
			}

			// Returning the modified table.
			return this;
		},

		/**
		 * The mapRow() method executes a provided callback in row wise fields and defines values of every fields.
		 *
		 * Note:- The return value changes the fields of the current row.
		 *
		 * @param {Any_type_of_element} key
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		mapRow: function( key, object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			// The key index.
			var index = this.table.keys.indexOf( key );

			// If the given key is not existed or undefined, then return an error.
			if( index === -1 || $undefined( key ) ) {
				console.error( "rEverse.HashTable.mapRow():- The given key \"" + key + "\" is not existed in the main table or undefined." );
				return new hashtable();							// Break the execution.
			}

			var i = 0,
			len = this.table.keys.length,

			// Getting the callback object. Just for perticipation.
			callbackObject = this.getTableObject(),
			j = 0,
			len = this.table.structure[ index ].length;

			for( ; j < len; j++ ) {
				// Now calling the callback.
				this.table.structure[ index ][ j ] = callback.call(
					object,					// The thisArg object.
					this.table.structure[ index ][ j ],	// The element of the field.
					key,					// The key.
					j,					// The column no.
					this.table.structure[ index ],	// The row array.
					callbackObject				// The callback object.
				);
			}

			// Returning the modified table.
			return this;
		},

		/**
		 * The mapRow() method executes a provided callback on column wise and defines values of every fields.
		 *
		 * Note:- The return value changes the fields of the current row.
		 *
		 * @param {Number} column_no
		 * @param {Object} object
		 * @param {Function} callback
		 * @returns {rEverse.HashTable}
		 */

		mapColumn: function( column_no, object, callback ) {
			// Managing the parameters.
			callback = Function.isFunction( object ) ? object : callback;
			object = Function.isFunction( object ) || !!!Object.isSimpleObject( object ) ? {} : object;

			// If the column number is not valid or greater than column length of the table, then return an error.
			if( column_no + 1 > this.rowx || $undefined( column_no ) || column_no < 0 ) {
				console.error( "rEverse.HashTable.mapColumn():- The given column number \"" + column_no + "\" is not valid or out of column bound." );
				return;							// Break the execution.
			}

			// Now taking a column array just for perticipation on the petrol arguments.
			var columnArray = this.getY( column_no ),
			callbackObject = this.getTableObject(),
			i = 0,
			len = Object.count( this.table.structure );

			for( ; i < len; i++ ) {
				this.table.structure[ i ][ column_no ] = callback.call(
					object,
					this.table.structure[ i ][ column_no ],
					this.table.keys[ i ],			// The key.
					column_no,
					columnArray,
					callbackObject
				);
			}

			// Returning the modified table.
			return this;
		},

		/**
		 * HashTable.equals() or HashTable.isHashTable() checks the given parameter is a hashtable or not.
		 *
		 * @param {rEverse.HashTable} htable
		 * @returns {Boolean}
		 */

		equals: hashtable.equals = hashtable.isHashTable = function( htable ) {
			// Checking the instance of the given object with the hashtable class.
			return htable instanceof hashtable && htable.constructor === hashtable;
		},

		/**
		 * HashTable.strictEquals() checks the given parameter strictly equals to this hashtable or not.
		 *
		 * @param {rEverse.HashTable} htable
		 * @returns {Boolean}
		 */

		strictEquals: function( htable ) {
			return hashtable.equals( htable ) && ( function( hthis, htable ) {
				// If the both tables area is not equal then return false.
				if( hthis.areaTotalTable() !== htable.areaTotalTable() )
					return false;

				// If the both tables row length is not equal then return false.
				if( hthis.rowLength() !== htable.rowLength() )
					return false;

				// If the both tables column length is not equal then return false.
				if( hthis.columnLength() !== htable.columnLength() )
					return false;

				// Now checking of the keys. If not equal, return false.
				for( var i = 0, len = hthis.table.keys.length; i < len; i++ ) {
					if( hthis.table.keys[ i ] !== htable.table.keys[ i ] )
						return false;
				}

				var name;						// To pass on object.

				for( name in hthis.table.structure ) {
					if( !checkArray( hthis.table.structure[ name ], htable.table.structure[ name ] ) )
						return false;
				}

				// The checkArray function.
				function checkArray( array_1, array_2 ) {
					if( !Array.isArray( array_1 ) || !Array.isArray( array_2 ) )
						return false;

					// If the lengths are not equalized, then return false.
					if( array_1.length !== array_2.length )
						return false;

					var i = 0,
					len = array_1.length;

					for( ; i < len; i++ ) {
						if( array_1[ i ] !== array_2[ i ] )
							return false;
					}

					return true;
				}

				return true;
			} )( this, htable );
		},

		/**
		 * The createHTMLTable() method of hashtable transforms the whole hashtable into a HTML table.
		 *
		 * @returns {HTMLTableElement}
		 */

		createHTMLTable: function() {						// Passed by the arguments.
			var targets = arguments,

			// The table element of html.
			table = document.createElement( "table" ),
			tr = document.createElement( "tr" ),
			i = 1,
			len = this.rowx,

			// To push the key header.
			keyTH = document.createElement( "th" );

			keyTH.innerHTML = targets[ 0 ] || "Key";
			tr.appendChild( keyTH );

			// Now adding other headers.
			for( ; i <= len; i++ ) {
				var th = document.createElement( "th" );
				th.innerHTML = targets[ i ] || "Column_" + i;
				tr.appendChild( th );					// Adding the headers to the row.
			}

			// Adding the whole row to the table.
			table.appendChild( tr );

			var name;							// To pass it on object.

			for( name in this.table.structure ) {
				// Creating a new row.
				var trx = document.createElement( "tr" ),
				KTD = document.createElement( "td" ),
				j = 0,
				len = this.table.structure[ name ].length;

				// The key.
				KTD.innerHTML = this.table.keys[ Number.parseInt( name ) ];

				// Appending the key.
				trx.appendChild( KTD );

				// Now adding the values.
				for( ; j < len; j++ ) {
					var td = document.createElement( "td" );
					td.innerHTML = this.table.structure[ name ][ j ];
					trx.appendChild( td );
				}

				// Now pushing it into the table.
				table.appendChild( trx );
			}

			// Returning the modifed HTML table.
			return table;
		},

		/**
		 * Transforms hashtable into a string.
		 *
		 * @returns {String}
		 */

		toString: function( /* No Radix */ ) {
			return "[object rEverse.HashTable]";
		},

		/**
		 * Transforms hashtable into a locale string.
		 *
		 * @param {String} locales
		 * @param {Object} option
		 * @returns {String}
		 */

		toLocaleString: function( locales, option ) {
			return this.getTableObject().toLocaleString( locales, option );
		}	// END
	} ) );

	// Holds all the callbacks queue attached with DOM elements.
	// Static.
	var helixChainObject = {
		attachments: [],
		chains: {}
	};

	// Holds the infos of the elements.
	var helixInfoObject = {
		attachments: [],
		infos: {}
	};
	
	// Holds the datas of the elements.
	var helixDataObject = {
		attachments: [],
		datas: {}
	};

	// Holds the note of the elements.
	var helixNoteObject = {
		attachments: [],
		notes: {}
	};

	// Holds the selector expressions.
	let pseudos = {
		plain: {
			visibled: function() {
				var prop = this.style.getPropertyValue( "visibility" );
			
				// The empty value will be counted as visibled cause, while holding an empty string element is sill visibled.
				return prop === "visibled" || prop === "";
			},
		
			invisibled: function() {
				this.style.getPropertyValue( "visibility" ) === "hidden";
			},
		
			displayed: function() {
				var prop = this.style.getPropertyValue( "display" );
			
				return prop === "block" || prop === "";
			},
		
			"not-displayed": function() {
				this.style.getPropertyValue( "display" ) === "none";
			},
		
			shown: function() {
				return !!!this.hidden;
			},
		
			first: function() {
				return [ this.parentNode.children[ 0 ] ];
			},
		
			last: function() {
				var parentChild = this.parentNode.children;
				
				return [ parentChild[ parentChild.length - 1 ] ];
			},
		
			"first-child": function() {
				return [ this.children[ 0 ] ];
			},
		
			"last-child": function() {
				var child = this.children;
			
				return [ child[ child.length - 1 ] ];
			},
			
			next: function() {
				return [ this.nextElementSibling ];
			},
			
			"next-all": function() {
				var elem = this.nextElementSibling,
					arr = [];
				
				for( ; elem; elem = elem.nextElementSibling ) {
					if( elem.nodeType === 1 ) 
						arr.push( elem );
				}
				
				return arr;
			},
			
			wsNext: function() {
				return [ this, this.nextElementSibling ];
			},
			
			"wsNext-all": function() {
				var elem = this.nextElementSibling,
					arr = [ this ];
				
				for( ; elem; elem = elem.nextElementSibling ) {
					if( elem.nodeType === 1 ) 
						arr.push( elem );
				}
				
				return arr;
			},
			
			previous: function() {
				return [ this.previousElementSibling ];
			},
			
			"previous-all": function() {
				var elem = this.previousElementSibling,
					arr = [];
				
				for( ; elem; elem = elem.previousElementSibling ) {
					if( elem.nodeType === 1 ) 
						arr.unshift( elem );
				}
				
				return arr;
			},
			
			wsPrevious: function() {
				return [ this, this.previousElementSibling ];
			},
			
			"wsPrevious-all": function() {
				var elem = this.previousElementSibling,
					arr = [ this ];
				
				for( ; elem; elem = elem.previousElementSibling ) {
					if( elem.nodeType === 1 ) 
						arr.unshift( elem );
				}
				
				return arr;
			},
		},
		
		functional: {
			sibling: function( param ) {
				return selector( param, this.parentNode.children, 1, true );
			},
		
			"sibling-of-type": function( param ) {
				return selector( param, this.parentNode.children, 1 );
			},
		
			lax: function( param ) {
				return selector( param, this.parentNode.children, 0, true );
			},
		
			"lax-of-type": function( param ) {
				return selector( param, this.parentNode.children, 0 );
			},
		
			// Starts count from the very end representing the element index asceding from 1.

			x: function( param ) {
				var pnodes = Array.toArray( this.parentNode.children ),
					ev     = eval( param ),
					elem   = pnodes[ pnodes.length - ev ];

				return elem === undefined ? [] : [ elem ];
			},
		
			// Starts count from the very end representing the element index asceding from 0.
		
			lx: function( param ) {
				var pnodes = Array.toArray( this.parentNode.children ),
					ev     = eval( param ),
					elem   = pnodes[ pnodes.length - ev - 1 ];

				return elem === undefined ? [] : [ elem ];
			},
		
			child: function( param ) {
				return selector( param, this.children, 1, true );
			},
		
			"child-of-type": function( param ) {
				return selector( param, this.children, 1 );
			},
			
			con: function( param ) {
				return selector( param, this.children, 0, true );
			},
			
			"con-of-type": function( param ) {
				return selector( param, this.children, 0 );
			},
			
			childx: function( param ) {
				var nodes = Array.toArray( this.children ),
					ev    = eval( param ),
					elem  = nodes[ nodes.length - ev ];

				return elem === undefined ? [] : [ elem ];
			},
			
			conx: function( param ) {
				var nodes = Array.toArray( this.children ),
					ev    = eval( param ),
					elem  = nodes[ nodes.length - ev - 1 ];

				return elem === undefined ? [] : [ elem ];
			},
			
			"class": function() {
				var bool = true;
				
				Array.toArray( arguments ).forEach( function( cls ) {
					if( !this.classList.contains( cls ) ) 
						bool = false;
				}, this );
				
				return bool;
			},
			
			id: function( id ) {
				// Check if the current element has the id.
				return this.id === id;
			},
			
			contains: function() {
				var bool = true;
				
				Array.toArray( arguments ).forEach( function( selector ) {
					if( this.querySelector( selector || null ) === null ) 
						bool = false;
				}, this );
				
				return bool;
			},
			
			value: function( value ) {
				return this.value === value;
			}
		},
	};

	function selector( param, nodes, startIndex, caseSensitive ) {
		startIndex    = Number.isNumber( startIndex ) ? startIndex : 0,
		caseSensitive = Boolean.isBoolean( caseSensitive ) ? caseSensitive : false;
	
		var digit = /^([\(]?\d+[\)]?)(\s*(\+|-|\*|\/)\s*[\(]?\d+[\)]?)*$/g,
		    bool  = Boolean( startIndex ),
		    name  = caseSensitive === true ? ( nodes[ 0 ] || { nodeName: null } ).nodeName : null,
		    _len  = bool === true ? nodes.length + 1 : nodes.length,
		    _lenx = bool === false ? -1 : 0;
	
		// For even indexed type elements.
		if( param === "even" ) 
			return selector( bool && "2n" || "2n-1", nodes, startIndex, caseSensitive );
		
		// Selecting odd members.
		else if( param === "odd" ) 
			return selector( bool && "2n-1" || "2n", nodes, startIndex, caseSensitive );
		
		// Selecting all members. But should follow the node name of the first element on the sibling row.
		else if( param === "all" ) 
			return caseSensitive === true ? fetchSiblingNodeTypes( nodes ) : Array.toArray( nodes );
		
		// If the given parameter is a digit type or covers something like digits, then return element
		// from the node assuming the evaluated digits as the index.
		else if( digit.test( param ) ) {
			var ev = eval( param );
			
			if( ev < _len && ev > _lenx ) {
				var elem = nodes[ bool === true ? ev - startIndex : ev ];
				
				return caseSensitive === false ? [ elem ] : 
					elem.nodeName === name && [ elem ] || [];
			}
		} else {
			var arr = [],
			    i   = startIndex,
			    len = bool === true ? nodes.length + 1 : nodes.length

			for( ; i < len; i++ ) {
				var ev = eval( param.replace( /n/g, function( match, offset ) {
					if( isCharacterNumber( param[ offset - 1 ] ) ) 
						return "*" + i.toString();
				
					return i;
				} ) );

				if( ev < _len && ev > _lenx ) {
					var elem = nodes[ bool === true ? ev - startIndex : ev ];
				
					if( caseSensitive === true ) {
						if( elem.nodeName === name ) 
							arr.push( elem );
					} else arr.push( elem );
				}
			}
		
			return arr;
		}
	
		return [];
	}

	function fetchSiblingNodeTypes( array ) {
		// Transforming to an array.
		array = Array.toArray( array );

		// The first node name.
		var name = array[ 0 ].nodeName,
		     arr = [];

		array.forEach( function( node ) {
			if( node.nodeName === name ) 
				arr.push( node );
		} );

		return arr;
	}
	
	var charNums = utility.range( 0, 9 ).map( function( x ) {
		return x.toString();
	} ),
	
		charLetters = utility.range( 'A', 'Z' ).concat( utility.range( 'a', 'z' ), charNums, [ '_', '-', '$' ] );

	function isCharacterNumber( num ) {
		return charNums.contains( num );
	}
	
	function isLetter( char ) {
		return charLetters.contains( char );
	}

	/**
	 * Adding same like pseudo functionalities.
	 */

	"checked selected async autofocus autoplay controls defer disabled hidden ismap loop multiple open readonly changed required compact scoped animated".split( " " ).forEach( function( pseudo ) {
		pseudos.plain[ pseudo ] = function() {
			return this[ pseudo ];
		};
	} );

	// Input type checker pseudos.
	"button checkbox color date datetime-local email file hidden image month number password radio range reset search submit tel text time url week".split( " " ).forEach( function( type ) {
		pseudos.plain[ type ] = function() {
			return this.nodeName === "INPUT" && this.getAttribute( "type" ) === type;
		}
	} );
	
	var NO_CONTEXT = generateID();

	/**
	 * The helix class of rEverseJS. The helix class is to manipulate the DOM basically. The cortex holds the
	 * advanvanced manipulating systems, but helix has the main initiative components.
	 *
	 * @param {String || Object} selector
	 * @param {Object} context
	 */

	var helix = function( selector, context ) {
		// If the new keyword is absent before calling helix, then return an instance of helix.
		if( window === this ) 
			return addParent( new helix( selector, context ) );
		
		if( context !== NO_CONTEXT ) {
			this.context = helix( document, NO_CONTEXT );
			
			if( Object.isSimpleObject( context ) ) {
				if( helix.equals( context ) ) {
					if( context.size() !== 0 ) 
						this.context = context;
				}
				else this.context = helix( context, NO_CONTEXT );
			}
		}
	
		var element = querySelector( selector, ( this.context || { element: Function.create( document ) } ).element() ),
			     i = 0, len = element.length;
	
		for( ; i < len; i++ ) {
			this[ i ] = element[ i ];
		}
	
		// Setting the length.
		this.length = len;
		
		addParent( this );
	};
	
	// RegExp's for match.
	
	var real_attribute    = /!*\[\s*((([-]*\w+|\w+[-]+\w+)+\s*([=@\$\^\!&\|]?[=\$@]?=)\s*(["'])(?:(?=(\\?))\2.)*?\5)+)(\s+and\s+((\w+|\w+-\w+)+\s*([=@\$\^\!&\|]?[=\$@]?=)\s*(["'])(?:(?=(\\?))\2.)*?\11)+)*\s*\]/gm,
	    has_attribute     = /!*\[\s*(([-]*\w+|\w+[-]+\w+)+)(\s*,\s*([-]*\w+|\w+[-]+\w+)+)*\s*\]/gm,
	    pseudo_functional = /^!*([-]*\w+|\w+[-]+\w+)+\((.*)(,\s*.*)*\)$/,
	    pseudo_plain      = /^!*([-]*\w+|\w+[-]+\w+)+$/,
	    type              = /!*{\s*.*\s*}/gm;
	
	var quote = /(["'])(?:(?=(\\?))\2.)*?\1/g;
	
	function finalQuery( selector, context ) {
		// If the string is empty, return an empty array.
		if( String.isEmpty( selector ) ) 
			return [];
		
		// Fetching ':' to '::'.
		selector = fetch_double_colon( selector );
		
		var all_preg = /\[all\]/g,
			d_colon = /::/g;
		
		if( all_preg.test( selector ) ) {
			selector = selector.replace( all_preg, "" );
			
			if( d_colon.test( selector ) ) {
				var select = selector.split( d_colon ).filter( function( boolean ) { return !String.isEmpty( boolean ); } ),
				  m_select = select.shift(),
				    r_attr = m_select.match( real_attribute ) || [],
				    h_attr = m_select.match( has_attribute ) || [],
				    type_m = m_select.match( type ) || [];
				
				m_select = m_select.remove( real_attribute ).remove( has_attribute ).remove( type );
				
				Array.prototype.unshift.apply( select, r_attr.concat( h_attr, type_m ) );
				
				var m = Array.toArray( context.querySelectorAll( m_select ) ),
				  len = m.length,
				    i = 0;
				
				for( ; i < len; i++ ) {
					var check = finalCheck( m[ i ], select );
					
					if( Boolean.isBoolean( check ) ) {
						if( check === false ) {
							m.remove( i );
							
							len = m.length;
							
							// Decreasing the index, as the index element has been removed.
							i--;
						}
					}
					else if( Object.isObject( check ) ) 
						return check;
				}
				
				return m;
			}
			
			var r_attr = selector.match( real_attribute ) || [],
			    h_attr = selector.match( has_attribute ) || [],
			    type_m = selector.match( type ) || [];
			
			selector = selector.remove( real_attribute ).remove( has_attribute ).remove( type );
			
			return Array.toArray( context.querySelectorAll( selector ) ).filter( function( elem ) {
				return finalCheck( elem, r_attr.concat( h_attr, type_m ) );
			} );
		} else {
			var elem;
		
			if( d_colon.test( selector ) ) {
				var m = selector.split( d_colon ).filter( function( boolean ) { return !String.isEmpty( boolean ); } );
				
				var s_select = m.shift(),
				      r_attr = s_select.match( real_attribute ) || [],
			           h_attr = s_select.match( has_attribute ) || [],
					 type_m = s_select.match( type ) || [];
				
				s_select = s_select.remove( real_attribute ).remove( has_attribute ).remove( type );
				
				Array.prototype.unshift.apply( m, r_attr.concat( h_attr, type_m ) );
				
				elem = context.querySelectorAll( s_select );

				var i = 0, len = elem.length;

				// Generally the static query selector always selects the first element
				// of a node list. But if the given boolean is not met with the first element then
				// jump to the second one and if still not met, then jump to the third one and so on.
				for( ; i < len; i++ ) {
					// Identify.
					var check = finalCheck( elem [ i ], m );

					// If 'check' is a boolean and it is true, then return the element.
					if( Boolean.isBoolean( check ) ) {
						if( check === true )
								return [ elem[ i ] ];
					}
					else if( Object.isObject( check ) )		// If the 'check' is not boolean type.
						return check;
				}
			} else {
				var r_attr = selector.match( real_attribute ) || [],
				    h_attr = selector.match( has_attribute ) || [],
				    type_m = selector.match( type ) || [], r_select;
				
				selector = selector.remove( real_attribute ).remove( has_attribute ).remove( type );
				
				r_select = context.querySelectorAll( selector );
				
				var i = 0, len = r_select.length;
				
				for( ; i < len; i++ ) 
					if( finalCheck( r_select[ i ], r_attr.concat( h_attr, type_m ) ) === true ) 
						return [ r_select[ i ] ];
			}
		}
		
		return [];
	}
	
	function finalCheck( elem, booleans ) {
		// Taking a boolean to return.
		var bool = true,
		 nc_bool = false,
		nc_array = [];
		
		booleans.forEach( function( boolean ) {
			if( nc_bool === true ) 
				nc_array = subFinalCheck( nc_array, boolean );
			else {
				var store = subFinalCheck( elem, boolean );
				
				if( Boolean.isBoolean( store ) ) 
					bool = store;
				else {
					nc_array = store;
					
					nc_bool = true;
				}
			}
		} );
		
		return nc_bool === true ? nc_array : bool;
	}
	
	// RegExp's specially for testing.
	
	var real_attribute_test = /^!*\[\s*((([-]*\w+|\w+[-]+\w+)+\s*([=@\$\^\!&\|]?[=\$@]?=)\s*(["'])(?:(?=(\\?))\2.)*?\5)+)(\s+and\s+((\w+|\w+-\w+)+\s*([=@\$\^\!&\|]?[=\$@]?=)\s*(["'])(?:(?=(\\?))\2.)*?\11)+)*\s*\]$/,
	    has_attribute_test  = /^!*\[\s*(([-]*\w+|\w+[-]+\w+)+)(\s*,\s*([-]*\w+|\w+[-]+\w+)+)*\s*\]$/,
	    type_test           = /^!*{\s*.*\s*}$/;
	
	function subFinalCheck( elem, boolean ) {
		var t_array = [];
		
		if( real_attribute_test.test( boolean ) ) {
			if( Array.isArray( elem ) ) {
				var i = 0, len = elem.length;
				
				for( ; i < len; i++ ) {
					// If the element does not match the case, remove it.
					if( real_attribute_check( elem[ i ], boolean ) === false ) {
						elem.remove( i );
						
						len = elem.length;
						
						i--;
					}
				}
			} else return real_attribute_check( elem, boolean );
		}
		else if( has_attribute_test.test( boolean ) ) {
			if( Array.isArray( elem ) ) {
				var i = 0, len = elem.length;
				
				for( ; i < len; i++ ) {
					// If the element does not match the case, remove it.
					if( has_attribute_check( elem[ i ], boolean ) === false ) {
						elem.remove( i );
						
						len = elem.length;
						
						i--;
					}
				}
			} else return has_attribute_check( elem, boolean );
		}
		else if( type_test.test( boolean ) ) {
			var t_string = boolean.replace( /[{}]/g, "" );
			
			if( Array.isArray( elem ) ) {
				var i = 0, len = elem.length;
				
				for( ; i < len; i++ ) {
					// If the element does not match the case, remove it.
					if( subFinalCheck( elem[ i ], t_string ) === false ) {
						elem.remove( i );
						
						len = elem.length;
						
						i--;
					}
				}
			} else return subFinalCheck( elem, t_string );
		}
		else if( pseudo_plain.test( boolean ) ) {
			if( Array.isArray( elem ) ) {
				var i = 0, len = elem.length;
				
				for( ; i < len; i++ ) {
					var result = pseudo_plain_check( elem[ i ], boolean );
					
					if( Boolean.isBoolean( result ) ) {
						if( result === false ) {
							elem.remove( i );
							
							len = elem.length;
						
							i--;
						}
					} else {
						t_array = result;
						
						break;
					}
				}
			} else {
				var result = pseudo_plain_check( elem, boolean );
				
				if( Boolean.isBoolean( result ) ) 
					return result;
				else t_array = result;
			}
		}
		else if( pseudo_functional.test( boolean ) ) {
			if( Array.isArray( elem ) ) {
				var i = 0, len = elem.length;
				
				for( ; i < len; i++ ) {
					var result = pseudo_functional_check( elem[ i ], boolean );
					
					if( Boolean.isBoolean( result ) ) {
						if( result === false ) {
							elem.remove( i );
							
							len = elem.length;
						
							i--;
						}
					} else {
						t_array = result;
						
						break;
					}
				}
			} else {
				var result = pseudo_functional_check( elem, boolean );
				
				if( Boolean.isBoolean( result ) ) 
					return result;
				else t_array = result;
			}
		}
		
		return !Array.isEmpty( t_array ) ? helixIteratorObject( t_array ) : Array.isArray( elem ) && elem || false;
	}
	
	var space = /\s+/g;
	
	function real_attribute_check( elem, fetchFragment ) {
		// Getting the not(s) from the beginning of the fragment.
		var not_eval = eval( ( fetchFragment.match( /^!+/ ) || " " )[ 0 ] + "!!10" );
		
		fetchFragment = fetchFragment.remove( /^!+/ );
		
		var quote_match = fetchFragment.match( quote ),
				index = 0,
				   id = generateID();
		
		var bool = true,
		  equals = /[=@\$\^\!&\|]*[=\$@]*=/;
		
		fetchFragment.replace( quote, id ).remove( /^\[|\]$/g ).split( /\s+and\s+/g ).map( function( piece ) {
			return piece.remove( space );
		} ).forEach( function( attr ) {
			var symbol = attr.match( equals )[ 0 ],
			components = attr.split( equals ),
			
			    result = ra_component_check( elem, components[ 0 ], components[ 1 ].replace( id, function() { return quote_match[ index++ ]; } ).remove( /^["']|["']$/g ), symbol );
			
			if( result === false ) 
				bool = false;
		} );
		
		return utility.impact( not_eval, bool );
	}
	
	function ra_component_check( elem, name, value, symbol ) {
		// The attribute value.
		var attr = elem.getAttribute( name );
		
		switch( symbol ) {
			case "===": {
				return attr === value;
			}
			case "=": {
				return attr === value;
			}
			case "!==": {
				return attr !== value;
			}
			case "==": {
				return attr.remove( space ).toLowerCase() === value.remove( space ).toLowerCase();
			}
			case "!=": {
				return attr.remove( space ).toLowerCase() === value.remove( space ).toLowerCase();
			}
			case "^==": {
				var preg = new RegExp( toRegExp( value, "^" ) );
				
				return attr.test( preg );
			}
			case "$==": {
				var preg = new RegExp( toRegExp( value, "$" ) );
				
				return attr.test( preg );
			}
			case "@==": {
				var preg = new RegExp( toRegExp( value ) );
				
				return attr.test( preg );
			}
			case "&==": {
				var preg = new RegExp( toRegExp( value, "^" ) );
				
				return !attr.test( preg );
			}
			case "~==": {
				var preg = new RegExp( toRegExp( value, "$" ) );
				
				return !attr.test( preg );
			}
			case "|==": {
				var preg = new RegExp( toRegExp( value ) );
				
				return !attr.test( preg );
			}
			case "^=": {
				var preg = new RegExp( toRegExp( value.remove( space ), "^" ), "i" );
				
				return attr.remove( space ).test( preg );
			}
			case "$=": {
				var preg = new RegExp( toRegExp( value.remove( space ), "$" ), "i" );
				
				return attr.remove( space ).test( preg );
			}
			case "@=": {
				var preg = new RegExp( toRegExp( value.remove( space ) ), "i" );
				
				return attr.remove( space ).test( preg );
			}
			case "!^=": {
				var preg = new RegExp( toRegExp( value.remove( space ), "^" ), "i" );
				
				return !attr.remove( space ).test( preg );
			}
			case "!$=": {
				var preg = new RegExp( toRegExp( value.remove( space ), "$" ), "i" );
				
				return !attr.remove( space ).test( preg );
			}
			case "!@=": {
				var preg = new RegExp( toRegExp( value.remove( space ) ), "i" );
				
				return !attr.remove( space ).test( preg );
			}
		}
		
		return false;
	}
	
	// Not standard. It may be replaced.
	function toRegExp( string, block ) {
		string = string.replace( /[\\\+\*\?\[\]\(\)\:\^\$]/g, function( match ) {
			return '\\' + match;
		} );
		
		switch( block ) {
			case '^': 
				return '^' + string;
			case '$': 
				return string + '$';
			case "^$": 
				return '^' + string + '$';
		}
		
		return string;
	}
	
	function has_attribute_check( elem, fetchFragment ) {
		// Getting the not(s) from the beginning of the fragment.
		var not_eval = eval( ( fetchFragment.match( /^!+/ ) || " " )[ 0 ] + "!!10" );
		
		fetchFragment = fetchFragment.remove( /^!+/ );
		
		var has = true;
		
		fetchFragment.replace( /\[|\]/g, "" ).split( /\s*,\s*/g ).forEach( function( attr ) {
			if( !elem.hasAttribute( attr ) ) 
				has = false;
		} );
		
		return utility.impact( has, not_eval );
	}
	
	function pseudo_plain_check( elem, fetchFragment ) {
		// Getting the not(s) from the beginning of the fragment.
		var not_eval = eval( ( fetchFragment.match( /^!+/ ) || " " )[ 0 ] + "!!10" );
		
		fetchFragment = fetchFragment.remove( /^!+/ );
		
		var result;
		
		if( pseudos.plain[ fetchFragment ] ) 
			result = pseudos.plain[ fetchFragment ].call( elem );
		
		return Array.isArray( result ) ? result : 
			Boolean.isBoolean( result ) ? utility.impact( not_eval, result ) : result == null ? 
			[] : [ result ];
	}
	
	function pseudo_functional_check( elem, fetchFragment ) {
		// Getting the not(s) from the beginning of the fragment.
		var not_eval = eval( ( fetchFragment.match( /^!+/ ) || " " )[ 0 ] + "!!10" );
		
		fetchFragment = fetchFragment.remove( /^!+/ );
		
		var name_preg = /[^\(]+/,
			  m_name = fetchFragment.match( name_preg )[ 0 ],
			 quote_m = fetchFragment.match( quote ),
			quote_id = generateID(),
			   index = 0;
		
		fetchFragment = fetchFragment.remove( name_preg ).replace( quote, quote_id ).replace( /[\(|\)]/g, "" ).split( /\s*,\s*/g ).map( function( str ) {
			return str.replace( quote_id, function() {
				return quote_m[ index++ ].replace( /^["']|["']$/g, "" );
			} );
		} );
		
		var result;
		
		if( pseudos.functional[ m_name ] ) 
			result = pseudos.functional[ m_name ].apply( elem, fetchFragment );
		
		return Array.isArray( result ) ? result : 
			Boolean.isBoolean( result ) ? utility.impact( not_eval, result ) : result == null ? 
			[] : [ result ];
	}

	function querySelector( selector, context ) {
		if( String.isString( selector ) ) {
			// Fixing the selector string.
			selector = toDecentString( selector );
				
			var quote_match = selector.match( quote ) || [],
				   index_a = 0,
				  quote_id = generateID();
				
			selector = selector.replace( quote, quote_id );
			
			// Selector fractions on ' > '.
			var fractions = selector.split( /\s*>\s*/g ).map( function( piece ) {
				return piece.replace( new RegExp( quote_id, "g" ), function() {
					return quote_match[ index_a++ ];
				} );
			} );
			
			var select = [ context ],
				    i = 0;
			
			for( ; i < fractions.length; i++ ) {
				// If 'select' is empty, then break.
				if( Array.isEmpty( select ) ) 
					break;
				
				select = finalQuery( fractions[ i ], select[ 0 ] );
			}
			
			return select;
		}
		else if( Object.isObject( selector ) ) {
			// If the selector is an array and contains HTML elements, return it.
			if( Array.isArray( selector ) ) 
				return helixIteratorObject( selector );
			
			// As null is an object, that should be handled.
			else if( $null( selector ) ) 
				return [];
				
			// If the 'selector' is an array like object transform it into an array and check if the array contains any HTML element.
			// If contains, return it.
			else if( Array.isArrayLike( selector ) ) 
				return helixIteratorObject( Array.toArray( selector ) );
				
			// Else if it's a plain object, pass a string to the querySelector() by fetching it.
			else if( Object.isPlainObject( selector ) ) {
				// If selector 'select' or selector 'type' is not defined, throw new TypeError. Cause without the select and type the object cannot be
				// Converted to string.
				if( !selector.select || !selector.type ) 
					throw new TypeError( "rEverse.Helix():- The selector or the selector type is undefined." );
				
				return querySelector( obj2str( selector ) );
			}
			else if( RJS.string.call( selector ) !== "[object Object]" && RJS.string.call( selector ).contains( "HTML" ) )
				return [ selector ];
		}
		
		return [];
	}
	
	// Function to transform a selector string to a decent string.
	function toDecentString( string ) {
		string = finalTrim( string.replace( /\[\s*all\s*\]\s*/g, "[all]" ) );
		
		var real_attribute_match = string.match( real_attribute ) || [],
					  index_a = 0,
			  real_attribute_id = generateID();
			  
		string = string.replace( real_attribute, real_attribute_id );
			  
		var quote_match = string.match( quote ) || [],
			   index_b = 0,
			  quote_id = generateID();
			  
		string = string.replace( quote, quote_id );
		
		var i = 0, len = string.length, stringContainer = [];
		
		for( ; i < len; i++ ) {
			var now = string[ i ], prev = string[ i - 1 ], next = string[ i + 1 ];
			
			if( now === ' ' ) {
				if(
					isLetter( prev ) && isLetter( next ) ||
					isLetter( prev ) && next === '#' ||
					isLetter( prev ) && next === '.' ||
					isLetter( prev ) && next === '[' ||
					isLetter( prev ) && next === '*' ||
					prev === ')' && isLetter( next ) ||
					prev === ')' && next === '#' ||
					prev === ')' && next === '.' ||
					prev === ')' && next === '[' ||
					prev === ')' && next === '*' ||
					prev === ']' && isLetter( next ) ||
					prev === ']' && next === '#' ||
					prev === ']' && next === '.' ||
					prev === ']' && next === '[' ||
					prev === ']' && next === '*' ||
					prev === '}' && isLetter( next ) ||
					prev === '}' && next === '#' ||
					prev === '}' && next === '.' ||
					prev === '}' && next === '[' ||
					prev === '}' && next === '*' ||
					prev === '*' && isLetter( next ) ||
					prev === '*' && next === '#' ||
					prev === '*' && next === '.' ||
					prev === '*' && next === '[' ||
					prev === '*' && next === '*'
				) 
					stringContainer.push( ' > ' );
			} else stringContainer.push( now );
		}
	
		return stringContainer.join( "" ).replace( new RegExp( real_attribute_id, "g" ), function() {
			return real_attribute_match[ index_a++ ];
		} ).replace( new RegExp( quote_id, "g" ), function() {
			return quote_match[ index_b++ ];
		} );
	}
	
	function fetch_double_colon( selector ) {
		var quote_match = selector.match( quote ) || [],
			   index_a = 0,
			  quote_id = generateID(),
			d_colon_id = generateID();
		
		selector.replace( quote, quote_id );
		
		return selector.replace( /::/g, d_colon_id ).replace( /:/g, "::" ).replace( new RegExp( d_colon_id, "g" ), "::" );
	}
	
	function finalTrim( string ) {
		string = string.trim();
		
		var quote_match = string.match( quote ) || [],
				index = 0,
				   id = generateID();
		
		string = string.replace( quote, id );
		
		return string.split( /\s+/g ).filter( function( elem ) {
			return elem.length > 0;
		} ).join( " " ).replace( new RegExp( id, "g" ), function() {
			return quote_match[ index++ ];
		} );
	}
	
	function generateID() {
		return "XXXX-X-XXXX-MN".replace( /X/g, function() {
			return charNums.random();
		} ).replace( /M/g, utility.range( 'A', 'Z' ).random() ).replace( /N/g, utility.range( 'a', 'z' ).random() );
	}
	
	function helixIteratorObject( arr ) {
		var array = [],
		    i     = 0,
		    len   = arr.length;
		
		for( ; i < len; i++ ) {
			if( RJS.string.call( arr[ i ] ) !== "[object Object]" && RJS.string.call( arr[ i ] ).contains( "HTML" ) ) 
				array.push( arr[ i ] );
		}
		
		return array;
	}
	
	function obj2str( object ) {
		var str = "";
		
		if( object.type === "multiple" ) 
			str = str.concat( "[all]", object.select );
		else if( object.type === "single" ) 
			str = str.concat( object.select );
		else return "";
		
		// If the object contains boolean, add the booleans.
		if( object.boolean ) 
			str = str.concat( "::", Array.isArray( object.boolean ) ? object.boolean.join( "::" ) : object.boolean );
		
		// If to get the next element.
		if( object.next ) 
			return str.concat( " ", obj2str( object.next ) );
		
		return str;
	}

	// Now adding the prototypes to the initiate class.
	helix.implement( {
		constructor: helix,
		version: helix.version = info.version,

		/**
		 * Works like an array method in helix making helix a full time array like object.
		 */

		slice  : Array.prototype.slice,
		splice : Array.prototype.splice,
		sort   : Array.prototype.sort,
		indexOf: Array.prototype.indexOf,
		
		element: function( index ) {
			// If the index is undefined or null, return the first element.
			if( index == null || !Number.isNumber( index ) )
				return this.length > 0 ? this[ 0 ] : null;

			// Returning the element of given index.
			return index < this.length ? this[ index ] : null;
		},
		
		get: function( index ) {
			// If the index is undefined or null, return the first element.
			if( index == null || !Number.isNumber( index ) )
				return this.length > 0 ? helix( this[ 0 ] ) : helix();

			// Returning the element of given index.
			return index < this.length ? helix( this[ index ] ) : helix();
		},
		
		elementD: function( index ) {
			// If the index is undefined or null, return the first element.
			if( index == null || !Number.isNumber( index ) )
				return this.length > 0 ? this[ 0 ] : null;

			// Returning the element of given index.
			return index <= this.length ? this[ index - 1 ] : null;
		},
		
		getD: function( index ) {
			// If the index is undefined or null, return the first element.
			if( index == null || !Number.isNumber( index ) )
				return this.length > 0 ? helix( this[ 0 ] ) : helix();

			// Returning the element of given index.
			return index <= this.length ? helix( this[ index - 1 ] ) : helix();
		},
		
		size: function() {
			return this.length;
		},
		
		next: function() {
			// Creating a new helix to hold the next element sibling of current element (1).
			var hlx = helix( this[ this.length - 1 ].nextElementSibling );
			
			// Changing the context to current helix.
			hlx.context = this;
			
			return hlx;
		},
		
		nextAll: function() {
			var elem = this[ this.length - 1 ].nextElementSibling,
				hlx = helix();
			
			for( ; elem != null; elem = elem.nextElementSibling ) {
				if( elem.nodeType === 1 && elem !== this[ 0 ] ) 
					hlx.add( elem );
			}
			
			// Changing the context to current helix.
			hlx.context = this;
			
			return hlx;
		},
		
		previous: function() {
			// Creating a new helix to hold the next element sibling of current element (1).
			var hlx = helix( this[ 0 ].previousElementSibling );
			
			// Changing the context to current helix.
			hlx.context = this;
			
			return hlx;
		},
		
		previousAll: function() {
			var elem = this[ 0 ].previousElementSibling,
				hlx = helix();
			
			for( ; elem != null; elem = elem.previousElementSibling ) {
				if( elem.nodeType === 1 && elem !== this[ 0 ] ) 
					hlx.back( elem );
			}
			
			// Changing the context to current helix.
			hlx.context = this;
			
			return hlx;
		},
		
		add: function() {
			// If arguments length is 0, then add the context as the element.
			if( arguments.length === 0 ) {
				var nThis = this;
				
				this.context.forEach( function( elem ) {
					if( nThis.has( elem ) === false ) 
						nThis.add( elem );
				} );
				
				return this;
			}
			
			Array.toArray( arguments ).forEach( function( elem ) {
				if( helix.equals( elem ) ) 
					Array.prototype.push.apply( this, Array.toArray( this ).filter( function( elm ) {
						return this.has( elm ) === false;
					}, this ) );
				else if( RJS.string.call( elem ).contains( "HTML" ) && this.has( elem ) === false ) 
					Array.prototype.push.apply( this, [ elem ] );
			}, this )
			
			return this;
		},
		
		back: function() {
			// If arguments length is 0, then add the context as the element.
			if( arguments.length === 0 ) {
				var nThis = this;
				
				this.context.forEach( function( elem ) {
					if( nThis.has( elem ) === false ) 
						nThis.back( elem );
				} );
				
				return this;
			}
			
			Array.toArray( arguments ).forEach( function( elem ) {
				if( helix.equals( elem ) ) 
					Array.prototype.unshift.apply( this, Array.toArray( this ).filter( function( elm ) {
						return this.has( elm ) === false;
					}, this ) );
				else if( RJS.string.call( elem ).contains( "HTML" ) && this.has( elem ) === false ) 
					Array.prototype.unshift.apply( this, [ elem ] );
			}, this )
			
			return this;
		},
		
		forEach: function( callback ) {
			var i = 0, len = this.length;

			for( ; i < len; i++ ) {
				var infos = helixInfoObject.infos[ helixInfoObject.attachments.indexOf( this[ i ] ) ],
				     note = helixNoteObject.notes[ helixNoteObject.attachments.indexOf( this[ i ] ) ],
					 data = helixDataObject.datas[ helixDataObject.attachments.indexOf( this[ i ] ) ],
				
				     bool = callback.call( this, this[ i ], i, data || 0, infos || {}, note || "", this.context );
			
				// If the 'bool' represents false, break the loop.
				if( bool === false ) 
					break;
			}

			return this;
		},
		
		has: function() {
			var bool = true;
			
			Array.toArray( arguments ).forEach( function( elem ) {
				if( helix.equals( elem ) ) {
					Array.toArray( elem ).forEach( function( elm ) {
						if( this.indexOf( elm ) === -1 ) 
							bool = false;
					}, this );
				}
				else if( this.indexOf( elem ) === -1 ) 
					bool = false;
			}, this );
			
			return bool;
		},
		
		remove: function() {
			return this.forEach( function( elem ) {
				elem.parentNode.removeChild( elem );
			} );
		},
		
		"delete": function() {
			Array.toArray( arguments ).sort().reverse().forEach( function( num ) {
				if( Number.isNumber( num ) ) {
					if( num < this.size() ) 
						this.splice( num, 1 );
				}
			}, this );
			
			return this;
		},
		
		deleteD: function() {
			return this.delete.apply( this, Array.toArray( arguments ).map( function( num ) {
				return num - 1;
			} ) );
		},
		
		splash: function() {
			return this.remove().forEach( function( elem ) {
				this.delete( this.indexOf( elem ) );
			} );
		},
		
		first: function() {
			return helix( this[ 0 ], this );
		},
		
		last: function() {
			return helix( this[ this.size() - 1 ], this );
		},
		
		firstElement: function() {
			return this[ 0 ];
		},
		
		lastElement: function() {
			return this[ this.size() - 1 ];
		},
		
		terminate: function() {
			// Deletes all the helix elements.
			
			return this.forEach( function( elem ) {
				this.delete( this.indexOf( elem ) );
			} );
		},
		
		clear: function() {
			// Clears all the elements HTML.
			return this.HTML( "" );
			
		},
		
		isCleared: function() {
			// If all the element is cleared, return true.
			var bool = true;
			
			this.forEach( function( elem ) {
				if( elem.innerHTML !== "" ) 
					bool = false;
			} );
			
			return bool;
		},
		
		query: function( selector ) {
			return helix( selector, this );
		},
		
		map: function( callback ) {
			callback = callback || function() {};
			
			var hlx = helix();
			
			this.forEach( function( elem, index, data, infos, note, context ) {
				hlx.add( callback.call( this, elem, index, data, infos, note, context ) );
			} );
			
			return hlx;
		},
		
		parent: function() {
			return this.map( function( elem ) {
				return elem.parentNode;
			} );
		},
		
		clone: function() {
			return helix( Object.prototype.clone.call( this ) );
		},
		
		DOM: {
			HTML: function( html, concat, type ) {
				// Fixing the concat.
				concat = Boolean.isBoolean( concat ) && concat || false,
				  type = Boolean.isBoolean( type ) && type || true;

				var Return = this;

				// If html is defined then, change the inner html of all the elements.
				if( html != null ) {
					this.out.forEach( function( elem, index ) {
						var str = Function.isFunction( html ) ? html.call( this.out, elem, index ) : String.isString( html ) || Number.isNumber( html ) || Boolean.isBoolean( html ) ? html : "";

						// Now setting the inner html of the elements on helix node list.
						elem.innerHTML = concat === true ? type === true && elem.innerHTML + str || str + elem.innerHTML : str;
					} );
				}

				// And if the html is not defined, the return the innerHTML(s) of the element(s).
				else {
					if( this.out.length === 1 )
						return this.out.element().innerHTML;

					// For multiple elements.
					else {
						var arr = [];

						this.out.forEach( function( elem ) {
							arr.push( elem.innerHTML );
						} );

						// Setting the Return to arr.
						Return = arr;
					}
				}

				// This method will return either helix nor array or string.
				return Return;
			},

			OHTML: function( ohtml, concat, type ) {
				// Fixing the concat.
				concat = Boolean.isBoolean( concat ) && concat || false,
				  type = Boolean.isBoolean( type ) && type || true;

				var Return = this;

				// If ohtml is defined then, change the outer ohtml of all the elements.
				if( ohtml != null ) {
					this.out.forEach( function( elem, index ) {
						var str = Function.isFunction( ohtml ) ? ohtml.call( this.out, elem, index ) : String.isString( ohtml ) || Number.isNumber( ohtml ) || Boolean.isBoolean( ohtml ) ? ohtml : "";

						// Now setting the outer ohtml of the elements on helix node list.
						elem.outerHTML = concat === true ? type === true && elem.outerHTML + str || str + elem.outerHTML : str;
					} );
				}

				// And if the ohtml is not defined, the return the outerHTML(s) of the element(s).
				else {
					if( this.out.length === 1 )
						return this.out.element().outerHTML;

					// For multiple elements.
					else {
						var arr = [];

						this.out.forEach( function( elem ) {
							arr.push( elem.outerHTML );
						} );

						// Setting the Return to arr.
						Return = arr;
					}
				}

				// This method will return either helix nor array or string.
				return Return;
			},

			TEXT: function( text, concat, type ) {
				// Fixing the concat.
				concat = Boolean.isBoolean( concat ) && concat || false,
				  type = Boolean.isBoolean( type ) && type || true;

				var Return = this;

				// If text is defined then, change the inner text of all the elements.
				if( text != null ) {
					this.out.forEach( function( elem, index ) {
						var str = Function.isFunction( text ) ? text.call( this.out, elem, index ) : String.isString( text ) || Number.isNumber( text ) || Boolean.isBoolean( text ) ? text : "";

						// Now setting the inner text of the elements on helix node list.
						elem.innerText = concat === true ? type === true && elem.innerText + str || str + elem.innerText : str;
					} );
				}

				// And if the text is not defined, the return the innerText(s) of the element(s).
				else {
					if( this.out.length === 1 )
						return this.out.element().innerText;

					// For multiple elements.
					else {
						var arr = [];

						this.out.forEach( function( elem ) {
							arr.push( elem.innerText );
						} );

						// Setting the Return to arr.
						Return = arr;
					}
				}

				// This method will return either helix nor array or string.
				return Return;
			}
		},
		
		info: {
			set: function( name, value ) {
				// If the given 'name' is a plain object, then iterate it and extract the infos.
				if( Object.isPlainObject( name ) ) {
					this.out.forEach( function( elem ) {
						var index = createInfo( elem );
						
						helixInfoObject.infos[ index ].extend( name );
					} );
					
					return this;
				}
				
				// If no attribute name is defined, Why are you calling this method?
				if( len <= 1 ) 
					throw new TypeError( "rEverse.Helix.info.set():- No suitable name or value is defined to set informations." );
				
				// Fixing the parameters.
				name  = Array.isArray( name ) ? arrayString( name ) : arrayString( ( name || { split: function() { return []; } } ).split( space ) ),
				value = Array.isArray( value ) ? value : String.isString( value ) && value.split( space ) || [ value ];
				
				var len = name.length;
				
				this.out.forEach( function( elem ) {
					var i = 0,
					index = createInfo( elem );
					
					for( ; i < len; i++ ) {
						if( value[ i ] ) {
							if( Function.isFunction( value[ i ] ) ) 
								helixInfoObject.infos[ index ][ name[ i ] ] = info_tribute( elem, name[ i ], value[ i ] );
							else helixInfoObject.infos[ index ][ name[ i ] ] = value[ i ];
						}
						else {
							if( Function.isFunction( value[ 0 ] ) ) 
								helixInfoObject.infos[ index ][ name[ i ] ] = info_tribute( elem, name[ i ], value[ 0 ] );
							else helixInfoObject.infos[ index ][ name[ i ] ] = value[ 0 ];
						}
					}
				} );
				
				return this;
			},
			
			get: function( name ) {
				// Fixing 'name'.
				name  = Array.isArray( name ) ? arrayString( name ) : arrayString( ( name || { split: function() { return []; } } ).split( space ) );
				
				var len = name.length;
				
				// If no attribute name is defined, Why are you calling this method?
				if( len === 0 ) 
					return helixInfoObject.infos[ createInfo( this.out[ 0 ] ) ];
				
				var RTReturn = this.out.size() === 1 ? null : [];
				
				this.out.forEach( function( elem, ind ) {
					var index = createInfo( elem ),
					        i = 0,
					     nArr = len === 1 ? null : [];
					
					for( ; i < len; i++ ) {
						// Getting the specific attribute value.
						var val = helixInfoObject.infos[ index ][ name[ i ] ] || this.get( ind ).attribute.get( "info-" + name[ i ] );
						
						// If 'val' is an empty string, enchange with null.
						val = String.isEmpty( val ) ? null : val;
						
						if( !Array.isArray( nArr ) ) 
							nArr = val;
						else nArr.push( val );
					}
					
					if( !Array.isArray( RTReturn ) ) 
							RTReturn = nArr;
						else RTReturn.push( nArr );
				} );
				
				// Returning RTReturn.
				return RTReturn;
			},
			
			remove: function( name ) {
				if( arguments.length === 0 ) 
					throw new TypeError( "rEverse.Helix.info.remove():- remove() function needs one parameter to be a string or an array." );
				else if( arguments.length === 1 ) 
					name = Array.isArray( name ) ? arrayString( name ) : arrayString( ( name || { split: function() { return []; } } ).split( space ) );
				else name = arrayString( Array.toArray( arguments ) );
				
				return this.out.forEach( function( elem ) {
					var index = createInfo( elem );
					
					helixInfoObject.infos[ index ].delete( name );
				} );
			},
		},
		
		attribute: {
			set: function( name, value ) {
				// If the given 'name' is a plain object, then iterate it and extract the attributes.
				if( Object.isPlainObject( name ) ) {
					this.out.forEach( function( elem ) {
						var N;
						
						for( N in name ) {
							if( name[ N ] ) {
								var val = Object.isObject( name[ N ] ) && !RegExp.isRegExp( name[ N ] ) ? JSON.stringify( name[ N ] ) : "" + name[ N ];
								
								elem.setAttribute( N, val );
							}
						}
					} );
					
					return this;
				}
				
				// If no attribute name is defined, Why are you calling this method?
				if( len <= 1 ) 
					throw new TypeError( "rEverse.Helix.attribute.set():- No suitable name or value is defined to set attributes." );
				
				// Fixing the parameters.
				name  = Array.isArray( name ) ? arrayString( name ) : arrayString( ( name || { split: function() { return []; } } ).split( space ) ),
				value = Array.isArray( value ) ? value : Function.isFunction( value ) ? [ value ] : arrayFString( ( Object.isObject( value ) && !RegExp.isRegExp( value ) ? 
					JSON.stringify( value ) : "" + value ).split( space ) );
				
				var len = name.length;
				
				this.out.forEach( function( elem ) {
					var i = 0;
					
					for( ; i < len; i++ ) {
						if( value[ i ] ) {
							if( Function.isFunction( value[ i ] ) ) 
								elem.setAttribute( name[ i ], info_tribute( elem, name[ i ], value[ i ] ) );
							else elem.setAttribute( name[ i ], value[ i ] );
						}
						else {
							if( Function.isFunction( value[ 0 ] ) ) 
								elem.setAttribute( name[ i ], info_tribute( elem, name[ i ], value[ 0 ] ) );
							else elem.setAttribute( name[ i ], value[ 0 ] );
						}
					}
				} );
				
				return this;
			},
			
			get: function( name ) {
				// Fixing 'name'.
				name  = Array.isArray( name ) ? arrayString( name ) : arrayString( ( name || { split: function() { return []; } } ).split( space ) );
				
				var len = name.length;
				
				// If no attribute name is defined, Why are you calling this method?
				if( len === 0 ) 
					throw new TypeError( "rEverse.Helix.attribute.get():- No suitable name is defined to get attribute(s)." );
				
				var RTReturn = this.out.size() === 1 ? null : [];
				
				this.out.forEach( function( elem ) {
					var i = 0,
					nArr = len === 1 ? null : [];
					
					for( ; i < len; i++ ) {
						// Getting the specific attribute value.
						var val = elem.getAttribute( name[ i ] ) || "";
						
						if( !Array.isArray( nArr ) ) 
							nArr = val;
						else nArr.push( val );
					}
					
					if( !Array.isArray( RTReturn ) ) 
							RTReturn = nArr;
						else RTReturn.push( nArr );
				} );
				
				// Returning RTReturn.
				return RTReturn;
			},
			
			remove: function( name ) {
				if( arguments.length === 0 ) 
					throw new TypeError( "rEverse.Helix.attribute.remove():- remove() function needs one parameter to be a string or an array." );
				else if( arguments.length === 1 ) 
					name = Array.isArray( name ) ? arrayString( name ) : arrayString( ( name || { split: function() { return []; } } ).split( space ) );
				else name = arrayString( Array.toArray( arguments ) );
				
				return this.out.forEach( function( elem ) {
					name.forEach( function( N ) {
						elem.removeAttribute( N );
					} );
				} ).attribute;
			}
		},
		
		note: {
			set: function( note ) {
				// Fixing parameter 'note'. Should be string.
				if( !String.isString( note ) ) 
					throw new TypeError( "rEverse.Helix.note.set():- The given parameter is not defined or not a string." );
				
				return this.out.forEach( function( elem ) {
					var index = createNote( elem );
					
					// Add the note string.
					helixNoteObject.notes[ index ] = note;
				} ).note;
			},
			
			get: function() {
				if( this.out.size() === 0 ) 
					return "";
				
				// If the length is 1, then return the note string of the current element.
				if( this.out.size() === 1 ) 
					return helixNoteObject.notes[ createNote( this.out[ 0 ] ) ];
			
				// Else return an array of note strings.
				var arr = [];
				
				this.out.forEach( function( elem ) {
					arr.push( helixNoteObject.notes[ createNote( elem ) ] );
				} );
				
				return arr;
			},
			
			remove: function() {
				return this.out.forEach( function( elem ) {
					var index = createNote( elem );
					
					helixNoteObject.notes[ index ] = "";
				} ).note;
			}
		},
		
		"class": {
			add: function() {
				
			},
			
			item: function( token ) {
				
			},
			
			has: function() {
				
			},
			
			remove: function() {
				
			},
			
			toggle: function() {
				
			}
		},
		
		chain: {
			enchain: function( name, runners, replace ) {
				return this.out.forEach( function( elem ) {
					var index = createChain( elem );
					
					helixChainObject.chains[ index ].enchain( name, runners, elem, replace );
				} ).chain;
			},
			
			enchainx: function( name, runners, params, replace ) {
				return this.out.forEach( function( elem ) {
					var index = createChain( elem );
					
					helixChainObject.chains[ index ].enchainx( name, runners, params, elem, replace );
				} ).chain;
			},
			
			chain: function( name, runners, replace ) {
				
			},
			
			dechain: function() {
				var args = Array.toArray( arguments );
				
				return this.out.forEach( function( elem ) {
					var index = createChain( elem );
					
					var obj = helixChainObject.chains[ index ];
					
					obj.dechain.apply( obj, args );
				} ).chain;
			},
			
			wait: function( name, milliseconds, callback ) {
				return this.out.forEach( function( elem ) {
					var index = createChain( elem );
					
					helixChainObject.chains[ index ].wait( name, milliseconds, callback );
				} ).chain;
			},
			
			deferred: function( name ) {
				return helix.Promise.Deferred.all.apply( null, Array.toArrayValues( helixChainObject.chains.map( function( elem ) {
					return elem.promise( name ).deferred;
				} ) ) );
			}
		},
		
		data: {
			set: function( data ) {
				// Fixing parameter 'data'. Must be defined.
				if( data == null ) 
					throw new TypeError( "rEverse.Helix.data.set():- The given parameter is not defined or null." );
				
				return this.out.forEach( function( elem, index ) {
					var index = createData( elem );
					
					// Add the data.
					helixDataObject.datas[ index ] = Array.isArray( data ) ? ( Function.isFunction( data[ index ] ) ? callData( elem, data[ index ] ) : data[ index ] ) || 0 
						: Function.isFunction( data ) ? callData( elem, data ) : data || 0;
				} ).data;
			},
			
			get: function() {
				// If no element.
				if( this.out.size() === 0 ) 
					return null;
				
				// If the length is 1, then return the single data of the current element.
				if( this.out.size() === 1 ) 
					return helixDataObject.datas[ createData( this.out[ 0 ] ) ];
			
				// Else return an array of datas.
				var arr = [];
				
				this.out.forEach( function( elem ) {
					arr.push( helixDataObject.datas[ createData( elem ) ] );
				} );
				
				return arr;
			},
			
			remove: function() {
				return this.out.forEach( function( elem ) {
					var index = createData( elem );
					
					helixDataObject.datas[ index ] = 0;
				} ).data;
			}
		}
	} );
	
	// Binding the window into helix. Normal function has the window as their context. But in restricted section you don't have the 
	// Functions with the window context.
	
	helix = helix.bind( window );
	
	function info_tribute( elem, name, fn ) {
		return fn.call( null, elem, name, 
			helixDataObject.datas[ createData( elem ) ], 
			helixInfoObject.infos[ createInfo( elem ) ],
			helixNoteObject.notes[ createNote( elem ) ]
		 );
	}
	
	function callData( elem, fn ) {
		return fn.call( null, elem, 
			helixInfoObject.infos[ createInfo( elem ) ],
			helixNoteObject.notes[ createNote( elem ) ]
		 );
	}
	
	// Helix insideous objects to add parent helix named 'out'.
	const parents = "attribute class info note chain data DOM";
	
	function addParent( hlx ) {
		parents.split( " " ).forEach( function( piece ) {
			hlx[ piece ].out = hlx;
		} );
		
		return hlx;
	}
	
	function createInfo( elem ) {
		return objCreate( helixInfoObject, "infos", elem );
	}
	
	// Creates a data for an element.
	function createData( elem ) {
		return objCreate( helixDataObject, "datas", elem, 0 );
	}
	
	// Creates a chain for an element in helixChainObject.
	function createChain( elem ) {
		return objCreate( helixChainObject, "chains", elem, new helix.Chain );
	}
	
	// Function to create a note in helixNoteObject.
	function createNote( elem ) {
		return objCreate( helixNoteObject, "notes", elem, "" );
	}
	
	function objCreate( obj, inside, elem, value ) {
		value = value != null ? value : {};
		
		var index = obj.attachments.indexOf( elem );
		
		// If the element is not existed, add it.
		if( index === -1 ) {
			index = obj.attachments.length;
			obj.attachments.push( elem );
			
			obj[ inside ][ index ] = value;
		}
		
		return index;
	}
	
	function arrayString( array ) {
		return array.filter( function( elem ) {
			return String.isString( elem );
		} );
	}
	
	function arrayFString( array ) {
		return array.filter( function( elem ) {
			return String.isString( elem ) || Function.isFunction( elem );
		} );
	}

	helix.static( {
		equals: helix.isHelix = function( hlx ) {
			// Checking the instance of the object with helix as well as the constructor.
			return hlx instanceof helix;
		},
	
		pseudo: function( type, name, callback ) {
			if( type === helix.PSEUDO_PLAIN ) {
				// If name is an object, iterate it and add all the members as the pseudo function.
				if( Object.isObject( name ) ) {
					var N;
					
					for( N in name ) {
						pseudos.plain[ N ] = name[ N ];
					}
					
					return true;
				} else {
					pseudos.plain[ name ] = callback;
					
					return true;
				}
			}
			else if( type === helix.PSEUDO_FUNCTIONAL ) {
				// If name is an object, iterate it and add all the members as the pseudo function.
				if( Object.isObject( name ) ) {
					var N;
					
					for( N in name ) {
						pseudos.functional[ N ] = name[ N ];
					}
					
					return true;
				} else {
					pseudos.functional[ name ] = callback;
					
					return true;
				}
			}
			
			return false;
		},
		
		// PSEUDO TYPES.
		PSEUDO_PLAIN     : "p_plain",
		PSEUDO_FUNCTIONAL: "p_functional"
	} );

	/**
	 * The helix Chain class executes method in a serial chain. Inspired from MooTools. Passed functions are known as runners.
	 */

	helix.Chain = function( name ) {
		// The main chain holder.
		this.chainHolder = new helix.Queue,

		// The state holder.
		this.state = { chain: [ "init", false ] },

		// The last runner holder.
		this.lastRunners = { chain: null },
		
		// The chain name.
		this.name = String.isString( name ) ? name : "chain",

		// Holded enchains and dechains while blocked or disabled.
		this.hold = {
			enchain: [],
			dechain: { value: [], status: false }
		},
	
		// The promise holder.
		this.promises = {
			// Adding a promise.
			chain: new helix.Promise( function( resolve ) { resolve( name ); } )
		};

		// Creating a queue named "chain".
		this.chainHolder.enqueue( "chain", [] );
	
		// Creating a chain with the 'name' parameter.
		if( String.isString( name ) ) {
			this.chainHolder.enqueue( name, [] );
		
			// Adding the promise if not existed.
			this.promises[ name ] = new helix.Promise( function() {} );
        }
    };

	// Method implementations like enchain, enchainx, dechain, chain, chainx etc.
	helix.Chain.implement( {
		/**
		 * Adds a runner with specific name identity in chain.
		 *
		 * @param {String} name
		 * @param {Array || Function} runner
		 * @param {Object} context
		 * @param {Boolean} replace
		 * @returns {rEverse.Helix.Chain}
		 */

		enchain: function( name, runner, context, replace ) {
			// The 'replace'.
			replace = Boolean.isBoolean( replace ) ? replace : Boolean.isBoolean( context ) && context || false,

			// Fixing the context.
			context = !Object.isObject( context ) ? !Object.isObject( runner ) && {} || runner : context,

			// 'runner' first phase.
			runner = Array.isArray( runner ) || Function.isFunction( runner ) ? runner : name;

			// 'runner' secand phase.
			runner = Array.isArray( runner ) ? fetchFunction( runner ) : Function.isFunction( runner ) && [ runner ] || [],

			// 'name'.
			name = getChainName( name, this );

			return enchainer( this, name, runner, context, replace );
		},

		/**
		 * Enchains runners and dechains
		 *
		 * @param {String} name
		 * @param {Function} runner
		 * @param {Array || Any_type_of_element} params
		 * @param {Object} context
		 * @param {Boolean} replace
		 * @returns {rEverse.Helix.Chain}
		 */

		enchainx: function( name, runner, params, context, replace ) {
			// The 'replace'.
			replace = Boolean.isBoolean( replace ) ? replace : Boolean.isBoolean( context ) && context || false,

			// Fixing the context.
			context = !Object.isObject( context ) ? !Object.isObject( params ) && {} || params : context,

			// Fixing 'params'.
			params = !String.isString( name ) ? runner : params,

			// 'runner' first phase.
			runner = String.isString( name ) ? runner : name;

			// 'runner' second phase.
			runner = Array.isArray( runner ) ? fetchFunction( runner ) : Function.isFunction( runner ) && [ runner ] || [],

			// 'name'.
			name = getChainName( name, this );

			enchainer( this, name, runner, context, replace );

				solve( function() {
					if( this.state[ name ][ 1 ] === false ) 
						this.dechain.apply( this, [ name ].concat( Array.isArray( params ) ? params : params != null && [ params ] || []) );
				}.bind( this ) );

			return this;
		},

		/**
		 * Gets the last entered runner and calls it.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Chain}
		 */

		dechain: function( name ) {
			var params = Array.toArray( arguments, 1 );

			// Now fixing the params.
			params = Array.isArray( params[ 0 ] ) || Array.isArrayLike( params[ 0 ] ) && !( params.length > 1 ) ? params.shift() : params;

			// 'name'.
			name = getChainName( name, this );

			// If the chain is disabled, then store the parameters.
			if( this.isDisabled() ) {
				if( this.hold.dechain.status === false ) {
					// Store the params.
					this.hold.dechain.value  = params;
					this.hold.dechain.status = true;
				}

				// Terminate dechaining.
				return this;
			}

			// Changing the start indecator.
			if( this.chainHolder.length( name ) === 0 ) {
				this.state[ name ][ 1 ] = false;
				this.promises[ name ].deferred.resolve( name );
			} else this.state[ name ][ 1 ] = true;

			// The dechained runner.
			var runner = this.chainHolder.dequeue( name );

			// Changing the state.
			this.state[ name ][ 0 ] = "init";

			if( runner ) {
				// The inprogress sentinel.
				this.state[ name ][ 0 ] = "inprogress";

				this.lastRunners[ name ] = runner;

				// Calling.
				runner.apply( undefined, [ function() {
					this.dechain( name, Array.toArray( arguments ) );
				}.bind( this ) ].concat( Array.isEmpty( params ) ? this.hold.dechain.value : params ) );

				// If the status is true or the dechain is called on previous and was disabled, restore the previous state.
				if( this.hold.dechain.status === true && !this.isDisabled() ) {
					this.hold.dechain.value.empty(),
					this.hold.dechain.status = false;
				}
			}

			return this;
		},

		/**
		 * Makes the chain wait for an amount of time.
		 *
		 * @param {String} name
		 * @param {Number} milliseconds
		 * @param {Function} callback
		 * @returns {rEverse.Helix.Chain}
		 */

		wait: function( name, milliseconds, callback ) {
			// Fixing the parameters.
			callback = Function.isFunction( callback ) ? callback : Function.isFunction( milliseconds ) && milliseconds || function() {},
			milliseconds = Number.isNumber( milliseconds ) ? milliseconds : Number.isNumber( name ) && name || 0,
			name = getChainName( name, this );

			// If millisecond is 0, no need to wait.
			if( milliseconds === 0 )
				return this;

			var timeout, dechained = false, nthis = this, args = [];

			// wait() transfers the arguments found from the previous runner to the next runner, just delays the time.
			this.enchain( name, function( next ) {
				args = Array.toArray( arguments, 1 );

				// Now setting the timeout.
				timeout = setTimeout( function() {
					// The dechain has been completed, so emergency dechain should be prevented.
					dechained = true;

					next.apply( undefined, args );
				}, milliseconds );
			} );

			// Calling the callback which is defined for emergency situations.
			callback.apply( this, [ function() {
				clearTimeout( timeout );

				// If chain has not been dechained, dechain it.
				if( dechained === false )
					nthis.dechain.apply( nthis, [ name ].concat( arguments.length > 0 ? Array.toArray( arguments ) : args ) );
			} ].concat( args ) );

			return this;
		},

		/**
		 * Refers to enchainx but extinguishes calling 'next' function each of the time.
		 *
		 * @param {String} name
		 * @param {Function} runners
		 * @param {Object} context
		 * @param {Boolean} replace
		 * @returns {rEverse.Helix.Chain}
		 */

		chain: function( name, runners, context, replace ) {
			// The 'runner'.
			runners = runners != null ? runners : name;

			// Array check.
			runners = Array.isArray( runners ) ? runners : [ runners ];
			
			var NAME = getChainName( name, this );

			// Adding the runners, but these runners won't have the 'next' runner calling method.
			this.enchain( name, runners.map( function( e ) {
				if( Function.isFunction( e ) )
					return function( next ) {
						var args = Array.toArray( arguments, 1 );

						e.apply( this, args );

						// Calls the next automatically.
						next( NAME );
					}
			} ), context, replace );

			return this;
		},

		/**
		 * Refers to enchainx but extinguishes calling 'next' function each of the time.
		 *
		 * @param {String} name
		 * @param {Function} runner
		 * @param {Array || Any_type_of_element} params
		 * @param {Object} context
		 * @param {Boolean} replace
		 * @returns {rEverse.Helix.Chain}
		 */

		chainx: function( name, runner, params, context, replace ) {
			// The 'replace'.
			replace = Boolean.isBoolean( replace ) ? replace : Boolean.isBoolean( context ) && context || false,

			// Fixing the context.
			context = !Object.isObject( context ) ? !Object.isObject( params ) && {} || params : context,

			// Fixing 'params'.
			params = !String.isString( name ) ? runner : params,

			// 'runner' first phase.
			runner = String.isString( name ) ? runner : name;

			// 'runner' second phase.
			runner = Array.isArray( runner ) ? fetchFunction( runner ) : Function.isFunction( runner ) && [ runner ] || [],

			// 'name'.
			name = getChainName( name, this );

			// Adding the runners, but these runners won't have the 'next' runner calling method.
			this.enchainx( name, runner.map( function( e ) {
				return function( next ) {
					var args = Array.toArray( arguments, 1 );

					e.apply( this, args );

					// Calls the next automatically.
					next( name );
				}
			} ), params, context, replace );

			return this;
		},

		/**
		 * Returns the chain length.
		 *
		 * @param {String} name
		 * @returns {Number}
		 */

		chainLength: function( name ) {
			name = getChainName( name, this );

			var length = this.chainHolder.length( name );

			// Checking the current chain state and if any running is progress, increase the length.
			return this.state[ name ][ 0 ] === "inprogress" ? length + 1 : length;
		},

		/**
		 * Returns the total chain length.
		 *
		 * @returns {Number}
		 */

		totalChainLength: function() {
			// The total length.
			var length = this.chainHolder.totalLength(), name;

			// If in state any chain is inprogress, increase the length by 1.
			for( name in this.state ) {
				if( this.state[ name ][ 0 ] === "inprogress" )
					length++;
			}

			return length;
		},

		/**
		 * Blocks a chain. While blocked, nothing can be enchained.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Chain}
		 */

		block: function( name ) {
			name = getChainName( name, this );

			this.chainHolder.block( name );

			return this;
		},

		/**
		 * Unblocks a chain.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Chain}
		 */

		unblock: function( name ) {
			name = getChainName( name, this );

			if( this.isBlocked() ) {
				this.chainHolder.unblock( name );

				// Adding the holded candidates.
				this.enchain( name, this.hold.enchain );

				// After enchaining is finished, delete the holding enchain runners.
				this.hold.enchain.empty();
			}

			return this;
		},

		/**
		 * Checks for blockage.
		 *
		 * @param {String} name
		 * @returns {Boolean}
		 */

		isBlocked: function( name ) {
			name = getChainName( name, this );

			return this.chainHolder.isBlocked( name );
		},

		/**
		 * Disables a chain. While disabled, nothing can be dechained.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Chain}
		 */

		disable: function( name ) {
			name = getChainName( name, this );

			this.chainHolder.disable( name );

			return this;
		},

		/**
		 * Enables a chain.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Chain}
		 */

		enable: function( name ) {
			name = getChainName( name, this );

			//If disabled.
			if( this.isDisabled() ) {
				var params = Array.toArray( arguments, 1 );

				this.chainHolder.enable( name );

				this.dechain( name, params );
			}

			return this;
		},

		/**
		 * Checks for disables.
		 *
		 * @param {String} name
		 * @returns {Boolean}
		 */

		isDisabled: function( name ) {
			name = getChainName( name, this );

			return this.chainHolder.isDisabled( name );
		},

		/**
		 * Breaks a chain and dechains every single runner after a period of time.
		 *
		 * @param {type} name
		 * @param {type} milliseconds
		 * @returns {rEverse.Helix.Chain}
		 */

		periodical: function( name, milliseconds ) {
			// Fixing the parameters.
			milliseconds = $defined( milliseconds ) ? milliseconds : name;

			milliseconds = Number.isNumber( milliseconds ) ? milliseconds : 0,
			name = getChainName( name, this );

			var CArr = this.chainHolder.getQArray( name );
		
			// Promises are rejected on periodical(). Rejecting it dynamically, so that nothing is thrown.
			this.promises[ name ].deferred.currentState = STATE_REJECTED;
			this.promises[ name ].deferred.reactions.empty();
			this.promises[ name ].deferred.result = [ name ];

			// Making the queue empty, cause periodical() dechains every method after a period of time.
			// So, the chain sould be broken.
			this.chainHolder.empty( name );

			if( milliseconds !== 0 ) {
				var interval = setInterval( function() {
					var shift = CArr.shift();

					if( shift )
						shift.call( undefined, function() {}, name );

					// 'CArr' length is 0, stop interval.
					if( CArr.length === 0 )
						clearInterval( interval );
				}, milliseconds );
			} else {
				// Else work like break.
				while( CArr.length !== 0 ) {
					var shift = CArr.shift();

					if( shift )
						shift.call( undefined, function() {}, name );
				}
			}

			return this;
		},

		/**
		 * Dechains all the runners by breaking connection between them.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Chain}
		 */

		"break": function( name ) {
			// Fixing 'name'.
			name = getChainName( name, this );

			// Getting the chain array.
			var arr = this.chainHolder.getQArray( name );
		
			// Promises are rejected on break(). Rejecting it dynamically, so that nothing is thrown.
			this.promises[ name ].deferred.currentState = STATE_REJECTED;
			this.promises[ name ].deferred.reactions.empty();
			this.promises[ name ].deferred.result = [ name ];

			// Deleting the whole chain and dechaining it from arr, cause break breaks the connection between runners.
			this.chainHolder.empty( name );

			while( arr.length !== 0 ) {
				var shift = arr.shift();

				if( shift )
					shift.call( undefined, function() {}, name );
			}

			return this;
		},
	
		/**
		 * Returns a specific chains promise or a full chain maintained promise.
		 * 
		 * @param {helix.Promise} name 
		 */
	
		promise: function( name ) {
			if( String.isString( name ) ) 
				return this.promises[ name ];
		
			return helix.Promise.all.apply( null, Array.toArrayValues( this.promises ) );
		},

		/**
		 * Transforms into a string.
		 *
		 * @returns {String}
		 */

		toString: function() {
			return "[object rEverse.Helix.Chain]";
		}
	} );

	helix.Chain.static( {
		/**
		 * Checks is the given object is Chain or not.
		 *
		 * @param {helix.Chain} ch
		 * @returns {Boolean}
		 */

		equals: helix.Chain.isChain =  function( ch ) {
			return ch instanceof helix.Chain;
		}
	} );

	function enchainer( chain, name, runner, context, replace ) {
		// 'name' named property is absent on state, add it.
		if( !chain.state[ name ] )
			chain.state[ name ] = [ "init", false ];

		// For lastRunner either.
		if( !chain.lastRunners[ name ] )
			chain.lastRunners[ name ] = null;
	
		// For promises.
		if( !chain.promises[ name ] ) 
			chain.promises[ name ] = new helix.Promise( function() {} );

		// If the promise exists, then the chain length is 0, reset the promise.
		else if( chain.promises[ name ] && chain.chainHolder.length( name ) === 0 ) 
			chain.promises[ name ].deferred.reset();

		var mappedRunner = runner.map( function( runner ) {
			return runner.bind( context );
		} );

		chain.chainHolder.enqueue( name, mappedRunner, replace );

		// Checking if the chain is blocked. If blocked, add to hold.
		if( chain.isBlocked() )
			chain.hold.enchain.merge( runner );

		return chain;
	}

	// Gets the chain default name.
	function getChainName( name, context ) {
		return String.isString( name ) ? name : context.name;
	}

	// Fetches an array full of functions.
	function fetchFunction( funcarr ) {
		var array = [];

		funcarr.forEach( function( func ) {
			if( Function.isFunction( func ) )
				array.push( func );
		} );

		return array;
	}

	/**
	 * Creates an object of Helix Promise.
	 *
	 * @param {Function} callback
	 */

	helix.Promise = function( callback ) {
		// The callback must be a function.
		if( !Function.isFunction( callback ) )
			throw new TypeError( "Promise callback should be a function. \"" + typeof callback + "\" given." );

		// The deferred.
		this.deferred = new helix.Promise.Deferred;

		var resolve     = this.deferred.resolve.bind( this.deferred ),
		    reject      = this.deferred.reject.bind( this.deferred ),
		    resolveWith = this.deferred.resolveWith.bind( this.deferred ),
		    rejectWith  = this.deferred.rejectWith.bind( this.deferred );

		// Calling the callback.
		callback( resolve, reject, resolveWith, rejectWith );
	};

	helix.Promise.implement( {
		/**
		 * Adds actions to the promise. onResolve for resolved state and onReject for rejected state.
		 * 
		 * @param {Function} onResolve 
		 * @param {Function} onReject 
		 * @returns {helix.Promise}
		 */
	
		then: function( onResolve, onReject ) {
			this.deferred.then( onResolve, onReject );

			return this;
		},
	
		/**
		 * Promise.after() receives one parameter as a function to add a resolved state callback.
		 * 
		 * @param {Function} callback 
		 * @returns {helix.Promise}
		 */

		after: function( callback ) {
			this.deferred.after( callback );

			return this;
		},
	
		/**
		 * Promise.catch() receives one parameter as a function to add a rejected state callback.
		 * 
		 * @param {Function} callback 
		 * @returns {helix.Promise}
		 */

		"catch": function( callback ) {
			this.deferred.catch( callback );
		
			return this;
		},
	
		/**
		 * done() receives multiple parameter as functions which will be fired after the promise gets resolved.
		 * 
		 * @returns {helix.Promise}
		 */

		done: function() {
			this.deferred.done.apply( this.deferred, Array.toArray( arguments ) );

			return this;
		},
	
		/**
		 * fail() receives multiple parameter as functions which will be fired after the promise gets resolved.
		 * 
		 * @returns {helix.Promise}
		 */

		fail: function() {
			this.deferred.fail.apply( this.deferred, Array.toArray( arguments ) );

			return this;
		},
	
		/**
		 * Returns the current state of promise.
		 * 
		 * @returns {String}
		 */

		state: function() {
			return this.deferred.state();
		}
	} );

	helix.Promise.static( {
		/**
		 * Returns a resolved Promise.
		 * 
		 * @returns {helix.Promise}
		 */
	
		resolve: function() {
			if( helix.Promise.equals( arguments[ 0 ] ) )
				return arguments[ 0 ];

			var args = Array.toArray( arguments );

			return new Promise( function( resolve ) {
				resolve( args );
			} );
		},
	
		/**
		 * Returns a rejected Promise.
		 * 
		 * @returns {helix.Promise}
		 */

		reject: function() {
			if( helix.Promise.equals( arguments[ 0 ] ) )
				return arguments[ 0 ];

			var args = Array.toArray( arguments );

			return new Promise( function( resolve, reject ) {
				reject( args );
			} );
		},
	
		/**
		 * Returns a promise binded with promises which will be resolved after all the gievn promises are resolved.
		 * 
		 * @returns {helix.Promise}
		 */

		all: function() {
			var promise = new helix.Promise( function( resolve, reject ) {} );

			promise.deferred = helix.Promise.Deferred.all.apply( null, Array.toArray( arguments ).map( function( prm ) {
				return helix.Promise.equals( prm ) && prm.deferred;
			} ) );

			return promise;
		},
	
		/**
		 * Checks whether the given parameter is a Promise or not.
		 * 
		 * @param {helix.Promise} prm 
		 * @returns {Boolean}
		 */

		equals: helix.Promise.isPromise = function( prm ) {
			return prm instanceof helix.Promise;
		}
	} );

	var STATE_RESOLVED = "RESOLVED",
	    STATE_REJECTED = "REJECTED",
	    STATE_PENDING  = "PENDING";

	var Identity = "Identity",
	    Thrower  = "Thrower";

	helix.Promise.Deferred = function() {
		// The state holder. State will be at pending at the first moment.
		this.currentState = STATE_PENDING,

		// Holds the result after resolve or reject.
		this.result = [],

		// Holds the deferred thenable reactions.
		this.reactions = [],

		// The context which will be passed to the reactions.
		this.context = null;
	};

	helix.Promise.Deferred.implement( {
		/**
		 * Resolves a deferred.
		 * 
		 * @returns {helix.Promise.Deferred}
		 */
	
		resolve: function() {
			// If the first argument is an array and arguments length is 1, then count the array as passable arguments.
			var args = Array.isArray( arguments[ 0 ] ) && arguments.length === 1 ? arguments[ 0 ] : Array.toArray( arguments );

			return resolve( this, args );
		},
	
		/**
		 * Rejects a deferred.
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		reject: function() {
			// If the first argument is an array and arguments length is 1, then count the array as passable arguments.
			var args = Array.isArray( arguments[ 0 ] ) && arguments.length === 1 ? arguments[ 0 ] : Array.toArray( arguments );

			return reject( this, args );
		},
	
		/**
		 * Resolves a deferred with a context.
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		resolveWith: function() {
			if( arguments.length === 0 )
				return this;

			this.context = arguments[ 0 ];

			var args = Array.toArray( arguments, 1 );

			args = Array.isArray( args[ 0 ] ) && args.length === 1 ? args[ 0 ] : args;

			return this.resolve( args );
		},
	
		/**
		 * Rejects a deferred with a context.
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		rejectWith: function() {
			if( arguments.length === 0 )
				return this;

			this.context = arguments[ 0 ];

			var args = Array.toArray( arguments );

			args = Array.isArray( args[ 0 ] ) && args.length === 1 ? args[ 0 ] : args;

			return this.reject( args );
		},
	
		/**
		 * Adds action callbacks which may fire after the deferred gets resolved or rejected. onResolve for resolved deferred
		 * and onReject for rejected deferred.
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		then: function( onResolve, onReject ) {
			// Fixing the parameters.
			onResolve = Function.isFunction( onResolve ) ? onResolve : Identity,
			onReject = Function.isFunction( onReject ) ? onReject : Thrower;

			var deferred = new helix.Promise.Deferred;

			this.reactions.push( {
				deferred: deferred,
				onResolve: onResolve,
				onReject: onReject
			} );

			// If the state is not pending, start the reaction.
			if( this.currentState !== STATE_PENDING )
				reaction( this );

			return deferred;
		},
	
		/**
		 * Takes multiple callbacks which may fire after the deferred gets resolved.
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		done: function() {
			// For every single provided functions.
			Array.toArray( arguments ).forEach( function( callback ) {
				// If the 'callback' is a function, then search for 'Identity' type resolver. If no resolver is found,
				// then add a new deferred thenable handler.

				if( Function.isFunction( callback ) ) {
					var identityVisibled = false,
					i = 0, len = this.reactions.length;

					for( ; i < len; i++ ) {
						var formula = this.reactions[ i ];

						if( formula.onResolve === Identity ) {
							identityVisibled = true;

							// Changing the 'Identity' by the callback.
							formula.onResolve = callback;

							break;
						}
					}

					// If no identity is found, create a new formula.
					if( identityVisibled === false ) {
						var deferred = new helix.Promise.Deferred;

						this.reactions.push( {
							deferred: deferred,
							onResolve: callback,

							// onReject will be 'Thrower'. In order to change that fail() should be used.
							onReject: Thrower
						} );
					}
				}
			}, this );

			// If the state is not pending, start the reaction.
			if( this.currentState !== STATE_PENDING )
				reaction( this );

			return this;
		},
	
		/**
		 * Takes multiple callbacks which may fire after the deferred gets resolved.
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		fail: function() {
			// For every single provided functions.
			Array.toArray( arguments ).forEach( function( callback ) {
				// If the 'callback' is a function, then search for 'Thrower' type rejections. If no rejector is found,
				// then add a new deferred thenable handler.

				if( Function.isFunction( callback ) ) {
					var throwerVisibled = false,
					i = 0, len = this.reactions.length;

					for( ; i < len; i++ ) {
						var formula = this.reactions[ i ];

						if( formula.onReject === Thrower ) {
							throwerVisibled = true;

							// Changing the 'Thrower' by the callback.
							formula.onReject = callback;

							break;
						}
					}

					// If no thrower is found, create a new formula.
					if( throwerVisibled === false ) {
						var deferred = new helix.Promise.Deferred;

						this.reactions.push( {
							deferred: deferred,

							// onResolve will be 'Identity'. In order to change that done() should be used.
							onResolve: Identity,
							onReject: callback
						} );
					}
				}
			}, this );

			// If the state is not pending, start the reaction.
			if( this.currentState !== STATE_PENDING )
				reaction( this );

			return this;
		},
	
		/**
		 * Promise.Deferred.after();
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		after: function( callback ) {
			return this.then( callback, null );
		},
	
		/**
		 * Promise.Deferred.catch();
		 * 
		 * @returns {helix.Promise.Deferred}
		 */

		"catch": function( callback ) {
			return this.then( null, callback );
		},
	
		/**
		 * Adds a callback for both resolved and rejected state.
		 * 
		 * @return {helix.Promise.Deferred}
		 */

		always: function() {
			var args = Array.toArray( arguments );

			return this.done.apply( this, args ).fail.apply( this, args );
		},
	
		/**
		 * Resets the deferred.
		 * 
		 * @return {helix.Promise.Deferred}
		 */

		reset: function() {
			// Reseting everything.
			this.currentState = STATE_PENDING,
			this.result = [],
			this.reactions = [];

			return this;
		},
	
		/**
		 * Returns the current deferred state.
		 * 
		 * @returns {Number}
		 */

		state: function() {
			return this.currentState;
		},
		
		toString: function() {
			return "[object rEverse.Helix.Promise.Deferred]";
		}
	} );

	helix.Promise.Deferred.static( {
		/**
		 * Returns a resolved deferred.
		 * 
		 * @return {helix.Promise.Deferred}
		 */
	
		resolve: function() {
			var deferred;

			// If the value is a deferred type.
			if( helix.Promise.Deferred.equals( arguments[ 0 ] ) )
				deferred = arguments[ 0 ];
			else {
				deferred = new helix.Promise.Deferred;
				resolve( deferred, Array.toArray( arguments ) );
			}

			return deferred;
		},
	
		/**
		 * Returns a rejected deferred.
		 * 
		 * @return {helix.Promise.Deferred}
		 */

		reject: function() {
			var deferred;

			// If the value is a deferred type.
			if( helix.Promise.Deferred.equals( arguments[ 0 ] ) )
				deferred = arguments[ 0 ];
			else {
				deferred = new helix.Promise.Deferred;
				reject( deferred, Array.toArray( arguments ) );
			}

			return deferred;
		},
	
		/**
		 * Returns a deferred binded with given deferreds which gets resolved when all the deferreds are resolved.
		 * 
		 * @return {helix.Promise.Deferred}
		 */

		all: function() {
			var length = arguments.length,
				result = [],
				defer  = new helix.Promise.Deferred,
			    count  = 0;

			Array.toArray( arguments ).forEach( function( deferred ) {
				// The arguments must be deferred.
				if( helix.Promise.Deferred.equals( deferred ) ) {
					deferred.then( function() {
						count++;

						// Merging the result.
						result.merge( Array.toArray( arguments ) );

						if( count === length )
							defer.resolve( result );
					} );
				}
			} );

			return defer;
		},
	
		/**
		 * Checks whether the given parameter is a deferred or not.
		 * 
		 * @param {helix.Promise.Deferred} deferred 
		 */

		equals: helix.Promise.Deferred.isDeferred = function( deferred ) {
			return deferred instanceof helix.Promise.Deferred;
		}
	} );

	// Private Deferred functions block.

	function resolve( deferred, value ) {
		value = value != null ? value : [];

		// The resolve occurs only when the current state is pending.
		if( deferred.currentState === STATE_PENDING ) {
			// If the 'deferred' is equal to 'value', that means this deferred is tried to be solved by itself.
			if( deferred === value[ 0 ] )
				throw new helix.Promise.PromiseException( "Tried to solve a deferred by itself." );

			// If the given value is a deferred or any kind of deferred like object, resolve current deferred with the value of given deferred result.
			else if( Object.isObject( value[ 0 ] ) && typeof value[ 0 ].then === "function" ) {
				var resolved = false;

				solve( function() {
					try {
						value[ 0 ].then( function( val ) {
							if( resolved === false ) {
								resolved = true;
								resolve( deferred, val );
							}
						}, function( reason ) {
							if( resolved === false ) {
								resolved = true;
								reject( deferred, reason );
							}
						} );
					} catch( exception ) {
						if( resolved === false ) {
							resolved = true;
							reject( deferred, exception );
						}
					}
				} );
			} else {
				deferred.result.merge( Array.isArray( value ) ? value : [ value ] );
				deferred.currentState = STATE_RESOLVED;

				reaction( deferred );
			}
		}

		return deferred;
	}

	function reject( deferred, reason ) {
		reason = reason != null ? reason : [];

		// The state should be pending.
		if( deferred.currentState === STATE_PENDING ) {
			deferred.result.merge( Array.isArray( reason ) ? reason : [ reason ] );
			deferred.currentState = STATE_REJECTED;

			// If the 'reactions' array is empty, then throw a promise exception by providing the result as the parameter.
			if( Array.isEmpty( deferred.reactions ) )
				throw reason;

			reaction( deferred );
		}

		return deferred;
	}

	function reaction( deferred ) {
		var state     = deferred.currentState,
		    result    = deferred.result,
			context   = deferred.context,
		    reactions = deferred.reactions.clone(), handlerType;

		if( state === STATE_RESOLVED ) {
			handlerType = "onResolve";
			deferred.reactions.empty();
		}
		else if( state === STATE_REJECTED ) {
			handlerType = "onReject";
			deferred.reactions.empty();
		}

		if( handlerType ) {
			solve( function() {
				reactions.forEach( function( formula ) {
					var handler = formula[ handlerType ];

					if( handler === Identity )
						resolve( formula.deferred, result );
					else if( handler === Thrower )
						reject( formula.deferred, result );
					else {
						try {
							resolve( formula.deferred, handler.apply( context, result ) );
						} catch( exception ) {
							reject( formula.deferred, exception );
						}
					}

				} );
			} );
		}
	}

	var solve;

	if( typeof process !== "undefined" && typeof process.nextTick === "function" )
		solve = process.nextTick;
	else if( typeof setImmediate === "function" )
		solve = setImmediate;
	else solve = function( callback ) {
		setTimeout( callback, 0 );
	}

	helix.Stream = function() {

	};

	helix.Queue = function() {
		// Taking the queue object.
		this.queue = {
			qx: []
		},

		// For disabled stuffs.
		this.disabled = {
			qx: false
		},

		// For blocked stuffs.
		this.blocked = {
			qx: false
		};
	};

	helix.Queue.implement( {
		/**
		 * Adds element to the queue object.
		 *
		 * @param {String} name
		 * @param {Any_type_of_element} element
		 * @param {Boolean} replace
		 * @returns {rEverse.Helix.Queue}
		 */

		enqueue: function( name, element, replace ) {
			// Fixing the parameters.
			element = $defined( element ) ? element : name;

			// Second step to fetch the element.
			element = Array.isArray( element ) ? element : [ element ],
			name = String.isString( name ) ? name : "qx",
			replace = replace || false;

			// If the queue is not defined or if it's not an array, then fix it.
			if( $undefined( this.queue[ name ] ) || !Array.isArray( this.queue[ name ] ) )
				this.queue[ name ] = [];

			// Adding block.
			if( $undefined( this.blocked[ name ] ) )
				this.blocked[ name ] = false;

			// Adding disable.
			if( $undefined( this.disabled[ name ] ) )
				this.disabled[ name ] = false;

			// If there is no blockage, then enqueue the elements.
			if( this.blocked[ name ] === false )
				this.queue[ name ] = replace === true ? element : this.queue[ name ].concat( element );

			// Returning self for chaining.
			return this;
		},

		/**
		 * Removes an element from the head of the queue object and returns it.
		 *
		 * @param {String} queueName
		 * @returns {Any_type_of_element}
		 */

		dequeue: function( queueName ) {
			queueName = getQueueName( queueName );

			if( this.disabled[ queueName ] === false && this.length( queueName ) > 0 )
				return this.queue[ queueName ].shift();

			return null;
		},

		/**
		 * Returns the queue length.
		 *
		 * @param {String} name
		 * @returns {Number}
		 */

		length: function( name ) {
			name = getQueueName( name );

			return Array.isArray( this.queue[ name ] ) && this.queue[ name ].length || 0;
		},

		/**
		 * Checks if the element exist in the queue.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Boolean}
		 */

		has: function( element ) {
			return element && this.index( element ) > -1;
		},

		/**
		 * Returns the index of the element in queue array.
		 *
		 * @param {Any_type_of_element} element
		 * @returns {Number}
		 */

		index: function( element ) {
			return this.qarray.indexOf( element );
		},

		/**
		 *
		 * @param {Any_type_of_element} element
		 * @returns {rEverse.Helix.Queue}
		 */

		remove: function( element ) {
			this.has( element ) && this.qarray.splice( this.index( element ), 1 );

			// Returning self.
			return this;
		},

		/**
		 * Gets specific element from the queue.
		 *
		 * @param {Number} index
		 * @returns {Any_type_of_element}
		 */

		get: function( index ) {
			if( this.qarray[ index ] === undefined ) {
				console.error( "rEverse.Helix.Queue.get():- The given index is out of bound." );
				return undefined;
			}

			// Returning the element.
			return this.qarray[ index ];
		},

		/**
		 * Gets the queue array.
		 *
		 * @param {String} name
		 * @returns {Array}
		 */

		getQArray: function( name ) {
			name = getQueueName( name );

			return Array.isArray( this.queue[ name ] ) && this.queue[ name ] || [];
		},

		/**
		 * Returns the first element of the queue.
		 *
		 * @returns {Any_type_of_element}
		 */

		first: function() {
			// To prevent array out of bound error.
			return this.length() > 0 && this.get( 0 ) || undefined;
		},

		/**
		 * Returns the last element of the queue.
		 *
		 * @returns {Any_type_of_element}
		 */

		last: function() {
			// To prevent array out of bound error.
			return this.length() > 0 && this.get( this.length() - 1 ) || undefined;
		},

		/**
		 * Deletes a queue chain from the queue object.
		 *
		 * @param {String} queueName
		 * @returns {rEverse.Helix.Queue}
		 */

		empty: function( queueName ) {
			this.queue[ getQueueName( queueName ) ] = [];

			return this;
		},

		/**
		 * Deletes the whole queue.
		 *
		 * @returns {rEverse.Helix.Queue}
		 */

		emptyAll: function() {
			this.queue = {};

			return this;
		},

		/**
		 * Blocks a queue. While blocked, no item can be enqueued.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Queue}
		 */

		block: function( name ) {
			name = getQueueName( name );

			this.blocked[ name ] = true;

			// Returning self.
			return this;
		},

		/**
		 * Unblocks a queue.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Queue}
		 */

		unblock: function( name ) {
			name = getQueueName( name );

			this.blocked[ name ] = false;

			// Returning self.
			return this;
		},

		/**
		 * Checks is a queue blocked or not.
		 *
		 * @param {String} name
		 * @returns {Boolean}
		 */

		isBlocked: function( name ) {
			name = getQueueName( name );

			return this.blocked[ name ];
		},

		/**
		 * Disables a queue. While disbled, no item can be dequeued.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Queue}
		 */

		disable: function( name ) {
			name = getQueueName( name );

			this.disabled[ name ] = true;

			// Returning self.
			return this;
		},

		/**
		 * Enables a queue.
		 *
		 * @param {String} name
		 * @returns {rEverse.Helix.Queue}
		 */

		enable: function( name ) {
			name = getQueueName( name );

			this.disabled[ name ] = false;

			// Returning self.
			return this;
		},

		/**
		 * Checks is a queue disabled or not.
		 *
		 * @param {String} name
		 * @returns {Boolean}
		 */

		isDisabled: function( name ) {
			name = getQueueName( name );

			return this.disabled[ name ];
		},

		/**
		 * Resets the whole queue.
		 *
		 * @returns {undefined}
		 */

		reset: function() {
			this.emptyAll();

			var name;

			for( name in this.queue ) {
				this.unblock( name );
				this.enable( name );
			}

			// Returning self;
			return this;
		},

		/**
		 * Returns all the number of queue elements attached.
		 *
		 * @returns {Number}
		 */

		totalLength: function() {
			var count = 0, name;

			// Now passing the whole name through the queue object;
			for( name in this.queue ) {
				count += this.queue[ name ].length;
			}

			// Returning the total length;
			return count;
		},

		/**
		 * Transfornms into a string.
		 *
		 * @returns {String}
		 */

		toString: function() {
			return "[object rEverse.Helix.Queue]";
		}
	} );

	function getQueueName( name ) {
		return String.isString( name ) ? name : "qx";
	}

	return helix;

	// If window is not defined, pass this.
}, window !== undefined ? window : this );
