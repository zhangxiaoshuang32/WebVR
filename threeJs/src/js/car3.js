/**
 * Created by zhangxiaoshuang on 2017/3/16.
 */
function init3(){
    //初始化WebGL画布
    let renderer = new THREE.WebGLRenderer({
        antialias:true,
        precision:"highp",
        canvas: document.getElementById('mainCanvas3')
    });
    renderer.setClearColor(0xffffff,0.3);
    renderer.shadowMapEnabled = true;

    //初始化场景
    let scene=new THREE.Scene();

    //初始化相机
    let camera=new THREE.PerspectiveCamera(45,4/3,1,1000);
    camera.position.set(28,28,40);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    //添加纹理
    let floor_texture = THREE.ImageUtils.loadTexture('src/images/floor.jpg', {}, function() {
        renderer.render(scene, camera);
    });
    let body_texture = THREE.ImageUtils.loadTexture('src/images/body11.jpg', {}, function() {
        renderer.render(scene, camera);
    });
    let wheel_texture = THREE.ImageUtils.loadTexture('src/images/wheel.jpg', {}, function() {
        renderer.render(scene, camera);
    });

    //初始化贴图材料
    let floor_material=new THREE.MeshLambertMaterial({
        map: floor_texture
    });
    let wheel_material=new THREE.MeshLambertMaterial({
        map: wheel_texture
    });
    let body_material=new THREE.MeshLambertMaterial({
        map: body_texture
    });

    //初始化物体
    let cube=new THREE.Mesh(new THREE.CubeGeometry(35,10,16),body_material);
    let tors1=new THREE.Mesh(new THREE.TorusGeometry(3,1,14,18,2*Math.PI),wheel_material);
    let tors2=new THREE.Mesh(new THREE.TorusGeometry(3,1,14,18,2*Math.PI),wheel_material);
    let tors3=new THREE.Mesh(new THREE.TorusGeometry(3,1,14,18,2*Math.PI),wheel_material);
    let tors4=new THREE.Mesh(new THREE.TorusGeometry(3,1,14,18,2*Math.PI),wheel_material);
    tors1.position.set(-10,-5,-8);
    tors2.position.set(10,-5,-8);
    tors3.position.set(-10,-5,8);
    tors4.position.set(10,-5,8);
    cube.castShadow = true;
    tors1.castShadow = true;
    tors2.castShadow = true;
    tors3.castShadow = true;
    tors4.castShadow = true;
    scene.add(cube);
    scene.add(tors1);
    scene.add(tors2);
    scene.add(tors3);
    scene.add(tors4);
    //平面
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 16, 16),floor_material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -9;
    plane.receiveShadow = true;
    scene.add(plane);

    //初始化灯光
    let light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    light.target = cube;
    light.castShadow = true;
    light.position.set(-10,45,40);
    scene.add(light);
    //ambient light
    let ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);

    //drawAxes(scene);
    renderer.render(scene,camera);

}