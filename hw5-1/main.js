import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {TeaPot} from "./mesh.js";

var scene, renderer, camera;
var pointLight;
var angle = 0;
var arr = [];

export function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x888888);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;

    let controls = new OrbitControls(camera, renderer.domElement);

    var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);

    pointLight = new THREE.PointLight(0xffffff);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 5));

	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

	//10x10 茶壺
	for(let i=0; i<10; i++){
		for(let j=0;j<10;j++){
			let a = new TeaPot(new THREE.Vector3(-50+i*15,5,-50+j*15));
			arr.push(a);
		}
    }
}

export function animate() {
    angle += 0.01;
    pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));    
   
	//自轉
	arr.forEach (function(t) {t.update(pointLight.position,angle);});
    requestAnimationFrame(animate);
    render();
}

export function render() {
    renderer.render(scene, camera);
}

export {scene}