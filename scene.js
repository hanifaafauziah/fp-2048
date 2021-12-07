import * as THREE from './js/three.module.js';
import {OrbitControls} from './js/OrbitControls.js';
import {GLTFLoader} from './js/GLTFLoader.js';
import {OBJLoader} from './js/OBJLoader.js';
import {MTLLoader} from './js/MTLLoader.js';
import {Reflector} from './js/objects/Reflector.js';
import * as dat from './js/libs/dat.gui.module.js';
import {path, box2048} from './kotak.js';

let gameStat = "loading"
//canvas
const canvas = document.querySelector('canvas.webgl')
const startBtn = document.querySelector('.start-btn')
const bgMusic = new Audio('./music/bg.mp3')
bgMusic.loop = true
startBtn.innerText = "start"
startBtn.addEventListener('click', () => {
  if(startBtn.innerText == "START"){
      init()
      document.querySelector('.modal').style.display = "none"
  }
})

async function init(){
  // await delay(500)
  // text.innerText = "Starting in 3"
  // await delay(500)
  // text.innerText = "Starting in 2"
  // await delay(500)
  // text.innerText = "Starting in 1"
  // lookBackward()
  // await delay(500)
  // text.innerText = "Gooo!!!"
  bgMusic.play()
  start()
}

function start(){
  gameStat = "started"
}

//scene
const scene = new THREE.Scene();

//random generate 
function getrand(){

  return (Math.floor(Math.random()*3)-1)*50;
}



// function GetRandomBox()
// {
//   Math.floor( Math.random() * 4 ) + 2
// }

// function GetRandomBox() {
//   let n = Math.floor( Math.random() * 4 ) + 2;
//   if(n%2!==0){
//     return 2
//   }
//   else{
//     return n
//   }
  
// }

//cube container
var cubes = [];

//move vector
const mov = new THREE.Vector3();

//state check
var ismoving = 0;
var haspawned = 0;

//remove all cube

function removecube(box){
  box.remove();
  scene.remove(box);
}

var cubes = [];
function checksama(sama, ccube){
 if(sama === 1){
   checkbox();
 }
 else{
    scene.add(ccube);

    cubes.push(ccube);
    console.log(cubes.length);
    console.log(tambah);
 }
}


function checkbox(cubes){
  // let sama = 0;
  // generatebox();
  let sama = 0;
  var ccube = new THREE.Mesh(geometry,material);
  ccube.position.set(getrand(),getrand()+50+5,getrand());
  for(let i = 0; i < cubes.length; i++) {
    var cube = cubes[i];
    if(cube.position.x === ccube.position.x && 
      cube.position.y === ccube.position.y &&
      cube.position.z === ccube.position.z ){
      sama = 1;
    }
  }
  checksama(sama, ccube);
}


const geometry = new THREE.BoxGeometry(20,20,20);
box2048(2);
const loader = new THREE.TextureLoader();
const material = new THREE.MeshPhongMaterial( {
  map: loader.load(path),
  shininess: 30
});

// ccube.castShadow = true;
// ccube.receiveShadow = true;
// cubes.add(ccube);
for(var i=0;i<2;i++){
  var ccube = new THREE.Mesh(geometry,material);
  ccube.position.set(getrand(),getrand()+50+5,getrand());
  scene.add(ccube);

  cubes.push(ccube);
  console.log(cubes.length);
}


// KeyboardEvents
document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event){
    var keyCode = event.which;
    if (keyCode == 8){ //backspace
      cubes.forEach(removecube);
      return;
    }

    // (keyCode == 87) W

    //movedown
    if (keyCode == 40){ 
      let maxY = 100+5;
      for(let i = 0; i < cubes.length; i++) {  // for each cube do:
        var cube = cubes[i];
        if(cube.position.y === maxY){
          cube.position.y -= 100; // move on Z in this demo
        }
        else if(cube.position.y === 50+5){
          cube.position.y -= 50;
        }
        else if((cube.position.y === 5)){
          return;
        }
      }
      // let cubeslength = cubes.length;
      checkbox(cubes);

    }

    //moveup
    if (keyCode == 38){ 
      let maxY = 100+5;
      for(let i = 0; i < cubes.length; i++) {  // for each cube do:
        var cube = cubes[i];
        if(cube.position.y === 5){
          cube.position.y += 100; // move on Z in this demo
        }
        else if(cube.position.y === 50+5){
          cube.position.y += 50;
        }
        else if((cube.position.y === maxY)){
          return;
        }
      }
      checkbox(cubes); 
    }




    if (keyCode == 83){ //S
      // cubes.forEach(movecubefront);S
      mov.set(0,0,10);

    }
    if (keyCode == 65){
      // cubes.forEach(movecubeleft);A
      mov.set(-10,0,0);

    }
    if (keyCode == 68){
      // cubes.forEach(movecuberight);D
      mov.set(10,0,0);

    }
    if (keyCode == 69){
      // cubes.forEach(movecubeup);E
      mov.set(0,10,0);

    }
    if (keyCode == 81){
      // cubes.forEach(movecubedown);Q
      mov.set(0,-10,0);

    }

    // render();

};

