import * as THREE from 'three';

console.log("Universo cargado 🚀");
// ===============================
// MUSICA ❤️
// ===============================

const music = new Audio("./music/music.mp3");

music.loop = true;
music.volume = 0.35;


// Inicia al primer click
window.addEventListener(
"click",
()=>{

music.play()
.then(()=>{

console.log("Música iniciada ❤️");

})
.catch(error=>{

console.log("Error música:",error);

});

},
{
once:true
}

);


const scene = new THREE.Scene();

scene.background = new THREE.Color(0x010008);


// ===============================
// CAMARA
// ===============================

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
30000
);


camera.position.set(
0,
0,
0
);


// ===============================
// RENDER
// ===============================

const renderer = new THREE.WebGLRenderer({

antialias:true,

powerPreference:"high-performance"

});


renderer.setSize(
window.innerWidth,
window.innerHeight
);


renderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);


renderer.outputColorSpace =
THREE.SRGBColorSpace;


document.body.appendChild(
renderer.domElement
);


// ===============================
// ESTRELLAS
// ===============================


function createStars(count,radius,size){


const positions =
new Float32Array(count*3);



for(let i=0;i<count;i++){


const i3=i*3;


const theta =
Math.random()*Math.PI*2;


const phi =
Math.acos(
Math.random()*2-1
);


const r =
radius*
(
0.3+
Math.random()*0.7
);



positions[i3] =
Math.sin(phi)*
Math.cos(theta)*
r;


positions[i3+1] =
Math.cos(phi)*
r;


positions[i3+2] =
Math.sin(phi)*
Math.sin(theta)*
r;


}



const geometry =
new THREE.BufferGeometry();



geometry.setAttribute(

"position",

new THREE.BufferAttribute(
positions,
3
)

);



const material =
new THREE.PointsMaterial({

size:size,

color:0xffffff,

transparent:true,

opacity:1,

blending:
THREE.AdditiveBlending,

depthWrite:false,

sizeAttenuation:true

});



const stars =
new THREE.Points(
geometry,
material
);



scene.add(stars);


return stars;


}



const farStars =
createStars(
300000,
15000,
2
);



const midStars =
createStars(
120000,
7000,
3
);



const nearStars =
createStars(
50000,
2500,
5
);// ===============================
// VIA LACTEA
// ===============================


const galaxyCount = 220000;


const galaxyPositions =
new Float32Array(
galaxyCount*3
);



for(let i=0;i<galaxyCount;i++){


const i3 = i*3;


const angle =
Math.random()*Math.PI*2;


const radius =
1200+
Math.random()*9500;



galaxyPositions[i3] =
Math.cos(angle) *
radius;


galaxyPositions[i3+1] =
(Math.random()-0.5) *
450;


galaxyPositions[i3+2] =
Math.sin(angle) *
radius;


}



const galaxyGeometry =
new THREE.BufferGeometry();



galaxyGeometry.setAttribute(

"position",

new THREE.BufferAttribute(
galaxyPositions,
3
)

);



const galaxyMaterial =
new THREE.PointsMaterial({

size:2,

color:0xffddbb,

transparent:true,

opacity:0.9,

blending:
THREE.AdditiveBlending

});



const milkyWay =
new THREE.Points(

galaxyGeometry,

galaxyMaterial

);



milkyWay.rotation.z =
Math.PI/5;



scene.add(
milkyWay
);




// ===============================
// AURA PURPURA SUAVE
// ===============================


function createPurpleAura(){


const count = 60000;


const positions =
new Float32Array(
count*3
);



for(let i=0;i<count;i++){


const i3=i*3;


const angle =
Math.random()*Math.PI*2;


const radius =
3000+
Math.random()*7000;



positions[i3] =
Math.cos(angle)*
radius;


positions[i3+1] =
(Math.random()-0.5)*
2500;


positions[i3+2] =
Math.sin(angle)*
radius-5000;


}



const geometry =
new THREE.BufferGeometry();



geometry.setAttribute(

"position",

new THREE.BufferAttribute(
positions,
3
)

);



const material =
new THREE.PointsMaterial({

size:35,

color:0x8a4cff,

transparent:true,

opacity:0.012,

blending:
THREE.AdditiveBlending,

depthWrite:false

});



const cloud =
new THREE.Points(

geometry,

material

);



scene.add(
cloud
);



return cloud;


}



const purpleCloud =
createPurpleAura();




// ===============================
// NEBULOSA AZUL
// ===============================


