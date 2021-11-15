// import * as THREE from "./node_modules/three/build/three.module";

let container, stats;

let camera, scene, renderer;
let controls;

init();

function init() {
  //ここは必要になってから記述してもいい。
  container = document.createElement("div");
  document.body.appendChild(container);

  //カメラ
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerWidth,
    1,
    15000
  );
  camera.position.z = 250; //カメラの位置を手前に持ってくる

  //シーン
  scene = new THREE.Scene();
  //背景色の追加
  scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
  //霧を追加
  scene.fog = new THREE.Fog(scene.background, 3500, 15000);

  //座標軸の表示
  //   const axesHelper = new THREE.AxesHelper(5);
  //   scene.add(axesHelper);

  //world

  const size = 250;

  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0xffffff, //鏡面反射
    shininess: 50, //光度
  }); //光沢のある表面を表現できる

  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material);

    //メッシュの位置と回転
    mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
    mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.matrixAutoUpdate = false; //行列自動更新を解除.再計算されるのを制御するため。
    mesh.updateMatrix(); //手動で行列を更新する。

    scene.add(mesh);
  }

  //lights
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.05); //特定の方向に放射される光。平行光線。
  dirLight.position.set(0, -1, 0).normalize();
  dirLight.color.setHSL(0.1, 0.7, 0.5); //h,s,l = 色相, 彩度, 輝度:https://www.peko-step.com/html/hsl.html
  scene.add(dirLight);

  //lensflares

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
}
