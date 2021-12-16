import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { Candle } from "./candle.js";

var camera, scene, renderer;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var pickables = [];
var intersects;
var candle1,candle2,candle3,candle4,candle5 ;

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setClearColor (0x888888);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true // 設定需渲染陰影效果
	renderer.shadowMap.type = 2 // THREE.PCFSoftShadowMap
	
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, 1, 1, 10000);
	camera.position.set(0,100,100);

	let controls = new OrbitControls (camera, renderer.domElement);

	// 設置環境光提供輔助柔和白光
	let ambientLight = new THREE.AmbientLight(0x404040);
	scene.add(ambientLight);
	
	var gt = new THREE.TextureLoader().load( 'Floor.jpg' );
	var gg = new THREE.PlaneBufferGeometry( 200, 200 );
	var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt ,side: THREE.DoubleSide} );

	var ground = new THREE.Mesh( gg, gm );
	ground.rotation.x = - Math.PI / 2;
	ground.receiveShadow = true;	//接收投影的效果
	scene.add(ground);
	////////////////////////////////////////////////////////////
	//candle
	candle1 = new Candle(5,"flame1");
	candle2 = new Candle(5,"flame2");
	candle3 = new Candle(5,"flame3");
	candle4 = new Candle(5,"flame4");
	candle5 = new Candle(5,"flame5");
	
	candle2.candle.position.set(0,0,70);
	candle3.candle.position.set(0,0,-70);
	candle4.candle.position.set(70,0,0);
	candle5.candle.position.set(-70,0,0);
	
	
	pickables.push (
		candle1.candle,candle2.candle,candle3.candle,candle4.candle,candle5.candle
	);
	
	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('pointerdown', onDocumentMouseDown, false);
};

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};

function onDocumentMouseDown(event) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(pickables);
	if (intersects.length > 0) {
		if( intersects[0].object.name == "flame1"){
			candle1.flameOff();
		}
		if( intersects[0].object.name == "flame2"){
			candle2.flameOff();
		}
		if( intersects[0].object.name == "flame3"){
			candle3.flameOff();
		}
		if( intersects[0].object.name == "flame4"){
			candle4.flameOff();
		}
		if( intersects[0].object.name == "flame5"){
			candle5.flameOff();
		}
	}
};

function animate() {
	
	// billboard
	// candle.lookAt (camera.position)  // does not work
	candle1.candle.lookAt (camera.position.x, 0, camera.position.z);
	candle2.candle.lookAt (camera.position.x, 0, camera.position.z);
	candle3.candle.lookAt (camera.position.x, 0, camera.position.z);
	candle4.candle.lookAt (camera.position.x, 0, camera.position.z);
	candle5.candle.lookAt (camera.position.x, 0, camera.position.z);
	
	requestAnimationFrame(animate);
	render();
};

function render() {
	renderer.render(scene, camera);
};

export {init, onWindowResize, onDocumentMouseDown, animate, render, scene};