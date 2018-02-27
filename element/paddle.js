class Paddle extends BaseObject {
    constructor(game) {
        super(game)
        this.w = 20
        this.h = 1
        this.geometry = new THREE.BoxGeometry(this.w, this.h, 2)
        this.material = new THREE.MeshLambertMaterial({color: 0x59332e})
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.position.x = 0
        this.mesh.position.y = -42
        this.mesh.position.z = 1
        this.speed = 3
    }
    move(x) {
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
}