function createNebula(){


const count = 70000;


const positions =
new Float32Array(
count*3
);



for(let i=0;i<count;i++){


const i3=i*3;


positions[i3] =
(Math.random()-0.5)*
7000;


positions[i3+1] =
(Math.random()-0.5)*
3000;


positions[i3+2] =
-6000+
(Math.random()-0.5)*
4000;


}



const geometry =
new THREE.BufferGeometry();



geometry.setAttribute(

"position",

new THREE.BufferAttribute(
positions,
3
)

);



const material =
new THREE.PointsMaterial({

size:25,

color:0x5555ff,

transparent:true,

opacity:0.025,

blending:
THREE.AdditiveBlending,

depthWrite:false

});



const nebula =
new THREE.Points(

geometry,

material

);



scene.add(
nebula
);



return nebula;


}



const nebula =
createNebula();// =================================
// SISTEMA SOLAR
// =================================


const solarSystem =
new THREE.Group();



solarSystem.position.set(
0,
0,
-1500
);




scene.add(
solarSystem
);




// =================================
// SOL
// =================================


const sun =
new THREE.Mesh(

new THREE.SphereGeometry(
120,
64,
64
),


new THREE.MeshBasicMaterial({

color:0xffaa33

})

);



solarSystem.add(
sun
);




const sunLight =
new THREE.PointLight(
0xffffff,
20,
6000
);



solarSystem.add(
sunLight
);



const ambientLight =
new THREE.AmbientLight(
0xffffff,
0.35
);



scene.add(
ambientLight
);





// =================================
// PLANETAS
// =================================


function createPlanet(
size,
distance,
color,
speed
){


const planet =
new THREE.Mesh(


new THREE.SphereGeometry(
size,
48,
48
),


new THREE.MeshStandardMaterial({

color:color,

roughness:0.8

})

);



solarSystem.add(
planet
);



return {

object:planet,

distance:distance,

speed:speed,

angle:
Math.random()*Math.PI*2

};


}




const mercury =
createPlanet(
18,
250,
0x888888,
0.03
);



const venus =
createPlanet(
28,
360,
0xffaa55,
0.02
);



const earth =
createPlanet(
35,
500,
0x2266ff,
0.015
);



const mars =
createPlanet(
30,
680,
0xff5533,
0.01
);



const jupiter =
createPlanet(
80,
950,
0xaa8844,
0.004
);




// =================================
// ORBITAS
// =================================


function createOrbit(radius){


const geometry =
new THREE.RingGeometry(
radius-1,
radius+1,
128
);



const material =
new THREE.MeshBasicMaterial({

color:0x8866ff,

transparent:true,

opacity:0.22,

side:THREE.DoubleSide

});



const orbit =
new THREE.Mesh(
geometry,
material
);



orbit.rotation.x =
Math.PI/2;



solarSystem.add(
orbit
);



}



createOrbit(250);
createOrbit(360);
createOrbit(500);
createOrbit(680);
createOrbit(950);





// =================================
// RECUERDOS - FOTOS
// =================================


