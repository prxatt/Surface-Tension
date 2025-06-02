/* script.js */
// Register GSAP plugins for advanced text animations (ScrambleText, etc.):contentReference[oaicite:5]{index=5}
gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

// **Three.js Setup:** create scene, camera, and renderer for a 3D starfield background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 1000);
camera.position.z = 50; // Move camera back to view the text
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('star-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// **Starfield:** create thousands of white points randomly positioned in space
const starsGeometry = new THREE.BufferGeometry();
const starCount = 10000;
const starVertices = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  // Spread stars within a cube of side ~100
  starVertices[i*3 + 0] = (Math.random() - 0.5) * 100; // x
  starVertices[i*3 + 1] = (Math.random() - 0.5) * 100; // y
  starVertices[i*3 + 2] = (Math.random() - 0.5) * 100; // z
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starVertices, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// **Lighting:** ambient light so 3D text is visible
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// **3D Text:** load a font and create "Surface Tension" text geometry:contentReference[oaicite:6]{index=6}
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
    const textGeometry = new THREE.TextGeometry('Surface Tension', {
        font: font,
        size: 5,
        height: 1,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.5,
        bevelSegments: 2,
        curveSegments: 12
    });
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    // Center the text (approximate)
    textMesh.position.set(-25, 0, 0);
    scene.add(textMesh);
});

// **Resize Handling:** adjust camera and renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// **Animation Loop:** continuously render scene; slowly rotate the starfield for subtle motion
function animate() {
    requestAnimationFrame(animate);
    starField.rotation.y += 0.0005; // slow rotation for 3D effect
    renderer.render(scene, camera);
}
animate();

// **Hover Effect:** when hovering over the text, scramble it into binary using GSAP ScrambleText:contentReference[oaicite:7]{index=7}
const surfaceText = document.getElementById('surface-text');
surfaceText.addEventListener('mouseenter', () => {
    gsap.to(surfaceText, {
        duration: 1,
        scrambleText: { text: '0101010001101111...', chars: '01', revealDelay: 0, speed: 0.5 }
        /* Example: animate to a string of 0/1. (Use the full binary ASCII of "Surface Tension" here.) */
    });
});
surfaceText.addEventListener('mouseleave', () => {
    gsap.to(surfaceText, {
        duration: 1,
        scrambleText: { text: 'Surface Tension', chars: '01', revealDelay: 0.5, speed: 0.3 }
    });
});

// **Click Effect:** when clicking the text, animate the starfield (e.g. spin faster)
// This is a placeholder for the “stars move into text” effect; here we simply do a quick rotation
surfaceText.addEventListener('click', () => {
    gsap.to(starField.rotation, { duration: 2, y: starField.rotation.y + 6.28, ease: "power2.inOut" });
});

// **Background Music:** play a looping sci-fi synth track using Howler.js:contentReference[oaicite:8]{index=8}
const music = new Howl({
    src: ['https://example.com/path/to/sci-fi-music.mp3'], // <-- Replace with actual royalty-free track URL
    autoplay: false,
    loop: true,
    volume: 0.5
});
music.play();
