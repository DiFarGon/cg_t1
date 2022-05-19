/*global THREE, requestAnimationFrame, console*/

// grupo 23

var camera, scene, renderer;

var geometry, material, mesh;

var icosahedron, box, train, tube, sphere, donut, compositeBoxes, doubleCones;

var grandfather, father, son;

// variables for commands
var primaryRotationVelocity = 0, secondaryRotationVelocity = 0, terciaryRotationVelocity = 0;
var wireframe = false;
var camAngle = 1, camChanged = true;
var moveX = 0, moveY = 0, moveZ = 0;

function createTetrahedron(x, y, z, color) {
    'use strict';

    var tetrahedron = new THREE.Object3D();

    const radius = 15;

    const geometry = new THREE.TetrahedronGeometry(radius);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe
    });
    const mesh = new THREE.Mesh(geometry, material);

    tetrahedron.add(mesh);
    
    tetrahedron.position.set(x, y, z);
    
    scene.add(tetrahedron);
}

function createOctahedron(x, y, z, color) {
    'use strict';

    var octahedron = new THREE.Object3D();

    const radius = 20;

    const geometry = new THREE.OctahedronGeometry(radius);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe
    });
    const mesh = new THREE.Mesh(geometry, material);

    octahedron.add(mesh);

    octahedron.position.set(x, y, z);

    scene.add(octahedron);
}

function createCone(x, y, z, radius, height, color) {
    'use strict';

    const radialSegments = 20;
    const heightSegments = 10;

    const geometry = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe
    })
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);

    return mesh;
}

function createConeWithRotation(obj, x, y, z, radius, height, color, rotation) {
    'use strict';

    const mesh = createCone(x, y, z, radius, height, color);
    mesh.scale.y = rotation;

    obj.add(mesh);
}

function createDoubleCones(x, y, z) {
    'use strict';

    doubleCones = new THREE.Object3D();
    doubleCones.userData = {
        spinning: true,
        velocity: 0.05,
    };

    const radius = 30;
    const height = 50;

    createConeWithRotation(doubleCones, x, (y + (height / 2)), z, radius, height, 0xA26769, 1);
    createConeWithRotation(doubleCones, x, (y - (height / 2)), z, radius, height, 0xD5B9B2, -1);

    scene.add(doubleCones);
}

