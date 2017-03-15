/**
 * Created by zhangxiaoshuang on 2017/3/15.
 */
function init(){
    //初始化画布（渲染器）
    let renderer = new THREE.WebGLRenderer({
        canvas : document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0xF2F2F2);
    //初始化场景
    let scene = new THREE.Scene();
    //初始化相机
    let camera = new THREE.OrthographicCamera(-10,10, 8.5, -8.5, 1, 10);
    camera.position.set(5, 1, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
//        camera = new THREE.PerspectiveCamera(90, 4 / 3, 1, 700);   // 创建
//        camera.position.set(5, 3, 5);   //设置相机摆放姿势
//        camera.lookAt(new THREE.Vector3(0, 0, 0));  // 设置相机蹲点位置

    //添加自然光
    let light = new THREE.PointLight(0xffffff, 2, 100);
    light.position.set(20, 30,40 );
    scene.add(light);

    scene.add(camera);
    //初始化物体，并初始化材质
    //初始化车体--------------------
    let mesh =new THREE.MeshLambertMaterial({
        color: 0xD2D2D2,
//            opacity: 0.75
    });
    let rect = new THREE.CubeGeometry(8, 4, 4);
    let carBody = new THREE.Mesh(rect,mesh);
    scene.add(carBody);

    //初始化轮子1------------------------
    let circle = new THREE.TorusGeometry(1, 0.3, 12, 18);
    let wheel1 = new THREE.Mesh(circle,mesh);
    wheel1.position.set(-2, -2, 2);
    scene.add(wheel1);

    //初始化轮子2------------------------
    let wheel2 = new THREE.Mesh(circle,mesh);
    wheel2.position.set(2, -2, 2);
    scene.add(wheel2);

    //初始化轮子3------------------------
    let wheel3 = new THREE.Mesh(circle,mesh);
    wheel3.position.set(-2, -2, -2);
    scene.add(wheel3);

    //初始化轮子4------------------------
    let wheel4 = new THREE.Mesh(circle,mesh);
    wheel4.position.set(2, -2, -2);
    scene.add(wheel4);

    //渲染
    renderer.render(scene, camera);
}