class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.scene3d = new THREE.Scene()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(ele) {
        this.elements.push(ele)
        this.scene3d.add(ele.mesh)
    }
    remove(ele) {
        this.scene3d.remove(ele.mesh)
    }
    draw() {
        this.game.renderer.render(this.scene3d, this.game.camera)
    }
    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
