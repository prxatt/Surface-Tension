import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, stars = [];

init();
animate();

function init() {
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Create stars
  for (let i = 0; i < 5000; i++) {
    let geometry = new THREE.SphereGeometry(0.1, 24, 24);
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let star = new THREE.Mesh(geometry, material);

    star.position.set(
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000,
      (Math.random() - 0.5) * 1000
    );
    scene.add(star);
    stars.push(star);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Text glitch effect
  const text = document.getElementById('surface-text');
  const originalText = text.innerText;

  text.addEventListener('mouseover', () => {
    text.innerText = '01010011 01010101 01010010 01000110';
  });

  text.addEventListener('mouseout', () => {
    text.innerText = originalText;
  });

  text.addEventListener('click', () => {
    stars.forEach(star => {
      gsap.to(star.position, {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: Math.random() * 10 - 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
