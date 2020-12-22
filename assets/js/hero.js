import * as THREE from "three";

class Hero {
  constructor(root_element) {
    this.root_element = root_element;
    this.aspect_ratio = 0.6;

    this.scene = new THREE.Scene();

    this.setup();
    this.run();
  }

  setup() {
    this.setup_camera();
    this.setup_renderer();

    this.add_light();
    this.add_cube();

    window.addEventListener("resize", this.on_resize.bind(this), false);
    window.addEventListener("mousemove", this.on_mouse_move.bind(this), false);
  }

  setup_camera() {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / (window.innerHeight * this.aspect_ratio),
      0.1,
      1000
    );

    this.camera.position.z = 30;
  }

  setup_renderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight * this.aspect_ratio
    );
    this.renderer.setClearColor(0x000000, 0);

    document
      .getElementById(this.root_element)
      .appendChild(this.renderer.domElement);
  }

  add_cube() {
    let radius = parseInt(window.innerHeight / 80);

    const geometry = new THREE.OctahedronGeometry(radius, 2);

    const material = new THREE.MeshPhongMaterial({
      color: 0xa78bfa,
      emissive: 0x6d28d9,
      flatShading: true,
    });

    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);
  }

  add_light() {
    this.lights = [];

    this.lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    this.lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    this.lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    this.lights[0].position.set(0, 200, 0);
    this.lights[1].position.set(100, 200, 100);
    this.lights[2].position.set(-100, -200, -100);

    this.scene.add(this.lights[0]);
    this.scene.add(this.lights[1]);
    this.scene.add(this.lights[2]);
  }

  run() {
    requestAnimationFrame(this.run.bind(this));
    this.render();
  }

  render() {
    this.cube.rotation.x += 0.005;
    this.cube.rotation.y += 0.005;

    this.renderer.render(this.scene, this.camera);
  }

  on_mouse_move(e) {
    // TODO
  }

  on_resize() {
    this.camera.aspect =
      window.innerWidth / (window.innerHeight * this.aspect_ratio);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight * this.aspect_ratio
    );
  }
}

new Hero("hero");
