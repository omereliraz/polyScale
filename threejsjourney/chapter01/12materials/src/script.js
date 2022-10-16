import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Color, Group } from 'three'
import * as dat from 'lil-gui'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

// debug ui
const gui = new dat.GUI()



// textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Materials

// basic material
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color.set('#ff9f82')
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// normal material
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true

// matcap material
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// depth material
// const material = new THREE.MeshDepthMaterial()

// lambert material
// const material = new THREE.MeshLambertMaterial()

// blinn phong material
// const material = new THREE.MeshPhongMaterial()
// material. shininess = 100
// material.specular = new THREE.Color('0xffff00')

// cartoony material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// standard material
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent = true

// adding envirinment map
material.envMap = environmentMapTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
//gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
//gui.add(material, 'displacementScale').min(0).max(10).step(0.0001)

// Geometries

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 164, 128),
    material
)
torus.position.x = 1.5
torus.geometry.setAttribute(
    'uv2', 
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

scene.add(sphere, torus)

// object groups for each model type and its resolutions
const objectA = new THREE.Group()
const objectB = new THREE.Group()
const objectC = new THREE.Group()


// Load stl files
const loader = new STLLoader()

// loader.load(
//     '/models/Bunny/bunny7.stl',
//     function (geometry) {

//         console.log(geometry)
//         console.log(geometry.attributes.normal.array)
                
//         geometry.scale(0.025, 0.025, 0.025)
//         geometry.rotateX(Math.PI / 2)
//         geometry.rotateX(Math.PI)

//         let loadedMesh = new THREE.Mesh(geometry, material)
//         loadedMesh.position.z = 0.5
//         scene.add(loadedMesh)
//         console.log('added')
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
//     },
//     (error) => {
//         console.log(error)
//     }
// )

// object selection event
window.addEventListener('keydown', (event) =>
{
    if (event.defaultPrevented)
    {
        return; // Do nothing if event already handled
    }
    //console.log(event.code)
    switch(event.code)
    {
        case "KeyA":
            loader.load(
                '/models/Bunny/bunny1.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
                    
                    // orientate the object
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.clear()
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "KeyB":
            loader.load(
                '/models/Bust/bust1.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectB.clear()
                    objectB.add(loadedMesh)
                    scene.clear()
                    scene.add(objectB)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "KeyC":
            loader.load(
                '/models/Frog/frog1.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectC.clear()
                    objectC.add(loadedMesh)
                    scene.clear()
                    scene.add(objectC)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit4":
            loader.load(
                '/models/Bunny/bunny4.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit5":
            loader.load(
                '/models/Bunny/bunny5.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit6":
            loader.load(
                '/models/Bunny/bunny6.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit7":
            loader.load(
                '/models/Bunny/bunny7.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit8":
            loader.load(
                '/models/Bunny/bunny8.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit9":
            loader.load(
                '/models/Bunny/bunny9.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 

    }
    console.log(arrowControls.x, arrowControls.y, arrowControls.z)
})


// Load stl files using number pad with corresponding resolution
window.addEventListener('keydown', (event) =>
{

    if (event.defaultPrevented)
    {
        return; // Do nothing if event already handled
    }
    //console.log(event.code)
    switch(event.code)
    {
        case "Digit1":
            loader.load(
                '/models/Bunny/bunny1.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
                    
                    // orientate the object
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit2":
            loader.load(
                '/models/Bunny/bunny2.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            // console.log('arrowDown')
            break; 
        case "Digit3":
            loader.load(
                '/models/Bunny/bunny3.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit4":
            loader.load(
                '/models/Bunny/bunny4.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit5":
            loader.load(
                '/models/Bunny/bunny5.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit6":
            loader.load(
                '/models/Bunny/bunny6.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit7":
            loader.load(
                '/models/Bunny/bunny7.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit8":
            loader.load(
                '/models/Bunny/bunny8.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 
        case "Digit9":
            loader.load(
                '/models/Bunny/bunny9.stl',
                function (geometry) {
                    //console.log(scene)
                    //console.log(geometry)
                    //console.log(geometry.attributes.normal.array)   
                    geometry.scale(0.025, 0.025, 0.025)
                    geometry.rotateX(Math.PI / 2)
                    geometry.rotateX(Math.PI)
            
                    const loadedMesh = new THREE.Mesh(geometry, material)
                    loadedMesh.position.z = 0.5
                    loadedMesh.position.z = 0.5

                    objectA.clear()
                    objectA.add(loadedMesh)
                    scene.add(objectA)
                    console.log('added1')
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
            break; 

    }
    console.log(arrowControls.x, arrowControls.y, arrowControls.z)
})



// lights
const ambientLight= new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Control camera with arrow keys
const ratationSpeed = 0.1
const arrowControls = {
    x: 0,
    y: 0,
    z: 0
}

window.addEventListener('keydown', (event) =>
{
    if (event.defaultPrevented)
    {
        return; // Do nothing if event already handled
    }
    switch(event.code)
    {
        case "ArrowUp":
            arrowControls.y += ratationSpeed
            arrowControls.z -= ratationSpeed 
            // console.log('arrowDown')
            break; 
        case "ArrowDown":
            arrowControls.y -= ratationSpeed
            arrowControls.z += ratationSpeed 
            // console.log('arrowDown')
            break; 
        case "ArrowLeft":
            arrowControls.x -= ratationSpeed
            arrowControls.z += ratationSpeed 
            // console.log('arrowDown')
            break; 
        case "ArrowRight":
            arrowControls.x += ratationSpeed
            arrowControls.z -= ratationSpeed 
            // console.log('arrowDown')
            break; 
    }
    console.log(arrowControls.x, arrowControls.y, arrowControls.z)
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update camera
    camera.position.x = Math.sin(arrowControls.x) * 3
    camera.position.y = Math.cos(arrowControls.y) * 3
    camera.position.z = Math.cos(arrowControls.x) * 3
    //camera.position.y = cursor.y * 3
    camera.lookAt(0, 0, 0)

    // Update objects rotation
    sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = -0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime


    // Update controls
    //controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()