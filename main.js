

const world = await osmService().getOsmData(44.40491870319353, 8.931386063232106, 0.003);
drawWorldinCanvas(world, 'osm-canvas');

function drawWorldinCanvas(world, canvas) {
    console.log('eccp',world);
    const _canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    const ctx = _canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    

    

    world.forEach(w => {
        if (w.type === 'way') {
            console.log(
              w.color
            )
            ctx.beginPath();
            
            w.path.forEach((p, i) => {
                if (i === 0) {
                    ctx.moveTo(p.x, p.y);
                } else {
                    ctx.lineTo(p.x, p.y);
                }
            });
            ctx.strokeStyle = w.color || 'black';
            ctx.fillStyle = w.color || 'black';
            if (w.color === 'red') {
              ctx.fill();
            }
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });

}