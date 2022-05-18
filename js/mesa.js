/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

var icosahedron, box, train, tube, sphere, donut, compositeBoxes;

var cube, cone, height_cone, width_boxLine, height_boxLine;

var grandfather, father, son;

// variables for commands
var primaryRotationVelocity = 0, secondaryRotationVelocity = 0, terciaryRotationVelocity = 0;
var wireframe = false;
var camAngle = 1, camChanged = true;
var moveX = 0, moveY = 0, moveZ = 0;

function addObject(x, y, obj) {
    obj.position.x = x;
    obj.position.y = y;
  }

  function createMaterial() {
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
    });

    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  function addSolidGeometry(x, y, geometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
    return mesh;
  }

  function addLineGeometry(x, y, geometry) {
    const material = new THREE.LineBasicMaterial({color: 0x000000});
    const mesh = new THREE.LineSegments(geometry, material);
    addObject(x, y, mesh);
    return mesh;
  }

  function addBoxLine(x, y){
    width_boxLine = 30;
    height_boxLine = 30;
    const depth = 15;
    const thresholdAngle = 15;
    cube = addLineGeometry(x, y, new THREE.EdgesGeometry(
        new THREE.BoxGeometry(width_boxLine, height_boxLine, depth),
        thresholdAngle));
    scene.add(cube);
 }
 function addCircle(){
    const radius_circle = 5;
    const segments_circle = 24;
    const circle = addSolidGeometry(0, 0, new THREE.CircleGeometry(radius_circle, segments_circle));
    cube.add(circle);
 }
 function addOctahedr(){
    const radius_octahedr = 5;
    const octahedr = addSolidGeometry(-width_boxLine/2, height_boxLine/2, new THREE.OctahedronGeometry(radius_octahedr));
    cube.add(octahedr);
 }
 function addTerahedr(){
    const radius_tetrahedr = 5;
    const tetrahedr = addSolidGeometry(width_boxLine/2, height_boxLine/2, new THREE.TetrahedronGeometry(radius_tetrahedr));
    cube.add(tetrahedr);
 }
 function addBoxWire(){
    const width_box= 5;
    const height_box = 5;
    const depth_box = 15;
    const box = addLineGeometry(-width_boxLine/2, -height_boxLine/2, new THREE.WireframeGeometry(new THREE.BoxGeometry(width_box, height_box, depth_box)));
    cube.add(box);
 }
 function addBox(){
    const width_box1 = 4;
    const height_box1 = 4;
    const depth_box1 = 6;
    const box1 = addSolidGeometry(-width_boxLine/2, -height_boxLine/2, new THREE.BoxGeometry(width_box1, height_box1, depth_box1));
    cube.add(box1);
  }
  function addCone(){
    const radius_cone = 5;
    height_cone = 5;
    const segments_cone = 16;
    cone = addSolidGeometry(width_boxLine/2, -height_boxLine/2, new THREE.ConeGeometry(radius_cone, height_cone, segments_cone)); 
    cube.add(cone);
  }
  function addInevrtedCone(){
    const radius_cone1 = 5;
    const height_cone1 = 5;
    const segments_cone1 = 16;
    const cone1 = addSolidGeometry(0, -height_cone, new THREE.ConeGeometry(radius_cone1, height_cone1, segments_cone1));
    cone.add(cone1);
    cone1.rotateZ(Math.PI);
  }
  function addAll(x,y){
    addBoxLine(x,y);
    addCircle();
    addOctahedr();
    addTerahedr();
    addBoxWire();
    addBox();
    addCone();
    addInevrtedCone();
  }

function addTrainMainWheel(obj, x, y, z) {
    'use strict';
    const radiusTop = 8;  // radiusTop
    const radiusBottom = 8;  // radiusBottom
    const height = 17;  // height
    const radialSegments = 12;  // radialSegments
    
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: wireframe });
    geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    geometry.rotateZ(-Math.PI * 0.5);

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTrainCabin(obj, x, y, z) {
    'use strict';
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: wireframe });
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

