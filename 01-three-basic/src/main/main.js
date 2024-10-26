import gsap from 'gsap';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// console.log('OrbitControls', OrbitControls)
// 目标：gsap 动画

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

// 修改物体位置
// 方法
// cube.position.set(5,0,0)
// 属性
// cube.position.x = 5
// 缩放
// cube.scale.set(3,2,1)
// cube.scale.x = 3
// 旋转
// cube.rotation.set(Math.PI/8, 0, 0)


// 将几何体添加到场景
scene.add(cube);
console.log('cube', cube)

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
const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper)

// 设置始终
const clock = new Three.Clock()

// gsap设置动画 位置
gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'power1.out',
  repeat: -1,
})
// gsap设置动画 旋转
gsap.to(cube.rotation, {
  x: Math.PI * 2,
  duration: 5,
  ease: 'power1.out',
  repeat: -1,
})

//渲染函数
const render = (time) => {
  // console.log('time', time)
  // 每次render都运动
  // cube.position.x += 0.01
  // cube.rotation.x += 0.01// 逆时针，右手
  // if (cube.position.x > 5) {
  //   cube.position.x = 0
  // }


  // 秒,路程=时间*速度，避免时快时慢
  // let t = time / 1000
  // cube.position.x = (t * 1) % 5;

  // 获取时钟运行的总时长
  // const t = clock.getElapsedTime()// 会设置oldTime
  // cube.position.x = (t * 1) % 5;

  // 获取间隔时间
  // const deltaT = clock.getDelta()// 会设置oldTime
  // console.log('两次获取间隔时间', deltaT, 1 / deltaT)
  // cube.position.x += (deltaT * 1);
  // if (cube.position.x > 5) {
  //   cube.position.x = 0
  // }


  renderer.render(scene, camera)
  // 渲染下一帧的时候执行渲染
  requestAnimationFrame(render)
}
render()




