"use strict";

function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.querySelector("#canvas2");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // program GLSL diset up (attach shader, link program, dsb) dengan utility dari webglfundamentals
  var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-3d", "fragment-shader-3d"]);

  // Mengambil atribut positionLocation dari vertex shader
  // Mengambil atribut colorLocation dari fragment shader
  var positionLocation = gl.getAttribLocation(program, "a_position");
  var colorLocation = gl.getAttribLocation(program, "a_color");

  // Mengambil uniforms (dalam hal ini matrix)
  // Matrix akan digunakan untuk proses transformasi (translasi, rotasi, dsv)
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Membuat buffer untuk menaruh atribut posisi (diberi nama positionBuffer)
  var positionBuffer = gl.createBuffer();
  // Bind position buffer dengan array buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Fungsi setGeometry memberikan definisi posisi pada position buffer
  setGeometry(gl);

  // Membuat buffe untuk menaruh atribut warna
  var colorBuffer = gl.createBuffer();
  // Bind attribut warna
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // Fungsi setColors memberikan definisi warna
  // sesuai dengan jumlah persegi penyusun objek
  setColors(gl);


  function degToRad(d) {
    return d * Math.PI / 180;
  }

  var translation = [120, 180, 0];
  var rotation = [degToRad(0), degToRad(335), degToRad(0)];
  var scale = [1, 1, 1];

  requestAnimationFrame(drawScene);

  // drawScene();

  // User interface library yang disediakan oleh webgl
  // webglLessonsUI.setupSlider("#angleY", {value: radToDeg(rotation[1]), slide: updateRotation(1), max: 360});


  // FUNGSI-FUNGSI TRANSFORMASI
  var initialAngle = 335;//value ngikutin rotation y
  document.addEventListener('keydown', (e) => {
    e = e || window.event;
    if (e.key === 'ArrowLeft') {
      console.log('left');
      var angleInDegrees = initialAngle;
      var angleInRadians = angleInDegrees * Math.PI / 180;
      rotation[1] = angleInRadians;

      drawScene();
      initialAngle+=5;
    } else if (e.key === 'ArrowRight') {
      console.log('right');
      var angleInDegrees = initialAngle;
      var angleInRadians = angleInDegrees * Math.PI / 180;
      rotation[1] = angleInRadians;

      drawScene();
      initialAngle-=5;
    }
    })

  // Fungsi rendering.
  function drawScene(now) {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Konversi clip space menjadi pixel
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Mengaktifkan culling, maka segitiga backfacing akan dinonaktifkan.
    // Hanya ada segita front face
    gl.enable(gl.CULL_FACE);

    // Depth buffer berfungsi agar bagian persegi depan tampak di depan (tidak tertutupi)
    gl.enable(gl.DEPTH_TEST);

    // Gunakan program yang sudah didefinisikan di awal (2 shaders)
    gl.useProgram(program);

    // Aktifkan atribut posisi
    gl.enableVertexAttribArray(positionLocation);

    // Bind posisi buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Mengambil data dari position buffer
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // 32 bit data
    var normalize = false; // tidak di-normalize
    var stride = 0;        // jumlah lompatan dalam iterasi
    var offset = 0;        // dimulai di awal buffer (index 0)
    gl.vertexAttribPointer(
        positionLocation, size, type, normalize, stride, offset);

    // Aktifkan atribut warna
    gl.enableVertexAttribArray(colorLocation);

    // Bind colorBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Mengambil data dari color buffer
    var size = 3;                 // 3 components per iteration
    var type = gl.UNSIGNED_BYTE;  // the data is 8bit unsigned values
    var normalize = true;         // normalize the data (convert from 0-255 to 0-1)
    var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;               // start at the beginning of the buffer
    gl.vertexAttribPointer(
        colorLocation, size, type, normalize, stride, offset);

    // Menghitung nilai matrix untuk proses transformasi
    var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = m4.xRotate(matrix, rotation[0]);
    matrix = m4.yRotate(matrix, rotation[1]);
    matrix = m4.zRotate(matrix, rotation[2]);
    matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

    // Set matrix location pada vertex shader dengan matrix yang sudah
    // dihitung sehingga objek dapat bertransformasi.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Menggambar objek
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18 * 6; // jumlah vertices
    gl.drawArrays(primitiveType, offset, count);
  }
}

var m4 = {

  projection: function(width, height, depth) {
    // fungsi projection
    return [
       2 / width, 0, 0, 0,
       0, -2 / height, 0, 0,
       0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ];
  },
  // fungsi perkalian
  multiply: function(a, b) {
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },

  translation: function(tx, ty, tz) {
    return [
       1,  0,  0,  0,
       0,  1,  0,  0,
       0,  0,  1,  0,
       tx, ty, tz, 1,
    ];
  },

  xRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ];
  },

  yRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ];
  },

  zRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
       c, s, 0, 0,
      -s, c, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1,
    ];
  },

  scaling: function(sx, sy, sz) {
    return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1,
    ];
  },

  translate: function(m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  xRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.xRotation(angleInRadians));
  },

  yRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },

  zRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },

  scale: function(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },

};

