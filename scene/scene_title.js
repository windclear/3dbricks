class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        // this.setupInputs()
    }
    setup() {
        let game = this.game
        // 创建 环境光
        this.ambientLight = new THREE.AmbientLight(0x777777)
        // 创建点光源
        this.shadowLight = new THREE.PointLight(0xffffff, 0.8)
        this.shadowLight.position.set(20, 30, 70)
        // 开启该灯光的阴影效果
        this.shadowLight.castShadow = true
       // 设置该灯光的阴影的质量
        // this.pointLight.shadow.mapSize.width = 1024
        // this.pointLight.shadow.mapSize.height = 1024

        this.board = Board.new(game)
        this.paddle = Paddle.new(game)
        this.ball = Ball.new(game)

        this.text1 = Text.new(game, '3D BRICKS')
        this.text1.setPositon(-25, -20, 30)

        // this.scene3d.add(this.hemisphereLight)
        this.scene3d.add(this.ambientLight)
        this.scene3d.add(this.shadowLight)
        this.addElement(this.board)
        this.addElement(this.paddle)
        this.addElement(this.ball)
        this.addElement(this.text1)
    }
    setupInputs() {
        let g = this.game
        g.registerAction('mouse', function(){
            let s = SceneMain.new(g)
            g.replaceScene(s)
        })
        g.registerAction('touch', function(){
            let s = SceneMain.new(g)
            g.replaceScene(s)
        })
    }
}
