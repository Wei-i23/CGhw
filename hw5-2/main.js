import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";

var scene, renderer, camera;
var mesh, pointLight;
var angle = 0;
var arr = [];

var sceneRTT,renderTarget;
var background;

function init() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;

    let controls = new OrbitControls(camera, renderer.domElement);

   // pointLight = new THREE.PointLight(0xffffff);
    //scene.add (pointLight);
    //scene.add (new THREE.PointLightHelper(pointLight, 5));

	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
	window.addEventListener('resize', onWindowResize, false);	
	
	////////////////////////////////////
	sceneRTT = new THREE.Scene();
	pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(0, 300, 200);
	sceneRTT.add(pointLight);

	renderTarget = new THREE.WebGLRenderTarget(
		1024, 1024, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.NearestFilter,
			format: THREE.RGBFormat
		}
	);
	
	let meshMaterial = new THREE.ShaderMaterial({
        uniforms: {
            lightpos: {type: 'v3', value: new THREE.Vector3()}
		},
        vertexShader: document.getElementById('myVertexShader_pot').textContent,
        fragmentShader: document.getElementById('myFragmentShader_pot').textContent
    });
    mesh = new THREE.Mesh(new TeapotGeometry (5), meshMaterial);
    
	//10x10 茶壺
	for(let i=0; i<10; i++){
		for(let j=0;j<10;j++){
			let a = mesh.clone();
			a.position.set(-90+i*20,5,-90+j*20);
			arr.push(a);
			sceneRTT.add(a);
		}
    }
	
	let plane = new THREE.PlaneBufferGeometry(300, 300);
		
    let rttmaterial = new THREE.ShaderMaterial({
		uniforms: {
			mytex: {
				type: "t",
				value: renderTarget.texture
			}
		},
		vertexShader: document.getElementById('myVertexShader').textContent,
		fragmentShader: document.getElementById('myFragmentShader').textContent
	});
	background = new THREE.Mesh(plane,rttmaterial);
	scene.add(background);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
    angle += 0.01;
    
    //pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));    
	mesh.material.uniforms.lightpos.value.copy (pointLight.position);

    //mesh.rotation.y = 1.3*angle;
   
	//自轉
	arr.forEach (function(t) {t.rotation.y = 1.3*angle;});
    
    // render torusKnot to texture
	renderer.setRenderTarget (renderTarget);
	renderer.setClearColor(0xffff00);
	renderer.render(sceneRTT, camera);

	// render texture to quad
	renderer.setRenderTarget(null);
	renderer.setClearColor(0x888888);
	renderer.render(scene, camera);
	background.lookAt (camera.position);
	
}

export {scene,init,animate,onWindowResize};