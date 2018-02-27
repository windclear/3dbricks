class Text extends BaseObject {
    constructor(game, text) {
        super(game)
        let textOptions = {
          font: game.font,
          size: 10,
          height: 2,
        }
        this.geometry = new THREE.TextGeometry(text, textOptions)
        this.material = new THREE.MeshLambertMaterial( {color: 0xffff00} )
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.castShadow = true
    }
}
