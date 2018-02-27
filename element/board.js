class Board extends BaseObject {
    constructor(game) {
        super(game)
        this.mesh = new THREE.Object3D()
        let middle = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshLambertMaterial({color: 0xd8d0d1}),
        )
        middle.receiveShadow = true
        this.mesh.add(middle)
        let left = new THREE.Mesh(
            new THREE.BoxGeometry(2, 100, 6),
            new THREE.MeshLambertMaterial({color: 0xf4ce93}),
        )
        left.position.x = -51
        left.position.z = 3
        left.receiveShadow = true
        let right = left.clone()
        this.mesh.add(left)
        right.position.x = 51
        let up = new THREE.Mesh(
            new THREE.BoxGeometry(104, 2, 6),
            new THREE.MeshLambertMaterial({color: 0xf4ce93}),
        )
        up.position.y = 51
        up.position.z = 3
        this.mesh.add(right)
        this.mesh.add(up)

    }
}