function addTrainMainWheel(obj, x, y, z, color) {
    'use strict';
    const radiusTop = 8;  // radiusTop
    const radiusBottom = 8;  // radiusBottom
    const height = 17;  // height
    const radialSegments = 12;  // radialSegments
    
    material = new THREE.MeshBasicMaterial({ color: color, wireframe: wireframe });
    geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    geometry.rotateZ(-Math.PI * 0.5);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTrainCabin(obj, x, y, z, color) {
    'use strict';
    material = new THREE.MeshBasicMaterial({ color: color, wireframe: wireframe });
    geometry = new THREE.CubeGeometry(15, 20, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addWheel(obj, x, y, z, color) { 
    'use strict';

    const radiusTop = 4;  // radiusTop
    const radiusBottom = 4;  // radiusBottom
    const height = 18;  // height
    const radialSegments = 12;  // radialSegments
    material = new THREE.MeshBasicMaterial({ color: color, wireframe: wireframe });
    geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    geometry.rotateZ(-Math.PI * 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);  
}

function addTrainBody(obj, x, y, z, color) {
    'use strict';

    const radiusTop = 8;  // radiusTop
    const radiusBottom = 8;  // radiusBottom
    const height = 32;  // height
    const radialSegments = 12;  // radialSegments
    material = new THREE.MeshBasicMaterial({ color: color, wireframe: wireframe });
    geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    geometry.rotateX(-Math.PI * 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTrainChimney(obj, x, y, z, color) {
    'use strict';

    const radiusTop = 2;  // radiusTop
    const radiusBottom = 1;  // radiusBottom
    const height = 3;  // height
    const radialSegments = 8;  // radialSegments
    material = new THREE.MeshBasicMaterial({ color: color, wireframe: wireframe });
    geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
    
}

function createTrain(x, y, z) {
    'use strict';
    
    train = new THREE.Object3D();
    
    addTrainCabin(train, 0, 0, 0, 0x582C4D);
    addTrainMainWheel(train, 0, -2, 0, 0xA26769);
    addWheel(train, 0, -5, 17, 0xD5B9B2);
    addWheel(train, 0, -5, 37, 0xD5B9B2);
    addWheel(train, 0, -5, 27, 0xD5B9B2);
    addTrainBody(train, 0, 0, 25, 0x582C4D);
    addTrainChimney(train, 0, 10, 37, 0x582C4D);
    
    scene.add(train);
    
    train.position.x = x;
    train.position.y = y;
    train.position.z = z;

    train.rotation.y = 0.5;
}

function createDonut(x, y, z, color) {
    'use strict';
    
    donut = new THREE.Object3D();
    donut.userData = {
        spinning: true,
        velocity: 0.1
    }
    
    const radius = 52;
    const tube = 16;
    const radialSegments = 100;
    const tubularSegments = 50;
    
    const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    donut.add(mesh);
    donut.position.set(x, y, z);
    
    scene.add(donut);
}

function createSphere(x, y, z, color) {
    'use strict';
    
    sphere = new THREE.Object3D();
    sphere.userData = {
        spinning: true,
        velocity: 0.1
    }
    
    const radius = 32;
    const widthSegments = 50;
    const heightSegments = 50;
    
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    sphere.add(mesh);
    sphere.position.set(x, y, z);
    
    scene.add(sphere);
}

function createCompositeDonutSphere(x, y, z) {
    createSphere(x, y, z, 0xECE2D0);
    createDonut(x, y, z, 0xA26769);
}

function createBox(obj, x, y, z, size, color) {
    'use strict';

    material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
    });
    geometry = new THREE.BoxGeometry(size, size, size);
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createCompositeBoxes(x, y, z) {
    const box1 = 4;
    const box2 = 5;
    const box3 = 6;
    const box4 = 7;

    compositeBoxes = new THREE.Object3D();

    createBox(compositeBoxes,
              (x - (box1 / 2)),
              (y + (box1 / 2)),
              (z + (box1 / 2)),
              box1,
              0xECE2D0);
    createBox(compositeBoxes,
              (x + (box2 / 2)),
              (y + (box2 /2)),
              (z - (box2 / 2)),
              box2,
              0x582C4D);
    createBox(compositeBoxes,
              (x - (box3 / 2)),
              (y - (box3 / 2)),
              (z - (box3 / 2)),
              box3,
              0xA26769);
    createBox(compositeBoxes,
              (x + (box4 / 2)),
              (y - (box4 / 2)),
              (z + (box4 / 2)),
              box4,
              0xD5B9B2);
    
    return compositeBoxes;
}

function createIcosahedron(x, y, z, color) {
    'use strict';

    const radius = 10;

    icosahedron = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe,
    });
    geometry = new THREE.IcosahedronGeometry(radius);
    mesh = new THREE.Mesh(geometry, material);

    icosahedron.add(mesh);
    icosahedron.position.set(x, y, z);

    return icosahedron;
}

function createTube(x, y, z, color) {
    'use strict';

    tube = new THREE.Object3D();

    const segments = 200;
    const radius = 0.5;

    const points = [
        new THREE.Vector3(x - 8, y + 20, z),
        new THREE.Vector3(x - 10, y + 15, z - 3),
        new THREE.Vector3(x - 2, y + 10, z + 2),
        new THREE.Vector3(x - 4, y + 2, z),
        new THREE.Vector3(x, y - 5, z + 5),
        new THREE.Vector3(x + 4, y + 3, z + 1),
        new THREE.Vector3(x + 7, y - 10, z - 7),
        new THREE.Vector3(x + 10, y, z - 4),
        new THREE.Vector3(x + 15, y + 10, z),
        new THREE.Vector3(x + 17, y - 10, z),
    ];

    var path = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(path, segments, radius)
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: wireframe
    });
    const mesh = new THREE.Mesh(geometry, material);

    tube.add(mesh);

    tube.position.set(x, y, z);

    return tube;
}