//size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //update size
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

})

// Camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
// camera.position.y = 50;
// camera.position.z = 200;
scene.add(camera);

//controls
const controls = new OrbitControls(camera, canvas);
camera.position.set( 0, 50, 200 );
// controls.target.set(10, 10, 10);
controls.smoothZoom = true;
// controls.minDistance = 50;
controls.maxDistance = 200;
controls.enablePan = true;
controls.maxPolarAngle = Math.PI / 2;
controls.update();
controls.enableKeys = false;
// controls.enableDamping = true;



//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
    //alpha: true,
    //antialias: true,
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.render(scene, camera, controls);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaOutput = true;

//panorama
const panorama = new THREE.CubeTextureLoader();
const sky = panorama.load([
  './assets/panorama/px.jpg', './assets/panorama/nx.jpg',
  './assets/panorama/py.jpg', './assets/panorama/ny.jpg',
  './assets/panorama/pz.jpg', './assets/panorama/nz.jpg'
]);
scene.background = sky;

// const color_black = new THREE.Color("rgb(42,42,42)");
// scene.background = color_black ;

let geo = new THREE.BoxBufferGeometry(0, 0, 0)
let mat = new THREE.MeshLambertMaterial({
    // color: "white"
})
let mesh = new THREE.Mesh(geo, mat)
scene.add(mesh)

let tex = new THREE.TextureLoader().load("./assets/grass.jpg")
tex.anisotropy = 100
tex.repeat.set(100, 100)
tex.wrapT = THREE.RepeatWrapping
tex.wrapS = THREE.RepeatWrapping
geo = new THREE.PlaneBufferGeometry(10000, 10000)
mat = new THREE.MeshLambertMaterial({
  map: tex
})
mesh = new THREE.Mesh(geo, mat)
mesh.position.set(0, -5, 0)
mesh.rotation.set(Math.PI / -2, 0, 0)
scene.add(mesh)

let axis = new THREE.Vector3(0, 1, 0)
function updateCamera() {
  camera.position.applyAxisAngle(axis, 0.01)
}



// }


// //sapi
// const mtlLoader = new MTLLoader();
//     mtlLoader.load('./assets/animal//OBJ/Cow.mtl', (mtl) => {
//       mtl.preload();
//       const objLoader = new OBJLoader();
//       mtlLoader.setMaterialOptions( { side: THREE.DoubleSide } );
//       objLoader.setMaterials(mtl);
//       objLoader.load('./assets/animal//OBJ/Cow.obj', (root) => {
//         root.scale.set(5,5,5);
//         // root.position.x = 100
//         // root.position.y = -5
//         root.position.z = -100
//         scene.add(root);
//       });
//     });


//kuda
const mtlLoader2 = new MTLLoader();
    mtlLoader2.load('./assets/animal//OBJ/Horse.mtl', (mtl) => {
      mtl.preload();
      const objLoader2 = new OBJLoader();
      mtlLoader2.setMaterialOptions( { side: THREE.DoubleSide } );
      objLoader2.setMaterials(mtl);
      objLoader2.load('./assets/animal//OBJ/Horse.obj', (root) => {
        root.scale.set(5,5,5);
        root.position.x = 100
        root.position.y = -5
        root.position.z = -50
        scene.add(root);
      });
    });


//Light

let pLight = new THREE.PointLight(0xffffff, 0.8);
pLight.position.set(1000, 1000, 1000);
scene.add(pLight);

let pLight2 = new THREE.PointLight(0xffffff, 1);
pLight2.position.set(-500, 0, 500);
scene.add(pLight2);

let pLight3 = new THREE.PointLight(0xffffff, 1);
pLight3.position.set(-500, 1000, -500);
scene.add(pLight3);

function move(box){
  //checking box boundaries
    if(mov.getComponent(0)!=0){
      if(mov.x > 0){
        if(box.position.x == 50){
          return;
        }
      }
      else{
        if(box.position.x == -50){
          return;
        }
      }
    }
    if(mov.getComponent(1)!=0){
      if(mov.y > 0){
        if(box.position.y == 100){
          return;
        }
      }
      else{
        if(box.position.y == 0){
          return;
        }
      }
    }
    if(mov.getComponent(2)!=0){
      if(mov.z > 0){
        if(box.position.z == 50){
          return;
        }
      }
      else { 
        if(box.position.z == -50){
          return;
        }
      }
    }
  //endof checking box boundaries
  
    box.position.add(mov);
  }
  
  function gameupdate(){
    cubes.forEach(move);
  }
  

const animate = () =>
{
    controls.update();
    // cubes[0].rotation.x += 0.01;
    // cubes[0].rotation.y += 0.01;

    //render
    // sphereCamera.update(renderer, scene);
    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
}
animate();