import { TeapotGeometry } from 'https://raw.githack.com/mrdoob/three.js/dev/examples/jsm/geometries/TeapotGeometry.js';
import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from "./main.js";

export class TeaPot{
	constructor (pos) {
        this.pos = pos;
        let meshMaterial = new THREE.ShaderMaterial({
            uniforms: {
                lightpos: {type: 'v3', value: new THREE.Vector3()}
            },
            vertexShader: document.getElementById('myVertexShader').textContent,
            fragmentShader: document.getElementById('myFragmentShader').textContent
        });
        this.mesh = new THREE.Mesh(new TeapotGeometry (5), meshMaterial);
        scene.add(this.mesh);
        this.mesh.position.copy(this.pos);
		this.angle = 0;
		
    }
	update(position,angle){
        this.mesh.material.uniforms.lightpos.value.copy (position);
        this.mesh.rotation.y = 1.3*angle;
    }
}