// Isi buffer dengan posisi titik (vertices) yang nantinya 
// akan digunakan untuk membangun huruf 'I' tiga dimensi
function setGeometry(gl) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
          // bangun atas depan
          0, 0, 0,
          0, 30, 0,
          100, 0, 0,
          100, 0, 0,
          0, 30, 0,
          100, 30, 0,

          // tengah vertikal depan
          35, 30, 0,
          35, 130, 0,
          65, 30, 0,
          65, 30, 0,
          35, 130, 0,
          65, 130, 0,

          // bawah depan
          0, 130, 0,
          0, 160, 0,
          100, 130, 0,
          100, 130, 0,
          0, 160, 0,
          100, 160, 0,

          // atas belakang (fix)
          0, 0, 30,
          100, 0, 30,
          0, 30, 30,
          0, 30, 30,
          100, 0, 30,
          100, 30, 30,

          // tengah vertikal belakang
          35, 30, 30,
          65, 30, 30,
          35, 130, 30,
          35, 130, 30,
          65, 30, 30,
          65, 130, 30,

          // bawah belakang
          0, 130, 30,
          100, 130, 30,
          0, 160, 30,
          0, 160, 30,
          100, 130, 30,
          100, 160, 30,

          // atas atap
            0,   0,   0,
          100,   0,   0,
            0,   0,  30,
            0,   0,  30,
          100,   0,   0,
          100,   0,  30,

          // atap kanan atas (fix)
          100,   0,   0,
          100,  30,   0,
          100,  0,   30,
          100,   0,  30,
          100,  30,   0,
          100,  30,  30,

          // bawah kanan atas (fix)
          65,   30,   0,
          65,   30,  30,
          100,  30,  0,
          100,  30,   0,
          65,   30,  30,
          100,  30,  30,

          // sisi tengah kanan (fix)
          65,   30,   0,
          65,  130,   0,
          65,   30,  30,
          65,   30,  30,
          65,  130,   0,
          65,   130, 30,

          // bawah atap kanan
          65,   130,   0,
          100,  130,   0,
          65,   130,  30,
          65,   130,  30,
          100,  130,   0,
          100,  130,  30,

          // kanan bawah sisi (fix)
          100, 130,   0,
          100,  160,  0,
          100,  130,  30,
          100,  130,  30,
          100,  160,  0,
          100,   160,  30,

          // bawah alas (fix)
          0,   160,   0,
          0,  160,  30,
          100, 160,  0,
          100,  160,  0,
          0,  160,   30,
          100,  160,  30,

          // bawah kiri sisi (fix)
          0,   130,   0,
          0,   130,  30,
          0,  160,   0,
          0,  160,   0,
          0,   130,  30,
          0,  160,  30,

          // bawah kiri atap (fix)
          0,   130,   0,
          35,   130,  0,
          0,  130,   30,
          0,   130,  30,
          35,  130,   0,
          35,  130,  30,

          // tengah sisi kiri (fix)
          35,  30,  0,
          35,  30,  30,
          35,  130, 0,
          35, 130,  0,
          35,  30,  30,
          35, 130,  30,
        
          // atas bawah kiri (fix)
          0, 30, 0,
          0, 30, 30,
          35, 30, 0,
          35, 30, 0,
          0, 30, 30,
          35, 30,30,
          
          // atas sisi kiri (fix)
          0, 0, 0,
          0, 0, 30,
          0, 30, 0,
          0, 30, 0,
          0, 0, 30,
          0, 30, 30,
        ]),
      gl.STATIC_DRAW);
}
// Isi warna di setiap kotak (pada buffer) yang membentuk huruf 'I'
function setColors(gl) {
  gl.bufferData(
      gl.ARRAY_BUFFER,
      new Uint8Array([
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

          
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,
        80, 70, 200,

        
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,
        70, 200, 210,

        
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,
        200, 200, 70,

        
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,
        210, 100, 70,

        
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,
        210, 160, 70,

        
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,
        70, 180, 210,

         
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,
        100, 70, 210,

       
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,
        76, 210, 100,

       
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,

       
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

    
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,
    
        100, 150, 200,
        100, 150, 200,
        100, 150, 200,
        100, 150, 200,
        100, 150, 200,
        100, 150, 200,

        40, 100, 170,
        40, 100, 170,
        40, 100, 170,
        40, 100, 170,
        40, 100, 170,
        40, 100, 170,
    ]),
      gl.STATIC_DRAW);
}

main();