function addTrainBody(obj, x, y, z) {
    
    'use strict';

    const radiusTop = 8;  // radiusTop
    const radiusBottom = 8;  // radiusBottom
    const height = 32;  // height
    const radialSegments = 12;  // radialSegments
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: wireframe });
    geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    geometry.rotateX(-Math.PI * 0.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
    
}

function addTrainChimney(obj, x, y, z) {

    'use strict';

    const radiusTop = 2;  // radiusTop
    const radiusBottom = 1;  // radiusBottom
    const height = 3;  // height
    const radialSegments = 8;  // radialSegments
    material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: wireframe });
    geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
    
}

function createTrain(x, y, z) {
    'use strict';
    
    train = new THREE.Object3D();
    
    addTrainCabin(train, 0, 0, 0);
    addTrainMainWheel(train, 0, -2, 0);
    addWheel(train, 0, -5, 17, 0x00ff00);
    addWheel(train, 0, -5, 27, 0xff0000);
    addWheel(train, 0, -5, 37, 0x0ff000);
    addTrainBody(train, 0, 0, 25);
    addTrainChimney(train, 0, 10, 37);
    
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
    
    const radius = 13;
    const tube = 4;
    const radialSegments = 500;
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
    
    const radius = 8;
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
    createSphere(x, y, z, 0x000000);
    createDonut(x, y, z, 0xff0000);
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

function createCompositeBoxes(obj, x, y, z) {
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
              0x60492c);
    createBox(compositeBoxes,
              (x + (box2 / 2)),
              (y + (box2 /2)),
              (z - (box2 / 2)),
              box2,
              0xf9ebe0);
    createBox(compositeBoxes,
              (x - (box3 / 2)),
              (y - (box3 / 2)),
              (z - (box3 / 2)),
              box3,
              0x208aae);
    createBox(compositeBoxes,
              (x + (box4 / 2)),
              (y - (box4 / 2)),
              (z + (box4 / 2)),
              box4,
              0x0d2149);
    
    return compositeBoxes;
}

function createIcosahedron(x, y, z) {
    'use strict';

    const radius = 10;

    icosahedron = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({
        color: 0x3d3a4b,
        wireframe: wireframe,
    });
    geometry = new THREE.IcosahedronGeometry(radius);
    mesh = new THREE.Mesh(geometry, material);

    icosahedron.add(mesh);
    icosahedron.position.set(x, y, z);

    return icosahedron;
}

function createTube(obj, x, y, z, color) {
    'use strict';

    tube = new THREE.Object3D();

    const segments = 200;
    const radius = 0.5;

    const points = [
        new THREE.Vector3(x - 10, y - 2, z),
        new THREE.Vector3(x - 4, y + 2, z),
        new THREE.Vector3(x, y - 5, z),
        new THREE.Vector3(x + 4, y + 3, z),
        new THREE.Vector3(x + 7, y - 10, z),
        new THREE.Vector3(x + 10, y, z)
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

    grandfather = createIcosahedron(x, y, z);
    father = createTube(grandfather, x - 10, y + 10, z, 0x000000);
    son = createCompositeBoxes(father, x - 20, y + 40, z);
    
    father.add(son)
    grandfather.add(father);
    
    scene.add(grandfather);
}

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));
    
    createTrain(40, 25, 0);
    createCompositeDonutSphere(-50, -30, 0);
    addAll(60, -30);
    createArticulatedObject(0, 0, 0);
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
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
            moveZ = -1
            break;
        case 68: // d
            moveZ = 1
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
    renderer.setClearColor(0xe3dfff);
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
                camera.position.z = 100;
                camera.lookAt(scene.position);
                break;
            case 2: // top
                camera.position.x = 0;
                camera.position.y = 100;
                camera.position.z = 0;
                camera.lookAt(scene.position);
                break;
            case 3: // side
                camera.position.x = 100;
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

