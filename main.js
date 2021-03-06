import './style.css';
import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lighting

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Stars

function createStar() {
    const starTexture = new THREE.TextureLoader().load('assets/star.jpg');
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ map: starTexture });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    return star;
}
const stars = Array(200).fill().map(createStar);
stars.forEach((star) => scene.add(star));

// Background

const spaceTexture = new THREE.TextureLoader().load('assets/space.png');
scene.background = spaceTexture;

// Scroll Animation

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * 0.02;
    camera.position.x = t * 0.0004;
    camera.rotation.y = t * 0.0004;

    renderer.render(scene, camera);
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);

    stars.forEach((star) => star.rotation.y += 0.005);

    renderer.render(scene, camera);
}

animate();

$(window).resize(
    function() {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer.render(scene, camera);
    }
);