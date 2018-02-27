class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.width = 800
        this.height = 600
        // events
        this.actions = {}
        this.keydowns = {}
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event) {
            self.keydowns[event.key] = false
        })
        window.addEventListener('mousedown', event => {
            this.keydowns['mouse'] = true
        })
        window.addEventListener('mouseup', function(event) {
            self.keydowns['mouse'] = false
        })
        window.addEventListener('touchstart', event => {
            this.keydowns['touch'] = true
        })
        window.addEventListener('touchend', function(event) {
            self.keydowns['touch'] = false
        })
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function(event) {
                let leftToRight = event.gamma
                if (leftToRight > 0) {
                    self.keydowns['left'] = true
                    self.keydowns['right'] = false
                } else if (leftToRight < 0) {
                    self.keydowns['left'] = false
                    self.keydowns['right'] = true
                } else {
                    self.keydowns['left'] = false
                    self.keydowns['right'] = false
                }
            })
        }
        this.__init()
    }
    __init() {
        // 创建一个具有透视效果的摄像头
        let camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 800)
        // 设置摄像机位置，并将其朝向场景中心
        camera.position.x = 0
        camera.position.y = -73
        camera.position.z = 100
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        this.camera = camera
        // let controls = new THREE.OrbitControls(camera)

        // 创建一个 WebGL 渲染器
        let renderer = new THREE.WebGLRenderer()
        // 将渲染器的输出（此处是 canvas 元素）插入到 body
        document.body.appendChild(renderer.domElement)
        // 设置渲染器的清除颜色（即背景色）和尺寸
        renderer.setClearColor(0xffffff)
        renderer.setSize(this.width, this.height)
        renderer.shadowMap.enabled = true
        this.renderer = renderer
        let self = this
        // 加载字体
        let fontLoader = new THREE.FontLoader()
        fontLoader.load('utils/Dekar_Regular.json', function (font) {
            self.font = font
            self.__start()
        })
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    unRegisterAllAction() {
        this.actions = {}
    }
    runloop() {
        // log(window.fps)
        // events
        let g = this
        let actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        g.update()
        g.draw()
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }
    textureByName(name) {
        var g = this
        // log('texture by name', g.images)
        var img = g.images[name]
        return img
    }
    imageByName(name) {
        var g = this
        log('image by name', g.images)
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        scene.setupInputs()
        // 开始运行程序
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }
    replaceScene(scene) {
        this.unRegisterAllAction()
        this.scene = scene
        scene.setupInputs()
    }
    __start() {
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
}
