/*****
 * chirpserJS 1.5.1;
 * 
 * Created by SD Asif Hossein on 3 February 2018, Saturday;
 * 
 * Personal JS Library for SDAH to use on WEB;
 * 
 * This JS Library is not under license ( MIT or GNU ) and this
 * library is made for personal usase;
 * 
 *	@version 1.5.1, @package com.sdah.chirpserJS;
*****/

( function( global, factory ) {
	"use strict";

	//Activating the strict mode so that
	//if any commonJS or Node.js environment
	//appears then the those environment will
	//be under strict mode;

	if( typeof module === "object" && typeof module.exports === "object" ) {
	
		//For commonJS or commonJS like environments
		//(Node.js) where a proper window is present,
		//fires the factory method and get chirpserJS;
	
		module.exports = global.document ? factory( global, true )
			: function( param ) {
				if( !param.document ) 
					throw new TypeError( "chirpserJS needs a window along with a document!" );	//If the environment doesn't have any window, the whole document will remain undefined;
			
				return ( factory( param ) );
			};
	} else {
		factory( global );
	}

//The code will pass this paramenter if the window is stil not defined;
} )( typeof window !== "undefined" ? window : this, function() {
	//Accesses an strict mode,
	//throws exceptions when any
	//non-strict mode appears;
	"use strict";

	//Reterning a whole library data so that I can
	//verify the suitable version of my library to
	//use it on plugins;

	//Note:- chirpserJS plugins are available from this version of chirpserJS;

	var chirpserJS = {
		name: "chirpserJS",
		version: "1.5.1",
		author: "SD Asif Hossein",
		description: "Hearing chirps from chrpserJS!",
		keywords: [ "chirpserJS", "JS", "library" ],
		dependencies: {}
	};

	//Needed for NodeList types;
	let toString = {}.toString;

	//Needed to convert NodeList to an array;
	let slice = [].slice;

	/*****
	 * Now I'm making the prototypes of my library.
	 * 
	 * New functions are added to the library and
	 * many new feature to make plugins;
	 * 
	 * Now hiting up;
	 * 
	 * Note:- I'm not using the $ sign to accsess make the chirpserJS class;
	******/

	/*****
	 * 
	 * @param {String} element
	 * @returns {window || this}
	*****/

	function ___( element ) {
	
		//I'm going to remove the makeReady method and adding
		//into the class like C( function() {} );
	
		this.element = element;
	
		//Those declarations are necessary for my methods
		this.selector = null;				//The main selector
		this.self = null;				//The self value after having the siblings;
		this.siblingt = false;				//This variable will transformed into true when next() or previous() is used;
		this.nxt = false;				//Same as siblingt just for nextAll() and previousAll();
		this.selft = false;				//To check actually the self() method is fired or not;
		this.selectorEvents = [];			//All selector events are stored here;
	
		//To use the class again, I'm returning
		//the same window as this
		return ( this );
	}

	/*****
	 * Adding the prototypes;
	 * 
	 * Notice:- the __setup_chirpserJS_selector_init__() is a reserved
	 * method of chirpserJS;
	 * 
	 * So in this circumtances I'm requesting to not to modify the method;
	*****/

	//The core method
	___.prototype.__setup_chirpserJS_selector_init__ = function() {	//Just some security
		if( typeof this.element === "function" ) {	//The makeReady method added here...
			if( document.addEventListener ) 
				document.addEventListener( "DOMContentLoaded", this.element );
			else	//For IE6 or less
				document.attachEvent( "onreadystatechange", this.element );
		}
		else if( typeof this.element === "string" ) {
			if( this.element[ 0 ] === "$" ) 
				document.writeln( this.element.slice( 1 ) );
			else if( this.element[ 0 ] === "@" ) 
				alert( this.element.slice( 1 ) );
			else if( this.element[ 0 ] === "&" ) 
				this.selector = document.createElement( this.element.slice( 1 ) );
			else if( range( this.element, 5 ) === "!all." ) 
				this.selector = document.querySelectorAll( this.element.slice( 5 ) );
			else 
				this.selector = document.querySelector( this.element );
		}
		else if( typeof this.element === "object" ) 
			this.selector = this.element;
		else 
			throw new TypeError( "The given element is not an element, object or function!" );
	
		return ( this );
	};

	//The on() method will let to set an event to an element;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {String} event
	 * @param {Function} handler
	 * @returns {window || this}
	*****/

	___.prototype.on = function( event, handler ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {	//If more element appears or if that element is a NodeList then
			var len = this.selector.length;
			for( var i = 0; i < len; i++ ) {
				if( document.addEventListener ) {
					this.selectorEvents.push( event );
					this.selector[ i ].addEventListener( event, handler );
				} else {
					this.selectorEvents.push( event );
					event === "DOMContentLoaded" ? this.selector[ i ].attachEvent( "onreadystatechange", handler )
						: this.selector[ i ].attachEvent( "on" + event, handler );
				}
			}
		} else {
			if( document.addEventListener ) {
				this.selectorEvents.push( event );
				this.selector.addEventListener( event, handler );
			} else {
				this.selectorEvents.push( event );
				event === "DOMContentLoaded" ? this.selector.attachEvent( "onreadystatechange", handler )
						: this.selector.attachEvent( "on" + event, handler );
			}
		}
	
		return ( this );
	};

	//The following method will let to remove any event from
	//a element or NodeList;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {String} event
	 * @param {Function} handler
	 * @returns {window || this}
	*****/

	___.prototype.off = function( event, handler ) {
		
	};

	//The following method will find events attached
	//with the selector;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {String} eventName
	 * @returns {Boolean}
	*****/

	___.prototype.isOn = function( eventName ) {
		if( !eventName ) return ( null );
	
		if( this.selectorEvents.indexOf( eventName ) > -1 ) return ( true );
	
		return ( false );
	};

	//To style an element
	//The following method will let me
	//to style a selected element
	//	@since CJS 1.0.1

	//Note:- New feature added;
	//Now you can set more styles by an object;
	//Example:- CJS( element ).style({"background": "red", "color": "green"});

	/*****
	 * 
	 * @param {type} styleName
	 * @param {type} property
	 * @returns {window || this}
	 */

	___.prototype.style = function( styleName, property ) {
		var bool = false;
	
		if( is_plain_object( styleName ) ) bool = true;
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				for( var i = 0; i < len; i++ ) {
					for( var name in styleName ) {
						this.selector[ i ].style.setProperty( name, styleName[ name ] );
					}
				}
			} else 
				for( var i = 0; i < len; i++ ) {
					this.selector[ i ].style.setProperty( styleName, property );
				}
		} else {
			if( bool ) {
				for( var name in styleName ) {
					this.selector.style.setProperty( name, styleName[ name ] );
				}
			} else 
				this.selector.style.setProperty( styleName, property );
		}
	
		return ( this );
	};

	//Findout the next element from
	//selected element;
	//	@since CJS 1.0.1

	//Note:- The following next() mehtod holding a new feature.
	//from this version of CJS. Now you can find element sibling
	//from NodeList;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.next = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				this.selector = this.selector[ this.selector.length - 1 ].nextElementSibling;		//Finding the last element of the NodeList and adding it as the selector;
			} else {
				this.selector = this.selector[ this.selector.length - 1 ].nextElementSibling;		//Finding the last element of the NodeList and adding it as the selector;
			}
		} else {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				this.selector = this.selector.nextElementSibling;
			} else 
				this.selector = this.selector.nextElementSibling;
		}
	
		return ( this );
	};

	//The following method is little bit related with the next()
	//method and this method will find out all next elements from
	//selected element;
	//	@since CJS 1.0.1

	//Note:- The following nextAll() mehtod holding a new feature.
	//from this version of CJS. Now you can find element sibling
	//from NodeList;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.nextAll = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				var elem = this.selector[ this.selector.length - 1 ].nextElementSibling;
				var arr = [];
				for( ; elem; elem = elem.nextElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector[ this.selector[ this.selector.length - 1 ] ] ) 
						arr.push( elem );
			
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			} else {
				var elem = this.selector[ this.selector.length - 1 ].nextElementSibling;
				var arr = [];
				for( ; elem; elem = elem.nextElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector[ this.selector[ this.selector.length - 1 ] ] ) 
						arr.push( elem );
			
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			}
		} else {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				var elem = this.selector.nextElementSibling;
				var arr = [];
				for( ; elem; elem = elem.nextElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector ) 
						arr.push( elem );
			
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			} else {
				var elem = this.selector.nextElementSibling;
				var arr = [];
				for( ; elem; elem = elem.nextElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector ) 
						arr.push( elem );
			
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			}
		}
	
		return ( this );
	};

	//Same as the next() method. Will set past element sibling;
	//	@since CJS 1.0.1;

	//Note:- The following previous() mehtod holding a new feature.
	//from this version of CJS. Now you can find element sibling
	//from NodeList;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.previous = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				this.selector = this.selector[ 0 ].previousElementSibling;		//Finding the first element of the NodeList and adding it as the selector;
			} else {
				this.selector = this.selector[ 0 ].previousElementSibling;		//Finding the first element of the NodeList and adding it as the selector;
			}
		} else {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				this.selector = this.selector.previousElementSibling;
			} else 
				this.selector = this.selector.previousElementSibling;
		}
	
		return ( true );
	};

	//The following method is little bit related with the previous()
	//method and this method will find out all previous elements from
	//selected element;
	//	@since CJS 1.0.1

	//Note:- The following previousAll() mehtod holding a new feature.
	//from this version of CJS. Now you can find element sibling
	//from NodeList;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.previousAll = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				var elem = this.selector[ 0 ].previousElementSibling;
				var arr = [];
				for( ; elem; elem = elem.previousElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector[ this.selector[ 0 ] ] ) 
						arr.unshift( elem );
			
				this.selector = arr;			//Setting the array as selector
				if( !this.nxt ) 
					this.nxt = true;
			} else {
				var elem = this.selector[ 0 ].previousElementSibling;
				var arr = [];
				for( ; elem; elem = elem.previousElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector[ this.selector[ 0 ] ] ) 
						arr.unshift( elem );
			
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			}
		} else {
			if( !this.selft ) {
				this.self = this.selector;
				this.selft = true;
				this.siblingt = true;
				var elem = this.selector.previousElementSibling;
				var arr = [];
				for( ; elem; elem = elem.previousElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector ) 
						arr.unshift( elem );
			
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			} else {
				var elem = this.selector.previousElementSibling;
				var arr = [];
				for( ; elem; elem = elem.previousElementSibling ) 
					if( elem.nodeType === 1 && elem !== this.selector ) 
						arr.unshift( elem );
			
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			}
		}
	
		return ( this );
	};

	//Gets a single element from a NodeList;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {Number} number
	 * @returns {window || this}
	*****/

	___.prototype.get = function( number ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			this.selector = this.selector[ number ];
		
			if( this.nxt ) 
				this.nxt = false;
		} else {
			this.selector = is_object( this.element ) ? this.element : this.selector;
		
			if( this.nxt ) 
				this.nxt = false;
		}
	
		return ( this );
	};

	//The following method will empty an element;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	 */

	___.prototype.empty = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {
				this.selector[ i ].innerHTML = "";
			}
		} else 
			this.selector.innerHTML = "";
	
		return ( this );
	};

	//Will return an substring from first character
	//of the string related with the given index;

	/*****
	 * 
	 * @param {String} element
	 * @param {Number} rng
	 * @returns {String}
	*****/

	function range( element, rng ) {
		var total = [];
		for( var i = 0; i < rng; i++ ) {
			total.push( element[ i ] );
		}
	
		return ( total.join( "" ) );	//Converting it into a string
	}

	//The following function will add a draggable
	//UI to the element;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Object} element
	 * @returns {null}
	******/

	function drag( element, query, callback_a, callback_b ) {
		var position_1 = 0,
		position_2 = 0,
		position_3 = 0,
		position_4 = 0;
	
		if( !is_null( query ) ) 
			element.querySelector( query ).onmousedown = drag1;
		else element.onmousedown = drag1;
	
		function drag1( event ) {
			event = event || window.event;
		
			position_1 = event.clientX;
			position_2 = event.clientY;
		
			document.onmouseup = drag2;
			document.onmousemove = drag3;
		}
	
		function drag2( event ) {
			element.style.border = "";
			element.style.borderRadius = "";
		
			document.onmouseup = null;
			document.onmousemove = null;
		
			if( !is_null( callback_b ) ) callback_b.call( element, event );
		}
	
		//The function for mousemove;
		function drag3( event ) {
			event = event || window.event;
		
			//Calculationg the positions of the cursor;
			position_3 = position_1 - event.clientX;
			position_4 = position_2 - event.clientY;
		
			//Redefining with current section;
			position_1 = event.clientX;
			position_2 = event.clientY;
		
			//Changing the border;
			element.style.border = "2px #999999 dashed";
		
			element.style.top = ( element.offsetTop - position_4 ) + "px";
			element.style.left = ( element.offsetLeft - position_3 ) + "px";
		
			if( !is_null( callback_a ) ) callback_a.call( element, event );
		}
	}

	//The following method will return the siblings name
	//inside an element;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this || Array}
	*****/

	___.prototype.siblings = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
			var arr = [];
			for( var i = 0; i < len; i++ ) {
				var arr2 = [],
				clen = this.selector[ i ].childNodes.length;
			
				for( var j = 1; j < clen; j += 2 ) {
					arr2.push( this.selector[ i ].childNodes[ j ].nodeName.toLowerCase() );
				}
			
				arr.push( arr2 );
			}
		
			return ( arr );			//Returning the array;
		} else {
			var len = this.selector.childNodes.length,
			arr = [],
			i = 1;
		
			for( ; i < len; i += 2 ) {
				arr.push( this.selector.childNodes[ i ].nodeName.toLowerCase() );
			}
		
			return ( arr );
		}
	
		return ( this );
	};

	//The following mwthod will return the element own
	//siblings;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {Array}
	*****/

	___.prototype.ownSiblings = function() {
		var arr = [];					//Array for pushing;
	
		//Taking all next elements siblings
		this.nextAll();
	
		var len = this.selector.length;
	
		for( var i = 0; i < len; i++ ) {
			arr.push( this.selector[ i ].nodeName.toLowerCase() );
		}
	
		//Now taking all previous elements;
	
		//Note:- The own element also added as sibling;
		this.previousAll();
	
		var len = this.selector.length;
	
		for( var i = 0; i < len; i++ ) {
			arr.unshift( this.selector[ i ].nodeName.toLowerCase() );
		}
	
		return ( arr );
	};

	//The following function will return the siblings of
	//selected element;

	//Note:- The difference between ownSiblings an getOwnSiblings are
	//the ownSibling is just to show the siblings, where getOwnSiblings to
	//get it;

	//Note: New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.getOwnSiblings = function() {
		var arr = [];					//Array for pushing;
	
		//Taking all next elements siblings
		this.nextAll();
	
		var len = this.selector.length;
	
		for( var i = 0; i < len; i++ ) {
			arr.push( this.selector[ i ] );
		}
	
		//Now taking all previous elements;
	
		//Note:- The own element also added as sibling;
		this.previousAll();
	
		var len = this.selector.length;
	
		for( var i = 0; i < len; i++ ) {
			arr.unshift( this.selector[ i ] );
		}
	
		if( !this.nxt ) this.nxt = true;
	
		this.selector = arr;
		return ( this );
	};

	//Same as the above method. Just takes only the next Siblings;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {Array}
	*****/

	___.prototype.nextSiblings = function() {
		var arr = [];				//Array for modification;
	
		this.nextAll();
	
		for( var i = 0; i < this.selector.length; i++ ) {
			arr.push( this.selector[ i ].nodeName.toUpperCase() );
		}
	
		arr.unshift( this.self.nodeName.toUpperCase() );
		return ( arr );				//Returning the modified array;
	};

	//The following method will help to select nextSiblings;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.getNextSiblings = function() {
		var arr = [];				//Array for modification;
	
		this.nextAll();
	
		for( var i = 0; i < this.selector.length; i++ ) {
			arr.push( this.selector[ i ] );
		}
	
		arr.unshift( this.self );
	
		if( !this.nxt ) this.nxt = true;
	
		this.selector = arr;
	
		return ( this );
	};

	//Same as the above method. Just takes only the previous Siblings;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {Array}
	*****/

	___.prototype.previousSiblings = function() {
		var arr = [];				//Array for modification;
	
		this.previousAll();
	
		for( var i = 0; i < this.selector.length; i++ ) {
			arr.unshift( this.selector[ i ].nodeName.toLowerCase() );
		}
	
		arr.push( this.self.nodeName.toLowerCase() );
		return ( arr );
	};

	//The following method will about same as the getNextSiblings()
	//method;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.getPreviousSiblings = function() {
		var arr = [];				//Array for modification;
	
		this.previousAll();
	
		for( var i = 0; i < this.selector.length; i++ ) {
			arr.unshift( this.selector[ i ].nodeName.toLowerCase() );
		}
	
		arr.push( this.self.nodeName.toLowerCase() );
	
		if( !this.nxt ) this.nxt = true;
	
		this.selector = arr;					//Setting the array to the selector;
	
		return ( this );
	};

	//The following function maximumly used when
	//next(), nextAll(), previous(), previousAll()
	//methods are called;
	//pushes the very firstly used selector
	//to the main selector;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.andSelf = function() {
		if( this.siblingt ) {
			var elem = this.selector;
			var arr = [];
			if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
				var len = elem.length;
				for( var i = 0; i < len; i++ ) {
					arr.push( elem[ i ] );
				}
				arr.push( this.self );
				this.selector = arr;
				if( !this.nxt )			//If not this.nxt then it will make the this.nxt true
					this.nxt = true;	//because the selector will be no longer [object NodeList]
			} else {
				arr.push( elem );
				arr.push( this.self );
				this.selector = arr;
				if( !this.nxt ) 
					this.nxt = true;
			}
		} else {
			this.selector = typeof this.element === "object" ? this.element : this.selector;
		}
	
		return ( this );
	};

	//The html method will set an innerHTML or take
	//the innerHTML from the selector
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {String} text
	 * @returns {window || this || String || Array}
	*****/

	___.prototype.html = function( text ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
			if( text ) {
				for( var i = 0; i < len; i++ ) {
					this.selector[ i ].innerHTML = text;
				}
			} else {
				//Making an array to store those innerHTML text if
				//it's the selector is NodeList;
				var arr = [];
				for( var i = 0; i < len; i++ ) {
					arr.push( this.selector[ i ].innerHTML );
				}
				return ( arr );		//Returning the array
			
				//Note:- If there is no text you can't proceed
				//further to use other CJS methods;
			}
		} else {
			if( text ) 
				this.selector.innerHTML = text;
			else 
				return ( this.selector.innerHTML );		//Returning the text;
		}
	
		return ( this );
	};

	//The following methods will add text to
	//the selected element;

	/*****
	 * 
	 * @param {String} text
	 * @returns {window || this || String || Array}
	*****/

	___.prototype.text = function( text ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( text ) {
				for( var i = 0; i < len; i++ ) {
					this.selector[ i ].text = text;
				}
			} else {
				var arr = [];
			
				//Pushing text values to return;
				for( var i = 0; i < len; i++ ) {
					arr.push( this.selector[ i ].text );
				}
			
				return ( arr );
			}
		} else {
			if( text ) {
				this.selector.text = text;
			} else 
				return ( this.selector.text );
		}
	
		return ( this );
	};

	//The following element will replace the selector
	//with another element;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {String} node
	 * @param {String} nodeHTML
	 * @param {String || Array} nodeClasses
	 * @returns {window || this}
	*****/

	___.prototype.replace = function( node, nodeHTML, nodeClasses ) {
		if( !node ) node = document.createElement( "DIV" );
		else node = document.createElement( node );
	
		if( !nodeHTML ) nodeHTML = "";
	
		if( !nodeClasses ) nodeClasses = null;
	
		var bool = false;
	
		if( !is_null( nodeClasses ) ) {
			if( is_array( nodeClasses ) || is_string( nodeClasses ) && nodeClasses.split( " " ).length > 1 ) {
				nodeClasses = is_array( nodeClasses ) ? nodeClasses : nodeClasses.split( " " );
				bool = true;
			}
		}
	
		if( !is_null( nodeClasses ) ) {
			if( bool ) {
				var len = nodeClasses.length;
			
				for( var i = 0; i < len; i++ ) {
					node.classList.add( nodeClasses[ i ] );
				}
			} else {
				node.classList.add( nodeClasses );
			}
		
			node.innerHTML = nodeHTML;
		} else {
			node.innerHTML = nodeHTML;
		}
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {
				this.selector[ i ].parentNode.replaceChild( node, this.selector[ i ] );
			}
		} else 
			this.selector.parentNode.replaceChild( node, this.selector );
	
		return ( this );
	};

	//The following method will replcae the selectors
	//inner HTML;
	//Like a string replacements;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {String} HTMLIn
	 * @param {String} HTMLOut
	 * @returns {window || this}
	*****/

	___.prototype.replaceHTML = function( HTMLIn, HTMLOut ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {
				this.selector[ i ].innerHTML = this.selector[ i ].innerHTML.replace( HTMLIn, HTMLOut );
			}
		} else {
			this.selector.innerHTML = this.selector.innerHTML.replace( HTMLIn, HTMLOut );
		}
	
		return ( this );
	};

	//The following method will add classes
	//to the selected element or NodeList;

	//Note:- New feature added in addClass method;

	//Now you can add arrays in the parameters in the addClass method
	//instead of a space holding string;
	//Ex:- CJS( element ).addClass( [ "SDAH", "NEWDIV" ] ); -- Correct
	//Ex:- CJS( element ).addClass( "SDAH NEWDIV" ); -- Correct;
	//	@since CJS 1.0.1

	___.prototype.addClass = function( className ) {
		if( !className ) throw new TypeError( "the addClass() method needs a String type parameter!" );
	
		var bool = false;
	
		if( is_array( className ) || is_string( className ) && className.split( " " ).length > 1 ) {
			className = is_array( className ) ? className : className.split( " " );
			bool = true;
		}
	
		//Now adding the modified classes;
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var clen = className.length;
			
				for( var i = 0; i < len; i++ ) {
					for( var j = 0; j < clen; j++ ) {
						this.selector[ i ].classList.add( className[ j ] );
					}
				}
			} else {
				for( var i = 0; i < len; i++ ) {
					this.selector[ i ].classList.add( className );
				}
			}
		} else {
			if( bool ) {
				var len = className.length;
			
				for( var i = 0; i < len; i++ ) {
					this.selector.classList.add( className[ i ] );
				}
			} else {
				this.selector.classList.add( className );
			}
		}
	
		return ( this );
	};

	//The following method is little bit equal to the
	//above method;

	//Note: The method is holding 1 new feature;

	//Now you can remove classes by an array just like the past method;
	//	@since CJS 1.0.1

	___.prototype.removeClass = function( className ) {
		if( !className ) throw new TypeError( "the removeClass() method needs a String type parameter!" );
	
		var bool = false;
	
		if( is_array( className ) || is_string( className ) && className.split( " " ).length > 1 ) {
			className = is_array( className ) ? className : className.split( " " );
			bool = true;
		}
	
		//Now removing the modified classes;
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var clen = className.length;
			
				for( var i = 0; i < len; i++ ) {
					for( var j = 0; j < clen; j++ ) {
						this.selector[ i ].classList.remove( className[ j ] );
					}
				}
			} else {
				for( var i = 0; i < len; i++ ) {
					this.selector[ i ].classList.remove( className );
				}
			}
		} else {
			if( bool ) {
				var len = className.length;
			
				for( var i = 0; i < len; i++ ) {
					this.selector.classList.remove( className[ i ] );
				}
			} else {
				this.selector.classList.remove( className );
			}
		}
	
		return ( this );
	};

	//The following method will check if classes are exist;

	//Note:- New features addes on hasClass() mehtod;
	//Now you can check of more than one class on a selected element
	//or NodeList;

	___.prototype.hasClass = function( className ) {
		if( !className ) throw new TypeError( "The hasClass() method needs one parameter!" );
	
		var bool = false;
	
		if( is_array( className ) || is_string( className ) && className.split( " " ).length > 1 ) {
			className = is_array( className ) ? className : className.split( " " );
			bool = true;
		}
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var clen = className.length,
				arr = [];
			
				for( var i = 0; i < len; i++ ) {
					var narr = [];
					for( var j = 0; j < clen; j++ ) {
						if( this.selector[ i ].classList.contains( className[ j ] ) ) 
							narr.push( true );
						else narr.push( false );
					}
				
					arr.push( narr );
				}
			
				return ( arr );				//Returning the modified array;
			} else {
				var arr = [];
			
				for( var i = 0; i < len; i++ ) {
					if( this.selector[ i ].classList.contains( className ) ) 
						arr.push( true );
					else arr.push( false );
				}
			
				return ( arr );				//Returning the modified array;
			}
		} else {
			if( bool ) {					//If more than one class appears
				var len = className.length,
				arr = [];
			
				for( var i = 0; i < len; i++ ) {
					if( this.selector.classList.contains( className[ i ] ) ) 
						arr.push( true );
					else arr.push( false );
				}
			
				return ( arr );				//Returning the modified array;
			} else {
				return ( this.selector.classList.contains( className ) );
			}
		}
	};

	//The following method will toggle the selected
	//element or NodeLists class

	//Note:- New feature added;
	//Now you can toggle more than one class at
	//once;

	//Ex:- CJS( element ).toggleClass( [ "SDAH", "this" ], [ "new", "HHH" ] ) -- correct;
	//CJS( element ).toggleClass( "SDAH this", "new HHH" ) -- correct
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {String || Array} className
	 * @param {String || Array} classToggle
	 * @returns {window || this}
	*****/

	___.prototype.toggleClass = function( className, classToggle ) {
		if( !className ) throw new TypeError( "The toggleClass() method needs first parameter as string!" );
	
		var bool = false;					//To make sure the className is an array or not;
	
		if( is_array( className ) || is_string( className ) && className.split( " " ).length > 1 ) {
			className = is_array( className ) ? className : className.split( " " );
			bool = true;
		
			if( is_array( classToggle ) || is_string( classToggle ) && classToggle.split( " " ).length > 1 ) 
				classToggle = is_array( classToggle ) ? classToggle : classToggle.split( " " );
			else {
				var arr = [],
				len = className.length,
				i = 0;
			
				for( ; i < len; i++ ) {
					arr.push( classToggle );
				}
			
				classToggle = arr;
			}
		}
	
		if( bool ) {					//This is the maintainance conditional statement if the className and the classToggle is an array;
			if( className.length > classToggle.length ) {					//Need insertation on classToggle and that will be null;
				var len = className.length - classToggle.length;
			
				for( var i = 0; i < len; i++ ) {
					classToggle.push( "???" );
				}
			}
			else if( className.length < classToggle.length ) {				//Now className needs insertations;
				var len = classToggle.length - className.length;
			
				for( var i = 0; i < len; i++ ) {
					className.push( "???" );
				}
			}
		}
	
		function toggleClass( element, class_1, class_2 ) {
			var cname = element.className.split( " " ),
			len = cname.length,
			arr = [],
			i = 0;
		
			for( ; i < len; i++ ) {
				if( cname[ i ] === class_1 ) 
					arr.push( class_2 );
				else arr.push( cname[ i ] );
			}
		
			element.className = arr.join( " " );
		}
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var clen = className.length;
			
				for( var i = 0; i < len; i++ ) {
					for( var j = 0; j < len; j++ ) {
						toggleClass( this.selector[ i ], className[ j ], classToggle[ j ] );
					}
				}
			} else {
				for( var i = 0; i < len; i++ ) {
					toggleClass( this.selector[ i ], className, classToggle );
				}
			}
		} else {
			if( bool ) {
				var len = className.length;
			
				for( var i = 0; i < len; i++ ) {
					toggleClass( this.selector, className[ i ], classToggle[ i ] );
				}
			} else toggleClass( this.selector, className, classToggle );
		}
	
		return ( this );
	};

	//The following method will remove the
	//selected element;
	//	@since CJS 1.0.1;

	___.prototype.remove = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			for( var i = 0, len = this.selector.length; i < len; i++ ) {
				this.selector[ i ].parentNode.removeChild( this.selector[ i ] );
			}
		} else {
			this.selector.parentNode.removeChild( this.selector );
		}
	
		return ( this );
	};

	//The following method will make the
	//selected element visible;

	//Mostly like show() method except a difference
	//that's the visible() method will visible the view
	//of the element. But on other case the show() method
	//will reveal the non-exist element with visiblity;

	//Try the inspector mode on browser to differ the show()
	//and the visible() methods;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.visible = function() {
		this.style( {
			"visibility": "visible",
			"clear": "both"
		} );
	
		return ( this );
	};

	//The following method is opposite of the
	//above visible() method;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.invisible = function() {
		this.style( {
			"visibility": "hidden",
			"clear": "both"
		} );
	
		return ( this );
	};

	//The following method will add data to
	//the selected element or NodeList;

	//The data() method can be used like this,
	//CJS( element ).data( "SDAH", "SD Asif Hossein" ); -- correct;
	//CJS( element ).data( { "SDAH": "SD Asif Hossein", "HHH": "Triple H" } ); -- correct;
	//CJS( element ).data( [ "SDAH", "HHH" ], [ "SD Asif Hossein", "Triple H" ] ); -- correct;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {String || Object | Array} dataIn
	 * @param {String || Array} dataOut
	 * @returns {window || this || Array || String}
	*****/

	___.prototype.data = function( dataIn, dataOut ) {
		if( !dataIn ) throw new TypeError( "The data() method needs the first parameter!" );
	
		if( is_plain_object( dataIn ) ) {
			var name;
		
			if( !dataOut ) dataOut = null;
		
			var arr = [],						//Array to set values;
			narr = [];
		
			for( name in dataIn ) {
				arr.push( "data-" + name.toString() );
				narr.push( dataIn[ name ] );
			}							//Fully transforming both into an array;
		
			for( var i = 0, len = arr.length; i < len; i++ ) {
				this.attribute( arr[ i ], narr[ i ] );
			}
		}
		else if( is_array( dataIn ) ) {					//If it is an array, then add the data prefix in every array index value;
			var len = dataIn.length,
			i = 0;
		
			for( ; i < len; i++ ) {
				dataIn[ i ] = "data-" + dataIn[ i ];
			}
		
			if( dataOut ) this.attribute( dataIn, dataOut );
			else return this.attribute( dataIn );
		}
		else if( is_string( dataIn ) ) {
			var arr = dataIn.split( " " ),
			len = arr.length,
			i = 0;
		
			for( ; i < len; i++ ) {
				arr[ i ] = "data-" + arr[ i ];
			}
		
			dataIn = arr.join( " " );
		
			if( dataOut ) this.attribute( dataIn, dataOut );
			else return this.attribute( dataIn );
		} else throw new TypeError( "Unsupported data!" );
	
		return ( this );
	};

	//The following function will remove datas
	//from selected element or NodeList;

	//Note:- New in CJS 1.5.1;

	___.prototype.removeData = function( data ) {
		if( is_array( data ) ) {
			var len = data.length,
			i = 0;
		
			for( var i = 0; i < len; i++ ) {
				data[ i ] = "data-" + data[ i ];
			}
		}
		else if( is_string( data ) ) {
			var arr = data.split( " " ),
			len = arr.length,
			i = 0;
		
			for( var i = 0; i < len; i++ ) {
				arr[ i ] = "data-" + arr[ i ];
			}
		
			data = arr.join( " " );
		} else throw new TypeError( "Usupported type!" );
	
		return ( this.remattribute( data ) );
	};

	//The following method will filter classes or ID's
	//from selected wlwmwnt or NodeList;

	//Note:- To use the method,
	//CJS( element ).filter( "#id" ); -- correct;
	//CJS( element ).filter( ".class" ); -- correct;

	//Note:- New in CJS 1.5.1;

	___.prototype.filter = function( selector ) {
		var cls = false,
		id = false,
		bool = false;
	
		if( is_array( selector ) || is_string( selector ) && selector.split( " " ).length > 1 ) {
			bool = true;
		
			selector = is_array( selector ) ? selector : selector.split( " " );
		
			if( selector[ 0 ][ 0 ] === "." ) cls = true;
			else if( selector[ 0 ][ 0 ] === "#" ) throw new TypeError( "One element can have only one ID!" );
		} else {
			if( selector[ 0 ] === "." ) cls = true;
			else if( selector[ 0 ] === "#" ) id = true;
		}
	
		if( bool ) {
			for( var i = 0, len = selector.length; i < len; i++ ) {
				if( selector[ i ][ 0 ] === "." || selector[ i ][ 0 ] === "#" ) 
					selector[ i ] = selector[ i ].slice( 1 );
			}
		} else if( selector[ 0 ] === "." || selector[ 0 ] === "#" ) selector = selector.slice( 1 );
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var arr = [];
			
				for( var i = 0; i < len; i++ ) {
					if( checkTrue( CJS( this.selector[ i ] ).hasClass( selector ) ) ) arr.push( this.selector[ i ] );
				}
			
				this.selector = arr;
				if( !this.nxt ) this.nxt = true;
			} else {
				var arr = [];
			
				if( cls ) {
					for( var i = 0; i < len; i++ ) {
						if( CJS( this.selector[ i ] ).hasClass( selector ) ) arr.push( this.selector[ i ] );
					}
				}
				else if( id ) {
					for( var i = 0; i < len; i++ ) {
						if( CJS( this.selector[ i ] ).attribute( "id" ) === selector ) arr.push( this.selector[ i ] );
					}
				}
			
				this.selector = arr;
				if( !this.nxt ) this.nxt = true;
			}
		} else {
			this.selector = is_object( this.element ) ? this.element : this.selector;
		}
	
		function checkTrue( array ) {
			for( var i = 0, len = array.length; i < len; i++ ) {
				if( is_array( array[ i ] ) ) 
					if( checkTrue( array[ i ] ) === false ) return ( false );
			
				if( array[ i ] === false ) return ( false );
			}
		
			return ( true );
		}
	
		return ( this );
	};

	//the following method will add elemets to the selector;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {String} element
	 * @returns {window || this}
	*****/

	___.prototype.add = function( element ) {
		if( !element ) throw new TypeError( "The add() method needs the firt parameter!" );
	
		if( !!is_string( element ) && !!!is_empty_string( element ) ) {
			if( range( element, 5 ) === "!all." ) 
				element = document.querySelectorAll( element.slice( 5 ) );
			else element = !!is_object( element ) ? element : document.querySelector( element );
		}
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var arr = slice.call( this.selector );
		
			if( toString.call( element ) === "[object NodeList]" ) {
				var len = element.length;
			
				for( var i = 0; i < len; i++ ) arr.push( element[ i ] );
			} else arr.push( element );
		
			this.selector = arr;
		
			if( !this.nxt ) this.nxt = true;
		} else {
			var arr = [];
		
			if( toString.call( element ) === "[object NodeList]" ) {
				var len = element.length;
			
				for( var i = 0; i < len; i++ ) arr.push( element[ i ] );
			} else arr.push( element );
		
			this.selector = arr;
		
			if( !this.nxt ) this.nxt = true;
		}
	
		return ( this );
	};

	//Will return or set a value of an element
	//choosen by the selector;
	//	@since CJS 1.0.1;

	/*****
	 * 
	 * @param {String} value
	 * @returns {Array || String || window || this}
	*****/

	___.prototype.value = function( value ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
			if( value ) {
				for( var i = 0; i < len; i++ ) {
					//If the value is found, then it will
					//set the value of the element;
					this.selector[ i ].value = value;
				}
			} else {
				var arr = [],			//Taking an array to push and return the NodeList or more elements value;
				i = 0;
			
				for( ; i < len; i++ ) {
					arr.push( this.selector[ i ].value );		//Pushing the values
				}
			}
		} else {
			if( value )				//For a single element and the value is found then
				this.selector.value = value;
			else					//If the value is not found or null;
				return ( this.selector.value );
		}
	
		return ( this );
	};

	//The followinf function will append a
	//created child to the given div;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {Object} element
	 * @returns {window || this}
	*****/

	___.prototype.appendTo = function( element ) {
		if( range( element, 5 ) === "!all." ) 
			element = document.querySelectorAll( element.slice( 5 ) );
		else 
			element = document.querySelector( element );
	
		if( toString.call( element ) === "[object NodeList]" ) {
			var len = element.length;
		
			for( var i = 0; i < len; i++ ) {
				element[ i ].appendChild( this.selector );
			}
		} else {
			element.appendChild( this.selector );
		}
	
		return ( this );
	};

	//The following slice method will slice
	//selected NodeList;

	//Note:- If selector is single element then it will
	//return the same selected element;

	//Note:- New in CJS 1.5.1

	/*****
	 * 
	 * @param {Number} sliceIn
	 * @param {Number} sliceOut
	 * @returns {winodw || this}
	*****/

	___.prototype.slice = function( sliceIn, sliceOut ) {
		if( !sliceIn ) throw new TypeError( "The first parameter is needed to use the slice method!" );
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length,
			arr = [];
		
			if( sliceOut ) {
				for( var i = sliceIn; i < sliceOut; i++ ) {
					arr.push( this.selector[ i ] );
				}
			} else {
				for(var i = sliceIn; i < len; i++ ) {
					arr.push( this.selector[ i ] );
				}
			}
		
			this.selector = arr;
		
			if( !this.nxt ) this.nxt = true;
		}
	
		return ( this );
	};

	//The following method will len me to do
	//stuffs with the selected items;
	//Much like Array.prototype.map method;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Function} callback
	 * @returns {window || this}
	*****/

	___.prototype.map = function( callback ) {
		if( !callback ) throw new TypeError( "The first parameter is needed to use the map() method!" );
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {			//Adding the callback to map;
				callback.call( this.selector[ i ], i );
			}
		} else {
			callback.call( this.selector, 0 );
		}
	
		return ( this );
	};

	//The following method is opposite if filter method;
	//To block the filtered element;

	//Note:- New in CJS 1.5.1;

	___.prototype.block = function( selector ) {
		var cls = false,
		id = false,
		bool = false;
	
		if( is_array( selector ) || is_string( selector ) && selector.split( " " ).length > 1 ) {
			bool = true;
		
			selector = is_array( selector ) ? selector : selector.split( " " );
		
			if( selector[ 0 ][ 0 ] === "." ) cls = true;
			else if( selector[ 0 ][ 0 ] === "#" ) throw new TypeError( "One element can have only one ID!" );
		} else {
			if( selector[ 0 ] === "." ) cls = true;
			else if( selector[ 0 ] === "#" ) id = true;
		}
	
		if( bool ) {
			for( var i = 0, len = selector.length; i < len; i++ ) {
				if( selector[ i ][ 0 ] === "." || selector[ i ][ 0 ] === "#" ) 
					selector[ i ] = selector[ i ].slice( 1 );
			}
		} else if( selector[ 0 ] === "." || selector[ 0 ] === "#" ) selector = selector.slice( 1 );
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var arr = [];
			
				for( var i = 0; i < len; i++ ) {
					if( !checkTrue( CJS( this.selector[ i ] ).hasClass( selector ) ) ) arr.push( this.selector[ i ] );
				}
			
				this.selector = arr;
				if( !this.nxt ) this.nxt = true;
			} else {
				var arr = [];
			
				if( cls ) {
					for( var i = 0; i < len; i++ ) {
						if( !CJS( this.selector[ i ] ).hasClass( selector ) ) arr.push( this.selector[ i ] );
					}
				}
				else if( id ) {
					for( var i = 0; i < len; i++ ) {
						if( !CJS( this.selector[ i ] ).attribute( "id" ) === selector ) arr.push( this.selector[ i ] );
					}
				}
			
				this.selector = arr;
				if( !this.nxt ) this.nxt = true;
			}
		} else {
			if( bool ) {
				if( checkTrue( CJS( this.selector ).hasClass( selector ) ) ) this.selector = null;
			} else {
				if( cls ) if( CJS( this.selector ).hasClass( selector ) ) this.selector = null;
				else if( id ) if( CJS( this.selector ).attribute( "id" ) === selector ) this.selector = null;
			}
		}
	
		function checkTrue( array ) {					//The checkTrue function pastly used;
			for( var i = 0, len = array.length; i < len; i++ ) {
				if( is_array( array[ i ] ) ) 
					if( checkTrue( array[ i ] ) === false ) return ( false );
			
				if( array[ i ] === false ) return ( false );
			}
		
			return ( true );
		}
	
		return ( this );
	};

	//The following method is same to the above method;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {String} element
	 * @returns {window || this}
	*****/

	___.prototype.append = function( element ) {
		if( !is_object( element ) )
			element = document.createElement( element );
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {
				this.selector[ i ].appendChild( element );
			}
		
			this.selector = element;
		} else {
			this.selector.appendChild( element );
			this.selector = element;
		}
	
		return ( this );
	};

	//The following method will load an AJAX to
	//the selected element and HTML it;

	//Very useful for netweight works;
	//Used to load the response of a server-side
	//Scripting or programming page;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {String} url
	 * @param {Boolean} async
	 * @returns {window || this}
	*****/

	___.prototype.load = function( url, async ) {
		if( !url ) url = null;
		if( !async ) async = true;
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {
				var selector = this.selector[ i ];
			
				AJAX( {
					type: "GET",
					url: url,
					async: async,
					success: function() {
						selector.innerHTML = this.rtext;
					}
				} );
			}
		} else {
			var selector = this.selector;
		
			AJAX( {
				type: "GET",
				url: url,
				async: async,
				success: function() {
					selector.innerHTML = this.rtext;
				}
			} );
		}
	
		return ( this );
	};

	//The atribute method of CJS;

	//Note:- New feature added to the method and that is now this
	//method can add more than one attribute at once to an element
	//or NodeList;

	//Feature usage:- If you want to add more than on attribute, you
	//have to add an array on attribute name and attribute value
	//Followinf an arrangement like
	//C( elem ).attribute( [ "author", "abbreviation" ], [ "SD Asif Hossein", "SDAH" ] );
	//or can be use like this
	//C( elem ).attribute( "author abbreviation", [ "SD Asif Hossein",  "SDAH" ] );
	//only by spaces;

	//Note:- If your value has more than one spaces, then you better use the array as
	//the value;

	//Note:- the attrb method is named to new method attribute;
	//	@since CJS 1.0.1;

	/*****
	 * 
	 * @param {Array || String} attributeName
	 * @param {Array || String} attributeValue
	 * @returns {window || this || Array || String}
	*****/

	___.prototype.attribute = function( attributeName, attributeValue ) {
		if( !attributeName ) throw new TypeError( "The attribute() method needs at least one parameter!" );
	
		var bool = false;				//If the attributeName is an array then it will be true or false;
	
		if( is_array( attributeName ) || is_string( attributeName ) && attributeName.split( " " ).length > 1 ) {
			var arr_1 = is_array( attributeName ) ? attributeName : attributeName.split( " " );
			bool = true;
		
			//If there is the value
			if( attributeValue ) {
				if( is_array( attributeValue ) || is_string( attributeValue ) && attributeValue.split( " " ).length > 1 ) {
					var arr_2 = is_array( attributeValue ) ? attributeValue : attributeValue.split( " " );
				} else {
					//If it's only one value,
					//The arr_2 variable will
					//be an array with the same value anong with
					//arr_1's length;
					var arr_2 = [];
				
					for( var i = 0; i < arr_1.length; i++ ) {
						arr_2.push( attributeValue );
					}
				}
			
				//Balancing two string;
				//If there is any missing value on
				//attributeValue it will balance the array
				//length;
			
				if( arr_1.length !== arr_2.length ) {
					if( arr_1.length > arr_2.length ) {
						var len = arr_1.length - arr_2.length;
					
						//Now balancing;
						for( var i = 0; i < len; i++ ) {
							arr_2.push( null );
						}
					} else {
						var len = arr_2.length - arr_1.length;
					
						for( var i = 0; i < len; i++ ) {
							arr_1.push( null );
						}
					}
				}
			}
		}
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			//Checking for array value;
			if( bool ) {
				var arrlen = arr_1.length;
			
				//Will set the value to a NodeList;
				if( attributeValue ) {
					for( var i = 0; i < len; i++ ) {
						for( var j = 0; j < arrlen; j++ ) {
							this.selector[ i ].setAttribute( arr_1[ j ], arr_2[ j ] );
						}
					}
				} else {
					var rarr = [];			//Taking an array to return;
				
					for( var i = 0; i < len; i++ ) {
						var narr = [];			//Taking for push;
						for( var j = 0; j < len; j++ ) {
							//Now pushing the values;
							narr.push( this.selector[ i ].getAttribute( arr_1[ j ] ) );
						}
					
						rarr.push( narr );
					}
				
					return ( rarr );
				}
			} else {
				if( attributeValue ) {
					for( var i = 0; i < len; i++ ) {
						//Just setting the value to a NodeList;
						this.selector[ i ].setAttribute( attributeName, attributeValue );
					}
				} else {
					var rarr = [];
				
					for( var i = 0; i < len; i++ ) {
						rarr.push( this.selector[ i ].getAttribute( attributeName ) );
					}
				
					return ( rarr );
				}
			}
		} else {
			if( bool ) {
				var len = arr_1.length;
			
				//Now setting the value;
				if( attributeValue ) {
					for( var i = 0; i < len; i++ ) {
						this.selector.setAttribute( arr_1[ i ], arr_2[ i ] );
					}
				} else {
					var rarr = [];
				
					for( var i = 0; i < len; i++ ) {
						rarr.push( this.selector.getAttribute( arr_1[ i ] ) );
					}
				
					return ( rarr );
				}
			} else {
				if( attributeValue ) {
					this.selector.setAttribute( attributeName, attributeValue );
				} else {
					return ( this.selector.getAttribute( attributeName ) );
				}
			}
		}
	
		return ( this );
	};

	//This following method will remove an attribute from an element;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Array || String} attributeName
	 * @returns {window || this}
	*****/

	___.prototype.remattribute = function( attributeName ) {
		if( !attributeName ) throw new TypeError( "The remattribute() method needs a paramterer!" );			//The attributeName is required;
	
		var bool = false,			//If the attributeName needs to be an array then it will be true;
		arr;
	
		if( !is_array( attributeName ) && !is_string( attributeName ) ) {
			throw new TypeError( "The parameter given on remattribute() method must be a string or array!" );
			return;				//And won't pass methods anymore;
		}
	
		if( is_array( attributeName ) ) {
			arr = attributeName;
			bool = true;
		} else {				//Hadling the string case;
			arr = attributeName.split( " " );
			bool = true;
		}
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			//Checking of an array;
			if( bool ) {
				var arrlen = arr.length,
				i = 0;
			
				for( ; i < len; i++ ) {
					for( var j = 0; j < arrlen; j++ ) {
						//Removing more than one attributes of a NodeList;
						this.selector[ i ].removeAttribute( arr[ j ] );
					}
				}
			} else {
				for( var i = 0; i < len; i++ ) {
					//Removing one attribute of a NodeList;
					this.selector[ i ].removeAttribute( attributeName );
				}
			}
		} else {
			if( bool ) {
				var len = arr.length;
				for( var i = 0; i < len; i++ ) {
					//Removing more than one attribute of a single element;
					this.selector.removeAttribute( arr[ i ] );
				}
			} else {
				this.selector.removeAttribute( attributeName );
			}
		}
	
		return ( this );
	};

	//The following method will let to
	//do something (basically anything freely)
	//to the element or NodeList;
	//	@since CJS 1.0.1;

	//This following method is much usable to
	//make the plug-in's of CJS;

	/*****
	 * 
	 * @param {Function} callback
	 * @returns {window || this}
	*****/

	___.prototype.each = function( callback ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {
				callback.call( this.selector[ i ] );
			}
		} else {
			callback.call( this.selector );
		}
	
		return ( this );
	};

	//The folloeing method will show a hidden element;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {Function} callback 
	 * @returns {window || this}
	*****/

	___.prototype.show = function( callback ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
			for( var i = 0; i < len; i++ ) {
				this.selector[ i ].style.display = "block";
				if( callback ) callback.call( this.selector );
			}
		} else {
			this.selector.display = "block";
			if( callback ) callback.call( this.selector );
		}
	
		return ( this );
	};

	//The following function will hide a shown element;
	//	@since 1.0.1;

	/*****
	 * 
	 * @param {Function} callback 
	 * @returns {window || this}
	*****/

	___.prototype.hide = function( callback ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
			for( var i = 0; i < len; i++ ) {
				this.selector[ i ].style.display = "none";
				if( callback ) callback.call( this.selector );
			}
		} else {
			this.selector.display = "none";
			if( callback ) callback.call( this.selector );
		}
	
		return ( this );
	};

	//The following method will hide an element if it's
	//shown and will show if it's hidden;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {Function} callback
	 * @returns {window || this}
	*****/

	___.prototype.toggle = function( callback ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			//Toggling display of a NodeList;
			for( var i = 0; i < len; i++ ) {
				if( this.selector[ i ].style.display === "block" ) { 
					this.selector[ i ].style.display = "none";
					if( callback ) callback.call( this.selector );
				} else {
					this.selector[ i ].style.display = "block";
					if( callback ) callback.call( this.selector );
				}
			}
		} else {
			//Toggling display of an element;
			if( this.selector.style.display === "block" ) {
				this.selector.style.display = "none";
				if( callback ) callback.call( this.selector );
			} else {
				this.selector.style.display = "block";
				if( callback ) callback.call( this.selector );
			}
		}
	
		return ( this );
	};

	//Reaturns the lenth of the selector;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @returns {Number}
	*****/

	___.prototype.length = function(){
		if( is_plain_object( this.selector ) ) {
			var i = 0;
		
			for( var name in this.selector ) {
				i++;
			}
		
			return ( i );
		} else {
			return ( this.selector.length );
		}
	};

	//The following method will return the selector
	//as a parent;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.parent = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) 
			throw new TypeError( "The parent() method doesn't support NodeList!" );
		this.selector = this.selector.parentNode;			//Setting the selector as parent;
		return ( this );
	};

	//The following method will findout the first child of the selector;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.first = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length,
			arr = [];
		
			for( var i = 0; i < len; i++ ) {
				arr.push( this.selector[ i ].firstChild.nextSibling );
			}
		
			if( !this.nxt ) this.nxt = true;
			this.selector = arr;
		} else {
			this.selector = this.selector.firstChild.nextSibling;
			if( this.nxt ) this.nxt = false;
		}
	
		return ( this );
	};

	//The following method will findout the last child of the selector;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.last = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length,
			arr = [];
		
			for( var i = 0; i < len; i++ ) {
				arr.unshift( this.selector[ i ].lastChild.previousSibling );
			}
		
			if( !this.nxt ) this.nxt = true;
			this.selector = arr;
		} else {
			this.selector = this.selector.lastChild.previousSibling;
			if( this.nxt ) this.nxt = false;
		}
	
		return ( this );
	};

	//The following method will remove selected child from
	//an elements inner NodeList;

	//Note:- New in CJS 1.5.1

	/*****
	 * 
	 * @param {String || Array} name
	 * @returns {window || this}
	*****/

	___.prototype.detach = function( name ) {
		var bool = false;
	
		if( is_array( name ) && !is_empty_array( name ) || is_string( name ) && name.split( " " ) ) {
			var elem = is_array( name ) ? name : name.split( " " );
			bool = true;
		} else var elem = name;
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var arrlen = elem.length;
			
				for( var i = 0; i < len; i++ ) {
					for( var j = 0; j < arrlen; j++ ) {
						this.selector[ i ].removeChild( is_object( elem[ j ] ) ? elem[ j ] : this.selector[ i ].querySelector( elem[ j ] ) );
					}
				}
			} else {
				for( var i = 0; i < len; i++ ) {
					this.selector[ i ].removeChild( is_object( elem ) ? elem : this.selector[ i ].querySelector( elem ) );
				}
			}
		} else {
			if( bool ) {
				var len = elem.length;
				for( var i = 0; i < len; i++ ) {
					this.selector.removeChild( is_object( elem[ i ] ) ? elem[ i ] : this.selector.querySelector( elem[ i ] ) );
				}
			} else {
				this.selector.removeChild( is_object( elem[ j ] ) ? elem[ j ] : this.selector.querySelector( elem ) );
			}
		}
	
		return ( this );
	};

	//The following method will return selected element's\
	//childNodes;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Number} number
	 * @returns {window || this}
	*****/

	___.prototype.cnodes = function( number ) {
		if( is_undefined( number ) || is_null( number ) ) number = this.selector.childNodes.length;
	
		if( number === 0 ) number += 1;
		else number += 2;
	
		this.selector = this.selector.childNodes[ number ];
		return( this );
	};

	//The following method will return the selected element name;

	/*****
	 * 
	 * @returns {Array || String}
	*****/

	___.prototype.name = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length,
			arr = [];				//Array to return;
		
			for( var i = 0; i < len; i++ ) {
				arr.push( this.selector[ i ].nodeName );
			}
		
			return ( arr );				//Returning the modified array;
		} else {
			return ( this.selector.nodeName );
		}
	};

	//The following method will make selector or NodeList
	//draggable;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.draggable = function( query, mmcallback, mocallback ) {			//Not taking any arguments;
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			for( var i = 0; i < len; i++ ) {
				drag( this.selector[ i ], query ? query : null, mmcallback ? mmcallback : null, mocallback ? mocallback : null );
			}
		} else {
			drag( this.selector, query ? query : null, mmcallback ? mmcallback : null, mocallback ? mocallback : null );
		}
	
		return ( this );
	};

	//The following method will find childs and returns
	//true if found else false;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Object} element
	 * @returns {window || this}
	*****/

	___.prototype.children = function( element ) {
		this.query( element );
		return ( this );
	};

	//The following function will return true is children is
	//found or else false;

	/*****
	 * 
	 * @param {Object} element
	 * @returns {window || this}
	*****/

	___.prototype.isChild = function( selector ) {
		if( !!is_object( selector ) ) {
			this.query( "!all.*" );
		
			for( var i = 0, len = this.selector.length; i < len; i++ ) {
				if( selector === this.selector[ i ] ) {
					return ( true );
				}
			}
		}
		else if( !!is_string( selector ) ) {
			this.query( selector );
		
			if( !is_null( this.selector ) || !is_undefined( selector ) ) return ( true );
		}
	
		return ( false );
	};

	//The following method will wrap things
	//up;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Object || String} content
	 * @returns {window || this}
	*****/

	___.prototype.allow = function( content ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( !!is_object( content ) ) {
				var select = this.selector[ 0 ].parentNode.insertBefore( content, this.selector[ 0 ] );
			
				for( var i = 0; i < len; i++ ) {
					select.appendChild( this.selector[ i ] );
					this.selector[ i ].parentNode.removeChild( this.selector[ i ] );
				}
			
				this.selector = select;
			}
			else if( !!is_string( content ) ) {
				if( content[ 0 ] === "<" ) {
					var a = [];
				
					for( var i = 0; content[ i ] !== ">"; i++ ) {
						a.push( content[ i ] );
					}
				
					a = a.slice( 1 );
					a = a.join( "" );				//Making them a String type;
				
					var nSystem = a.split( " " );
				
					var select = this.selector[ 0 ].parentNode.insertBefore( document.createElement( nSystem[ 0 ] ), this.selector[ 0 ] );
				
					for( var i = 1, len = nSystem.length; i < len; i++ ) {
						var attr = nSystem[ i ].split( "=\"" );
						attr[ 1 ] = attr[ 1 ].substring( 0, attr[ 1 ].length - 1 );
						select.setAttribute( attr[ 0 ], attr[ 1 ] );
					}
				
					for( var i = 0; i < len; i++ ) {
						this.selector[ i ].parentNode.removeChild( this.selector[ i ] );
						select.appendChild( this.selector[ i ] );
					}
				
					this.selector = select;
				} else {
					var nSystem = content.split( " " );
				
					var select = this.selector[ 0 ].parentNode.insertBefore( document.createElement( nSystem[ 0 ] ), this.selector[ 0 ] );
				
					for( var i = 1, len = nSystem.length; i < len; i++ ) {
						var attr = nSystem[ i ].split( "=\"" );
						attr[ 1 ] = attr[ 1 ].substring( 0, attr[ 1 ].length - 1 );
						select.setAttribute( attr[ 0 ], attr[ 1 ] );
					}
				
					for( var i = 0; i < len; i++ ) {
						this.selector[ i ].parentNode.removeChild( this.selector[ i ] );
						select.appendChild( this.selector[ i ] );
					}
				
					this.selector = select;
				}
			}
		} else {
			if( !!is_object( content ) ) {
				var select = this.selector.parentNode.insertBefore( content, this.selector );
			
				select.appendChild( this.selector );
				this.selector.parentNode.removeChild( this.selector );
			
				this.selector = select;
			}
			else if( !!is_string( content ) ) {
				if( content[ 0 ] === "<" ) {
					var a = [];
				
					for( var i = 0; content[ i ] !== ">"; i++ ) {
						a.push( content[ i ] );
					}
				
					a = a.slice( 1 );
					a = a.join( "" );				//Making them a String type;
				
					var nSystem = a.split( " " );
				
					var select = this.selector.parentNode.insertBefore( document.createElement( nSystem[ 0 ] ), this.selector );
				
					for( var i = 1, len = nSystem.length; i < len; i++ ) {
						var attr = nSystem[ i ].split( "=\"" );
						attr[ 1 ] = attr[ 1 ].substring( 0, attr[ 1 ].length - 1 );
						select.setAttribute( attr[ 0 ], attr[ 1 ] );
					}
				
					this.selector.parentNode.removeChild( this.selector );
					select.appendChild( this.selector );
				
					this.selector = select;
				} else {
					var nSystem = content.split( " " );
				
					var select = this.selector.parentNode.insertBefore( document.createElement( nSystem[ 0 ] ), this.selector );
				
					for( var i = 1, len = nSystem.length; i < len; i++ ) {
						var attr = nSystem[ i ].split( "=\"" );
						attr[ 1 ] = attr[ 1 ].substring( 0, attr[ 1 ].length - 1 );
						select.setAttribute( attr[ 0 ], attr[ 1 ] );
					}
				
					this.selector.parentNode.removeChild( this.selector );
					select.appendChild( this.selector );
				
					this.selector = select;
				}
			}
		}
	
		return ( this );
	};

	//The following method will allow inner of all single element;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {String} content
	 * @returns {window || this}
	*****/

	___.prototype.allowInner = function( content ) {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length,
			i = 0;
		
			for( ; i < len; i++ ) {
				CJS( this.selector[ i ] ).allow( content );
			}
			
		} else {
			this.allow( content );
		}
	
		return ( this );
	};

	//The following method will disallow the selector;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.disallowInner = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length,
			i = 0,
			arr = [],
			select;
		
			for( ; i < len; i++ ) {
				select = this.selector[ i ].parentNode.parentNode.insertBefore( this.selector[ i ], this.selector[ i ].parentNode );
				arr.push( this.selector[ i ] );
				CJS( this.selector[ i ] ).next().remove();
			}
		
			this.selector = arr;
		
			if( !this.nxt ) this.nxt = true;
		} else {
			var select = this.selector.parentNode.parentNode.insertBefore( this.selector, this.selector.parentNode );
			CJS( this.selector ).next().remove();
			this.selector = select;
		}
	
		return ( this );
	};

	//The following method will make identify
	//the inner contents of an iframe;

	/*****
	 * 
	 * @returns {window || this}
	*****/

	___.prototype.contents = function() {
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) throw new TypeError( "The frame should be an single element!" );
		else {
			if( toString.call( this.selector ) === "[object HTMLIFrameElement]" ) this.selector = this.selector.contentDocument;
		}
	
		return ( this );
	};

	//The following method will add event to the selector,
	//but it's one time only;

	//Creates an temporary event listener;

	//Note:- New in CJS 1.5.1;

	___.prototype.tree = function( events, object, handler ) {
		if( !events ) throw new TypeError( "The parameter 1 is needed use the method tree()!" );
	
		var bool = false,
		nbool = false;
	
		if( is_array( events ) || is_string( events ) && events.slice( " " ) > 1 ) {
			var evn = is_array( events ) ? events : events.slice( " " );
			bool = true;
		} else var evn = events;
	
		if( is_plain_object( events ) ) {
			var hand = handler;
			nbool = true;
		} else var hand = object;
	
		if( toString.call( this.selector ) === "[object NodeList]" || this.nxt ) {
			var len = this.selector.length;
		
			if( bool ) {
				var evnlen = evn.length;
			
				//Adding the events;
				for( var i = 0; i < len; i++ ) {
					for( var j = 0; j < evnlen; j++ ) {			//A nested loop for evn array;
						if( document.addEventListener ) 
							this.selector[ i ].addEventListener( evn[ i ], function( e ) {
								if( nbool ) 
									var OBJ = copy_objects( {
										ready: true,
										event: evn[ j ]
									}, object );
								else 
									var OBJ = {
									ready: true,
									event: evn
								};
							
								hand.call( this.selector[ i ], e, OBJ );
								this.selector[ i ].removeEventListener( evn[ j ], null );
							} );
						else 
							this.selector[ i ].attachEvent( evn[ j ], function( e ) {
								if( nbool ) 
									var OBJ = copy_objects( {
										ready: true,
										event: evn[ j ]
									}, object );
								else var OBJ = {
									ready: true,
									event: evn
								};
							
								hand.call( this.selector[ i ], e, OBJ );
								this.selector[ i ].removeEvent( evn[ j ], null );
							} );
					}
				}
			} else {
				for( var i = 0; i < len; i++ ) {
					if( document.addEventListener ) 
						this.selector[ i ].addEventListener( evn, function( e ) {
							if( nbool ) 
								var OBJ = copy_objects( {
									ready: true,
									event: evn
								}, object );
							else var OBJ = {
								ready: true,
								event: evn
							};
						
							hand.call( this.selector[ i ], e, OBJ );
							this.selector[ i ].removeEventListener( evn, null );
						} );
					else 
						this.selector[ i ].attachEvent( evn, function( e ) {
							if( nbool ) 
								var OBJ = copy_objects( {
									ready: true,
									event: evn
								}, object );
							else var OBJ = {
								ready: true,
								event: evn
							};
						
							hand.call( this.selector[ i ], e, OBJ );
							this.selector[ i ].removeEvent( evn, null );
						} );
				}
			}
		} else {
			if( bool ) {
				var len = evn.length;
				for( var i = 0; i < len; i++ ) {
					if( document.addEventListener )
						this.selector.addEventListener( evn[ i ], function( e ) {
							if( nbool ) 
								var OBJ = copy_objects( {
									ready: true,
									event: evn[ i ]
								}, object );
							else var OBJ = {
								ready: true,
								event: evn[ i ]
							};
						
							hand.call( this.selector, e, OBJ );
							this.selector.removeEventListener( evn[ i ], null );
						} );
					else 
						this.selector.attachEvent( evn[ i ], function( e ) {
							if( nbool ) 
								var OBJ = copy_objects( {
									ready: true,
									event: evn[ i ]
								}, object );
							else var OBJ = {
								ready: true,
								event: evn[ i ]
							};
						
							hand.call( this.selector, e, OBJ );
							this.selector.removeEvent( evn[ i ], null );
						} );
				}
			} else {
				if( document.addEventListener ) 
					this.selector.addEventListener( evn, function( e ) {
						if( nbool ) 
							var OBJ = copy_objects( {
								ready: true,
								event: evn
							}, object );
						else var OBJ = {
							ready: true,
							event: evn
						};
					
						hand.call( this.selector, e, OBJ );
						this.selector.removeEventListener( evn, null );
					} );
				else 
					this.selector.attachEvent( evn, function( e ) {
						if( nbool ) 
							var OBJ = copy_objects( {
								ready: true,
								event: evn
							}, object );
						else var OBJ = {
							ready: true,
							event: evn
						};
					
						hand.call( this.selector, e, OBJ );
						this.selector.removeEvent( evn, null );
						} );
			}
		}
	
		return ( this );
	};

	//The following function will select query inside the element;
	//	@since CJS 1.0.1;

	/*****
	 * 
	 * @param {String} selector
	 * @returns {window || this}
	*****/

	___.prototype.query = function( selector ) {
		if( !selector ) throw new TypeError( "The query() method needs first parameter!" );
	
		if( range( selector, 5 ) === "!all." ) selector = this.selector.querySelectorAll( selector.slice( 5 ) );
		else selector = this.selector.querySelector( selector );
	
		this.selector = selector;
	
		return ( this );
	};
	
	//The following function will return a new ___ class to access it's methods.
	//Probarbly that function will let me to initiate the selector and manipulate
	//it.

	function CJS( element ) {
		//Returning the main CJS super class ( ___ );
	
		return ( ( new ___( element ) ).__setup_chirpserJS_selector_init__() );
	}

	//The following variable will help me to
	//add plug-in's to my own library;
	//	@since CJS 1.0.1

	//Note:- The name is changed from PLUGIN in CJSPlugin;

	var CJSPlugin = ___.prototype;

	//String.prototype.reverse

	//The following String prototype is not available
	//in browsers and I'm adding this prototype to reverse
	//a string.

	//Really a valuable method

	if( !String.prototype.reverse ) {
		
	}

	//Those functions contains CJS tools to modify,
	//get type etc.
	//	@since CJS 1.0.1

	//Note:- The type functions like is_function, is_object,
	//is_null etc. were free functions.

	//Note:- extend function is now available as this name set_defaults;

	//The type function returns the type of an
	//object or variable;

	/*****
	 * 
	 * @param {Object} obj
	 * @returns {typeof @param}
	*****/

	var type =  function( obj ) {
		return ( typeof obj );
	};

	//Returns true if the element type is null
	//and false if it's not;

	/*****
	 * 
	 * @param {Object} element
	 * @returns {Boolean}
	*****/
	
	var is_null = function( element ) {
		return ( element === null ? true : false );		//Checking the null value and returning it.
	};

	//Returns true if the element is a function or
	//else false;

	/*****
	 * 
	 * @param {Object} element
	 * @returns {Boolean}
	*****/

	var is_function = function( element ) {
		return ( type( element ) === "function" );
	};

	//Returns true if the element is an object or
	//else false;

	/*****
	 * 
	 * @param {Object} element
	 * @returns {Boolean}
	*****/

	var is_object = function( element ) {
		return ( type( element ) === "object" );
	};

	//Returns true if the element is a string or
	//else false;

	/*****
	 * 
	 * @param {String} element
	 * @returns {Boolean}
	*****/

	var is_string = function( string ) {
		return ( type( string ) === "string" );
	};

	//Returns true if the element is a number or
	//else false;

	/*****
	 * 
	 * @param {Number} element
	 * @returns {Boolean}
	*****/

	var is_number = function( number ) {
		return ( type( number ) === "number" );
	};

	//Returns true if the element is a boolean or
	//else false;

	/*****
	 * 
	 * @param {Boolean} element
	 * @returns {Boolean}
	*****/

	var is_boolean = function( boolean ) {
		return ( type( boolean ) === "boolean" );
	};

	//Returns true if the element is a string or
	//else false;

	/*****
	 * 
	 * @param {Boolean} element
	 * @returns {Boolean}
	*****/

	var is_array = function( array ) {
		return ( Array.isArray( array ) );
	};

	//Returns true if the array is empty or
	//else false;

	/*****
	 * 
	 * @param {Array} array
	 * @returns {Boolean}
	*****/

	var is_empty_array = function( array ) {
		return ( is_undefined( array[ 0 ] ) );
	};

	//Returns true is given string is empty
	//or else false;

	/*****
	 * 
	 * @param {String} string
	 * @returns {Boolean}
	*****/

	var is_empty_string = function( string ) {
		return ( string.length === 0 );
	};

	//Returns true if the element is undefined or
	//else false;

	/*****
	 * 
	 * @param {Variable} element
	 * @returns {Boolean}
	*****/

	var is_undefined = function( element ) {
		return ( element === undefined );
	};

	//Returns true if the object is empty or
	//else false;

	//Note:- This is a new function in CJS 1.5.1

	/*****
	 * 
	 * @param {Object} element
	 * @returns {Boolean}
	*****/

	var is_empty_object = function( obj ) {
		var name;		//Taking the name to check the object is empty or not;
	
		if( toString.call( obj ).indexOf( "HTML" ) > -1 || toString.call( obj ).indexOf( "NodeList" ) > -1 || toString.call( obj ).indexOf( "Text" ) > -1 || toString.call( obj ).indexOf( "XMLHttpRequest" ) > -1 || toString.call( obj ).indexOf( "DataTransfer" ) > -1 || toString.call( obj ).indexOf( "MouseEvent" ) ) 
			return ( false );
		else 
			for( name in obj ) {
				if( obj.hasOwnProperty( name ) ) 
					return ( false );
			}
	
		return ( true );
	};

	//Returns true if the object is plain or
	//else false;

	//Note:- This is a new function in CJS 1.5.1

	/*****
	 * 
	 * @param {Object} element
	 * @returns {Boolean}
	*****/

	var is_plain_object = function( obj ) {
		var _prototype, _constructor;
	
		//Checking if the object is declared or not,
		//or exactly object or not;
	
		//Plain objects are exactly are not class to
		//object. A plain object is exactly just an
		//object like {};
	
		//If it's true, The object will return false;
		if( !obj || toString.call( obj ) !== "[object Object]" || !is_object( obj ) ) 
			return ( false );
	
		_prototype = Object.getPrototypeOf( obj );
	
		//If there is no prototype then it's a plain object;
		//So, return will be true;
	
		if( !_prototype ) 
			return ( true );
	
		_constructor = Object.hasOwnProperty.call( _prototype, "constructor" ) && _prototype.constructor;
	
		//Now using the basic return if any prototype found;
		return ( type( _constructor ) === "function" && Object.hasOwnProperty.toString.call( _constructor ) === Object.hasOwnProperty.toString.call( Object ) );
	};

	//Returns an object with copy of argumented object values;
	//Note:- New in CJS 1.5.1;

	/*****
	 * @param {Object} arguments
	 * @returns {Object}
	*****/

	var copy_objects = function() {		//I'll take the parameters by the arguments object;
		var target = arguments,		//So, not taking any any passed parameters;
		len = target.length,
		obj = {};
	
		for( var i = 0; i < len; i++ ) {
			//If it's a true plain object,
			//then the object is copiable;
			if( !is_function( target[ i ] ) && !is_string( target[ i ] ) && !is_number( target[ i ] )
			&& !is_boolean( target[ i ] ) && is_plain_object( target[ i ] ) ) {
				if( !is_empty_object( target[ i ] ) ) {
					//Taking a name,
					//The name will return object prototypes/values
					var name;
					for( name in target[ i ] ) {
						if( obj[ name ] )		//The element will be overwrited by the last object element;
							obj[ name ] = target[ i ][ name ];
						else				//If there is no element then it will be added to the obj;
							obj[ name ] = target[ i ][ name ];
					}
				}
			}
		}
	
		//Return the modified object;
		return ( obj );
	};

	//Set a default value of an object;
	//Like if there is any element is missing,
	//then the element will be added by default;

	//Note:- extend function is changed to set_defaults
	//function and the parameters are changed little bit;

	//This function is not holding any arrays anymore. The first
	//parameter is going to be an default object and other parameters
	//going to be the target;

	//Note:- New feature added on set_default function and that is now
	//this function can take more than 1 target and the return value will be an array;

	/*****
	 * 
	 * @param {Object} arguments
	 * @returns {Object || null || Array}
	*****/

	var set_default = function() {			//Taking arguments as the parameters;
		var defaultCopy = arguments[ 0 ],	//In that case not taking any passed parameters;
		targets = arguments,
		len = targets.length,
		i = 1;					//Taking i as 1 because 0 is the default copy;
	
		if( len > 2 ) {				//Need to set an array if arguments length is more than 2;
			var arr = [];
		
			for( ; i < len; i++ ) {
				var name;
			
				if( !defaultCopy ) 
					arr.push( null );
			
				for( name in defaultCopy ) {
					if( !targets[ i ][ name ] ) 
						targets[ i ][ name ] = defaultCopy[ name ];
				}
			
				arr.push( targets[ i ] );
			}
		
			return ( arr );
		}
		else if( len === 2 ) {
			var obj = {};			//Will return the object after beign modified;
		
			for( var i = 1; i < len; i++ ) {
				var name;
			
				if( !defaultCopy ) 
					return ( null );
			
				for( name in defaultCopy ) {
					if( !targets[ i ][ name ] ) 
						obj[ name ] = defaultCopy[ name ];
					else		//If targets has the element and the value, then all is OK;
						obj[ name ] = targets[ i ][ name ];
				}
			}
		
			return ( obj );
		}
	
		return ( defaultCopy );
	};

	//IE6 bug fixing;
	//IE6 doesn't have the array indexOf method;
	//SO, CJS adding it!

	//Interesting...

	if( !Array.prototype.indexOf ) {			//Checking for other browsers;
		Array.prototype.indexOf = function( item ) {
			var len = this.length;
			for( var i = 0; i < len; i++ ) {
				if( this[ i ] === item ) {
					return ( i );		//Returning with an increment so that the indexOf value can be used in loops;
				}
			}
		
			return ( -1 );				//If no element found then it will return -1;
		};
	}

	//This function will use to write some
	//JS code on head;

	//Note:- The code will be an internal code;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {String} code
	 * @param {Object} doc
	*****/

	var HEADScript = function( code, doc ) {
		doc = doc ? doc : document;
	
		//Not taking any help of CJS;
		//Because It need to be in pure JS;
		var script = document.createElement( "script" );
		script.type = "text/javascript";
		script.text = code;
	
		//appending and after run removing the tag;
		//This code can be called a spy code, because
		//this code will run but not shown on Browser's
		//Inspector mode;
	
		doc.head.appendChild( script ).parentNode.removeChild( script );
	};

	//The following function will take array in a range;
	//Very useful function for array;
	//Little like the PHP function range(), but also added some feature;

	//Note:- New in CJS 1.5.1

	/*****
	 * 
	 * @param {String || Number} from
	 * @param {String || Number} destination
	 * @param {Number} increament
	 * @returns {Array}
	*****/

	var array_range = function( from, destination, increament ) {
		var sarr = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
			'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ],
		carr = [];
	
		for( var i = 0; i < sarr.length; i++ ) {			//Adding characters to the carr array as cpital letters;
			carr.push( sarr[ i ].toUpperCase() );
		}
	
		if( !destination ) throw new TypeError( "The second parameter is neede to use the function array_range!" );
	
		if( is_string( from ) ) 
			var f = from,
			d = destination,
			bool = true;
		else 
			var f = from,
			d = destination,
			bool = false;
	
		var inc = increament ? increament : 1;
	
		if( bool ) {
			if( carr.indexOf( f ) > -1 ) {
				if( sarr.indexOf( d ) > -1 ) return ( null );
			
				var narr = [];			//An array to return;
				for( var i = carr.indexOf( f ); i < carr.indexOf( d ) + 1; i += inc ) {
					narr.push( carr[ i ] );
				}
			
				return ( narr );		//Returnig the modified array;
			}
			else if( sarr.indexOf( f ) > -1 ) {
				if( carr.indexOf( d ) > 1 ) return ( null );
			
				var narr = [];
				for( var i = sarr.indexOf( f ); i < sarr.indexOf( d ) + 1; i += inc ) {
					narr.push( sarr[ i ] );
				}
			
				return ( narr );
			}
		} else {
			var narr = [];
			for( var i = f; i <= d; i += inc ) {
				narr.push( i );
			}
		
			return ( narr );
		}
	};

	//The following function will reveal the data of
	//a variable;

	//Note:- New in CJS 1.5.1

	var reveal = function( element ) {
		var str = "";
	
		if( is_number( element ) ) {
			if( ( element ).toString().indexOf( "." ) > -1 ) {
				var numarr = ( element ).toString().split( "." );
				var numlen = numarr[ 0 ].toString().length + ", " + numarr[ 1 ].length;
				var numType = "Float";
			} else {
				var numlen = ( element ).toString().length;
				numType = "Int";
			}
		
			str += "//Type( Number ), " + numType + "( " + numlen + " )//:- " + element;
		}
		else if( is_string( element ) ) {
			var strlen = element.length;
			var type = "String";
		
			str += "//Type( String ), " + type + "( " + strlen + " )//:- \"" + element + "\"";
		}
		else if( is_boolean( element ) ) {
			var type = "Boolean",
			boolen = ( element ).toString().length;
		
			str += "//Type( " + type + " ), " + type + "( " + boolen + " )//:- " + element; 
		}
		else if( is_function( element ) ) {
			var type = "Function",
			name = element.name;
		
			str += "//Type ( " + type + " ), " + type + "( " + element.name.length + " )//:- function " + name + "(){ [Native Code] }";
		}
		else if( is_null( element ) ) return null;
		else if( is_array( element ) ) {
			if( is_empty_array( element ) ) return null;
		
			var arrlen = element.length,
			type = "Array";
			var substr = "";
		
			for( var i = 0; i < arrlen; i++ ) {
				substr += ",&nbsp;[ " + i + " ]=>&nbsp;" + reveal( element[ i ] );
			}
		
			str += "//Type( " + type + " ), " + type + "( " + arrlen + " )//:- [ " + substr.slice( 1 ) + "&nbsp; ]";
		}
		else if( is_object( element ) ) {
			if( is_empty_object( element ) ) return null;
		
			var type = "Object",
			len = 0,
			substr = "";
		
			if( toString.call( element ) === "[object Text]" || toString.call( element ).indexOf( "HTML" ) > -1 || toString.call( element ).indexOf( "DataTransfer" ) > -1 || toString.call( element ).indexOf( "XMLHttpRequest" ) > -1 || toString.call( element ).indexOf( "MouseEvent" ) ) {
				substr += "[" + toString.call( element ), len = 1;
				str += "//Type( " + type + " ), " + type + "( " + len + " )//:- " + substr.slice( 1 );
			}
			else {
				for( var name in element ) {
					len++;
					substr += ",&nbsp;" + name + ": " + reveal( element[ name ] );
				}
				str += "//Type( " + type + " ), " + type + "( " + len + " )//:- { " + substr.slice( 1 ) + " }";
			}
		} else return ( "Unsupported type!" );
	
		return ( str );
	};

	//The following function is used to do AJAX
	//on the server page type document;
	//	@since CJS 1.0.1

	/*****
	 * 
	 * @param {Object} object
	 * @returns {window || this} 
	*****/

	var AJAX = function( object ) {
		var OBJ = set_default( {
			type: "GET",
			url: null,
			async: true,
			success: null
		}, object);
	
		if( window.XMLHttpRequest )				//For default browsers
			var xmlhttp = new XMLHttpRequest();		//Making this to an object to use the class as an AJAX
		else							//For IE9 or less;
			var xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
	
		xmlhttp.onreadystatechange = function() {
			if( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
				var nObject = set_default( {
					rtext: null,
					rtype: null,
					xml: null,
					status: 404,
					rstate: xmlhttp.readyState,
					perseJSON: function() {
						return ( JSON.perse( rtext ) );
					}
				}, copy_objects( {}, {
					retext: xmlhttp.responseText,
					rtype: xmlhttp.responseType,
					xml: xmlhttp.responseXML,
					status: xmlhttp.status,
					rstate: xmlhttp.readyState,
					perseJSON: function() {
						return ( JSON.parse( this.rtext ) );
					}
				} ) );
			
				OBJ[ "success" ].call( nObject );
			}
		};
		xmlhttp.open( OBJ[ "type" ], OBJ[ "url" ], OBJ[ "async" ] );
		xmlhttp.send();
	
		return ( this );
	};

	//The post function;
	//Just for advantages;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Object} object
	 * @returns {window || this}  
	*****/

	var POST = function( object ) {
		object = copy_objects( object, {
			type: "POST"
		} );
	
		return ( this );
	};

	//The following method is for GET;
	//Same as the past method;

	//Note:- New in CJS 1.5.1;

	/*****
	 * 
	 * @param {Object} object
	 * @returns {window || this}  
	*****/

	var GET = function( object ) {
		AJAX( object );
	
		return ( this );
	};

	

	//Exposing the methods or variable globaly;

	window.chirpserJS = chirpserJS;
	window.CJS = window.C = window.$$ = CJS;
	window.CJSPlugin = CJSPlugin;
	window.type = type;
	window.is_null = is_null;
	window.is_function = is_function;
	window.is_object = is_object;
	window.is_string = is_string;
	window.is_number = is_number;
	window.is_boolean = is_boolean;
	window.is_undefined = is_undefined;
	window.is_array = is_array;
	window.is_empty_array = is_empty_array;
	window.is_empty_string = is_empty_string;
	window.is_empty_object = is_empty_object;
	window.is_plain_object = is_plain_object;
	window.copy_objects = copy_objects;
	window.set_default = set_default;
	window.HEADScript = HEADScript;
	window.array_range = array_range;
	window.reveal = reveal;
	window.AJAX = AJAX;
	window.POST = POST;
	window.GET = GET;

	return ( CJS );
} );