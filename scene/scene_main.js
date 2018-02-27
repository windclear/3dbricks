var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var bricks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Brick.new(game, p)
        bricks.push(b)
    }
    return bricks
}

class SceneMain extends GuaScene {
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
        this.shadowLight = new THREE.PointLight(0xffffff, 1)
        this.shadowLight.position.set(20, 30, 70)
        // 开启该灯光的阴影效果
        this.shadowLight.castShadow = true
       // 设置该灯光的阴影的质量
        // this.pointLight.shadow.mapSize.width = 1024
        // this.pointLight.shadow.mapSize.height = 1024

        this.board = Board.new(game)
        this.ball = Ball.new(game)
        this.paddle = Paddle.new(game)
        this.bricks = loadLevel(game, 1)

        // this.scene3d.add(this.hemisphereLight)
        this.scene3d.add(this.ambientLight)
        this.scene3d.add(this.shadowLight)
        this.addElement(this.board)
        this.addElement(this.ball)
        this.addElement(this.paddle)
        for (let b of this.bricks) {
            this.addElement(b)
        }
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.paddle.moveLeft()
            s.ball.moveLeft()
        })
        g.registerAction('left', function(){
            s.paddle.moveLeft()
            s.ball.moveLeft()
        })
        g.registerAction('d', function(){
            s.paddle.moveRight()
            s.ball.moveRight()
        })
        g.registerAction('right', function(){
            s.paddle.moveRight()
            s.ball.moveRight()
        })
        g.registerAction('mouse', function(){
            s.ball.fire()
        })
        g.registerAction('touch', function(){
            s.ball.fire()
        })
    }
    update() {
        super.update()
        let game = this.game
        if (!this.ball.alive) {
            // 跳转到 游戏结束 的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }

        // 判断相撞
        let r = this.ball.collide(this.paddle)
        if (r != 0) {
            this.ball.反弹(r)
        }
        for (let b of this.bricks) {
            let r = b.collide(this.ball)
            if (r != 0) {
                b.kill()
                this.ball.反弹(r)
            }
        }
    }
}
