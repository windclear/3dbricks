var __main = function() {
    let images = []
    var game = GuaGame.instance(60, images, function(g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
}

__main()
