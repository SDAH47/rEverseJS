
function main() {
	
	var vertex = `
		attribute vec3 position;
		attribute vec4 translation;
		uniform mat4 rotationMatrix;
		uniform mat4 scalingMatrix;
		
		void main() {
			gl_Position = rotationMatrix * vec4( scalingMatrix * (vec4(position, 1.0) + translation) );
			gl_PointSize = 1.0;
		}
	`;
	
	var fragment = `
		void main() {
			gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
		}
	`;
	
	var program = initProgram( vertex, fragment );
	glUseProgram( program );
	
	var position = glGetAttribLocation( program, "position" );
	
	if( position < 0 ) {
		alert( "The attribute 'position' not found." );
		return false;
	}
	
	var translation = glGetAttribLocation( program, "translation" );
	
	if( translation < 0 ) {
		alert( "The attribute 'position' not found." );
		return false;
	}
	
	var rotationMatrix = glGetUniformLocation( program, "rotationMatrix" );
	
	if( rotationMatrix < 0 ) {
		alert( "The attribute 'rotationMatrix' not found." );
		return false;
	}
	
	var scalingMatrix = glGetUniformLocation( program, "scalingMatrix" );
	
	if( scalingMatrix < 0 ) {
		alert( "The attribute 'scalingMatrix' not found." );
		return false;
	}
	
	var rad = radian( 90 ),
	    cos = Math.cos( rad ),
	    sin = Math.sin( rad );
	
	var buffer = initiateVertexBuffer( new Float32Array( [ 0.0, 0.5, -0.5, -0.5, 0.5, -0.5 ] ) );
	     rMatrix = new Float32Array( [ 
			cos, sin, 0.0, 0.0,
			-sin, cos, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
	    ] ),
		sMatrix = new Float32Array( [ 
			2.0, 0.0, 0.0, 0.0,
			0.0, 2.0, 0.0, 0.0,
			0.0, 0.0, 2.0, 0.0,
			0.0, 0.0, 0.0, 1.0
	    ] );
	
	glUniformMatrix4fv( rotationMatrix, false, rMatrix );
	glUniformMatrix4fv( scalingMatrix, false, sMatrix );
	
	glVertexAttribPointer( position, 2, GL_FLOAT, false, 0, 0 );
	
	glEnableVertexAttribArray( position );
	
	glClearColor( 0.0, 0.0, 0.0, 1 );
	glClear( GL_COLOR_BUFFER_BIT );
	
	glDrawArrays( GL_TRIANGLES, 0, 3 );
	
}

function initiateVertexBuffer( vertices ) {
	var buffer = glCreateBuffer();
	
	// bind the buffer.
	glBindBuffer( GL_ARRAY_BUFFER, buffer );
	
	// Pass the data;
	glBufferData( GL_ARRAY_BUFFER, vertices, GL_STATIC_DRAW );
	
	return buffer;
}

function initProgram( vertex, fragment ) {
	var shaderVertex;
	var shaderFragment;
	
	if( !( shaderVertex = loadShader( GL_VERTEX_SHADER, vertex ) ) || !( shaderFragment = loadShader( GL_FRAGMENT_SHADER, fragment) ) ) {
		alert( "Failed to create shader(s)." );
		return null;
	}
		
	var shaderProgram = glCreateProgram();
	glAttachShader( shaderProgram, shaderVertex );
	glAttachShader( shaderProgram, shaderFragment );
	glLinkProgram( shaderProgram );
	
	if( !glGetProgramParameter( shaderProgram, GL_LINK_STATUS ) ) {
		alert( "Failed to link a shader program." );
		return null;
	}
	
	return shaderProgram;
}

function loadShader( type, shader ) {
	var sh = glCreateShader( type );
	
	glShaderSource( sh, shader );
	
	glCompileShader( sh );
	
	if( !glGetShaderParameter( sh, GL_COMPILE_STATUS ) ) {
		alert( "Could not create " + ( type === GL_VERTEX_SHADER ? "vertex" : "fragment" ) + " shader! " + glGetShaderInfoLog( sh ) );
		return null;
	}
	
	return sh;
}

function performRotation( deg, size, array ) {
	size = size || 2;
	    
	var arr = [],
	      i = 0;
	
	for( ; i < array.length; i += size ) {
		if( size === 2 ) {
			var x = array[ i ] * Math.cos( radian( deg ) ) - array[ i + 1 ] * Math.sin( radian( deg ) ),
			    y = array[ i ] * Math.sin( radian( deg ) ) + array[ i + 1 ] * Math.cos( radian( deg ) );
			    
			arr.push( x, y );
		} else {
			
		}
	}
	
	return new Float32Array( arr );
}

function radian( deg ) {
	return deg * ( Math.PI / 180 );
}