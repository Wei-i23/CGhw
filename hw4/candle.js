
import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from './main.js';

class Candle {
	constructor(size,flame) {
		this.candle = new THREE.Object3D();
		this.mesh = new THREE.Mesh(
			new THREE.CylinderGeometry(size,size,20,32),
			new THREE.MeshPhongMaterial({ color: 'red'})
		);
		this.mesh.position.y = 10;
		this.size = size;
		
		//this.mesh.castShadow = true;
		//this.mesh.receiveShadow = true;
		
		this.candle.add(this.mesh);
		
		let loader = new THREE.TextureLoader();
		let texture = loader.load( 'Flame.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1/3,1/3);
		texture.offset.set(0,2/3);
		var texMat = new THREE.MeshBasicMaterial({
			map: texture,
			alphaTest: 0.5,
			side: THREE.DoubleSide,
		});
		this.flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(30,30), texMat);
		this.flameMesh.name = flame;
		this.flameMesh.position.y = 28;
		this.candle.add(this.flameMesh);
		
		this.light = new THREE.PointLight(0xffffff,1,100);
		this.light.castShadow = true;
		this.light.position.copy(this.flameMesh.position);
		this.candle.add(this.light);
		scene.add(this.candle);
		
		
		let that = this;//保存當前對象this
		this.flameInterval = setInterval (function(){
											that.textureAnimate();
											}, 100);//通過閉包得到當前作用域，好訪問保存好的對象that 
		//陰影
		this.candle.traverse(function(object) {
			if (object instanceof THREE.Mesh) {
				object.castShadow = true;
				object.receiveShadow = true;
			}
		});										
	}
	
	textureAnimate() {
		this.count = (this.count === undefined) ? 1 : this.count;
		if (this.flameMesh !== undefined) {
			var texture = this.flameMesh.material.map;
				texture.offset.x += 1 / 3;
			if (this.count % 3 === 0) {
				texture.offset.y -= 1 / 3;
			}
			this.count++;
		}
	}	
	flameOff(){
		clearInterval (this.flameInterval);
		this.flameMesh.material.visible = false;
		this.light.visible = false;
		let that = this;
		this.on = setTimeout (function(){
											that.flameOn();
											}, 3000);		
	}
	flameOn(){
		clearInterval (this.on);
		let that = this;
		this.flameInterval = setInterval (function(){
											that.textureAnimate();
											}, 100);
		this.light.visible = true;									
		this.flameMesh.material.visible = true;
	}
	
}
export { Candle };