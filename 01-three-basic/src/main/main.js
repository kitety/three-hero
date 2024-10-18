import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
console.log('OrbitControls', OrbitControls)
// 目标：使用控制器查看3d物体

// 创建场景
const scene = new Three.Scene()
// 创建相机
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
// 添加不添加都可以
// scene.add(camera)

// 添加一个物体
// 创建几何体
const cubeGeometry = new Three.BoxGeometry(1, 1, 1);
// 材质
const cubeMaterial = new Three.MeshBasicMaterial({ color: 0xffff00 })
//根据几何体和材质创建物体
const cube = new Three.Mesh(cubeGeometry, cubeMaterial)
// 将几何体添加到场景
scene.add(cube);

//初始化渲染器
const renderer = new Three.WebGLRenderer()
//设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
console.log('renderer', renderer)

// 将webgl canvas内容添加到body
document.body.appendChild(renderer.domElement)

// //使用渲染器，通过相机将场景渲染出来
// renderer.render(scene, camera)
// 用渲染函数渲染

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 添加坐标轴辅助器
const axesHelper=new Three.AxesHelper(5);
scene.add(axesHelper)


//渲染函数
const render = () => {
  renderer.render(scene, camera)
  // 渲染下一帧的时候执行渲染
  requestAnimationFrame(render)
}
render()




