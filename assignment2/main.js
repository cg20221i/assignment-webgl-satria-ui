var vertexShaderText =
`
precision mediump float;
attribute vec3 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
    fragColor = vertColor;
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
`

var fragmentShaderText =
`
precision mediump float;
varying vec3 fragColor;

void main()
{
  gl_FragColor = vec4(fragColor, 1.0);
}
`

var InitDemo = function () {
	console.log('Function Called');

    var canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    document.body.appendChild(canvas);

	// var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');

	if (!gl) {
		console.log('WebGL not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('Your browser does not support WebGL');
	}

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

	//
	// Create shaders
	//
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vertexShaderText);
	gl.shaderSource(fragmentShader, fragmentShaderText);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}

	//
	// Create buffer
	//
	var boxVertices =
	[ // X, Y, Z      R, G, B
		// Top
		-.5, 2.0, -.5,   0.5, 0.5, 0.5,
		-.5, 2.0, .5,    0.5, 0.5, 0.5,
		.5, 2.0, .5,     0.5, 0.5, 0.5,
		.5, 2.0, -.5,    0.5, 0.5, 0.5,

		// Left
		-.5, 2.0, .5,    0.75, 0.25, 0.5,
		-.5, -2.0, .5,   0.75, 0.25, 0.5,
		-.5, -2.0, -.5,  0.75, 0.25, 0.5,
		-.5, 2.0, -.5,   0.75, 0.25, 0.5,

		// Right
		.5, 2.0, .5,    0.25, 0.25, 0.75,
		.5, -2.0, .5,   0.25, 0.25, 0.75,
		.5, -2.0, -.5,  0.25, 0.25, 0.75,
		.5, 2.0, -.5,   0.25, 0.25, 0.75,

		// Front
		.5, 2.0, .5,    1.0, 0.0, 0.15,
		.5, -2.0, .5,    1.0, 0.0, 0.15,
		-.5, -2.0, .5,    1.0, 0.0, 0.15,
		-.5, 2.0, .5,    1.0, 0.0, 0.15,

		// Back
		.5, 2.0, -.5,    0.0, 1.0, 0.15,
		.5, -2.0, -.5,    0.0, 1.0, 0.15,
		-.5, -2.0, -.5,    0.0, 1.0, 0.15,
		-.5, 2.0, -.5,    0.0, 1.0, 0.15,

		// Bottom
		-.5, -2.0, -.5,   0.5, 0.5, 1.0,
		-.5, -2.0, .5,    0.5, 0.5, 1.0,
		.5, -2.0, .5,     0.5, 0.5, 1.0,
		.5, -2.0, -.5,    0.5, 0.5, 1.0,
	];

    var boxIndices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];
	var sphereVertices =
	[ // X, Y, Z      R, G, B
		// Top
		1.5, 2.0, -.5,   0.5, 0.5, 0.5,
		1.5, 2.0, .5,    0.5, 0.5, 0.5,
		2.5, 2.0, .5,     0.5, 0.5, 0.5,
		2.5, 2.0, -.5,    0.5, 0.5, 0.5,

		// Left
		2.5, 2.0, .5,    0.75, 0.25, 0.5,
		2.5, -2.0, .5,   0.75, 0.25, 0.5,
		2.5, -2.0, -.5,  0.75, 0.25, 0.5,
		2.5, 2.0, -.5,   0.75, 0.25, 0.5,

		// Right
		1.5, 2.0, .5,    0.25, 0.25, 0.75,
		1.5, -2.0, .5,   0.25, 0.25, 0.75,
		1.5, -2.0, -.5,  0.25, 0.25, 0.75,
		1.5, 2.0, -.5,   0.25, 0.25, 0.75,

		// Front
		2.5, 2.0, .5,    1.0, 0.0, 0.15,
		2.5, -2.0, .5,    1.0, 0.0, 0.15,
		1.5, -2.0, .5,    1.0, 0.0, 0.15,
		1.5, 2.0, .5,    1.0, 0.0, 0.15,

		// Back
		1.5, 2.0, -.5,    0.0, 1.0, 0.15,
		1.5, -2.0, -.5,    0.0, 1.0, 0.15,
		2.5, -2.0, -.5,    0.0, 1.0, 0.15,
		2.5, 2.0, -.5,    0.0, 1.0, 0.15,

		// Bottom
		1.5, -2.0, -.5,   0.5, 0.5, 1.0,
		1.5, -2.0, .5,    0.5, 0.5, 1.0,
		2.5, -2.0, .5,     0.5, 0.5, 1.0,
		2.5, -2.0, -.5,    0.5, 0.5, 1.0,
	];

    var sphereIndices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];

	var VertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

    var IndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

    //world settings camera, etc.
    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    var projMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var worldMatrix = new Float32Array(16);
    glMatrix.mat4.identity(worldMatrix);
    glMatrix.mat4.lookAt(viewMatrix, [0,0,-7.5],[0,0,0],[0,1,0]);
    glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(75), canvas.width/canvas.height, 0.5, 50.0);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    var xRotation = new Float32Array(16);
    var yRotation = new Float32Array(16);
	//
	// Main render loop
	//
    var identityMatrix = new Float32Array(16);
    glMatrix.mat4.identity(identityMatrix);

    function render(){
        var angle = performance.now() / 1000 / 6 * 2 * Math.PI;
        //rotate by y axis
		// gl.drawElements(gl.LINES, sphereIndices.length, gl.UNSIGNED_SHORT, 0);


		document.addEventListener('keydown', (e) => {
			e = e || window.event;
			if (e.key === 'ArrowUp') {
				glMatrix.mat4.rotate(xRotation, identityMatrix, angle, [-1,0,0]);
			} else if (e.key === 'ArrowDown') {
				glMatrix.mat4.rotate(xRotation, identityMatrix, angle, [1,0,0]);
			} else if (e.key === 'ArrowLeft') {
				glMatrix.mat4.rotate(yRotation, identityMatrix, angle, [0,-1,0]);
			} else if (e.key === 'ArrowRight') {
				glMatrix.mat4.rotate(yRotation, identityMatrix, angle, [0,1,0]);
			}
		  })
		glMatrix.mat4.mul(worldMatrix, xRotation, yRotation);
		// glMatrix.mat4.rotate(worldMatrix, identityMatrix, angle, [0,1,0]);
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
        // gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0, offset=400);

		gl.drawElements(gl.TRIANGLES, sphereIndices.length , gl.UNSIGNED_SHORT, 0);
		// gl.drawElements(gl.TRIANGLES, sphereIndices.length , gl.UNSIGNED_SHORT, 0);


        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
};

