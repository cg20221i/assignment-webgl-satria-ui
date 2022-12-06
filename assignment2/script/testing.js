function main() {
	// Access the canvas through DOM: Document Object Model
	var canvas = document.getElementById('myCanvas');   // The paper
	var gl = canvas.getContext('webgl');                // The brush and the paints

	var vertexShaderSource = `
		attribute vec3 aPosition;
		attribute vec3 aColor;
		attribute vec3 aNormal;
		varying vec3 vPosition;
		varying vec3 vColor;
		varying vec3 vNormal;
		uniform mat4 uModel;
		uniform mat4 uView;
		uniform mat4 uProjection;
		void main() {
			vec4 originalPosition = vec4(aPosition, 1.);
			gl_Position = uProjection * uView * uModel * originalPosition;
			vPosition = (uModel * originalPosition).xyz;
			vColor = aColor;
			vNormal = aNormal;
		}
	`;

	var fragmentShaderSourceL = `
		precision mediump float;
		varying vec3 vPosition;
		varying vec3 vColor;
		varying vec3 vNormal;
		uniform vec3 uAmbientConstant;   // Represents the light color
		uniform float uAmbientIntensity;
		uniform vec3 uDiffuseConstant;  // Represents the light color
		uniform vec3 uLightPosition;
		uniform mat3 uNormalModel;
		uniform vec3 uSpecularConstant; // Represents the light color
		uniform vec3 uViewerPosition;
		void main() {
			
			// Calculate the ambient component
			vec3 ambient = uAmbientConstant * uAmbientIntensity;
			
			// Prepare the diffuse components
			vec3 normalizedNormal = normalize(uNormalModel * vNormal);
			vec3 vLight = uLightPosition - vPosition;
			vec3 normalizedLight = normalize(vLight);
			vec3 diffuse = vec3(0., 0., 0.);
			float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

			// Prepare the specular components
			vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
			// or using the following expression
			// vec3 vReflector = reflect(-vLight, vNormal);
			vec3 vViewer = uViewerPosition - vPosition;
			vec3 normalizedViewer = normalize(vViewer);
			vec3 normalizedReflector = normalize(vReflector);
			float shininessConstant = 100.0;
			vec3 specular = vec3(0., 0., 0.);
			float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
			
			// Calculate the phong reflection effect
			if (cosTheta > 0.) {
				diffuse = uDiffuseConstant * cosTheta;
			}
			if (cosPhi > 0.) {
				specular = uSpecularConstant * pow(cosPhi, shininessConstant);
			}
			vec3 phong = ambient + diffuse + specular;

			// Apply the shading
			gl_FragColor = vec4(phong * vColor, 1.);
			gl_FragColor.w = 0.5; //transparency
		}
	`;


	var fragmentShaderSourceR = `
		precision mediump float;
		varying vec3 vPosition;
		varying vec3 vColor;
		varying vec3 vNormal;
		uniform vec3 uAmbientConstant;   // Represents the light color
		uniform float uAmbientIntensity;
		uniform vec3 uDiffuseConstant;  // Represents the light color
		uniform vec3 uLightPosition;
		uniform mat3 uNormalModel;
		uniform vec3 uSpecularConstant; // Represents the light color
		uniform vec3 uViewerPosition;
		void main() {
			// Calculate the ambient component
			vec3 ambient = uAmbientConstant * uAmbientIntensity;
			
			// Prepare the diffuse components
			vec3 normalizedNormal = normalize(uNormalModel * vNormal);
			vec3 vLight = uLightPosition - vPosition;
			vec3 normalizedLight = normalize(vLight);
			vec3 diffuse = vec3(0., 0., 0.);
			float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);

			// Prepare the specular components
			vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
			// or using the following expression
			// vec3 vReflector = reflect(-vLight, vNormal);
			vec3 vViewer = uViewerPosition - vPosition;
			vec3 normalizedViewer = normalize(vViewer);
			vec3 normalizedReflector = normalize(vReflector);
			float shininessConstant = 100.0;
			vec3 specular = vec3(0., 0., 0.);
			float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
			
			// Calculate the phong reflection effect
			if (cosTheta > 0.) {
				diffuse = uDiffuseConstant * cosTheta;
			}
			if (cosPhi > 0.) {
				specular = uSpecularConstant * pow(cosPhi, shininessConstant);
			}
			vec3 phong = ambient + diffuse + specular;

			// Apply the shading
			gl_FragColor = vec4(phong * vColor, 1.);	
		}
	`;

	var fragmentShaderSourcePlane = `
	precision mediump float;
	varying vec3 vPosition;
	varying vec3 vColor;
	varying vec3 vNormal;
	uniform vec3 uAmbientConstant;   // Represents the light color
	uniform float uAmbientIntensity;
	uniform vec3 uDiffuseConstant;  // Represents the light color
	uniform vec3 uLightPosition;
	uniform mat3 uNormalModel;
	uniform vec3 uSpecularConstant; // Represents the light color
	uniform vec3 uViewerPosition;
	void main() {
		
		// Calculate the ambient component
		vec3 ambient = uAmbientConstant * uAmbientIntensity;
		
		// Prepare the diffuse components
		vec3 normalizedNormal = normalize(uNormalModel * vNormal);
		vec3 vLight = uLightPosition - vPosition;
		vec3 normalizedLight = normalize(vLight);
		vec3 diffuse = vec3(0., 0., 0.);
		float cosTheta = max(dot(normalizedNormal, normalizedLight), 0.);
		// Prepare the specular components
		vec3 vReflector = 2.0 * cosTheta * vNormal - (vLight);
		// or using the following expression
		// vec3 vReflector = reflect(-vLight, vNormal);
		vec3 vViewer = uViewerPosition - vPosition;
		vec3 normalizedViewer = normalize(vViewer);
		vec3 normalizedReflector = normalize(vReflector);
		float shininessConstant = 100.0;
		vec3 specular = vec3(0., 0., 0.);
		float cosPhi = max(dot(normalizedViewer, normalizedReflector), 0.);
		
		// Calculate the phong reflection effect
		if (cosTheta > 0.) {
			diffuse = uDiffuseConstant * cosTheta;
		}
		if (cosPhi > 0.) {
			specular = uSpecularConstant * pow(cosPhi, shininessConstant);
		}
		vec3 phong = ambient + diffuse + specular;
		// Apply the shading
		gl_FragColor = vec4(phong * vColor, 1.);
		// gl_FragColor.w = 0.5; //transparency
	}
	`;

	// copying the first obj
	var vertices_left = new Float32Array(vertices);

	// rotating left object y-axis +x -> +z ; -x -> -z ; -z -> x+ ; +z -> x-
	const X_INDEX = 0;
	const Z_INDEX = 2;
	const X_INDEX_SURFACE = 6;
	const Z_INDEX_SURFACE = 8;
	for (var it = 0; it < vertices_left.length; it += 9) {
		var x_it = vertices_left[it + X_INDEX];
		var z_it = vertices_left[it + Z_INDEX];
		var x_surface = vertices_left[it + X_INDEX_SURFACE];
		var z_surface = vertices_left[it + Z_INDEX_SURFACE];
		
		vertices_left[ it + X_INDEX ] = -z_it;
		vertices_left[ it + Z_INDEX ] = x_it;

		vertices_left[ it + X_INDEX_SURFACE ] = -z_surface;
		vertices_left[ it + Z_INDEX_SURFACE ] = x_surface;
	}

	// translating 
	for (var it = 0; it < vertices.length; it += 9) {
		vertices[it] = vertices[it] + 1.5; // move to right
	}

	// translating 
	for (var it = 0; it < vertices_left.length; it += 9) {
		vertices_left[it] = vertices_left[it] - 1.0; // move to left
	}

	var indices_left = new Uint16Array(indices);

	// create new box of light
	var box_center = [0.0, 0.0, 0.0];
	var box = [
		// cube light
		-0.1,  0.1, 0.1, ...white, ...zn, //0
		0.1,  0.1, 0.1, ...white, ...zn, //1
		0.1, -0.1, 0.1, ...white, ...zn, //2
		-0.1, -0.1, 0.1, ...white, ...zn, //3

		-0.1,  0.1, -0.1, ...white, ...zp, //4
		0.1,  0.1, -0.1, ...white, ...zp, //5
		0.1, -0.1, -0.1, ...white, ...zp, //6
		-0.1, -0.1, -0.1, ...white, ...zp, //7
  
		0.1,  0.1, 0.1, ...white, ...xn, //8
		0.1, -0.1, 0.1, ...white, ...xn, //9
		0.1, -0.1, -0.1, ...white, ...xn, //11
		0.1,  0.1, -0.1, ...white, ...xn, //10
		
		-0.1,  0.1, 0.1, ...white, ...xp, //12
		-0.1,  0.1, -0.1, ...white, ...xp, //13
		-0.1, -0.1, -0.1, ...white, ...xp, //14
		-0.1, -0.1, 0.1, ...white, ...xp, //15
		
		-0.1,  0.1, 0.1, ...white, ...yn, //16
		0.1,  0.1, 0.1, ...white, ...yn, //17
		0.1,  0.1, -0.1, ...white, ...yn, //18
		-0.1,  0.1, -0.1, ...white, ...yn, //19
		
		-0.1, -0.1, 0.1, ...white, ...yp, //20
		0.1, -0.1, 0.1, ...white, ...yp, //21
		0.1, -0.1, -0.1, ...white, ...yp, //22
		-0.1, -0.1, -0.1, ...white, ...yp, //23
	];
	
	for (var it = 0; it < box.length; it += 9) {
		box[it + 0] += box_center[0];
		box[it + 1] += box_center[1];
		box[it + 2] += box_center[2];
	}

	var cube_box = 24 * 4;
	var box_index = [
		// cube light
		0 + cube_box, 1 + cube_box, 2 + cube_box,     0 + cube_box, 2 + cube_box, 3 + cube_box,     // Face A
		4 + cube_box, 5 + cube_box, 6 + cube_box,     4 + cube_box, 6 + cube_box, 7 + cube_box,     // Face B
		8 + cube_box, 9 + cube_box, 10 + cube_box,    8 + cube_box, 10 + cube_box, 11 + cube_box,   // Face C
		12 + cube_box, 13 + cube_box, 14 + cube_box,  12 + cube_box, 14 + cube_box, 15 + cube_box,  // Face D
		16 + cube_box, 17 + cube_box, 18 + cube_box,  16 + cube_box, 18 + cube_box, 19 + cube_box,  // Face E
		20 + cube_box, 21 + cube_box, 22 + cube_box,  20 + cube_box, 22 + cube_box, 23 + cube_box,  // Face F 
	];

	vertices.push(...box);
	indices.push(...box_index);



	// shader init section
	// Create .c in GPU
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderSource);
	var fragmentShaderL = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShaderL, fragmentShaderSourceL);
	var fragmentShaderR = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShaderR, fragmentShaderSourceR);
	var fragmentShaderPlane = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShaderPlane, fragmentShaderSourcePlane);


	// Compile .c into .o
	gl.compileShader(vertexShader);
	gl.compileShader(fragmentShaderL);
	gl.compileShader(fragmentShaderR);
	gl.compileShader(fragmentShaderPlane);

	// Prepare a .exe shell (shader program)
	var shaderProgramL = gl.createProgram();
	var shaderProgramR = gl.createProgram();
	var shaderProgramPlane = gl.createProgram();

	// Put the two .o files into the shell
	gl.attachShader(shaderProgramL, vertexShader);
	gl.attachShader(shaderProgramL, fragmentShaderL);
	gl.attachShader(shaderProgramR, vertexShader);
	gl.attachShader(shaderProgramR, fragmentShaderR);
	gl.attachShader(shaderProgramPlane, vertexShader);
	gl.attachShader(shaderProgramPlane, fragmentShaderPlane);

	// Link the two .o files, so together they can be a runnable program/context.
	gl.linkProgram(shaderProgramL);
	gl.linkProgram(shaderProgramR);
	gl.linkProgram(shaderProgramPlane);
	// end shader init section


	var cur_program = '';
	
	// cam init section 
	// Interactive keyboard
	var cameraX = 0.0;
	var cameraY = 1.0;
	var cameraZ = 5.0;

	var uLightPosition = gl.getUniformLocation(shaderProgramL, "uLightPosition");
	var uLightPositionR = gl.getUniformLocation(shaderProgramR, "uLightPosition");

	gl.useProgram(shaderProgramL);
	var uView = gl.getUniformLocation(shaderProgramL, "uView");
	var viewMatrix = glMatrix.mat4.create();
	glMatrix.mat4.lookAt(
			viewMatrix,
			[cameraX, cameraY, cameraZ],    // the location of the eye or the camera
			[cameraX, 0.0, -10],        // the point where the camera look at
			[0.0, 1.0, 0.0]
	);
	gl.uniformMatrix4fv(uView, false, viewMatrix);

	gl.useProgram(shaderProgramR);
	var uViewR = gl.getUniformLocation(shaderProgramR, "uView");
	gl.uniformMatrix4fv(uViewR, false, viewMatrix);
	var viewMatrixR = glMatrix.mat4.create();
	glMatrix.mat4.lookAt(
			viewMatrixR,
			[cameraX, cameraY, cameraZ],    // the location of the eye or the camera
			[cameraX, 0.0, -10],        // the point where the camera look at
			[0.0, 1.0, 0.0]
	);
	gl.uniformMatrix4fv(uViewR, false, viewMatrixR);

	gl.useProgram(shaderProgramPlane);
	var uViewPlane = gl.getUniformLocation(shaderProgramPlane, "uView");
	var viewMatrixPlane = glMatrix.mat4.create();
	glMatrix.mat4.lookAt(
			viewMatrixPlane,
			[cameraX, cameraY, cameraZ],    // the location of the eye or the camera
			[cameraX, 0.0, -10],        // the point where the camera look at
			[0.0, 1.0, 0.0]
	);
	gl.uniformMatrix4fv(uViewPlane, false, viewMatrixPlane);
	// end cam init section 
	
	var changeX = 0;
	var changeY = 0;


	function renderCurrent(currShader, currVertices, currIndices, option){
		// Start using the context (analogy: start using the paints and the brushes)
		gl.useProgram(currShader);
		cur_program = option ;
		if (option == 'l') gl.uniformMatrix4fv(uView, false, viewMatrix);
		if (option == 'r') gl.uniformMatrix4fv(uViewR, false, viewMatrixR);
		if (option == 'plane') gl.uniformMatrix4fv(uViewPlane, false, viewMatrixPlane);
				
		// Create a linked-list for storing the vertices data
		var vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(currVertices), gl.STATIC_DRAW);

		// Create a linked-list for storing the indices data
		var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(currIndices), gl.STATIC_DRAW);


		// Teach the computer how to collect
		//  the positional values from ARRAY_BUFFER
		//  to each vertex being processed
		var aPosition = gl.getAttribLocation(currShader, "aPosition");
		gl.vertexAttribPointer(
				aPosition, 
				3, 
				gl.FLOAT, 
				false, 
				9 * Float32Array.BYTES_PER_ELEMENT, 
				0
		);
		gl.enableVertexAttribArray(aPosition);
		var aColor = gl.getAttribLocation(currShader, "aColor");
		gl.vertexAttribPointer(
				aColor,
				3,
				gl.FLOAT,
				false, 
				9 * Float32Array.BYTES_PER_ELEMENT,
				3 * Float32Array.BYTES_PER_ELEMENT
		);
		gl.enableVertexAttribArray(aColor);
		var aNormal = gl.getAttribLocation(currShader, "aNormal");
		gl.vertexAttribPointer(
				aNormal,
				3,
				gl.FLOAT,
				false, 
				9 * Float32Array.BYTES_PER_ELEMENT,
				6 * Float32Array.BYTES_PER_ELEMENT
		);
		gl.enableVertexAttribArray(aNormal);

		// Lighting and Shading
		// AMBIENT
		var uAmbientConstant = gl.getUniformLocation(currShader, "uAmbientConstant");
		var uAmbientIntensity = gl.getUniformLocation(currShader, "uAmbientIntensity");
		// gl.uniform3fv(uAmbientConstant, [1.0, 0.5, 0.0]);    // orange light
		gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);       // white light
		gl.uniform1f(uAmbientIntensity, 0.249); // 24.9% of light
		// DIFFUSE
		var uDiffuseConstant = gl.getUniformLocation(currShader, "uDiffuseConstant");
		
		var uNormalModel = gl.getUniformLocation(currShader, "uNormalModel");
		gl.uniform3fv(uDiffuseConstant, [1.0, 1.0, 1.0]);   // white light

		// Perspective projection
		var uProjection = gl.getUniformLocation(currShader, "uProjection");
		var perspectiveMatrix = glMatrix.mat4.create();
		glMatrix.mat4.perspective(perspectiveMatrix, Math.PI/3, 1.0, 0.5, 10.0);
		gl.uniformMatrix4fv(uProjection, false, perspectiveMatrix);
		
		// SPECULAR
		var uSpecularConstant = gl.getUniformLocation(currShader, "uSpecularConstant");
		var uViewerPosition = gl.getUniformLocation(currShader, "uViewerPosition");
		gl.uniform3fv(uSpecularConstant, [1.0, 1.0, 1.0]);  // white light
		gl.uniform3fv(uViewerPosition, [cameraX, cameraY, cameraZ]);
		var uModel = gl.getUniformLocation(currShader, "uModel");

		var modelMatrix = glMatrix.mat4.create();
		gl.uniformMatrix4fv(uModel, false, modelMatrix);
		var normalModelMatrix = glMatrix.mat3.create();
		glMatrix.mat3.normalFromMat4(normalModelMatrix, modelMatrix);
		gl.uniformMatrix3fv(uNormalModel, false, normalModelMatrix);

		gl.enable(gl.DEPTH_TEST);
		//transparency func
		// right
		if (option == 'r') { 
			gl.depthFunc(gl.LESS);
			gl.depthMask(true);
			gl.disable(gl.BLEND);
			gl.blendFunc(gl.ONE, gl.ONE);
		} 

		// left
		else {
			gl.enable(gl.DEPTH_TEST);
			gl.depthFunc(gl.LEQUAL)
			gl.depthMask(false);
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		}

		var primitive = gl.TRIANGLES;
		var offset = 0;
		var nVertex = currIndices.length;
		// gl.drawArrays(primitive, offset, nVertex);
		gl.drawElements(primitive, nVertex, gl.UNSIGNED_SHORT, offset);
		cur_program = '';
	}

	function render() {
		gl.clearColor(0., 0., 0., 1.); // black canvas
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		// renderLeft();
		renderCurrent(shaderProgramPlane, plane, indices_place, 'plane');
		renderCurrent(shaderProgramL, vertices_left, indices_left, 'l');
		renderCurrent(shaderProgramR, vertices, indices, 'r');
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
window.onload = main;