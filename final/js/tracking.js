// 3d model setup

var container;
var webcam, scene, renderer;

var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');

var projector = new THREE.Projector();
var objects = [];


var PI2 = Math.PI * 2;
function particleRender( context ) {
  context.beginPath();
  context.arc( 0, 0, 1, 0, PI2, true );
  context.fill();
};

var placeTarget = function(x,y,z) {
  var targetObject = new THREE.Object3D();

  // Create sprites with lines

  var sprite = new THREE.Particle( new THREE.ParticleCanvasMaterial( { color: Math.random() * 0x808008 + 0x808080, program: particleRender } ) );
  sprite.scale.x = 40*z/1000;
  sprite.scale.y = 40*z/1000;
  sprite.position.x = x*z/1000;
  sprite.position.y = y*z/1000;
  sprite.position.z = z;
  targetObject.add( sprite );

  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vector3( -sprite.position.x, -sprite.position.y, 0 ) );
  geometry.vertices.push( new THREE.Vector3( 0, 0, z ) );
  var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, linewidth : 1.5 } ) );
  line.position.x = sprite.position.x;
  line.position.y = sprite.position.y;
  targetObject.add( line );

  scene.add(targetObject);

  objects.push(sprite);
  objects.push(line);

  return targetObject;
};

init();
// animate();

function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();

  webcam = new THREE.PerspectiveCamera( 23, window.innerWidth / window.innerHeight, 1, 100000 );
  webcam.position.z = 0;
  scene.add( webcam );

  placeTarget(-200*Math.random(), -200*Math.random(), 215.5);
  placeTarget(100*Math.random(), 0, 315);
  placeTarget(-150*Math.random(), 100*Math.random(), 410);
  placeTarget(150*Math.random(), -100*Math.random(),510.5);
  placeTarget(0,0,460);
  placeTarget(0,150*Math.random(),121);
  placeTarget(-50*Math.random(),-150*Math.random(),541);

}

function showRenderer() {
  renderer = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );
}

function animate() {
  renderer.render( scene, webcam );
  requestAnimationFrame( animate );
}

function showVideo() {
  videoInput.style.position = 'absolute';
  videoInput.style.top = '0px';
  videoInput.style.zIndex = '100001';
  videoInput.style.display = 'block';
}

Array.prototype.remove = function(object) {
  for (var i = 0;i < this.length;i++) {
    if (this[i] === object) {
      this.splice(i,1);
      break;
    }
  }
}

function randomTarget() {
  // Create sprites with lines
  x = (Math.random()*400)-200;
  y = (Math.random()*400)-200;
  z = 400*(Math.random()+0.2);
  placeTarget(x,y,z);
}

randomTarget();
randomTarget();
randomTarget();
randomTarget();
//			randomTarget();
//			randomTarget();
//			randomTarget();
//			randomTarget();
//			randomTarget();

// video styling

// set up webcam controller
headtrackr.controllers.three.realisticAbsoluteCameraControl(webcam, 15, [0,0,0], new THREE.Vector3(0,0,0), {damping : 0.5});

// Face detection setup
var htracker = new headtrackr.Tracker({altVideo : {ogv : "./media/capture5.ogv", mp4 : "./media/capture5.mp4"}, cameraOffset : 5});
htracker.init(videoInput, canvasInput);
htracker.start();

// document.addEventListener('mousedown', onDocumentMouseDown, false)
//
// function onDocumentMouseDown( event ) {
//
//   event.preventDefault();
//
//   var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
//   projector.unprojectVector( vector, webcam );
//
//   var ray = new THREE.Ray( webcam.position, vector.subSelf( webcam.position ).normalize() );
//
//   var intersects = ray.intersectObjects( objects );
//
//   if ( intersects.length > 0 ) {
//     var obj = intersects[0].object.parent;
//     objects.remove(obj.children[0]);
//     objects.remove(obj.children[1]);
//     // do something with the first object
//     scene.remove(intersects[ 0 ].object.parent);
//     // remove from objects
//     randomTarget();
//   }
//
// }