import * as THREE from 'three'
import Experience from '../Experience.js'
import waterVertexShader from '../shaders/water/vertex.glsl'
import waterFragmentShader from '../shaders/water/fragment.glsl'
export default class Floor {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug;



        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(3, 3, 512, 512);
    }

    setTextures() {
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {

        const debugObject = {}

        // Colors
        debugObject.depthColor = '#186691'
        debugObject.surfaceColor = '#9bd8ff'

        // Material
        this.material = new THREE.ShaderMaterial({
            vertexShader: waterVertexShader,
            fragmentShader: waterFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },

                uBigWavesElevation: { value: 0.2 },
                uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
                uBigWavesSpeed: { value: 0.75 },

                uSmallWavesElevation: { value: 0.15 },
                uSmallWavesFrequency: { value: 3 },
                uSmallWavesSpeed: { value: 0.2 },
                uSmallIterations: { value: 4 },

                uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
                uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
                uColorOffset: { value: 0.08 },
                uColorMultiplier: { value: 5 }
            }
        })

        // Debug
        if (this.debug.active) {

            this.gui = this.debug.ui;

            this.gui.addColor(debugObject, 'depthColor').onChange(() => { this.material.uniforms.uDepthColor.value.set(debugObject.depthColor) })
            this.gui.addColor(debugObject, 'surfaceColor').onChange(() => { this.material.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor) })

            this.gui.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
            this.gui.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
            this.gui.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
            this.gui.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')


            this.gui.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
            this.gui.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
            this.gui.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
            this.gui.add(this.material.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

            this.gui.add(this.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
            this.gui.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
        }
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}