function createArticulatedObject(x, y, z) {
    'use strict';

    grandfather = createIcosahedron(x, y, z, 0x582C4D);
    father = createTube(-10, 10, 10, 0xA26769);
    son = createCompositeBoxes(-25, 40, 20);
    
    father.add(son)
    grandfather.add(father);
    
    scene.add(grandfather);
}

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    createTrain(40, 45, -60);
    createCompositeDonutSphere(-100, -20, -80);
    createDoubleCones(100, -40, -50);
    createTetrahedron(5, -40, 80, 0xECE2D0);
    createOctahedron(100, 70, 80, 0x582C4D);
    createArticulatedObject(0, 0, 0);
}

function createCamera() {
    'use strict';
    camera = new THREE.OrthographicCamera( -220, 230, 150, -150, 1, 1000 );
}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
        // rotation commands
        case 81: // q
            primaryRotationVelocity = -0.1;
            break;
        case 87: // w
            primaryRotationVelocity = 0.1;
            break;
        case 65: // a
            secondaryRotationVelocity = -0.1;
            break;
        case 83: // s
            secondaryRotationVelocity = 0.1;
            break;
        case 90: // z
            terciaryRotationVelocity = -0.1;
            break;
        case 88: // x
            terciaryRotationVelocity = 0.1;
            break;

        // movement commands 
        case 38: // arrow up
            moveY = 1
            break;
        case 40: // arrow down
            moveY = -1
            break;
        case 37: // arrow left
            moveX = -1
            break;
        case 39: // arrow right
            moveX = 1
            break;
        case 67: // c
            moveZ = 1
            break;
        case 68: // d
            moveZ = -1
            break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {
        // camera commands
        case 49: // 1
            // front
            camAngle = 1;
            camChanged = true;
            break;
        case 50: // 2
            // top
            camAngle = 2;
            camChanged = true;
            break;
        case 51: // 3
            // side
            camAngle = 3;
            camChanged = true;
            break;
        case 52: // 4
            wireframe = !wireframe;
            break;
        
        // rotation commands
        case 81: // q
        case 87: // w
            primaryRotationVelocity = 0;
            break;
        case 65: // a
        case 83: // s
            secondaryRotationVelocity = 0;
            break;
        case 90: // z
        case 88: // x
            terciaryRotationVelocity = 0;
            break;

        // movement commands 
        case 38: // arrow up
        case 40: // arrow down
            moveY = 0;
            break;
        case 37: // arrow left
        case 39: // arrow right
            moveX = 0;
            break;
        case 67: // c
        case 68: // d
            moveZ = 0;
            break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xBFB5AF);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera();
    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function update() {
    'use strict';

    if (donut.userData.spinning) {
        donut.rotateX(donut.userData.velocity);
    }

    if (sphere.userData.spinning) {
        sphere.rotateZ(sphere.userData.velocity);
    }

    // if (doubleCones.userData.spinning) {
    //     doubleCones.rotation.z += doubleCones.userData.velocity;
    // }

    // rotation commands
    if (primaryRotationVelocity) {
        grandfather.rotation.y += primaryRotationVelocity;
    }
    if (secondaryRotationVelocity) {
        father.rotation.y += secondaryRotationVelocity;
    }
    if (terciaryRotationVelocity) {
        son.rotation.y += terciaryRotationVelocity;
    }

    scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            node.material.wireframe = wireframe;
        }
    });

    if (moveX) {
        grandfather.position.x += moveX;
    }
    if (moveY) {
        grandfather.position.y += moveY;
    }
    if (moveZ) {
        grandfather.position.z += moveZ;
    }

    if (camChanged) {
        switch(camAngle) {
            case 1: // front
                camera.position.x = 0;
                camera.position.y = 0;
                camera.position.z = 200;
                camera.lookAt(scene.position);
                break;
            case 2: // top
                camera.position.x = 0;
                camera.position.y = 200;
                camera.position.z = 0;
                camera.lookAt(scene.position);
                break;
            case 3: // side
                camera.position.x = 200;
                camera.position.y = 0;
                camera.position.z = 0;
                camera.lookAt(scene.position);
                break;
            }
        camChanged = false;
    }
}

function animate() {
    'use strict';
    
    update();

    render();
    
    requestAnimationFrame(animate);
}

