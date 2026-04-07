// Import Three.js (ensure you have it installed or linked)
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting so the train is visible
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040)); // Soft white light
let train;
const loader = new GLTFLoader();

loader.load('path_to_your_train_model.glb', (gltf) => {
    train = gltf.scene;
    scene.add(train);
    train.position.set(-10, 0, 0); // Start off-screen to the left
}, undefined, (error) => {
    console.error(error);
});

camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);

    if (train) {
        // Horizontal movement (sideways)
        train.position.x += 0.05;

        // Reset position when train goes off-screen
        if (train.position.x > 10) {
            train.position.x = -10;
        }

        // Up and down movement
        train.position.y = Math.sin(Date.now() * 0.001) * 2; // Moves up and down
    }

    renderer.render(scene, camera);
}
animate();
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