const memories = [

{
imagen:"foto1.jpeg",
mensaje:"Un momento especial que siempre guardaré en mi corazón ❤️"
},

{
imagen:"foto2.jpeg",
mensaje:"Los buenos recuerdos son pequeños tesoros de la vida ✨"
},

{
imagen:"foto3.jpeg",
mensaje:"Gracias por formar parte de momentos tan bonitos 💖"
},

{
imagen:"foto4.jpeg",
mensaje:"Una sonrisa, un instante y un recuerdo para siempre 🌙"
},

{
imagen:"foto5.jpeg",
mensaje:"Personas especiales hacen la vida más hermosa ❤️"
},

{
imagen:"foto6.jpeg",
mensaje:"Cada recuerdo tiene una historia que contar ✨"
},

{
imagen:"foto7.jpeg",
mensaje:"Gracias por compartir momentos que valen oro 💕"
},

{
imagen:"foto8.jpeg",
mensaje:"Los momentos simples se vuelven inolvidables 🌌"
},

{
imagen:"foto9.jpeg",
mensaje:"Una parte de mi historia que siempre recordaré ❤️"
},

{
imagen:"foto10.jpeg",
mensaje:"La felicidad también vive en pequeños momentos ✨"
},

{
imagen:"foto11.jpeg",
mensaje:"Gracias por las risas y los recuerdos compartidos 💖"
},

{
imagen:"foto12.jpeg",
mensaje:"Un recuerdo lleno de alegría y buenos momentos 🌙"
},

{
imagen:"foto13.jpeg",
mensaje:"Cada persona deja una huella especial en nuestra vida ❤️"
},

{
imagen:"foto14.jpeg",
mensaje:"Momentos que merecen quedarse para siempre ✨"
},

{
imagen:"foto15.jpeg",
mensaje:"Gracias por ser parte de esta historia 💕"
},

{
imagen:"foto16.jpeg",
mensaje:"Recuerdos que iluminan el camino 🌌"
},

{
imagen:"foto17.jpeg",
mensaje:"La vida se construye con momentos así ❤️"
},

{
imagen:"foto18.jpeg",
mensaje:"Una imagen, mil recuerdos y muchas emociones ✨"
},

{
imagen:"foto19.jpeg",
mensaje:"Gracias por tantos momentos compartidos 💖"
},

{
imagen:"foto20.jpeg",
mensaje:"Un instante que se convirtió en recuerdo eterno 🌙"
},

{
imagen:"foto21.jpeg",
mensaje:"Las mejores memorias nacen de personas especiales ❤️"
},

{
imagen:"foto22.jpeg",
mensaje:"Siempre será bonito recordar estos momentos ✨"
},

{
imagen:"foto23.jpeg",
mensaje:"Cada recuerdo tiene un lugar especial en mi corazón 💕"
},

{
imagen:"foto24.jpeg",
mensaje:"Momentos que hacen la vida más bonita 🌌"
},

{
imagen:"foto25.jpeg",
mensaje:"Gracias por ser parte de mis mejores recuerdos ❤️"
},

{
imagen:"foto26.jpeg",
mensaje:"Historias, risas y momentos que nunca se olvidan ✨"
},

{
imagen:"foto27.jpeg",
mensaje:"Un recuerdo más para guardar con cariño 💖"
},

{
imagen:"foto28.jpeg",
mensaje:"Personas increíbles, momentos increíbles 🌙"
},

{
imagen:"foto29.jpeg",
mensaje:"Cada recuerdo tiene algo especial que lo hace único ❤️"
},

{
imagen:"foto30.jpeg",
mensaje:"Gracias por cada momento vivido ✨"
},

{
imagen:"foto31.jpeg",
mensaje:"Una memoria más que forma parte de mi universo 💕"
},

{
imagen:"foto32.jpeg",
mensaje:"Gracias por todos los momentos que hicieron mi vida más bonita ❤️"
}

];



const photos = [];
// =================================
// TEXTOS DE RECUERDOS
// =================================

const texts = [];


function createText(message, position){


const canvas = document.createElement("canvas");

const context = canvas.getContext("2d");



canvas.width = 1000;
canvas.height = 200;



context.clearRect(
0,
0,
canvas.width,
canvas.height
);



context.fillStyle = "white";

context.font = "40px Arial";

context.textAlign = "center";

context.textBaseline = "middle";



// dividir texto automáticamente

const words = message.split(" ");

let line = "";
let lines = [];


for(let word of words){

let test = line + word + " ";

if(context.measureText(test).width > 900){

lines.push(line);

line = word + " ";

}else{

line = test;

}

}


lines.push(line);



lines.forEach((text,index)=>{

context.fillText(
text,
500,
70 + index*50
);

});



const texture =
new THREE.CanvasTexture(canvas);



const material =
new THREE.SpriteMaterial({

map:texture,

transparent:true

});



const sprite =
new THREE.Sprite(material);



sprite.scale.set(
700,
140,
1
);



sprite.position.copy(position);



scene.add(sprite);


texts.push(sprite);


}
const messages = [];



function createMemoryPhoto(data,index){

const image = data.imagen;
const mensaje = data.mensaje;


const texture =
new THREE.TextureLoader().load(

"fotos/" + image,

()=>{

console.log(
"Foto cargada:",
image
);

},

undefined,

()=>{

console.log(
"ERROR:",
image
);

}

);



texture.colorSpace =
THREE.SRGBColorSpace;



texture.minFilter =
THREE.LinearFilter;



texture.magFilter =
THREE.LinearFilter;




const material =
new THREE.SpriteMaterial({

map:texture,

transparent:true

});



const photo =
new THREE.Sprite(material);





photo.scale.set(

450,

450,

1

);




// Distribución más cerca


const angle =
(index/32)*
Math.PI*
2;



const radius =
2500+
(index%5)*500;




photo.position.set(


Math.cos(angle)*radius,


(Math.random()-0.5)*2500,


Math.sin(angle)*radius-4000


);




scene.add(photo);
photos.push(photo);
createText(
mensaje,
new THREE.Vector3(
photo.position.x,
photo.position.y - 350,
photo.position.z
)
);
function createText(message, position){

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d", { alpha: true });

canvas.width = 1200;
canvas.height = 260;

// Fondo transparente
context.clearRect(0, 0, canvas.width, canvas.height);

context.font = "42px Arial";
context.fillStyle = "#ffffff";
context.textAlign = "center";
context.textBaseline = "middle";

// Brillo suave
context.shadowColor = "rgba(255,255,255,0.8)";
context.shadowBlur = 10;

// Ajuste automático de líneas
const maxWidth = 1000;
const words = message.split(" ");
let line = "";
let lines = [];

for (let i = 0; i < words.length; i++) {
  const testLine = line + words[i] + " ";
  if (context.measureText(testLine).width > maxWidth && i > 0) {
    lines.push(line);
    line = words[i] + " ";
  } else {
    line = testLine;
  }
}
lines.push(line);

const lineHeight = 48;
const startY = 130 - ((lines.length - 1) * lineHeight) / 2;

lines.forEach((text, index) => {
  context.fillText(text.trim(), 600, startY + index * lineHeight);
});

const texture = new THREE.CanvasTexture(canvas);
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.SpriteMaterial({
  map: texture,
  transparent: true,
  depthWrite: false
});

const sprite = new THREE.Sprite(material);
sprite.scale.set(900, 190, 1);
sprite.position.copy(position);

scene.add(sprite);
texts.push(sprite);

}



}



