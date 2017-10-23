// 1.设置three.js渲染器
// (0) 声明全局变量（对象）；
// (1) 获取画布「canvas-frame」的高宽；
// (2) 生成渲染器对象（属性：抗锯齿效果为设置有效）；
// (3) 指定渲染器的高宽（和画布框大小一致）；
// (4) 追加 【canvas】 元素到 【canvas3d】 元素中；
// (5) 设置渲染器的清除色(clearColor)。
//开启Three.js渲染器
var renderer;

function initThree() {
    width = document.getElementById('canvas3d').clientWidth; //获取画布「canvas3d」的宽
    height = document.getElementById('canvas3d').clientHeight; //获取画布「canvas3d」的高
    renderer = new THREE.WebGLRenderer({
        antialias: true
    }); //生成渲染器对象（属性：抗锯齿效果为设置有效）
    renderer.setSize(width, height); //指定渲染器的高宽（和画布框大小一致）
    document.getElementById('canvas3d').appendChild(renderer.domElement); //追加 【canvas】 元素到 【canvas3d】 元素中。
    renderer.setClearColor(0XFFFFF0, 1.0); //设置canvas背景色(clearColor)
}
// 2.设置摄像机camera
// (0) 声明全局的变量（对象）；
// (1) 设置透视投影的相机；
// (2) 设置相机的位置坐标；
// (3) 设置相机的上为「z」轴方向；
// (4) 设置视野的中心坐标。

//2.设置相机
var camera;
//OrthographicCamera( left, right, top, bottom, near, far )正投影相机,
//PerspectiveCamera( fov, aspect, near, far )透视投影相机
function initCamera() {
    //设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
    camera.position.x = 0; //设置相机的位置坐标
    camera.position.y = 50; //设置相机的位置坐标
    camera.position.z = 100; //设置相机的位置坐标
    camera.up.x = 0; //设置相机的上为「x」轴方向
    camera.up.y = 1; //设置相机的上为「y」轴方向
    camera.up.z = 0; //设置相机的上为「z」轴方向
    camera.lookAt({
        x: 0,
        y: 0,
        z: 0
    }); //设置视野的中心坐标
}
// 3.设置场景scene
var scene;

function initScene() {
    scene = new THREE.Scene();
}
// 4.设置光源light
// (0) 声明全局变量(对象)
// (1) 设置平行光源
// (2) 设置光源向量
// (3) 追加光源到场景
　
var light;
//AmbientLight( hex )环境光
//PointLight( color, intensity, distance )颜色 强度(1对应100%) 距离
//SpotLight( hex, intensity, distance, angle, exponent )聚光灯着色的角度 衰减参数
//DirectionalLight (hex,intensity)
function initLight() {
    light = new THREE.DirectionalLight(0xff0000, 1.0, 0); //设置平行光源
    light.position.set(200, 200, 200); //设置光源向量
    scene.add(light); // 追加光源到场景
}
// 5.设置物体object
　
var sphere;

function initObject() {
    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(20, 20), //width,height,depth
        new THREE.MeshLambertMaterial({
            color: 0xff0000
        }) //材质设定
    );
    scene.add(sphere);
    sphere.position.set(0, 0, 0);
}
// 主函数
//执行
function threeStart() {
    initThree(); //设置渲染器
    initCamera(); //设置相机
    initScene(); //设置场景
    initLight(); //设置光源
    initObject(); //设置物体
    renderer.clear();
    renderer.render(scene, camera);
}

//纹理
// THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
// image:var image = THREE.ImageUtils.loadTexture(url);
// Mapping：是一个THREE.UVMapping()类型，它表示的是纹理坐标。
// wrapS：表示x轴的纹理的回环方式，就是当纹理的宽度小于需要贴图的平面的宽度的时候，平面剩下的部分应该p以何种方式贴图的问题
// wrapT：表示y轴的纹理回环方式。
// magFilter和minFilter表示过滤的方式
// format：表示加载的图片的格式，这个参数可以取值THREE.RGBAFormat，RGBFormat等。
// type：表示存储纹理的内存的每一个字节的格式
// anisotropy：各向异性过滤

// Canvas可以作为纹理传递给THREE.Texture函数，纹理的构造函数是：
// THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
// var material = new THREE.MeshBasicMaterial({map:texture});

// Mesh就是一个网格表面，它代表着我们渲染到3D世界中的各种模型。其构造函数如下：
// THREE.Mesh = function ( geometry, material )
// 它接受2个参数，一个是几何体，一个是材质。