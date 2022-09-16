var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 700;
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
    -0.7 -0.1, 0.3, //start
    -0.7 -0.1, -0.2, //end
    -0.6 -0.1, -0.3,
    -0.5 -0.1, -0.3,
    -0.4 -0.1, -0.2,
    -0.4 -0.1, 0.3,
    -0.5 -0.1, 0.4,
    -0.6 -0.1, 0.4, //8

    //number 0 inner
    -0.6 -0.1, 0.25  ,
    -0.6 -0.1, -0.15 ,
    -0.5 -0.1, -0.15 ,
    -0.5 -0.1, 0.25  , //11

    //number 1
    -0.2    -0.14, 0.25 , //16
    -0.05   -0.14, 0.4  ,
    0.055   -0.14, 0.4  ,
    0.055   -0.14, -0.15    ,
    0.17    -0.14, -0.15 ,
    0.17    -0.14, -0.3  ,
    -0.165  -0.14, -0.3    ,
    -0.165  -0.14, -0.15   ,
    -0.05   -0.14, -0.15    ,
    -0.05   -0.14, 0.24 ,
    -0.15   -0.14, 0.13 ,

    //character I
    0.35 - 0.13, -0.3      ,
    0.45 - 0.13, -0.3      ,
    0.45 - 0.13, 0.3       ,
    0.35 - 0.13,0.2        ,
    0.4  - 0.13,0.0    ,
    //bul- 0.13arakter I
    0.4  - 0.13, 0.35      ,
    0.37 - 0.13, 0.4       ,
    0.43 - 0.13, 0.4       ,
    0.4  - 0.13, 0.45      ,

    //character A outer left
    0.55                 -0.05,-0.3,
    0.63                 -0.05,-0.3,
    0.69                 -0.05, -0.05,
    0.64                 -0.05, 0.3,
    //character A outer r-0.05ight
    0.74                 -0.05, -0.05              ,
    0.8                  -0.05, -0.3               ,
    0.88                 -0.05, -0.3               ,
    0.8                  -0.05, 0.3                ,
    //character A inner-0.05
    0.69                 -0.05,0.05                ,
    0.74                 -0.05,0.05                ,
    0.73                 -0.05,0.15                ,
    0.7                  -0.05,0.15                ,
    0.69                 -0.05, -0.05              ,
    0.74                 -0.05, -0.05              ,
    0.74                 -0.05,0.05                ,
    0.69                 -0.05,0.05                ,
    0.64                 -0.05, 0.3                ,
    0.8                  -0.05, 0.3                ,
    0.73                 -0.05,0.15                ,
    0.7                  -0.05,0.15                ,
    0.69                 -0.05, -0.05              ,
    0.64                 -0.05, 0.3                ,
    0.7                  -0.05,0.15                ,
    0.69                 -0.05,0.05            ,
    0.74                 -0.05, -0.05              ,
    0.74                 -0.05, 0.05               ,
    0.8                  -0.05, 0.3                ,
    0.73                 -0.05,0.15                ,
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
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.4);
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

gl.clearColor(0.0, 0.0,   0.0,  0.8);
            //Red, Green, Blue, Alpha
gl.clear(gl.COLOR_BUFFER_BIT);

//draw 0 
gl.drawArrays(gl.LINE_LOOP, 0,8);
gl.drawArrays(gl.LINE_LOOP, 8,4);
// gl.drawArrays(gl.POINTS, 12,4);
//draw 1
gl.drawArrays(gl.LINE_LOOP, 12, 11);

//draw I
gl.drawArrays(gl.TRIANGLE_FAN, 23,5);
gl.drawArrays(gl.TRIANGLE_STRIP, 28, 4);
//draw A
gl.drawArrays(gl.TRIANGLE_FAN, 32, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 36, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 44, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 48, 4);
gl.drawArrays(gl.TRIANGLE_FAN, 52,4);
gl.drawArrays(gl.TRIANGLE_FAN, 56,4);


