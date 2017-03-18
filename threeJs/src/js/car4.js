if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
let rendererdemo = null;
let scenedemo = null;
let camerademo = null;
let controlsdemo;
function init4(){
    //初始化WebGL画布
    rendererdemo = new THREE.WebGLRenderer({
        antialias:true,
        precision:"highp",
        canvas: document.getElementById('mainCanvas4')
    });
    rendererdemo.setClearColor(0xffffff,0.3);
    rendererdemo.shadowMapEnabled = true;

    //初始化场景
    scenedemo=new THREE.Scene();

    //初始化相机
    camerademo=new THREE.PerspectiveCamera(45,4/3,1,1000);
    camerademo.position.set(28,28,40);
    camerademo.lookAt(new THREE.Vector3(0,0,0));
    scenedemo.add(camerademo);

    //实现交互控制照相机位置------------------
    controlsdemo = new THREE.TrackballControls( camerademo );

    controlsdemo.rotateSpeed = 2.0;//旋转速度
    controlsdemo.zoomSpeed = 1.2;//加大速度
    controlsdemo.panSpeed = 0.8;//平移速度

    controlsdemo.noZoom = false;
    controlsdemo.noPan = false;

    controlsdemo.staticMoving = true;
    controlsdemo.dynamicDampingFactor = 0.3;//动态阻尼因素

    controlsdemo.keys = [ 65, 83, 68 ];

    controlsdemo.addEventListener( 'change', render );
    controlsdemo.addEventListener( 'change', render );

    window.addEventListener( 'resize', onWindowResize, false );
    //----------------------------

    //添加纹理
    let floor_texture = THREE.ImageUtils.loadTexture('src/images/floor.jpg', {}, function() {
        rendererdemo.render(scenedemo, camerademo);
    });
    let body_texture = THREE.ImageUtils.loadTexture('src/images/body11.jpg', {}, function() {
        rendererdemo.render(scenedemo, camerademo);
    });
    let wheel_texture = THREE.ImageUtils.loadTexture('src/images/wheel.jpg', {}, function() {
        rendererdemo.render(scenedemo, camerademo);
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
    //初始化物体------------------------
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
    scenedemo.add(cube);
    scenedemo.add(tors1);
    scenedemo.add(tors2);
    scenedemo.add(tors3);
    scenedemo.add(tors4);
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 16, 16),floor_material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -9;
    plane.receiveShadow = true;
    scenedemo.add(plane);
    let cube2=new THREE.Mesh(new THREE.CubeGeometry(5,5,5),body_material);
    cube2.position.set(18,-5,14);
    cube2.castShadow = true;
    scenedemo.add(cube2);
    //-----------------------------------

    //初始化灯光
    let light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
    light.target = cube;
    light.castShadow = true;
    light.position.set(-10,45,40);
    scenedemo.add(light);
    //ambient light
    let ambient = new THREE.AmbientLight(0x666666);
    scenedemo.add(ambient);

    rendererdemo.render(scenedemo,camerademo);

}
function onWindowResize() {
    camerademo.aspect = 400 / 350;
    camerademo.updateProjectionMatrix();
    rendererdemo.setSize( 400, 350);
    controlsdemo.handleResize();
    render();
}
function animatedemo() {
    requestAnimationFrame( animatedemo );
    controlsdemo.update();
}
function render() {
    rendererdemo.render( scenedemo, camerademo );
}