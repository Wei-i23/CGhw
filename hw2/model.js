
function buildVehicle() {
		  var car = new THREE.Object3D();
		  body = new THREE.Mesh(new THREE.BoxGeometry(46,40,20),new THREE.MeshPhongMaterial({
								color: 'yellow',
			}));
			body.rotation.x = Math.PI/2;
			body.position.set(0,10,0);
			body2 = new THREE.Mesh(new THREE.BoxGeometry(25,15,40),new THREE.MeshPhongMaterial({
								color: 'blue',
								transparent: true,
								opacity: 0.6,
			}));
			body2.position.set(-10,27.5,0);
			body.add(body2);
			
			///wheel
			let loader = new THREE.TextureLoader();
			let icon = loader.load('https://i.imgur.com/NYrVIBc.png');
			wheelgroup = new THREE.Group();
			
			wheel = new THREE.Mesh (new THREE.CircleGeometry(6,32), 
					new THREE.MeshBasicMaterial({
						color : 'white',
						map:icon,
						side: THREE.DoubleSide,
					}));
			//wheel.rotation.y = Math.PI/2;
			wheel2 = wheel.clone();
			wheel3 = wheel.clone();
			wheel4 = wheel.clone();
			
			wheel.position.set(15,0,20);
			wheel2.position.set(45,0,20);
			wheel3.position.set(15,0,-20);
			wheel4.position.set(45,0,-20);
			
			wheelgroup.add(wheel,wheel2,wheel3,wheel4);
			wheelgroup.position.set(-30,6,0);
			
			
			car.add(body,body2,wheelgroup);
			//car.position.y = 10;
			//car.rotation.y = Math.PI/2;
			return car;
	}
	
	function obstacleMash(size){
		obs = new THREE.Mesh(new THREE.CylinderGeometry(size,size,10,20),
				new THREE.MeshBasicMaterial({color : 'black'}));
		
		return obs;
	}