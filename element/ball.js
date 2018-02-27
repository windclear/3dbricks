class Ball extends BaseObject {
    constructor(game) {
        super(game)
        this.w = 2
        this.h = 2
        this.geometry = new THREE.SphereGeometry(1)
        this.material = new THREE.MeshLambertMaterial( {color: 0xffff00} )
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.position.x = 0
        this.mesh.position.y = -40
        this.mesh.position.z = 1
        this.fired = false
        this.speedX = 1
        this.speedY = 1
        this.speed = 3
        this.alive = true
    }
    反弹(c) {
        if (c == 1) {
            this.speedY *= -1
        } else {
            this.speedX *= -1
        }

    }
    fire() {
        this.fired = true
    }
    move(x) {
        if (this.fired) {
            return
        }
        if (x < -(50 - 10)) {
            x = -(50 - 10)
        }
        if (x > 50 - 10) {
            x = 50 - 10
        }
        this.mesh.position.x = x
    }
    moveLeft() {
        this.move(this.mesh.position.x - this.speed)
    }
    moveRight() {
        this.move(this.mesh.position.x + this.speed)
    }
    update() {
        if (this.fired) {
            let x = this.mesh.position.x
            let y = this.mesh.position.y
            if (y < -45) {
                this.alive = false
                return
            }
            if (x < -49 || x > 49) {
                this.speedX = -this.speedX
            }
            if (y < -49 || y > 49) {
                this.speedY = -this.speedY
            }
            x += this.speedX
            y += this.speedY
            this.mesh.position.x = x
            this.mesh.position.y = y
        }
    }
}
