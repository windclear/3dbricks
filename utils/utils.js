var rectIntersects = (r1, r2) => {
    let [cR1x, cR1y] = [r1.x, r1.y]
    let [cR2x, cR2y] = [r2.x, r2.y]
    let dx = (r1.w + r2.w) / 2 - Math.abs(cR1x - cR2x)
    let dy = (r1.h + r2.h) / 2 - Math.abs(cR1y - cR2y)
    if (dx < 0 || dy < 0) {
        return 0
    } else {
        if (dx > dy) {
            return 1
        } else {
            return 2
        }
    }
}
