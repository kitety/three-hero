import gsap from 'gsap';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// console.log('OrbitControls', OrbitControls)
// 目标：调用js接口控制画布全屏和退出全屏

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
const controls = new OrbitControls(camera, renderer.domElement);
// 开启阻尼
controls.enableDamping = true
// 阻尼系数
controls.dampingFactor = 0.01
// 添加坐标轴辅助器
const axesHelper = new Three.AxesHelper(5);
scene.add(axesHelper)

// 设置始终
const clock = new Three.Clock()

// gsap设置动画 位置
const animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: 'power1.out',
  repeat: -1,
  onRepeat: () => {
    console.log('动画重复')
  },
  yoyo: true,
})
// gsap设置动画 旋转
gsap.to(cube.rotation, {
  x: Math.PI * 2,
  duration: 5,
  ease: 'power1.out',
  repeat: -1,
  onRepeat: () => {
    console.log('动画重复')
  },
  yoyo: true,
})
window.addEventListener('dblclick', () => {
  // 全屏
  if (!document.fullscreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
  if (animate1.isActive()) {
    animate1.pause()
  } else {
    animate1.resume()
  }
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
  controls.update()
}
render()

// 监听窗口尺寸变化
window.addEventListener('resize', () => {
  const width = window.innerWidth
  const height = window.innerHeight
  // 更新摄像头
  camera.aspect = width / height
  // 更新摄像头投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(width, height)
  //设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})



