function main() {
    var canvas = document.getElementById('canvas3');
    var gl = canvas.getContext('webgl');

    const leaf_1 = {
        color_point_1: [0.0920, 0.920, 0.147],
        color_point_2: [0.0590, 0.590, 0.0944],
        point_c: [-0.6238, 0.68901],
        point_d: [-0.62216, 0.58426],
        point_e: [-0.56978, 0.61045],
        point_f: [-0.57306, 0.71357],
        point_n: [-0.43884, 0.635],
        point_o: [-0.4994, 0.60227],
        point_g: [-0.32263, 0.75776],
        point_p: [-0.4994, 0.23072],
        point_m: [-0.44048, 0.21762],
        point_l: [-0.57142, 0.20617],
        point_q: [-0.61725, 0.21762],
        point_r: [-0.61889, 0.11942],
        point_k: [-0.56651, 0.10796],
        point_h: [-0.32099, 0.2209],
        point_i: [-0.21133, 0.21926],
        point_j: [-0.20969, 0.12105],
    };

    const leaf_2 = {
        color_point_3: [0, 128, 128],
        color_point_4: [0, 0, 139], 
        point_v: [-0.71195, -0.15843],
        point_w: [-0.49445, -0.1868],
        point_z: [-0.51809, 0.03543],
        point_i1: [-0.71431, -0.73055],
        point_h1: [-0.49445, -0.70218],
        point_g1: [-0.51573, -0.92441],
        point_d1: [-0.15638, -0.69745],
        point_f1: [-0.13983, -0.91968],
        point_e1: [0.06585, -0.73055],
        point_c1: [0.05639, -0.16079],
        point_b1: [-0.15709, -0.18432],
        point_a1: [-0.13747, 0.04016],
        point_j1: [-0.45662, -0.22935],
        point_k1: [-0.19251, -0.2291],
        point_l1: [-0.1926, -0.65284],
        point_m1: [-0.45941, -0.65186],
    };

    const vertices = [
        //number 1
        //triangle cde
        ...leaf_1.point_c, ...leaf_1.color_point_2,
        ...leaf_1.point_d, ...leaf_1.color_point_2,
        ...leaf_1.point_e, ...leaf_1.color_point_2,

        //triangle cfe
        ...leaf_1.point_c, ...leaf_1.color_point_2,
        ...leaf_1.point_f, ...leaf_1.color_point_2,
        ...leaf_1.point_e, ...leaf_1.color_point_2,

        //triangle fng
        ...leaf_1.point_f, ...leaf_1.color_point_1,
        ...leaf_1.point_n, ...leaf_1.color_point_1,
        ...leaf_1.point_g, ...leaf_1.color_point_1,

        //triangle fen
        ...leaf_1.point_f, ...leaf_1.color_point_1,
        ...leaf_1.point_e, ...leaf_1.color_point_1,
        ...leaf_1.point_n, ...leaf_1.color_point_1,

        //triangle nmh
        ...leaf_1.point_n, ...leaf_1.color_point_1,
        ...leaf_1.point_m, ...leaf_1.color_point_1,
        ...leaf_1.point_h, ...leaf_1.color_point_1,

        //triangle gnh
        ...leaf_1.point_n, ...leaf_1.color_point_1,
        ...leaf_1.point_g, ...leaf_1.color_point_1,
        ...leaf_1.point_h, ...leaf_1.color_point_1,

        //triangle lij
        ...leaf_1.point_l, ...leaf_1.color_point_1,
        ...leaf_1.point_i, ...leaf_1.color_point_1,
        ...leaf_1.point_j, ...leaf_1.color_point_1,

        //triangle lkj
        ...leaf_1.point_l, ...leaf_1.color_point_1,
        ...leaf_1.point_k, ...leaf_1.color_point_1,
        ...leaf_1.point_j, ...leaf_1.color_point_1,

        //triangle qlr
        ...leaf_1.point_q, ...leaf_1.color_point_2,
        ...leaf_1.point_l, ...leaf_1.color_point_2,
        ...leaf_1.point_r, ...leaf_1.color_point_2,

        //triangle lrk
        ...leaf_1.point_k, ...leaf_1.color_point_2,
        ...leaf_1.point_l, ...leaf_1.color_point_2,
        ...leaf_1.point_r, ...leaf_1.color_point_2,

        //triangle qlm
        ...leaf_1.point_q, ...leaf_1.color_point_2,
        ...leaf_1.point_l, ...leaf_1.color_point_2,
        ...leaf_1.point_m, ...leaf_1.color_point_2,

        //triangle mqp
        ...leaf_1.point_q, ...leaf_1.color_point_2,
        ...leaf_1.point_p, ...leaf_1.color_point_2,
        ...leaf_1.point_m, ...leaf_1.color_point_2,

        //triangle pmn
        ...leaf_1.point_n, ...leaf_1.color_point_2,
        ...leaf_1.point_p, ...leaf_1.color_point_2,
        ...leaf_1.point_m, ...leaf_1.color_point_2,

        //triangle pon
        ...leaf_1.point_n, ...leaf_1.color_point_2,
        ...leaf_1.point_p, ...leaf_1.color_point_2,
        ...leaf_1.point_o, ...leaf_1.color_point_2,

        //triangle eon
        ...leaf_1.point_n, ...leaf_1.color_point_2,
        ...leaf_1.point_e, ...leaf_1.color_point_2,
        ...leaf_1.point_o, ...leaf_1.color_point_2,

        //triangle eon
        ...leaf_1.point_d, ...leaf_1.color_point_2,
        ...leaf_1.point_e, ...leaf_1.color_point_2,
        ...leaf_1.point_o, ...leaf_1.color_point_2,
        
        //number zero
        //triangle vwz
        ...leaf_2.point_v, ...leaf_2.color_point_3,
        ...leaf_2.point_w, ...leaf_2.color_point_3,
        ...leaf_2.point_z, ...leaf_2.color_point_3,

        //triangle vwi1
        ...leaf_2.point_v, ...leaf_2.color_point_3,
        ...leaf_2.point_w, ...leaf_2.color_point_3,
        ...leaf_2.point_i1, ...leaf_2.color_point_3,

        //triangle i1wh1
        ...leaf_2.point_i1, ...leaf_2.color_point_3,
        ...leaf_2.point_w, ...leaf_2.color_point_3,
        ...leaf_2.point_h1, ...leaf_2.color_point_3,

        //triangle i1g1h1
        ...leaf_2.point_i1, ...leaf_2.color_point_3,
        ...leaf_2.point_g1, ...leaf_2.color_point_3,
        ...leaf_2.point_h1, ...leaf_2.color_point_3,

        //triangle d1g1h1
        ...leaf_2.point_d1, ...leaf_2.color_point_3,
        ...leaf_2.point_g1, ...leaf_2.color_point_3,
        ...leaf_2.point_h1, ...leaf_2.color_point_3,

        //triangle d1g1h1
        ...leaf_2.point_d1, ...leaf_2.color_point_3,
        ...leaf_2.point_g1, ...leaf_2.color_point_3,
        ...leaf_2.point_f1, ...leaf_2.color_point_3,

        //triangle d1f1e1
        ...leaf_2.point_d1, ...leaf_2.color_point_3,
        ...leaf_2.point_e1, ...leaf_2.color_point_3,
        ...leaf_2.point_f1, ...leaf_2.color_point_3,

        //triangle d1c1e1
        ...leaf_2.point_d1, ...leaf_2.color_point_3,
        ...leaf_2.point_e1, ...leaf_2.color_point_3,
        ...leaf_2.point_c1, ...leaf_2.color_point_3,

        //triangle d1c1b1
        ...leaf_2.point_d1, ...leaf_2.color_point_3,
        ...leaf_2.point_b1, ...leaf_2.color_point_3,
        ...leaf_2.point_c1, ...leaf_2.color_point_3,

        //triangle a1c1b1
        ...leaf_2.point_a1, ...leaf_2.color_point_3,
        ...leaf_2.point_b1, ...leaf_2.color_point_3,
        ...leaf_2.point_c1, ...leaf_2.color_point_3,

        //triangle a1wb1
        ...leaf_2.point_a1, ...leaf_2.color_point_3,
        ...leaf_2.point_b1, ...leaf_2.color_point_3,
        ...leaf_2.point_w, ...leaf_2.color_point_3,

        //triangle a1wz
        ...leaf_2.point_a1, ...leaf_2.color_point_3,
        ...leaf_2.point_z, ...leaf_2.color_point_3,
        ...leaf_2.point_w, ...leaf_2.color_point_3,

        //triangle b1j1w
        ...leaf_2.point_b1, ...leaf_2.color_point_4,
        ...leaf_2.point_j1, ...leaf_2.color_point_4,
        ...leaf_2.point_w, ...leaf_2.color_point_4,

        //triangle b1j1k1
        ...leaf_2.point_b1, ...leaf_2.color_point_4,
        ...leaf_2.point_j1, ...leaf_2.color_point_4,
        ...leaf_2.point_k1, ...leaf_2.color_point_4,

        //triangle wj1m1
        ...leaf_2.point_w, ...leaf_2.color_point_4,
        ...leaf_2.point_j1, ...leaf_2.color_point_4,
        ...leaf_2.point_m1, ...leaf_2.color_point_4,

        //triangle wh1m1
        ...leaf_2.point_w, ...leaf_2.color_point_4,
        ...leaf_2.point_h1, ...leaf_2.color_point_4,
        ...leaf_2.point_m1, ...leaf_2.color_point_4,

        //triangle l1h1m1
        ...leaf_2.point_l1, ...leaf_2.color_point_4,
        ...leaf_2.point_h1, ...leaf_2.color_point_4,
        ...leaf_2.point_m1, ...leaf_2.color_point_4,

        //triangle l1h1d1
        ...leaf_2.point_l1, ...leaf_2.color_point_4,
        ...leaf_2.point_h1, ...leaf_2.color_point_4,
        ...leaf_2.point_d1, ...leaf_2.color_point_4,

        //triangle l1k1d1
        ...leaf_2.point_l1, ...leaf_2.color_point_4,
        ...leaf_2.point_k1, ...leaf_2.color_point_4,
        ...leaf_2.point_d1, ...leaf_2.color_point_4,

        //triangle b1k1d1
        ...leaf_2.point_b1, ...leaf_2.color_point_4,
        ...leaf_2.point_k1, ...leaf_2.color_point_4,
        ...leaf_2.point_d1, ...leaf_2.color_point_4,
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        // uniform vec2 uScale;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);


    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);


    var shaderProgram = gl.createProgram();


    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);


    gl.linkProgram(shaderProgram);


    gl.useProgram(shaderProgram);

    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    // Speed set to my NRP - 001
    var speed = 0.001;
    var change = 0;
    // var scale = 1;
    // var scaleSpeed = 0.1;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");
    // var uScale = gl.getUniformLocation(shaderProgram, 'uScale');

    function moveVertices() {
        if (change < -0.3 || change > 0.9) {
            speed = speed * -1;
        }

        for (let i = 240; i < vertices.length; i += 5) {
            vertices[i] = vertices[i] + speed;
        }
    }

    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        // gl.clearColor(0.00120, 0.0300, 0.00504, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 445;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render)
}
main();

