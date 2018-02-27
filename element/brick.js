class Brick extends BaseObject {
    constructor(game, p) {
        super(game)
        this.w = 9
        this.h = 4
        this.geometry = new THREE.BoxGeometry(this.w, this.h, 2)
        this.material = new THREE.MeshLambertMaterial({color: p[2]})
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true
        this.mesh.position.x = p[0] * 10 - 50 + 5
        this.mesh.position.y = 50 - p[1] * 8 - 5
        this.mesh.position.z = 1
        this.alive = true
    }
    kill() {
        this.alive = false
        this.game.scene.remove(this)
    }
    collide(other) {
        if (this.alive) {
            return super.collide(other)
        } else {
            return 0
        }
    }
}
