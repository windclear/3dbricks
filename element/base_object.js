class BaseObject {
    constructor(game) {
        this.game = game
    }
    static new(...args) {
        return new this(...args)
    }
    update() {

    }
    setPositon(x, y, z) {
        this.mesh.position.set(x, y, z)
    }
    collide(other) {
        let r1 = {
            x: this.mesh.position.x,
            y: this.mesh.position.y,
            w: this.w,
            h: this.h,
        }
        let r2 = {
            x: other.mesh.position.x,
            y: other.mesh.position.y,
            w: other.w,
            h: other.h,
        }
        return rectIntersects(r1, r2)
    }

}
