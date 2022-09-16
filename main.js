var canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 500;
document.body.appendChild(canvas);

var gl = canvas.getContext("webgl");

/**
 * A (  0.5,  0.5)
 * B (  0.0,  0.0)
 * C ( -0.5,  0.5)
 * D (  0.0,  1.0)
 */

var vertices = [
    // number 0 outer
    -0.7, 0.3, //start
    -0.7, -0.2, //end
    -0.6, -0.3,
    -0.5, -0.3,
    -0.4, -0.2,
    -0.4, 0.3,
    -0.5, 0.4,
    -0.6, 0.4, //8

    //number 0 inner
    -0.6, 0.25,
    -0.6, -0.15,
    -0.5, -0.15,
    -0.5, 0.25, //11

    //number 0 trangles
    -0.7, 0.3,
    -0.6,0.25,
    -0.6,0.4, 
    -0.7, -0.2, //start
    // -0.7, -0.2, //end
    // -0.6, -0.3,
    // -0.5, -0.3,
    // -0.4, -0.2,
    // -0.4, 0.3,
    // -0.5, 0.4,
    // -0.6, 0.4,
    // -0.6, 0.25,
    // -0.6, -0.15,
    // -0.5, -0.15,
    // -0.5, 0.25,

    //number 1
    -0.2, 0.25, //16
    -0.05, 0.4,
    0.055, 0.4,
    0.055, -0.15,
    0.17, -0.15,
    0.17, -0.3,
    -0.165, -0.3,
    -0.165, -0.15,
    -0.05, -0.15,
    -0.05, 0.24,
    -0.15, 0.13,

    //character I
    0.35, -0.3,
    0.45, -0.3,
    0.45, 0.3,
    0.35,0.2,
    0.4,0.0,
    //bulet di karakter I
    0.4, 0.35,
    0.37, 0.4,
    0.43, 0.4,
    0.4, 0.45,

    //character A outer
    0.55,-0.3,
    0.63,-0.3,
    0.69, -0.05,
    0.74, -0.05,
    0.8, -0.3,
    0.88, -0.3,
    0.8, 0.3,
    0.64, 0.3,

    //character A inner
    0.69,0.05,
    0.74,0.05,
    0.73,0.15,
    0.7,0.15,
];

// Create a linked-list for storing the vertices data in the GPU realm
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// VERTEX SHADER
var vertexShaderCode = `
    attribute vec2 aPosition;
    void main () {
        gl_PointSize = 3.0;
        gl_Position = vec4(aPosition, 0.0, 1.0);
        // gl_Position is the final destination for storing
        //  positional data for the rendered vertex
    }
`;
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderCode);
gl.compileShader(vertexShader);

// FRAGMENT SHADER
var fragmentShaderCode = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        // Blue = R:0, G:0, B:1, A:1
        // gl_FragColor is the final destination for storing
        //  color data for the rendered fragment
    }
`;
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderCode);
gl.compileShader(fragmentShader);

// Comparing to C-Programming, we may imagine
//  that up to this step we have created two
//  object files (.o), for the vertex and fragment shaders

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Teach the GPU how to collect
//  the positional values from ARRAY_BUFFER
//  for each vertex being processed
var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

gl.clearColor(1.0, 0.75,   0.79,  1.0);
            //Red, Green, Blue, Alpha
gl.clear(gl.COLOR_BUFFER_BIT);

//draw 0 
gl.drawArrays(gl.LINE_LOOP, 0,8);
gl.drawArrays(gl.LINE_LOOP, 8,4);
// gl.drawArrays(gl.POINTS, 12,4);
//draw 1
gl.drawArrays(gl.LINE_LOOP, 16, 11);

//draw I
gl.drawArrays(gl.TRIANGLE_FAN, 27,5);
gl.drawArrays(gl.TRIANGLE_STRIP, 32, 4);
//draw A
gl.drawArrays(gl.LINE_LOOP, 36, 8);
gl.drawArrays(gl.LINE_LOOP, 44, 4);

