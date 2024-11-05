import * as dat from 'dat.gui';
import gsap from 'gsap';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// console.log('OrbitControls', OrbitControls)
// 目标：透明纹理
// 黑色透明，白色不透明

// 创建场景
const scene = new Three.Scene()
// 创建相机
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.0001, 1000)

// 设置相机位置
camera.position.set(0, 0, 10)
// 添加不添加都可以
// scene.add(camera)
let cube;

const texture = new Three.TextureLoader()
const alphaDoorTexture = texture.load('./assets/textures/door/alpha.jpg')
const doorTexture = texture.load('./assets/textures/door/color.jpg')
// const doorTexture = texture.load('./assets/imgs/door.jpg')
// const textureM = texture.load('./assets/textures/minecraft.png')
//magFilter
// 原本4*4 展示为80*80 magFilter
// textureM.magFilter=Three.NearestFilter
// minFilter
// 原本80*80 展示为4*4 minFilter
// textureM.minFilter=Three.NearestFilter

// 纹理偏移
/**
 * 在Three.js中，纹理偏移(offset)的坐标系统是这样工作的：
纹理坐标系统的原点(0,0)在左下角
offset的正值会使纹理向相反方向移动：
offset.x 正值会使纹理向左移动
offset.y 正值会使纹理向下移动
 */
// doorTexture.offset.x=0.2
// doorTexture.offset.y=0.5

// 设置旋转
// 逆时针为正，默认原点为中心点左下角（0,0）
// doorTexture.rotation=Math.PI/4
// doorTexture.center.set(0.5,0.5)
// 设置是否重复
// doorTexture.repeat.set(2,3)
//x 重复
// doorTexture.wrapS=Three.RepeatWrapping
//y 镜像
// doorTexture.wrapT=Three.MirroredRepeatWrapping

// console.log('doorTexture', doorTexture)


const cubeGeometry = new Three.BoxGeometry(1, 1, 1)
const material = new Three.MeshBasicMaterial({
  color: '#ffff00', map: doorTexture, alphaMap: alphaDoorTexture, transparent: true,
  // opacity: 0.5,
  side: Three.DoubleSide

})
cube = new Three.Mesh(cubeGeometry, material)
scene.add(cube)

// 平面
const plane = new Three.Mesh(new Three.PlaneGeometry(1, 1), material)
plane.position.set(2, 0, 0)
scene.add(plane)



// gui
const gui = new dat.GUI()
// x
const cubeFolder = gui.addFolder('位置')
cubeFolder.add(cube.position, 'x', 0, 5).name('x轴').step(0.01).onChange((value) => {
  console.log('x轴', value)
}).onFinishChange((value) => {
  console.log('x轴结束', value)
})
cubeFolder.add(cube.position, 'y', 0, 5).name('y轴').step(0.01)
cubeFolder.add(cube.position, 'z', 0, 5).name('z轴').step(0.01)
// rotate
const rotateFolder = gui.addFolder('旋转')
rotateFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('x轴').step(0.01)
rotateFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('y轴').step(0.01)
rotateFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('z轴').step(0.01)
// color
const colorFolder = gui.addFolder('颜色')
const params = {
  color: '#ffff00',
  fn: () => {
    const animate1 = gsap.to(cube.position, {
      x: 5,
      duration: 5,
      ease: 'power1.out',
      repeat: -1,
      onRepeat: () => {
        console.log('动画重复')
      },
    })
  }
}
// 修改cube color
colorFolder.addColor(params, 'color').name('颜色').onChange((value) => {
  console.log('value', value)
  cube.material.color.set(value)
})
// 控制是否显示
const visibleFolder = gui.addFolder('是否显示')
visibleFolder.add(cube, 'visible').name('是否显示')

// 点击按钮，执行某个函数
const clickFolder = gui.addFolder('操作按钮')
clickFolder.add(params, 'fn').name('移动')
// 是否显示线框
const wireframeFolder = gui.addFolder('线框')
wireframeFolder.add(material, 'wireframe').name('是否显示线框')


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
// const animate1 = gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: 'power1.out',
//   repeat: -1,
//   onRepeat: () => {
//     console.log('动画重复')
//   },
//   yoyo: true,
// })
// // gsap设置动画 旋转
// gsap.to(cube.rotation, {
//   x: Math.PI * 2,
//   duration: 5,
//   ease: 'power1.out',
//   repeat: -1,
//   onRepeat: () => {
//     console.log('动画重复')
//   },
//   yoyo: true,
// })
window.addEventListener('dblclick', () => {
  // // 全屏
  // if (!document.fullscreenElement) {
  //   renderer.domElement.requestFullscreen()
  // } else {
  //   document.exitFullscreen()
  // }
  // if (animate1.isActive()) {
  //   animate1.pause()
  // } else {
  //   animate1.resume()
  // }
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