memories.forEach(

(data,index)=>{

createMemoryPhoto(
data,
index
);

}

);// =================================
// CONTROLES
// =================================


const keys = {};



window.addEventListener(
"keydown",
(e)=>{

keys[e.code]=true;

});



window.addEventListener(
"keyup",
(e)=>{

keys[e.code]=false;

});





// =================================
// MOUSE
// =================================


let yaw = 0;

let pitch = 0;



document.body.addEventListener(

"click",

()=>{

document.body.requestPointerLock();

}

);




document.addEventListener(

"mousemove",

(e)=>{


if(document.pointerLockElement){


yaw -= e.movementX * 0.002;


pitch -= e.movementY * 0.002;



pitch =
Math.max(

-Math.PI/2,

Math.min(

Math.PI/2,

pitch

)

);



camera.rotation.order =
"YXZ";



camera.rotation.y =
yaw;



camera.rotation.x =
pitch;



}



});





// =================================
// VELOCIDAD
// =================================


const moveSpeed = 15;





// =================================
// ANIMACION
// =================================


function animate(){


requestAnimationFrame(

animate

);




// Movimiento cámara


if(keys["KeyW"])

camera.translateZ(
-moveSpeed
);



if(keys["KeyS"])

camera.translateZ(
moveSpeed
);



if(keys["KeyA"])

camera.translateX(
-moveSpeed
);



if(keys["KeyD"])

camera.translateX(
moveSpeed
);



if(keys["Space"])

camera.position.y +=
moveSpeed;



if(keys["ShiftLeft"])

camera.position.y -=
moveSpeed;





// =================================
// ORBITAS
// =================================



mercury.angle += mercury.speed;


mercury.object.position.x =
Math.cos(mercury.angle) *
mercury.distance;


mercury.object.position.z =
Math.sin(mercury.angle) *
mercury.distance;





venus.angle += venus.speed;


venus.object.position.x =
Math.cos(venus.angle) *
venus.distance;


venus.object.position.z =
Math.sin(venus.angle) *
venus.distance;





earth.angle += earth.speed;


earth.object.position.x =
Math.cos(earth.angle) *
earth.distance;


earth.object.position.z =
Math.sin(earth.angle) *
earth.distance;





mars.angle += mars.speed;


mars.object.position.x =
Math.cos(mars.angle) *
mars.distance;


mars.object.position.z =
Math.sin(mars.angle) *
mars.distance;





jupiter.angle += jupiter.speed;


jupiter.object.position.x =
Math.cos(jupiter.angle) *
jupiter.distance;


jupiter.object.position.z =
Math.sin(jupiter.angle) *
jupiter.distance;





// =================================
// MOVIMIENTO UNIVERSO
// =================================



milkyWay.rotation.y +=
0.00002;



farStars.rotation.y +=
0.000003;



midStars.rotation.y +=
0.000001;



nebula.rotation.y +=
0.00001;



purpleCloud.rotation.y +=
0.000005;





// Movimiento fotos


photos.forEach(

(photo,index)=>{


photo.rotation.z +=
0.001;



photo.position.y +=

Math.sin(

Date.now()*0.001+index

)

*

0.002;



}

);





renderer.render(

scene,

camera

);



}



animate();// =================================
// RESPONSIVE
// =================================


window.addEventListener(

"resize",

()=>{


camera.aspect =

window.innerWidth /

window.innerHeight;



camera.updateProjectionMatrix();



renderer.setSize(

window.innerWidth,

window.innerHeight

);



});