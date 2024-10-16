import * as Three from 'three';
console.log('THREE', Three)
// 目标：了解three的最基本内容

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

//使用渲染器，通过相机将场景渲染出来
renderer.render(scene,camera)



